import './po-bar-chart.tokens.css';

export interface PoBarChartItem {
  label: string;
  value: number;
  /** índice na paleta de 5 cores padrão (0-4) — ignorado se `color` for passado */
  colorIndex?: number;
  color?: string;
}

export interface PoBarChartProps {
  title?: string;
  label?: string;
  /** eixo das barras */
  orientation?: 'vertical' | 'horizontal';
  items: PoBarChartItem[];
  /** valor máximo do eixo — padrão: maior valor entre os items */
  max?: number;
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
 * ⚠️ Não é um componente `po-*` — "Bar Chart" no Figma (frame `Bar Chart`,
 * página "Bar Chart ✅" do PDF `Componentespdf/charts.pdf`) é um
 * componente **Composition** ("Section Header + Progress Bar + Button"),
 * cuja renderização real usa **Echarts** (echarts.apache.org), não um
 * `po-chart`. Este preview cobre só a variante "single value" (1 série
 * por categoria) mostrada no PDF — não implementa a variante empilhada
 * (stacked) nem eixos numéricos com grid.
 *
 * Cores: paleta de 5 cores confirmada no PDF (Color 01-05) — o doc
 * menciona 14 cores de gráfico ao todo, "incluindo as definidas para
 * feedback que também são utilizadas". Mapeadas aqui pros tokens de
 * feedback já existentes no Design System (`--vd-color-feedback-*`) +
 * brand pure — as 9 cores restantes da paleta completa não foram
 * confirmadas nesta rodada.
 */
export function PoBarChart({ title, label, orientation = 'vertical', items, max, className }: PoBarChartProps) {
  const maxValue = max ?? Math.max(...items.map((i) => i.value), 1);
  const colorFor = (item: PoBarChartItem, index: number) => item.color ?? DEFAULT_COLORS[item.colorIndex ?? index % DEFAULT_COLORS.length];

  return (
    <div className={['vd-po-bar-chart', className ?? ''].filter(Boolean).join(' ')}>
      {(title || label) && (
        <div className="vd-po-bar-chart__header">
          {title && <span className="vd-po-bar-chart__title">{title}</span>}
          {label && <span className="vd-po-bar-chart__label">{label} ›</span>}
        </div>
      )}
      <div className="vd-po-bar-chart__body" data-orientation={orientation}>
        {items.map((item, index) => {
          const pct = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
          return (
            <div key={item.label} className="vd-po-bar-chart__item">
              <div className="vd-po-bar-chart__track">
                <div
                  className="vd-po-bar-chart__fill"
                  style={
                    orientation === 'vertical'
                      ? { height: `${pct}%`, backgroundColor: colorFor(item, index) }
                      : { width: `${pct}%`, backgroundColor: colorFor(item, index) }
                  }
                />
              </div>
              <span className="vd-po-bar-chart__value">{item.value.toLocaleString('pt-BR')}</span>
              <span className="vd-po-bar-chart__item-label">{item.label}</span>
            </div>
          );
        })}
      </div>
      <div className="vd-po-bar-chart__legend">
        {items.map((item, index) => (
          <span key={item.label} className="vd-po-bar-chart__legend-item">
            <span className="vd-po-bar-chart__legend-dot" style={{ backgroundColor: colorFor(item, index) }} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
