import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TWTCardCopy } from './CardCopy';

const componentDocs = `
**TWTCardCopy** — sem equivalente no PDF do TDN. Nasce da modernização do
Design System V&D, componente **Card Copy** do Figma
([node 12128:9392](https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=12128-9392)).

O prefixo \`TWT\` antecipa o nome que o time Delphi provavelmente vai usar
ao criar essa classe — é uma **proposta de contrato**, não um nome
confirmado pela documentação TDN.

**Regra de fidelidade:** o Figma é a fonte da verdade visual, sempre.
`;

const meta = {
  title: 'Componentes/Delphi/CardCopy',
  component: TWTCardCopy,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: componentDocs } },
  },
  argTypes: { OnCopiar: { action: 'OnCopiar' } },
  args: {
    Titulo: 'Overline',
    Valor: '999999',
    BotaoTexto: 'Copiar',
    OnCopiar: fn(),
  },
} satisfies Meta<typeof TWTCardCopy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
