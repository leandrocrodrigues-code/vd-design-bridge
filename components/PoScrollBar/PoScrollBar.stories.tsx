import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoScrollBar } from './PoScrollBar';

const meta = {
  title: 'POUi/Scroll Bar (referência de estilo)',
  component: PoScrollBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '⚠️ Não é componente Angular da PO-UI — scrollbar costuma ser nativa do navegador. Preview espelha a especificação visual do Figma (node `10993:47825`, página "Scroll Bar ✅ New!") como referência (ex. `::-webkit-scrollbar`).',
      },
    },
  },
} satisfies Meta<typeof PoScrollBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Orientations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
      <PoScrollBar orientation="vertical" />
      <PoScrollBar orientation="horizontal" />
    </div>
  ),
};
