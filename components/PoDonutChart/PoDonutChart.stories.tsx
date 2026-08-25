import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoDonutChart } from './PoDonutChart';

const mappingDocs = `
Preview do **Donut Chart** com os tokens do Design System V&D.

**Origem do design:** PDF \`Componentespdf/charts.pdf\`, página
"Donut Chart ✅". Card com título + label, anel colorido por categoria,
total + legenda no centro, legenda por cor abaixo.

### Divergência real — registrada, não resolvida

**Não é um componente \`po-*\`.** Assim como o Bar Chart, é uma
**Composition** renderizada na implementação real via **Echarts**.
Implementado aqui com \`conic-gradient\` (aproximação visual em CSS puro,
não SVG/canvas real — sem animação de entrada nem tooltip por fatia).

Mesma paleta de 5 cores do Bar Chart (Color 01-05 → tokens de feedback +
brand pure).

**Doc PO-UI:** https://po-ui.io — não há uma página específica pra este componente (composição própria, sem \`po-*\` direto).
`;

const items = [
  { label: 'Color 01', value: 40 },
  { label: 'Color 02', value: 25 },
  { label: 'Color 03', value: 15 },
  { label: 'Color 04', value: 12 },
  { label: 'Color 05', value: 8 },
];

const meta = {
  title: 'Componentes/POUi/Charts/Donut Chart',
  component: PoDonutChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  args: {
    title: 'Title Text',
    label: 'Label',
    caption: 'Caption',
    items,
  },
} satisfies Meta<typeof PoDonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
