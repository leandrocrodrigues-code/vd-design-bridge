import './po-radio-group.tokens.css';

/** p-size documentado: small (16px) ou medium (24px, padrão). */
export type PoRadioGroupSize = 'small' | 'medium';
/** Estado forçado só pra inspeção no Storybook, aplicado no primeiro item habilitado. */
export type PoRadioGroupPreviewState = 'Default' | 'Hover' | 'Focused';

export interface PoRadioGroupOption {
  /** label do item */
  label: string;
  /** value do item */
  value: string;
  /** disable esse item específico */
  disabled?: boolean;
}

export interface PoRadioGroupProps {
  /** p-label */
  label?: string;
  /** p-help */
  help?: string;
  /** p-options (obrigatório — PO-UI não tem po-radio avulso) */
  options: PoRadioGroupOption[];
  /** p-name (obrigatório) */
  name: string;
  /** ngModel — valor selecionado */
  value?: string;
  /** (change) */
  onChange?: (value: string) => void;
  /** p-columns — quantidade de colunas no grid (padrão 2) */
  columns?: number;
  /** p-size */
  size?: PoRadioGroupSize;
  /** p-disabled — desabilita o grupo inteiro */
  disabled?: boolean;
  /** p-required */
  required?: boolean;
  /** Força um estado visual no primeiro item habilitado — só pra documentação/inspeção. */
  previewState?: PoRadioGroupPreviewState;
  className?: string;
}

/**
 * Preview web do po-radio-group (PO-UI) usando os tokens do Design System V&D.
 *
 * A PO-UI **não tem** um `po-radio` avulso — só `po-radio-group`, que recebe
 * `p-options` (array) e gerencia a seleção única internamente. O Figma tem um
 * item "Radio" isolado (igual ao Checkbox), mas a tradução fiel pro
 * componente Angular real é este grupo. Ver decisão registrada no handoff.
 *
 * Cores por estado em `po-radio-group.tokens.css`, com os nomes reais de
 * token da PO-UI (idênticos aos do po-checkbox) apontando pros `--vd-color-*`.
 *
 * Doc oficial: https://po-ui.io/documentation/po-radio-group
 */
export function PoRadioGroup({
  label,
  help,
  options,
  name,
  value,
  onChange,
  columns = 2,
  size = 'medium',
  disabled = false,
  required = false,
  previewState = 'Default',
  className,
}: PoRadioGroupProps) {
  const firstEnabledValue = options.find((o) => !o.disabled)?.value;

  return (
    <fieldset
      className={['vd-po-radio-group', className ?? ''].filter(Boolean).join(' ')}
      data-disabled={disabled ? 'true' : undefined}
    >
      {label && (
        <legend className="vd-po-radio-group__label">
          {label}
          {required && <span className="vd-po-radio-group__required">*</span>}
        </legend>
      )}
      <div className="vd-po-radio-group__grid" style={{ gridTemplateColumns: `repeat(${columns}, auto)` }}>
        {options.map((option) => {
          const itemDisabled = disabled || option.disabled;
          const checked = value === option.value;
          const forcedState = !itemDisabled && option.value === firstEnabledValue ? previewState : 'Default';

          return (
            <label
              key={option.value}
              className="vd-po-radio-group__item"
              data-size={size}
              data-state={checked ? 'checked' : 'unchecked'}
              data-disabled={itemDisabled ? 'true' : undefined}
              data-preview-state={forcedState}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                disabled={itemDisabled}
                onChange={() => onChange?.(option.value)}
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
              />
              <span className="vd-po-radio-group__circle" aria-hidden="true">
                <span className="vd-po-radio-group__dot" />
              </span>
              <span className="vd-po-radio-group__text">{option.label}</span>
            </label>
          );
        })}
      </div>
      {help && <span className="vd-po-radio-group__help">{help}</span>}
    </fieldset>
  );
}
