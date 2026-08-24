import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoDivider } from './PoDivider';

const meta = {
  title: 'POUi/Divider',
  component: PoDivider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Preview do **po-divider** (Figma node `288:5742`, página "Divider ✅"). Cor `surface/card` #f7f9f9 confirmada nos 3 tamanhos × 2 orientações. Doc oficial: https://po-ui.io/documentation/po-divider',
      },
    },
  },
} satisfies Meta<typeof PoDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PoDivider borderWidth="small" />
      <PoDivider borderWidth="medium" />
      <PoDivider borderWidth="large" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => <PoDivider label="ou" />,
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', height: '80px', gap: '16px' }}>
      <span>Item A</span>
      <PoDivider orientation="vertical" />
      <span>Item B</span>
    </div>
  ),
};
