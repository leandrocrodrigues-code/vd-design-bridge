import type { ReactNode } from 'react';
import './po-drawer.tokens.css';

export type PoDrawerItemStatus = 'neutral' | 'alert' | 'uploading' | 'success';

export interface PoDrawerChip {
  label: string;
}

export interface PoDrawerItem {
  date: string;
  label: string;
  status?: PoDrawerItemStatus;
  checked?: boolean;
  /** só usado com status="uploading" */
  progress?: { value: number; meta: string };
}

export interface PoDrawerProps {
  icon?: ReactNode;
  overline?: string;
  title?: string;
  onClose?: () => void;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  actionLabel?: string;
  onAction?: () => void;
  chips?: PoDrawerChip[];
  onRemoveChip?: (index: number) => void;
  items?: PoDrawerItem[];
  onToggleItem?: (index: number) => void;
  footerLinkLabel?: string;
  onFooterLinkClick?: () => void;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  primaryLabel?: string;
  onPrimaryClick?: () => void;
  className?: string;
}

function StatusIcon({ status }: { status: PoDrawerItemStatus }) {
  if (status === 'success') {
    return (
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
        <path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === 'alert') {
    return (
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
        <path d="M8 5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11" r="0.8" fill="currentColor" />
      </svg>
    );
  }
  if (status === 'uploading') {
    return (
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
        <path d="M8 11V3M4.5 6.5 8 3l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
      <path d="M8 1.5 14 5v6l-6 3.5L2 11V5l6-3.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * ⚠️ Não é um componente `po-*` — "Drawer List Control" (PDF
 * `Componentespdf/drawer.pdf`) é um card **Core/Composition**: painel
 * lateral com header (ícone + overline/title + fechar), busca + ação,
 * chips de filtro removíveis, lista de itens selecionáveis
 * (checkbox + ícone de status + data/label + indicador), e footer com
 * link + 2 botões. Provavelmente composto internamente de
 * po-checkbox + po-input + po-button + po-tag na implementação real —
 * não confirmado nó a nó.
 */
export function PoDrawer({
  icon,
  overline = 'Overline Text',
  title = 'Title Text',
  onClose,
  searchPlaceholder = 'Search',
  searchValue,
  onSearchChange,
  actionLabel = 'Action',
  onAction,
  chips = [],
  onRemoveChip,
  items = [],
  onToggleItem,
  footerLinkLabel = 'Label',
  onFooterLinkClick,
  secondaryLabel = 'Label',
  onSecondaryClick,
  primaryLabel = 'Label',
  onPrimaryClick,
  className,
}: PoDrawerProps) {
  return (
    <div className={['vd-po-drawer', className ?? ''].filter(Boolean).join(' ')}>
      <div className="vd-po-drawer__header">
        <span className="vd-po-drawer__avatar">
          {icon ?? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path d="M12 3l8 4v5c0 5-3.4 7.9-8 9-4.6-1.1-8-4-8-9V7l8-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <div className="vd-po-drawer__header-text">
          <span className="vd-po-drawer__overline">{overline}</span>
          <span className="vd-po-drawer__title">{title}</span>
        </div>
        <button type="button" className="vd-po-drawer__close" aria-label="Fechar" onClick={onClose}>
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="vd-po-drawer__search-row">
        <div className="vd-po-drawer__search">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="m13 13-2.5-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            className="vd-po-drawer__search-input"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
        <button type="button" className="vd-po-drawer__action" onClick={onAction}>
          {actionLabel}
        </button>
      </div>

      {chips.length > 0 && (
        <div className="vd-po-drawer__chips">
          {chips.map((chip, index) => (
            <span key={index} className="vd-po-drawer__chip">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
                <path d="M8 1.5 14 5v6l-6 3.5L2 11V5l6-3.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
              {chip.label}
              <button type="button" aria-label={`Remover ${chip.label}`} onClick={() => onRemoveChip?.(index)}>
                <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M6 6l4 4M10 6l-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="vd-po-drawer__list">
        {items.map((item, index) => {
          const status = item.status ?? 'neutral';
          return (
            <div key={index} className="vd-po-drawer__item">
              <input
                type="checkbox"
                className="vd-po-drawer__checkbox"
                checked={item.checked ?? false}
                onChange={() => onToggleItem?.(index)}
              />
              <span className="vd-po-drawer__item-icon" data-status={status}>
                <StatusIcon status={status} />
              </span>
              <div className="vd-po-drawer__item-text">
                <span className="vd-po-drawer__item-date">{item.date}</span>
                <span className="vd-po-drawer__item-label">{item.label}</span>
                {status === 'uploading' && item.progress && (
                  <>
                    <span className="vd-po-drawer__item-meta">{item.progress.meta}</span>
                    <span className="vd-po-drawer__item-track">
                      <span className="vd-po-drawer__item-fill" style={{ width: `${Math.max(0, Math.min(100, item.progress.value))}%` }} />
                    </span>
                  </>
                )}
              </div>
              <span className="vd-po-drawer__item-dot" aria-hidden="true" />
            </div>
          );
        })}
      </div>

      <div className="vd-po-drawer__footer">
        <button type="button" className="vd-po-drawer__link" onClick={onFooterLinkClick}>
          {footerLinkLabel}
        </button>
        <div className="vd-po-drawer__footer-actions">
          <button type="button" className="vd-po-drawer__button vd-po-drawer__button--secondary" onClick={onSecondaryClick}>
            {secondaryLabel}
          </button>
          <button type="button" className="vd-po-drawer__button vd-po-drawer__button--primary" onClick={onPrimaryClick}>
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
