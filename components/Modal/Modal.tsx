import { type CSSProperties, type ReactNode } from 'react';
import { tokens } from '../../tokens';

export interface TWTModalProps {
  /** Propriedade FullHeight do TWTModal Delphi. */
  FullHeight?: boolean;
  /** Propriedade Movable do TWTModal Delphi. */
  Movable?: boolean;
  /** Propriedade RoundedBorder do TWTModal Delphi. */
  RoundedBorder?: boolean;
  /** Propriedade ShowCloseButton do TWTModal Delphi. */
  ShowCloseButton?: boolean;
  /** Recurso de documentação do Storybook: conteúdo exibido dentro do modal. */
  children?: ReactNode;
  /** Recurso de documentação do Storybook: título exibido no cabeçalho. */
  Title?: ReactNode;
  /** Equivalente ao fechamento do form (FreeAndNil) no exemplo Delphi. */
  OnClose?: () => void;
}

/**
 * Representação web do TWTModal (`documentacaotdneng/Modal.pdf`,
 * https://tdn.totvs.com/display/DGP/Modal) para documentação e inspeção
 * visual.
 *
 * ⚠️ O doc oficial do TDN não traz uma imagem de referência do visual
 * renderizado — só a tabela de propriedades e o exemplo de código Delphi
 * (`TfrmModalBranco.Create` / `.ShowModal` / `FreeAndNil`). O chrome visual
 * abaixo (overlay, cabeçalho, borda) é uma interpretação nossa, estruturada
 * a partir do padrão já usado em `PoModal`, e não um recorte literal do PDF.
 * As quatro props (`FullHeight`, `Movable`, `RoundedBorder`,
 * `ShowCloseButton`) são reais e documentadas; o restante do chrome (como a
 * "alça" indicando Movable) existe só para tornar a prop visível aqui.
 *
 * `Movable` (arrastável pelo usuário) não tem como ser demonstrado de forma
 * estática numa preview — é sinalizado com uma alça no cabeçalho, mas o
 * arrasto em si não é implementado.
 */
export function TWTModal({
  FullHeight = false,
  Movable = false,
  RoundedBorder = true,
  ShowCloseButton = true,
  children,
  Title = 'Titulo do modal',
  OnClose,
}: TWTModalProps) {
  const overlayStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: FullHeight ? 'stretch' : 'center',
    justifyContent: 'center',
    width: '420px',
    height: FullHeight ? '480px' : 'auto',
    padding: '24px',
    backgroundColor: 'rgba(15, 18, 30, .45)',
    borderRadius: '16px',
  };

  const dialogStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '100%',
    height: FullHeight ? '100%' : 'auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.color.surface.pure.value,
    borderRadius: RoundedBorder ? '16px' : '0px',
    boxShadow: '0 12px 32px rgba(15, 18, 30, .28)',
    overflow: 'hidden',
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    padding: '16px 20px',
    borderBottom: `1px solid ${tokens.color.surface.container.value}`,
    color: tokens.color.content['01'].value,
    fontSize: '16px',
    fontWeight: 700,
    cursor: Movable ? 'grab' : 'default',
  };

  const bodyStyle: CSSProperties = {
    flex: 1,
    padding: '20px',
    color: tokens.color.content['02'].value,
    fontSize: '14px',
    lineHeight: '1.5',
  };

  const closeButtonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'transparent',
    color: tokens.color.content['03'].value,
    cursor: 'pointer',
    fontSize: '16px',
    lineHeight: 1,
  };

  return (
    <div style={overlayStyle}>
      <div role="dialog" aria-modal="true" style={dialogStyle}>
        <div style={headerStyle}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            {Movable ? (
              <span aria-hidden="true" title="Movable" style={{ color: tokens.color.content['03'].value }}>
                ⠿
              </span>
            ) : null}
            {Title}
          </span>
          {ShowCloseButton ? (
            <button type="button" aria-label="Fechar" style={closeButtonStyle} onClick={OnClose}>
              ✕
            </button>
          ) : null}
        </div>
        <div style={bodyStyle}>
          {children ?? 'Conteúdo do formulário exibido dentro do TWTModal.'}
        </div>
      </div>
    </div>
  );
}

/** @deprecated Use TWTModal, nome oficial da biblioteca Delphi. */
export const Modal = TWTModal;
