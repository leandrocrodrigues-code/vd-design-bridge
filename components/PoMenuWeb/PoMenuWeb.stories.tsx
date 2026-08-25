import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoMenuWeb, type PoMenuWebGroup } from './PoMenuWeb';

const docs = `
Preview do **Menu (Web)** com os tokens do Design System V&D.

**Origem do design:** PDF \`Componentespdf/menu web/Menu (Web).pdf\` —
página marcada **🚧 no Figma** (work-in-progress). Trilha de ícones
(logo + navegação + engrenagem) + painel expansível (título, "Acesso
rápido", grupos colapsáveis de rotinas numeradas).

### Divergência real — registrada, não resolvida

**Não é um componente \`po-*\`.** Provavelmente a versão web robusta do
\`po-menu\` real (com \`logo\`, \`collapsed\`, \`subItems\` até 4 níveis) —
não confirmado nó a nó (página 🚧 travava a leitura via MCP, extraída
via PDF). Diferente do já existente [[PoSideMenu]] (lista simples, sem
trilha de ícones nem grupos).

**Doc PO-UI:** https://po-ui.io — não há uma página específica pra este componente (composição própria, sem \`po-*\` direto).
`;

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 16 16" width="18" height="18" fill="none">
    <path d={d} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const navItems = [
  { icon: <Icon d="M2 8 8 2l6 6M4 6.5V14h8V6.5" /> },
  { icon: <Icon d="M3 13V8M8 13V3M13 13V10" /> },
  { icon: <Icon d="M2 5h12v8H2zM4 5V3h8v2" />, active: true },
  { icon: <Icon d="M2 7 3 2h10l1 5M3 7v6h10V7M3 7h10" /> },
  { icon: <Icon d="M2 5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" /> },
];

const groups: PoMenuWebGroup[] = [
  { label: 'Cadastros', expanded: true, items: [
    { code: '203 ·', label: 'Produtos', active: true },
    { code: '255 ·', label: 'Clientes' },
    { code: '268 ·', label: 'Fornecedores' },
    { code: '275 ·', label: 'Unidades' },
    { code: '283 ·', label: 'Embalagens' },
  ] },
  { label: 'Cotações' },
  { label: 'Pedidos' },
  { label: 'Precificações' },
  { label: 'Relatórios' },
];

const meta = {
  title: 'Componentes/POUi/Menu (Web)',
  component: PoMenuWeb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: docs } },
  },
  args: {
    navItems,
    title: 'Compras',
    groups,
  },
} satisfies Meta<typeof PoMenuWeb>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive() {
  const [collapsed, setCollapsed] = useState(false);
  return <PoMenuWeb navItems={navItems} title="Compras" groups={groups} collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} />;
}

export const Playground: Story = {
  render: () => <Interactive />,
};

export const Collapsed: Story = {
  args: { collapsed: true },
};
