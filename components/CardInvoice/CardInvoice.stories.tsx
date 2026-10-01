import type { Meta, StoryObj } from '@storybook/react-vite';
import { TWTCardInvoice } from './CardInvoice';

const componentDocs = `
**TWTCardInvoice** — sem equivalente no PDF do TDN. Nasce da modernização
do Design System V&D, componente **Card Invoice** do Figma
([node 11961:36248](https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=11961-36248)).

O prefixo \`TWT\` antecipa o nome que o time Delphi provavelmente vai usar
ao criar essa classe — é uma **proposta de contrato**, não um nome
confirmado pela documentação TDN.

**Regra de fidelidade:** o Figma é a fonte da verdade visual, sempre.
`;

const meta = {
  title: 'Componentes/Delphi/CardInvoice',
  component: TWTCardInvoice,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: componentDocs } },
  },
  argTypes: {
    TagTexto: { control: 'text' },
    Cor: { control: 'select', options: ['tcAzul', 'tcVerde', 'tcLaranja', 'tcVermelho', 'tcMarca'] },
    Destacado: { control: 'boolean', description: 'Variante Highlight=True do Figma.' },
    TagIcone: { control: false },
    Itens: { control: false },
  },
  args: {
    TagTexto: 'Label Tag',
    Cor: 'tcAzul',
    Destacado: false,
  },
} satisfies Meta<typeof TWTCardInvoice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Cores: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <TWTCardInvoice Cor="tcAzul" TagTexto="Informativo" />
      <TWTCardInvoice Cor="tcVerde" TagTexto="Sucesso" />
      <TWTCardInvoice Cor="tcLaranja" TagTexto="Atenção" />
      <TWTCardInvoice Cor="tcVermelho" TagTexto="Alerta" />
      <TWTCardInvoice Cor="tcMarca" TagTexto="Marca" />
    </div>
  ),
};
