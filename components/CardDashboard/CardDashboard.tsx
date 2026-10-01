import { type CSSProperties, type ReactNode } from 'react';
import { tokens } from '../../tokens';

export interface TWTCardDashboardProps {
  /** Ícone à esquerda do cabeçalho. */
  Icone?: ReactNode;
  /** Texto do cabeçalho. */
  Titulo?: ReactNode;
  /** Ícone de ações (ex: menu de 3 pontos) à direita do cabeçalho. */
  AcoesIcone?: ReactNode;
  /** Valor principal, em destaque. */
  Valor?: ReactNode;
  /** Texto da etiqueta à direita do valor (com ícone). */
  TagTexto?: ReactNode;
  /** Ícone da etiqueta. */
  TagIcone?: ReactNode;
  /** Texto em destaque (cor de sucesso) no rodapé. */
  TextoSuporteDestaque?: ReactNode;
  /** Texto neutro no rodapé, ao lado do destaque. */
  TextoSuporte?: ReactNode;
}

/**
 * **TWTCardDashboard** — sem equivalente no PDF do TDN. Nasce da
 * modernização do Design System V&D, componente **Card Dashboard** do
 * Figma (node 12109:8231, State=Default,
 * https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=12109-8231).
 * O prefixo `TWT` antecipa o nome que o time Delphi provavelmente vai usar
 * — proposta de contrato, não confirmada pela documentação TDN.
 */
export function TWTCardDashboard({
  Icone,
  Titulo = 'Label Text',
  AcoesIcone,
  Valor = 'R$ 99.999,99',
  TagTexto = '+99%',
  TagIcone,
  TextoSuporteDestaque = '+R$ 99.999,99',
  TextoSuporte = 'Supporting Text',
}: TWTCardDashboardProps) {
  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '256px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    backgroundColor: tokens.color.surface.card.value,
  };

  const headerRow: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' };
  const titleStyle: CSSProperties = { flex: 1, minWidth: 0, fontSize: '14px', lineHeight: '18px', color: tokens.color.content.pure.value };
  const valueRow: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' };
  const valueStyle: CSSProperties = { flex: 1, minWidth: 0, fontSize: '20px', fontWeight: 700, lineHeight: '24px', color: tokens.color.content.pure.value };
  const tagStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    height: '32px',
    minWidth: '48px',
    padding: '8px 12px',
    borderRadius: '41px',
    border: `1px solid ${tokens.color.surface.container.value}`,
    backgroundColor: tokens.color.surface.pure.value,
    color: tokens.color.surface.inverse.value,
    fontSize: '14px',
    flexShrink: 0,
  };
  const supportingStyle: CSSProperties = { fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' };

  return (
    <div style={containerStyle}>
      <div style={headerRow}>
        {Icone ? <span aria-hidden="true" style={{ width: 24, height: 24, flexShrink: 0 }}>{Icone}</span> : null}
        <span style={titleStyle}>{Titulo}</span>
        {AcoesIcone ? <span aria-hidden="true" style={{ width: 24, height: 24, flexShrink: 0 }}>{AcoesIcone}</span> : null}
      </div>
      <div style={valueRow}>
        <span style={valueStyle}>{Valor}</span>
        <span style={tagStyle}>
          {TagIcone}
          <span>{TagTexto}</span>
        </span>
      </div>
      <div style={supportingStyle}>
        <span style={{ fontWeight: 700, color: tokens.color.feedback.success.pure.value }}>{TextoSuporteDestaque}</span>
        <span style={{ color: tokens.color.content['03'].value }}>{TextoSuporte}</span>
      </div>
    </div>
  );
}
