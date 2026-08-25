import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoTopBar } from './PoTopBar';

const mappingDocs = `
Preview do **Top Bar (Wallpaper Delphi)** com os tokens do Design System V&D.

**Origem do design:** Figma \`MCP Design System V&D — UI KIT Desktop\`,
frame \`Top Bar (Wallpaper Delphi)\` (node \`5047:5411\`), página "Top Bar ✅".
2 variantes de \`Hierarchy\` lidas via design context: \`N1\` (node
\`5047:5404\`, só título) e \`N2\` (node \`5050:4941\`, breadcrumb "Principal /
Secundário").

### Divergência real — registrada, não resolvida

**Não é um componente \`po-*\`.** A PO-UI não tem um equivalente direto
pra essa barra — o visual (faixa azul cheia, controles de janela
minimizar/maximizar/fechar) é específico da casca desktop do **wallpaper
Delphi**, não um padrão web genérico. Implementado como composição
própria, com os tokens \`--vd-color-*\` do Design System (sem tokens
\`po-*\` oficiais, já que não existe \`po-top-bar\`).

\`Top Bar (Web)\` (node \`11931:35705\`) está marcado **🚧 no Figma**
(work-in-progress) — não implementado nesta rodada, junto com
\`Menu (Web)\` (node \`12288:8434\`, também 🚧).

### Ícones

Os ícones (voltar, notificação, menu contextual, controles de janela)
foram recriados como SVG inline aproximando o visual do Figma — os
assets originais exportados (Stack, Bell, DotsThreeVertical, Browser, X)
não foram baixados byte-a-byte nesta rodada.
`;

const meta = {
  title: 'POUi/Top Bar',
  component: PoTopBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: mappingDocs } },
  },
  argTypes: {
    hierarchy: { control: 'select', options: ['N1', 'N2'] },
    betaTag: { control: 'boolean' },
    hasBackButton: { control: 'boolean' },
    hasRecordButton: { control: 'boolean' },
    hasNotificationButton: { control: 'boolean' },
    hasContextualMenu: { control: 'boolean' },
    hasWindowControls: { control: 'boolean' },
  },
  args: {
    hierarchy: 'N1',
    mainPageTitle: 'Nome da Rotina',
    secondaryPageTitle: 'Configurações',
    betaTag: false,
    hasBackButton: false,
    hasRecordButton: false,
    hasNotificationButton: true,
    hasContextualMenu: true,
    hasWindowControls: true,
  },
} satisfies Meta<typeof PoTopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const N1: Story = {};

export const N2: Story = {
  name: 'Hierarchy N2 (breadcrumb)',
  args: { hierarchy: 'N2' },
};

export const WithBackAndBeta: Story = {
  name: 'Com voltar + Beta',
  args: { hasBackButton: true, betaTag: true },
};

export const Recording: Story = {
  args: { hasRecordButton: true },
};
