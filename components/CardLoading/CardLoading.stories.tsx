import type { Meta, StoryObj } from '@storybook/react-vite';
import { TWTCardLoading } from './CardLoading';

const meta: Meta<typeof TWTCardLoading> = {
  title: 'Componentes/Delphi/CardLoading',
  component: TWTCardLoading,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`TWTCardLoading` não possui classe Delphi documentada no TDN. Proposta de contrato (prefixo `TWT`) a partir do componente **Card Loading** do Figma (node 12136:9161): https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=12136-9161',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TWTCardLoading>;

export const Playground: Story = {
  args: {
    Titulo: 'Atualizando...',
    Subtitulo: '4 minutos restantes',
    Valor: 50,
  },
};

export const QuaseConcluido: Story = {
  args: {
    Titulo: 'Atualizando...',
    Subtitulo: '30 segundos restantes',
    Valor: 90,
  },
};
