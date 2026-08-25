import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoCardInvoice } from './PoCardInvoice';

const mappingDocs = `
Preview do **Card Invoice** com os tokens do Design System V&D.

**Origem do design:** PDF \`Componentespdf/Card Invoice.pdf\`. Tag no
topo + lista de pares Overline/Label. 5 tonalidades confirmadas no PDF.

**Não é um componente \`po-*\`** — sem equivalente na PO-UI.

**Doc PO-UI:** https://po-ui.io — não há uma página específica pra este componente (composição própria, sem \`po-*\` direto).
`;

const meta = {
  title: 'POUi/Cards/Invoice',
  component: PoCardInvoice,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  argTypes: {
    tone: { control: 'select', options: ['informative', 'brand', 'success', 'warning', 'alert'] },
  },
  args: {
    tag: 'Label Tag',
    tone: 'informative',
  },
} satisfies Meta<typeof PoCardInvoice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllTones: Story = {
  name: 'Todas as tonalidades',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '16px' }}>
      {(['informative', 'brand', 'success', 'warning', 'alert'] as const).map((tone) => (
        <PoCardInvoice key={tone} tone={tone} />
      ))}
    </div>
  ),
};
