import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoBarChart } from './PoBarChart';

const mappingDocs = `
Preview do **Bar Chart** com os tokens do Design System V&D.

**Origem do design:** PDF \`Componentespdf/charts.pdf\` (extraído do Figma
pelo usuário — o node original travava a leitura via MCP), página
"Bar Chart ✅". Card com título + label, barras (verticais ou
horizontais) por categoria, valor numérico e legenda por cor.

### Divergência real — registrada, não resolvida

**Não é um componente \`po-*\`.** A doc do Figma descreve "Bar Chart" como
**Composition** ("Section Header + Progress Bar + Button"), renderizado
na implementação real via **Echarts** (echarts.apache.org) — não existe
\`po-chart\`. Este preview cobre só a variante "single value" (1 valor por
categoria) — não implementa a variante empilhada (stacked, múltiplas
séries por barra) que também aparece no PDF.

Paleta: 5 cores confirmadas visualmente no PDF (Color 01-05), mapeadas
pros tokens de feedback existentes (\`--vd-color-feedback-*\`) + brand
pure. O doc menciona 14 cores de gráfico no total ("incluindo as
definidas para feedback") — as 9 restantes não foram confirmadas.

**Doc PO-UI:** https://po-ui.io — não há uma página específica pra este componente (composição própria, sem \`po-*\` direto).
`;

const items = [
  { label: 'Txt 1', value: 42 },
  { label: 'Txt 2', value: 68 },
  { label: 'Txt 3', value: 55 },
  { label: 'Txt 4', value: 30 },
  { label: 'Txt 5', value: 20 },
];

const meta = {
  title: 'POUi/Charts/Bar Chart',
  component: PoBarChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
  },
  args: {
    title: 'Title Text',
    label: 'Label',
    orientation: 'vertical',
    items,
  },
} satisfies Meta<typeof PoBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
};
