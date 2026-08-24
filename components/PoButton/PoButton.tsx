import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './po-button.tokens.css';

/** Espelha o enum PoButtonKind da PO-UI (po-button). */
export type PoButtonKind = 'primary' | 'secondary' | 'tertiary';
/** p-size documentado: small (32px), medium (44px, padrão), large (56px). */
export type PoButtonSize = 'small' | 'medium' | 'large';
/** Espelha o enum PoButtonType. */
export type PoButtonType = 'submit' | 'button' | 'reset';
/** Estado forçado só pra inspeção no Storybook. */
export type PoButtonPreviewState = 'Default' | 'Hover' | 'Pressed' | 'Focus';

export interface PoButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'disabled' | 'onClick'> {
  /** p-label: texto do botão. */
  label?: string;
  /** p-kind: primary (destaque), secondary (padrão) ou tertiary (sem preenchimento). */
  kind?: PoButtonKind;
  /** p-size: small (32px), medium (44px, padrão) ou large (56px). */
  size?: PoButtonSize;
  /** p-type: comportamento do botão dentro de um form. */
  type?: PoButtonType;
  /**
   * p-icon: nome de classe de ícone (ex. "an an-user"), renderizado como
   * `<i class="...">`, ou um ReactNode (equivalente ao TemplateRef do Angular).
   * A PO-UI só tem ícone à esquerda — o Figma tem leading E trailing. A
   * limitação da PO-UI é aceita como está (ver story).
   */
  icon?: string | ReactNode;
  /** p-danger: ações irreversíveis. Equivale a Type=Alert no Figma. */
  danger?: boolean;
  /**
   * EXTENSÃO V&D — não existe na PO-UI. Aplica `.vd-po-button--success`
   * por cima do p-kind escolhido, cobrindo o Type=Success do Figma.
   * No Angular vira `class="vd-po-button--success"`, nunca uma prop nova.
   */
  success?: boolean;
  /** p-disabled */
  disabled?: boolean;
  /** p-loading: spinner à esquerda do label; desabilita o botão. */
  loading?: boolean;
  /** p-tabindex */
  tabIndex?: number;
  /** p-aria-label: se omitido, usa o label. */
  ariaLabel?: string;
  /** (p-click) */
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  /** Força um estado visual — só pra documentação/inspeção no Storybook. */
  previewState?: PoButtonPreviewState;
}

function renderIcon(icon: PoButtonProps['icon']) {
  if (!icon) return null;
  if (typeof icon === 'string') {
    return <i className={icon} aria-hidden="true" />;
  }
  return (
    <span aria-hidden="true" style={{ display: 'inline-flex', fontSize: '1em' }}>
      {icon}
    </span>
  );
}

/**
 * Preview web do po-button (PO-UI) usando os tokens do Design System V&D.
 *
 * As cores por estado vivem em `po-button.tokens.css`, com os nomes reais de
 * token da PO-UI apontando pros `--vd-color-*`. Nada de cor em JS aqui — é o
 * que faz o componente acompanhar o toggle light/dark do Storybook.
 *
 * Doc oficial: https://po-ui.io/documentation/po-button
 */
export function PoButton({
  label,
  kind = 'secondary',
  size = 'medium',
  type = 'button',
  icon,
  danger = false,
  success = false,
  disabled = false,
  loading = false,
  tabIndex,
  ariaLabel,
  onClick,
  previewState = 'Default',
  className,
  ...rest
}: PoButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...rest}
      type={type}
      disabled={isDisabled}
      tabIndex={tabIndex}
      aria-label={ariaLabel ?? label}
      aria-busy={loading || undefined}
      data-kind={kind}
      data-size={size}
      data-danger={danger ? 'true' : undefined}
      data-preview-state={previewState}
      className={['vd-po-button', success ? 'vd-po-button--success' : '', className ?? '']
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
    >
      {loading ? <span className="vd-po-button__spinner" aria-hidden="true" /> : renderIcon(icon)}
      {label ? <span>{label}</span> : null}
    </button>
  );
}
