import type { InputHTMLAttributes } from 'react';
import './po-switch.tokens.css';

/** p-size documentado: small (40x24) ou medium (56x32, padrão). */
export type PoSwitchSize = 'small' | 'medium';

export interface PoSwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> {
  /** p-label */
  label?: string;
  /** p-size */
  size?: PoSwitchSize;
  /** p-disabled */
  disabled?: boolean;
  /** (change) */
  onChange?: (checked: boolean) => void;
}

/**
 * Preview web do po-switch (PO-UI) usando os tokens do Design System V&D.
 *
 * NOTA: o componente "Toggle" no Figma (node `859:3990`, página "Toggle ✅")
 * é o **po-switch** da PO-UI — não existe `po-toggle`.
 *
 * O Figma só tem 3 States (Off/On/Disabled), sem Sub-state Hover/Focused —
 * diferente de Button/Checkbox/Radio. O hover/focus abaixo é inferência
 * nossa (mesmo padrão de escurecer no hover dos outros componentes), não
 * validada nó a nó porque a variante não existe no Figma.
 *
 * Doc oficial: https://po-ui.io/documentation/po-switch
 */
export function PoSwitch({
  label,
  size = 'medium',
  disabled = false,
  checked = false,
  onChange,
  className,
  ...rest
}: PoSwitchProps) {
  return (
    <label
      className={['vd-po-switch', className ?? ''].filter(Boolean).join(' ')}
      data-size={size}
      data-state={checked ? 'on' : 'off'}
      data-disabled={disabled ? 'true' : undefined}
    >
      <span className="vd-po-switch__track">
        <input
          {...rest}
          type="checkbox"
          className="vd-po-switch__input"
          checked={Boolean(checked)}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.checked)}
        />
        <span className="vd-po-switch__knob" aria-hidden="true" />
      </span>
      {label && <span className="vd-po-switch__label">{label}</span>}
    </label>
  );
}
