import './po-scroll-bar.tokens.css';

export type PoScrollBarOrientation = 'vertical' | 'horizontal';

export interface PoScrollBarProps {
  orientation?: PoScrollBarOrientation;
  showButtons?: boolean;
  className?: string;
}

/**
 * ⚠️ Não é um componente Angular da PO-UI — scrollbar é comportamento
 * nativo do navegador na maioria dos casos. Este preview espelha a
 * especificação visual do Figma (node `10993:47825`, página
 * "Scroll Bar ✅ New!") como referência de estilo, útil se algum
 * componente precisar de uma scrollbar customizada (ex.: `::-webkit-scrollbar`).
 *
 * Cores confirmadas: trilho `surface/card`, thumb `surface/container`.
 */
export function PoScrollBar({ orientation = 'vertical', showButtons = true, className }: PoScrollBarProps) {
  return (
    <div
      className={['vd-po-scrollbar', className ?? ''].filter(Boolean).join(' ')}
      data-orientation={orientation}
      data-buttons={showButtons ? 'true' : undefined}
    >
      {showButtons && (
        <button type="button" className="vd-po-scrollbar__button" aria-label={orientation === 'vertical' ? 'Rolar para cima' : 'Rolar para a esquerda'}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d={orientation === 'vertical' ? 'M6 15l6-6 6 6' : 'M15 18l-6-6 6-6'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      <div className="vd-po-scrollbar__track">
        <div className="vd-po-scrollbar__thumb" />
      </div>
      {showButtons && (
        <button type="button" className="vd-po-scrollbar__button" aria-label={orientation === 'vertical' ? 'Rolar para baixo' : 'Rolar para a direita'}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d={orientation === 'vertical' ? 'M6 9l6 6 6-6' : 'M9 6l6 6-6 6'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
