import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoLinkButton } from './PoLinkButton';

const docs = `
Preview do **Link Button** do Figma (node \`1528:4063\`, página "Buttons ✅").

⚠️ **Não existe componente oficial da PO-UI equivalente.** \`po-button\` só
tem \`p-kind\` primary/secondary/tertiary — nenhum renderiza como link
sublinhado. Este componente é uma **extensão V&D pura**: as custom
properties em \`po-link-button.tokens.css\` usam o prefixo
\`--vd-link-button-*\` (convenção nossa), não nomes documentados da PO-UI —
diferente de Button/Checkbox/Switch, que espelham tokens reais.

Em Angular, a implementação mais próxima hoje seria um \`<a>\`/\`<button>\`
estilizado à mão com esses tokens, até a PO-UI (se algum dia) publicar um
componente equivalente.

### Cores por estado (confirmadas nó a nó)

| Sub-state | Cor |
|---|---|
| Default / Hover / Focus | \`content/pure\` #121212 |
| Pressed | \`surface/brand/highlight\` #1e3da1 |
| Disabled | \`content/03\` #8e8e8e |
`;

const meta = {
  title: 'POUi/Link Button (extensão)',
  component: PoLinkButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: docs } },
  },
  argTypes: {
    text: { control: 'text' },
    size: { control: 'select', options: ['small', 'large'] },
    disabled: { control: 'boolean' },
    previewState: { control: 'select', options: ['Default', 'Hover', 'Pressed', 'Focus'] },
  },
  args: {
    text: 'Saiba mais',
    size: 'large',
    disabled: false,
    previewState: 'Default',
  },
} satisfies Meta<typeof PoLinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  name: 'Sub-states (Figma)',
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <PoLinkButton text="Default" previewState="Default" />
      <PoLinkButton text="Hover" previewState="Hover" />
      <PoLinkButton text="Pressed" previewState="Pressed" />
      <PoLinkButton text="Focus" previewState="Focus" />
      <PoLinkButton text="Disabled" disabled />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <PoLinkButton text="Small" size="small" />
      <PoLinkButton text="Large" size="large" />
    </div>
  ),
};
