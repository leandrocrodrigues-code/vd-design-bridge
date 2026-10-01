import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TWTCard } from './Card';

const componentDocs = `
Representação visual do **TWTCard** da biblioteca Delphi
(\`documentacaotdneng/Cards .pdf\`, https://tdn.totvs.com/display/DGP/Card).

> "O Componente Card exibe o conteúdo configurável de maneira semelhante a
> uma carta de baralho." — descrição oficial do TDN.

**Classe:** \`TWTCard\` — **Herança:** \`TCustomControl\`

Os nomes \`Cor\`, \`Titulo\`, \`Descricao\`, \`ManterSelecao\`, \`Valor\`,
\`ValorMaximo\`, \`ExibeBarra\` e \`OnClick\` seguem o contrato nativo do
Delphi, confirmado no PDF. \`Icone\`/\`IconeSelecionado\` no Delphi
referenciam um índice de \`ImageList\`; aqui viram um \`ReactNode\` só para
fins de documentação visual. \`PreviewState\` existe apenas para inspeção
no Storybook.

**Regra de fidelidade:** o **Figma é a fonte da verdade visual**, sempre.
O PDF do TDN documenta o contrato de propriedades do componente nativo
Delphi (\`TWTCard\`, nomes e tipos reais); o Figma documenta como o
Design System V&D está modernizando o visual desse componente. Quando os
dois divergem, o Figma vence — não é uma pendência para o time de design
decidir depois, é a regra de trabalho deste catálogo.

Geometria, espaçamentos e cores (avatar 32px, barra de 4px, tipografia
overline + label) confirmados via Figma MCP no componente **Card Status**
(também rotulado "Card Template" internamente) do arquivo \`MCP Design
System V&D — UI KIT Desktop\`
([node 11959:4835](https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=11959-4835)
Default, [node 11959:4990](https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=11959-4990)
Active).

### Divergências reais (não inventadas)

- **\`Anchors\` (TAnchors)** não tem representação visual aqui — é ancoragem
  de layout com o container pai, fora do escopo de uma preview isolada.
- O PDF não documenta uma propriedade \`Enabled\`; o valor \`tcDesabilitado\`
  do próprio \`Cor\` é o mecanismo documentado para o visual desabilitado.
  O Figma não tem um tipo "Desabilitado" equivalente — usamos o tipo mais
  próximo (\`Neutral\`, cinza) como referência de tom, não um recorte 1:1.
- **Seleção (\`ManterSelecao\`):** o PDF do TDN (visual legado do Delphi)
  mostra, ao clicar, o card inteiro preenchendo com a cor pura sólida e o
  texto virando branco. O componente atual no Figma ("Card Status",
  variante Active) já modernizou esse estado para um tratamento mais
  sutil — fundo levemente tintado (\`.../card\`) + borda de 1px na cor
  pura, sem preencher o card inteiro nem trocar a cor do texto. Por regra
  de fidelidade ao Figma, é isso que está implementado aqui; o
  preenchimento sólido do PDF é só o registro histórico de como o
  componente nativo Delphi ainda renderiza esse estado.
`;

const meta = {
  title: 'Componentes/Delphi/Card',
  component: TWTCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: componentDocs } },
  },
  argTypes: {
    Titulo: { control: 'text', description: 'Texto do título do Card.' },
    Descricao: { control: 'text', description: 'Texto da descrição do Card.' },
    Cor: {
      control: 'select',
      options: ['tcAzul', 'tcVerde', 'tcLaranja', 'tcVermelho', 'tcDesabilitado'],
      description: 'Propriedade Cor: TCardColor.',
    },
    ManterSelecao: { control: 'boolean', description: 'Mantém o Card selecionado após o clique.' },
    Valor: { control: 'number', description: 'Valor atual usado para calcular o progresso.' },
    ValorMaximo: { control: 'number', description: 'Valor que representa 100% do progresso.' },
    ExibeBarra: { control: 'boolean', description: 'Exibe a barra de progresso (padrão: exibir).' },
    PreviewState: { control: 'select', options: ['Default', 'Hover', 'Focus'], description: 'Apenas para inspeção visual no Storybook.' },
    Icone: { control: false },
    IconeSelecionado: { control: false },
    OnClick: { action: 'OnClick' },
  },
  args: {
    Titulo: 'Overline',
    Descricao: 'Label Text',
    Cor: 'tcAzul',
    ManterSelecao: false,
    Valor: 50,
    ValorMaximo: 100,
    ExibeBarra: true,
    PreviewState: 'Default',
    OnClick: fn(),
  },
} satisfies Meta<typeof TWTCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Cores: Story = {
  name: 'Cores (TCardColor)',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <TWTCard Titulo="Overline" Descricao="Card azul" Cor="tcAzul" Valor={65} />
      <TWTCard Titulo="Overline" Descricao="Card verde" Cor="tcVerde" Valor={65} />
      <TWTCard Titulo="Overline" Descricao="Card laranja" Cor="tcLaranja" Valor={65} />
      <TWTCard Titulo="Overline" Descricao="Card vermelho" Cor="tcVermelho" Valor={65} />
      <TWTCard Titulo="Overline" Descricao="Card desabilitado" Cor="tcDesabilitado" Valor={65} />
    </div>
  ),
};

export const Selecionado: Story = {
  name: 'Selecionado (ManterSelecao)',
  parameters: {
    docs: {
      description: {
        story: 'Clique no card para alternar o estado selecionado — só ocorre quando `ManterSelecao` é `true`. Visual conforme o Figma (fundo tintado + borda); ver nota de divergência com o PDF acima.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <TWTCard Titulo="Overline" Descricao="Clique para selecionar" Cor="tcAzul" Valor={65} ManterSelecao />
      <TWTCard Titulo="Overline" Descricao="Clique para selecionar" Cor="tcVerde" Valor={40} ManterSelecao />
    </div>
  ),
};

export const SemBarra: Story = {
  name: 'ExibeBarra = false',
  args: { ExibeBarra: false, Descricao: 'Card sem barra de progresso' },
};

export const Progresso: Story = {
  name: 'Progresso (Valor / ValorMaximo)',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <TWTCard Titulo="Overline" Descricao="20%" Cor="tcAzul" Valor={20} ValorMaximo={100} />
      <TWTCard Titulo="Overline" Descricao="50%" Cor="tcAzul" Valor={50} ValorMaximo={100} />
      <TWTCard Titulo="Overline" Descricao="90%" Cor="tcAzul" Valor={90} ValorMaximo={100} />
    </div>
  ),
};
