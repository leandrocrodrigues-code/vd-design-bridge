import colorTokens from './colors.json';
import darkColorOverride from './colors.dark.override.json';
import spacingTokens from './spacing.json';
import typographyTokens from './typography.json';
import radiusTokens from './radius.json';
import sizingTokens from './sizing.json';

export type ThemeMode = 'light' | 'dark';

export const tokens = {
  color: colorTokens.color,
  spacing: spacingTokens.spacing,
  typography: typographyTokens.typography,
  radius: radiusTokens.radius,
  sizing: sizingTokens.sizing,
};

type TokenLeaf = { value: string; type: string };
type TokenNode = TokenLeaf | { [key: string]: TokenNode };

const isLeaf = (node: TokenNode): node is TokenLeaf =>
  typeof (node as TokenLeaf).value === 'string' && typeof (node as TokenLeaf).type === 'string';

/**
 * `colors.json` é regenerado inteiro pelo figma-plugin-token-sync e só carrega
 * o modo padrão (light). O modo dark vive em `colors.dark.override.json`, que o
 * plugin não toca — daí o merge ser recursivo e o dark só sobrepor as chaves
 * que ele declara (o grupo `chart`, por exemplo, cai no valor light).
 */
function mergeTokens(base: TokenNode, override: TokenNode | undefined): TokenNode {
  if (!override) return base;
  if (isLeaf(override)) return override;
  if (isLeaf(base)) return base;

  const merged: { [key: string]: TokenNode } = { ...base };
  for (const [key, value] of Object.entries(override)) {
    merged[key] = mergeTokens(base[key], value);
  }
  return merged;
}

export const lightColors = colorTokens.color;
export const darkColors = mergeTokens(
  colorTokens.color as TokenNode,
  darkColorOverride.color as unknown as TokenNode,
) as typeof colorTokens.color;

export const colorsByMode: Record<ThemeMode, typeof colorTokens.color> = {
  light: lightColors,
  dark: darkColors,
};

/**
 * `surface/brand/pure` → `--vd-color-surface-brand-pure`.
 * O sanitizador roda só no sufixo: aplicado no nome inteiro, o `-+` colapsaria
 * o `--` do prefixo e geraria uma custom property inválida.
 */
const toCssVarName = (path: string[]) => {
  const suffix = path
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `--vd-color-${suffix}`;
};

/**
 * Achata a árvore de cores num objeto de CSS custom properties, pra ser
 * aplicado no elemento que representa o tema (ver `.storybook/preview.tsx`).
 */
export function colorCssVars(mode: ThemeMode): Record<string, string> {
  const vars: Record<string, string> = {};

  const walk = (node: TokenNode, path: string[]) => {
    if (isLeaf(node)) {
      vars[toCssVarName(path)] = node.value;
      return;
    }
    for (const [key, child] of Object.entries(node)) {
      if (key.startsWith('_')) continue;
      walk(child, [...path, key]);
    }
  };

  walk(colorsByMode[mode] as TokenNode, []);
  return vars;
}
