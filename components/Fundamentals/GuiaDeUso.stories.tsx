import type { Meta, StoryObj } from '@storybook/react-vite';

const docs = `
Como instalar a PO-UI oficial, aplicar os tokens V&D por cima, e as regras
que todo componente novo deste Storybook segue.
`;

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && <p style={{ fontSize: '12px', color: '#8e8e8e', margin: '0 0 6px', fontFamily: 'Lato, sans-serif' }}>{label}</p>}
      <pre
        style={{
          background: '#121212',
          color: '#e8f7ff',
          padding: '16px 20px',
          borderRadius: '8px',
          fontSize: '13px',
          lineHeight: '20px',
          overflowX: 'auto',
          margin: 0,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        }}
      >
        {children}
      </pre>
    </div>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
      <div
        style={{
          flexShrink: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: '#00DBFF',
          color: '#002233',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontFamily: 'Lato, sans-serif',
        }}
      >
        {number}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{ margin: '0 0 8px', fontFamily: 'Lato, sans-serif', fontSize: '16px' }}>{title}</h4>
        {children}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '48px' }}>
      <h2 style={{ fontFamily: 'Lato, sans-serif', fontSize: '22px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #dfe4ec' }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Rule({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px 0' }}>
      <span
        style={{
          flexShrink: 0,
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: ok ? '#F4FBF8' : '#FEF1F2',
          color: ok ? '#075902' : '#781B12',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          fontWeight: 700,
        }}
      >
        {ok ? '✓' : '✕'}
      </span>
      <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', lineHeight: '20px', color: '#121212' }}>{children}</span>
    </div>
  );
}

function LinkCard({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'block',
        padding: '16px',
        border: '1px solid #dfe4ec',
        borderRadius: '8px',
        textDecoration: 'none',
        color: 'inherit',
        fontFamily: 'Lato, sans-serif',
      }}
    >
      <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#1E3DA1', fontSize: '14px' }}>{title} ↗</p>
      <p style={{ margin: 0, fontSize: '13px', color: '#545454' }}>{description}</p>
    </a>
  );
}

