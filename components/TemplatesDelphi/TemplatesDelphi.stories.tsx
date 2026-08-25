import type { Meta, StoryObj } from '@storybook/react-vite';

const docs = `
🚧 **Em construção.** Ainda não temos nenhuma tela de referência montada
com os componentes Delphi (\`TWTButton\`, \`TWTCheckBox\`) — o catálogo
Delphi neste Storybook tem só 2 componentes até agora, poucos pra montar
uma tela completa.

Segue o mesmo padrão de **Templates POUi**: quando o usuário mandar uma
tela de referência (Figma, PDF ou screenshot) montada com componentes
Delphi, ela entra aqui como uma nova story — tela completa reconstruída
só com os componentes já existentes no catálogo Delphi, documentando
qualquer divergência real encontrada pelo caminho.
`;

const meta = {
  title: 'Templates Delphi/Em construção',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: docs } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  render: () => (
    <div style={{ fontFamily: 'Lato, sans-serif', color: '#8e8e8e', padding: '48px', textAlign: 'center' }}>
      Nenhum template Delphi ainda — ver descrição acima.
    </div>
  ),
};
