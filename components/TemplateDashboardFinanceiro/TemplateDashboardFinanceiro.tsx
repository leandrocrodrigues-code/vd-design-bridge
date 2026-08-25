import { useState } from 'react';
import { PoTopBarWeb } from '../PoTopBarWeb/PoTopBarWeb';
import { PoHero } from '../PoHero/PoHero';
import { PoTag } from '../PoTag/PoTag';
import { PoSearch } from '../PoSearch/PoSearch';
import { PoSwitch } from '../PoSwitch/PoSwitch';
import { PoButton } from '../PoButton/PoButton';
import { PoTabs } from '../PoTabs/PoTabs';
import { PoCardStatus } from '../PoCardStatus/PoCardStatus';
import { PoActionBar } from '../PoActionBar/PoActionBar';
import { PoTable } from '../PoTable/PoTable';

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

export const tabs = [
  { key: 'active', label: 'Tab active' },
  { key: 'b', label: 'Tab' },
  { key: 'c', label: 'Tab' },
];

export const columns = [
  { label: 'Title', key: 'c1' },
  { label: 'Title', key: 'c2' },
  { label: 'Title', key: 'c3' },
  { label: 'Status', key: 'status' },
  { label: 'Title', key: 'c4' },
  { label: 'Title', key: 'c5' },
  { label: 'Title', key: 'c6' },
];

export const rows = [
  { c1: 'Label', c2: 'Label', c3: 'Label', status: 'Success', c4: 'Label', c5: 'Label', c6: 'Label' },
  { c1: 'Label', c2: 'Label', c3: 'Label', status: 'Label', c4: 'Label', c5: 'Label', c6: 'Label' },
  { c1: 'Label', c2: 'Label', c3: 'Label', status: 'Label', c4: 'Label', c5: 'Label', c6: 'Label' },
  { c1: 'Label', c2: 'Label', c3: 'Label', status: 'Success', c4: 'Label', c5: 'Label', c6: 'Label' },
  { c1: 'Label', c2: 'Label', c3: 'Label', status: 'Success', c4: 'Label', c5: 'Label', c6: 'Label' },
];

/** Lista de componentes reais usados nesta tela — consumida pelo Construtor ao vivo. */
export const componentesUsados = [
  { name: 'PoTopBarWeb', qty: 1, folder: 'PoTopBarWeb' },
  { name: 'PoHero', qty: 1, folder: 'PoHero' },
  { name: 'PoTag', qty: 1, folder: 'PoTag' },
  { name: 'PoSearch', qty: 1, folder: 'PoSearch' },
  { name: 'PoSwitch', qty: 1, folder: 'PoSwitch' },
  { name: 'PoButton', qty: 3, folder: 'PoButton' },
  { name: 'PoTabs', qty: 1, folder: 'PoTabs' },
  { name: 'PoCardStatus', qty: 4, folder: 'PoCardStatus' },
  { name: 'PoActionBar', qty: 1, folder: 'PoActionBar' },
  { name: 'PoTable', qty: 1, folder: 'PoTable' },
];

/**
 * Tela completa — reaproveitada tanto pela story de demonstração
 * (Templates POUi/Dashboard Financeiro) quanto pelo Construtor de
 * Template ao Vivo, pra não duplicar a composição em dois lugares.
 *
 * Responsiva: linhas com `flexWrap`, grid de cards com `auto-fit` +
 * `minmax`, tabela dentro de um wrapper com `overflow-x: auto` — nada
 * quebra ao encolher a janela (os componentes Card* usam `width: 100%`
 * com `max-width`, não mais largura fixa).
 */
export function DashboardFinanceiroScreen() {
  const [tab, setTab] = useState('active');
  return (
    <div style={{ background: 'var(--vd-color-surface-container)', minHeight: '100%' }}>
      <PoTopBarWeb label="Title page" />

      <PoHero title="Title page" supportText="Support Text">
        <PoTag value="Label Tag" type="brand" />
        <PoSearch placeholder="Search" style={{ width: 200, maxWidth: '100%' }} />
        <PoSwitch />
        <PoButton label="Secondary" kind="secondary" />
        <PoButton label="Primary" kind="primary" />
      </PoHero>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>
        <PoTabs items={tabs} active={tab} onChange={setTab} />
        <PoButton label="Filter" kind="secondary" />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          padding: '0 24px 24px',
        }}
      >
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

      <div style={{ padding: '0 24px 24px', overflowX: 'auto' }}>
        <PoTable columns={columns} items={rows} sort />
      </div>
    </div>
  );
}
