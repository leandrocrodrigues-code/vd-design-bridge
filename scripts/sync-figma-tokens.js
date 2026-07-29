#!/usr/bin/env node
/**
 * Sincroniza design tokens do Figma (Variables nativas) para /tokens/*.json.
 *
 * Requer as env vars:
 *   FIGMA_ACCESS_TOKEN  — personal access token do Figma (escopo de leitura de variables)
 *   FIGMA_FILE_KEY      — file key do arquivo Figma onde as variables vivem
 *
 * Convenção de nomes no Figma: cada variable deve se chamar "<grupo>/<...resto>",
 * onde <grupo> é um dos buckets abaixo (color, spacing, typography). O resto do
 * caminho vira a chave aninhada no JSON de saída, ex.:
 *   "color/brand/primary"        -> tokens/colors.json      { color: { brand: { primary: {...} } } }
 *   "spacing/md"                 -> tokens/spacing.json     { spacing: { md: {...} } }
 *   "typography/font-size/lg"    -> tokens/typography.json  { typography: { "font-size": { lg: {...} } } }
 *
 * Variables com valor tipo VARIABLE_ALIAS são resolvidas recursivamente até um
 * valor concreto. Apenas o modo padrão (defaultModeId) de cada coleção é usado —
 * suporte a múltiplos modos (ex. light/dark) fica para uma iteração futura.
 *
 * Cada arquivo de saída só é reescrito se o conteúdo canônico realmente mudou, e
 * nunca é esvaziado: se nenhuma variable mapear para um bucket, o arquivo
 * existente é preservado como está.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKENS_DIR = path.join(__dirname, '..', 'tokens');

const BUCKET_FILES = {
  color: { file: 'colors.json', topKey: 'color' },
  spacing: { file: 'spacing.json', topKey: 'spacing' },
  typography: { file: 'typography.json', topKey: 'typography' },
};

function normalizeSegment(segment) {
  return segment.trim().toLowerCase().replace(/\s+/g, '-');
}

function toCamel(str) {
  return str.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

function clamp01(n) {
  return Math.min(1, Math.max(0, n));
}

function formatColor(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const { r, g, b, a = 1 } = raw;
  const toHex = (c) => Math.round(clamp01(c) * 255).toString(16).padStart(2, '0');
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a < 1 ? `${hex}${toHex(a)}` : hex;
}

function classify(bucket, restPath) {
  if (bucket === 'color') return { type: 'color' };
  if (bucket === 'spacing') return { type: 'spacing', unit: 'px' };
  if (bucket === 'typography') {
    const group = restPath[0];
    if (group === 'font-family') return { type: 'fontFamily' };
    if (group === 'font-size') return { type: 'fontSize', unit: 'px' };
    if (group === 'font-weight') return { type: 'fontWeight' };
    return { type: group ? toCamel(group) : 'string' };
  }
  return null;
}

function formatValue(raw, resolvedType, meta) {
  if (resolvedType === 'COLOR') return formatColor(raw);
  if (resolvedType === 'FLOAT') {
    const rounded = Math.round(Number(raw) * 100) / 100;
    return meta.unit ? `${rounded}${meta.unit}` : `${rounded}`;
  }
  if (resolvedType === 'STRING') return String(raw);
  if (resolvedType === 'BOOLEAN') return Boolean(raw);
  return raw;
}

function resolveVariableValue(variable, variablesById, collectionsById, visited = new Set()) {
  if (visited.has(variable.id)) {
    throw new Error(`alias circular envolvendo "${variable.name}"`);
  }
  visited.add(variable.id);

  const collection = collectionsById[variable.variableCollectionId];
  const modeId = collection?.defaultModeId;
  const raw = variable.valuesByMode?.[modeId];
  if (raw === undefined) return undefined;

  if (raw && typeof raw === 'object' && raw.type === 'VARIABLE_ALIAS') {
    const target = variablesById[raw.id];
    if (!target) return undefined;
    return resolveVariableValue(target, variablesById, collectionsById, visited);
  }

  return raw;
}

function setDeep(target, pathSegments, value) {
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

function sortKeysDeep(value) {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortKeysDeep(value[key]);
        return acc;
      }, {});
  }
  return value;
}

function canonicalize(obj) {
  return `${JSON.stringify(sortKeysDeep(obj), null, 2)}\n`;
}

async function fetchFigmaVariables(fileKey, token) {
  const res = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables/local`, {
    headers: { 'X-Figma-Token': token },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(
      `Figma API respondeu ${res.status} ${res.statusText}. ${body}`.trim(),
    );
  }
  return res.json();
}

async function main() {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  const fileKey = process.env.FIGMA_FILE_KEY;
  if (!token) throw new Error('Env var FIGMA_ACCESS_TOKEN não definida.');
  if (!fileKey) throw new Error('Env var FIGMA_FILE_KEY não definida.');

  const json = await fetchFigmaVariables(fileKey, token);
  const variablesById = json.meta?.variables ?? {};
  const collectionsById = json.meta?.variableCollections ?? {};
  const variableList = Object.values(variablesById).filter(
    (v) => !v.remote && !v.deletedButReferenced,
  );

  if (variableList.length === 0) {
    console.log(
      'Nenhuma Figma Variable encontrada ainda — mantendo /tokens como está. ' +
        'Popule as variables no Figma (grupos "color/", "spacing/", "typography/") e rode de novo.',
    );
    return;
  }

  const buckets = { color: {}, spacing: {}, typography: {} };
  const skipped = [];

  for (const variable of variableList) {
    const pathSegments = variable.name.split('/').map(normalizeSegment).filter(Boolean);
    if (pathSegments.length < 2) {
      skipped.push(`${variable.name} (nome precisa ser "grupo/token", ex: "color/brand/primary")`);
      continue;
    }

    const [bucket, ...rest] = pathSegments;
    if (!BUCKET_FILES[bucket]) {
      skipped.push(`${variable.name} (grupo "${bucket}" desconhecido — use color/, spacing/ ou typography/)`);
      continue;
    }

    let rawValue;
    try {
      rawValue = resolveVariableValue(variable, variablesById, collectionsById);
    } catch (err) {
      skipped.push(`${variable.name} (${err.message})`);
      continue;
    }
    if (rawValue === undefined) {
      skipped.push(`${variable.name} (sem valor no modo padrão da coleção)`);
      continue;
    }

    const meta = classify(bucket, rest);
    const value = formatValue(rawValue, variable.resolvedType, meta);
    if (value === null || value === undefined) {
      skipped.push(`${variable.name} (não foi possível converter o valor)`);
      continue;
    }

    setDeep(buckets[bucket], rest, { value, type: meta.type });
  }

  if (skipped.length > 0) {
    console.warn(`Ignorados ${skipped.length} variable(s):\n  - ${skipped.join('\n  - ')}`);
  }

  let changedCount = 0;
  for (const [bucket, { file, topKey }] of Object.entries(BUCKET_FILES)) {
    const data = buckets[bucket];
    const filePath = path.join(TOKENS_DIR, file);

    if (Object.keys(data).length === 0) {
      console.log(`Nenhuma variable em "${bucket}/*" nesta sincronização — mantendo ${file} como está.`);
      continue;
    }

    const newContent = canonicalize({ [topKey]: data });
    const existingRaw = existsSync(filePath) ? readFileSync(filePath, 'utf8') : null;
    const existingCanonical = existingRaw ? canonicalize(JSON.parse(existingRaw)) : null;

    if (newContent === existingCanonical) {
      console.log(`${file} sem mudanças.`);
      continue;
    }

    writeFileSync(filePath, newContent, 'utf8');
    changedCount++;
    console.log(`${file} atualizado.`);
  }

  console.log(
    changedCount > 0
      ? `${changedCount} arquivo(s) de tokens atualizados a partir do Figma.`
      : 'Nenhum arquivo de tokens mudou.',
  );
}

main().catch((err) => {
  console.error('Falha ao sincronizar tokens do Figma:', err.message);
  process.exit(1);
});
