import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import { tokens } from '../../tokens';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Estilo visual do botão */
  variant?: ButtonVariant;
  /** Tamanho do botão */
  size?: ButtonSize;
  /** Desabilita interação e aplica estado visual de disabled */
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    backgroundColor: tokens.color.brand.primary.value,
    color: tokens.color.text['on-brand'].value,
  },
  secondary: {
    backgroundColor: tokens.color.brand.secondary.value,
    color: tokens.color.text['on-brand'].value,
  },
};

const sizeStyles: Record<ButtonSize, CSSProperties> = {
  sm: {
    padding: `${tokens.spacing.xs.value} ${tokens.spacing.md.value}`,
    fontSize: tokens.typography['font-size'].sm.value,
  },
  md: {
    padding: `${tokens.spacing.sm.value} ${tokens.spacing.lg.value}`,
    fontSize: tokens.typography['font-size'].md.value,
  },
  lg: {
    padding: `${tokens.spacing.md.value} ${tokens.spacing.xl.value}`,
    fontSize: tokens.typography['font-size'].lg.value,
  },
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  style,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md border-0 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ''}`}
      style={{
        fontFamily: tokens.typography['font-family'].base.value,
        fontWeight: Number(tokens.typography['font-weight'].medium.value),
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
