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

**Fonte visual:** o PDF do TDN não traz uma imagem do visual renderizado —
só a tabela de propriedades e o exemplo de código acima. A geometria e o
estilo abaixo (sombra \`0px 6px 16px rgba(0,0,0,.08)\`, padding 32px, raio
12px, botão de fechar 40×40 flutuante no canto superior direito) vêm do
Figma MCP, componente **Modal (Template)** do arquivo \`MCP Design System
V&D — UI KIT Desktop\`
([node 13095:53662](https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=13095-53662)),
cuja anatomia documentada é: **Header** (slot opcional) + **Content** (slot
opcional) + **Action** (slot opcional).

\`Header\`, \`Content\` e \`Actions\` existem só para documentação/inspeção no
Storybook — o \`TWTModal\` Delphi não nomeia slots explicitamente, é o form
inteiro que é exibido via \`ShowModal\`.

### Divergência real (documentada, não inventada)

\`Movable\` (arrastável pelo usuário) **não tem indicador visual em nenhuma
das duas fontes** (nem no PDF do TDN, nem no componente do Figma) — por
isso esta preview não desenha nenhum afford visual para essa prop. Ela
continua existindo no contrato (\`TWTModalProps.Movable\`), documentada como
real, mas sem representação visual inventada.
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
    Movable: { control: 'boolean', description: 'Propriedade Movable do TWTModal. Sem representação visual (ver nota de divergência).' },
    RoundedBorder: { control: 'boolean', description: 'Propriedade RoundedBorder do TWTModal.' },
    ShowCloseButton: { control: 'boolean', description: 'Propriedade ShowCloseButton do TWTModal.' },
    Header: { control: 'text', description: 'Apenas para documentação/inspeção no Storybook — slot Header da anatomia do Figma.' },
    Content: { control: 'text', description: 'Apenas para documentação/inspeção no Storybook — slot Content da anatomia do Figma.' },
    Actions: { control: 'text', description: 'Apenas para documentação/inspeção no Storybook — slot Action da anatomia do Figma.' },
    OnClose: { action: 'OnClose' },
  },
  args: {
    FullHeight: false,
    Movable: false,
    RoundedBorder: true,
    ShowCloseButton: true,
    Header: 'Header',
    Content: 'Content',
    Actions: 'Action',
  },
} satisfies Meta<typeof TWTModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const RoundedBorderOffVsOn: Story = {
  name: 'RoundedBorder: false vs true',
  render: () => (
    <div className="flex flex-wrap gap-6">
      <TWTModal Header="RoundedBorder = false" RoundedBorder={false} />
      <TWTModal Header="RoundedBorder = true" RoundedBorder />
    </div>
  ),
};

export const SemBotaoFechar: Story = {
  name: 'ShowCloseButton = false',
  args: { ShowCloseButton: false },
};

export const AlturaTotal: Story = {
  name: 'FullHeight = true',
  args: { FullHeight: true },
};

export const SemAction: Story = {
  name: 'Has Action = false (anatomia)',
  parameters: {
    docs: {
      description: {
        story: 'Os três slots (Header/Content/Action) são opcionais na anatomia documentada no Figma — aqui com o slot Action omitido.',
      },
    },
  },
  args: { Actions: undefined },
};
