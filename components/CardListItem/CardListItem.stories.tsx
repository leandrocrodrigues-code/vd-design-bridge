import type { Meta, StoryObj } from '@storybook/react-vite';
import { TWTCardListItem } from './CardListItem';

const meta: Meta<typeof TWTCardListItem> = {
  title: 'Componentes/Delphi/CardListItem',
  component: TWTCardListItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`TWTCardListItem` não possui classe Delphi documentada no TDN. Proposta de contrato (prefixo `TWT`) a partir do componente **Card List Item** do Figma (node 12136:22236): https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=12136-22236',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TWTCardListItem>;

export const Playground: Story = {
  args: {
    Primario: 'Texto primário',
    Secundario: 'Texto secundário',
    TagTexto: 'Tag',
  },
};
