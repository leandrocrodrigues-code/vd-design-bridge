import { type CSSProperties } from 'react';
import { tokens } from '../../tokens';

export interface TWTCardLoadingProps {
  /** Texto principal (ex: "Atualizando..."). */
  Titulo?: string;
  /** Texto secundário (ex: tempo restante). */
  Subtitulo?: string;
  /** Valor percentual exibido à direita e usado na barra de progresso. */
  Valor?: number;
  /** Procedimento que responde ao clique no botão de cancelar (X). */
  OnCancelar?: () => void;
}

/**
 * **TWTCardLoading** — sem equivalente no PDF do TDN. Nasce da
 * modernização do Design System V&D, componente **Card Loading** do
 * Figma (node 12136:9161,
 * https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=12136-9161).
 * O prefixo `TWT` antecipa o nome que o time Delphi provavelmente vai usar
 * — proposta de contrato, não confirmada pela documentação TDN.
 */
export function TWTCardLoading({
  Titulo = 'Atualizando...',
  Subtitulo = '4 minutos restantes',
  Valor = 50,
  OnCancelar,
}: TWTCardLoadingProps) {
  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '416px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    backgroundColor: tokens.color.surface.card.value,
  };

  const rowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', height: '32px' };
  const titleStyle: CSSProperties = { fontSize: '14px', fontWeight: 700, lineHeight: '18px', color: tokens.color.surface.brand.highlight.value };
  const subtitleStyle: CSSProperties = { fontSize: '12px', lineHeight: '16px', color: tokens.color.content['03'].value };
  const valueStyle: CSSProperties = { fontSize: '14px', lineHeight: '18px', color: tokens.color.content.pure.value, textAlign: 'right' };
  const closeButtonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: tokens.radius['2xsm'].value,
    border: 'none',
    backgroundColor: tokens.color.surface.pure.value,
    color: tokens.color.content['01'].value,
    cursor: 'pointer',
    flexShrink: 0,
  };
  const trackStyle: CSSProperties = {
    height: '4px',
    borderRadius: tokens.radius['3xsm'].value,
    backgroundColor: tokens.color.surface.container.value,
    overflow: 'hidden',
  };

  return (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <span style={titleStyle}>{Titulo}</span>
          <span style={subtitleStyle}>{Subtitulo}</span>
        </span>
        <span style={{ ...valueStyle, flex: 1 }}>{Valor}%</span>
        <button type="button" aria-label="Cancelar" style={closeButtonStyle} onClick={OnCancelar}>✕</button>
      </div>
      <div style={trackStyle}>
        <div style={{ height: '100%', width: `${Math.max(0, Math.min(100, Valor))}%`, backgroundColor: tokens.color.surface.brand.pure.value }} />
      </div>
    </div>
  );
}
