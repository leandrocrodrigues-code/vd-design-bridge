import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoCardData } from './PoCardData';

const mappingDocs = `
Preview do **Card Data** com os tokens do Design System V&D.

**Origem do design:** PDF \`Componentespdf/Card Data.pdf\`. Pílula com dot
colorido + Overline/Label + valor com indicador de tendência (seta pra
cima/baixo). 5 tonalidades × 2 níveis de ênfase.

**Não é um componente \`po-*\`** — sem equivalente na PO-UI.

**Doc PO-UI:** https://po-ui.io — não há uma página específica pra este componente (composição própria, sem \`po-*\` direto).
`;

const meta = {
  title: 'POUi/Cards/Data',
  component: PoCardData,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  argTypes: {
    tone: { control: 'select', options: ['informative', 'brand', 'success', 'warning', 'alert'] },
    emphasis: { control: 'select', options: ['subtle', 'tint'] },
    trend: { control: 'select', options: ['up', 'down', 'none'] },
  },
  args: {
    overline: 'Overline',
    label: 'Label Text',
    value: '100%',
    trend: 'up',
    tone: 'informative',
    emphasis: 'subtle',
  },
} satisfies Meta<typeof PoCardData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllTones: Story = {
  name: 'Todas as tonalidades',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '12px' }}>
      {(['informative', 'brand', 'success', 'warning', 'alert'] as const).flatMap((tone) =>
        (['subtle', 'tint'] as const).map((emphasis) => <PoCardData key={`${tone}-${emphasis}`} tone={tone} emphasis={emphasis} />),
      )}
    </div>
  ),
};
