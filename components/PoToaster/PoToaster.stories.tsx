import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoToaster } from './PoToaster';

const docs = `
Preview do **po-toaster** (Figma "Toast", node \`318:5338\`, página "Toast ✅").

⚠️ \`p-type\` oficial é \`Information | Success | Warning | Error\` — sem
"Neutral"/"Brand". O Figma tem 6 Type; os 2 extras viraram extensão V&D
(\`type="neutral"\`/\`type="brand"\`).

Doc oficial: https://po-ui.io/documentation/po-toaster
`;

const meta = {
  title: 'Componentes/POUi/Toaster (Toast)',
  component: PoToaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: docs } },
  },
  args: { message: 'Label Text' },
} satisfies Meta<typeof PoToaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {(['neutral', 'brand', 'information', 'success', 'warning', 'error'] as const).map((type) => (
        <PoToaster key={type} type={type} message={`Toast ${type}`} />
      ))}
    </div>
  ),
};

export const WithAction: Story = {
  render: () => <PoToaster type='information' message="Arquivo enviado" actionLabel="Desfazer" />,
};
