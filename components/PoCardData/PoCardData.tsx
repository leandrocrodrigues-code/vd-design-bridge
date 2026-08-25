import './po-card-data.tokens.css';

export type PoCardDataTone = 'informative' | 'brand' | 'success' | 'warning' | 'alert';
export type PoCardDataEmphasis = 'subtle' | 'tint';
export type PoCardDataTrend = 'up' | 'down' | 'none';

export interface PoCardDataProps {
  overline?: string;
  label?: string;
  value?: string;
  trend?: PoCardDataTrend;
  tone?: PoCardDataTone;
  emphasis?: PoCardDataEmphasis;
  className?: string;
}

/**
 * ⚠️ Não é um componente `po-*` — "Card Data" (PDF `Componentespdf/Card
 * Data.pdf`) é um card **Core/Composition** em formato de pílula: dot
 * colorido + Overline/Label + valor com indicador de tendência. 5
 * tonalidades × 2 níveis de ênfase (subtle/tint) confirmados no PDF.
 */
export function PoCardData({ overline = 'Overline', label = 'Label Text', value = '100%', trend = 'up', tone = 'informative', emphasis = 'subtle', className }: PoCardDataProps) {
  return (
    <div className={['vd-po-card-data', className ?? ''].filter(Boolean).join(' ')} data-tone={tone} data-emphasis={emphasis}>
      <span className="vd-po-card-data__dot" aria-hidden="true" />
      <div className="vd-po-card-data__text">
        <span className="vd-po-card-data__overline">{overline}</span>
        <span className="vd-po-card-data__label">{label}</span>
      </div>
      <span className="vd-po-card-data__value">
        {value}
        {trend !== 'none' && (
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" style={{ transform: trend === 'down' ? 'rotate(180deg)' : undefined }}>
            <path d="M8 13V3M3 7l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </div>
  );
}
