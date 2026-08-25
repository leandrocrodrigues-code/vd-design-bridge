import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoBadge } from './PoBadge';

const docs = `
Preview do **po-badge** (Figma "Badge", node \`11362:16744\`, página "Badge ✅ New!").

**Doc oficial:** https://po-ui.io/documentation/po-badge

⚠️ **Pendência**: a doc de tokens do po-badge não lista nomes de CSS custom
property por status — só documenta os \`@Input\` (\`p-status\`, \`p-color\`,
\`p-value\`, \`p-icon\`). Os nomes em \`po-badge.tokens.css\` são convenção
V&D, não confirmados como oficiais. Padrão de cor (Solid=True → \`pure\` +
\`content/pure\`; Solid=False → \`container\` + \`highlight\`) confirmado nó a
nó só para Alert; os demais status seguem por analogia com Button/Tag.
`;

const meta = {
  title: 'Componentes/POUi/Badge',
  component: PoBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: docs } },
  },
} satisfies Meta<typeof PoBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LabelText: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {(['neutral', 'brand', 'info', 'success', 'warning', 'alert'] as const).map((status) => (
        <PoBadge key={status} status={status} label={status} />
      ))}
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {(['neutral', 'brand', 'info', 'success', 'warning', 'alert'] as const).map((status) => (
        <PoBadge key={status} status={status} solid={false} label={status} />
      ))}
    </div>
  ),
};

export const Number: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <PoBadge status="alert" value={3} />
      <PoBadge status="alert" value={15} />
    </div>
  ),
};

export const Dot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <PoBadge status="success" type="dot" />
      <PoBadge status="alert" type="dot" />
    </div>
  ),
};
