import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoProgress } from './PoProgress';

const meta = {
  title: 'POUi/Progress',
  component: PoProgress,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Preview do **po-progress** (shape=bar), Figma "Progress Bar" node `321:7834`, página "Progress Bar ✅". Tokens reais: `--background-color-tray`, `--background-color-indicator`. Confirmado nos 33 combos Size × Value. Doc oficial: https://po-ui.io/documentation/po-progress',
      },
    },
  },
  args: { value: 60 },
} satisfies Meta<typeof PoProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <PoProgress value={30} size="small" />
      <PoProgress value={60} size="medium" />
      <PoProgress value={90} size="large" />
    </div>
  ),
};

export const WithPercentage: Story = {
  render: () => <div style={{ width: '300px' }}><PoProgress value={45} size="medium" showPercentage /></div>,
};
