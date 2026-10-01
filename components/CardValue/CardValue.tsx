import { type CSSProperties, type ReactNode } from 'react';
import { tokens } from '../../tokens';

export interface TWTCardValueProps {
  /** Texto pequeno acima do valor principal. */
  Titulo?: ReactNode;
  /** Valor principal, em destaque (ex: "R$ 9.999,99"). */
  Valor?: ReactNode;
  /** Texto da etiqueta à direita do título. */
  TagTexto?: ReactNode;
  /** Ícone à esquerda do item de valor secundário. */
  Icone?: ReactNode;
  /** Texto pequeno do item de valor secundário. */
  ValorSecundarioTitulo?: ReactNode;
  /** Valor do item de valor secundário. */
  ValorSecundario?: ReactNode;
}

/**
 * **TWTCardValue** — sem equivalente no PDF do TDN. Nasce da modernização
 * do Design System V&D, componente **Card Value** do Figma
 * (node 12102:23113, State=Default Type=Main,
 * https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=12102-23113).
 * O prefixo `TWT` antecipa o nome que o time Delphi provavelmente vai usar
 * — proposta de contrato, não confirmada pela documentação TDN.
 */
export function TWTCardValue({
  Titulo = 'Overline',
  Valor = 'R$ 9.999,99',
  TagTexto = 'Label Tag',
  Icone,
  ValorSecundarioTitulo = 'Overline',
  ValorSecundario = 'R$ 9.999,99',
}: TWTCardValueProps) {
  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '256px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    backgroundColor: tokens.color.surface.card.value,
  };

  const headerRow: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' };
  const overlineStyle: CSSProperties = { fontSize: '12px', lineHeight: '16px', color: tokens.color.content['02'].value };
  const tituloValorStyle: CSSProperties = {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '24px',
    color: tokens.color.content.pure.value,
  };
  const tagStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '32px',
    minWidth: '48px',
    padding: '8px 12px',
    borderRadius: '41px',
    border: `1px solid ${tokens.color.surface.container.value}`,
    backgroundColor: tokens.color.surface.pure.value,
    color: tokens.color.surface.inverse.value,
    fontSize: '14px',
  };

  const secondaryRow: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' };
  const secondaryValorStyle: CSSProperties = { fontSize: '14px', lineHeight: '18px', color: tokens.color.content.pure.value };

  return (
    <div style={containerStyle}>
      <div style={headerRow}>
        <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <span style={overlineStyle}>{Titulo}</span>
          <span style={tituloValorStyle}>{Valor}</span>
        </span>
        <span style={tagStyle}>{TagTexto}</span>
      </div>
      <div style={secondaryRow}>
        {Icone ? <span aria-hidden="true" style={{ width: 24, height: 24, flexShrink: 0 }}>{Icone}</span> : null}
        <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <span style={overlineStyle}>{ValorSecundarioTitulo}</span>
          <span style={secondaryValorStyle}>{ValorSecundario}</span>
        </span>
      </div>
    </div>
  );
}
