import type { Meta, StoryObj } from '@storybook/react-vite';
import { TWTCardData } from './CardData';

const componentDocs = `
**TWTCardData** — sem equivalente no PDF do TDN. Nasce da modernização do
Design System V&D, componente **Card Data** do Figma
([node 11961:20618](https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=11961-20618)
Highlight=False,
[node 11961:20663](https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=11961-20663)
Highlight=True).

O prefixo \`TWT\` antecipa o nome que o time Delphi provavelmente vai usar
ao criar essa classe — é uma **proposta de contrato**, não um nome
confirmado pela documentação TDN (que ainda não existe para este
componente).

**Regra de fidelidade:** o Figma é a fonte da verdade visual, sempre.
`;

const meta = {
  title: 'Componentes/Delphi/CardData',
  component: TWTCardData,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: componentDocs } },
  },
  argTypes: {
    Titulo: { control: 'text' },
    Valor: { control: 'text' },
    TagTexto: { control: 'text' },
    Cor: { control: 'select', options: ['tcAzul', 'tcVerde', 'tcLaranja', 'tcVermelho', 'tcMarca'] },
    Destacado: { control: 'boolean', description: 'Variante Highlight=True do Figma.' },
    Icone: { control: false },
    TagIcone: { control: false },
  },
  args: {
    Titulo: 'Overline',
    Valor: 'Label Text',
    TagTexto: '100%',
    Cor: 'tcAzul',
    Destacado: false,
  },
} satisfies Meta<typeof TWTCardData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Cores: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <TWTCardData Cor="tcAzul" Destacado />
      <TWTCardData Cor="tcVerde" Destacado />
      <TWTCardData Cor="tcLaranja" Destacado />
      <TWTCardData Cor="tcVermelho" Destacado />
      <TWTCardData Cor="tcMarca" Destacado />
    </div>
  ),
};

export const DestacadoOffVsOn: Story = {
  name: 'Destacado: false vs true',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <TWTCardData Cor="tcVerde" Destacado={false} />
      <TWTCardData Cor="tcVerde" Destacado />
    </div>
  ),
};
