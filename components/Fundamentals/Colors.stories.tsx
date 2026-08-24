import type { Meta, StoryObj } from '@storybook/react-vite';
import { lightColors, darkColors } from '../../tokens';

const docs = `
Paleta completa do Design System V&D — Surface, Content e Feedback, Light e
Dark lado a lado.

**Fonte:** \`tokens/colors.json\` (Light, sincronizado do Figma pelo
figma-plugin-token-sync) + \`tokens/colors.dark.override.json\` (Dark,
mantido à mão — ver [tokens/README.md](../../tokens/README.md) pra
entender por quê).

O grupo \`chart\` (14 cores de gráfico) não tem valor Dark documentado
ainda — os swatches abaixo mostram só Surface/Content/Feedback, que são os
4 grupos com Light+Dark completos e confirmados no handoff.
`;

type Leaf = { value: string; type: string };
const isLeaf = (n: unknown): n is Leaf =>
  typeof n === 'object' && n !== null && typeof (n as Leaf).value === 'string';

function collectSwatches(node: unknown, path: string[] = []): { path: string; value: string }[] {
  if (isLeaf(node)) return [{ path: path.join('/'), value: node.value }];
  if (typeof node !== 'object' || node === null) return [];
  return Object.entries(node as Record<string, unknown>).flatMap(([key, child]) =>
    collectSwatches(child, [...path, key]),
  );
}

function readableTextColor(hex: string) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#121212' : '#ffffff';
}

function Swatch({ path, value }: { path: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #dfe4ec', borderRadius: '8px', overflow: 'hidden', minWidth: '160px' }}>
      <div
        style={{
          height: '64px',
          background: value,
          display: 'flex',
          alignItems: 'flex-end',
          padding: '6px 8px',
        }}
      >
        <code style={{ fontSize: '11px', color: readableTextColor(value) }}>{value}</code>
      </div>
      <div style={{ padding: '6px 8px', fontSize: '12px', fontFamily: 'monospace', background: '#fff' }}>{path}</div>
    </div>
  );
}

function Group({ title, light, dark }: { title: string; light: Record<string, unknown>; dark: Record<string, unknown> }) {
  const lightSwatches = collectSwatches(light);
  const darkSwatches = collectSwatches(dark);
  return (
    <section style={{ marginBottom: '32px' }}>
      <h3 style={{ fontFamily: 'Lato, sans-serif', marginBottom: '12px' }}>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div>
          <p style={{ fontSize: '12px', color: '#8e8e8e', marginBottom: '8px' }}>Light</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {lightSwatches.map((s) => (
              <Swatch key={s.path} {...s} />
            ))}
          </div>
        </div>
        <div style={{ background: '#121212', padding: '12px', borderRadius: '8px' }}>
          <p style={{ fontSize: '12px', color: '#8e8e8e', marginBottom: '8px' }}>Dark</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {darkSwatches.map((s) => (
              <Swatch key={s.path} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const meta = {
  title: 'Fundamentals/Cores',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: docs } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  name: 'Paleta completa',
  render: () => (
    <div>
      <Group title="Surface" light={lightColors.surface} dark={darkColors.surface} />
      <Group title="Content" light={lightColors.content} dark={darkColors.content} />
      <Group title="Feedback" light={lightColors.feedback} dark={darkColors.feedback} />
    </div>
  ),
};
