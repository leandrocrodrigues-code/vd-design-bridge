import './po-toaster.tokens.css';

/** p-type oficial: Information | Success | Warning | Error. Neutral/Brand são extensão V&D. */
export type PoToasterType = 'information' | 'success' | 'warning' | 'error' | 'neutral' | 'brand';

export interface PoToasterProps {
  /** p-message */
  message: string;
  /** p-type */
  type?: PoToasterType;
  /** p-action-label */
  actionLabel?: string;
  onAction?: () => void;
  /** p-show-close */
  showClose?: boolean;
  onClose?: () => void;
  className?: string;
}

/**
 * Preview web do po-toaster (PO-UI) usando os tokens do Design System
 * V&D. Espelha o Toast do Figma (node `318:5338`, página "Toast ✅") —
 * 6 Type confirmados nó a nó.
 *
 * Doc oficial: https://po-ui.io/documentation/po-toaster
 */
export function PoToaster({ message, type = 'information', actionLabel, onAction, showClose = true, onClose, className }: PoToasterProps) {
  return (
    <div className={['vd-po-toaster', className ?? ''].filter(Boolean).join(' ')} data-type={type} role="status">
      <span className="vd-po-toaster__message">{message}</span>
      <span className="vd-po-toaster__actions">
        {actionLabel && (
          <button type="button" className="vd-po-toaster__button" onClick={onAction}>
            {actionLabel}
          </button>
        )}
        {showClose && (
          <button type="button" className="vd-po-toaster__button" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        )}
      </span>
    </div>
  );
}
