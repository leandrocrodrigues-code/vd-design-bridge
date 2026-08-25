import './po-cargo-chart.tokens.css';

export interface PoCargoChartItem {
  label: string;
  /** percentual de ocupação (0-100) */
  value: number;
}

export interface PoCargoChartProps {
  title?: string;
  label?: string;
  items: PoCargoChartItem[];
  /** link/ação no rodapé do card */
  footerLabel?: string;
  onFooterClick?: () => void;
  className?: string;
}

function statusColorVar(value: number) {
  if (value >= 100) return 'var(--vd-color-feedback-success-pure)';
  if (value >= 50) return 'var(--vd-color-feedback-informative-pure)';
  if (value > 0) return 'var(--vd-color-feedback-warning-pure)';
  return 'var(--vd-color-surface-container)';
}

/**
 * ⚠️ Não é um componente `po-*` — "Cargo Chart" no Figma (frame
 * `Cargo Chart`, página "Cargo Chart ✅" do PDF `Componentespdf/charts.pdf`)
 * é um componente **Composition** (Section Header opcional + "Truck
 * Progress Bar" + Action/Button), específico de cenários de logística —
 * representa ocupação de carga em formato ilustrado de caminhão. Cobre
 * também o "Progress Truck" citado na lista original de componentes
 * (mesmo padrão visual).
 *
 * Cor por faixa de ocupação, confirmada no PDF: 100% = feedback/success,
 * 60-80% = feedback/informative, 20-40% = feedback/warning, 0% = surface/
 * container (cinza/vazio).
 */
export function PoCargoChart({ title, label, items, footerLabel, onFooterClick, className }: PoCargoChartProps) {
  return (
    <div className={['vd-po-cargo-chart', className ?? ''].filter(Boolean).join(' ')}>
      {(title || label) && (
        <div className="vd-po-cargo-chart__header">
          {title && <span className="vd-po-cargo-chart__title">{title}</span>}
          {label && <span className="vd-po-cargo-chart__label">{label} ›</span>}
        </div>
      )}
      <div className="vd-po-cargo-chart__list">
        {items.map((item) => {
          const clamped = Math.max(0, Math.min(100, item.value));
          const color = statusColorVar(clamped);
          return (
            <div key={item.label} className="vd-po-cargo-chart__row">
              <div className="vd-po-cargo-chart__truck">
                <svg viewBox="0 0 24 16" width="24" height="16" fill="none">
                  <path d="M1 3h9v9H1z" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M10 6h4l3 3v3h-7z" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="4" cy="13" r="1.5" fill="currentColor" />
                  <circle cx="14" cy="13" r="1.5" fill="currentColor" />
                  <circle cx="19" cy="13" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div className="vd-po-cargo-chart__track">
                <div className="vd-po-cargo-chart__fill" style={{ width: `${clamped}%`, backgroundColor: color }}>
                  <span className="vd-po-cargo-chart__percent">{clamped}%</span>
                </div>
              </div>
              <span className="vd-po-cargo-chart__row-label">{item.label}</span>
            </div>
          );
        })}
      </div>
      {footerLabel && (
        <button type="button" className="vd-po-cargo-chart__footer" onClick={onFooterClick}>
          {footerLabel}
        </button>
      )}
    </div>
  );
}
