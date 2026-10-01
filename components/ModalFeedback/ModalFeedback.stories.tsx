import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TWTModalFeedback } from './ModalFeedback';

const meta: Meta<typeof TWTModalFeedback> = {
  title: 'Componentes/Delphi/ModalFeedback',
  component: TWTModalFeedback,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`TWTModalFeedback` não possui classe Delphi documentada no TDN. Proposta de contrato (prefixo `TWT`) a partir da composição **Modal Feedback** do Figma (frame 12138:2494): https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=12138-2494',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TWTModalFeedback>;

export const Sucesso: Story = {
  args: {
    Tipo: 'Sucesso',
    Titulo: 'Operação concluída',
    Paragrafo: 'Sua solicitação foi processada com sucesso.',
    BotaoPrimarioTexto: 'Continuar',
    OnPrimario: fn(),
    OnFechar: fn(),
  },
};

export const Erro: Story = {
  args: {
    Tipo: 'Erro',
    Titulo: 'Não foi possível concluir',
    Paragrafo: 'Ocorreu um erro ao processar sua solicitação. Tente novamente.',
    BotaoPrimarioTexto: 'Tentar novamente',
    BotaoSecundarioTexto: 'Cancelar',
    OnPrimario: fn(),
    OnSecundario: fn(),
    OnFechar: fn(),
  },
};

export const Informativo: Story = {
  args: {
    Tipo: 'Informativo',
    Titulo: 'Título do feedback',
    Paragrafo: 'Texto de apoio explicando o resultado da ação realizada.',
    BotaoPrimarioTexto: 'Continuar',
    BotaoSecundarioTexto: 'Saiba mais',
    BotaoTerciarioTexto: 'Cancelar',
    OnPrimario: fn(),
    OnSecundario: fn(),
    OnTerciario: fn(),
    OnFechar: fn(),
  },
};
