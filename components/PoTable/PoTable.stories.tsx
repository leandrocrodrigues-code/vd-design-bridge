import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoTable } from './PoTable';

const mappingDocs = `
Preview do **po-table** da PO-UI com os tokens do Design System V&D.

**Origem do design:** Figma \`MCP Design System V&D — UI KIT Desktop\`,
frame \`Table (Grid)\` (node \`5321:52444\`), página "Table (Grid) ✅".
Variante lida via design context: \`Scroll=No Scroll\` (node \`11485:77009\`).
As outras 4 variantes de scroll (\`Vertical\`, \`Horizontal\`, \`Both
Directions\`, \`Stick Actions\`) e os frames \`Cells/Header\`,
\`Cells/Content\`, \`Cells/Action\` não foram lidas nó a nó — o padrão
visual (header cinza + linha branca + borda inferior) já ficou claro na
variante lida.

**Doc oficial:** https://po-ui.io/documentation/po-table

### Divergência real, registrada — não implementada

A PO-UI real (\`po-table\`) tem uma API bem mais extensa:
\`selectable\`, \`virtualScroll\`, \`height\` (scroll fixo com header sticky),
\`hideTableSearch\`, \`hideColumnsManager\`, expansão de linha
(\`expanded\`/\`collapsed\`), múltiplas \`actions\` por linha com dropdown.
Este preview cobre só o que a variante \`No Scroll\` do Figma mostra:
cabeçalho ordenável (clique dispara \`onSortBy\`), linhas de conteúdo,
\`striped\` opcional, e uma coluna de ações simplificada (ícone de pilha +
botão kebab que dispara a primeira \`action\` da lista).

### Mapeamento Figma → PO-UI

| Figma | PO-UI | Observação |
|---|---|---|
| \`Cells/Header\` (Label + CaretDown) | \`p-columns\` + \`p-sort\` | clique no header dispara \`(sortBy)\` |
| \`Cells/Content\` Type=Label Text | \`item[column.property]\` | célula de texto simples |
| \`Cells/Content\` Type=Value Text (R) | coluna com \`align: 'right'\` | equivalente aproximado, sem \`type\` formal no \`PoTableColumn\` |
| \`Cells/Action\` (Stack + DotsThreeVertical) | \`p-actions\` | aqui simplificado — só 1 ação via kebab, sem dropdown |
| \`Cells/Content\` Type=Tag | — | não implementado — precisaria combinar com \`PoTag\` já existente |
`;

const columns = [
  { label: 'Produto', key: 'produto' },
  { label: 'Categoria', key: 'categoria' },
  { label: 'Status', key: 'status' },
  { label: 'Estoque', key: 'estoque', align: 'right' as const },
];

const items = [
  { produto: 'Camiseta básica', categoria: 'Vestuário', status: 'Ativo', estoque: '120' },
  { produto: 'Caneca cerâmica', categoria: 'Casa', status: 'Ativo', estoque: '48' },
  { produto: 'Mochila urbana', categoria: 'Acessórios', status: 'Inativo', estoque: '0' },
  { produto: 'Fone bluetooth', categoria: 'Eletrônicos', status: 'Ativo', estoque: '15' },
  { produto: 'Garrafa térmica', categoria: 'Casa', status: 'Ativo', estoque: '73' },
];

const meta = {
  title: 'Componentes/POUi/Table (Grid)',
  component: PoTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: mappingDocs } },
  },
  argTypes: {
    striped: { control: 'boolean', description: 'p-striped' },
    sort: { control: 'boolean', description: 'p-sort' },
  },
  args: {
    columns,
    items,
    striped: false,
    sort: true,
  },
} satisfies Meta<typeof PoTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const angular = (code: string) => ({ docs: { source: { code, language: 'html' } } });

export const Playground: Story = {
  parameters: angular(`<po-table
  [p-columns]="columns"
  [p-items]="items"
  p-sort
  (p-sort-by)="onSortBy($event)">
</po-table>`),
};

export const Striped: Story = {
  args: { striped: true },
  parameters: angular(`<po-table [p-columns]="columns" [p-items]="items" p-striped></po-table>`),
};

export const WithActions: Story = {
  name: 'Com ações (kebab)',
  args: {
    actions: [{ label: 'Editar', onClick: (item) => alert(`Editar: ${item.produto}`) }],
  },
  parameters: angular(`<po-table
  [p-columns]="columns"
  [p-items]="items"
  [p-actions]="[{ label: 'Editar', action: onEdit }]">
</po-table>`),
};
