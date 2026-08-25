import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { PoButton } from './PoButton';

const mappingDocs = `
Preview do **po-button** da PO-UI com os tokens do Design System V&D.

**Origem do design:** Figma \`MCP Design System V&D — UI KIT Desktop\`,
frame \`Button\` (node \`3624:6970\`). Cada Sub-state foi lido nó a nó pelo MCP
do Figma — as cores abaixo não são convenção nossa, são o que está no arquivo.

**Doc oficial:** https://po-ui.io/documentation/po-button

### Mapeamento Figma → PO-UI

| Figma | PO-UI | Observação |
|---|---|---|
| \`Hierarchy=Primary\` | \`p-kind="primary"\` | equivalente direto |
| \`Hierarchy=Secondary\` | \`p-kind="secondary"\` | é o padrão da PO-UI |
| \`Hierarchy=Tertiary\` | \`p-kind="tertiary"\` | equivalente direto |
| \`Type=Brand\` | (padrão) | — |
| \`Type=Alert\` | \`p-danger\` | equivalente oficial |
| \`Type=Success\` | **extensão V&D** | não existe na PO-UI — vira a classe \`.vd-po-button--success\` por cima do \`p-kind\`, nunca uma prop inventada |
| \`Sub-state=Hover/Pressed/Focus\` | CSS (\`:hover\`, \`:active\`, \`:focus-visible\`) | não são variantes de componente |
| \`Size=SM/MD/LG\` | \`p-size="small/medium/large"\` | **alturas divergem** — ver abaixo |
| ícone à direita | — | a PO-UI só tem \`p-icon\` (esquerda). Limitação aceita como está; Delphi/HTML não têm essa restrição |

### Regra de cor por estado (confirmada nos 9 combos Hierarchy × Type)

| Sub-state | Primary | Secondary | Tertiary |
|---|---|---|---|
| Default | \`<type>/pure\` + \`content/on-brand\` | \`<type>/container\` + \`<type>/highlight\` | \`surface/pure\` + \`<type>/highlight\` |
| Hover | \`<type>/highlight\` + \`content/inverse\` | idem | idem |
| Focus | bg do Default + borda 1px + glow \`0 0 0 4px rgba(...,.16)\` | idem | idem |
| Disabled | \`surface/container\` + \`content/03\` | idem | idem |

### Pendências conhecidas

- **Pressed:** no Figma o Pressed é pixel a pixel **idêntico ao Default**
  (nós \`3624:6971\` vs \`3624:7043\` — mesmo fill, mesmo text color, sem
  overlay). Tratado como gap de design, não como intenção: usando Highlight
  como aproximação temporária até o time de design confirmar.
- **Altura:** a PO-UI documenta \`p-size\` como 32/44/56px; o Figma usa
  32/40/48px. Este componente segue a PO-UI, porque altura não é um token
  customizável do po-button — quem renderiza é o \`<po-button>\` real.
  Precisa de decisão de design se o alvo for bater com o Figma.
- **Focus de Secondary/Tertiary em Alert/Success:** a cor da borda foi
  inferida do padrão confirmado em Brand (onde os três hierarchies foram
  lidos). Os nós Primary de Alert e Success foram lidos direto.
`;

const meta = {
  title: 'Componentes/POUi/Button',
  component: PoButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  argTypes: {
    label: { control: 'text', description: 'p-label' },
    kind: { control: 'select', options: ['primary', 'secondary', 'tertiary'], description: 'p-kind' },
    size: { control: 'select', options: ['small', 'medium', 'large'], description: 'p-size' },
    type: { control: 'select', options: ['button', 'submit', 'reset'], description: 'p-type' },
    danger: { control: 'boolean', description: 'p-danger (Type=Alert no Figma)' },
    success: { control: 'boolean', description: 'Extensão V&D — classe .vd-po-button--success (Type=Success no Figma)' },
    disabled: { control: 'boolean', description: 'p-disabled' },
    loading: { control: 'boolean', description: 'p-loading' },
    ariaLabel: { control: 'text', description: 'p-aria-label' },
    previewState: {
      control: 'select',
      options: ['Default', 'Hover', 'Pressed', 'Focus'],
      description: 'Só pra inspeção visual no Storybook.',
    },
    icon: { control: false },
    onClick: { action: '(p-click)' },
  },
  args: {
    label: 'Confirmar',
    kind: 'primary',
    size: 'medium',
    type: 'button',
    danger: false,
    success: false,
    disabled: false,
    loading: false,
    previewState: 'Default',
    onClick: fn(),
  },
} satisfies Meta<typeof PoButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const angular = (code: string) => ({ docs: { source: { code, language: 'html' } } });

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
    {children}
  </div>
);

