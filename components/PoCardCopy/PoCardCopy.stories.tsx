import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoCardCopy } from './PoCardCopy';

const mappingDocs = `
Preview do **Card Copy** com os tokens do Design System V&D.

**Origem do design:** PDF \`Componentespdf/Card Copy.pdf\`. Overline +
valor + botão de copiar (com \`navigator.clipboard\`), feedback visual
"Copiado" por 2s antes de voltar ao normal.

**Não é um componente \`po-*\`** — sem equivalente na PO-UI.
`;

const meta = {
  title: 'POUi/Cards/Copy',
  component: PoCardCopy,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  args: {
    overline: 'Overline',
    value: '999999',
  },
} satisfies Meta<typeof PoCardCopy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
