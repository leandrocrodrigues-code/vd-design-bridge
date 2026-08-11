import { useState, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
import { tokens } from '../../tokens';

/** Espelha o enum PoButtonKind da PO-UI (po-button). */
export type PoButtonKind = 'primary' | 'secondary' | 'tertiary';
/** Espelha os valores documentados de p-size: small (32px, só com AA), medium (44px), large (56px). */
export type PoButtonSize = 'small' | 'medium' | 'large';
/** Espelha o enum PoButtonType. */
export type PoButtonType = 'submit' | 'button' | 'reset';

type InteractionState = 'Default' | 'Hover' | 'Pressed' | 'Focus';

export interface PoButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'disabled' | 'onClick'> {
  /** p-label: texto do botão. */
  label?: string;
  /** p-kind: estilo visual — primary (destaque), secondary (padrão) ou tertiary (sem preenchimento). */
  kind?: PoButtonKind;
  /** p-size: small (32px), medium (44px, padrão) ou large (56px). */
  size?: PoButtonSize;
  /** p-type: comportamento do botão dentro de um form. */
  type?: PoButtonType;
  /**
   * p-icon: nome de classe de ícone (ex. "an an-user"), renderizado como
   * `<i class="...">`, ou um ReactNode customizado (equivalente ao
   * TemplateRef do Angular).
   */
  icon?: string | ReactNode;
  /** p-danger: ações irreversíveis. Desativa o estilo "tertiary" quando ativo. */
  danger?: boolean;
  /** p-disabled */
  disabled?: boolean;
  /** p-loading: mostra um spinner à esquerda do label e desabilita o botão. */
  loading?: boolean;
  /** p-tabindex */
  tabIndex?: number;
  /** p-aria-label: se omitido, usa o label. */
  ariaLabel?: string;
  /** (p-click) */
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  /** Força um estado visual — só pra documentação/inspeção no Storybook. */
  previewState?: InteractionState;
}

const palette = {
  brand: tokens.color.surface.brand.pure.value,
  brandContainer: tokens.color.surface.brand.container.value,
  brandHighlight: tokens.color.surface.brand.highlight.value,
  content: tokens.color.content['01'].value,
  contentInverse: tokens.color.content.inverse.value,
  disabledBackground: tokens.color.surface.container.value,
  disabledContent: tokens.color.content['03'].value,
  danger: tokens.color.feedback.alert.pure.value,
  dangerContainer: tokens.color.feedback.alert.container.value,
  dangerHighlight: tokens.color.feedback.alert.highlight.value,
  transparent: 'transparent',
};

/** Alturas documentadas na PO-UI; padding/font-size seguem a escala de tokens do repo. */
const sizeStyles: Record<PoButtonSize, CSSProperties> = {
  small: { height: '32px', paddingInline: tokens.spacing.sm.value, fontSize: `${tokens.typography.size.xsm.value}px` },
  medium: { height: '44px', paddingInline: tokens.spacing.md.value, fontSize: `${tokens.typography.size.sm.value}px` },
  large: { height: '56px', paddingInline: tokens.spacing.lg.value, fontSize: `${tokens.typography.size.md.value}px` },
};

// p-danger recolore o botão pra vermelho mas preserva a ESTRUTURA do kind:
// primary continua sólido, secondary continua "container" (preenchimento
// mais claro). p-kind="tertiary" é a única exceção documentada — ao usar
// p-danger ela é desativada e cai no mesmo tratamento sólido de primary.
const dangerSolidStyles: Record<InteractionState, CSSProperties> = {
  Default: { backgroundColor: palette.danger, color: palette.contentInverse },
  Hover: { backgroundColor: palette.dangerContainer, color: palette.dangerHighlight },
  Pressed: { backgroundColor: palette.dangerHighlight, color: palette.contentInverse },
  Focus: {
    backgroundColor: palette.danger,
    color: palette.contentInverse,
    outline: `2px solid ${palette.dangerHighlight}`,
    outlineOffset: '2px',
  },
};

const dangerContainerStyles: Record<InteractionState, CSSProperties> = {
  Default: { backgroundColor: palette.dangerContainer, color: palette.dangerHighlight },
  Hover: { backgroundColor: palette.danger, color: palette.contentInverse },
  Pressed: { backgroundColor: palette.dangerHighlight, color: palette.contentInverse },
  Focus: {
    backgroundColor: palette.dangerContainer,
    color: palette.dangerHighlight,
    outline: `2px solid ${palette.dangerHighlight}`,
    outlineOffset: '2px',
  },
};
const kindStyles: Record<PoButtonKind, Record<InteractionState, CSSProperties>> = {
  primary: {
    Default: { backgroundColor: palette.brand, color: palette.content },
    Hover: { backgroundColor: palette.brandContainer, color: palette.content },
    Pressed: { backgroundColor: palette.brandHighlight, color: palette.contentInverse },
    Focus: {
      backgroundColor: palette.brand,
      color: palette.content,
      outline: `2px solid ${palette.brandHighlight}`,
      outlineOffset: '2px',
    },
  },
  secondary: {
    Default: { backgroundColor: palette.brandContainer, color: palette.content },
    Hover: { backgroundColor: palette.brand, color: palette.content },
    Pressed: { backgroundColor: palette.brandHighlight, color: palette.contentInverse },
    Focus: {
      backgroundColor: palette.brandContainer,
      color: palette.content,
      outline: `2px solid ${palette.brandHighlight}`,
      outlineOffset: '2px',
    },
  },
  tertiary: {
    Default: { backgroundColor: palette.transparent, color: palette.brandHighlight },
    Hover: { backgroundColor: palette.brandContainer, color: palette.content },
    Pressed: { backgroundColor: palette.brandHighlight, color: palette.contentInverse },
    Focus: {
      backgroundColor: palette.transparent,
      color: palette.brandHighlight,
      outline: `2px solid ${palette.brandHighlight}`,
      outlineOffset: '2px',
    },
  },
};

function getVisualStyle(kind: PoButtonKind, danger: boolean, state: InteractionState): CSSProperties {
  if (!danger) return kindStyles[kind][state];
  // secondary mantém a estrutura de preenchimento mais claro; primary e o
  // tertiary "desativado" caem no vermelho sólido.
  return kind === 'secondary' ? dangerContainerStyles[state] : dangerSolidStyles[state];
}

function LoadingSpinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-[1em] w-[1em] shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}

