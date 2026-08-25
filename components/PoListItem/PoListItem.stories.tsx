import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoListItem } from './PoListItem';

const docs = `
Preview de um item do **po-list-view** (Figma "List Item", node
\`10145:7645\`, página "List item ✅ New!").

O componente real da PO-UI é \`po-list-view\`, que recebe \`p-items\`
(array de dados) e renderiza a lista inteira — o Figma documenta a
especificação visual de cada linha, não um componente Angular avulso.
Este representa uma linha isolada e reaproveitável.

5 Action confirmadas: List item, Checkbox Select, Radio Select, Toggle
(Switch), Buttons Group. As 4 primeiras via prop \`action\`; Buttons
Group via \`trailingTags\` (extensão V&D — tags antes do chevron, ver
PDF \`Componentespdf/list/List Item.pdf\`).

Doc oficial: https://po-ui.io/documentation/po-list-view
`;

const meta = {
  title: 'POUi/List Item',
  component: PoListItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: docs } },
  },
  args: {
    overlineText: 'Overline',
    primaryText: 'Label Text',
    secondaryText: 'Description',
    primaryValue: 'Value',
    secondaryValue: 'Description',
  },
} satisfies Meta<typeof PoListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Actions: Story = {
  render: (args) => (
    <div style={{ width: '600px', border: '1px solid #dfe4ec', borderRadius: '8px' }}>
      <PoListItem {...args} action="none" />
      <PoListItem {...args} action="checkbox" />
      <PoListItem {...args} action="radio" />
      <PoListItem {...args} action="toggle" checked />
      <PoListItem {...args} action="chevron" trailingTags={['Label', 'Label']} divider={false} />
    </div>
  ),
};
