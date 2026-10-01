import { type CSSProperties, type ReactNode } from 'react';
import { tokens } from '../../tokens';

export type TCardUploaderState = 'Default' | 'Uploading' | 'Alert';

export interface TWTCardUploaderProps {
  /** Estado do upload. "Default" é a área de drop vazia; os demais mostram um arquivo. */
  Estado?: TCardUploaderState;
  /** Ícone à esquerda (upload / arquivo / alerta). */
  Icone?: ReactNode;
  /** Texto principal. */
  Titulo?: ReactNode;
  /** Texto secundário (formatos aceitos, ou tempo restante). */
  Subtitulo?: ReactNode;
  /** Procedimento que responde ao clique/drop na área (apenas em Estado=Default). */
  OnEscolherArquivo?: () => void;
}

/**
 * **TWTCardUploader** — sem equivalente no PDF do TDN. Nasce da
 * modernização do Design System V&D, componente **Card Uploader** do
 * Figma (node 12132:8784, State=Default,
 * https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=12132-8784).
 * O prefixo `TWT` antecipa o nome que o time Delphi provavelmente vai usar
 * — proposta de contrato, não confirmada pela documentação TDN.
 *
 * ⚠️ O estado "Uploaded List" do Figma (lista de arquivos já enviados) não
 * foi lido em detalhe — fica como próximo passo quando houver mais PDFs
 * ou screens de referência que o usem. A barra de progresso do estado
 * "Uploading" também não veio de uma leitura direta desse node — foi
 * inferida do padrão visual já confirmado no Card Loading (mesma família
 * de componentes, mesma barra de 4px), não é um recorte 1:1 do Figma.
 */
export function TWTCardUploader({
  Estado = 'Default',
  Icone,
  Titulo = 'Escolha ou arraste arquivos para enviar',
  Subtitulo = 'Formatos: TXT, XSL, PDF, DOC, JPG, PNG (2MB)',
  OnEscolherArquivo,
}: TWTCardUploaderProps) {
  const isDefault = Estado === 'Default';
  const isAlert = Estado === 'Alert';

  const iconBg = isAlert ? tokens.color.feedback.alert.container.value : tokens.color.surface.brand.container.value;
  const titleColor = isAlert ? tokens.color.feedback.alert.highlight.value : tokens.color.surface.brand.highlight.value;

  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '416px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    backgroundColor: tokens.color.surface.card.value,
    border: isDefault ? `1px dashed ${tokens.color.surface.brand.pure.value}` : undefined,
    cursor: isDefault ? 'pointer' : 'default',
  };

  const rowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' };
  const avatarStyle: CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: tokens.radius.sm.value,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: iconBg,
    color: titleColor,
  };
  const titleStyle: CSSProperties = { fontSize: '14px', fontWeight: 700, lineHeight: '18px', color: titleColor };
  const subtitleStyle: CSSProperties = { fontSize: '12px', lineHeight: '16px', color: tokens.color.content['03'].value };

  const trackStyle: CSSProperties = {
    marginTop: '16px',
    height: '4px',
    borderRadius: tokens.radius['3xsm'].value,
    backgroundColor: tokens.color.surface.container.value,
    overflow: 'hidden',
  };

  return (
    <div style={containerStyle} onClick={isDefault ? OnEscolherArquivo : undefined} role={isDefault ? 'button' : undefined}>
      <div style={rowStyle}>
        <span aria-hidden="true" style={avatarStyle}>{Icone}</span>
        <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <span style={titleStyle}>{Titulo}</span>
          <span style={subtitleStyle}>{Subtitulo}</span>
        </span>
      </div>
      {Estado === 'Uploading' ? (
        <div style={trackStyle}>
          <div style={{ height: '100%', width: '50%', backgroundColor: tokens.color.surface.brand.pure.value }} />
        </div>
      ) : null}
    </div>
  );
}
