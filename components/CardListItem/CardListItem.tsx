import { type CSSProperties, type ReactNode } from 'react';
import { tokens } from '../../tokens';

export interface TWTCardListItemProps {
  /** Texto principal da linha. */
  Primario?: ReactNode;
  /** Texto secundário/descritivo abaixo do primário. */
  Secundario?: ReactNode;
  /** Ícone exibido dentro da tag, à direita. */
  TagIcone?: ReactNode;
  /** Texto exibido dentro da tag, à direita. */
  TagTexto?: ReactNode;
}

/**
 * **TWTCardListItem** — sem equivalente no PDF do TDN. Nasce da
 * modernização do Design System V&D, componente **Card List Item** do
 * Figma (node 12136:22236,
 * https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=12136-22236).
 * O prefixo `TWT` antecipa o nome que o time Delphi provavelmente vai usar
 * — proposta de contrato, não confirmada pela documentação TDN.
 */
export function TWTCardListItem({
  Primario = 'Texto primário',
  Secundario = 'Texto secundário',
  TagIcone,
  TagTexto = 'Tag',
}: TWTCardListItemProps) {
  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '416px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    backgroundColor: tokens.color.surface.card.value,
  };

  const textColumnStyle: CSSProperties = { display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 };
  const primaryStyle: CSSProperties = { fontSize: '14px', lineHeight: '18px', color: tokens.color.content.pure.value };
  const secondaryStyle: CSSProperties = { fontSize: '12px', lineHeight: '16px', color: tokens.color.content['03'].value };

  const tagStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 12px',
    borderRadius: '41px',
    border: `1px solid ${tokens.color.surface.container.value}`,
    backgroundColor: tokens.color.surface.pure.value,
    flexShrink: 0,
  };
  const tagIconStyle: CSSProperties = { width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: tokens.color.surface.inverse.value };
  const tagTextStyle: CSSProperties = { fontSize: '14px', lineHeight: '18px', color: tokens.color.surface.inverse.value };

  return (
    <div style={containerStyle}>
      <div style={textColumnStyle}>
        <span style={primaryStyle}>{Primario}</span>
        <span style={secondaryStyle}>{Secundario}</span>
      </div>
      <div style={tagStyle}>
        {TagIcone && <span style={tagIconStyle}>{TagIcone}</span>}
        <span style={tagTextStyle}>{TagTexto}</span>
      </div>
    </div>
  );
}
