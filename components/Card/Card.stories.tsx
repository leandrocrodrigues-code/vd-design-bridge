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
Delphi, confirmado no PDF (essa é a variante \`Variante="Status"\`, a
padrão). \`Icone\`/\`IconeSelecionado\` no Delphi referenciam um índice de
\`ImageList\`; aqui viram um \`ReactNode\` só para fins de documentação
visual. \`PreviewState\` existe apenas para inspeção no Storybook.

### TWTCard é um componente pai com variantes internas

O Figma modernizou a família "Card" do Design System V&D em várias
composições visuais (Data, Invoice, Value, Dashboard, Copy, Uploader,
Loading, List Item) além da Status/Template original. Nenhuma delas tem
classe Delphi documentada no TDN — só a variante **Status** é o
\`TWTCard\` real. Ainda assim, elas **não são componentes separados**: são
todas filhas de \`TWTCard\`, selecionadas pela prop \`Variante\`. O prefixo
\`TWT\` nas demais antecipa o nome que o time Delphi provavelmente vai usar
quando criar as classes nativas — proposta de contrato, não confirmada
pela documentação TDN.

**Regra de fidelidade:** o **Figma é a fonte da verdade visual**, sempre.
O PDF do TDN documenta o contrato de propriedades do componente nativo
Delphi (variante Status); o Figma documenta como o Design System V&D está
modernizando o visual de toda a família Card. Quando os dois divergem, o
Figma vence.

Geometria, espaçamentos e cores confirmados via Figma MCP no arquivo
\`MCP Design System V&D — UI KIT Desktop\`, canvas "Cards ✅"
([node 8392:31031](https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=8392-31031)):
Status (node 11959:4835), Data (node 11961:20618), Invoice (node
11961:36248), Value (node 12102:23113), Dashboard (node 12109:8231), Copy
(node 12128:9392), Uploader (node 12132:8784), Loading (node 12136:9161),
List Item (node 12136:22236).

### Divergências reais (não inventadas)

- **\`Anchors\` (TAnchors)** não tem representação visual aqui — é ancoragem
  de layout com o container pai, fora do escopo de uma preview isolada.
- O PDF não documenta uma propriedade \`Enabled\`; o valor \`tcDesabilitado\`
  do próprio \`Cor\` (variante Status) é o mecanismo documentado para o
  visual desabilitado. O Figma não tem um tipo "Desabilitado" equivalente
  — usamos o tipo mais próximo (\`Neutral\`, cinza) como referência de tom.
- **Seleção (\`ManterSelecao\`, variante Status):** o PDF do TDN (visual
  legado do Delphi) mostra, ao clicar, o card inteiro preenchendo com a
  cor pura sólida e o texto virando branco. O componente atual no Figma
  ("Card Status", variante Active) já modernizou esse estado para um
  tratamento mais sutil — fundo levemente tintado + borda de 1px na cor
  pura, sem preencher o card inteiro. Por regra de fidelidade ao Figma, é
  isso que está implementado aqui.
- **Uploader (estado "Uploading"):** a barra de progresso foi inferida do
  padrão visual já confirmado na variante Loading (mesma família, mesma
  barra de 4px) — não é uma leitura 1:1 desse node específico do Figma.
- O estado "Uploaded List" do Figma (lista de arquivos já enviados, na
  variante Uploader) não foi lido em detalhe — fica como próximo passo
  quando houver mais referências que o usem.
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
    Titulo: { control: 'text', description: 'Texto do título do Card (variante Status).' },
    Descricao: { control: 'text', description: 'Texto da descrição do Card (variante Status).' },
    Cor: {
      control: 'select',
      options: ['tcAzul', 'tcVerde', 'tcLaranja', 'tcVermelho', 'tcDesabilitado'],
      description: 'Propriedade Cor: TCardColor (variante Status).',
    },
    ManterSelecao: { control: 'boolean', description: 'Mantém o Card selecionado após o clique (variante Status).' },
    Valor: { control: 'number', description: 'Valor atual usado para calcular o progresso (variante Status).' },
    ValorMaximo: { control: 'number', description: 'Valor que representa 100% do progresso (variante Status).' },
    ExibeBarra: { control: 'boolean', description: 'Exibe a barra de progresso (variante Status, padrão: exibir).' },
    PreviewState: { control: 'select', options: ['Default', 'Hover', 'Focus'], description: 'Apenas para inspeção visual no Storybook (variante Status).' },
    Icone: { control: false },
    IconeSelecionado: { control: false },
    OnClick: { action: 'OnClick' },
  },
  args: {
    Variante: 'Status',
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

export const Playground: Story = {
  name: 'Status (padrão, TWTCard real)',
};

export const StatusCores: Story = {
  name: 'Status — Cores (TCardColor)',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <TWTCard Variante="Status" Titulo="Overline" Descricao="Card azul" Cor="tcAzul" Valor={65} />
      <TWTCard Variante="Status" Titulo="Overline" Descricao="Card verde" Cor="tcVerde" Valor={65} />
      <TWTCard Variante="Status" Titulo="Overline" Descricao="Card laranja" Cor="tcLaranja" Valor={65} />
      <TWTCard Variante="Status" Titulo="Overline" Descricao="Card vermelho" Cor="tcVermelho" Valor={65} />
      <TWTCard Variante="Status" Titulo="Overline" Descricao="Card desabilitado" Cor="tcDesabilitado" Valor={65} />
    </div>
  ),
};

export const StatusSelecionado: Story = {
  name: 'Status — Selecionado (ManterSelecao)',
  parameters: {
    docs: {
      description: {
        story: 'Clique no card para alternar o estado selecionado — só ocorre quando `ManterSelecao` é `true`. Visual conforme o Figma (fundo tintado + borda); ver nota de divergência com o PDF acima.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <TWTCard Variante="Status" Titulo="Overline" Descricao="Clique para selecionar" Cor="tcAzul" Valor={65} ManterSelecao />
      <TWTCard Variante="Status" Titulo="Overline" Descricao="Clique para selecionar" Cor="tcVerde" Valor={40} ManterSelecao />
    </div>
  ),
};

export const StatusSemBarra: Story = {
  name: 'Status — ExibeBarra = false',
  args: { ExibeBarra: false, Descricao: 'Card sem barra de progresso' },
};

export const StatusProgresso: Story = {
  name: 'Status — Progresso (Valor / ValorMaximo)',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <TWTCard Variante="Status" Titulo="Overline" Descricao="20%" Cor="tcAzul" Valor={20} ValorMaximo={100} />
      <TWTCard Variante="Status" Titulo="Overline" Descricao="50%" Cor="tcAzul" Valor={50} ValorMaximo={100} />
      <TWTCard Variante="Status" Titulo="Overline" Descricao="90%" Cor="tcAzul" Valor={90} ValorMaximo={100} />
    </div>
  ),
};

export const Data: Story = {
  name: 'Data',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <TWTCard Variante="Data" Titulo="Overline" Valor="R$ 9.999,99" Cor="tcAzul" TagTexto="+12%" />
      <TWTCard Variante="Data" Titulo="Overline" Valor="R$ 9.999,99" Cor="tcVerde" TagTexto="+12%" Destacado />
      <TWTCard Variante="Data" Titulo="Overline" Valor="R$ 9.999,99" Cor="tcMarca" TagTexto="Novo" Destacado />
    </div>
  ),
};

export const Invoice: Story = {
  name: 'Invoice',
  render: () => (
    <TWTCard
      Variante="Invoice"
      Cor="tcAzul"
      TagTexto="Nota Fiscal"
      Itens={[
        { Titulo: 'Número', Valor: '000.123.456' },
        { Titulo: 'Valor total', Valor: 'R$ 1.234,56' },
      ]}
    />
  ),
};

export const Value: Story = {
  name: 'Value',
  render: () => <TWTCard Variante="Value" Titulo="Overline" Valor="R$ 9.999,99" TagTexto="Label Tag" ValorSecundarioTitulo="Overline" ValorSecundario="R$ 9.999,99" />,
};

export const Dashboard: Story = {
  name: 'Dashboard',
  render: () => <TWTCard Variante="Dashboard" Titulo="Label Text" Valor="R$ 99.999,99" TagTexto="+99%" TextoSuporteDestaque="+R$ 99.999,99" TextoSuporte="Supporting Text" />,
};

export const Copy: Story = {
  name: 'Copy',
  render: () => <TWTCard Variante="Copy" Titulo="Overline" Valor="999999" BotaoTexto="Copiar" OnCopiar={fn()} />,
};

export const Uploader: Story = {
  name: 'Uploader — Estados',
  render: () => (
    <div className="flex flex-col gap-3">
      <TWTCard Variante="Uploader" Estado="Default" OnEscolherArquivo={fn()} />
      <TWTCard Variante="Uploader" Estado="Uploading" Titulo="enviando-arquivo.pdf" Subtitulo="4 minutos restantes" />
      <TWTCard Variante="Uploader" Estado="Alert" Titulo="Falha ao enviar arquivo" Subtitulo="Tente novamente" />
    </div>
  ),
};

export const Loading: Story = {
  name: 'Loading',
  render: () => <TWTCard Variante="Loading" Titulo="Atualizando..." Subtitulo="4 minutos restantes" Valor={50} OnCancelar={fn()} />,
};

export const ListItem: Story = {
  name: 'List Item',
  render: () => <TWTCard Variante="ListItem" Primario="Texto primário" Secundario="Texto secundário" TagTexto="Tag" />,
};
