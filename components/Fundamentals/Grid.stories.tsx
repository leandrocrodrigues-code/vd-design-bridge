import type { Meta, StoryObj } from '@storybook/react-vite';
import { tokens } from '../../tokens';

const docs = `
Grid e escala de espaçamento do Design System V&D. Fonte: handoff (PDFs do
ZeroHeight) + \`tokens/spacing.json\`.

**Grid** — Delphi (1024×704) e Web Desktop (1440): mesma spec — 24 colunas,
largura de coluna 32px, gutter 24px, margem 20px, grid horizontal 8px.
Tablet/Mobile não seguem os números do Figma — usar as convenções
responsivas do próprio POUi quando chegar a hora (pendência, não
resolvida aqui).

**Spacing** (múltiplo de 4): 4/8/12/16/20/24/32/40/48/56/64 (3XSM a 4XLG).
**Border radius**: 4/8/12/16/20/24 (3XSM a MD).
`;

const spacingOrder = ['3xsm', '2xsm', 'xsm', 'sm', 'smd', 'md', 'lg', 'xlg', '2xlg', '3xlg', '4xlg'];
const spacingEntries = spacingOrder
  .map((key) => [key, tokens.spacing[key as keyof typeof tokens.spacing]] as const)
  .filter(([, v]) => v);

const radiusOrder = ['none', '3xsm', '2xsm', 'xsm', 'sm', 'smd', 'md'];
const radiusEntries = radiusOrder
  .map((key) => [key, tokens.radius[key as keyof typeof tokens.radius]] as const)
  .filter(([, v]) => v);

const meta = {
  title: 'Fundamentals/Grid & Spacing',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: docs } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const GridColumns: Story = {
  name: 'Grid — 24 colunas',
  render: () => (
    <div>
      <p style={{ fontSize: '12px', color: '#8e8e8e', marginBottom: '8px' }}>
        24 colunas · largura 32px · gutter 24px · margem 20px (escala reduzida pra caber na viewport do Storybook)
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(24, 1fr)',
          gap: '6px',
          padding: '0 12px',
          background: '#f7f9f9',
          border: '1px dashed #dfe4ec',
        }}
      >
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} style={{ height: '160px', background: '#a0f2ff' }} />
        ))}
      </div>
    </div>
  ),
};

export const HorizontalGrid: Story = {
  name: 'Grid horizontal — 8px',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} style={{ height: '8px', borderBottom: '1px solid #dfe4ec' }} />
      ))}
    </div>
  ),
};

export const Spacing: Story = {
  name: 'Escala de espaçamento',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {spacingEntries.map(([key, token]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <code style={{ width: '64px', fontSize: '11px', color: '#8e8e8e', flexShrink: 0 }}>
            {key.toUpperCase()}
          </code>
          <div style={{ height: '16px', width: token.value, background: '#00dbff', borderRadius: '2px' }} />
          <code style={{ fontSize: '11px', color: '#121212' }}>{token.value}</code>
        </div>
      ))}
    </div>
  ),
};

export const Radius: Story = {
  name: 'Border radius',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {radiusEntries.map(([key, token]) => (
        <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              background: '#a0f2ff',
              border: '1px solid #1e3da1',
              borderRadius: token.value,
            }}
          />
          <code style={{ fontSize: '11px', color: '#8e8e8e' }}>
            {key.toUpperCase()} · {token.value}
          </code>
        </div>
      ))}
    </div>
  ),
};
