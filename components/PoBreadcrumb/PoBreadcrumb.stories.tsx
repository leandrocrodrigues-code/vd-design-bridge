import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoBreadcrumb } from './PoBreadcrumb';

const meta = {
  title: 'POUi/Breadcrumb',
  component: PoBreadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Preview do **po-breadcrumb** (Figma node `12288:8527`, página "Breadcrumb (Web) 🚧" — marcada work-in-progress no próprio Figma). Doc oficial não lista CSS tokens. Doc oficial: https://po-ui.io/documentation/po-breadcrumb',
      },
    },
  },
  args: {
    items: [
      { label: 'Início', link: '#' },
      { label: 'Nível 2', link: '#' },
      { label: 'Nível 3', link: '#' },
      { label: 'Nível 4' },
    ],
  },
} satisfies Meta<typeof PoBreadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
