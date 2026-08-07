import { useState, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
import { tokens } from '../../tokens';

/** Nome do componente equivalente na biblioteca Delphi. */
export type TButtonStyle =
  | 'bsPrimary'
  | 'bsSecondary'
  | 'bsTertiary'
  | 'bsPrimaryDanger'
  | 'bsTertiaryDanger'
  | 'bsPrimaryPositive';
export type TButtonSize = 'bsLarge' | 'bsMedium' | 'bsSmall';
export type TWTButtonPreviewState = 'Default' | 'Hover' | 'Pressed' | 'Focus' | 'Disabled';

export interface TWTButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'disabled' | 'onClick'> {
  /** Texto apresentado pelo TWTButton. */
  Caption?: ReactNode;
  /** Propriedade Style do TWTButton Delphi. */
  Style?: TButtonStyle;
  /** Propriedade Size do TWTButton Delphi. */
  Size?: TButtonSize;
  /** Propriedade herdada Enabled do TButton Delphi. */
  Enabled?: boolean;
  /** Recurso de documentação do Storybook para o ícone à esquerda. */
  LeadingIcon?: ReactNode;
  /** Recurso de documentação do Storybook para o ícone à direita. */
  TrailingIcon?: ReactNode;
  /** Equivalente ao evento OnClick do Delphi. */
  OnClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  /** Estado forçado apenas para documentação e inspeção no Storybook. */
  PreviewState?: TWTButtonPreviewState;
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
  positive: tokens.color.feedback.success.pure.value,
  positiveContainer: tokens.color.feedback.success.container.value,
  positiveHighlight: tokens.color.feedback.success.highlight.value,
  transparent: 'transparent',
};

/** Medidas atuais do Figma, preservando os enumeradores nativos do Delphi. */
const sizeStyles: Record<TButtonSize, CSSProperties> = {
  bsLarge: { height: '48px', paddingInline: '20px', fontSize: '16px' },
  bsMedium: { height: '40px', paddingInline: '16px', fontSize: '16px' },
  bsSmall: { height: '32px', paddingInline: '12px', fontSize: '14px' },
};

function getStateStyle(
  buttonStyle: TButtonStyle,
  previewState: TWTButtonPreviewState,
): CSSProperties {
  if (previewState === 'Disabled') {
    return { backgroundColor: palette.disabledBackground, color: palette.disabledContent, cursor: 'not-allowed' };
  }

  const styles: Record<TButtonStyle, Record<Exclude<TWTButtonPreviewState, 'Disabled'>, CSSProperties>> = {
    bsPrimary: {
      Default: { backgroundColor: palette.brand, color: palette.content },
      Hover: { backgroundColor: palette.brandContainer, color: palette.content },
      Pressed: { backgroundColor: palette.brandHighlight, color: palette.contentInverse },
      Focus: { backgroundColor: palette.brand, color: palette.content, outline: `2px solid ${palette.brandHighlight}`, outlineOffset: '2px' },
    },
    bsSecondary: {
      Default: { backgroundColor: palette.brandContainer, color: palette.content },
      Hover: { backgroundColor: palette.brand, color: palette.content },
      Pressed: { backgroundColor: palette.brandHighlight, color: palette.contentInverse },
      Focus: { backgroundColor: palette.brandContainer, color: palette.content, outline: `2px solid ${palette.brandHighlight}`, outlineOffset: '2px' },
    },
    bsTertiary: {
      Default: { backgroundColor: palette.transparent, color: palette.brandHighlight },
      Hover: { backgroundColor: palette.brandContainer, color: palette.content },
      Pressed: { backgroundColor: palette.brandHighlight, color: palette.contentInverse },
      Focus: { backgroundColor: palette.transparent, color: palette.brandHighlight, outline: `2px solid ${palette.brandHighlight}`, outlineOffset: '2px' },
    },
    bsPrimaryDanger: {
      Default: { backgroundColor: palette.danger, color: palette.contentInverse },
      Hover: { backgroundColor: palette.dangerContainer, color: palette.dangerHighlight },
      Pressed: { backgroundColor: palette.dangerHighlight, color: palette.contentInverse },
      Focus: { backgroundColor: palette.danger, color: palette.contentInverse, outline: `2px solid ${palette.dangerHighlight}`, outlineOffset: '2px' },
    },
    bsTertiaryDanger: {
      Default: { backgroundColor: palette.transparent, color: palette.dangerHighlight },
      Hover: { backgroundColor: palette.dangerContainer, color: palette.dangerHighlight },
      Pressed: { backgroundColor: palette.dangerHighlight, color: palette.contentInverse },
      Focus: { backgroundColor: palette.transparent, color: palette.dangerHighlight, outline: `2px solid ${palette.dangerHighlight}`, outlineOffset: '2px' },
    },
    bsPrimaryPositive: {
      Default: { backgroundColor: palette.positive, color: palette.content },
      Hover: { backgroundColor: palette.positiveContainer, color: palette.positiveHighlight },
      Pressed: { backgroundColor: palette.positiveHighlight, color: palette.contentInverse },
      Focus: { backgroundColor: palette.positive, color: palette.content, outline: `2px solid ${palette.positiveHighlight}`, outlineOffset: '2px' },
    },
  };

  return styles[buttonStyle][previewState];
}

/**
 * Representação web do TWTButton para documentação e inspeção visual.
 * O componente Delphi continua sendo a implementação nativa de produção.
 */
export function TWTButton({
  Caption,
  Style = 'bsPrimary',
  Size = 'bsMedium',
  Enabled = true,
  LeadingIcon,
  TrailingIcon,
  OnClick,
  PreviewState = 'Default',
  className,
  style,
  'aria-label': ariaLabel,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onFocus,
  onBlur,
  ...rest
}: TWTButtonProps) {
  const [interactionState, setInteractionState] = useState<TWTButtonPreviewState>('Default');
  const isDisabled = !Enabled || PreviewState === 'Disabled';
  const visibleState = isDisabled
    ? 'Disabled'
    : PreviewState === 'Default'
      ? interactionState
      : PreviewState;
  const displayedTrailingIcon = LeadingIcon ? undefined : TrailingIcon;

  return (
    <button
      {...rest}
      type="button"
      disabled={isDisabled}
      aria-label={ariaLabel ?? (Caption ? undefined : 'Ação')}
      data-state={visibleState}
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-[8px] border-0 font-bold leading-none transition-colors ${className ?? ''}`}
      style={{
        fontFamily: tokens.typography.family.paragraph.value,
        ...sizeStyles[Size],
        ...getStateStyle(Style, visibleState),
        ...style,
      }}
      onClick={OnClick}
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
      {LeadingIcon ? <span aria-hidden="true" className="inline-flex text-[1em]">{LeadingIcon}</span> : null}
      {Caption ? <span>{Caption}</span> : null}
      {displayedTrailingIcon ? <span aria-hidden="true" className="inline-flex text-[1em]">{displayedTrailingIcon}</span> : null}
    </button>
  );
}

/** @deprecated Use TWTButton, nome oficial da biblioteca Delphi. */
export const Button = TWTButton;
export type ButtonProps = TWTButtonProps;
export type ButtonVariant = TButtonStyle;
export type ButtonSize = TButtonSize;
