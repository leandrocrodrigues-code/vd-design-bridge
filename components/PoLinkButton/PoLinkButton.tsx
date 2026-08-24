import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './po-link-button.tokens.css';

export type PoLinkButtonSize = 'small' | 'large';
export type PoLinkButtonPreviewState = 'Default' | 'Hover' | 'Pressed' | 'Focus';

export interface PoLinkButtonProps {
  /** Texto do link. */
  text?: string;
  /** Se informado, renderiza `<a href>`; senão, `<button>`. */
  href?: string;
  size?: PoLinkButtonSize;
  disabled?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  /** Força um estado visual — só pra documentação/inspeção no Storybook. */
  previewState?: PoLinkButtonPreviewState;
  className?: string;
}

/**
 * NÃO existe componente oficial da PO-UI equivalente ao "Link Button" do
 * Figma (node `1528:4063`, página "Buttons ✅"). Ver po-link-button.tokens.css
 * pra detalhes — é uma extensão V&D pura, não uma tradução de um po-*.
 */
export function PoLinkButton({
  text = 'Label',
  href,
  size = 'large',
  disabled = false,
  leadingIcon,
  trailingIcon,
  onClick,
  previewState = 'Default',
  className,
}: PoLinkButtonProps) {
  const content = (
    <>
      {leadingIcon}
      <span>{text}</span>
      {trailingIcon}
    </>
  );

  const sharedProps = {
    className: ['vd-link-button', className ?? ''].filter(Boolean).join(' '),
    'data-size': size,
    'data-preview-state': previewState,
    'data-disabled': disabled ? 'true' : undefined,
  };

  if (href && !disabled) {
    return (
      <a href={href} {...sharedProps}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" disabled={disabled} onClick={onClick} {...sharedProps}>
      {content}
    </button>
  );
}
