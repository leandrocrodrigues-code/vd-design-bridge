import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoCardStatus } from './PoCardStatus';

const mappingDocs = `
Preview do **Card Status** com os tokens do Design System V&D.

**Origem do design:** PDF \`Componentespdf/Card Status.pdf\` (extraído do
Figma pelo usuário). Ícone + Overline/Label + Progress Bar, em 6
tonalidades × 3 níveis de ênfase (subtle/tint/selected).

### Divergência real — registrada, não resolvida

**Não é um componente \`po-*\`.** Sem \`po-card\` na PO-UI (confirmado —
a doc oficial não lista esse componente). Tag "Component / Core" no
Figma indica que é peça fundamental do Design System V&D, não um
wrapper de biblioteca externa.

**Doc PO-UI:** https://po-ui.io — não há uma página específica pra este componente (composição própria, sem \`po-*\` direto).
`;

const meta = {
  title: 'Componentes/POUi/Cards/Status',
  component: PoCardStatus,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'informative', 'brand', 'success', 'warning', 'alert'] },
    emphasis: { control: 'select', options: ['subtle', 'tint', 'selected'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
  args: {
    overline: 'Overline',
    label: 'Label Text',
    value: 60,
    tone: 'brand',
    emphasis: 'subtle',
  },
} satisfies Meta<typeof PoCardStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllTones: Story = {
  name: 'Todas as tonalidades',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '16px' }}>
      {(['neutral', 'informative', 'brand', 'success', 'warning', 'alert'] as const).flatMap((tone) =>
        (['subtle', 'tint', 'selected'] as const).map((emphasis) => (
          <PoCardStatus key={`${tone}-${emphasis}`} tone={tone} emphasis={emphasis} />
        )),
      )}
    </div>
  ),
};
