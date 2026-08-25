import './po-card-loading.tokens.css';

export interface PoCardLoadingProps {
  title?: string;
  subtitle?: string;
  /** 0-100 */
  value?: number;
  onClose?: () => void;
  className?: string;
}

/**
 * ⚠️ Não é um componente `po-*` — "Card Loading" (PDF
 * `Componentespdf/Card Loading.pdf`) é um card **Core/Composition**
 * de progresso genérico: título + subtítulo, percentual + botão de
 * fechar, progress bar.
 */
export function PoCardLoading({ title = 'Atualizando...', subtitle = '4 minutos restantes', value = 50, onClose, className }: PoCardLoadingProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={['vd-po-card-loading', className ?? ''].filter(Boolean).join(' ')}>
      <div className="vd-po-card-loading__row">
        <div className="vd-po-card-loading__text">
          <span className="vd-po-card-loading__title">{title}</span>
          <span className="vd-po-card-loading__subtitle">{subtitle}</span>
        </div>
        <span className="vd-po-card-loading__percent">{clamped}%</span>
        <button type="button" className="vd-po-card-loading__close" aria-label="Fechar" onClick={onClose}>
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="vd-po-card-loading__track">
        <div className="vd-po-card-loading__fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
