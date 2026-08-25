import type { ReactNode } from 'react';
import './po-top-bar-web.tokens.css';

export interface PoTopBarWebProps {
  logo?: ReactNode;
  label?: string;
  onMenuClick?: () => void;
  hasNotification?: boolean;
  onNotificationClick?: () => void;
  onAppsClick?: () => void;
  userInitials?: string;
  onUserClick?: () => void;
  className?: string;
}

/**
 * ⚠️ Não é um componente `po-*` — "Top Bar (Web)" (PDF
 * `Componentespdf/menu web/topbar web/Top Bar (Web).pdf`) está marcado
 * 🚧 no Figma (work-in-progress). Composição própria: hambúrguer (abre
 * o Menu Web) + logo/label, notificações (com badge), apps (grid) e
 * avatar de usuário (iniciais).
 */
export function PoTopBarWeb({
  logo,
  label = 'Label Text',
  onMenuClick,
  hasNotification = true,
  onNotificationClick,
  onAppsClick,
  userInitials = 'AZ',
  onUserClick,
  className,
}: PoTopBarWebProps) {
  return (
    <div className={['vd-po-top-bar-web', className ?? ''].filter(Boolean).join(' ')}>
      <div className="vd-po-top-bar-web__leading">
        <button type="button" className="vd-po-top-bar-web__icon-button" aria-label="Abrir menu" onClick={onMenuClick}>
          <svg viewBox="0 0 16 16" width="18" height="18" fill="none">
            <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
        {logo ?? <span className="vd-po-top-bar-web__logo-placeholder" aria-hidden="true" />}
        <span className="vd-po-top-bar-web__label">{label}</span>
      </div>
      <div className="vd-po-top-bar-web__trailing">
        <button type="button" className="vd-po-top-bar-web__icon-button" aria-label="Notificações" onClick={onNotificationClick}>
          <svg viewBox="0 0 16 16" width="18" height="18" fill="none">
            <path d="M8 2a4 4 0 0 0-4 4v2.5L2.5 11h11L12 8.5V6a4 4 0 0 0-4-4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M6.5 13a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          {hasNotification && <span className="vd-po-top-bar-web__badge" aria-hidden="true" />}
        </button>
        <button type="button" className="vd-po-top-bar-web__icon-button" aria-label="Aplicativos" onClick={onAppsClick}>
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            {[2, 8, 14].flatMap((x) => [2, 8, 14].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.2" fill="currentColor" />))}
          </svg>
        </button>
        <button type="button" className="vd-po-top-bar-web__avatar" onClick={onUserClick} aria-label="Usuário">
          {userInitials}
        </button>
      </div>
    </div>
  );
}
