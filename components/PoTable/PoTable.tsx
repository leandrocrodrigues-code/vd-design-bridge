import './po-table.tokens.css';

export interface PoTableColumn {
  /** label do cabeçalho */
  label: string;
  /** chave usada pra ler o valor em cada item */
  key: string;
  /** alinhamento do conteúdo — Figma mostra a última coluna alinhada à direita ("Value") */
  align?: 'left' | 'right';
}

export interface PoTableAction {
  label: string;
  onClick: (item: Record<string, string>) => void;
}

export interface PoTableProps {
  /** p-columns */
  columns: PoTableColumn[];
  /** p-items */
  items: Record<string, string>[];
  /** p-striped */
  striped?: boolean;
  /** p-sort — habilita ordenação por coluna (clique no header) */
  sort?: boolean;
  onSortBy?: (columnKey: string) => void;
  /** p-actions — versão simplificada, renderiza só o menu (kebab) por linha */
  actions?: PoTableAction[];
  className?: string;
}

/**
 * Preview web do po-table (PO-UI) usando os tokens do Design System V&D.
 *
 * Cobre só a variante "No Scroll" do Figma — cabeçalho com colunas
 * ordenáveis (ícone de seta) + linhas de conteúdo + coluna de ações
 * (ícone de pilha + menu kebab). **Não implementa**: `selectable`,
 * `virtualScroll`, `height` (scroll fixo), busca (`hideTableSearch`),
 * gerenciador de colunas (`hideColumnsManager`), expansão de linha —
 * a PO-UI real (`po-table`) tem uma API bem mais extensa.
 *
 * Doc oficial: https://po-ui.io/documentation/po-table
 */
export function PoTable({ columns, items, striped = false, sort = false, onSortBy, actions, className }: PoTableProps) {
  return (
    <div className={['vd-po-table', className ?? ''].filter(Boolean).join(' ')}>
      <div className="vd-po-table__row vd-po-table__row--header">
        {columns.map((col) => (
          <button
            key={col.key}
            type="button"
            className="vd-po-table__cell vd-po-table__cell--header"
            data-align={col.align ?? 'left'}
            disabled={!sort}
            onClick={() => sort && onSortBy?.(col.key)}
          >
            <span>{col.label}</span>
            {sort && (
              <svg className="vd-po-table__sort-icon" viewBox="0 0 16 16" width="16" height="16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        ))}
        {actions && actions.length > 0 && <span className="vd-po-table__cell vd-po-table__cell--header" data-align="right" />}
      </div>
      <div className="vd-po-table__body">
        {items.map((item, rowIndex) => (
          <div
            key={rowIndex}
            className="vd-po-table__row"
            data-striped={striped && rowIndex % 2 === 1 ? 'true' : undefined}
          >
            {columns.map((col) => (
              <span key={col.key} className="vd-po-table__cell" data-align={col.align ?? 'left'}>
                {item[col.key]}
              </span>
            ))}
            {actions && actions.length > 0 && (
              <span className="vd-po-table__cell vd-po-table__cell--actions" data-align="right">
                <svg className="vd-po-table__icon" viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <rect x="4" y="5" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="4" y="11" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="4" y="17" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <button
                  type="button"
                  className="vd-po-table__icon-button"
                  aria-label="Ações da linha"
                  onClick={() => actions[0]?.onClick(item)}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                    <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
