import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoTopBar } from '../PoTopBar/PoTopBar';
import { PoHero } from '../PoHero/PoHero';
import { PoTag } from '../PoTag/PoTag';
import { PoSearch } from '../PoSearch/PoSearch';
import { PoSwitch } from '../PoSwitch/PoSwitch';
import { PoButton } from '../PoButton/PoButton';
import { PoTabs } from '../PoTabs/PoTabs';
import { PoCardStatus } from '../PoCardStatus/PoCardStatus';
import { PoActionBar } from '../PoActionBar/PoActionBar';
import { PoTable } from '../PoTable/PoTable';

const docs = `
Tela completa montada só com componentes já existentes deste Storybook —
demonstra como uma IA (ou uma pessoa) monta uma tela real seguindo as
boas práticas do Design System, sem precisar abrir o Figma.

**Origem:** landing page de referência no Figma (\`MCP Design System
V&D\`, node \`20545:43164\`, "Landing page demo 1") — lida diretamente
via MCP pra esta reconstrução.

### Composição (de cima pra baixo)

1. **PoTopBar** — hierarchy N1
2. **PoHero** — título + tag + busca + switch + 2 botões (via \`children\`)
3. **PoTabs** + botão de filtro (ver divergência abaixo)
4. **4× PoCardStatus** — tons brand (selected)/success/warning/alert
5. **PoActionBar** — busca + filtro + ação primária
6. **PoTable** — colunas com sort, striped desligado

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
`;

function FilterIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
      <path d="M2 3h12M4 8h8M6.5 13h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="m13 13-2.5-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const tabs = [
  { key: 'active', label: 'Tab active' },
  { key: 'b', label: 'Tab' },
  { key: 'c', label: 'Tab' },
];

const columns = [
  { label: 'Title', key: 'c1' },
  { label: 'Title', key: 'c2' },
  { label: 'Title', key: 'c3' },
  { label: 'Status', key: 'status' },
  { label: 'Title', key: 'c4' },
  { label: 'Title', key: 'c5' },
  { label: 'Title', key: 'c6' },
];

const rows = [
  { c1: 'Label', c2: 'Label', c3: 'Label', status: 'Success', c4: 'Label', c5: 'Label', c6: 'Label' },
  { c1: 'Label', c2: 'Label', c3: 'Label', status: 'Label', c4: 'Label', c5: 'Label', c6: 'Label' },
  { c1: 'Label', c2: 'Label', c3: 'Label', status: 'Label', c4: 'Label', c5: 'Label', c6: 'Label' },
  { c1: 'Label', c2: 'Label', c3: 'Label', status: 'Success', c4: 'Label', c5: 'Label', c6: 'Label' },
  { c1: 'Label', c2: 'Label', c3: 'Label', status: 'Success', c4: 'Label', c5: 'Label', c6: 'Label' },
];

function Screen() {
  const [tab, setTab] = useState('active');
  return (
    <div style={{ background: 'var(--vd-color-surface-container)', minHeight: '100vh' }}>
      <PoTopBar hierarchy="N1" mainPageTitle="Title page" />
      <PoHero overline={undefined} title="Title page" supportText="Support Text">
        <PoTag value="Label Tag" type="brand" />
        <PoSearch placeholder="Search" style={{ width: 200 }} />
        <PoSwitch />
        <PoButton label="Secondary" kind="secondary" />
        <PoButton label="Primary" kind="primary" />
      </PoHero>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>
        <PoTabs items={tabs} active={tab} onChange={setTab} />
        <PoButton label="Filter" kind="secondary" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '0 24px 24px' }}>
        <PoCardStatus tone="brand" emphasis="selected" overline="" label="Brand" value={70} />
        <PoCardStatus tone="success" overline="" label="Sucess" value={60} />
        <PoCardStatus tone="warning" overline="" label="Alert" value={50} />
        <PoCardStatus tone="alert" overline="" label="Error" value={30} />
      </div>

      <div style={{ padding: '0 24px 24px' }}>
        <PoActionBar
          leadingActions={[
            { key: 'search', icon: <SearchIcon />, label: 'Buscar' },
            { key: 'filter', icon: <FilterIcon />, label: 'Filtrar' },
          ]}
          primaryLabel="Primary table"
        />
      </div>

      <div style={{ padding: '0 24px 24px' }}>
        <PoTable columns={columns} items={rows} sort />
      </div>
    </div>
  );
}

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
  render: () => <Screen />,
};
