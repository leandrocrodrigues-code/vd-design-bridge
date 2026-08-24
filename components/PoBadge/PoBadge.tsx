import './po-badge.tokens.css';

export type PoBadgeStatus = 'neutral' | 'brand' | 'info' | 'success' | 'warning' | 'alert';
export type PoBadgeType = 'label' | 'number' | 'dot';

export interface PoBadgeProps {
  /** p-status — não confere 1:1 com PoBadgeStatus real (não documentado em detalhe); ver nota na story. */
  status?: PoBadgeStatus;
  /** Type=Solid/Outline no Figma. Sem @Input oficial documentado — inferido do design context (fill sólido vs container claro). */
  solid?: boolean;
  /** p-value — número (Type=Number no Figma). */
  value?: number;
  /** Texto livre — Type=Label Text no Figma; sem @Input oficial exato confirmado. */
  label?: string;
  /** Type=Dot no Figma — indicador sem texto. */
  type?: PoBadgeType;
  className?: string;
}

/**
 * Preview web do po-badge (PO-UI) usando os tokens do Design System V&D.
 * Espelha o Badge do Figma (node `11362:16744`, página "Badge ✅ New!").
 *
 * ⚠️ A doc de tokens do po-badge não lista nomes de CSS custom property
 * por status — só documenta os @Input (`p-status`, `p-color`, `p-value`,
 * `p-icon`). Os nomes em `po-badge.tokens.css` (`--vd-badge-*`) são
 * convenção V&D, não confirmados como oficiais.
 *
 * Doc oficial: https://po-ui.io/documentation/po-badge
 */
export function PoBadge({ status = 'brand', solid = true, value, label, type = 'label', className }: PoBadgeProps) {
  return (
    <span
      className={['vd-po-badge', className ?? ''].filter(Boolean).join(' ')}
      data-status={status}
      data-solid={solid ? 'true' : 'false'}
      data-type={type}
    >
      {type !== 'dot' && (value !== undefined ? (value > 9 ? '9+' : value) : label)}
    </span>
  );
}
