import './po-donut-chart.tokens.css';

export interface PoDonutChartItem {
  label: string;
  value: number;
  colorIndex?: number;
  color?: string;
}

export interface PoDonutChartProps {
  title?: string;
  label?: string;
  /** texto central — padrão: soma dos values */
  total?: string;
  /** legenda abaixo do total */
  caption?: string;
  items: PoDonutChartItem[];
  className?: string;
}

const DEFAULT_COLORS = [
  'var(--vd-color-surface-brand-pure)',
  'var(--vd-color-feedback-success-pure)',
  'var(--vd-color-feedback-warning-pure)',
  'var(--vd-color-feedback-informative-pure)',
  'var(--vd-color-feedback-alert-pure)',
];

/**
 * ⚠️ Não é um componente `po-*` — "Donut Chart" no Figma (frame
 * `Donut Chart`, página "Donut Chart ✅" do PDF `Componentespdf/charts.pdf`)
 * é um componente **Composition**, renderizado na implementação real via
 * **Echarts** — não um `po-chart`. Implementado aqui com
 * `conic-gradient` (aproximação visual, não SVG/canvas real).
 */
export function PoDonutChart({ title, label, total, caption = 'Caption', items, className }: PoDonutChartProps) {
  const sum = items.reduce((acc, i) => acc + i.value, 0);
  const colorFor = (item: PoDonutChartItem, index: number) => item.color ?? DEFAULT_COLORS[item.colorIndex ?? index % DEFAULT_COLORS.length];

  let cursor = 0;
  const stops = items.map((item, index) => {
    const start = sum > 0 ? (cursor / sum) * 360 : 0;
    cursor += item.value;
    const end = sum > 0 ? (cursor / sum) * 360 : 0;
    return `${colorFor(item, index)} ${start}deg ${end}deg`;
  });

  return (
    <div className={['vd-po-donut-chart', className ?? ''].filter(Boolean).join(' ')}>
      {(title || label) && (
        <div className="vd-po-donut-chart__header">
          {title && <span className="vd-po-donut-chart__title">{title}</span>}
          {label && <span className="vd-po-donut-chart__label">{label} ›</span>}
        </div>
      )}
      <div className="vd-po-donut-chart__ring" style={{ background: `conic-gradient(${stops.join(', ')})` }}>
        <div className="vd-po-donut-chart__center">
          <span className="vd-po-donut-chart__total">{total ?? sum.toLocaleString('pt-BR')}</span>
          <span className="vd-po-donut-chart__caption">{caption}</span>
        </div>
      </div>
      <div className="vd-po-donut-chart__legend">
        {items.map((item, index) => (
          <span key={item.label} className="vd-po-donut-chart__legend-item">
            <span className="vd-po-donut-chart__legend-dot" style={{ backgroundColor: colorFor(item, index) }} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
