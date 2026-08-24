import type { ReactNode } from 'react';
import { PoButton, type PoButtonSize } from '../PoButton/PoButton';

export type PoButtonsGroupLayout = 'inline' | 'stack';
export type PoButtonsGroupWidth = 'hug' | 'fill';

export interface PoButtonsGroupAction {
  key: string;
  label: string;
  kind?: 'primary' | 'secondary' | 'tertiary';
  onClick?: () => void;
  disabled?: boolean;
}

export interface PoButtonsGroupProps {
  actions: PoButtonsGroupAction[];
  size?: PoButtonSize;
  layout?: PoButtonsGroupLayout;
  /** Corresponde a "Action Hierarchy" no Figma: Left/Right (inline) ou Top/Bottom (stack). */
  reverse?: boolean;
  width?: PoButtonsGroupWidth;
  className?: string;
  children?: ReactNode;
}

/**
 * NÃO existe um componente "po-buttons-group" na PO-UI — "Buttons Group" no
 * Figma (node `9877:13798`, página "Buttons ✅") é puramente uma composição
 * visual de vários `po-button` lado a lado, sem tokens próprios. Confirmado
 * lendo o design context: nenhuma cor nova, só arranjo (gap `Spacing/2XSM`
 * = 8px) e as combinações Inline/Stack × Left/Right/Top/Bottom ×
 * Hug/Fill do Figma controlam apenas layout.
 *
 * Por isso este componente é um wrapper fino em cima do PoButton já
 * existente — não um novo `.tokens.css`, porque não há token novo a
 * documentar.
 */
export function PoButtonsGroup({
  actions,
  size = 'medium',
  layout = 'inline',
  reverse = false,
  width = 'hug',
  className,
  children,
}: PoButtonsGroupProps) {
  const items = reverse ? [...actions].reverse() : actions;

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: layout === 'inline' ? 'row' : 'column',
        gap: '8px',
        width: width === 'fill' ? '100%' : undefined,
      }}
    >
      {items.map((action) => (
        <PoButton
          key={action.key}
          label={action.label}
          kind={action.kind ?? 'secondary'}
          size={size}
          disabled={action.disabled}
          onClick={action.onClick}
          style={width === 'fill' ? { flex: 1 } : undefined}
        />
      ))}
      {children}
    </div>
  );
}
