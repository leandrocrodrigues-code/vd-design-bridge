import type { Meta, StoryObj } from '@storybook/react-vite';
import { Brand } from './Brand';

const docs = `
Marca TOTVS — 6 variantes (\`Type\` × \`Color\`), espelhando o component set
**"Brand (New!)"** do Figma (node \`208:418\`, página "Brand ✅").

SVGs internalizados no repo em \`assets/\` — não apontam pra URL remota do
Figma, que expira em ~7 dias.

| Color (Figma) | Uso |
|---|---|
| \`Dark Blue (Brand)\` | fundo claro |
| \`Light Blue (Brand)\` | fundo escuro/dark mode |
| \`White (Surface Pure)\` | fundo com cor de marca (ex. header azul) |
`;

const meta = {
  title: 'Fundamentals/Marca',
  component: Brand,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: docs } },
  },
  argTypes: {
    color: { control: 'select', options: ['dark-blue', 'light-blue', 'white'] },
    type: { control: 'select', options: ['symbol-only', 'symbol-typo'] },
  },
  args: {
    color: 'dark-blue',
    type: 'symbol-only',
  },
} satisfies Meta<typeof Brand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '24px', alignItems: 'center' }}>
      {(['symbol-only', 'symbol-typo'] as const).map((type) =>
        (['dark-blue', 'light-blue', 'white'] as const).map((color) => (
          <div
            key={`${type}-${color}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '16px',
              background: color === 'white' ? '#00dbff' : '#ffffff',
              border: '1px solid #dfe4ec',
              borderRadius: '8px',
            }}
          >
            <Brand type={type} color={color} />
            <code style={{ fontSize: '11px', color: color === 'white' ? '#002233' : '#8e8e8e' }}>
              {type} / {color}
            </code>
          </div>
        )),
      )}
    </div>
  ),
};
