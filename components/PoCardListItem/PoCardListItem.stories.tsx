import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoCardListItem } from './PoCardListItem';

const mappingDocs = `
Preview do **Card List Item** com os tokens do Design System V&D.

**Origem do design:** PDF \`Componentespdf/Card List Item.pdf\`. Linha de
card simples: Label + Description à esquerda, tag à direita.

Diferente do já existente **PoListItem** (linha de tabela/lista densa,
sem card próprio) — aqui é um bloco isolado com fundo e padding de card.

**Não é um componente \`po-*\`** — sem equivalente na PO-UI.

**Doc PO-UI:** https://po-ui.io — não há uma página específica pra este componente (composição própria, sem \`po-*\` direto).
`;

const meta = {
  title: 'POUi/Cards/List Item',
  component: PoCardListItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  args: {
    label: 'Label Text',
    description: 'Description',
    tag: 'Label Tag',
  },
} satisfies Meta<typeof PoCardListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
