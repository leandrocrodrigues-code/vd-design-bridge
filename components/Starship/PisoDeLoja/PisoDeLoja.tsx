import { useEffect, useState, type CSSProperties } from 'react';

import { PoButton } from '../../PoButton/PoButton';
import { PoTag } from '../../PoTag/PoTag';
import { PoTabs, type PoTabItem } from '../../PoTabs/PoTabs';
import { PoToaster } from '../../PoToaster/PoToaster';
import '../../PoTabs/po-tabs.tokens.css';

import logoTotvs from './assets/logo-totvs.svg';
import logoLynn from './assets/logo-lynn.svg';
import iconMenuGrid from './assets/icon-menu-grid.svg';
import iconMoreVert from './assets/icon-more-vert.svg';
import iconNotification from './assets/icon-notification.svg';
import iconUser from './assets/icon-user.svg';
import iconCaretUpDown from './assets/icon-caret-updown.svg';
import iconCalendar from './assets/icon-calendar.svg';
import iconPin from './assets/icon-pin.svg';
import iconClose from './assets/icon-close.svg';
import iconWarning from './assets/icon-warning.svg';

/**
 * Tema local Starship — sobrescreve as MESMAS custom properties
 * `--vd-color-*` que PoButton/PoTag/PoTabs/PoToaster já consomem (ver
 * `po-*.tokens.css` de cada um), só que escopado a esta tela via style
 * inline no wrapper raiz. Isso permite reaproveitar os componentes po-*
 * reais do catálogo SEM herdar a paleta V&D do resto do Storybook —
 * exatamente como pedido: cores da Starship, componentes da PO-UI.
 *
 * Valores confirmados nó a nó no Figma (Handoff Starship, node 2214:44338).
 */
const starshipTheme = {
  '--vd-color-content-pure': '#1d1d30',
  '--vd-color-content-01': '#1d1d30',
  '--vd-color-content-02': '#36364a',
  '--vd-color-content-03': '#8e8e8e',
  '--vd-color-content-on-brand': '#030330',
  '--vd-color-content-inverse': '#ffffff',
  '--vd-color-surface-pure': '#ffffff',
  '--vd-color-surface-card': '#ececee',
  '--vd-color-surface-container': '#d0d0d7',
  '--vd-color-surface-brand-pure': '#c2c2e5',
  '--vd-color-surface-brand-container': '#ececf7',
  '--vd-color-surface-brand-highlight': '#4545a1',
  '--vd-color-feedback-warning-highlight': '#8a5a00',
  '--vd-color-feedback-warning-card': '#fcf6e3',
  '--vd-color-feedback-warning-container': 'rgba(232,177,110,0.8)'
} as CSSProperties;

const c = {
  headerBg: '#f9f9fa',
  headerBorder: '#4545a1',
  brand: '#4545a1',
  textDark: '#1d1d30',
  textNeutral: '#36364a',
  tabBorder: '#d0d0d7',
  cardBorder: '#d0d0d7',
  contentBg: '#f2f5f8',
  headerDivider: '#e7e7e7',
  green: '#059669',
  amber: '#b45309',
  iaBorder: '#a650ff'
};

/** Ícone inline — equivalente PO-UI: `an an-paperclip`. */
function PaperclipIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path
        d="M17.5 8.5 9.9 16.1a3 3 0 1 1-4.24-4.25l8.31-8.31a2 2 0 1 1 2.83 2.83L8.3 14.87a1 1 0 0 1-1.41-1.42l7.08-7.07"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Ícone inline — equivalente PO-UI: `an an-microphone`. */
function MicrophoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Ícone inline — equivalente PO-UI: `an an-paper-plane-tilt`. */
function SendIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
      <path
        d="M14.2 1.8 1.2 5.2a.6.6 0 0 0-.05 1.13L6.4 8.6l2.28 5.25a.6.6 0 0 0 1.1.02l4.65-11.4a.6.6 0 0 0-.23-.67Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.4 8.6 9.7 5.3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function ContextField({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 24 }}>
      <img src={icon} alt="" width={20} height={20} />
      <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, color: c.textDark, opacity: 0.7 }}>{label}</span>
      <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, fontWeight: 700, color: c.textDark }}>{value}</span>
    </div>
  );
}

interface Metric {
  label: string;
  value: string;
  valueColor: string;
  description: string;
}

