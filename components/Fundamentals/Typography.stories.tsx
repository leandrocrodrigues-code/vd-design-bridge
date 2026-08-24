import type { Meta, StoryObj } from '@storybook/react-vite';
import { tokens } from '../../tokens';

const docs = `
Escala de tipografia do Design System V&D. Fonte **Lato**, pesos Regular e
Bold. Fonte: \`tokens/typography.json\` (sincronizado do Figma).

### Pendência aberta — nomes semânticos sem spec confirmada

O handoff cita 6 "estilos semânticos prontos": Title, Subtitle, Overline,
Paragraph, Description, Caption. Os tokens do Figma confirmam **5** famílias
(\`title\`, \`paragraph\`, \`overline\`, \`description\`, \`caption\` — falta
\`subtitle\`) mas **nenhuma delas tem um tamanho/peso fixo documentado** — a
página "Fundamentals" do Figma só tem swatches de cor e ícones, não
especímes de texto com o pareamento nome→tamanho.

Por isso esta página mostra a **escala bruta** (todos os tamanhos, reais,
renderizados) em vez de inventar qual tamanho cada nome semântico usa.
Preciso que alguém confirme, no Figma ou no ZeroHeight, qual combinação de
tamanho/peso/family cada estilo semântico usa antes de eu documentar isso
como fato.
`;

const sizeMap = tokens.typography.size as Record<string, { value: string }>;
const lineHeightMap = tokens.typography['line-height'] as Record<string, { value: string }>;

const order = ['xsm', 'xsm+', 'sm', 'sm+', 'smd', 'md', 'lg', 'xlg', '2xlg'];
const sorted = order
  .filter((key) => key in sizeMap)
  .map((key) => [key, sizeMap[key]] as const);

const meta = {
  title: 'Fundamentals/Tipografia',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: docs } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  name: 'Escala de tamanhos',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {sorted.map(([key, size]) => {
        const lineHeight = lineHeightMap[key]?.value ?? size.value;
        return (
          <div key={key} style={{ display: 'flex', alignItems: 'baseline', gap: '16px', borderBottom: '1px solid #dfe4ec', paddingBottom: '12px' }}>
            <code style={{ width: '80px', fontSize: '11px', color: '#8e8e8e', flexShrink: 0 }}>
              {key.toUpperCase()} · {size.value}px
            </code>
            <span
              style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: 400,
                fontSize: `${size.value}px`,
                lineHeight: `${lineHeight}px`,
                color: '#121212',
              }}
            >
              Design System V&D
            </span>
          </div>
        );
      })}
    </div>
  ),
};

export const Weights: Story = {
  name: 'Pesos',
  render: () => (
    <div style={{ display: 'flex', gap: '48px' }}>
      <div>
        <code style={{ fontSize: '11px', color: '#8e8e8e' }}>Regular</code>
        <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 400, fontSize: '24px', margin: '4px 0 0' }}>
          Design System V&D
        </p>
      </div>
      <div>
        <code style={{ fontSize: '11px', color: '#8e8e8e' }}>Bold</code>
        <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700, fontSize: '24px', margin: '4px 0 0' }}>
          Design System V&D
        </p>
      </div>
    </div>
  ),
};
