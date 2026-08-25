import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoTopBarWeb } from './PoTopBarWeb';

const docs = `
Preview do **Top Bar (Web)** com os tokens do Design System V&D.

**Origem do design:** PDF \`Componentespdf/menu web/topbar web/Top Bar
(Web).pdf\` — página marcada **🚧 no Figma** (work-in-progress).
Hambúrguer (abre o Menu Web) + logo/label, notificações (com badge),
apps (grid) e avatar de usuário.

**Não é um componente \`po-*\`** — sem equivalente na PO-UI. Diferente do
já existente [[PoTopBar]] (barra do wallpaper Delphi) — esta é a versão
web, mais simples.

**Doc PO-UI:** https://po-ui.io — não há uma página específica pra este componente (composição própria, sem \`po-*\` direto).
`;

const meta = {
  title: 'POUi/Top Bar (Web)',
  component: PoTopBarWeb,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: docs } },
  },
  args: {
    label: 'Label Text',
    hasNotification: true,
    userInitials: 'AZ',
  },
} satisfies Meta<typeof PoTopBarWeb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
