import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoCardDashboard } from './PoCardDashboard';

const mappingDocs = `
Preview do **Card Dashboard** com os tokens do Design System V&D.

**Origem do design:** PDF \`Componentespdf/Card Dashboard.pdf\`. Card KPI:
ícone + label + menu kebab, valor principal + chip de tendência, texto
de apoio com valor de variação.

**Não é um componente \`po-*\`** — sem equivalente na PO-UI.
`;

const meta = {
  title: 'POUi/Cards/Dashboard',
  component: PoCardDashboard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  argTypes: {
    trend: { control: 'select', options: ['up', 'down', 'none'] },
  },
  args: {
    label: 'Label Text',
    value: 'R$ 99.999,99',
    trendValue: '+99%',
    trend: 'up',
    supportingValue: '+R$ 99.999,99',
    supportingText: 'Supporting Text',
  },
} satisfies Meta<typeof PoCardDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Down: Story = {
  args: { trend: 'down', trendValue: '-12%', supportingValue: '-R$ 1.200,00' },
};
