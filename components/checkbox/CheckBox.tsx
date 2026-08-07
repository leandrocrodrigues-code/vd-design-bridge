import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { tokens } from '../../tokens';

/** Nome oficial do componente na biblioteca Delphi. */
export type TWTCheckBoxSize = 'SM' | 'MD';
export type TWTCheckBoxPreviewState = 'Default' | 'Hover' | 'Focus' | 'Disabled';

export interface TWTCheckBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'disabled' | 'onClick' | 'size' | 'type'> {
  /** Propriedade Caption herdada de TCheckBox. */
  Caption?: ReactNode;
  /** Representação visual da propriedade HelpTextLabel: TWTBoundHelpLabel. */
  HelpTextLabel?: ReactNode;
  /** Estado marcado herdado de TCheckBox. */
  Checked?: boolean;
  /** Estado parcial para grupos de opções. */
  Indeterminate?: boolean;
  /** Propriedade Enabled herdada de TCheckBox. */
  Enabled?: boolean;
  /** Tamanho previsto no design system. */
  Size?: TWTCheckBoxSize;
  /** Representa o retorno de Errored para fins de documentação visual. */
  Errored?: boolean;
  /** Mensagem definida pelo método ErrorMessage no componente Delphi. */
  ErrorMessage?: ReactNode;
  /** Evento herdado OnClick. */
  OnClick?: InputHTMLAttributes<HTMLInputElement>['onClick'];
  /** Estado forçado apenas para demonstração no Storybook. */
  PreviewState?: TWTCheckBoxPreviewState;
}

const palette = {
  brand: tokens.color.surface.brand.pure.value,
  brandHighlight: tokens.color.surface.brand.highlight.value,
  content: tokens.color.content['01'].value,
  muted: tokens.color.content['03'].value,
  disabled: tokens.color.surface.container.value,
  alert: tokens.color.feedback.alert.pure.value,
  alertHighlight: tokens.color.feedback.alert.highlight.value,
  pure: tokens.color.surface.pure.value,
};

const sizes: Record<TWTCheckBoxSize, { box: string; icon: string; label: string; help: string }> = {
  SM: { box: '16px', icon: '12px', label: '14px', help: '12px' },
  MD: { box: '24px', icon: '16px', label: '16px', help: '14px' },
};

/**
 * Representação web do TWTCheckBox para documentação e inspeção visual.
 * A classe Delphi permanece a implementação nativa do produto.
 */
export function TWTCheckBox({
  Caption,
  HelpTextLabel,
  Checked,
  Indeterminate = false,
  Enabled = true,
  Size = 'MD',
  Errored = false,
  ErrorMessage,
  OnClick,
  PreviewState = 'Default',
  className,
  onChange,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: TWTCheckBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(Checked ?? false);
  const [interactionState, setInteractionState] = useState<TWTCheckBoxPreviewState>('Default');
  const isDisabled = !Enabled || PreviewState === 'Disabled';
  const visibleState = isDisabled
    ? 'Disabled'
    : PreviewState === 'Default'
      ? interactionState
      : PreviewState;
  const helpText = Errored && ErrorMessage ? ErrorMessage : HelpTextLabel;
  const metrics = sizes[Size];

  useEffect(() => {
    if (Checked !== undefined) setIsChecked(Checked);
  }, [Checked]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = Indeterminate;
  }, [Indeterminate]);

  const boxStyle: CSSProperties = {
    width: metrics.box,
    height: metrics.box,
    color: palette.content,
    backgroundColor: palette.pure,
    border: `1px solid ${palette.muted}`,
  };

  if (isDisabled) {
    boxStyle.backgroundColor = palette.disabled;
    boxStyle.borderColor = palette.disabled;
    boxStyle.color = palette.muted;
  } else if (Errored) {
    boxStyle.borderColor = palette.alert;
    boxStyle.color = palette.alertHighlight;
  } else if (Indeterminate || isChecked) {
    boxStyle.backgroundColor = palette.brand;
    boxStyle.borderColor = palette.brand;
  } else if (visibleState === 'Hover') {
    boxStyle.borderColor = palette.brandHighlight;
  } else if (visibleState === 'Focus') {
    boxStyle.borderColor = palette.brandHighlight;
    boxStyle.outline = `2px solid ${palette.brandHighlight}`;
    boxStyle.outlineOffset = '2px';
  }

  return (
    <label
      className={`inline-flex cursor-pointer items-start gap-2 ${isDisabled ? 'cursor-not-allowed' : ''} ${className ?? ''}`}
      style={{ fontFamily: tokens.typography.family.paragraph.value, color: isDisabled ? palette.muted : palette.content }}
    >
      <input
        {...rest}
        ref={inputRef}
        type="checkbox"
        checked={isChecked}
        disabled={isDisabled}
        className="sr-only"
        onChange={(event) => {
          setIsChecked(event.target.checked);
          onChange?.(event);
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
        onFocus={(event) => {
          setInteractionState('Focus');
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setInteractionState('Default');
          onBlur?.(event);
        }}
      />
      <span
        aria-hidden="true"
        className="mt-[2px] inline-flex shrink-0 items-center justify-center rounded-[4px] font-black leading-none transition-colors"
        style={boxStyle}
      >
        {(Indeterminate || isChecked) && !isDisabled ? (
          <span style={{ fontSize: metrics.icon }}>{Indeterminate ? '−' : '✓'}</span>
        ) : null}
      </span>
      {(Caption || helpText) ? (
        <span className="flex min-w-0 flex-col gap-0.5">
          {Caption ? <span style={{ fontSize: metrics.label, lineHeight: '1.25' }}>{Caption}</span> : null}
          {helpText ? (
            <span style={{ color: Errored ? palette.alertHighlight : palette.muted, fontSize: metrics.help, lineHeight: '1.25' }}>
              {helpText}
            </span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
}

/** @deprecated Use TWTCheckBox, nome oficial da biblioteca Delphi. */
export const CheckBox = TWTCheckBox;
