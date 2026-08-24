import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoHero } from './PoHero';

const meta = {
  title: 'POUi/Hero (composição)',
  component: PoHero,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '⚠️ Composição (botão voltar + título + busca + tag + botão) — não é `po-hero`. Figma node `5046:9134`, página "Hero ✅".',
      },
    },
  },
  args: { overline: 'Overline Text', title: 'Title Text', supportText: 'Support Text', actionLabel: 'Label' },
} satisfies Meta<typeof PoHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
