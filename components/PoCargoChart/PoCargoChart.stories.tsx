import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoCargoChart } from './PoCargoChart';

const mappingDocs = `
Preview do **Cargo Chart** com os tokens do Design System V&D.

**Origem do design:** PDF \`Componentespdf/charts.pdf\`, página
"Cargo Chart ✅". Card com título + label, linhas com ícone de caminhão +
barra de ocupação (%) + label, link de ação no rodapé. Cobre também o
"Progress Truck" citado na lista original de componentes — mesmo padrão
visual, nomes diferentes.

### Divergência real — registrada, não resolvida

**Não é um componente \`po-*\`.** A doc do Figma descreve como
**Composition** ("Section Header opcional + Truck Progress Bar +
Action/Button"), específico de cenários de logística/transporte. Sem
equivalente \`po-*\`. O ícone de caminhão foi recriado como SVG inline
simplificado — não é o asset original exportado.

Cor por faixa de ocupação, confirmada no PDF: 100% = \`feedback/success\`,
60-80% = \`feedback/informative\`, 20-40% = \`feedback/warning\`, 0% =
\`surface/container\` (cinza/vazio).

**Doc PO-UI:** https://po-ui.io — não há uma página específica pra este componente (composição própria, sem \`po-*\` direto).
`;

const items = [
  { label: 'Label Truck 1', value: 100 },
  { label: 'Label Truck 2', value: 60 },
  { label: 'Label Truck 3', value: 20 },
];

const meta = {
  title: 'Componentes/POUi/Charts/Cargo Chart',
  component: PoCargoChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  args: {
    title: 'Title Text',
    label: 'Label',
    items,
    footerLabel: 'Label',
  },
} satisfies Meta<typeof PoCargoChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllStatuses: Story = {
  name: 'Todas as faixas de ocupação',
  args: {
    items: [
      { label: '100%', value: 100 },
      { label: '80%', value: 80 },
      { label: '60%', value: 60 },
      { label: '40%', value: 40 },
      { label: '20%', value: 20 },
      { label: '0%', value: 0 },
    ],
  },
};
