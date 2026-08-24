import type { InputHTMLAttributes } from 'react';
import './po-checkbox.tokens.css';

/** p-size documentado: small (16px) ou medium (24px, padrão). */
export type PoCheckboxSize = 'small' | 'medium';
/** Estado forçado só pra inspeção no Storybook. */
export type PoCheckboxPreviewState = 'Default' | 'Hover' | 'Focused';

export interface PoCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> {
  /** p-label */
  label?: string;
  /**
   * EXTENSÃO V&D — não existe como @Input documentado do po-checkbox.
   * Cobre o nó Figma "Has Secondary Text" (texto de apoio abaixo do
   * label). O componente real da PO-UI tem `help`/`additionalHelpTooltip`,
   * que renderizam diferente (tooltip/helper text, não uma segunda linha
   * fixa) — não confirmei que sejam equivalentes. Ver TODO no arquivo.
   */
  secondaryText?: string;
  /**
   * EXTENSÃO V&D — Figma tem 3 States (Unchecked/Checked/Indeterminate),
   * mas "indeterminate" NÃO aparece na lista de @Input do po-checkbox
   * (fonte: po-ui.io/llms-generated/po-checkbox.md). HTML nativo suporta
   * `.indeterminate` como propriedade do DOM (não reflete como atributo),
   * então é plausível que o po-checkbox real aceite via
   * `[indeterminate]="true"` no binding do Angular sem ser um @Input
   * "p-*" formal — não confirmado. Ver TODO no arquivo.
   */
  indeterminate?: boolean;
  /** p-size */
  size?: PoCheckboxSize;
  /** p-disabled */
  disabled?: boolean;
  /** (change) */
  onChange?: (checked: boolean) => void;
  /** Força um estado visual — só pra documentação/inspeção no Storybook. */
  previewState?: PoCheckboxPreviewState;
}

// TODO: confirmar com design/eng Angular — indeterminate e secondaryText
// são extensões V&D sem @Input oficial confirmado no po-checkbox. Ver
// po-checkbox.tokens.css e os comentários acima.

/**
 * Preview web do po-checkbox (PO-UI) usando os tokens do Design System V&D.
 *
 * Cores por estado em `po-checkbox.tokens.css`, com os nomes reais de token
 * da PO-UI apontando pros `--vd-color-*`.
 *
 * Doc oficial: https://po-ui.io/documentation/po-checkbox
 */
export function PoCheckbox({
  label,
  secondaryText,
  indeterminate = false,
  size = 'medium',
  disabled = false,
  checked = false,
  onChange,
  previewState = 'Default',
  className,
  ...rest
}: PoCheckboxProps) {
  const state = indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked';

  return (
    <label
      className={['vd-po-checkbox', className ?? ''].filter(Boolean).join(' ')}
      data-size={size}
      data-state={state}
      data-disabled={disabled ? 'true' : undefined}
      data-preview-state={previewState}
    >
      <input
        {...rest}
        type="checkbox"
        checked={Boolean(checked)}
        disabled={disabled}
        ref={(el) => {
          if (el) el.indeterminate = indeterminate;
        }}
        onChange={(event) => onChange?.(event.target.checked)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <span className="vd-po-checkbox__box" aria-hidden="true">
        {state === 'checked' && (
          <svg className="vd-po-checkbox__icon" viewBox="0 0 12 12" fill="none">
            <path d="M2 6.5L4.5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {state === 'indeterminate' && (
          <svg className="vd-po-checkbox__icon" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6H9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </span>
      {(label || secondaryText) && (
        <span className="vd-po-checkbox__content">
          {label && <span className="vd-po-checkbox__label">{label}</span>}
          {secondaryText && <span className="vd-po-checkbox__secondary">{secondaryText}</span>}
        </span>
      )}
    </label>
  );
}
