import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoRadioGroup } from './PoRadioGroup';

const mappingDocs = `
Preview do **po-radio-group** da PO-UI com os tokens do Design System V&D.

**Origem do design:** Figma \`MCP Design System V&D — UI KIT Desktop\`,
frame \`Radio\` (node \`236:883\`), página "Checkbox ✅" (Radio fica na mesma
página). 8 combos State × Sub-state lidos nó a nó (SM) — MD confirmado como
mesma cor, só escala maior.

**Doc oficial:** https://po-ui.io/documentation/po-radio-group

### Divergência real, registrada — decisão tomada com o usuário

O Figma tem um item **"Radio" isolado**, variante por variante, igual ao
Checkbox. Mas a PO-UI **não tem \`po-radio\` avulso** — só \`po-radio-group\`
(\`@Input options: PoRadioGroupOption[]\`, \`@Input name\` obrigatório),
que gerencia a seleção única internamente. Decisão: construir o
**\`PoRadioGroup\` real**, com a API oficial, em vez de simular um item
solto que nunca existe sozinho na implementação Angular de verdade.

### Mapeamento Figma → PO-UI

| Figma | PO-UI | Observação |
|---|---|---|
| \`State=Default/Active\` (por item) | seleção via \`options\`/\`ngModel\` | um item vira \`checked\` por vez |
| \`Sub-state=Hover/Focused\` | CSS (\`:hover\`, \`:focus-within\`) | não são variantes |
| \`Size=SM/MD\` | \`p-size="small"/"medium"\` | equivalente direto |
| \`Has Primary/Secondary Text\` | \`option.label\` | Figma tem 2 linhas (label + description); \`po-radio-group\` só tem 1 linha de texto por opção — sem equivalente pro texto secundário, não implementado |

Cores confirmadas via SVG exportado do Figma (estado Checked usa asset, não
CSS puro): outer fill \`#00DBFF\` (surface/brand/pure) + dot \`#002233\`
(content/on-brand) no Default; outer fill \`#1E3DA1\` (surface/brand/highlight)
+ dot branco no Hover; disabled outer \`#DFE4EC\` + dot \`#8E8E8E\`.
`;

const meta = {
  title: 'POUi/Radio Group',
  component: PoRadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  argTypes: {
    label: { control: 'text', description: 'p-label' },
    help: { control: 'text', description: 'p-help' },
    name: { control: 'text', description: 'p-name (obrigatório)' },
    columns: { control: 'number', description: 'p-columns' },
    size: { control: 'select', options: ['small', 'medium'], description: 'p-size' },
    disabled: { control: 'boolean', description: 'p-disabled' },
    required: { control: 'boolean', description: 'p-required' },
    previewState: {
      control: 'select',
      options: ['Default', 'Hover', 'Focused'],
      description: 'Só pra inspeção visual no Storybook (aplica no 1º item habilitado).',
    },
  },
  args: {
    label: 'Forma de envio',
    name: 'shipping',
    columns: 1,
    size: 'medium',
    disabled: false,
    required: false,
    previewState: 'Default',
    options: [
      { label: 'Retirar na loja', value: 'pickup' },
      { label: 'Entrega padrão', value: 'standard' },
      { label: 'Entrega expressa', value: 'express' },
    ],
  },
} satisfies Meta<typeof PoRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const angular = (code: string) => ({ docs: { source: { code, language: 'html' } } });

function Interactive(props: Parameters<typeof PoRadioGroup>[0]) {
  const [value, setValue] = useState(props.value ?? props.options[0]?.value);
  return <PoRadioGroup {...props} value={value} onChange={setValue} />;
}

export const Playground: Story = {
  render: (args) => <Interactive {...args} />,
  parameters: angular(`<po-radio-group
  p-label="Forma de envio"
  p-name="shipping"
  [p-options]="[
    { label: 'Retirar na loja', value: 'pickup' },
    { label: 'Entrega padrão', value: 'standard' },
    { label: 'Entrega expressa', value: 'express' }
  ]"
  [(ngModel)]="value">
</po-radio-group>`),
};

export const States: Story = {
  name: 'Sub-states (Figma)',
  parameters: angular(`<!-- Sub-states não são variantes: são CSS.
     :hover e :focus-within no próprio po-radio-group. -->
<po-radio-group p-name="a" [p-options]="opts"></po-radio-group>
<po-radio-group p-name="b" [p-options]="opts" p-disabled></po-radio-group>`),
  render: () => (
    <div style={{ display: 'grid', gap: '12px' }}>
      {(['unchecked', 'checked'] as const).map((state) => (
        <div key={state} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <code style={{ width: '96px', fontSize: '11px', color: '#8e8e8e' }}>{state}</code>
          {(['Default', 'Hover', 'Focused'] as const).map((sub) => (
            <PoRadioGroup
              key={sub}
              name={`preview-${state}-${sub}`}
              options={[{ label: sub, value: '1' }]}
              value={state === 'checked' ? '1' : undefined}
              previewState={sub}
            />
          ))}
          <PoRadioGroup
            name={`preview-${state}-disabled`}
            options={[{ label: 'Disabled', value: '1' }]}
            value={state === 'checked' ? '1' : undefined}
            disabled
          />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: angular(`<po-radio-group p-name="sm" p-size="small" [p-options]="opts" [(ngModel)]="value"></po-radio-group>
<po-radio-group p-name="md" p-size="medium" [p-options]="opts" [(ngModel)]="value"></po-radio-group>`),
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <PoRadioGroup name="sm" size="small" value="1" options={[{ label: 'Small', value: '1' }]} />
      <PoRadioGroup name="md" size="medium" value="1" options={[{ label: 'Medium', value: '1' }]} />
    </div>
  ),
};

export const Columns: Story = {
  render: () => (
    <PoRadioGroup
      label="Preferência"
      name="columns-demo"
      columns={2}
      value="a"
      options={[
        { label: 'Opção A', value: 'a' },
        { label: 'Opção B', value: 'b' },
        { label: 'Opção C', value: 'c' },
        { label: 'Opção D', value: 'd', disabled: true },
      ]}
    />
  ),
};
