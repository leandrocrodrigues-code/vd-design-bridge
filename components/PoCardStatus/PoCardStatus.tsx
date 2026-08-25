import type { ReactNode } from 'react';
import './po-card-status.tokens.css';

export type PoCardStatusTone = 'neutral' | 'informative' | 'brand' | 'success' | 'warning' | 'alert';
export type PoCardStatusEmphasis = 'subtle' | 'tint' | 'selected';

export interface PoCardStatusProps {
  icon?: ReactNode;
  overline?: string;
  label?: string;
  /** valor 0-100 da progress bar */
  value?: number;
  tone?: PoCardStatusTone;
  emphasis?: PoCardStatusEmphasis;
  className?: string;
}

/**
 * ⚠️ Não é um componente `po-*` — "Card Status" (PDF `Componentespdf/Card
 * Status.pdf`) é um card **Core/Composition** do Design System V&D:
 * ícone + Overline/Label + Progress Bar, em 6 tonalidades (neutral,
 * informative, brand, success, warning, alert) × 3 níveis de ênfase
 * (subtle = fundo neutro, tint = fundo colorido claro, selected =
 * outline colorido). Sem `po-card` real na PO-UI — confirmado, a doc
 * não lista esse componente.
 */
export function PoCardStatus({ icon, overline = 'Overline', label = 'Label Text', value = 60, tone = 'brand', emphasis = 'subtle', className }: PoCardStatusProps) {
  return (
    <div className={['vd-po-card-status', className ?? ''].filter(Boolean).join(' ')} data-tone={tone} data-emphasis={emphasis}>
      <span className="vd-po-card-status__icon">
        {icon ?? (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path d="M12 3l8 4v5c0 5-3.4 7.9-8 9-4.6-1.1-8-4-8-9V7l8-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <div className="vd-po-card-status__text">
        <span className="vd-po-card-status__overline">{overline}</span>
        <span className="vd-po-card-status__label">{label}</span>
      </div>
      <div className="vd-po-card-status__track">
        <div className="vd-po-card-status__fill" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}
