import type { ReactNode } from 'react';
import './po-hero.tokens.css';

export interface PoHeroProps {
  overline?: string;
  title: string;
  supportText?: string;
  onBack?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
  className?: string;
}

/**
 * ⚠️ Não é um componente Angular único — "Hero" no Figma (node
 * `5046:9134`, página "Hero ✅") é o cabeçalho de página composto por
 * botão voltar + título + busca + tag + botão, montado com po-button/
 * po-search/po-tag/po-divider reais, não um `po-hero`.
 *
 * Confirmado: bg `surface/pure`, divider inferior `surface/card`,
 * título `content/pure` (bold), overline `content/02`.
 */
export function PoHero({ overline, title, supportText, onBack, actionLabel, onAction, children, className }: PoHeroProps) {
  return (
    <div className={['vd-po-hero', className ?? ''].filter(Boolean).join(' ')}>
      <div className="vd-po-hero__top">
        <button type="button" className="vd-po-hero__back" onClick={onBack} aria-label="Voltar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="vd-po-hero__row">
        <div className="vd-po-hero__content">
          {overline && <span className="vd-po-hero__overline">{overline}</span>}
          <span className="vd-po-hero__title">{title}</span>
        </div>
        <div className="vd-po-hero__actions">
          {supportText && <span className="vd-po-hero__support">{supportText}</span>}
          {children}
          {actionLabel && (
            <button type="button" className="vd-po-hero__action" onClick={onAction}>
              {actionLabel}
            </button>
          )}
        </div>
      </div>
      <div className="vd-po-hero__divider" />
    </div>
  );
}
