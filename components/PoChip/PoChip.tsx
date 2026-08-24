import type { ReactNode } from 'react';
import './po-chip.tokens.css';

export interface PoChipProps {
  label: string;
  active?: boolean;
  onToggle?: () => void;
  leadingIcon?: ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

/**
 * NÃO existe componente oficial da PO-UI para chips — extensão V&D pura.
 * Ver po-chip.tokens.css pra detalhes. Espelha o "Chips" do Figma
 * (node `2659:3661`, página "Chips ✅").
 */
export function PoChip({ label, active = false, onToggle, leadingIcon, removable = true, onRemove, className }: PoChipProps) {
  return (
    <span
      role="button"
      tabIndex={0}
      onClick={onToggle}
      className={['vd-po-chip', className ?? ''].filter(Boolean).join(' ')}
      data-active={active ? 'true' : undefined}
    >
      {leadingIcon}
      <span>{label}</span>
      {removable && (
        <button
          type="button"
          className="vd-po-chip__remove"
          onClick={(event) => {
            event.stopPropagation();
            onRemove?.();
          }}
          aria-label={`Remover ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
}
