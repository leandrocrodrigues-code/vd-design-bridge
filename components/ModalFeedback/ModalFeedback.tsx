import { type CSSProperties, type ReactNode } from 'react';
import { tokens } from '../../tokens';

export type TModalFeedbackType =
  | 'Informativo'
  | 'Sucesso'
  | 'Alerta'
  | 'Erro';

export interface TWTModalFeedbackProps {
  Tipo?: TModalFeedbackType;
  /** Ícone central exibido dentro do badge (88px). */
  Icone?: ReactNode;
  Titulo?: ReactNode;
  Paragrafo?: ReactNode;
  BotaoPrimarioTexto?: ReactNode;
  BotaoSecundarioTexto?: ReactNode;
  BotaoTerciarioTexto?: ReactNode;
  OnPrimario?: () => void;
  OnSecundario?: () => void;
  OnTerciario?: () => void;
  OnFechar?: () => void;
}

const toneTokens = {
  Informativo: tokens.color.feedback.informative,
  Sucesso: tokens.color.feedback.success,
  Alerta: tokens.color.feedback.warning,
  Erro: tokens.color.feedback.alert,
};

/**
 * **TWTModalFeedback** — sem equivalente no PDF do TDN. Nasce da
 * modernização do Design System V&D, composição **Modal Feedback** do
 * Figma (frame 12138:2494, variante Informativo lida em 12144:15542):
 * https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=12138-2494
 * O prefixo `TWT` antecipa o nome que o time Delphi provavelmente vai usar
 * — proposta de contrato, não confirmada pela documentação TDN. O Figma
 * documenta 8 variações de tipo; aqui mapeamos as 4 famílias de tom já
 * usadas nos demais componentes (Informativo/Sucesso/Alerta/Erro) — as
 * demais variações visuais do frame original não foram replicadas 1:1.
 */
export function TWTModalFeedback({
  Tipo = 'Informativo',
  Icone,
  Titulo = 'Título do feedback',
  Paragrafo = 'Texto de apoio explicando o resultado da ação realizada.',
  BotaoPrimarioTexto = 'Continuar',
  BotaoSecundarioTexto,
  BotaoTerciarioTexto,
  OnPrimario,
  OnSecundario,
  OnTerciario,
  OnFechar,
}: TWTModalFeedbackProps) {
  const tone = toneTokens[Tipo];

  const overlayStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    position: 'relative',
    width: '480px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    padding: '32px',
    borderRadius: tokens.radius.xsm.value,
    backgroundColor: tokens.color.surface.pure.value,
    boxShadow: '0px 6px 16px rgba(0,0,0,0.08)',
  };

  const closeButtonStyle: CSSProperties = {
    position: 'absolute',
    top: '-16px',
    right: '-16px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: tokens.color.surface.pure.value,
    boxShadow: '0px 6px 16px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: tokens.color.content.pure.value,
  };

  const badgeOuterStyle: CSSProperties = {
    width: '88px',
    height: '88px',
    borderRadius: '50%',
    backgroundColor: tone.container.value,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const badgeInnerStyle: CSSProperties = {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: tone.pure.value,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.color.surface.pure.value,
  };

  const headerStyle: CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' };
  const titleStyle: CSSProperties = { fontSize: '20px', fontWeight: 700, lineHeight: '26px', color: tokens.color.content.pure.value };
  const paragraphStyle: CSSProperties = { fontSize: '16px', lineHeight: '22px', color: tokens.color.content['03'].value };

  const actionsStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' };
  const baseButtonStyle: CSSProperties = {
    height: '40px',
    borderRadius: tokens.radius['2xsm'].value,
    border: 'none',
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
  };
  const primaryButtonStyle: CSSProperties = { ...baseButtonStyle, backgroundColor: tokens.color.surface.brand.pure.value, color: tokens.color.surface.inverse.value };
  const secondaryButtonStyle: CSSProperties = { ...baseButtonStyle, backgroundColor: tokens.color.surface.brand.container.value, color: tokens.color.surface.brand.highlight.value };
  const tertiaryButtonStyle: CSSProperties = { ...baseButtonStyle, backgroundColor: tokens.color.surface.pure.value, color: tokens.color.surface.brand.highlight.value };

  return (
    <div style={overlayStyle}>
      <button type="button" aria-label="Fechar" style={closeButtonStyle} onClick={OnFechar}>✕</button>
      <div style={badgeOuterStyle}>
        <div style={badgeInnerStyle}>{Icone}</div>
      </div>
      <div style={headerStyle}>
        <span style={titleStyle}>{Titulo}</span>
        <span style={paragraphStyle}>{Paragrafo}</span>
      </div>
      <div style={actionsStyle}>
        {BotaoPrimarioTexto && (
          <button type="button" style={primaryButtonStyle} onClick={OnPrimario}>{BotaoPrimarioTexto}</button>
        )}
        {BotaoSecundarioTexto && (
          <button type="button" style={secondaryButtonStyle} onClick={OnSecundario}>{BotaoSecundarioTexto}</button>
        )}
        {BotaoTerciarioTexto && (
          <button type="button" style={tertiaryButtonStyle} onClick={OnTerciario}>{BotaoTerciarioTexto}</button>
        )}
      </div>
    </div>
  );
}
