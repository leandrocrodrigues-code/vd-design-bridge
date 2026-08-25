import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoCardLoading } from './PoCardLoading';

const mappingDocs = `
Preview do **Card Loading** com os tokens do Design System V&D.

**Origem do design:** PDF \`Componentespdf/Card Loading.pdf\`. Card de
progresso genérico: título + subtítulo, percentual + fechar, progress bar.

**Não é um componente \`po-*\`** — sem equivalente na PO-UI.
`;

const meta = {
  title: 'POUi/Cards/Loading',
  component: PoCardLoading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
  args: {
    title: 'Atualizando...',
    subtitle: '4 minutos restantes',
    value: 50,
  },
} satisfies Meta<typeof PoCardLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
