import { type CSSProperties, type ReactNode } from 'react';
import { tokens } from '../../tokens';

export interface TWTCardCopyProps {
  /** Texto pequeno acima do valor. */
  Titulo?: ReactNode;
  /** Valor a ser copiado (ex: um código ou número de documento). */
  Valor?: ReactNode;
  /** Texto do botão de ação. */
  BotaoTexto?: ReactNode;
  /** Ícone do botão de ação. */
  BotaoIcone?: ReactNode;
  /** Procedimento que responde ao clique no botão de copiar. */
  OnCopiar?: () => void;
}

/**
 * **TWTCardCopy** — sem equivalente no PDF do TDN. Nasce da modernização
 * do Design System V&D, componente **Card Copy** do Figma
 * (node 12128:9392, Property1=Default,
 * https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=12128-9392).
 * O prefixo `TWT` antecipa o nome que o time Delphi provavelmente vai usar
 * — proposta de contrato, não confirmada pela documentação TDN.
 */
export function TWTCardCopy({
  Titulo = 'Overline',
  Valor = '999999',
  BotaoTexto = 'Copiar',
  BotaoIcone,
  OnCopiar,
}: TWTCardCopyProps) {
  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '256px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    backgroundColor: tokens.color.surface.card.value,
  };

  const rowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', height: '32px' };
  const overlineStyle: CSSProperties = { fontSize: '12px', lineHeight: '16px', color: tokens.color.content['02'].value };
  const valorStyle: CSSProperties = {
    fontSize: '14px',
    lineHeight: '18px',
    color: tokens.color.surface.brand.highlight.value,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };
  const buttonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    height: '32px',
    padding: '8px 12px',
    borderRadius: tokens.radius['2xsm'].value,
    border: 'none',
    backgroundColor: tokens.color.surface.brand.container.value,
    color: tokens.color.surface.brand.highlight.value,
    fontSize: '15px',
    cursor: 'pointer',
    flexShrink: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <span style={overlineStyle}>{Titulo}</span>
          <span style={valorStyle}>{Valor}</span>
        </span>
        <button type="button" style={buttonStyle} onClick={OnCopiar}>
          <span>{BotaoTexto}</span>
          {BotaoIcone}
        </button>
      </div>
    </div>
  );
}
