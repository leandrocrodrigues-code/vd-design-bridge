import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoSectionHeader } from './PoSectionHeader';

const meta = {
  title: 'POUi/Section Header (composição)',
  component: PoSectionHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '⚠️ Não é um componente Angular único — é um padrão de composição (avatar + texto + botão), montado com po-avatar/po-button na implementação real. Figma node `12143:8089`, página "Section Header ✅ New!". Cores confirmadas nó a nó. **Docs PO-UI:** https://po-ui.io/documentation/po-avatar e https://po-ui.io/documentation/po-button (componentes reaproveitados internamente).',
      },
    },
  },
  args: { overline: 'Overline Text', title: 'Title Text', icon: '👤' },
} satisfies Meta<typeof PoSectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PoSectionHeader {...args} size="large" actionLabel="Label" />
      <PoSectionHeader {...args} size="medium" actionLabel="Label" />
      <PoSectionHeader {...args} size="small" actionLabel="Label" />
    </div>
  ),
};
