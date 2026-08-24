import './po-side-menu.tokens.css';

export interface PoSideMenuItem {
  /** label do item */
  label: string;
  /** identificador único (mapeia pro `link` do PoMenuItem real) */
  value: string;
}

export interface PoSideMenuProps {
  /** menus — versão simplificada (só label + value) do `PoMenuItem[]` real */
  items: PoSideMenuItem[];
  /** item ativo no momento */
  activeValue?: string;
  onSelect?: (value: string) => void;
  className?: string;
}

/**
 * Preview web do po-menu (PO-UI) usando os tokens do Design System V&D,
 * cobrindo só o visual do item de navegação (Default/Active) confirmado
 * no Figma.
 *
 * **Divergência real registrada:** o Figma tem um componente "Side Menu"
 * simples — lista vertical só com texto, sem ícone, sem logo, sem
 * colapsar/expandir, sem busca, sem sub-níveis (2 states: Default/Active).
 * A PO-UI real (`po-menu`) é bem mais robusta: `logo`/`shortLogo`,
 * `collapsed` (colapsa pra ícones), `filter` (busca), `PoMenuItem[]` com
 * até 4 níveis de `subItems`, ícone por item. Este preview NÃO implementa
 * essa API inteira — só o item de navegação (`po-menu-item`) tal como
 * aparece no Figma, usando os tokens reais de cor (`--color-actived`,
 * `--background-color-hover`, etc).
 *
 * Doc oficial: https://po-ui.io/documentation/po-menu
 */
export function PoSideMenu({ items, activeValue, onSelect, className }: PoSideMenuProps) {
  return (
    <nav className={['vd-po-side-menu', className ?? ''].filter(Boolean).join(' ')}>
      {items.map((item) => {
        const active = item.value === activeValue;
        return (
          <button
            key={item.value}
            type="button"
            className="vd-po-side-menu__item"
            data-active={active ? 'true' : undefined}
            onClick={() => onSelect?.(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
