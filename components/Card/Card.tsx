import { useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { tokens } from '../../tokens';

/** Nome do componente equivalente na biblioteca Delphi (Winthor Componentes). */
export type TCardColor = 'tcAzul' | 'tcVerde' | 'tcLaranja' | 'tcVermelho' | 'tcDesabilitado';
export type TWTCardPreviewState = 'Default' | 'Hover' | 'Focus';

export interface TWTCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick' | 'color'> {
  /** Ícone padrão do Card (representa o índice de ImageList no Delphi). */
  Icone?: ReactNode;
  /** Ícone exibido quando o Card está selecionado (ImageList). Cai para `Icone` se omitido. */
  IconeSelecionado?: ReactNode;
  /** Tipo enumerado com o estilo de cor. */
  Cor?: TCardColor;
  /** Texto do título do Card. */
  Titulo?: ReactNode;
  /** Texto da descrição do Card. */
  Descricao?: ReactNode;
  /** Determina se o Card mantém-se selecionado quando clicado. */
  ManterSelecao?: boolean;
  /** Valor máximo da barra de progresso que determinará 100% do progresso. */
  ValorMaximo?: number;
  /** Valor do Card utilizado para determinar o progresso atual. */
  Valor?: number;
  /** Define se a barra de progresso é exibida (valor padrão do Delphi é exibir). */
  ExibeBarra?: boolean;
  /** Procedimento que responderá ao evento de um clique no componente. */
  OnClick?: () => void;
  /** Estado forçado apenas para documentação e inspeção no Storybook. */
  PreviewState?: TWTCardPreviewState;
}

const toneTokens = {
  tcAzul: tokens.color.feedback.informative,
  tcVerde: tokens.color.feedback.success,
  tcLaranja: tokens.color.feedback.warning,
  tcVermelho: tokens.color.feedback.alert,
} as const;

type Tone = { pure: string; container: string; card: string; highlight: string };

function resolveTone(cor: TCardColor): Tone {
  if (cor === 'tcDesabilitado') {
    return {
      pure: tokens.color.content['03'].value,
      container: tokens.color.surface.container.value,
      card: tokens.color.surface.container.value,
      highlight: tokens.color.content['03'].value,
    };
  }
  const t = toneTokens[cor];
  return { pure: t.pure.value, container: t.container.value, card: t.card.value, highlight: t.highlight.value };
}

/**
 * Representação web do TWTCard (PDF `documentacaotdneng/Cards .pdf`,
 * https://tdn.totvs.com/display/DGP/Card) para documentação e inspeção
 * visual. A classe Delphi (`TWTCard`, herda de `TCustomControl`) continua
 * sendo a implementação nativa de produto.
 *
 * A geometria e os tokens (avatar 32px, barra de 4px, cores por tom) foram
 * confirmados via Figma MCP no componente "Card Status" / "Card Template"
 * do arquivo `MCP Design System V&D — UI KIT Desktop`
 * (node 11955:9325, https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=11959-4835),
 * que é a fonte visual atual do Design System V&D para este componente.
 *
 * ⚠️ `Anchors` (TAnchors, ancoragem com o controle pai) não tem
 * representação visual aqui — é uma propriedade de layout do container
 * Delphi, fora do escopo de uma preview isolada de componente.
 */
export function TWTCard({
  Icone,
  IconeSelecionado,
  Cor = 'tcAzul',
  Titulo = 'Titulo',
  Descricao = 'Descricao',
  ManterSelecao = false,
  ValorMaximo = 100,
  Valor = 0,
  ExibeBarra = true,
  OnClick,
  PreviewState = 'Default',
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: TWTCardProps) {
  const [interactionState, setInteractionState] = useState<TWTCardPreviewState>('Default');
  const [isSelected, setIsSelected] = useState(false);
  const visibleState = PreviewState === 'Default' ? interactionState : PreviewState;
  const tone = resolveTone(Cor);
  const progressPct = Math.max(0, Math.min(100, (Valor / Math.max(1, ValorMaximo)) * 100));
  const selected = ManterSelecao && isSelected;
  const displayedIcon = selected ? (IconeSelecionado ?? Icone) : Icone;

  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '256px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    cursor: 'pointer',
    outline: visibleState === 'Focus' ? `2px solid ${tone.pure}` : 'none',
    outlineOffset: '2px',
    transition: 'background-color .15s ease, border-color .15s ease',
    backgroundColor: selected ? tone.card : tokens.color.surface.card.value,
    border: selected
      ? `1px solid ${tone.pure}`
      : visibleState === 'Hover'
        ? `1px solid ${tone.pure}`
        : '1px solid transparent',
    ...style,
  };

  const rowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' };

  const iconWrapStyle: CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: tokens.radius.smd.value,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: '16px',
    backgroundColor: tone.container,
    color: tone.pure,
  };

  const textColStyle: CSSProperties = { display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 };

  const titleStyle: CSSProperties = {
    fontSize: '12px',
    lineHeight: '16px',
    color: tokens.color.content['02'].value,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const descStyle: CSSProperties = {
    fontSize: '14px',
    lineHeight: '18px',
    color: tone.highlight,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const trackStyle: CSSProperties = {
    height: '4px',
    borderRadius: tokens.radius['3xsm'].value,
    backgroundColor: tokens.color.surface.container.value,
    overflow: 'hidden',
  };

  const fillStyle: CSSProperties = {
    height: '100%',
    width: `${progressPct}%`,
    borderRadius: tokens.radius['3xsm'].value,
    backgroundColor: tone.pure,
  };

  return (
    <div
      {...rest}
      role="button"
      tabIndex={0}
      className={className}
      style={containerStyle}
      onClick={() => {
        if (ManterSelecao) setIsSelected((v) => !v);
        OnClick?.();
      }}
      onMouseEnter={(event) => {
        setInteractionState('Hover');
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setInteractionState('Default');
        onMouseLeave?.(event);
      }}
      onFocus={(event) => {
        setInteractionState('Focus');
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setInteractionState('Default');
        onBlur?.(event);
      }}
    >
      <div style={rowStyle}>
        <span aria-hidden="true" style={iconWrapStyle}>
          {displayedIcon ?? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path d="M12 3l8 4v5c0 5-3.4 7.9-8 9-4.6-1.1-8-4-8-9V7l8-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span style={textColStyle}>
          <span style={titleStyle}>{Titulo}</span>
          <span style={descStyle}>{Descricao}</span>
        </span>
      </div>
      {ExibeBarra ? (
        <div style={trackStyle}>
          <div style={fillStyle} />
        </div>
      ) : null}
    </div>
  );
}

/** @deprecated Use TWTCard, nome oficial da biblioteca Delphi. */
export const Card = TWTCard;
