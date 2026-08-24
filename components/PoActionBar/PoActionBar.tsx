import type { ReactNode } from 'react';
import { PoButton } from '../PoButton/PoButton';
import './po-action-bar.tokens.css';

export interface PoActionBarAction {
  key: string;
  icon: ReactNode;
  label?: string;
  onClick?: () => void;
}

export interface PoActionBarProps {
  leadingActions?: PoActionBarAction[];
  primaryLabel?: string;
  onPrimaryClick?: () => void;
  className?: string;
}

/**
 * ⚠️ Não é um componente Angular único da PO-UI — "Action Bar" no Figma
 * (node `12198:51636`, página "Action Bar ✅") é uma composição de
 * po-button (ícone) + po-button (primário), não um `po-action-bar`.
 *
 * Fundo confirmado: `surface/pure`, botões de ícone `surface/container`,
 * botão primário `surface/brand/pure`.
 */
export function PoActionBar({ leadingActions = [], primaryLabel, onPrimaryClick, className }: PoActionBarProps) {
  return (
    <div className={['vd-po-action-bar', className ?? ''].filter(Boolean).join(' ')}>
      <div className="vd-po-action-bar__group">
        {leadingActions.map((action) => (
          <button key={action.key} type="button" className="vd-po-action-bar__icon-button" onClick={action.onClick} aria-label={action.label}>
            {action.icon}
          </button>
        ))}
      </div>
      {primaryLabel && (
        <div className="vd-po-action-bar__group">
          <PoButton label={primaryLabel} kind="primary" onClick={onPrimaryClick} />
        </div>
      )}
    </div>
  );
}
