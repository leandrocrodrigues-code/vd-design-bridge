import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoModalTemplate } from './PoModalTemplate';
import { PoButton } from '../PoButton/PoButton';

const docs = `
Preview do **scaffold genérico** do po-modal com os tokens do Design
System V&D.

**Origem do design:** PDF \`Componentespdf/modal/Modal (Template).pdf\`.
3 zonas (Header/Content/Action) — base de composição que as variantes
reais (Feedback, Progress) seguem, não um modal final com dados.

Doc oficial: https://po-ui.io/documentation/po-modal
`;

const meta = {
  title: 'Componentes/POUi/Modal (Template)',
  component: PoModalTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: docs } },
  },
  args: { header: 'Header', content: 'Content', action: 'Action', open: false },
} satisfies Meta<typeof PoModalTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PoButton label="Abrir modal" onClick={() => setOpen(true)} />
      <PoModalTemplate open={open} onClose={() => setOpen(false)} header="Header" content="Content" action="Action" />
    </>
  );
}

export const Playground: Story = {
  render: () => <Interactive />,
};
