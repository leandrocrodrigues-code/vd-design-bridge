import './po-breadcrumb.tokens.css';

export interface PoBreadcrumbItem {
  label: string;
  link?: string;
}

export interface PoBreadcrumbProps {
  /** p-items */
  items: PoBreadcrumbItem[];
  onNavigate?: (item: PoBreadcrumbItem, index: number) => void;
  className?: string;
}

/**
 * Preview web do po-breadcrumb (PO-UI) usando os tokens do Design
 * System V&D. Espelha o Breadcrumb do Figma (node `12288:8527`, página
 * "Breadcrumb (Web) 🚧" — marcada work-in-progress no próprio Figma).
 *
 * Doc oficial: https://po-ui.io/documentation/po-breadcrumb
 */
export function PoBreadcrumb({ items, onNavigate, className }: PoBreadcrumbProps) {
  return (
    <nav className={['vd-po-breadcrumb', className ?? ''].filter(Boolean).join(' ')} aria-label="breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {index > 0 && (
              <svg className="vd-po-breadcrumb__separator" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <a
              href={item.link ?? '#'}
              className="vd-po-breadcrumb__item"
              data-current={isLast ? 'true' : undefined}
              onClick={(event) => {
                if (!item.link) event.preventDefault();
                onNavigate?.(item, index);
              }}
            >
              {item.label}
            </a>
          </span>
        );
      })}
    </nav>
  );
}
