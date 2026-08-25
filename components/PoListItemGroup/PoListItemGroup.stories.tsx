import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoListItemGroup } from './PoListItemGroup';

const docs = `
Preview do agrupamento de itens do **po-list-view** com os tokens do
Design System V&D.

**Origem do design:** PDF \`Componentespdf/list/List Item Group.pdf\`.
2 layouts: lista vertical empilhada (cada linha usa [[PoListItem]]) e
uma variante horizontal (colunas lado a lado, só texto).

O componente real da PO-UI é \`po-list-view\`, que recebe \`p-items\`
(array) e renderiza a lista inteira internamente — aqui \`items\` recebe
as mesmas props do \`PoListItem\`.

Doc oficial: https://po-ui.io/documentation/po-list-view
`;

const items = Array.from({ length: 6 }, (_, i) => ({
  primaryText: 'Label Text',
  secondaryText: 'Description',
  key: i,
}));

const meta = {
  title: 'Componentes/POUi/List Item Group',
  component: PoListItemGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: docs } },
  },
  args: {
    items,
  },
} satisfies Meta<typeof PoListItemGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};

export const Horizontal: Story = {
  args: { layout: 'horizontal' },
};
