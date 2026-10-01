import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TWTCardUploader } from './CardUploader';

const componentDocs = `
**TWTCardUploader** — sem equivalente no PDF do TDN. Nasce da
modernização do Design System V&D, componente **Card Uploader** do Figma
([node 12132:8784](https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=12132-8784), State=Default).

O prefixo \`TWT\` antecipa o nome que o time Delphi provavelmente vai usar
ao criar essa classe — é uma **proposta de contrato**, não um nome
confirmado pela documentação TDN.

**Regra de fidelidade:** o Figma é a fonte da verdade visual, sempre —
mas o estado \`Uploading\` aqui foi inferido do padrão visual do Card
Loading, não lido diretamente do node de Uploading deste card; e o estado
"Uploaded List" ainda não foi construído.
`;

const meta = {
  title: 'Componentes/Delphi/CardUploader',
  component: TWTCardUploader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: componentDocs } },
  },
  argTypes: {
    Estado: { control: 'select', options: ['Default', 'Uploading', 'Alert'] },
    OnEscolherArquivo: { action: 'OnEscolherArquivo' },
  },
  args: {
    Titulo: 'Escolha ou arraste arquivos para enviar',
    Subtitulo: 'Formatos: TXT, XSL, PDF, DOC, JPG, PNG (2MB)',
    Estado: 'Default',
    OnEscolherArquivo: fn(),
  },
} satisfies Meta<typeof TWTCardUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Estados: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <TWTCardUploader Estado="Default" />
      <TWTCardUploader Estado="Uploading" Titulo="Atualizando..." Subtitulo="4 minutos restantes" />
      <TWTCardUploader Estado="Alert" Titulo="Falha no envio" Subtitulo="Tente novamente" />
    </div>
  ),
};
