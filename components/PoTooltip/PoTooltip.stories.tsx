import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoTooltip } from './PoTooltip';

const docs = `
Preview do **Tooltip** (Figma node \`3034:3225\`, página "Tooltip ✅").

⚠️ **Pendência**: não confirmei os nomes de CSS token do po-tooltip via
\`po-ui.io/llms-generated\` — a página não carregou nas tentativas. Na
PO-UI real, tooltip costuma ser a diretiva \`p-tooltip="texto"\` aplicada
em qualquer elemento, não um wrapper — diferente do padrão de bloco
usado aqui (que segue a estrutura do Figma). Tratado como extensão até
confirmar.

Cor confirmada: bg \`surface/inverse\` #121212 a 90% de opacidade, texto
\`content/inverse\` — mesma nas 12 combinações de alinhamento do Figma
(só muda a seta).
`;

const meta = {
  title: 'POUi/Tooltip (extensão)',
  component: PoTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: docs } },
  },
  args: { text: 'Tooltip', children: <button type="button">Hover</button> },
} satisfies Meta<typeof PoTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Positions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '64px', padding: '48px' }}>
      <PoTooltip text="Tooltip acima" position="top">
        <button type="button">Top</button>
      </PoTooltip>
      <PoTooltip text="Tooltip abaixo" position="bottom">
        <button type="button">Bottom</button>
      </PoTooltip>
      <PoTooltip text="Tooltip à esquerda" position="left">
        <button type="button">Left</button>
      </PoTooltip>
      <PoTooltip text="Tooltip à direita" position="right">
        <button type="button">Right</button>
      </PoTooltip>
    </div>
  ),
};
