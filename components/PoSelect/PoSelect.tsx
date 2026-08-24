import { useState } from 'react';
import '../PoInput/po-input.tokens.css';
import './po-select.tokens.css';

export interface PoSelectOption {
  label: string;
  value: string;
}

export interface PoSelectProps {
  /** p-label */
  label?: string;
  /** p-placeholder */
  placeholder?: string;
  /** p-options */
  options: PoSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** p-required */
  required?: boolean;
  /** p-disabled */
  disabled?: boolean;
  /** p-help */
  help?: string;
  className?: string;
}

/**
 * Preview web do po-select (PO-UI) usando os tokens do Design System V&D.
 * Espelha o Dropdown do Figma (node `265:1447`, página "Forms ✅") — o
 * campo em si usa exatamente o mesmo visual do po-input (confirmado no
 * design context), só adiciona o Chevron e a lista suspensa.
 *
 * Doc oficial: https://po-ui.io/documentation/po-select
 */
export function PoSelect({ label, placeholder = 'Placeholder text', options, value, onChange, required = false, disabled = false, help, className }: PoSelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div
      className={['vd-po-input', 'vd-po-select', className ?? ''].filter(Boolean).join(' ')}
      data-disabled={disabled ? 'true' : undefined}
      data-open={open ? 'true' : undefined}
    >
      {label && (
        <span className="vd-po-input__label">
          {label}
          {required && <span className="vd-po-input__required">*</span>}
        </span>
      )}
      <button
        type="button"
        className="vd-po-input-field vd-po-select__trigger"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={selected ? 'vd-po-select__value' : 'vd-po-input-field__input'}>
          {selected ? selected.label : placeholder}
        </span>
        <svg className="vd-po-select__chevron" viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && !disabled && (
        <ul className="vd-po-select__list">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className="vd-po-select__option"
                onClick={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      {help && <span className="vd-po-input__caption">{help}</span>}
    </div>
  );
}
