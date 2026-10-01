import { type CSSProperties, type ReactNode } from 'react';
import { tokens } from '../../tokens';

export type TModalProgressItemState =
  | 'Sucesso'
  | 'Alerta'
  | 'Erro'
  | 'EmAndamento'
  | 'Desabilitado'
  | 'Proximo';

export interface TWTModalProgressItem {
  Estado: TModalProgressItemState;
  Icone?: ReactNode;
  Texto: ReactNode;
}

export interface TWTModalProgressProps {
  Titulo?: ReactNode;
  Itens?: TWTModalProgressItem[];
  OnFechar?: () => void;
}

const stateToneTokens = {
  Sucesso: tokens.color.feedback.success,
  Alerta: tokens.color.feedback.warning,
  Erro: tokens.color.feedback.alert,
  EmAndamento: tokens.color.feedback.informative,
  Proximo: tokens.color.feedback.informative,
  Desabilitado: null,
};

const defaultItens: TWTModalProgressItem[] = [
  { Estado: 'Sucesso', Texto: 'Etapa concluída com sucesso' },
  { Estado: 'EmAndamento', Texto: 'Processando etapa atual' },
  { Estado: 'Proximo', Texto: 'Próxima etapa' },
  { Estado: 'Desabilitado', Texto: 'Etapa ainda não iniciada' },
];

/**
 * **TWTModalProgress** — sem equivalente no PDF do TDN. Nasce da
 * modernização do Design System V&D, composição **Modal Progress** do
 * Figma (símbolo "Progress Feedback Item List" 12147:21908, lista
 * "Progress Group" Type=Default 12147:27993):
 * https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=12147-28264
 * O prefixo `TWT` antecipa o nome que o time Delphi provavelmente vai usar
 * — proposta de contrato, não confirmada pela documentação TDN. Os estados
 * Sucesso/Alerta/Erro usam os tokens de feedback correspondentes; os
 * estados EmAndamento/Próximo foram mapeados para o tom informativo por
 * similaridade visual (inferência, não há leitura direta de token distinto
 * para cada um no Figma); Desabilitado usa `surface.container` neutro.
 */
export function TWTModalProgress({
  Titulo = 'Acompanhe o progresso',
  Itens = defaultItens,
  OnFechar,
}: TWTModalProgressProps) {
  const overlayStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    position: 'relative',
    width: '480px',
    display: 'flex',
    flexDirection: 'column',
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

  const titleStyle: CSSProperties = { fontSize: '20px', fontWeight: 700, lineHeight: '26px', color: tokens.color.content.pure.value };

  const listStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: tokens.spacing.sm.value };
  const rowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px' };
  const textStyle: CSSProperties = { fontSize: '14px', lineHeight: '18px', color: tokens.color.content.pure.value };

  return (
    <div style={overlayStyle}>
      <button type="button" aria-label="Fechar" style={closeButtonStyle} onClick={OnFechar}>✕</button>
      <span style={titleStyle}>{Titulo}</span>
      <div style={listStyle}>
        {Itens.map((item, index) => {
          const tone = stateToneTokens[item.Estado];
          const avatarStyle: CSSProperties = {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: tone ? tone.container.value : tokens.color.surface.container.value,
            color: tone ? tone.highlight.value : tokens.color.content['03'].value,
          };
          return (
            <div key={index} style={rowStyle}>
              <span style={avatarStyle}>{item.Icone}</span>
              <span style={textStyle}>{item.Texto}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
