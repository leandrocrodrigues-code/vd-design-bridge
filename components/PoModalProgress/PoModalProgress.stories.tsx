import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoModalProgress } from './PoModalProgress';
import { PoButton } from '../PoButton/PoButton';

const docs = `
Preview do **po-modal** (variante Progress) com os tokens do Design
System V&D.

**Origem do design:** PDF \`Componentespdf/modal/Modal Progress.pdf\`.
Lista de passos com 3 estados: \`done\` (check verde), \`active\`
(spinner ciano), \`locked\` (cadeado cinza) — footer com link + 2 botões.

Doc oficial: https://po-ui.io/documentation/po-modal
`;

const steps = [
  { label: 'Label Text', status: 'done' as const },
  { label: 'Label Text', status: 'active' as const },
  { label: 'Label Text', status: 'locked' as const },
  { label: 'Label Text', status: 'locked' as const },
  { label: 'Label Text', status: 'locked' as const },
];

const meta = {
  title: 'POUi/Modal (Progress)',
  component: PoModalProgress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: docs } },
  },
  args: { title: 'Title Text', paragraph: 'Paragraph Text', steps, open: false },
} satisfies Meta<typeof PoModalProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PoButton label="Abrir modal" onClick={() => setOpen(true)} />
      <PoModalProgress open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
}

export const Playground: Story = {
  render: () => <Interactive />,
};
