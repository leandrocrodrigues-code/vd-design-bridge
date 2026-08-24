import type { InputHTMLAttributes } from 'react';
import '../PoInput/po-input.tokens.css';

export interface PoSearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onClear?: () => void;
}

/**
 * Preview web do po-search (PO-UI) — reaproveita 100% dos tokens do
 * po-input (confirmado no Figma: mesmo campo visual do Text Input nos 7
 * States). Espelha o Search do Figma (node `321:8197`, página "Search ✅").
 *
 * Doc oficial: https://po-ui.io/documentation/po-search
 */
export function PoSearch({ placeholder = 'Buscar...', disabled = false, value, onChange, onClear, className, ...rest }: PoSearchProps) {
  return (
    <div className={['vd-po-input', className ?? ''].filter(Boolean).join(' ')} data-disabled={disabled ? 'true' : undefined}>
      <span className="vd-po-input-field">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          {...rest}
          className="vd-po-input-field__input"
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
        />
        {value ? (
          <button type="button" onClick={onClear} aria-label="Limpar" style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--vd-color-content-03)' }}>
            ×
          </button>
        ) : null}
      </span>
    </div>
  );
}
