import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoLoading } from './PoLoading';

const meta = {
  title: 'POUi/Loading',
  component: PoLoading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Preview do **po-loading** (Figma "Loading Icon", node `10642:108369`, página "Loading Icon ✅ New!"). Spinner em `surface/brand/pure`, 3 tamanhos. Não confirmei os nomes de token oficiais (doc não carregou). Doc oficial: https://po-ui.io/documentation/po-loading',
      },
    },
  },
} satisfies Meta<typeof PoLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <PoLoading size="small" />
      <PoLoading size="medium" />
      <PoLoading size="large" />
    </div>
  ),
};
