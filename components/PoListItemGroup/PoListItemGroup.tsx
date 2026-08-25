import { PoListItem, type PoListItemProps } from '../PoListItem/PoListItem';
import './po-list-item-group.tokens.css';

export type PoListItemGroupLayout = 'vertical' | 'horizontal';

export interface PoListItemGroupProps {
  items: PoListItemProps[];
  /** vertical = lista empilhada com divisores (padrão); horizontal = linha de colunas, sem leading/trailing/ação */
  layout?: PoListItemGroupLayout;
  className?: string;
}

/**
 * Preview web do agrupamento de itens do **po-list-view** (PO-UI) —
 * o componente real recebe `p-items` (array) e renderiza a lista
 * inteira internamente. "List Item Group" no PDF
 * (`Componentespdf/list/List Item Group.pdf`) mostra 2 layouts: uma
 * lista vertical empilhada (cada linha = [[PoListItem]]) e uma variante
 * horizontal (colunas lado a lado, só texto — sem leading/trailing/ação).
 *
 * Doc oficial: https://po-ui.io/documentation/po-list-view
 */
export function PoListItemGroup({ items, layout = 'vertical', className }: PoListItemGroupProps) {
  if (layout === 'horizontal') {
    return (
      <div className={['vd-po-list-item-group', 'vd-po-list-item-group--horizontal', className ?? ''].filter(Boolean).join(' ')}>
        {items.map((item, index) => (
          <div key={index} className="vd-po-list-item-group__column">
            <span className="vd-po-list-item-group__primary">{item.primaryText}</span>
            {item.secondaryText && <span className="vd-po-list-item-group__secondary">{item.secondaryText}</span>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={['vd-po-list-item-group', className ?? ''].filter(Boolean).join(' ')}>
      {items.map((item, index) => (
        <PoListItem key={index} {...item} divider={item.divider ?? index < items.length - 1} />
      ))}
    </div>
  );
}
