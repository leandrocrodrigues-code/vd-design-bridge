import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoAvatar } from './PoAvatar';

const docs = `
Preview do **po-avatar** (Figma "Avatar", node \`265:594\`, página "Avatar ✅").

**Doc oficial:** https://po-ui.io/documentation/po-avatar

⚠️ **Divergência real**: o po-avatar oficial só suporta \`p-src\` (imagem),
\`p-size\`, \`p-loading\` — **sem** iniciais, ícone ou cor customizável. O
Figma tem 4 Types (Initials/Icon/User Profile/Image); só "Image" mapeia
pro componente real. Initials/Icon são extensão V&D, não tradução de
prop oficial.

Cores confirmadas nó a nó (Type=Initials): Brand → bg
\`surface/brand/container\` + texto \`surface/brand/highlight\`; Neutral →
bg \`surface/container\` + texto \`content/02\`.
`;

const meta = {
  title: 'Componentes/POUi/Avatar',
  component: PoAvatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: docs } },
  },
} satisfies Meta<typeof PoAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <PoAvatar initials="AZ" size="small" />
      <PoAvatar initials="AZ" size="medium" />
      <PoAvatar initials="AZ" size="large" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <PoAvatar initials="AZ" color="brand" />
      <PoAvatar initials="AZ" color="neutral" />
    </div>
  ),
};

export const Image: Story = {
  name: 'Image (real po-avatar)',
  render: () => <PoAvatar src="https://i.pravatar.cc/96" alt="Usuário" />,
};
