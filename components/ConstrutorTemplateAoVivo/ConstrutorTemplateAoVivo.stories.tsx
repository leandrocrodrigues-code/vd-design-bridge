import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardFinanceiroScreen, componentesUsados } from '../TemplateDashboardFinanceiro/TemplateDashboardFinanceiro';

const docs = `
Renderiza o template **Dashboard Financeiro** dentro de um shell fixo
(Top Bar Web, responsivo) e mostra ao lado a lista real de componentes
usados na montagem — a primeira peça da visão de "construtor de
template" descrita no Guia de Uso (seção 4): áreas fixas resolvidas +
conteúdo montado só com peças permitidas do catálogo.

Use o botão **Baixar em PO-UI** pra exportar o HTML Angular equivalente
(\`po-*\` reais onde existem, comentado onde é composição própria).
`;

const angularCode = `<!-- Dashboard Financeiro — gerado a partir do template V&D -->
<!-- ⚠️ Topo, Hero, Card Status e Action Bar são composições próprias,
     sem po-* direto — ver divergências na story do template. -->

<div class="vd-topo-web"><!-- composição própria, sem po-* --></div>

<div class="vd-hero">
  <h1>Title page</h1>
  <po-tag p-value="Label Tag" p-type="brand"></po-tag>
  <po-search p-placeholder="Search"></po-search>
  <po-switch></po-switch>
  <po-button p-label="Secondary" p-kind="secondary"></po-button>
  <po-button p-label="Primary" p-kind="primary"></po-button>
</div>

<po-tabs p-active="active">
  <po-tab p-label="Tab active"></po-tab>
  <po-tab p-label="Tab"></po-tab>
  <po-tab p-label="Tab"></po-tab>
</po-tabs>
<po-button p-label="Filter" p-kind="secondary"></po-button>

<!-- 4x Card Status — composição própria, sem po-card -->
<div class="vd-card-status" data-tone="brand">Brand · 70%</div>
<div class="vd-card-status" data-tone="success">Sucess · 60%</div>
<div class="vd-card-status" data-tone="warning">Alert · 50%</div>
<div class="vd-card-status" data-tone="alert">Error · 30%</div>

<!-- Action Bar — composição própria (po-button + po-button) -->
<div class="vd-action-bar">
  <po-button p-icon="an an-magnifying-glass" p-kind="tertiary"></po-button>
  <po-button p-icon="an an-funnel" p-kind="tertiary"></po-button>
  <po-button p-label="Primary table" p-kind="primary"></po-button>
</div>

<po-table
  [p-columns]="columns"
  [p-items]="items"
  p-sort>
</po-table>
`;

function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function ComponentList() {
  return (
    <aside
      style={{
        width: '260px',
        flexShrink: 0,
        borderLeft: '1px solid #dfe4ec',
        padding: '24px',
        fontFamily: 'Lato, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      <h3 style={{ fontSize: '14px', margin: '0 0 4px' }}>Componentes usados</h3>
      <p style={{ fontSize: '12px', color: '#8e8e8e', margin: '0 0 16px' }}>{componentesUsados.length} componentes distintos nesta tela</p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {componentesUsados.map((c) => (
          <li key={c.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '8px 0', borderBottom: '1px solid #f7f9f9' }}>
            <span>{c.name}</span>
            <span style={{ color: '#8e8e8e' }}>×{c.qty}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => downloadFile('dashboard-financeiro.po-ui.html', angularCode)}
        style={{
          all: 'unset',
          boxSizing: 'border-box',
          display: 'block',
          textAlign: 'center',
          marginTop: '24px',
          padding: '10px 16px',
          borderRadius: '500px',
          background: '#00DBFF',
          color: '#002233',
          fontWeight: 700,
          fontSize: '13px',
          cursor: 'pointer',
        }}
      >
        ⬇ Baixar em PO-UI
      </button>
      <p style={{ fontSize: '11px', color: '#8e8e8e', marginTop: '8px' }}>
        Baixa um <code>.html</code> com o código Angular equivalente (comentado onde é composição própria).
      </p>
    </aside>
  );
}

function Builder() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <DashboardFinanceiroScreen />
      </div>
      <ComponentList />
    </div>
  );
}

const meta = {
  title: 'Construtor de Template ao Vivo/Dashboard Financeiro',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: docs } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <Builder />,
};
