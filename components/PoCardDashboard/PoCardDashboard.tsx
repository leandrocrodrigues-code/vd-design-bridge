import type { ReactNode } from 'react';
import './po-card-dashboard.tokens.css';

export type PoCardDashboardTrend = 'up' | 'down' | 'none';

export interface PoCardDashboardProps {
  icon?: ReactNode;
  label?: string;
  value?: string;
  trendValue?: string;
  trend?: PoCardDashboardTrend;
  supportingValue?: string;
  supportingText?: string;
  onMenuClick?: () => void;
  className?: string;
}

/**
 * ⚠️ Não é um componente `po-*` — "Card Dashboard" (PDF
 * `Componentespdf/Card Dashboard.pdf`) é um card **Core/Composition**
 * tipo KPI: ícone + label + menu kebab, valor principal + chip de
 * tendência, texto de apoio com valor de variação.
 */
export function PoCardDashboard({
  icon,
  label = 'Label Text',
  value = 'R$ 99.999,99',
  trendValue = '+99%',
  trend = 'up',
  supportingValue = '+R$ 99.999,99',
  supportingText = 'Supporting Text',
  onMenuClick,
  className,
}: PoCardDashboardProps) {
  return (
    <div className={['vd-po-card-dashboard', className ?? ''].filter(Boolean).join(' ')}>
      <div className="vd-po-card-dashboard__header">
        <span className="vd-po-card-dashboard__icon">
          {icon ?? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M4 17V9M12 17V4M20 17v-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </span>
        <span className="vd-po-card-dashboard__label">{label}</span>
        <button type="button" className="vd-po-card-dashboard__menu" aria-label="Mais opções" onClick={onMenuClick}>
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <circle cx="8" cy="3.5" r="1.2" fill="currentColor" />
            <circle cx="8" cy="8" r="1.2" fill="currentColor" />
            <circle cx="8" cy="12.5" r="1.2" fill="currentColor" />
          </svg>
        </button>
      </div>
      <div className="vd-po-card-dashboard__value-row">
        <span className="vd-po-card-dashboard__value">{value}</span>
        {trend !== 'none' && (
          <span className="vd-po-card-dashboard__trend" data-trend={trend}>
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" style={{ transform: trend === 'down' ? 'rotate(180deg)' : undefined }}>
              <path d="M8 13V3M3 7l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {trendValue}
          </span>
        )}
      </div>
      <p className="vd-po-card-dashboard__supporting">
        <span className="vd-po-card-dashboard__supporting-value">{supportingValue}</span> {supportingText}
      </p>
    </div>
  );
}
