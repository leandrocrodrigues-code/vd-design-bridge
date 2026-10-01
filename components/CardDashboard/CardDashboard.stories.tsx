import type { Meta, StoryObj } from '@storybook/react-vite';
import { TWTCardDashboard } from './CardDashboard';

const componentDocs = `
**TWTCardDashboard** — sem equivalente no PDF do TDN. Nasce da
modernização do Design System V&D, componente **Card Dashboard** do Figma
([node 12109:8231](https://www.figma.com/design/LO37QXwojd3vklS4R2mGqJ?node-id=12109-8231)).

O prefixo \`TWT\` antecipa o nome que o time Delphi provavelmente vai usar
ao criar essa classe — é uma **proposta de contrato**, não um nome
confirmado pela documentação TDN.

**Regra de fidelidade:** o Figma é a fonte da verdade visual, sempre.
`;

const meta = {
  title: 'Componentes/Delphi/CardDashboard',
  component: TWTCardDashboard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: componentDocs } },
  },
  args: {
    Titulo: 'Label Text',
    Valor: 'R$ 99.999,99',
    TagTexto: '+99%',
    TextoSuporteDestaque: '+R$ 99.999,99',
    TextoSuporte: 'Supporting Text',
  },
} satisfies Meta<typeof TWTCardDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