function renderIcon(icon: PoButtonProps['icon']) {
  if (!icon) return null;
  if (typeof icon === 'string') {
    return <i className={icon} aria-hidden="true" />;
  }
  return (
    <span aria-hidden="true" className="inline-flex text-[1em]">
      {icon}
    </span>
  );
}

/**
 * Representação web do po-button (PO-UI) usando os tokens deste design
 * system. Documentação de referência: https://po-ui.io/documentation/po-button
 */
export function PoButton({
  label,
  kind = 'secondary',
  size = 'medium',
  type = 'button',
  icon,
  danger = false,
  disabled = false,
  loading = false,
  tabIndex,
  ariaLabel,
  onClick,
  previewState,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onFocus,
  onBlur,
  ...rest
}: PoButtonProps) {
  const [interactionState, setInteractionState] = useState<InteractionState>('Default');
  const isDisabled = disabled || loading;
  const visibleState = previewState ?? interactionState;
  const visualStyle = isDisabled
    ? { backgroundColor: palette.disabledBackground, color: palette.disabledContent }
    : getVisualStyle(kind, danger, visibleState);

  return (
    <button
      {...rest}
      type={type}
      disabled={isDisabled}
      tabIndex={tabIndex}
      aria-label={ariaLabel ?? label}
      data-kind={kind}
      data-state={isDisabled ? 'Disabled' : visibleState}
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-[8px] border-0 font-bold leading-none transition-colors disabled:cursor-not-allowed ${className ?? ''}`}
      style={{
        fontFamily: tokens.typography.family.paragraph.value,
        ...sizeStyles[size],
        ...visualStyle,
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={(event) => {
        setInteractionState('Hover');
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setInteractionState('Default');
        onMouseLeave?.(event);
      }}
      onMouseDown={(event) => {
        setInteractionState('Pressed');
        onMouseDown?.(event);
      }}
      onMouseUp={(event) => {
        setInteractionState('Hover');
        onMouseUp?.(event);
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
      {loading ? <LoadingSpinner /> : renderIcon(icon)}
      {label ? <span>{label}</span> : null}
    </button>
  );
}
