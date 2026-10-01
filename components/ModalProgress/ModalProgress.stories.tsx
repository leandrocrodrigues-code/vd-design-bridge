import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TWTModalProgress } from './ModalProgress';

const meta: Meta<typeof TWTModalProgress> = {
  title: 'Componentes/Delphi/ModalProgress',
  component: TWTModalProgress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`TWTModalProgress` não possui classe Delphi documentada no TDN. Proposta de contrato (prefixo `TWT`) a partir da composição **Modal Progress** do Figma (símbolo 12147:28264): https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=12147-28264',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TWTModalProgress>;

export const Playground: Story = {
  args: {
    Titulo: 'Acompanhe o progresso',
    Itens: [
      { Estado: 'Sucesso', Texto: 'Etapa concluída com sucesso' },
      { Estado: 'EmAndamento', Texto: 'Processando etapa atual' },
      { Estado: 'Proximo', Texto: 'Próxima etapa' },
      { Estado: 'Desabilitado', Texto: 'Etapa ainda não iniciada' },
    ],
    OnFechar: fn(),
  },
};

export const ComAlerta: Story = {
  args: {
    Titulo: 'Acompanhe o progresso',
    Itens: [
      { Estado: 'Sucesso', Texto: 'Dados validados' },
      { Estado: 'Alerta', Texto: 'Pendência encontrada, revise os dados' },
      { Estado: 'Erro', Texto: 'Falha ao processar etapa' },
      { Estado: 'Desabilitado', Texto: 'Etapa ainda não iniciada' },
    ],
    OnFechar: fn(),
  },
};
