import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoSwitch } from './PoSwitch';

const mappingDocs = `
Preview do **po-switch** da PO-UI com os tokens do Design System V&D.

**Origem do design:** Figma \`MCP Design System V&D — UI KIT Desktop\`,
frame **"Toggle"** (node \`859:3990\`), página "Toggle ✅".

**Doc oficial:** https://po-ui.io/documentation/po-switch

⚠️ **Nota de nomenclatura**: o componente se chama "Toggle" no Figma, mas o
equivalente real da PO-UI é o **po-switch** — não existe \`po-toggle\`.

### Cores por estado (extraídas do SVG — o Figma não expõe CSS var aqui)

| State | Track | Knob |
|---|---|---|
| Off | \`surface/container\` #dfe4ec | \`surface/pure\` (branco) |
| On | \`surface/brand/container\` #a0f2ff | \`surface/brand/highlight\` #1e3da1 |
| Disabled | \`surface/container\` #dfe4ec | \`content/03\` #8e8e8e |

⚠️ **Pendência**: o Figma só tem 3 \`State\` (Off/On/Disabled), **sem**
Sub-state Hover/Focused — diferente de Button/Checkbox/Radio, que têm os
4. O hover/focus implementados aqui são inferência nossa (mesmo padrão de
escurecer no hover que os outros componentes seguem), não validados nó a
nó porque a variante não existe no Figma. Se o design tiver essa
especificação em outro lugar, precisa reconciliar.

MD (56×32) também não está confirmado nó a nó — só SM foi lido; MD segue
escala proporcional.
`;

const meta = {
  title: 'Componentes/POUi/Switch (Toggle)',
  component: PoSwitch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: mappingDocs } },
  },
  argTypes: {
    label: { control: 'text', description: 'p-label' },
    size: { control: 'select', options: ['small', 'medium'], description: 'p-size' },
    disabled: { control: 'boolean', description: 'p-disabled' },
    checked: { control: 'boolean' },
  },
  args: {
    label: 'Notificações ativas',
    size: 'medium',
    disabled: false,
    checked: false,
  },
} satisfies Meta<typeof PoSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

const angular = (code: string) => ({ docs: { source: { code, language: 'html' } } });

function Interactive(props: Parameters<typeof PoSwitch>[0]) {
  const [checked, setChecked] = useState(props.checked ?? false);
  return <PoSwitch {...props} checked={checked} onChange={setChecked} />;
}

export const Playground: Story = {
  render: (args) => <Interactive {...args} />,
  parameters: angular(`<po-switch p-label="Notificações ativas" [(ngModel)]="value"></po-switch>`),
};

export const States: Story = {
  name: 'States (Figma)',
  parameters: angular(`<po-switch p-label="Off"></po-switch>
<po-switch p-label="On" [ngModel]="true"></po-switch>
<po-switch p-label="Disabled" p-disabled></po-switch>`),
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <PoSwitch label="Off" checked={false} />
      <PoSwitch label="On" checked />
      <PoSwitch label="Disabled" checked={false} disabled />
      <PoSwitch label="Disabled + On" checked disabled />
    </div>
  ),
};

export const Sizes: Story = {
  parameters: angular(`<po-switch p-label="Small" p-size="small" [ngModel]="true"></po-switch>
<po-switch p-label="Medium" p-size="medium" [ngModel]="true"></po-switch>`),
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <PoSwitch label="Small" size="small" checked />
      <PoSwitch label="Medium" size="medium" checked />
    </div>
  ),
};