const metrics: Metric[] = [
  { label: 'Faturamento', value: 'R$ 900,5k', valueColor: c.brand, description: 'Volume total vendido pela equipe no período.' },
  { label: 'Ticket Médio', value: 'R$ 360', valueColor: c.textDark, description: 'Base para avaliar qualidade da venda e venda agregada.' },
  { label: 'Margem Média', value: '31,2%', valueColor: c.green, description: 'Saudável, mas pressionada por descontos altos em parte da equipe.' },
  { label: 'Desconto Médio', value: '10,6%', valueColor: c.amber, description: 'Principal sintoma para investigar no ranking de vendedores.' }
];

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 10, padding: 20, background: '#ffffff', border: `1px solid ${c.cardBorder}`, borderRadius: 4 }}>
      <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', color: c.textDark }}>{metric.label}</p>
      <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 32, color: metric.valueColor }}>{metric.value}</p>
      <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.4, color: c.textNeutral }}>{metric.description}</p>
    </div>
  );
}

const baseTabs: PoTabItem[] = [
  { key: 'news', label: 'TOTVS News' },
  { key: 'meu-totvs', label: 'Meu TOTVS' }
];

export function PisoDeLojaScreen() {
  const [activeTab, setActiveTab] = useState<'news' | 'meu-totvs' | 'performance'>('performance');
  const [tabOpen, setTabOpen] = useState(true);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setToastOpen(true), 15000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!toastOpen) return;
    const hideTimer = setTimeout(() => setToastOpen(false), 15000);
    return () => clearTimeout(hideTimer);
  }, [toastOpen]);

  return (
    <div style={{ ...starshipTheme, border: `1px solid ${c.tabBorder}`, display: 'flex', flexDirection: 'column', fontFamily: "'Nunito Sans', sans-serif", background: c.contentBg }}>
      {/* Ani Global Header — sem componente po-* dedicado (logo + tag + ícones
          + avatar juntos); os ícones e a tag SÃO os componentes reais. */}
      <div style={{ background: c.headerBg, borderBottom: `2px solid ${c.headerBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src={logoTotvs} alt="TOTVS" width={80} height={22} />
          <PoTag value="Homologação" type="brand" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* p-icon real na PO-UI: an an-squares-four / an-dots-three-vertical / an-bell / an-user
              (ver manifesto). Aqui usam o SVG exportado do Figma como ReactNode porque
              este Storybook React não carrega a fonte de ícones da PO-UI. */}
          <PoButton kind="tertiary" icon={<img src={iconMenuGrid} alt="" width={20} height={20} />} ariaLabel="Aplicativos" />
          <PoButton kind="tertiary" icon={<img src={iconMoreVert} alt="" width={20} height={20} />} ariaLabel="Mais opções" />
          <PoButton kind="tertiary" icon={<img src={iconNotification} alt="" width={26} height={24} />} ariaLabel="Notificações" />
          <PoButton kind="tertiary" icon={<img src={iconUser} alt="" width={20} height={20} />} ariaLabel="Usuário" />
        </div>
      </div>

      {/* Ani Tabs — po-tabs real pras duas abas fixas; a 3ª aba (ativa e
          fechável) usa as MESMAS classes CSS do po-tabs (vd-po-tabs__item)
          porque o componente PoTabs deste catálogo ainda não suporta aba
          fechável — divergência real, documentada na story. */}
      <div style={{ background: c.headerBg, borderBottom: `1px solid ${c.tabBorder}`, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px' }}>
        <PoTabs
          items={baseTabs}
          active={activeTab === 'performance' ? '' : activeTab}
          onChange={key => setActiveTab(key as 'news' | 'meu-totvs')}
        />
        {tabOpen && (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'performance'}
            className="vd-po-tabs__item"
            data-active={activeTab === 'performance' ? 'true' : undefined}
            onClick={() => setActiveTab('performance')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            Performance piso de loja
            <span
              role="button"
              aria-label="Fechar Performance piso de loja"
              onClick={e => {
                e.stopPropagation();
                setTabOpen(false);
              }}
              style={{ display: 'inline-flex', cursor: 'pointer' }}
            >
              <img src={iconClose} alt="" width={14} height={14} />
            </span>
          </button>
        )}
      </div>

      {!tabOpen ? (
        <div style={{ padding: 48, textAlign: 'center', color: c.textNeutral, fontFamily: 'Inter, sans-serif' }}>
          Aba "Performance piso de loja" fechada.
        </div>
      ) : (
        <>
          {/* Ani Context Bar — sem componente po-* dedicado; o botão É um
              po-button real. */}
          <div style={{ background: c.headerBg, borderBottom: `1px solid ${c.tabBorder}`, display: 'flex', alignItems: 'center', gap: 16, padding: '8px 16px' }}>
            <PoButton kind="secondary" label="Exibir opções" icon={<img src={iconCaretUpDown} alt="" width={16} height={16} />} />

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, flex: 1 }}>
              <ContextField icon={iconCalendar} label="Data:" value="01/01/2025" />
              <div style={{ width: 1, height: 24, background: c.tabBorder }} />
              <ContextField icon={iconPin} label="Empresa:" value="TOTVS" />
              <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, color: c.textDark }}>
                <span style={{ opacity: 0.7 }}>Filial: </span>
                <strong>São Paulo - Santana</strong>
              </span>
            </div>
          </div>

          {/* Content */}
          <div style={{ position: 'relative', background: c.contentBg }}>
            {toastOpen && (
              <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: 'min(720px, 92vw)', display: 'flex', alignItems: 'stretch', boxShadow: '0px 16px 24px rgba(0,0,0,0.1), 0px 0px 3px rgba(0,0,0,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                {/* PoToaster (real, ver po-toaster.tokens.css) não tem slot de
                    ícone líder — o quadrado âmbar do Figma é composto por fora,
                    a bolha em si é o componente real. */}
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-start', padding: 16, background: '#efba2a' }}>
                  <img src={iconWarning} alt="" width={24} height={24} />
                </div>
                <style>{'.vd-po-toaster--starship-wide{flex:1;width:auto;border-radius:0;border:none;}'}</style>
                <PoToaster
                  message="Bruno Martins e Rodrigo Nunes: Alto faturamento (R$ 78k e R$ 71k) mas margem crítica (<25%) por desconto excessivo"
                  type="warning"
                  actionLabel="Ver detalhes"
                  showClose
                  onClose={() => setToastOpen(false)}
                  className="vd-po-toaster--starship-wide"
                />
              </div>
            )}

            <div style={{ borderBottom: `1px solid ${c.headerDivider}`, display: 'flex', alignItems: 'center', gap: 12, padding: '18px 24px 16px' }}>
              <img src={logoLynn} alt="Lynn" width={26} height={26} />
              <div>
                <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 18, color: c.textDark }}>
                  Bom dia, Matheus. O cenário já está preparado para hoje.
                </p>
                <p style={{ margin: '4px 0 0', fontFamily: 'Inter, sans-serif', fontSize: 14, color: c.textDark, opacity: 0.9 }}>
                  Confira o diagnóstico de sua loja - Última atualização <strong>21/06/2026, 8:18</strong>
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, padding: '24px 24px 0', flexWrap: 'wrap' }}>
              {metrics.map(metric => (
                <MetricCard key={metric.label} metric={metric} />
              ))}
            </div>

            <div style={{ padding: 24 }}>
              <div style={{ background: '#ffffff', border: `1px solid ${c.cardBorder}`, borderRadius: 4, padding: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 18, lineHeight: 1.2, color: c.textDark }}>
                  Sua loja vendeu bem, mas parte do resultado veio com desconto alto.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.6, color: c.textDark }}>
                  <p style={{ margin: 0 }}>
                    Hoje a loja fechou com <strong>R$ 900,5k em faturamento</strong>, um volume forte para o período. O
                    ponto de atenção está na qualidade dessa venda: o{' '}
                    <strong style={{ color: c.amber }}>desconto médio ficou em 10,6%</strong>
                  </p>
                  <p style={{ margin: 0 }}>
                    O melhor exemplo positivo foi <strong>Maria Santos</strong>: maior faturamento da equipe,{' '}
                    <strong>R$ 87,5 mil</strong>, maior ticket médio, <strong>R$ 485</strong>, margem de{' '}
                    <strong style={{ color: c.green }}>38,2%</strong> e desconto baixo, <strong>5,3%</strong>. Ela é a
                    principal referência para entender o que funcionou.
                  </p>
                  <p style={{ margin: 0 }}>
                    Já <strong>Bruno Martins</strong> e <strong>Rodrigo Nunes</strong> precisam de atenção. Eles
                    venderam bastante, mas operaram com descontos de <strong style={{ color: c.amber }}>18,5% e 19,2%</strong>,
                    derrubando a qualidade do resultado. O diagnóstico é claro:{' '}
                    <strong>a loja performou em volume, mas precisa proteger melhor margem e desconto para crescer com rentabilidade.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* IA Footer — fluxo normal (não sobrepõe o card acima) */}
            <div style={{ background: c.contentBg, display: 'flex', justifyContent: 'center', padding: '16px 24px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, width: '100%', maxWidth: 720, border: `1.667px solid ${c.iaBorder}`, borderRadius: 12, padding: '12px 12px 12px 18px' }}>
                <p style={{ flex: 1, margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: '21px', color: 'rgba(54,54,74,0.5)' }}>
                  Como estamos de meta no mês?
                </p>
                <PoButton kind="tertiary" size="small" icon={<PaperclipIcon />} ariaLabel="Anexar" />
                <PoButton kind="tertiary" size="small" icon={<MicrophoneIcon />} ariaLabel="Gravar áudio" />
                <PoButton kind="tertiary" size="small" icon={<SendIcon />} ariaLabel="Enviar" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
