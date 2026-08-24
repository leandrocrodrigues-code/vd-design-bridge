import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoCheckbox } from './PoCheckbox';

const mappingDocs = `
Preview do **po-checkbox** da PO-UI com os tokens do Design System V&D.

**Origem do design:** Figma \`MCP Design System V&D — UI KIT Desktop\`,
frame \`Checkbox\` (node \`236:134\`), página "Checkbox ✅". 12 combos
State × Sub-state lidas nó a nó (SM) — MD confirmado como mesma cor, só
escala maior.

**Doc oficial:** https://po-ui.io/documentation/po-checkbox

### Mapeamento Figma → PO-UI

| Figma | PO-UI | Observação |
|---|---|---|
| \`State=Unchecked/Checked\` | \`p-model\`/\`checked\` | equivalente direto |
| \`Sub-state=Hover/Focused\` | CSS (\`:hover\`, \`:focus-visible\`) | não são variantes |
| \`Size=SM/MD\` | \`p-size="small"/"medium"\` | equivalente direto |
| \`Has Label Text\` | \`p-label\` | equivalente direto |

### Duas divergências reais — registradas, não resolvidas

**1. Indeterminate.** O Figma tem 3 \`State\`: Unchecked, Checked,
Indeterminate. A lista de \`@Input\` do po-checkbox
(po-ui.io/llms-generated/po-checkbox.md) **não lista** \`indeterminate\`
nem \`p-indeterminate\`. Um \`<input type="checkbox">\` nativo suporta
\`.indeterminate\` como propriedade do DOM (não é atributo refletido), então
é plausível que o componente Angular real aceite via
\`[indeterminate]="true"\` no elemento nativo por baixo — mas isso não está
confirmado. Implementado aqui como extensão V&D (funciona visualmente,
usa o mesmo padrão de cor do Checked), com \`TODO\` no código pra alguém
confirmar contra o componente Angular real antes de considerar isso a
tradução oficial.

**2. Texto secundário (Has Secondary Text no Figma).** O po-checkbox tem
\`help\` e \`additionalHelpTooltip\`, mas ambos renderizam diferente de uma
segunda linha fixa abaixo do label (um é helper text, o outro é tooltip).
Não confirmei que algum dos dois seja a tradução real do "Secondary Text"
do Figma. Implementado como prop própria (\`secondaryText\`), documentada
como extensão, não mapeada pra nenhum \`p-*\` existente.
`;

const meta = {
  title: 'POUi/Checkbox',
  component: PoCheckbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  argTypes: {
    label: { control: 'text', description: 'p-label' },
    secondaryText: { control: 'text', description: 'Extensão V&D — sem @Input oficial confirmado' },
    size: { control: 'select', options: ['small', 'medium'], description: 'p-size' },
    disabled: { control: 'boolean', description: 'p-disabled' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean', description: 'Extensão V&D — sem @Input oficial confirmado' },
    previewState: {
      control: 'select',
      options: ['Default', 'Hover', 'Focused'],
      description: 'Só pra inspeção visual no Storybook.',
    },
  },
  args: {
    label: 'Aceito os termos',
    size: 'medium',
    disabled: false,
    checked: false,
    indeterminate: false,
    previewState: 'Default',
  },
} satisfies Meta<typeof PoCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const angular = (code: string) => ({ docs: { source: { code, language: 'html' } } });

function Interactive(props: Parameters<typeof PoCheckbox>[0]) {
  const [checked, setChecked] = useState(props.checked ?? false);
  return <PoCheckbox {...props} checked={checked} onChange={setChecked} />;
}

export const Playground: Story = {
  render: (args) => <Interactive {...args} />,
  parameters: angular(`<po-checkbox p-label="Aceito os termos" [(ngModel)]="value"></po-checkbox>`),
};

export const States: Story = {
  name: 'Sub-states (Figma)',
  parameters: angular(`<!-- Sub-states não são variantes: são CSS.
     :hover e :focus-visible no próprio po-checkbox. -->
<po-checkbox p-label="Default"></po-checkbox>
<po-checkbox p-label="Disabled" p-disabled></po-checkbox>`),
  render: () => (
    <div style={{ display: 'grid', gap: '12px' }}>
      {(['unchecked', 'checked', 'indeterminate'] as const).map((state) => (
        <div key={state} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <code style={{ width: '96px', fontSize: '11px', color: '#8e8e8e' }}>{state}</code>
          <PoCheckbox
            label="Default"
            checked={state === 'checked'}
            indeterminate={state === 'indeterminate'}
            previewState="Default"
          />
          <PoCheckbox
            label="Hover"
            checked={state === 'checked'}
            indeterminate={state === 'indeterminate'}
            previewState="Hover"
          />
          <PoCheckbox
            label="Focused"
            checked={state === 'checked'}
            indeterminate={state === 'indeterminate'}
            previewState="Focused"
          />
          <PoCheckbox
            label="Disabled"
            checked={state === 'checked'}
            indeterminate={state === 'indeterminate'}
            disabled
          />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: angular(`<po-checkbox p-label="Small" p-size="small" p-model="true"></po-checkbox>
<po-checkbox p-label="Medium" p-size="medium" p-model="true"></po-checkbox>`),
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <PoCheckbox label="Small" size="small" checked />
      <PoCheckbox label="Medium" size="medium" checked />
    </div>
  ),
};

export const WithSecondaryText: Story = {
  name: 'Texto secundário (extensão V&D)',
  render: () => (
    <PoCheckbox
      label="Notificações por e-mail"
      secondaryText="Receba atualizações importantes sobre sua conta"
      checked
    />
  ),
};
