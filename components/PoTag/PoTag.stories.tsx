import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoTag } from './PoTag';

const docs = `
Preview do **po-tag** (Figma "Tag", node \`316:3942\`, página "Tag ✅").

**Doc oficial:** https://po-ui.io/documentation/po-tag

⚠️ \`p-type\` oficial é \`info | success | warning | danger | neutral\` — sem
"brand". O Figma tem \`Status=Brand\`, mapeado aqui como extensão
(\`type="brand"\`, tokens \`--vd-tag-color-brand\`/\`--vd-tag-text-brand\`).
`;

const meta = {
  title: 'Componentes/POUi/Tag',
  component: PoTag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: docs } },
  },
  args: { value: 'Label Tag' },
} satisfies Meta<typeof PoTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      <PoTag value="Neutral" type="neutral" />
      <PoTag value="Brand" type="brand" />
      <PoTag value="Info" type="info" />
      <PoTag value="Success" type="success" />
      <PoTag value="Warning" type="warning" />
      <PoTag value="Danger" type="danger" />
      <PoTag value="Disabled" disabled />
    </div>
  ),
};

export const Removable: Story = {
  render: () => <PoTag value="Removível" type="brand" removable />,
};
