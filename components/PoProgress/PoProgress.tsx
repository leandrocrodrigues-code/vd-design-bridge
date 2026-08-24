import './po-progress.tokens.css';

export type PoProgressSize = 'small' | 'medium' | 'large';

export interface PoProgressProps {
  /** p-value (0-100) */
  value: number;
  /** p-size */
  size?: PoProgressSize;
  /** p-show-percentage */
  showPercentage?: boolean;
  className?: string;
}

/**
 * Preview web do po-progress (shape=bar) usando os tokens do Design
 * System V&D. Espelha o Progress Bar do Figma (node `321:7834`, página
 * "Progress Bar ✅").
 *
 * Doc oficial: https://po-ui.io/documentation/po-progress
 */
export function PoProgress({ value, size = 'small', showPercentage = false, className }: PoProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={['vd-po-progress', className ?? ''].filter(Boolean).join(' ')} data-size={size}>
      <div className="vd-po-progress__tray" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
        <div className="vd-po-progress__indicator" style={{ width: `${clamped}%` }} />
      </div>
      {showPercentage && <div className="vd-po-progress__text">{clamped}%</div>}
    </div>
  );
}
