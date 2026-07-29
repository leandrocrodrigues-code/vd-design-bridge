/// <reference types="@figma/plugin-typings" />

/**
 * Sandbox do plugin: sem acesso a DOM/fetch. Lê as Variables locais do
 * arquivo Figma, resolve aliases e converte pro mesmo formato de
 * /tokens/colors.json, spacing.json e typography.json — a mesma lógica de
 * scripts/sync-figma-tokens.js (REST API), só que lendo direto da
 * figma.variables API em vez de um HTTP fetch. Envia o resultado pra
 * ui.html via postMessage, já que só a UI tem acesso a rede.
 */

figma.showUI(__html__, { width: 420, height: 480, title: 'VD Token Sync' });

type Bucket = 'color' | 'spacing' | 'typography';
const BUCKETS: Bucket[] = ['color', 'spacing', 'typography'];

function normalizeSegment(segment: string): string {
  return segment.trim().toLowerCase().replace(/\s+/g, '-');
}

function toCamel(str: string): string {
  return str.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

function formatColor(raw: unknown): string | null {
  if (!raw || typeof raw !== 'object') return null;
  const { r, g, b, a = 1 } = raw as { r: number; g: number; b: number; a?: number };
  const toHex = (c: number) => Math.round(clamp01(c) * 255).toString(16).padStart(2, '0');
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a < 1 ? `${hex}${toHex(a)}` : hex;
}

function classify(bucket: Bucket, restPath: string[]): { type: string; unit?: string } {
  if (bucket === 'color') return { type: 'color' };
  if (bucket === 'spacing') return { type: 'spacing', unit: 'px' };
  // typography
  const group = restPath[0];
  if (group === 'font-family') return { type: 'fontFamily' };
  if (group === 'font-size') return { type: 'fontSize', unit: 'px' };
  if (group === 'font-weight') return { type: 'fontWeight' };
  return { type: group ? toCamel(group) : 'string' };
}

function formatValue(
  raw: unknown,
  resolvedType: VariableResolvedDataType,
  meta: { unit?: string },
): string | boolean | null {
  if (resolvedType === 'COLOR') return formatColor(raw);
  if (resolvedType === 'FLOAT') {
    const rounded = Math.round(Number(raw) * 100) / 100;
    return meta.unit ? `${rounded}${meta.unit}` : `${rounded}`;
  }
  if (resolvedType === 'STRING') return String(raw);
  if (resolvedType === 'BOOLEAN') return Boolean(raw);
  return null;
}

function resolveVariableValue(
  variable: Variable,
  variablesById: Record<string, Variable>,
  collectionsById: Record<string, VariableCollection>,
  visited: Set<string> = new Set(),
): unknown {
  if (visited.has(variable.id)) {
    throw new Error(`alias circular envolvendo "${variable.name}"`);
  }
  visited.add(variable.id);

  const collection = collectionsById[variable.variableCollectionId];
  const modeId = collection?.defaultModeId;
  const raw = modeId ? variable.valuesByMode[modeId] : undefined;
  if (raw === undefined) return undefined;

  if (raw && typeof raw === 'object' && (raw as { type?: string }).type === 'VARIABLE_ALIAS') {
    const target = variablesById[(raw as { id: string }).id];
    if (!target) return undefined;
    return resolveVariableValue(target, variablesById, collectionsById, visited);
  }

  return raw;
}

function setDeep(target: Record<string, any>, pathSegments: string[], value: unknown) {
  let node = target;
  for (let i = 0; i < pathSegments.length - 1; i++) {
    const seg = pathSegments[i];
    if (typeof node[seg] !== 'object' || node[seg] === null || 'value' in node[seg]) {
      node[seg] = {};
    }
    node = node[seg];
  }
  node[pathSegments[pathSegments.length - 1]] = value;
}

async function collectTokens(): Promise<{
  buckets: Record<Bucket, Record<string, unknown>>;
  skipped: string[];
}> {
  const variables = await figma.variables.getLocalVariablesAsync();
  const collections = await figma.variables.getLocalVariableCollectionsAsync();

  const variablesById: Record<string, Variable> = {};
  variables.forEach((v) => {
    variablesById[v.id] = v;
  });

  const collectionsById: Record<string, VariableCollection> = {};
  collections.forEach((c) => {
    collectionsById[c.id] = c;
  });

  const buckets: Record<Bucket, Record<string, unknown>> = { color: {}, spacing: {}, typography: {} };
  const skipped: string[] = [];

  for (const variable of variables) {
    const pathSegments = variable.name.split('/').map(normalizeSegment).filter(Boolean);
    if (pathSegments.length < 2) {
      skipped.push(`${variable.name} (nome precisa ser "grupo/token", ex: "color/brand/primary")`);
      continue;
    }

    const [bucket, ...rest] = pathSegments;
    if (!BUCKETS.includes(bucket as Bucket)) {
      skipped.push(`${variable.name} (grupo "${bucket}" desconhecido — use color/, spacing/ ou typography/)`);
      continue;
    }

    let rawValue: unknown;
    try {
      rawValue = resolveVariableValue(variable, variablesById, collectionsById);
    } catch (err) {
      skipped.push(`${variable.name} (${(err as Error).message})`);
      continue;
    }
    if (rawValue === undefined) {
      skipped.push(`${variable.name} (sem valor no modo padrão da coleção)`);
      continue;
    }

    const meta = classify(bucket as Bucket, rest);
    const value = formatValue(rawValue, variable.resolvedType, meta);
    if (value === null || value === undefined) {
      skipped.push(`${variable.name} (não foi possível converter o valor)`);
      continue;
    }

    setDeep(buckets[bucket as Bucket], rest, { value, type: meta.type });
  }

  return { buckets, skipped };
}

type UiMessage =
  | { type: 'get-token' }
  | { type: 'save-token'; token: string }
  | { type: 'clear-token' }
  | { type: 'sync-request' };

figma.ui.onmessage = async (msg: UiMessage) => {
  if (msg.type === 'get-token') {
    const token = await figma.clientStorage.getAsync('githubPat');
    figma.ui.postMessage({ type: 'token-value', token: token ?? null });
    return;
  }

  if (msg.type === 'save-token') {
    if (msg.token) {
      await figma.clientStorage.setAsync('githubPat', msg.token);
      figma.ui.postMessage({ type: 'token-saved' });
    }
    return;
  }

  if (msg.type === 'clear-token') {
    await figma.clientStorage.deleteAsync('githubPat');
    figma.ui.postMessage({ type: 'token-cleared' });
    return;
  }

  if (msg.type === 'sync-request') {
    try {
      const { buckets, skipped } = await collectTokens();
      figma.ui.postMessage({ type: 'tokens-data', tokens: buckets, skipped });
    } catch (err) {
      figma.ui.postMessage({ type: 'error', message: (err as Error).message ?? String(err) });
    }
    return;
  }
};
