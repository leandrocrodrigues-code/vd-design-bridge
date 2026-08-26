import { useState } from 'react';

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
import iconAttach from './assets/icon-attach.svg';
import iconSend from './assets/icon-send.svg';

/**
 * Cores exatas lidas nó a nó do Figma (Handoff Starship — Assistente Piso de
 * Loja). Este projeto é uma marca própria (Starship), fora do Design System
 * V&D — por isso NÃO usa nenhum `--vd-color-*`, só os hex confirmados aqui.
 */
const c = {
  headerBg: '#f9f9fa',
  headerBorder: '#4545a1',
  brand: '#4545a1',
  textDark: '#1d1d30',
  textDarker: '#030330',
  textNeutral: '#36364a',
  tabBg: '#ececee',
  tabActiveBg: '#c2c2e5',
  tabBorder: '#d0d0d7',
  cardBorder: '#d0d0d7',
  contentBg: '#f2f5f8',
  headerDivider: '#e7e7e7',
  badgeBg: '#ececf7',
  green: '#059669',
  amber: '#b45309',
  warningBg: '#fcf6e3',
  warningBorder: 'rgba(232,177,110,0.8)',
  warningIconBg: '#efba2a',
  iaBorder: '#a650ff'
};

function IconButton({ icon, alt }: { icon: string; alt: string }) {
  return (
    <button
      type="button"
      aria-label={alt}
      style={{
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer'
      }}
    >
      <img src={icon} alt={alt} width={20} height={20} />
    </button>
  );
}

function Tab({
  label,
  active,
  onClose
}: {
  label: string;
  active?: boolean;
  onClose?: () => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: 44,
        minWidth: 70,
        padding: active ? '8px 8px 8px 16px' : '8px 16px',
        borderRadius: 4,
        background: active ? c.tabActiveBg : c.tabBg,
        color: active ? c.textDarker : c.brand,
        fontFamily: "'Nunito Sans', sans-serif",
        fontWeight: 700,
        fontSize: 14,
        whiteSpace: 'nowrap'
      }}
    >
      {label}
      {onClose && (
        <button
          type="button"
          aria-label={`Fechar ${label}`}
          onClick={onClose}
          style={{ display: 'flex', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <img src={iconClose} alt="" width={16} height={16} />
        </button>
      )}
    </div>
  );
}

function ContextField({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 24 }}>
      <img src={icon} alt="" width={24} height={24} />
      <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, color: c.textDark, opacity: 0.7 }}>
        {label}
      </span>
      <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, fontWeight: 700, color: c.textDark }}>
        {value}
      </span>
    </div>
  );
}

function ContextDivider() {
  return <div style={{ width: 1, height: 24, background: c.tabBorder }} />;
}

interface Metric {
  label: string;
  value: string;
  valueColor: string;
  description: string;
}

const metrics: Metric[] = [
  {
    label: 'Faturamento',
    value: 'R$ 900,5k',
    valueColor: c.brand,
    description: 'Volume total vendido pela equipe no período.'
  },
  {
    label: 'Ticket Médio',
    value: 'R$ 360',
    valueColor: c.textDark,
    description: 'Base para avaliar qualidade da venda e venda agregada.'
  },
  {
    label: 'Margem Média',
    value: '31,2%',
    valueColor: c.green,
    description: 'Saudável, mas pressionada por descontos altos em parte da equipe.'
  },
  {
    label: 'Desconto Médio',
    value: '10,6%',
    valueColor: c.amber,
    description: 'Principal sintoma para investigar no ranking de vendedores.'
  }
];

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div
      style={{
        flex: '1 0 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 20,
        background: '#ffffff',
        border: `1px solid ${c.cardBorder}`,
        borderRadius: 4
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 12,
          textTransform: 'uppercase',
          color: c.textDark
        }}
      >
        {metric.label}
      </p>
      <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 32, color: metric.valueColor }}>
        {metric.value}
      </p>
      <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.4, color: c.textNeutral }}>
        {metric.description}
      </p>
    </div>
  );
}

function InsightToast({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'stretch',
        background: c.warningBg,
        border: `1px solid ${c.warningBorder}`,
        borderRadius: 4,
        boxShadow: '0px 16px 24px rgba(0,0,0,0.1), 0px 0px 3px rgba(0,0,0,0.1)',
        zIndex: 10,
        width: 'min(720px, 92vw)'
      }}
    >
      <div
        style={{
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'flex-start',
          padding: 16,
          background: c.warningIconBg,
          borderRadius: '4px 0 0 4px'
        }}
      >
        <img src={iconWarning} alt="" width={24} height={24} />
      </div>
      <div style={{ flex: '1 1 auto', minWidth: 0, display: 'flex', alignItems: 'center', padding: 16 }}>
        <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.5, color: c.textDark }}>
          Bruno Martins e Rodrigo Nunes: Alto faturamento (R$ 78k e R$ 71k) mas margem crítica (&lt;25%) por desconto
          excessivo
        </p>
      </div>
      <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 8px 8px 0' }}>
        <button
          type="button"
          style={{
            background: 'transparent',
            border: 'none',
            color: c.brand,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          Ver detalhes
        </button>
        <div style={{ width: 1, alignSelf: 'stretch', background: c.warningBorder }} />
        <button
          type="button"
          aria-label="Fechar aviso"
          onClick={onClose}
          style={{ display: 'flex', background: 'transparent', border: 'none', cursor: 'pointer', padding: 8 }}
        >
          <img src={iconClose} alt="" width={16} height={16} />
        </button>
      </div>
    </div>
  );
}

