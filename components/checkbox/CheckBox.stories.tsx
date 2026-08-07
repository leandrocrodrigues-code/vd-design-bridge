import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TWTCheckBox } from './CheckBox';

const meta = {
  title: 'Components/Checkbox',
  component: TWTCheckBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Representação visual do **TWTCheckBox**. \`Caption\`, \`HelpTextLabel\`, \`Checked\` e \`OnClick\` refletem o contrato Delphi. \`Errored\` e \`ErrorMessage\` demonstram os métodos de erro; \`PreviewState\` serve apenas para a documentação.`,
      },
    },
  },
  argTypes: {
    Caption: { control: 'text', description: 'Caption herdada de TCheckBox.' },
    HelpTextLabel: { control: 'text', description: 'Conteúdo visual de HelpTextLabel.' },
    Checked: { control: 'boolean', description: 'Estado marcado.' },
    Indeterminate: { control: 'boolean', description: 'Estado parcial para grupos.' },
    Enabled: { control: 'boolean', description: 'Propriedade Enabled herdada.' },
    Size: { control: 'select', options: ['SM', 'MD'] },
    Errored: { control: 'boolean', description: 'Representa o retorno de Errored.' },
    ErrorMessage: { control: 'text', description: 'Mensagem atribuída por ErrorMessage.' },
    PreviewState: { control: 'select', options: ['Default', 'Hover', 'Focus', 'Disabled'] },
    OnClick: { action: 'OnClick' },
  },
  args: {
    Caption: 'Maçã',
    HelpTextLabel: 'Rica em frutose.',
    Size: 'MD',
    Enabled: true,
    PreviewState: 'Default',
    OnClick: fn(),
  },
} satisfies Meta<typeof TWTCheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-start gap-8">
      <TWTCheckBox Caption="Opção pequena" HelpTextLabel="Ideal para tabelas" Size="SM" />
      <TWTCheckBox Caption="Opção média" HelpTextLabel="Ideal para cadastros" Size="MD" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-4">
      <TWTCheckBox Caption="Default" />
      <TWTCheckBox Caption="Hover" PreviewState="Hover" />
      <TWTCheckBox Caption="Focus" PreviewState="Focus" />
      <TWTCheckBox Caption="Disabled" Enabled={false} />
      <TWTCheckBox Caption="Marcado" Checked />
      <TWTCheckBox Caption="Marcado" Checked PreviewState="Hover" />
      <TWTCheckBox Caption="Marcado" Checked PreviewState="Focus" />
      <TWTCheckBox Caption="Marcado" Checked Enabled={false} />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: { Caption: undefined, HelpTextLabel: undefined, 'aria-label': 'Selecionar opção' },
};

export const Indeterminate: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <TWTCheckBox Caption="Frutas" Indeterminate />
      <div className="ml-8 flex flex-col gap-2">
        <TWTCheckBox Caption="Maçã" Checked Size="SM" />
        <TWTCheckBox Caption="Banana" Checked Size="SM" />
        <TWTCheckBox Caption="Melancia" Size="SM" />
      </div>
    </div>
  ),
};

export const Error: Story = {
  args: { Caption: 'Aceito os termos', Errored: true, ErrorMessage: 'Selecione esta opção para continuar.' },
};
