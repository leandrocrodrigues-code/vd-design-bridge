import './po-card-invoice.tokens.css';

export type PoCardInvoiceTone = 'informative' | 'brand' | 'success' | 'warning' | 'alert';

export interface PoCardInvoiceRow {
  overline: string;
  label: string;
}

export interface PoCardInvoiceProps {
  tag?: string;
  icon?: boolean;
  rows?: PoCardInvoiceRow[];
  tone?: PoCardInvoiceTone;
  className?: string;
}

const DEFAULT_ROWS: PoCardInvoiceRow[] = [
  { overline: 'Overline', label: 'Label Text' },
  { overline: 'Overline', label: 'Label Text' },
];

/**
 * ⚠️ Não é um componente `po-*` — "Card Invoice" (PDF `Componentespdf/
 * Card Invoice.pdf`) é um card **Core/Composition**: tag no topo +
 * lista de pares Overline/Label. 5 tonalidades confirmadas no PDF.
 */
export function PoCardInvoice({ tag = 'Label Tag', icon = true, rows = DEFAULT_ROWS, tone = 'informative', className }: PoCardInvoiceProps) {
  return (
    <div className={['vd-po-card-invoice', className ?? ''].filter(Boolean).join(' ')} data-tone={tone}>
      <span className="vd-po-card-invoice__tag">
        {icon && (
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path d="M8 1.5 14 5v6l-6 3.5L2 11V5l6-3.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
        )}
        {tag}
      </span>
      <div className="vd-po-card-invoice__rows">
        {rows.map((row, index) => (
          <div key={index} className="vd-po-card-invoice__row">
            <span className="vd-po-card-invoice__overline">{row.overline}</span>
            <span className="vd-po-card-invoice__label">{row.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
