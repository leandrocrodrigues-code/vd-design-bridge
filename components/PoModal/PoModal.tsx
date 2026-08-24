import type { ReactNode } from 'react';
import { PoButton } from '../PoButton/PoButton';
import './po-modal.tokens.css';

export type PoModalStatus = 'brand' | 'neutral' | 'informative' | 'success' | 'warning' | 'alert';

export interface PoModalAction {
  label: string;
  onClick?: () => void;
}

export interface PoModalProps {
  /** p-title */
  title: string;
  paragraph?: string;
  icon?: ReactNode;
  status?: PoModalStatus;
  /** p-primary-action */
  primaryAction?: PoModalAction;
  /** p-secondary-action */
  secondaryAction?: PoModalAction;
  tertiaryAction?: PoModalAction;
  /** p-hide-close */
  hideClose?: boolean;
  onClose?: () => void;
  open: boolean;
}

/**
 * Preview web do po-modal (PO-UI, variante Feedback) usando os tokens do
 * Design System V&D. Espelha o Modal Feedback do Figma (node
 * `12138:2494`, página "Modal ✅") — validei nó a nó o Type=Success.
 *
 * ⚠️ Modal Progress e Modal Template (as outras 2 variantes do Figma)
 * NÃO foram implementados — ficam como pendência separada, registrada
 * no HANDOFF.
 *
 * Doc oficial: https://po-ui.io/documentation/po-modal
 */
export function PoModal({ title, paragraph, icon, status = 'brand', primaryAction, secondaryAction, tertiaryAction, hideClose = false, onClose, open }: PoModalProps) {
  if (!open) return null;

  return (
    <div className="vd-po-modal-overlay" onClick={onClose}>
      <div className="vd-po-modal" data-status={status} onClick={(e) => e.stopPropagation()}>
        {!hideClose && (
          <button type="button" className="vd-po-modal__close" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        )}
        {icon && <span className="vd-po-modal__icon">{icon}</span>}
        <div className="vd-po-modal__header">
          <span className="vd-po-modal__title">{title}</span>
          {paragraph && <span className="vd-po-modal__paragraph">{paragraph}</span>}
        </div>
        {(primaryAction || secondaryAction || tertiaryAction) && (
          <div className="vd-po-modal__actions">
            {primaryAction && <PoButton label={primaryAction.label} kind="primary" onClick={primaryAction.onClick} />}
            {secondaryAction && <PoButton label={secondaryAction.label} kind="secondary" onClick={secondaryAction.onClick} />}
            {tertiaryAction && <PoButton label={tertiaryAction.label} kind="tertiary" onClick={tertiaryAction.onClick} />}
          </div>
        )}
      </div>
    </div>
  );
}
