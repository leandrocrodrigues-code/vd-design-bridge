import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TWTButton } from './Button';

const meta = {
  // Mantém a rota pública /?path=/docs/components-button--docs já compartilhada.
  // O nome do componente e seu contrato continuam sendo TWTButton.
  title: 'Components/Button',
  component: TWTButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Representação visual do **TWTButton** da biblioteca Delphi. Os nomes \`Style\`, \`Size\` e \`OnClick\` seguem o contrato nativo. \`PreviewState\`, \`LeadingIcon\` e \`TrailingIcon\` existem somente para a demonstração no Storybook. As medidas seguem o PDF/Figma atual: 48px, 40px e 32px.`,
      },
    },
  },
  argTypes: {
    Caption: { control: 'text', description: 'Texto do botão.' },
    Style: { control: 'select', options: ['bsPrimary', 'bsSecondary', 'bsTertiary', 'bsPrimaryDanger', 'bsTertiaryDanger', 'bsPrimaryPositive'], description: 'Propriedade Style: TButtonStyle.' },
    Size: { control: 'select', options: ['bsLarge', 'bsMedium', 'bsSmall'], description: 'Propriedade Size: TButtonSize.' },
    Enabled: { control: 'boolean', description: 'Equivalente à propriedade Enabled do Delphi.' },
    PreviewState: { control: 'select', options: ['Default', 'Hover', 'Pressed', 'Focus', 'Disabled'], description: 'Apenas para inspeção visual no Storybook.' },
    LeadingIcon: { control: false },
    TrailingIcon: { control: false },
    OnClick: { action: 'OnClick' },
  },
  args: {
    Caption: 'Editar',
    Style: 'bsPrimary',
    Size: 'bsMedium',
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
      <TWTButton Caption="Editar" Style="bsPrimary" />
      <TWTButton Caption="Editar" Style="bsSecondary" />
      <TWTButton Caption="Editar" Style="bsTertiary" />
      <TWTButton Caption="Excluir" Style="bsPrimaryDanger" />
      <TWTButton Caption="Remover" Style="bsTertiaryDanger" />
      <TWTButton Caption="Confirmar" Style="bsPrimaryPositive" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <TWTButton Caption="Editar" Size="bsLarge" />
      <TWTButton Caption="Editar" Size="bsMedium" />
      <TWTButton Caption="Editar" Size="bsSmall" />
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
