import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoChip } from './PoChip';

const docs = `
Preview de **Chips** (Figma node \`2659:3661\`, página "Chips ✅").

⚠️ **Não existe \`po-chip\` nem \`po-chips\` na PO-UI** — confirmado tentando
os dois nomes prováveis na doc oficial (\`po-ui.io/llms-generated/po-chip.md\`
e \`po-chips.md\`), nenhum existe. Extensão V&D pura, tokens
\`--vd-chip-*\` (convenção nossa, não oficial).

Cores confirmadas nó a nó: Default → bg \`surface/container\`, sem borda.
Active → bg \`surface/brand/container\` + borda 1px \`surface/brand/pure\`.
`;

const meta = {
  title: 'Componentes/POUi/Chips (extensão)',
  component: PoChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: docs } },
  },
  args: { label: 'Label' },
} satisfies Meta<typeof PoChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <PoChip label="Default" />
      <PoChip label="Active" active />
    </div>
  ),
};

function Interactive() {
  const [active, setActive] = useState(false);
  return <PoChip label="Clique em mim" active={active} onToggle={() => setActive((a) => !a)} />;
}

export const Playground: Story = {
  render: () => <Interactive />,
};

export const Group: Story = {
  name: 'Chips Group',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <PoChip label="Todos" active />
      <PoChip label="Ativos" />
      <PoChip label="Pendentes" />
      <PoChip label="Concluídos" />
    </div>
  ),
};
