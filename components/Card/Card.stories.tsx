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
Delphi. \`Icone\`/\`IconeSelecionado\` no Delphi referenciam um índice de
\`ImageList\`; aqui viram um \`ReactNode\` só para fins de documentação visual.
\`PreviewState\` existe apenas para inspeção no Storybook.

### Divergências reais (não inventadas)

- **\`Anchors\` (TAnchors)** não tem representação visual aqui — é ancoragem
  de layout com o container pai, fora do escopo de uma preview isolada.
- O demo visual do PDF rotula o exemplo de \`tcLaranja\` como "card amarelo",
  mas o nome do enum documentado é \`tcLaranja\`. Usamos o enum real.
- O PDF não documenta uma propriedade \`Enabled\`; o valor \`tcDesabilitado\`
  do próprio \`Cor\` é o mecanismo documentado para o visual desabilitado.
- **Seleção (\`ManterSelecao\`):** ao clicar, o card inteiro preenche com a
  cor pura, texto e ícone viram brancos e a barra de progresso também fica
  branca — comportamento confirmado visualmente nas páginas de exemplo do PDF.
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
    Titulo: 'Titulo',
    Descricao: 'Descricao',
    Cor: 'tcAzul',
    ManterSelecao: false,
    Valor: 65,
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
      <TWTCard Titulo="Titulo" Descricao="Card azul" Cor="tcAzul" Valor={65} />
      <TWTCard Titulo="Titulo" Descricao="Card verde" Cor="tcVerde" Valor={65} />
      <TWTCard Titulo="Titulo" Descricao="Card laranja" Cor="tcLaranja" Valor={65} />
      <TWTCard Titulo="Titulo" Descricao="Card vermelho" Cor="tcVermelho" Valor={65} />
      <TWTCard Titulo="Titulo" Descricao="Card desabilitado" Cor="tcDesabilitado" Valor={65} />
    </div>
  ),
};

export const Selecionado: Story = {
  name: 'Selecionado (ManterSelecao)',
  parameters: {
    docs: {
      description: {
        story: 'Clique no card para alternar o estado selecionado — só ocorre quando `ManterSelecao` é `true`.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <TWTCard Titulo="Titulo" Descricao="Clique para selecionar" Cor="tcAzul" Valor={65} ManterSelecao />
      <TWTCard Titulo="Titulo" Descricao="Clique para selecionar" Cor="tcVerde" Valor={40} ManterSelecao />
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
      <TWTCard Titulo="Titulo" Descricao="20%" Cor="tcAzul" Valor={20} ValorMaximo={100} />
      <TWTCard Titulo="Titulo" Descricao="50%" Cor="tcAzul" Valor={50} ValorMaximo={100} />
      <TWTCard Titulo="Titulo" Descricao="90%" Cor="tcAzul" Valor={90} ValorMaximo={100} />
    </div>
  ),
};
