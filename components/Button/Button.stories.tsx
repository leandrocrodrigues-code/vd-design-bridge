import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TWTButton } from './Button';

const meta = {
  title: 'Core/TWTButton',
  component: TWTButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Representação visual do **TWTButton** da biblioteca Delphi. O preview reproduz os tamanhos, variantes e estados definidos na especificação. \`PreviewState\` existe somente para documentação; \`Enabled\` e \`OnClick\` representam o contrato Delphi.`,
      },
    },
  },
  argTypes: {
    Caption: { control: 'text', description: 'Texto do botão.' },
    Variant: { control: 'select', options: ['Primary', 'Secondary', 'Tertiary'] },
    Size: { control: 'select', options: ['LG', 'MD', 'SM'] },
    Enabled: { control: 'boolean', description: 'Equivalente à propriedade Enabled do Delphi.' },
    PreviewState: { control: 'select', options: ['Default', 'Hover', 'Pressed', 'Focus', 'Disabled'], description: 'Apenas para inspeção visual no Storybook.' },
    LeadingIcon: { control: false },
    TrailingIcon: { control: false },
    OnClick: { action: 'OnClick' },
  },
  args: {
    Caption: 'Editar',
    Variant: 'Primary',
    Size: 'MD',
    Enabled: true,
    PreviewState: 'Default',
    OnClick: fn(),
  },
} satisfies Meta<typeof TWTButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <TWTButton Caption="Editar" Variant="Primary" />
      <TWTButton Caption="Editar" Variant="Secondary" />
      <TWTButton Caption="Editar" Variant="Tertiary" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <TWTButton Caption="Editar" Size="LG" />
      <TWTButton Caption="Editar" Size="MD" />
      <TWTButton Caption="Editar" Size="SM" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="grid grid-cols-2 items-center gap-3 sm:grid-cols-5">
      <TWTButton Caption="Editar" PreviewState="Default" />
      <TWTButton Caption="Editar" PreviewState="Hover" />
      <TWTButton Caption="Editar" PreviewState="Pressed" />
      <TWTButton Caption="Editar" PreviewState="Focus" />
      <TWTButton Caption="Editar" Enabled={false} />
    </div>
  ),
};

export const LeadingIconAndCaption: Story = {
  args: { Caption: 'Editar', LeadingIcon: '✎' },
};

export const TrailingIconAndCaption: Story = {
  args: { Caption: 'Continuar', TrailingIcon: '→' },
};

export const IconOnly: Story = {
  args: { Caption: undefined, LeadingIcon: '⧉', 'aria-label': 'Copiar' },
};