export const Playground: Story = {
  parameters: angular(`<po-button p-label="Confirmar" p-kind="primary" (p-click)="onClick()"></po-button>`),
};

export const Kinds: Story = {
  parameters: angular(`<po-button p-label="Confirmar" p-kind="primary"></po-button>
<po-button p-label="Confirmar" p-kind="secondary"></po-button>
<po-button p-label="Confirmar" p-kind="tertiary"></po-button>`),
  render: () => (
    <Row>
      <PoButton label="Confirmar" kind="primary" />
      <PoButton label="Confirmar" kind="secondary" />
      <PoButton label="Confirmar" kind="tertiary" />
    </Row>
  ),
};

export const Danger: Story = {
  name: 'Danger (Figma: Type=Alert)',
  parameters: angular(`<po-button p-label="Excluir" p-kind="primary" p-danger></po-button>
<po-button p-label="Excluir" p-kind="secondary" p-danger></po-button>
<po-button p-label="Excluir" p-kind="tertiary" p-danger></po-button>`),
  render: () => (
    <Row>
      <PoButton label="Excluir" kind="primary" danger />
      <PoButton label="Excluir" kind="secondary" danger />
      <PoButton label="Excluir" kind="tertiary" danger />
    </Row>
  ),
};

export const Success: Story = {
  name: 'Success (extensão V&D)',
  parameters: angular(`<!-- A PO-UI não tem variante success: é classe custom nossa,
     por cima do p-kind mais próximo. -->
<po-button p-label="Aprovar" p-kind="primary" class="vd-po-button--success"></po-button>
<po-button p-label="Aprovar" p-kind="secondary" class="vd-po-button--success"></po-button>
<po-button p-label="Aprovar" p-kind="tertiary" class="vd-po-button--success"></po-button>`),
  render: () => (
    <Row>
      <PoButton label="Aprovar" kind="primary" success />
      <PoButton label="Aprovar" kind="secondary" success />
      <PoButton label="Aprovar" kind="tertiary" success />
    </Row>
  ),
};

export const Sizes: Story = {
  parameters: angular(`<po-button p-label="Confirmar" p-size="small"></po-button>
<po-button p-label="Confirmar" p-size="medium"></po-button>
<po-button p-label="Confirmar" p-size="large"></po-button>`),
  render: () => (
    <Row>
      <PoButton label="Confirmar" kind="primary" size="small" />
      <PoButton label="Confirmar" kind="primary" size="medium" />
      <PoButton label="Confirmar" kind="primary" size="large" />
    </Row>
  ),
};

export const SubStates: Story = {
  name: 'Sub-states (Figma)',
  parameters: angular(`<!-- Sub-states não são variantes: são CSS.
     :hover, :active e :focus-visible no próprio po-button. -->
<po-button p-label="Confirmar" p-kind="primary"></po-button>
<po-button p-label="Confirmar" p-kind="primary" p-disabled></po-button>`),
  render: () => (
    <div style={{ display: 'grid', gap: '16px' }}>
      {(['primary', 'secondary', 'tertiary'] as const).map((kind) => (
        <Row key={kind}>
          <PoButton label="Default" kind={kind} previewState="Default" />
          <PoButton label="Hover" kind={kind} previewState="Hover" />
          <PoButton label="Pressed" kind={kind} previewState="Pressed" />
          <PoButton label="Focus" kind={kind} previewState="Focus" />
          <PoButton label="Disabled" kind={kind} disabled />
        </Row>
      ))}
    </div>
  ),
};

export const IconAndLoading: Story = {
  name: 'Ícone e loading',
  parameters: angular(`<po-button p-label="Usuário" p-icon="an an-user" p-kind="primary"></po-button>
<po-button p-label="Salvando" p-loading p-kind="primary"></po-button>`),
  render: () => (
    <Row>
      <PoButton label="Usuário" kind="primary" icon={<span>★</span>} />
      <PoButton label="Salvando" kind="primary" loading />
    </Row>
  ),
};
