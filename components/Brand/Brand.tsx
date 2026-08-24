import symbolDarkBlue from './assets/symbol-dark-blue.svg';
import symbolLightBlue from './assets/symbol-light-blue.svg';
import symbolWhite from './assets/symbol-white.svg';
import symbolTypoDarkBlue from './assets/symbol-typo-dark-blue.svg';
import symbolTypoLightBlue from './assets/symbol-typo-light-blue.svg';
import symbolTypoWhite from './assets/symbol-typo-white.svg';

/** Espelha a variante `Color` do component set "Brand (New!)" no Figma. */
export type BrandColor = 'dark-blue' | 'light-blue' | 'white';
/** Espelha a variante `Type` do component set "Brand (New!)" no Figma. */
export type BrandType = 'symbol-only' | 'symbol-typo';

export interface BrandProps {
  color?: BrandColor;
  type?: BrandType;
  className?: string;
}

const assets: Record<BrandType, Record<BrandColor, string>> = {
  'symbol-only': {
    'dark-blue': symbolDarkBlue,
    'light-blue': symbolLightBlue,
    white: symbolWhite,
  },
  'symbol-typo': {
    'dark-blue': symbolTypoDarkBlue,
    'light-blue': symbolTypoLightBlue,
    white: symbolTypoWhite,
  },
};

const dimensions: Record<BrandType, { width: number; height: number }> = {
  'symbol-only': { width: 40, height: 40 },
  'symbol-typo': { width: 140, height: 40 },
};

/**
 * Marca TOTVS — 6 variantes (Type × Color) espelhando o component set
 * "Brand (New!)" do Figma (node `208:418`), página "Brand ✅".
 *
 * SVGs internalizados em `assets/` (não referenciam a URL remota do Figma,
 * que expira em ~7 dias) — mesma regra que vale para qualquer asset commitado.
 */
export function Brand({ color = 'dark-blue', type = 'symbol-only', className }: BrandProps) {
  const { width, height } = dimensions[type];
  return (
    <img
      src={assets[type][color]}
      alt="Marca TOTVS"
      width={width}
      height={height}
      className={className}
      style={{ display: 'block' }}
    />
  );
}
