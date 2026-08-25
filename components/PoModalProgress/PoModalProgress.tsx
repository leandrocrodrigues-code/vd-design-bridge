import './po-modal-progress.tokens.css';

export type PoModalProgressStepStatus = 'done' | 'active' | 'locked';

export interface PoModalProgressStep {
  label: string;
  status: PoModalProgressStepStatus;
}

export interface PoModalProgressProps {
  title?: string;
  paragraph?: string;
  steps: PoModalProgressStep[];
  onClose?: () => void;
  footerLinkLabel?: string;
  onFooterLinkClick?: () => void;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  primaryLabel?: string;
  onPrimaryClick?: () => void;
  open: boolean;
}

function StepIcon({ status }: { status: PoModalProgressStepStatus }) {
  if (status === 'done') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === 'active') {
    return (
      <svg viewBox="0 0 16 16" width="18" height="18">
        <circle cx="8" cy="8" r="6.5" stroke="var(--vd-color-surface-container)" strokeWidth="2" fill="none" />
        <path d="M8 1.5a6.5 6.5 0 0 1 6.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

/**
 * Preview web do po-modal (variante Progress) usando os tokens do
 * Design System V&D. Extraído de \`Componentespdf/modal/Modal
 * Progress.pdf\` — lista de passos com 3 estados (done/active/locked),
 * footer com link + 2 botões.
 *
 * Doc oficial: https://po-ui.io/documentation/po-modal
 */
export function PoModalProgress({
  title = 'Title Text',
  paragraph = 'Paragraph Text',
  steps,
  onClose,
  footerLinkLabel = 'Label',
  onFooterLinkClick,
  secondaryLabel = 'Label',
  onSecondaryClick,
  primaryLabel = 'Label',
  onPrimaryClick,
  open,
}: PoModalProgressProps) {
  if (!open) return null;

  return (
    <div className="vd-po-modal-progress-overlay" onClick={onClose}>
      <div className="vd-po-modal-progress" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="vd-po-modal-progress__close" onClick={onClose} aria-label="Fechar">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="vd-po-modal-progress__header">
          <span className="vd-po-modal-progress__title">{title}</span>
          <span className="vd-po-modal-progress__paragraph">{paragraph}</span>
        </div>
        <div className="vd-po-modal-progress__steps">
          {steps.map((step, index) => (
            <div key={index} className="vd-po-modal-progress__step" data-status={step.status}>
              <span className="vd-po-modal-progress__step-icon">
                <StepIcon status={step.status} />
              </span>
              <span className="vd-po-modal-progress__step-label">{step.label}</span>
            </div>
          ))}
        </div>
        <div className="vd-po-modal-progress__footer">
          <button type="button" className="vd-po-modal-progress__link" onClick={onFooterLinkClick}>
            {footerLinkLabel}
          </button>
          <div className="vd-po-modal-progress__footer-actions">
            <button type="button" className="vd-po-modal-progress__button vd-po-modal-progress__button--secondary" onClick={onSecondaryClick}>
              {secondaryLabel}
            </button>
            <button type="button" className="vd-po-modal-progress__button vd-po-modal-progress__button--primary" onClick={onPrimaryClick}>
              {primaryLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
