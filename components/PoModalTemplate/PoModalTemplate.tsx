import type { ReactNode } from 'react';
import './po-modal-template.tokens.css';

export interface PoModalTemplateProps {
  header?: ReactNode;
  content?: ReactNode;
  action?: ReactNode;
  onClose?: () => void;
  open: boolean;
}

/**
 * Preview do **scaffold genérico** do po-modal (PDF
 * \`Componentespdf/modal/Modal (Template).pdf\`) — 3 zonas: Header,
 * Content, Action, cada uma opcional. É a base de composição que as
 * variantes reais (Feedback, Progress) seguem — não um modal final com
 * dados reais. Mesmo padrão do [[PoCardTemplate]].
 */
export function PoModalTemplate({ header, content, action, onClose, open }: PoModalTemplateProps) {
  if (!open) return null;

  return (
    <div className="vd-po-modal-template-overlay" onClick={onClose}>
      <div className="vd-po-modal-template" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="vd-po-modal-template__close" onClick={onClose} aria-label="Fechar">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        {header && <div className="vd-po-modal-template__zone vd-po-modal-template__zone--header">{header}</div>}
        {content && <div className="vd-po-modal-template__zone vd-po-modal-template__zone--content">{content}</div>}
        {action && <div className="vd-po-modal-template__zone vd-po-modal-template__zone--action">{action}</div>}
      </div>
    </div>
  );
}
