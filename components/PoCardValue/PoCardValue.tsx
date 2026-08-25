import type { ReactNode } from 'react';
import './po-card-value.tokens.css';

export type PoCardValueTone = 'success' | 'warning' | 'alert';

export interface PoCardValueBreakdownItem {
  tone: 'success' | 'alert';
  overline: string;
  value: string;
}

export interface PoCardValueSimpleProps {
  variant?: 'simple';
  overline?: string;
  value?: string;
  tag?: string;
  breakdownOverline?: string;
  breakdownValue?: string;
  className?: string;
}

export interface PoCardValueStatusProps {
  variant: 'status';
  icon?: ReactNode;
  overline?: string;
  value?: string;
  tone?: PoCardValueTone;
  breakdown?: PoCardValueBreakdownItem[];
  className?: string;
}

export type PoCardValueProps = PoCardValueSimpleProps | PoCardValueStatusProps;

const DEFAULT_BREAKDOWN: PoCardValueBreakdownItem[] = [
  { tone: 'alert', overline: 'Overline', value: '100%' },
  { tone: 'success', overline: 'Overline', value: '100%' },
];

/**
 * ⚠️ Não é um componente `po-*` — "Card Value" (PDF `Componentespdf/Card
 * Value.pdf`) é um card **Core/Composition** com 2 layouts observados
 * no PDF: `simple` (valor + tag + 1 linha de detalhamento) e `status`
 * (ícone de status + valor grande + 2 chips de detalhamento
 * success/alert lado a lado), este último em 3 tonalidades de fundo
 * (success/warning/alert).
 */
export function PoCardValue(props: PoCardValueProps) {
  if (props.variant === 'status') {
    const { icon, overline = 'Overline', value = '100%', tone = 'success', breakdown = DEFAULT_BREAKDOWN, className } = props;
    return (
      <div className={['vd-po-card-value', 'vd-po-card-value--status', className ?? ''].filter(Boolean).join(' ')} data-tone={tone}>
        <div className="vd-po-card-value__status-header">
          <span className="vd-po-card-value__status-icon">
            {icon ?? (
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M5.5 8l1.8 1.8L10.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <div>
            <span className="vd-po-card-value__overline">{overline}</span>
            <span className="vd-po-card-value__big-value">{value}</span>
          </div>
        </div>
        <div className="vd-po-card-value__breakdown">
          {breakdown.map((item, index) => (
            <span key={index} className="vd-po-card-value__chip" data-tone={item.tone}>
              <span className="vd-po-card-value__chip-dot" />
              <span className="vd-po-card-value__chip-text">
                <span className="vd-po-card-value__overline">{item.overline}</span>
                <span className="vd-po-card-value__chip-value">{item.value}</span>
              </span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  const { overline = 'Overline', value = 'R$ 9.999,99', tag = 'Label Tag', breakdownOverline = 'Overline', breakdownValue = 'R$ 9.999,99', className } = props;
  return (
    <div className={['vd-po-card-value', className ?? ''].filter(Boolean).join(' ')}>
      <div className="vd-po-card-value__simple-header">
        <div>
          <span className="vd-po-card-value__overline">{overline}</span>
          <span className="vd-po-card-value__big-value">{value}</span>
        </div>
        <span className="vd-po-card-value__tag">{tag}</span>
      </div>
      <div className="vd-po-card-value__simple-row">
        <span className="vd-po-card-value__chip-dot vd-po-card-value__chip-dot--success" />
        <span className="vd-po-card-value__chip-text">
          <span className="vd-po-card-value__overline">{breakdownOverline}</span>
          <span className="vd-po-card-value__chip-value">{breakdownValue}</span>
        </span>
      </div>
    </div>
  );
}
