import { type CSSProperties, type ReactNode } from 'react';
import { tokens } from '../../tokens';

export type TCardInvoiceColor = 'tcAzul' | 'tcVerde' | 'tcLaranja' | 'tcVermelho' | 'tcMarca';

export interface TWTCardInvoiceItem {
  Titulo: ReactNode;
  Valor: ReactNode;
}

export interface TWTCardInvoiceProps {
  /** Tipo enumerado com o estilo de cor da etiqueta superior. */
  Cor?: TCardInvoiceColor;
  /** Ícone da etiqueta superior. */
  TagIcone?: ReactNode;
  /** Texto da etiqueta superior (ex: "Nota Fiscal"). */
  TagTexto?: ReactNode;
  /** Linhas do corpo (cada uma com Titulo pequeno + Valor). Mínimo esperado: 2. */
  Itens?: TWTCardInvoiceItem[];
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
 * **TWTCardInvoice** — sem equivalente no PDF do TDN. Nasce da
 * modernização do Design System V&D, componente **Card Invoice** do Figma
 * (node 11961:36248 Highlight=False,
 * https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=11961-36248).
 * O prefixo `TWT` antecipa o nome que o time Delphi provavelmente vai usar
 * — proposta de contrato, não confirmada pela documentação TDN.
 */
export function TWTCardInvoice({
  Cor = 'tcAzul',
  TagIcone,
  TagTexto = 'Label Tag',
  Itens = [
    { Titulo: 'Overline', Valor: 'Label Text' },
    { Titulo: 'Overline', Valor: 'Label Text' },
  ],
  Destacado = false,
}: TWTCardInvoiceProps) {
  const tone = Cor === 'tcMarca'
    ? { card: tokens.color.surface.brand.card.value, container: tokens.color.surface.brand.container.value, highlight: tokens.color.surface.brand.highlight.value }
    : { card: toneTokens[Cor].card.value, container: toneTokens[Cor].container.value, highlight: toneTokens[Cor].highlight.value };

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

  const tagStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    height: '32px',
    width: '100%',
    padding: '0 12px',
    borderRadius: '41px',
    backgroundColor: tone.container,
    color: tone.highlight,
    fontSize: '14px',
  };

  const listStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' };
  const overlineStyle: CSSProperties = { fontSize: '12px', lineHeight: '16px', color: tokens.color.content['02'].value };
  const valorStyle: CSSProperties = { fontSize: '14px', lineHeight: '18px', color: tokens.color.content.pure.value };

  return (
    <div style={containerStyle}>
      <span style={tagStyle}>
        {TagIcone}
        <span>{TagTexto}</span>
      </span>
      <div style={listStyle}>
        {Itens.map((item, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={overlineStyle}>{item.Titulo}</span>
            <span style={valorStyle}>{item.Valor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
