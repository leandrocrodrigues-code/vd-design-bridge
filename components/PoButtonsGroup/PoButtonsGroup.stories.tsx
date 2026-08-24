import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoButtonsGroup } from './PoButtonsGroup';

const docs = `
Preview de **Buttons Group** (Figma node \`9877:13798\`, página "Buttons ✅").

⚠️ **Não existe \`po-buttons-group\`** na PO-UI — é puramente uma composição
de vários \`po-button\` lado a lado. Sem token novo: o design context do
Figma confirma que só há arranjo (gap \`Spacing/2XSM\` = 8px), sem cor
diferente das já documentadas no Button. Por isso este componente é um
wrapper fino em cima do \`PoButton\` existente.

### Mapeamento Figma → composição

| Figma | Aqui |
|---|---|
| \`Type=Inline\` | \`layout="inline"\` (row) |
| \`Type=Stack\` | \`layout="stack"\` (column) |
| \`Action Hierarchy=Left/Top\` | ordem normal do array \`actions\` |
| \`Action Hierarchy=Right/Bottom\` | \`reverse\` |
| \`Button width=Fill Container\` | \`width="fill"\` |
`;

const meta = {
  title: 'POUi/Buttons Group (composição)',
  component: PoButtonsGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: docs } },
  },
  args: {
    actions: [
      { key: 'cancel', label: 'Cancelar', kind: 'tertiary' as const },
      { key: 'confirm', label: 'Confirmar', kind: 'primary' as const },
    ],
  },
} satisfies Meta<typeof PoButtonsGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const actions = [
  { key: 'cancel', label: 'Cancelar', kind: 'tertiary' as const },
  { key: 'confirm', label: 'Confirmar', kind: 'primary' as const },
];

export const Inline: Story = {
  render: () => <PoButtonsGroup actions={actions} layout="inline" />,
};

export const Stack: Story = {
  render: () => (
    <div style={{ width: '240px' }}>
      <PoButtonsGroup actions={actions} layout="stack" width="fill" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <PoButtonsGroup actions={actions} size="small" />
      <PoButtonsGroup actions={actions} size="medium" />
      <PoButtonsGroup actions={actions} size="large" />
    </div>
  ),
};
