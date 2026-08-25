import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoCardUploader } from './PoCardUploader';

const mappingDocs = `
Preview do **Card Uploader** com os tokens do Design System V&D.

**Origem do design:** PDF \`Componentespdf/Card Uploader.pdf\`. 4 estados:
dropzone vazia, upload em progresso, erro (com "Tentar novamente"), e
lista de arquivos enviados (com remover/ver arquivo).

### Divergência real — registrada, não resolvida

**Não é um componente \`po-*\`.** A PO-UI tem um componente de upload
diferente e mais simples — não confirmado como equivalente 1:1 desses 4
estados visuais específicos do Figma.

**Doc PO-UI:** https://po-ui.io — não há uma página específica pra este componente (composição própria, sem \`po-*\` direto).
`;

const meta = {
  title: 'Componentes/POUi/Cards/Uploader',
  component: PoCardUploader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
} satisfies Meta<typeof PoCardUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dropzone: Story = {};

export const Uploading: Story = {
  args: { uploadProgress: 50 },
};

export const Error: Story = {
  args: { errorMessage: 'Erro ao enviar o arquivo' },
};

export const FileList: Story = {
  name: 'Lista de arquivos',
  args: {
    files: [
      { name: 'Nome do Arquivo', size: '3mb', extension: 'pdf' },
      { name: 'Nome do Arquivo', size: '3mb', extension: 'pdf' },
      { name: 'Nome do Arquivo', size: '3mb', extension: 'pdf' },
    ],
  },
};
