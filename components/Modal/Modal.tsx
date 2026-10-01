import { type CSSProperties, type ReactNode } from 'react';
import { tokens } from '../../tokens';

export interface TWTModalProps {
  /** Propriedade FullHeight do TWTModal Delphi. */
  FullHeight?: boolean;
  /** Propriedade Movable do TWTModal Delphi. Sem indicador visual em nenhuma das fontes (TDN/Figma) — ver nota na story. */
  Movable?: boolean;
  /** Propriedade RoundedBorder do TWTModal Delphi. */
  RoundedBorder?: boolean;
  /** Propriedade ShowCloseButton do TWTModal Delphi. */
  ShowCloseButton?: boolean;
  /** Slot de documentação do Storybook: cabeçalho (Header). */
  Header?: ReactNode;
  /** Slot de documentação do Storybook: conteúdo (Content). */
  Content?: ReactNode;
  /** Slot de documentação do Storybook: ações (Action). */
  Actions?: ReactNode;
  /** Equivalente ao fechamento do form (FreeAndNil) no exemplo Delphi. */
  OnClose?: () => void;
}

/**
 * Representação web do TWTModal (`documentacaotdneng/Modal.pdf`,
 * https://tdn.totvs.com/display/DGP/Modal) para documentação e inspeção
 * visual.
 *
 * O doc oficial do TDN não traz uma imagem de referência do visual
 * renderizado — só a tabela de propriedades e o exemplo de código Delphi
 * (`TfrmModalBranco.Create` / `.ShowModal` / `FreeAndNil`). A geometria e
 * estilo abaixo (sombra, padding, raio, botão de fechar flutuante) vêm do
 * Figma MCP, componente **Modal (Template)** do arquivo `MCP Design
 * System V&D — UI KIT Desktop`
 * (node 4017:5546, https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=13095-53662),
 * cuja anatomia documentada é: Header (slot opcional) + Content (slot
 * opcional) + Action (slot opcional), com um botão de fechar (X) 40×40
 * flutuante no canto superior direito, sobreposto ao conteúdo.
 *
 * `Header`/`Content`/`Actions` existem só para documentação/inspeção no
 * Storybook — não são propriedades do `TWTModal` Delphi, que não nomeia
 * slots explicitamente (o exemplo de código do TDN só instancia e exibe
 * o form inteiro via `ShowModal`).
 *
 * `Movable` (arrastável pelo usuário) não tem indicador visual em nenhuma
 * das duas fontes (TDN ou Figma) — é documentado aqui só como a prop real,
 * sem inventar um afford visual que nenhuma delas mostra.
 */
export function TWTModal({
  FullHeight = false,
  Movable: _Movable = false,
  RoundedBorder = true,
  ShowCloseButton = true,
  Header = 'Header',
  Content = 'Content',
  Actions = 'Action',
  OnClose,
}: TWTModalProps) {
  const overlayStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: FullHeight ? 'stretch' : 'center',
    justifyContent: 'center',
    width: '488px',
    height: FullHeight ? '480px' : 'auto',
    padding: '32px',
    backgroundColor: 'rgba(15, 18, 30, .45)',
    borderRadius: '16px',
  };

  const dialogStyle: CSSProperties = {
    position: 'relative',
    fontFamily: tokens.typography.family.paragraph.value,
    width: '100%',
    height: FullHeight ? '100%' : 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '32px',
    backgroundColor: tokens.color.surface.pure.value,
    borderRadius: RoundedBorder ? tokens.radius.xsm.value : '0px',
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.08)',
  };

  const closeButtonStyle: CSSProperties = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    padding: '8px',
    borderRadius: tokens.radius['2xsm'].value,
    border: 'none',
    backgroundColor: tokens.color.surface.pure.value,
    color: tokens.color.content['01'].value,
    cursor: 'pointer',
    fontSize: '16px',
    lineHeight: 1,
  };

  const slotStyle: CSSProperties = { color: tokens.color.content['02'].value, fontSize: '14px', lineHeight: '1.5' };

  return (
    <div style={overlayStyle}>
      <div role="dialog" aria-modal="true" style={dialogStyle}>
        {ShowCloseButton ? (
          <button type="button" aria-label="Fechar" style={closeButtonStyle} onClick={OnClose}>
            ✕
          </button>
        ) : null}
        {Header ? <div style={slotStyle}>{Header}</div> : null}
        {Content ? <div style={slotStyle}>{Content}</div> : null}
        {Actions ? <div style={slotStyle}>{Actions}</div> : null}
      </div>
    </div>
  );
}

/** @deprecated Use TWTModal, nome oficial da biblioteca Delphi. */
export const Modal = TWTModal;
