import type { ReactNode } from 'react';
import './po-tag.tokens.css';

/**
 * p-type oficial: info | success | warning | danger | neutral.
 * "brand" é extensão V&D — cobre o Status=Brand do Figma, sem @Input
 * oficial equivalente no po-tag real.
 */
export type PoTagType = 'info' | 'success' | 'warning' | 'danger' | 'neutral' | 'brand';

export interface PoTagProps {
  /** p-value (obrigatório na PO-UI real) */
  value: string;
  /** p-type */
  type?: PoTagType;
  /** p-disabled */
  disabled?: boolean;
  /** p-icon */
  icon?: ReactNode;
  /** p-removable */
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

/**
 * Preview web do po-tag (PO-UI) usando os tokens do Design System V&D.
 * Espelha o Tag do Figma (node `316:3942`, página "Tag ✅").
 *
 * Doc oficial: https://po-ui.io/documentation/po-tag
 */
export function PoTag({ value, type = 'info', disabled = false, icon, removable = false, onRemove, className }: PoTagProps) {
  return (
    <span
      className={['vd-po-tag', className ?? ''].filter(Boolean).join(' ')}
      data-type={type}
      data-disabled={disabled ? 'true' : undefined}
    >
      {icon && <span className="vd-po-tag__icon">{icon}</span>}
      <span>{value}</span>
      {removable && !disabled && (
        <button type="button" className="vd-po-tag__remove" onClick={onRemove} aria-label={`Remover ${value}`}>
          ×
        </button>
      )}
    </span>
  );
}
