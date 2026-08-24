import './po-tabs.tokens.css';

export interface PoTabItem {
  key: string;
  label: string;
}

export interface PoTabsProps {
  items: PoTabItem[];
  active: string;
  onChange?: (key: string) => void;
  className?: string;
}

/**
 * Preview web do po-tabs (PO-UI) usando os tokens do Design System V&D.
 * Espelha o Tabs do Figma (node `3635:7682`, página "Tabs ✅").
 *
 * Doc oficial: https://po-ui.io/documentation/po-tabs
 */
export function PoTabs({ items, active, onChange, className }: PoTabsProps) {
  return (
    <div className={['vd-po-tabs', className ?? ''].filter(Boolean).join(' ')} role="tablist">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          role="tab"
          aria-selected={item.key === active}
          className="vd-po-tabs__item"
          data-active={item.key === active ? 'true' : undefined}
          onClick={() => onChange?.(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
