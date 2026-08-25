import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardFinanceiroScreen } from './TemplateDashboardFinanceiro';

const docs = `
Tela completa montada só com componentes já existentes deste Storybook —
demonstra como uma IA (ou uma pessoa) monta uma tela real seguindo as
boas práticas do Design System, sem precisar abrir o Figma.

**Origem:** landing page de referência no Figma (\`MCP Design System
V&D\`, node \`20545:43164\`, "Landing page demo 1") — lida diretamente
via MCP pra esta reconstrução.

### Composição (de cima pra baixo)

1. **PoTopBarWeb** — versão web do topo (não a do wallpaper Delphi —
   essa tela é web, então o topo usa a barra web: hambúrguer, logo,
   notificações, apps, avatar)
2. **PoHero** — título + tag + busca + switch + 2 botões (via \`children\`)
3. **PoTabs** + botão de filtro (ver divergência abaixo)
4. **4× PoCardStatus** — tons brand (selected)/success/warning/alert
5. **PoActionBar** — busca + filtro + ação primária
6. **PoTable** — colunas com sort, striped desligado

### Responsivo

Linhas com \`flexWrap\`, grid de cards com \`repeat(auto-fit, minmax(200px, 1fr))\`,
tabela num wrapper \`overflow-x: auto\`. Os componentes \`PoCard*\` usados
aqui usam \`width: 100%\` + \`max-width\` (não largura fixa) — encolha a
janela do Storybook pra ver funcionando.

### Divergência real — registrada

O Figma tem um componente **"Filter"** dedicado (botão com ícone de funil)
que não foi implementado nesta sessão (fica na lista de pendências dos
campos de formulário). Aqui ele foi aproximado com um \`PoButton\`
\`kind="secondary"\` — não é o componente real.

A coluna de status da tabela no Figma usa tags coloridas (\`po-tag\`)
dentro da célula — o \`PoTable\` atual só aceita texto simples por
célula (\`Record<string, string>\`), então o status aparece como texto
puro aqui. Pra ter a tag de verdade dentro da tabela, o \`PoTable\`
precisaria aceitar \`ReactNode\` por célula — não implementado ainda.

Veja também: **Construtor de Template ao Vivo**, que usa esta mesma tela
com um painel de componentes usados e download do código PO-UI.
`;

const meta = {
  title: 'Templates POUi/Dashboard Financeiro',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: docs } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <DashboardFinanceiroScreen />,
};
