import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoTextarea } from './PoTextarea';

const docs = `
Preview do **po-textarea** da PO-UI (Figma "Text Area", node \`316:4058\`,
página "Forms ✅").

Confirmado no Figma: mesmas regras de cor por estado do po-input (ver
[POUi/Input](?path=/docs/poui-input--docs)) — só muda pra multi-linha.
Não repeti a leitura nó a nó de todos os 7 estados porque a estrutura já
estava validada.

**Doc oficial:** https://po-ui.io/documentation/po-textarea
`;

const meta = {
  title: 'POUi/Textarea',
  component: PoTextarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: docs } },
  },
  args: {
    label: 'Label text',
    placeholder: 'Placeholder text',
  },
} satisfies Meta<typeof PoTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive(props: Parameters<typeof PoTextarea>[0]) {
  const [value, setValue] = useState('');
  return <PoTextarea {...props} value={value} onChange={setValue} />;
}

export const Playground: Story = {
  render: (args) => <Interactive {...args} />,
};

export const States: Story = {
  name: 'Sub-states (Figma)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <PoTextarea label="Default" previewState="Default" />
      <PoTextarea label="Disabled" disabled value="Input Text" onChange={() => {}} />
      <PoTextarea label="Alert" invalid errorMessage="Campo obrigatório" />
    </div>
  ),
};
