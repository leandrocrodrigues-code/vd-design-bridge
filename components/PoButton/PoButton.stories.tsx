import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { PoButton } from './PoButton';

const meta = {
  title: 'Components/PoButton',
  component: PoButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Representação visual do **po-button** da [PO-UI](https://po-ui.io/documentation/po-button), usando os tokens deste design system. Os nomes \`kind\`, \`size\`, \`type\`, \`icon\`, \`danger\`, \`disabled\`, \`loading\` e \`onClick\` seguem o contrato nativo (equivalentes a \`p-kind\`, \`p-size\`, \`p-type\`, \`p-icon\`, \`p-danger\`, \`p-disabled\`, \`p-loading\` e \`(p-click)\`). \`previewState\` existe só pra documentação/inspeção no Storybook.`,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'p-label: texto do botão.' },
    kind: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'p-kind: primary (destaque), secondary (padrão) ou tertiary (sem preenchimento).',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'p-size: small (32px, só com AA), medium (44px) ou large (56px).',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'p-type: comportamento dentro de um <form>.',
    },
    danger: { control: 'boolean', description: 'p-danger: ações irreversíveis. Desativa "tertiary".' },
    disabled: { control: 'boolean', description: 'p-disabled' },
    loading: { control: 'boolean', description: 'p-loading: spinner + desabilita o botão.' },
    icon: { control: false, description: 'p-icon: classe de ícone (string) ou ReactNode customizado.' },
    previewState: {
      control: 'select',
      options: [undefined, 'Default', 'Hover', 'Pressed', 'Focus'],
      description: 'Apenas para inspeção visual no Storybook.',
    },
    onClick: { action: 'p-click' },
  },
  args: {
    label: 'PO button',
    kind: 'secondary',
    size: 'medium',
    type: 'button',
    danger: false,
    disabled: false,
    loading: false,
    onClick: fn(),
  },
} satisfies Meta<typeof PoButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Kinds: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <PoButton label="Primary" kind="primary" />
      <PoButton label="Secondary" kind="secondary" />
      <PoButton label="Tertiary" kind="tertiary" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <PoButton label="Small" size="small" />
      <PoButton label="Medium" size="medium" />
      <PoButton label="Large" size="large" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="grid grid-cols-2 items-center gap-3 sm:grid-cols-4">
      <PoButton label="Default" previewState="Default" />
      <PoButton label="Hover" previewState="Hover" />
      <PoButton label="Pressed" previewState="Pressed" />
      <PoButton label="Disabled" disabled />
    </div>
  ),
};

export const Danger: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <PoButton label="Excluir" kind="primary" danger />
      <PoButton label="Excluir" kind="secondary" danger />
      <PoButton label="Excluir" kind="tertiary" danger />
    </div>
  ),
};

export const Loading: Story = {
  args: { label: 'Salvando', loading: true },
};

export const WithIcon: Story = {
  args: { label: 'Adicionar', icon: '✚' },
};

export const IconOnly: Story = {
  args: { label: undefined, icon: '⧉', ariaLabel: 'Copiar' },
};
