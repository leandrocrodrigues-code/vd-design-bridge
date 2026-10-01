import type { Meta, StoryObj } from '@storybook/react-vite';
import { TWTCardValue } from './CardValue';

const componentDocs = `
**TWTCardValue** — sem equivalente no PDF do TDN. Nasce da modernização do
Design System V&D, componente **Card Value** do Figma
([node 12102:23113](https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=12102-23113)).

O prefixo \`TWT\` antecipa o nome que o time Delphi provavelmente vai usar
ao criar essa classe — é uma **proposta de contrato**, não um nome
confirmado pela documentação TDN.

**Regra de fidelidade:** o Figma é a fonte da verdade visual, sempre.
`;

const meta = {
  title: 'Componentes/Delphi/CardValue',
  component: TWTCardValue,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: componentDocs } },
  },
  args: {
    Titulo: 'Overline',
    Valor: 'R$ 9.999,99',
    TagTexto: 'Label Tag',
    ValorSecundarioTitulo: 'Overline',
    ValorSecundario: 'R$ 9.999,99',
  },
} satisfies Meta<typeof TWTCardValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
