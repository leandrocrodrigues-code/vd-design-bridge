import type { ReactNode } from 'react';
import './po-card-template.tokens.css';

export interface PoCardTemplateProps {
  header?: ReactNode;
  content?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/**
 * ⚠️ Não é um componente `po-*` — "Card Template" (PDF
 * `Componentespdf/Card Template.pdf`) é o **scaffold genérico** que os
 * demais Cards (Status, Data, Invoice, Value, Dashboard...) seguem: 3
 * zonas — Header, Content, Action — cada uma opcional. Serve como base
 * de composição, não como um card final com dados reais.
 */
export function PoCardTemplate({ header, content, action, className }: PoCardTemplateProps) {
  return (
    <div className={['vd-po-card-template', className ?? ''].filter(Boolean).join(' ')}>
      {header && <div className="vd-po-card-template__zone vd-po-card-template__zone--header">{header}</div>}
      {content && <div className="vd-po-card-template__zone vd-po-card-template__zone--content">{content}</div>}
      {action && <div className="vd-po-card-template__zone vd-po-card-template__zone--action">{action}</div>}
    </div>
  );
}
