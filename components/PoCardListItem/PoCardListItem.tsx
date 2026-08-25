import './po-card-list-item.tokens.css';

export interface PoCardListItemProps {
  label?: string;
  description?: string;
  tag?: string;
  icon?: boolean;
  className?: string;
}

/**
 * ⚠️ Não é um componente `po-*` — "Card List Item" (PDF
 * `Componentespdf/Card List Item.pdf`) é uma linha de card simples:
 * Label + Description à esquerda, tag à direita. Diferente do já
 * existente [[PoListItem]] (linha de tabela/lista densa, sem card) —
 * aqui é um bloco isolado com fundo próprio.
 */
export function PoCardListItem({ label = 'Label Text', description = 'Description', tag = 'Label Tag', icon = true, className }: PoCardListItemProps) {
  return (
    <div className={['vd-po-card-list-item', className ?? ''].filter(Boolean).join(' ')}>
      <div className="vd-po-card-list-item__text">
        <span className="vd-po-card-list-item__label">{label}</span>
        <span className="vd-po-card-list-item__description">{description}</span>
      </div>
      <span className="vd-po-card-list-item__tag">
        {icon && (
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path d="M8 1.5 14 5v6l-6 3.5L2 11V5l6-3.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
        )}
        {tag}
      </span>
    </div>
  );
}
