import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoInput } from './PoInput';

const docs = `
Preview do **po-input** da PO-UI (mapeia o "Text Input" do Figma, node
\`288:651\`, página "Forms ✅").

**Doc oficial:** https://po-ui.io/documentation/po-input

7 States lidos nó a nó em MD:

| Sub-state | Border | Texto/BG |
|---|---|---|
| Default | \`surface/container\` | placeholder \`content/03\` |
| Hover | \`surface/brand/highlight\` | placeholder \`content/03\` |
| Focus | \`surface/brand/highlight\` + glow | cursor piscando |
| Typing | \`surface/brand/highlight\` + glow | texto \`content/pure\` |
| Filled | \`surface/container\` | texto \`content/pure\` |
| Disabled | sem borda, bg \`surface/container\` | texto \`content/03\` |

⚠️ **Estado Alert/erro**: a doc de tokens do po-input **não lista** um
estado de erro entre as CSS vars documentadas. O Figma tem um State=Alert
completo (borda + texto + caption em \`feedback/alert\`), implementado
aqui como extensão (\`invalid\`), com nomes \`--vd-input-*\` — não confirmado
que seja assim que a PO-UI real expõe validação (provável candidato:
\`p-error-message\` do form, não uma prop de cor direta).
`;

const meta = {
  title: 'POUi/Input',
  component: PoInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: docs } },
  },
  argTypes: {
    label: { control: 'text', description: 'p-label' },
    placeholder: { control: 'text', description: 'p-placeholder' },
    required: { control: 'boolean', description: 'p-required' },
    help: { control: 'text', description: 'p-help' },
    disabled: { control: 'boolean', description: 'p-disabled' },
    invalid: { control: 'boolean', description: 'Extensão V&D — sem token oficial confirmado' },
    errorMessage: { control: 'text' },
  },
  args: {
    label: 'Label text',
    placeholder: 'Placeholder text',
    required: false,
    disabled: false,
    invalid: false,
  },
} satisfies Meta<typeof PoInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const angular = (code: string) => ({ docs: { source: { code, language: 'html' } } });

function Interactive(props: Parameters<typeof PoInput>[0]) {
  const [value, setValue] = useState('');
  return <PoInput {...props} value={value} onChange={setValue} />;
}

export const Playground: Story = {
  render: (args) => <Interactive {...args} />,
  parameters: angular(`<po-input p-label="Label text" p-placeholder="Placeholder text" [(ngModel)]="value"></po-input>`),
};

export const States: Story = {
  name: 'Sub-states (Figma)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <PoInput label="Default" previewState="Default" />
      <PoInput label="Hover" previewState="Hover" />
      <PoInput label="Focus" previewState="Focus" />
      <PoInput label="Typing" previewState="Typing" value="Input Text" onChange={() => {}} />
      <PoInput label="Filled" previewState="Filled" value="Input Text" onChange={() => {}} />
      <PoInput label="Disabled" disabled value="Input Text" onChange={() => {}} />
    </div>
  ),
};

export const Invalid: Story = {
  name: 'Alert (extensão V&D)',
  render: () => (
    <PoInput
      label="E-mail"
      required
      invalid
      errorMessage="Informe um e-mail válido"
      value="usuario@"
      onChange={() => {}}
    />
  ),
};
