import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoCombo } from './PoCombo';

const options = [
  { label: 'Abacaxi', value: 'abacaxi' },
  { label: 'Banana', value: 'banana' },
  { label: 'Laranja', value: 'laranja' },
  { label: 'Maçã', value: 'maca' },
];

const meta = {
  title: 'Componentes/POUi/Combo (Combobox)',
  component: PoCombo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Preview do **po-combo** — versão filtrável do po-select (Figma "Combobox", node `10967:86715`, página "Forms ✅"). Mesmo campo visual do Input/Select. Doc oficial: https://po-ui.io/documentation/po-combo',
      },
    },
  },
  args: { label: 'Fruta', placeholder: 'Digite pra filtrar', options },
} satisfies Meta<typeof PoCombo>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive() {
  const [value, setValue] = useState<string>();
  return <PoCombo label="Fruta" placeholder="Digite pra filtrar" options={options} value={value} onChange={setValue} />;
}

export const Playground: Story = {
  render: () => <Interactive />,
};
