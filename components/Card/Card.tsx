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
 * ⚠️ `Anchors` (TAnchors, ancoragem com o controle pai) não tem
 * representação visual aqui — é uma propriedade de layout do container
 * Delphi, fora do escopo de uma preview isolada de componente.
 *
 * ⚠️ O doc oficial chama o valor `tcLaranja` de "amarelo" na legenda do
 * demo visual ("Demonstração card amarelo") mas o nome real do enum é
 * `tcLaranja` — usamos a cor real capturada no PDF (amber/warning), não
 * o nome da legenda.
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
    width: '240px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    cursor: 'pointer',
    outline: visibleState === 'Focus' ? `2px solid ${tone.highlight}` : 'none',
    outlineOffset: '2px',
    transition: 'background-color .15s ease, border-color .15s ease',
    backgroundColor: selected ? tone.pure : tokens.color.surface.pure.value,
    border: selected
      ? `1px solid ${tone.pure}`
      : visibleState === 'Hover'
        ? `1px solid ${tone.pure}`
        : `1px solid ${tokens.color.surface.container.value}`,
    ...style,
  };

  const iconWrapStyle: CSSProperties = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
    fontSize: '22px',
    backgroundColor: selected ? 'rgba(255,255,255,.24)' : tone.card,
    color: selected ? tokens.color.content.inverse.value : tone.pure,
  };

  const titleStyle: CSSProperties = {
    display: 'block',
    fontSize: '14px',
    lineHeight: '1.3',
    color: selected ? tokens.color.content.inverse.value : tokens.color.content['01'].value,
  };

  const descStyle: CSSProperties = {
    display: 'block',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '1.3',
    marginTop: '2px',
    color: selected ? tokens.color.content.inverse.value : tone.highlight,
  };

  const trackStyle: CSSProperties = {
    marginTop: '12px',
    height: '6px',
    borderRadius: '999px',
    backgroundColor: selected ? 'rgba(255,255,255,.35)' : tokens.color.surface.container.value,
    overflow: 'hidden',
  };

  const fillStyle: CSSProperties = {
    height: '100%',
    width: `${progressPct}%`,
    borderRadius: '999px',
    backgroundColor: selected ? tokens.color.content.inverse.value : tone.pure,
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
      <span aria-hidden="true" style={iconWrapStyle}>
        {displayedIcon ?? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path d="M12 3l8 4v5c0 5-3.4 7.9-8 9-4.6-1.1-8-4-8-9V7l8-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span style={titleStyle}>{Titulo}</span>
      <span style={descStyle}>{Descricao}</span>
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
