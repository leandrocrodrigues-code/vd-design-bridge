import './po-loading.tokens.css';

export type PoLoadingSize = 'small' | 'medium' | 'large';

export interface PoLoadingProps {
  size?: PoLoadingSize;
  className?: string;
}

const dimension: Record<PoLoadingSize, number> = { small: 16, medium: 24, large: 48 };

/**
 * ⚠️ Não confirmei os nomes de CSS token do po-loading via
 * po-ui.io/llms-generated — a página não carregou. Espelha o "Loading
 * Icon" do Figma (node `10642:108369`, página "Loading Icon ✅ New!"),
 * um spinner girando em `surface/brand/pure`, 3 tamanhos (16/24/48px).
 *
 * Doc oficial: https://po-ui.io/documentation/po-loading
 */
export function PoLoading({ size = 'medium', className }: PoLoadingProps) {
  const d = dimension[size];
  return (
    <span
      className={['vd-po-loading', className ?? ''].filter(Boolean).join(' ')}
      style={{ width: d, height: d }}
      role="status"
      aria-label="Carregando"
    />
  );
}