function GuiaDeUso() {
  return (
    <div style={{ maxWidth: '780px', fontFamily: 'Lato, sans-serif', color: '#121212' }}>
      <Section title="1. Instalar a PO-UI">
        <p style={{ fontSize: '14px', lineHeight: '22px', color: '#363636' }}>
          A PO-UI é a biblioteca Angular oficial. Este Storybook é catálogo de leitura — o código Angular real
          roda no projeto de destino, instalado assim:
        </p>
        <Step number={1} title="Adicione a PO-UI ao projeto Angular">
          <CodeBlock label="dentro do projeto Angular">{`ng add @po-ui/ng-components`}</CodeBlock>
          <p style={{ fontSize: '13px', color: '#545454', margin: 0 }}>
            O schematic configura o módulo, os estilos base e o ícone-set automaticamente.
          </p>
        </Step>
        <Step number={2} title="Importe o módulo do componente que for usar">
          <CodeBlock>{`import { PoButtonModule } from '@po-ui/ng-components';

@NgModule({
  imports: [PoButtonModule],
})
export class MyModule {}`}</CodeBlock>
        </Step>
        <Step number={3} title="Use no template">
          <CodeBlock>{`<po-button p-label="Salvar" p-kind="primary"></po-button>`}</CodeBlock>
        </Step>
      </Section>

      <Section title="2. Aplicar os tokens V&D por cima">
        <p style={{ fontSize: '14px', lineHeight: '22px', color: '#363636' }}>
          ⚠️ <strong>Estado atual:</strong> a lib de tokens V&D ainda <strong>não é um pacote publicado</strong> (sem
          <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}> npm install</code> direto ainda) —
          é a meta declarada no roadmap do projeto. Hoje, os tokens vivem como JSON em{' '}
          <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>tokens/</code> neste repositório e
          são consumidos como CSS custom properties. Enquanto o pacote não sai, aplique assim:
        </p>
        <Step number={1} title="Copie os JSONs de tokens/ para o seu projeto">
          <p style={{ fontSize: '13px', color: '#545454', margin: '0 0 8px' }}>
            <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>colors.json</code>,{' '}
            <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>spacing.json</code>,{' '}
            <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>typography.json</code>,{' '}
            <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>radius.json</code> e{' '}
            <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>sizing.json</code> — formato{' '}
            <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>{'{ value, type }'}</code>{' '}
            (compatível com Tokens Studio / Figma Variables export).
          </p>
        </Step>
        <Step number={2} title="Gere as CSS custom properties (--vd-color-*)">
          <p style={{ fontSize: '13px', color: '#545454', margin: '0 0 8px' }}>
            A função <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>colorCssVars(mode)</code> em{' '}
            <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>tokens/index.ts</code> achata a
            árvore de cores em variáveis CSS. Aplique no elemento raiz do seu tema:
          </p>
          <CodeBlock>{`import { colorCssVars } from './tokens';

const vars = colorCssVars('light'); // ou 'dark'
Object.entries(vars).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, value);
});`}</CodeBlock>
        </Step>
        <Step number={3} title="Sobrescreva os tokens customizáveis do po-* correspondente">
          <p style={{ fontSize: '13px', color: '#545454', margin: 0 }}>
            Cada componente PO-UI documenta suas CSS custom properties próprias (ex. <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>--color-action-default</code> no po-button) — aponte cada uma para o{' '}
            <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>--vd-color-*</code> equivalente,
            igual cada <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>.tokens.css</code>{' '}
            deste repositório já faz — copie o arquivo do componente que for usar como referência.
          </p>
        </Step>
      </Section>

      <Section title="3. Regras de uso deste Design System">
        <Rule ok>
          Sempre usar <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>var(--vd-color-*)</code>{' '}
          nos <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>.tokens.css</code> — nunca hex
          hardcoded. É o que faz o toggle light/dark do Storybook funcionar de graça.
        </Rule>
        <Rule ok>
          Nomear as custom properties de cada componente igual à doc oficial da PO-UI (seção "Tokens customizáveis" de{' '}
          <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>po-ui.io/documentation/po-*</code>) —
          nunca inventar nome novo.
        </Rule>
        <Rule ok>
          Toda story linka pra página oficial da PO-UI correspondente (ou, quando não existe componente `po-*` equivalente,
          diz isso explicitamente e linka pra po-ui.io mesmo assim, como referência do catálogo).
        </Rule>
        <Rule ok>
          Quando o componente do Figma não tem equivalente oficial na PO-UI, isso é registrado como divergência real na
          própria story — não trava o resto do lote, mas fica documentado.
        </Rule>
        <Rule ok={false}>
          Não inventar prop ou variante que não existe na PO-UI real só porque o Figma mostra — aceitar a limitação e
          documentar.
        </Rule>
        <Rule ok={false}>
          Não tratar sub-estados visuais (hover/pressed/focus) como variante de componente — isso é CSS (
          <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>:hover</code>,{' '}
          <code style={{ background: '#F7F9F9', padding: '2px 6px', borderRadius: '4px' }}>:focus-visible</code>), não uma
          prop nova.
        </Rule>
      </Section>

      <Section title="Links úteis">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <LinkCard href="https://po-ui.io" title="po-ui.io" description="Documentação oficial da PO-UI — catálogo completo de componentes Angular." />
          <LinkCard href="https://po-ui.io/documentation" title="po-ui.io/documentation" description="Índice de todos os componentes com @Input/@Output e tokens customizáveis." />
          <LinkCard href="https://github.com/leandrocrodrigues-code/vd-design-bridge" title="GitHub — vd-design-bridge" description="Repositório deste Storybook e da lib de tokens V&D." />
          <LinkCard href="https://po-ui.io/guides/getting-started" title="Getting Started (PO-UI)" description="Guia oficial de instalação passo a passo em um projeto Angular novo." />
        </div>
      </Section>
    </div>
  );
}

const meta = {
  title: 'Fundamentals/Guia de Uso',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: docs } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Instalacao: Story = {
  name: 'Instalação e regras',
  render: () => <GuiaDeUso />,
};
