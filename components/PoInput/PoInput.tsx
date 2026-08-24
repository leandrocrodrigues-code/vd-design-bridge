import type { InputHTMLAttributes, ReactNode } from 'react';
import './po-input.tokens.css';

export type PoInputSize = 'small' | 'medium';
export type PoInputPreviewState = 'Default' | 'Hover' | 'Focus' | 'Typing' | 'Filled';

export interface PoInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** p-label */
  label?: string;
  /** p-placeholder */
  placeholder?: string;
  /** p-required */
  required?: boolean;
  /** p-help — exibido como caption abaixo do campo. */
  help?: string;
  /** p-disabled */
  disabled?: boolean;
  /** p-size */
  size?: PoInputSize;
  /** p-icon */
  icon?: ReactNode;
  /**
   * EXTENSÃO V&D — a doc de tokens do po-input não lista um estado de
   * erro/invalid entre as CSS vars. Cobre o State=Alert do Figma. Na
   * PO-UI real isso provavelmente vem de `p-error-message` / validação
   * de formulário, não confirmado como token de cor direta.
   */
  invalid?: boolean;
  /** Mensagem de erro exibida quando `invalid`. */
  errorMessage?: string;
  onChange?: (value: string) => void;
  /** Força um estado visual — só pra documentação/inspeção no Storybook. */
  previewState?: PoInputPreviewState;
}

/**
 * Preview web do po-input (PO-UI) usando os tokens do Design System V&D.
 *
 * Doc oficial: https://po-ui.io/documentation/po-input
 */
export function PoInput({
  label,
  placeholder = 'Placeholder text',
  required = false,
  help,
  disabled = false,
  size = 'medium',
  icon,
  invalid = false,
  errorMessage,
  onChange,
  previewState = 'Default',
  className,
  value,
  ...rest
}: PoInputProps) {
  const caption = invalid && errorMessage ? errorMessage : help;

  return (
    <div
      className={['vd-po-input', className ?? ''].filter(Boolean).join(' ')}
      data-size={size}
      data-disabled={disabled ? 'true' : undefined}
      data-invalid={invalid ? 'true' : undefined}
      data-preview-state={previewState}
    >
      {label && (
        <span className="vd-po-input__label">
          {label}
          {required && <span className="vd-po-input__required">*</span>}
        </span>
      )}
      <span className="vd-po-input-field">
        {icon}
        <input
          {...rest}
          className="vd-po-input-field__input"
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
        />
      </span>
      {caption && <span className="vd-po-input__caption">{caption}</span>}
    </div>
  );
}
