import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoSideMenu } from './PoSideMenu';

const mappingDocs = `
Preview web do item de navegação do **po-menu** da PO-UI com os tokens do
Design System V&D.

**Origem do design:** Figma \`MCP Design System V&D — UI KIT Desktop\`,
frame \`Side Menu\` (node \`316:4205\`), página "Side Menu ✅". 2 states
lidos via design context: Default e Active.

**Doc oficial:** https://po-ui.io/documentation/po-menu

### Divergência real — registrada, não resolvida

O Figma tem um "Side Menu" **simples**: lista vertical só com texto, sem
ícone, sem logo, sem colapsar/expandir, sem busca, sem sub-níveis — só
\`State=Default\` e \`State=Active\`.

A PO-UI real (\`po-menu\`) é bem mais robusta: \`@Input logo\`/\`shortLogo\`,
\`collapsed\` (colapsa pra ícones), \`filter\` (campo de busca),
\`menus: PoMenuItem[]\` com até 4 níveis de \`subItems\` e ícone por item.

Este preview **não implementa a API inteira** — só reproduz o visual do
item de navegação (\`po-menu-item\`) tal como aparece no Figma, com os
tokens reais de cor (\`--color-actived\`, \`--background-color-hover\` etc).
O Hover aqui é extensão V&D: o Figma não documenta essa sub-state pro
Side Menu, então foi aplicado seguindo o padrão do token oficial
\`--background-color-hover\`.

### Mapeamento Figma → PO-UI

| Figma | PO-UI | Observação |
|---|---|---|
| Lista de "Menu Item" | \`menus\` (\`PoMenuItem[]\`) | aqui simplificado pra \`{ label, value }\` |
| \`State=Active\` | item com \`link\` ativo na rota atual | \`po-menu\` decide isso via roteamento, não é prop direta |
| \`State=Default\` | \`po-menu-item\` sem seleção | equivalente direto |
| — | \`logo\`, \`collapsed\`, \`filter\`, \`subItems\`, ícone | sem equivalente no Figma "Side Menu" — não implementado |
`;

const meta = {
  title: 'POUi/Side Menu',
  component: PoSideMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  args: {
    items: [
      { label: 'Visão geral', value: 'overview' },
      { label: 'Pedidos', value: 'orders' },
      { label: 'Clientes', value: 'customers' },
      { label: 'Produtos', value: 'products' },
      { label: 'Relatórios', value: 'reports' },
    ],
    activeValue: 'overview',
  },
} satisfies Meta<typeof PoSideMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const angular = (code: string) => ({ docs: { source: { code, language: 'html' } } });

function Interactive(props: Parameters<typeof PoSideMenu>[0]) {
  const [activeValue, setActiveValue] = useState(props.activeValue);
  return <PoSideMenu {...props} activeValue={activeValue} onSelect={setActiveValue} />;
}

export const Playground: Story = {
  render: (args) => <Interactive {...args} />,
  parameters: angular(`<po-menu [p-menus]="[
  { label: 'Visão geral', link: '/overview' },
  { label: 'Pedidos', link: '/orders' },
  { label: 'Clientes', link: '/customers' },
  { label: 'Produtos', link: '/products' },
  { label: 'Relatórios', link: '/reports' }
]"></po-menu>`),
};

export const States: Story = {
  name: 'States (Figma)',
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <PoSideMenu items={[{ label: 'Default', value: 'a' }]} />
      <PoSideMenu items={[{ label: 'Active', value: 'a' }]} activeValue="a" />
    </div>
  ),
};
