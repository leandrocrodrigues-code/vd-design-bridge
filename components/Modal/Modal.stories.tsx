import type { Meta, StoryObj } from '@storybook/react-vite';
import { TWTModal } from './Modal';

const componentDocs = `
Representação visual do **TWTModal** da biblioteca Delphi
(\`documentacaotdneng/Modal.pdf\`, https://tdn.totvs.com/display/DGP/Modal).

> "O componente WTModal exibe um contêiner (formulário) com estilo
> padronizado, incluindo bordas arredondadas." — descrição oficial do TDN.

**Classe:** \`TWTModal\` — **Herança:** \`TComponent\`

As quatro props documentadas no TDN são reais: \`FullHeight\`, \`Movable\`,
\`RoundedBorder\`, \`ShowCloseButton\`. O componente nativo não documenta
Métodos nem Eventos (todos "N/A" no PDF) — o fechamento no Delphi é feito
externamente, pelo próprio form que instancia o modal:

\`\`\`pascal
procedure TForm1.btnExibirModalClick(Sender: TObject);
begin
  frmModalBranco := TfrmModalBranco.Create(Self);
  try
    frmModalBranco.ShowModal;
  finally
    FreeAndNil(frmModalBranco)
  end;
end;
\`\`\`

### Divergência real (documentada, não inventada)

O PDF do TDN **não traz uma imagem do visual renderizado** — só a tabela de
propriedades e o exemplo de código acima. O chrome visual (overlay,
cabeçalho, borda, alça de arrasto) é uma interpretação nossa para tornar as
4 props inspecionáveis, estruturada a partir do padrão já usado no
\`PoModal\`, e não deve ser lida como um recorte literal de uma imagem do
PDF — porque essa imagem não existe na fonte.
`;

const meta = {
  title: 'Componentes/Delphi/Modal',
  component: TWTModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: componentDocs } },
  },
  argTypes: {
    FullHeight: { control: 'boolean', description: 'Propriedade FullHeight do TWTModal.' },
    Movable: { control: 'boolean', description: 'Propriedade Movable do TWTModal (arrasto não implementado nesta preview).' },
    RoundedBorder: { control: 'boolean', description: 'Propriedade RoundedBorder do TWTModal.' },
    ShowCloseButton: { control: 'boolean', description: 'Propriedade ShowCloseButton do TWTModal.' },
    Title: { control: 'text', description: 'Apenas para documentação/inspeção no Storybook.' },
    children: { control: 'text', description: 'Apenas para documentação/inspeção no Storybook.' },
    OnClose: { action: 'OnClose' },
  },
  args: {
    FullHeight: false,
    Movable: false,
    RoundedBorder: true,
    ShowCloseButton: true,
    Title: 'Titulo do modal',
  },
} satisfies Meta<typeof TWTModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const RoundedBorderOffVsOn: Story = {
  name: 'RoundedBorder: false vs true',
  render: () => (
    <div className="flex flex-wrap gap-6">
      <TWTModal Title="RoundedBorder = false" RoundedBorder={false} />
      <TWTModal Title="RoundedBorder = true" RoundedBorder />
    </div>
  ),
};

export const SemBotaoFechar: Story = {
  name: 'ShowCloseButton = false',
  args: { ShowCloseButton: false },
};

export const Movel: Story = {
  name: 'Movable = true',
  parameters: {
    docs: {
      description: {
        story: 'A alça (⠿) sinaliza `Movable = true`; o arrasto em si não é implementado nesta preview estática.',
      },
    },
  },
  args: { Movable: true },
};

export const AlturaTotal: Story = {
  name: 'FullHeight = true',
  args: { FullHeight: true },
};
