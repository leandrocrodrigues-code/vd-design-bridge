import { useMemo, useState } from 'react';
import '../PoInput/po-input.tokens.css';
import '../PoSelect/po-select.tokens.css';

export interface PoComboOption {
  label: string;
  value: string;
}

export interface PoComboProps {
  /** p-label */
  label?: string;
  /** p-placeholder */
  placeholder?: string;
  /** p-options (obrigatório na PO-UI real) */
  options: PoComboOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** p-disabled */
  disabled?: boolean;
  className?: string;
}

/**
 * Preview web do po-combo (PO-UI) — versão filtrável do po-select.
 * Espelha o Combobox do Figma (node `10967:86715`, página "Forms ✅"),
 * que usa o mesmo campo visual do Text Input/Dropdown.
 *
 * Doc oficial: https://po-ui.io/documentation/po-combo
 */
export function PoCombo({ label, placeholder = 'Placeholder text', options, value, onChange, disabled = false, className }: PoComboProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((o) => o.value === value)?.label ?? '';

  const filtered = useMemo(
    () => options.filter((o) => o.label.toLowerCase().startsWith(query.toLowerCase())),
    [options, query],
  );

  return (
    <div className={['vd-po-input', 'vd-po-select', className ?? ''].filter(Boolean).join(' ')} data-disabled={disabled ? 'true' : undefined}>
      {label && <span className="vd-po-input__label">{label}</span>}
      <span className="vd-po-input-field">
        <input
          className="vd-po-input-field__input"
          placeholder={placeholder}
          disabled={disabled}
          value={open ? query : selectedLabel}
          onFocus={() => setOpen(true)}
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setTimeout(() => setOpen(false), 100)}
        />
      </span>
      {open && !disabled && (
        <ul className="vd-po-select__list">
          {filtered.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className="vd-po-select__option"
                onMouseDown={(event) => {
                  event.preventDefault();
                  onChange?.(option.value);
                  setQuery('');
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
          {filtered.length === 0 && <li className="vd-po-select__option">Nenhum resultado</li>}
        </ul>
      )}
    </div>
  );
}
