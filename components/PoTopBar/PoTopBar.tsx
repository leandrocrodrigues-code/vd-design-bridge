import './po-top-bar.tokens.css';

export interface PoTopBarProps {
  /** hierarchy=N1 (só título) ou N2 (breadcrumb "Principal / Secundário") */
  hierarchy?: 'N1' | 'N2';
  /** Nome da rotina/página principal */
  mainPageTitle?: string;
  /** Só usado em hierarchy="N2" */
  secondaryPageTitle?: string;
  /** Badge "Beta" ao lado da versão */
  betaTag?: boolean;
  /** Botão de voltar (seta) antes da marca */
  hasBackButton?: boolean;
  /** Botão "Recording..." (gravação de macro Delphi) */
  hasRecordButton?: boolean;
  /** Botão de notificações (com badge de alerta) */
  hasNotificationButton?: boolean;
  /** Botão de menu contextual (kebab) */
  hasContextualMenu?: boolean;
  /** Controles de janela (minimizar/maximizar/fechar) — específico do wallpaper Delphi */
  hasWindowControls?: boolean;
  onBack?: () => void;
  onNotificationClick?: () => void;
  onContextualMenuClick?: () => void;
  className?: string;
}

/**
 * ⚠️ Não é um componente `po-*` — "Top Bar (Wallpaper Delphi)" no Figma
 * (node `5047:5411`, página "Top Bar ✅") é a faixa de janela específica
 * do wallpaper Delphi (marca + versão + ações + controles de janela).
 * A PO-UI não tem um componente equivalente direto — o mais próximo é
 * compor `po-toolbar`/cabeçalho de página com `po-button`, mas o visual
 * aqui (barra azul cheia + controles de janela minimizar/maximizar/
 * fechar) é específico da casca desktop do Delphi, não um padrão web
 * genérico. Implementado como composição, com os tokens `--vd-color-*`.
 *
 * "Top Bar (Web)" (node `11931:35705`) está marcado 🚧 no Figma — não
 * implementado nesta rodada.
 */
export function PoTopBar({
  hierarchy = 'N1',
  mainPageTitle = 'Nome da Rotina',
  secondaryPageTitle = 'Configurações',
  betaTag = false,
  hasBackButton = false,
  hasRecordButton = false,
  hasNotificationButton = true,
  hasContextualMenu = true,
  hasWindowControls = true,
  onBack,
  onNotificationClick,
  onContextualMenuClick,
  className,
}: PoTopBarProps) {
  return (
    <div className={['vd-po-top-bar', className ?? ''].filter(Boolean).join(' ')}>
      <div className="vd-po-top-bar__leading">
        {hasBackButton && (
          <button type="button" className="vd-po-top-bar__icon-button" aria-label="Voltar" onClick={onBack}>
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <span className="vd-po-top-bar__brand">TOTVS</span>
        <span className="vd-po-top-bar__version">v.00.0.00.000</span>
        {betaTag && <span className="vd-po-top-bar__badge">Beta</span>}
      </div>

      <div className="vd-po-top-bar__title">
        <span>{mainPageTitle}</span>
        {hierarchy === 'N2' && (
          <>
            <span className="vd-po-top-bar__title-separator">/</span>
            <span>{secondaryPageTitle}</span>
          </>
        )}
      </div>

      <div className="vd-po-top-bar__trailing">
        {hasRecordButton && (
          <div className="vd-po-top-bar__record">
            <span>Recording...</span>
            <button type="button" className="vd-po-top-bar__icon-button" aria-label="Parar gravação">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                <rect x="4" y="4" width="8" height="8" rx="1" fill="currentColor" />
              </svg>
            </button>
          </div>
        )}
        {hasNotificationButton && (
          <span className="vd-po-top-bar__notification">
            <button type="button" className="vd-po-top-bar__icon-button" aria-label="Notificações" onClick={onNotificationClick}>
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                <path d="M8 2a4 4 0 0 0-4 4v2.5L2.5 11h11L12 8.5V6a4 4 0 0 0-4-4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M6.5 13a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
            <span className="vd-po-top-bar__notification-dot" aria-hidden="true" />
          </span>
        )}
        {hasContextualMenu && (
          <button type="button" className="vd-po-top-bar__icon-button" aria-label="Menu contextual" onClick={onContextualMenuClick}>
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
              <circle cx="8" cy="3.5" r="1.2" fill="currentColor" />
              <circle cx="8" cy="8" r="1.2" fill="currentColor" />
              <circle cx="8" cy="12.5" r="1.2" fill="currentColor" />
            </svg>
          </button>
        )}
        {hasWindowControls && (
          <div className="vd-po-top-bar__window-controls">
            <button type="button" className="vd-po-top-bar__window-button" aria-label="Minimizar">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                <rect x="3" y="9" width="10" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>
            <button type="button" className="vd-po-top-bar__window-button" aria-label="Maximizar">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                <rect x="3" y="3" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>
            <button type="button" className="vd-po-top-bar__window-button" aria-label="Fechar">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
