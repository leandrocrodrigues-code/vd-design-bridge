import './po-divider.tokens.css';

export type PoDividerBorderWidth = 'small' | 'medium' | 'large';
export type PoDividerOrientation = 'horizontal' | 'vertical';

export interface PoDividerProps {
  /** p-border-width */
  borderWidth?: PoDividerBorderWidth;
  /** p-label */
  label?: string;
  orientation?: PoDividerOrientation;
  className?: string;
}

/**
 * Preview web do po-divider (PO-UI). Espelha o Divider do Figma
 * (node `288:5742`, página "Divider ✅") — mesma cor `surface/card`
 * #f7f9f9 nos 3 tamanhos × 2 orientações.
 *
 * Doc oficial: https://po-ui.io/documentation/po-divider
 */
export function PoDivider({
  borderWidth = 'small',
  label,
  orientation = 'horizontal',
  className,
}: PoDividerProps) {
  if (label) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <hr
          className={['vd-po-divider', className ?? ''].filter(Boolean).join(' ')}
          data-orientation="horizontal"
          data-border-width={borderWidth}
          style={{ flex: 1 }}
        />
        <span className="vd-po-divider__label">{label}</span>
        <hr className="vd-po-divider" data-orientation="horizontal" data-border-width={borderWidth} style={{ flex: 1 }} />
      </div>
    );
  }

  return (
    <hr
      className={['vd-po-divider', className ?? ''].filter(Boolean).join(' ')}
      data-orientation={orientation}
      data-border-width={borderWidth}
    />
  );
}
