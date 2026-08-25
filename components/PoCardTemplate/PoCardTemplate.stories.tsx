import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoCardTemplate } from './PoCardTemplate';

const mappingDocs = `
Preview do **Card Template** com os tokens do Design System V&D.

**Origem do design:** PDF \`Componentespdf/Card Template.pdf\`. Scaffold
genérico de 3 zonas (Header/Content/Action) que os demais Cards seguem
como base de composição — não é um card final com dados reais.

**Não é um componente \`po-*\`** — sem equivalente na PO-UI.

**Doc PO-UI:** https://po-ui.io — não há uma página específica pra este componente (composição própria, sem \`po-*\` direto).
`;

const meta = {
  title: 'Componentes/POUi/Cards/Template',
  component: PoCardTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  args: {
    header: 'Header',
    content: 'Content',
    action: 'Action',
  },
} satisfies Meta<typeof PoCardTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
