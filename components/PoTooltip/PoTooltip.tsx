import { useState, type ReactNode } from 'react';
import './po-tooltip.tokens.css';

export type PoTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface PoTooltipProps {
  text: string;
  position?: PoTooltipPosition;
  children: ReactNode;
}

/**
 * ⚠️ Não confirmei os nomes de CSS token do po-tooltip via
 * po-ui.io/llms-generated — a página não carregou nas tentativas
 * (po-tooltip.md e po-tooltip-directive.md). Na PO-UI real, tooltip
 * costuma ser a diretiva `p-tooltip="texto"` aplicada em qualquer
 * elemento, não um componente wrapper — diferente da estrutura usada
 * aqui, que segue o "Tooltip" do Figma (node `3034:3225`, página
 * "Tooltip ✅") como bloco próprio. Tratado como extensão até confirmar.
 *
 * Cor confirmada no Figma: bg surface/inverse #121212 a 90% de opacidade,
 * texto content/inverse, radius 8px — mesma cor nas 12 combinações de
 * alinhamento (só muda a posição da seta).
 */
export function PoTooltip({ text, position = 'top', children }: PoTooltipProps) {
  const [visible, setVisible] = useState(false);
  return (
    <span
      className="vd-po-tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span className="vd-po-tooltip" data-position={position} role="tooltip">
          {text}
        </span>
      )}
    </span>
  );
}
