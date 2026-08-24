import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoAccordion } from './PoAccordion';

const items = [
  { key: '1', label: 'Label Text', title: 'Título exemplo', content: 'Conteúdo do primeiro item.' },
  { key: '2', label: 'Segundo item', content: 'Conteúdo do segundo item.' },
  { key: '3', label: 'Terceiro item', content: 'Conteúdo do terceiro item.' },
];

const meta = {
  title: 'POUi/Accordion',
  component: PoAccordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Preview do **po-accordion** (Figma node `3500:6499`, página "Accordion ✅"). 3 status confirmados: Closed (bg surface/pure + border container), Hover (bg card + border inverse), Open (header card + corpo pure). Doc oficial: https://po-ui.io/documentation/po-accordion',
      },
    },
  },
  args: { items },
} satisfies Meta<typeof PoAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: '600px' }}>
      <PoAccordion {...args} />
    </div>
  ),
};

export const AllowExpandAll: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <PoAccordion items={items} allowExpandItems />
    </div>
  ),
};
