import { useState, type ReactNode } from 'react';
import './po-accordion.tokens.css';

export interface PoAccordionItemData {
  key: string;
  label: string;
  title?: string;
  content: ReactNode;
}

export interface PoAccordionProps {
  items: PoAccordionItemData[];
  /** p-allow-expand-all-items */
  allowExpandItems?: boolean;
  className?: string;
}

/**
 * Preview web do po-accordion (PO-UI) usando os tokens do Design System
 * V&D. Espelha o Accordion do Figma (node `3500:6499`, página
 * "Accordion ✅") — 3 status (Closed/Hover/Open) confirmados nó a nó.
 *
 * Doc oficial: https://po-ui.io/documentation/po-accordion
 */
export function PoAccordion({ items, allowExpandItems = false, className }: PoAccordionProps) {
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = allowExpandItems ? new Set(prev) : new Set<string>();
      if (prev.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <div className={className}>
      {items.map((item) => {
        const isOpen = openKeys.has(item.key);
        return (
          <div key={item.key} className="vd-po-accordion-item" data-open={isOpen ? 'true' : undefined}>
            <button type="button" className="vd-po-accordion-item__header" onClick={() => toggle(item.key)}>
              <span>{item.label}</span>
              <svg className="vd-po-accordion-item__chevron" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {isOpen && (
              <div className="vd-po-accordion-item__body">
                {item.title && <p className="vd-po-accordion-item__body-title">{item.title}</p>}
                <div className="vd-po-accordion-item__body-text">{item.content}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
