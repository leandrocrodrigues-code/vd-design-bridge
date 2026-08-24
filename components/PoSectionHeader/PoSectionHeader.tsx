import type { ReactNode } from 'react';
import './po-section-header.tokens.css';

export type PoSectionHeaderSize = 'small' | 'medium' | 'large';

export interface PoSectionHeaderProps {
  overline?: string;
  title: string;
  paragraph?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  size?: PoSectionHeaderSize;
  className?: string;
}

/**
 * ⚠️ Não corresponde a um componente Angular único da PO-UI — "Section
 * Header" no Figma (node `12143:8089`, página "Section Header ✅ New!")
 * é um padrão de composição (avatar/ícone + overline + título +
 * parágrafo + botão de ação), tipicamente montado com po-avatar +
 * texto + po-button na implementação real, não um `po-section-header`.
 *
 * Confirmado nó a nó: overline `content/02`, título `content/pure`
 * (bold), parágrafo `content/03`, avatar `surface/container`, ação
 * `surface/brand/highlight`.
 */
export function PoSectionHeader({ overline, title, paragraph, icon, actionLabel, onAction, size = 'large', className }: PoSectionHeaderProps) {
  return (
    <div className={['vd-po-section-header', className ?? ''].filter(Boolean).join(' ')} data-size={size}>
      {icon && <span className="vd-po-section-header__avatar">{icon}</span>}
      <div className="vd-po-section-header__content">
        {overline && <span className="vd-po-section-header__overline">{overline}</span>}
        <span className="vd-po-section-header__title">{title}</span>
        {paragraph && <span className="vd-po-section-header__paragraph">{paragraph}</span>}
      </div>
      {actionLabel && (
        <button type="button" className="vd-po-section-header__action" onClick={onAction}>
          {actionLabel}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