export function PisoDeLojaScreen() {
  const [activeTab, setActiveTab] = useState<'news' | 'meu-totvs' | 'performance'>('performance');
  const [tabOpen, setTabOpen] = useState(true);
  const [toastOpen, setToastOpen] = useState(true);

  return (
    <div
      style={{
        border: `1px solid ${c.tabBorder}`,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Nunito Sans', sans-serif",
        background: c.contentBg
      }}
    >
      {/* Ani Global Header */}
      <div
        style={{
          background: c.headerBg,
          borderBottom: `2px solid ${c.headerBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 60,
          padding: '0 16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src={logoTotvs} alt="TOTVS" width={80} height={22} />
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: 24,
              padding: '0 8px',
              borderRadius: 400,
              background: c.badgeBg,
              color: c.brand,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: 14
            }}
          >
            Homologação
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <IconButton icon={iconMenuGrid} alt="Aplicativos" />
          <IconButton icon={iconMoreVert} alt="Mais opções" />
          <button
            type="button"
            aria-label="Notificações"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 36,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <img src={iconNotification} alt="" width={26} height={24} />
          </button>
          <IconButton icon={iconUser} alt="Usuário" />
        </div>
      </div>

      {/* Ani Tabs */}
      <div
        style={{
          background: c.headerBg,
          borderBottom: `1px solid ${c.tabBorder}`,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 8,
          padding: '8px 16px 0'
        }}
      >
        <div onClick={() => setActiveTab('news')} style={{ cursor: 'pointer' }}>
          <Tab label="TOTVS News" active={activeTab === 'news'} />
        </div>
        <div onClick={() => setActiveTab('meu-totvs')} style={{ cursor: 'pointer' }}>
          <Tab label="Meu TOTVS" active={activeTab === 'meu-totvs'} />
        </div>
        {tabOpen && (
          <div onClick={() => setActiveTab('performance')} style={{ cursor: 'pointer' }}>
            <Tab label="Performance piso de loja" active={activeTab === 'performance'} onClose={() => setTabOpen(false)} />
          </div>
        )}
      </div>

      {!tabOpen ? (
        <div style={{ padding: 48, textAlign: 'center', color: c.textNeutral, fontFamily: 'Inter, sans-serif' }}>
          Aba "Performance piso de loja" fechada.
        </div>
      ) : (
        <>
          {/* Ani Context Bar */}
          <div
            style={{
              background: c.headerBg,
              borderBottom: `1px solid ${c.tabBorder}`,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '8px 16px'
            }}
          >
            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                height: 44,
                padding: '0 16px',
                background: '#ffffff',
                border: `1px solid ${c.brand}`,
                borderRadius: 4,
                color: c.brand,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer'
              }}
            >
              Exibir opções
              <img src={iconCaretUpDown} alt="" width={16} height={16} />
            </button>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, flex: 1 }}>
              <ContextField icon={iconCalendar} label="Data:" value="01/01/2025" />
              <ContextDivider />
              <ContextField icon={iconPin} label="Empresa:" value="TOTVS" />
              <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, color: c.textDark }}>
                <span style={{ opacity: 0.7 }}>Filial: </span>
                <strong>São Paulo - Santana</strong>
              </span>
            </div>
          </div>

          {/* Content */}
          <div style={{ position: 'relative', background: c.contentBg }}>
            {toastOpen && <InsightToast onClose={() => setToastOpen(false)} />}

            <div
              style={{
                borderBottom: `1px solid ${c.headerDivider}`,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '18px 24px 16px'
              }}
            >
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
              <div
                style={{
                  background: '#ffffff',
                  border: `1px solid ${c.cardBorder}`,
                  borderRadius: 4,
                  padding: 40,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16
                }}
              >
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

            {/* IA Footer */}
            <div
              style={{
                position: 'sticky',
                bottom: 0,
                background: c.contentBg,
                display: 'flex',
                justifyContent: 'center',
                padding: '16px 24px 24px',
                boxShadow: '0px -26px 33.5px 20px ' + c.contentBg
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 8,
                  width: '100%',
                  maxWidth: 720,
                  border: `1.667px solid ${c.iaBorder}`,
                  borderRadius: 12,
                  padding: '12px 12px 12px 18px'
                }}
              >
                <p
                  style={{
                    flex: 1,
                    margin: 0,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 14,
                    lineHeight: '21px',
                    color: 'rgba(54,54,74,0.5)'
                  }}
                >
                  Como estamos de meta no mês?
                </p>
                <button type="button" aria-label="Anexar" style={{ display: 'flex', width: 32, height: 32, alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <img src={iconAttach} alt="" width={16} height={16} />
                </button>
                <button type="button" aria-label="Gravar áudio" style={{ display: 'flex', width: 32, height: 32, alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <img src={iconAttach} alt="" width={16} height={16} />
                </button>
                <button
                  type="button"
                  aria-label="Enviar"
                  style={{
                    display: 'flex',
                    width: 32,
                    height: 32,
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer'
                  }}
                >
                  <img src={iconSend} alt="" width={16} height={16} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
