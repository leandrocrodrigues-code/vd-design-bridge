import type { ReactNode } from 'react';
import './po-avatar.tokens.css';

export type PoAvatarSize = 'small' | 'medium' | 'large';
export type PoAvatarColor = 'brand' | 'neutral';

export interface PoAvatarProps {
  /** p-src — único caminho oficial do po-avatar real (só imagem). */
  src?: string;
  /** p-size */
  size?: PoAvatarSize;
  alt?: string;
  /** EXTENSÃO V&D — po-avatar real não suporta iniciais/ícone. */
  initials?: string;
  /** EXTENSÃO V&D. */
  icon?: ReactNode;
  color?: PoAvatarColor;
  className?: string;
}

/**
 * Preview web do po-avatar (PO-UI) + extensões V&D pra cobrir o Figma.
 *
 * ⚠️ **Divergência real**: o po-avatar oficial só tem `p-src` (imagem),
 * `p-size`, `p-loading` — sem suporte a iniciais/ícone/cor. O Figma
 * (node `265:594`) tem 4 Types: Initials, Icon, User Profile, Image.
 * Só "Image" mapeia pro componente real; os demais (`initials`/`icon`
 * abaixo) são extensão V&D documentada, não tradução de uma prop real.
 *
 * Doc oficial: https://po-ui.io/documentation/po-avatar
 */
export function PoAvatar({ src, size = 'medium', alt = '', initials, icon, color = 'brand', className }: PoAvatarProps) {
  return (
    <span
      className={['vd-po-avatar', className ?? ''].filter(Boolean).join(' ')}
      data-size={size}
      data-color={color}
    >
      {src ? <img src={src} alt={alt} /> : icon || initials}
    </span>
  );
}
