import type { TextareaHTMLAttributes } from 'react';
import '../PoInput/po-input.tokens.css';

export type PoTextareaSize = 'small' | 'medium';
export type PoTextareaPreviewState = 'Default' | 'Hover' | 'Focus' | 'Typing' | 'Filled';

export interface PoTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'onChange'> {
  /** p-label */
  label?: string;
  /** p-placeholder */
  placeholder?: string;
  /** p-required */
  required?: boolean;
  /** p-help */
  help?: string;
  /** p-disabled */
  disabled?: boolean;
  /** p-size */
  size?: PoTextareaSize;
  /** Ver PoInput — mesma ressalva: sem token de erro confirmado na doc oficial. */
  invalid?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
  previewState?: PoTextareaPreviewState;
}

/**
 * Preview web do po-textarea (PO-UI). Mesmo padrão de cores/tokens do
 * po-input — Figma confirma que Text Area (node `316:4058`, página
 * "Forms ✅") usa exatamente as mesmas regras de State (Default/Hover/
 * Focus/Typing/Filled/Alert/Disabled), só muda pra multi-linha.
 *
 * Doc oficial: https://po-ui.io/documentation/po-textarea
 */
export function PoTextarea({
  label,
  placeholder = 'Placeholder text',
  required = false,
  help,
  disabled = false,
  size = 'medium',
  invalid = false,
  errorMessage,
  onChange,
  previewState = 'Default',
  className,
  value,
  ...rest
}: PoTextareaProps) {
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
      <span className="vd-po-input-field" style={{ height: '80px', alignItems: 'stretch' }}>
        <textarea
          {...rest}
          className="vd-po-input-field__input"
          style={{ resize: 'vertical', paddingTop: '4px' }}
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
