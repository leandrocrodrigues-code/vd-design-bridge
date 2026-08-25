import { useState } from 'react';
import './po-card-copy.tokens.css';

export interface PoCardCopyProps {
  overline?: string;
  value?: string;
  /** texto do botão no estado normal */
  copyLabel?: string;
  /** texto do botão após copiar */
  copiedLabel?: string;
  /** duração (ms) do estado "copiado" antes de voltar ao normal */
  resetDelay?: number;
  className?: string;
}

/**
 * ⚠️ Não é um componente `po-*` — "Card Copy" (PDF `Componentespdf/Card
 * Copy.pdf`) é um card **Core/Composition**: Overline + valor + botão
 * de copiar, com feedback visual "Copiado" (verde) após o clique.
 */
export function PoCardCopy({ overline = 'Overline', value = '999999', copyLabel = 'Copiar', copiedLabel = 'Copiado', resetDelay = 2000, className }: PoCardCopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), resetDelay);
  };

  return (
    <div className={['vd-po-card-copy', className ?? ''].filter(Boolean).join(' ')}>
      <div className="vd-po-card-copy__text">
        <span className="vd-po-card-copy__overline">{overline}</span>
        <span className="vd-po-card-copy__value">{value}</span>
      </div>
      <button type="button" className="vd-po-card-copy__button" data-copied={copied ? 'true' : undefined} onClick={handleCopy}>
        {copied ? copiedLabel : copyLabel}
        {copied ? (
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M5.5 8l1.8 1.8L10.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <rect x="6" y="6" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M4 10.5H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h6.5a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        )}
      </button>
    </div>
  );
}
