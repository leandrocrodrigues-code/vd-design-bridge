import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { tokens } from '../../tokens';

/** Nome do componente equivalente na biblioteca Delphi. */
export type TWTButtonVariant = 'Primary' | 'Secondary' | 'Tertiary';
export type TWTButtonSize = 'LG' | 'MD' | 'SM';
export type TWTButtonPreviewState = 'Default' | 'Hover' | 'Pressed' | 'Focus' | 'Disabled';

export interface TWTButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'disabled' | 'onClick'> {
  /** Texto apresentado pelo TWTButton. */
  Caption?: ReactNode;
  /** Hierarquia visual da ação. */
  Variant?: TWTButtonVariant;
  /** Tamanho do componente: LG (48px), MD (40px) ou SM (32px). */
  Size?: TWTButtonSize;
  /** Equivalente à propriedade Enabled do Delphi. */
  Enabled?: boolean;
  /** Ícone que antecede o rótulo. Não deve ser combinado com TrailingIcon. */
  LeadingIcon?: ReactNode;
  /** Ícone de continuidade à direita do rótulo. Não deve ser combinado com LeadingIcon. */
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
  transparent: 'transparent',
};

const sizeStyles: Record<TWTButtonSize, CSSProperties> = {
  LG: { height: '48px', paddingInline: '20px', fontSize: '16px' },
  MD: { height: '40px', paddingInline: '16px', fontSize: '16px' },
  SM: { height: '32px', paddingInline: '12px', fontSize: '14px' },
};

function getStateStyle(
  variant: TWTButtonVariant,
  previewState: TWTButtonPreviewState,
): CSSProperties {
  if (previewState === 'Disabled') {
    return { backgroundColor: palette.disabledBackground, color: palette.disabledContent, cursor: 'not-allowed' };
  }

  const styles: Record<TWTButtonVariant, Record<Exclude<TWTButtonPreviewState, 'Disabled'>, CSSProperties>> = {
    Primary: {
      Default: { backgroundColor: palette.brand, color: palette.content },
      Hover: { backgroundColor: palette.brandContainer, color: palette.content },
      Pressed: { backgroundColor: palette.brandHighlight, color: palette.contentInverse },
      Focus: { backgroundColor: palette.brand, color: palette.content, outline: `2px solid ${palette.brandHighlight}`, outlineOffset: '2px' },
    },
    Secondary: {
      Default: { backgroundColor: palette.brandContainer, color: palette.content },
      Hover: { backgroundColor: palette.brand, color: palette.content },
      Pressed: { backgroundColor: palette.brandHighlight, color: palette.contentInverse },
      Focus: { backgroundColor: palette.brandContainer, color: palette.content, outline: `2px solid ${palette.brandHighlight}`, outlineOffset: '2px' },
    },
    Tertiary: {
      Default: { backgroundColor: palette.transparent, color: palette.brandHighlight },
      Hover: { backgroundColor: palette.brandContainer, color: palette.content },
      Pressed: { backgroundColor: palette.brandHighlight, color: palette.contentInverse },
      Focus: { backgroundColor: palette.transparent, color: palette.brandHighlight, outline: `2px solid ${palette.brandHighlight}`, outlineOffset: '2px' },
    },
  };

  return styles[variant][previewState];
}

/**
 * Representação web do TWTButton para documentação e inspeção visual.
 * O componente Delphi continua sendo a implementação nativa de produção.
 */
export function TWTButton({
  Caption,
  Variant = 'Primary',
  Size = 'MD',
  Enabled = true,
  LeadingIcon,
  TrailingIcon,
  OnClick,
  PreviewState = 'Default',
  className,
  style,
  'aria-label': ariaLabel,
  ...rest
}: TWTButtonProps) {
  const isDisabled = !Enabled || PreviewState === 'Disabled';
  const displayedTrailingIcon = LeadingIcon ? undefined : TrailingIcon;

  return (
    <button
      {...rest}
      type="button"
      disabled={isDisabled}
      aria-label={ariaLabel ?? (Caption ? undefined : 'Ação')}
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-[8px] border-0 font-bold leading-none transition-colors ${className ?? ''}`}
      style={{
        fontFamily: tokens.typography.family.paragraph.value,
        ...sizeStyles[Size],
        ...getStateStyle(Variant, isDisabled ? 'Disabled' : PreviewState),
        ...style,
      }}
      onClick={OnClick}
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
export type ButtonVariant = TWTButtonVariant;
export type ButtonSize = TWTButtonSize;
