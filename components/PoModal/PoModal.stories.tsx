import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoModal } from './PoModal';
import { PoButton } from '../PoButton/PoButton';

const docs = `
Preview do **po-modal** (variante Feedback) — Figma "Modal Feedback",
node \`12138:2494\`, página "Modal ✅". Validei nó a nó o **Type=Success**:
card \`surface/pure\`, radius 12px, sombra \`0 6px 16px rgba(0,0,0,.08)\`,
ícone circular \`<status>/container\` + \`<status>/highlight\`, título bold
\`content/pure\`, parágrafo \`content/03\`.

⚠️ **Pendência**: os outros 7 Type do Figma (Brand/Neutral/Informative/
Warning/Alert/Processing/Date Success) seguem o padrão de cor por
analogia — só Success foi lido nó a nó.

As outras 2 variantes do Figma já estão implementadas: **Modal
(Progress)** e **Modal (Template)**, cada uma com sua própria story.

Doc oficial: https://po-ui.io/documentation/po-modal
`;

const meta = {
  title: 'POUi/Modal (Feedback)',
  component: PoModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: docs } },
  },
  args: { title: 'Title text', open: false },
} satisfies Meta<typeof PoModal>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PoButton label="Abrir modal" onClick={() => setOpen(true)} />
      <PoModal
        open={open}
        onClose={() => setOpen(false)}
        status="success"
        icon="✓"
        title="Title text 2 lines maximum"
        paragraph="Paragraph text 3 lines maximum"
        primaryAction={{ label: 'Confirmar', onClick: () => setOpen(false) }}
        secondaryAction={{ label: 'Cancelar', onClick: () => setOpen(false) }}
      />
    </>
  );
}

export const Playground: Story = {
  render: () => <Interactive />,
};
