import type { ReactNode } from 'react';
import './po-menu-web.tokens.css';

export interface PoMenuWebNavItem {
  icon: ReactNode;
  active?: boolean;
}

export interface PoMenuWebGroupItem {
  code?: string;
  label: string;
  active?: boolean;
}

export interface PoMenuWebGroup {
  label: string;
  expanded?: boolean;
  items?: PoMenuWebGroupItem[];
}

export interface PoMenuWebProps {
  logo?: ReactNode;
  navItems: PoMenuWebNavItem[];
  onNavItemClick?: (index: number) => void;
  settingsIcon?: ReactNode;
  onSettingsClick?: () => void;
  /** true = só a trilha de ícones; false = trilha + painel expandido */
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  title?: string;
  quickAccessLabel?: string;
  quickAccessPlaceholder?: string;
  onQuickAccessClick?: () => void;
  groups?: PoMenuWebGroup[];
  onGroupToggle?: (index: number) => void;
  onGroupItemClick?: (groupIndex: number, itemIndex: number) => void;
  className?: string;
}

const ChevronDown = ({ up }: { up?: boolean }) => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" style={{ transform: up ? 'rotate(180deg)' : undefined }}>
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * ⚠️ Não é um componente `po-*` — "Menu (Web)" (PDF
 * `Componentespdf/menu web/Menu (Web).pdf`) está marcado 🚧 no Figma
 * (work-in-progress). Trilha de ícones (logo + navegação + engrenagem)
 * + painel expansível (título, acesso rápido, grupos colapsáveis de
 * rotinas numeradas). Provavelmente a versão web robusta do `po-menu`
 * real (com `logo`, `collapsed`, `subItems`) — não confirmado nó a nó.
 */
export function PoMenuWeb({
  logo,
  navItems,
  onNavItemClick,
  settingsIcon,
  onSettingsClick,
  collapsed = false,
  onToggleCollapse,
  title = 'Title Text',
  quickAccessLabel = 'Acesso rápido',
  quickAccessPlaceholder = 'Digite uma rotina',
  onQuickAccessClick,
  groups = [],
  onGroupToggle,
  onGroupItemClick,
  className,
}: PoMenuWebProps) {
  return (
    <div className={['vd-po-menu-web', className ?? ''].filter(Boolean).join(' ')}>
      <div className="vd-po-menu-web__rail">
        <span className="vd-po-menu-web__logo">{logo ?? <span className="vd-po-menu-web__logo-placeholder" />}</span>
        <nav className="vd-po-menu-web__nav">
          {navItems.map((item, index) => (
            <button
              key={index}
              type="button"
              className="vd-po-menu-web__nav-item"
              data-active={item.active ? 'true' : undefined}
              onClick={() => onNavItemClick?.(index)}
            >
              {item.icon}
            </button>
          ))}
        </nav>
        <button type="button" className="vd-po-menu-web__nav-item vd-po-menu-web__settings" onClick={onSettingsClick} aria-label="Configurações">
          {settingsIcon ?? (
            <svg viewBox="0 0 16 16" width="18" height="18" fill="none">
              <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
              <path d="M8 1.5v2M8 12.5v2M2.6 4.6l1.4 1.4M12 10l1.4 1.4M1.5 8h2M12.5 8h2M2.6 11.4 4 10M12 6l1.4-1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {!collapsed && (
        <div className="vd-po-menu-web__panel">
          <div className="vd-po-menu-web__panel-header">
            <span className="vd-po-menu-web__title">{title}</span>
            <button type="button" className="vd-po-menu-web__collapse" onClick={onToggleCollapse} aria-label="Recolher menu">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                <path d="M10 3 6 8l4 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="vd-po-menu-web__quick-access">
            <span className="vd-po-menu-web__section-label">{quickAccessLabel}</span>
            <button type="button" className="vd-po-menu-web__quick-button" onClick={onQuickAccessClick}>
              {quickAccessPlaceholder}
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="vd-po-menu-web__divider" />

          <div className="vd-po-menu-web__groups">
            {groups.map((group, groupIndex) => (
              <div key={groupIndex} className="vd-po-menu-web__group">
                <button type="button" className="vd-po-menu-web__group-header" onClick={() => onGroupToggle?.(groupIndex)}>
                  <span className="vd-po-menu-web__section-label">{group.label}</span>
                  <ChevronDown up={group.expanded} />
                </button>
                {group.expanded && group.items && (
                  <div className="vd-po-menu-web__group-items">
                    {group.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        type="button"
                        className="vd-po-menu-web__group-item"
                        data-active={item.active ? 'true' : undefined}
                        onClick={() => onGroupItemClick?.(groupIndex, itemIndex)}
                      >
                        {item.code && <span className="vd-po-menu-web__group-item-code">{item.code}</span>}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
