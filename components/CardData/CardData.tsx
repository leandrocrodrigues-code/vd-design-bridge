import { type CSSProperties, type ReactNode } from 'react';
import { tokens } from '../../tokens';

export type TCardDataColor = 'tcAzul' | 'tcVerde' | 'tcLaranja' | 'tcVermelho' | 'tcMarca';

export interface TWTCardDataProps {
  /** Ícone à esquerda (ImageList no Delphi). */
  Icone?: ReactNode;
  /** Tipo enumerado com o estilo de cor — mesmo espírito do TCardColor do TWTCard. */
  Cor?: TCardDataColor;
  /** Texto pequeno acima do valor. */
  Titulo?: ReactNode;
  /** Valor principal exibido (ex: "R$ 9.999,99"). */
  Valor?: ReactNode;
  /** Texto da etiqueta (badge) à direita, ex: percentual. */
  TagTexto?: ReactNode;
  /** Ícone da etiqueta à direita. */
  TagIcone?: ReactNode;
  /** Quando true, tinge o fundo do card com a cor (variante "Highlight=True" do Figma). */
  Destacado?: boolean;
}

const toneTokens = {
  tcAzul: tokens.color.feedback.informative,
  tcVerde: tokens.color.feedback.success,
  tcLaranja: tokens.color.feedback.warning,
  tcVermelho: tokens.color.feedback.alert,
} as const;

/**
 * **TWTCardData** — sem equivalente documentado no PDF do TDN (o Delphi só
 * documenta o `TWTCard` genérico). Este componente nasce da modernização do
 * Design System V&D no Figma, componente **Card Data**
 * (node 11961:20618 Highlight=False / 11961:20663 Highlight=True,
 * https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=11961-20618),
 * e o prefixo `TWT` antecipa que o time Delphi vai nomear a classe nativa
 * dessa forma quando a implementar — é uma proposta de contrato, não um
 * nome confirmado pela documentação TDN.
 */
export function TWTCardData({
  Icone,
  Cor = 'tcAzul',
  Titulo = 'Overline',
  Valor = 'Label Text',
  TagTexto = '100%',
  TagIcone,
  Destacado = false,
}: TWTCardDataProps) {
  const tone = Cor === 'tcMarca'
    ? { card: tokens.color.surface.brand.card.value }
    : { card: toneTokens[Cor].card.value };

  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '256px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    backgroundColor: Destacado ? tone.card : tokens.color.surface.card.value,
  };

  const rowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' };
  const textColStyle: CSSProperties = { display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 };
  const overlineStyle: CSSProperties = { fontSize: '12px', lineHeight: '16px', color: tokens.color.content['02'].value };
  const valorStyle: CSSProperties = {
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '18px',
    color: tokens.color.content.pure.value,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };
  const tagStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    height: '32px',
    minWidth: '48px',
    padding: '8px 12px',
    borderRadius: '41px',
    backgroundColor: tokens.color.surface.pure.value,
    color: tokens.color.surface.inverse.value,
    fontSize: '14px',
    flexShrink: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={rowStyle}>
        {Icone ? <span aria-hidden="true" style={{ width: 24, height: 24, flexShrink: 0 }}>{Icone}</span> : null}
        <span style={textColStyle}>
          <span style={overlineStyle}>{Titulo}</span>
          <span style={valorStyle}>{Valor}</span>
        </span>
        <span style={tagStyle}>
          <span>{TagTexto}</span>
          {TagIcone}
        </span>
      </div>
    </div>
  );
}
