import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoCardValue } from './PoCardValue';

const mappingDocs = `
Preview do **Card Value** com os tokens do Design System V&D.

**Origem do design:** PDF \`Componentespdf/Card Value.pdf\`. 2 layouts
observados: \`simple\` (valor + tag + 1 linha de detalhamento) e \`status\`
(ícone + valor grande + 2 chips de detalhamento success/alert, fundo em
3 tonalidades: success/warning/alert).

**Não é um componente \`po-*\`** — sem equivalente na PO-UI.

**Doc PO-UI:** https://po-ui.io — não há uma página específica pra este componente (composição própria, sem \`po-*\` direto).
`;

const meta = {
  title: 'POUi/Cards/Value',
  component: PoCardValue,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
} satisfies Meta<typeof PoCardValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: { variant: 'simple' },
};

export const Status: Story = {
  args: { variant: 'status', tone: 'success' },
};

export const AllStatusTones: Story = {
  name: 'Status — todas as tonalidades',
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <PoCardValue variant="status" tone="success" />
      <PoCardValue variant="status" tone="warning" />
      <PoCardValue variant="status" tone="alert" />
    </div>
  ),
};
