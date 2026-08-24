import type { ReactNode } from 'react';
import './po-list-item.tokens.css';

export type PoListItemAction = 'none' | 'checkbox' | 'radio' | 'toggle' | 'chevron';

export interface PoListItemProps {
  primaryText: string;
  secondaryText?: string;
  overlineText?: string;
  primaryValue?: string;
  secondaryValue?: string;
  leadingIcon?: ReactNode;
  action?: PoListItemAction;
  checked?: boolean;
  onActionChange?: (checked: boolean) => void;
  divider?: boolean;
  className?: string;
}

/**
 * Preview web de um item de po-list-view (PO-UI) usando os tokens do
 * Design System V&D. O componente real da PO-UI é `po-list-view`, que
 * recebe `p-items` (array de dados) — o "List Item" do Figma
 * (node `10145:7645`, página "List item ✅ New!") é a especificação
 * visual de cada linha, não um componente Angular avulso. Este
 * componente representa uma linha isolada, reaproveitável dentro de um
 * po-list-view real.
 *
 * Confirmado no Figma: 5 variantes de Action (List item/Checkbox
 * Select/Radio Select/Toggle/Buttons Group) — cobri as ações via a prop
 * `action`; Buttons Group fica de fora por já ter componente próprio
 * (PoButtonsGroup).
 *
 * Doc oficial: https://po-ui.io/documentation/po-list-view
 */
export function PoListItem({
  primaryText,
  secondaryText,
  overlineText,
  primaryValue,
  secondaryValue,
  leadingIcon,
  action = 'none',
  checked = false,
  onActionChange,
  divider = true,
  className,
}: PoListItemProps) {
  return (
    <div className={['vd-po-list-item', className ?? ''].filter(Boolean).join(' ')} data-divider={divider ? 'true' : undefined}>
      {leadingIcon && <span className="vd-po-list-item__leading">{leadingIcon}</span>}
      <div className="vd-po-list-item__content">
        {overlineText && <span className="vd-po-list-item__overline">{overlineText}</span>}
        <span className="vd-po-list-item__primary">{primaryText}</span>
        {secondaryText && <span className="vd-po-list-item__secondary">{secondaryText}</span>}
      </div>
      {(primaryValue || secondaryValue) && (
        <div className="vd-po-list-item__trailing-content">
          {primaryValue && <span className="vd-po-list-item__primary" style={{ textAlign: 'right' }}>{primaryValue}</span>}
          {secondaryValue && <span className="vd-po-list-item__secondary" style={{ textAlign: 'right' }}>{secondaryValue}</span>}
        </div>
      )}
      {action === 'checkbox' && (
        <input type="checkbox" className="vd-po-list-item__checkbox" checked={checked} onChange={(e) => onActionChange?.(e.target.checked)} />
      )}
      {action === 'radio' && (
        <input type="radio" className="vd-po-list-item__radio" checked={checked} onChange={(e) => onActionChange?.(e.target.checked)} />
      )}
      {action === 'toggle' && (
        <button type="button" className="vd-po-list-item__toggle" data-on={checked ? 'true' : undefined} onClick={() => onActionChange?.(!checked)}>
          <span className="vd-po-list-item__toggle-knob" />
        </button>
      )}
      {action === 'chevron' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}
