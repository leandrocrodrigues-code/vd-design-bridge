import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoDrawer } from './PoDrawer';

const mappingDocs = `
Preview do **Drawer List Control** com os tokens do Design System V&D.

**Origem do design:** PDF \`Componentespdf/drawer.pdf\`, página "Drawer
List Control" (também documenta um "Drawer (Template)" genérico com 3
zonas Header/Content/Footer, do qual esta é a implementação concreta).

Painel lateral: header (avatar/ícone + Overline/Title + fechar), busca +
botão de ação, chips de filtro removíveis, lista de itens selecionáveis
(checkbox + ícone de status colorido + data/label + indicador — um item
pode mostrar barra de progresso de upload), footer com link + 2 botões.

### Divergência real — registrada, não resolvida

**Não é um componente \`po-*\`.** Tag "Component / Composition" no
Figma. Provavelmente composto internamente de \`po-checkbox\` +
\`po-input\` + \`po-button\` + \`po-tag\` na implementação Angular real —
não confirmado nó a nó (o node original travava a leitura via MCP,
extraído via PDF).

**Doc PO-UI:** https://po-ui.io — não há uma página específica pra este componente (composição própria, sem \`po-*\` direto).
`;

const items = [
  { date: '20/02 - 10:00', label: 'Label Text', status: 'neutral' as const },
  { date: '20/02 - 10:00', label: 'Label Text', status: 'alert' as const },
  { date: '20/02 - 10:00', label: 'Label Text', status: 'uploading' as const, progress: { value: 50, meta: '1,0/2,0mb • 2 minutos restantes' } },
  { date: '20/02 - 10:00', label: 'Label Text', status: 'success' as const },
  { date: '20/02 - 10:00', label: 'Label Text', status: 'alert' as const },
];

const meta = {
  title: 'Componentes/POUi/Drawer',
  component: PoDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  args: {
    overline: 'Overline Text',
    title: 'Title Text',
    chips: [{ label: 'Item 1' }, { label: 'Item 2' }],
    items,
  },
} satisfies Meta<typeof PoDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
