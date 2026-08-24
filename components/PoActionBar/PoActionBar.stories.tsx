import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoActionBar } from './PoActionBar';

const meta = {
  title: 'POUi/Action Bar (composição)',
  component: PoActionBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '⚠️ Composição de po-button (ícone) + po-button (primário) — não é `po-action-bar`. Figma node `12198:51636`, página "Action Bar ✅".',
      },
    },
  },
} satisfies Meta<typeof PoActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <PoActionBar
      leadingActions={[
        { key: 'search', icon: '🔍', label: 'Buscar' },
        { key: 'filter', icon: '⚙️', label: 'Filtrar' },
        { key: 'print', icon: '🖨️', label: 'Imprimir' },
      ]}
      primaryLabel="Novo"
    />
  ),
};
