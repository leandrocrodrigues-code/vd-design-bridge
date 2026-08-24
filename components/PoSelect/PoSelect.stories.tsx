import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoSelect } from './PoSelect';

const docs = `
Preview do **po-select** (Figma "Dropdown", node \`265:1447\`, página "Forms ✅").

O campo em si usa exatamente o mesmo visual do po-input (confirmado
lendo o design context — mesma cor/borda/padding), só adiciona o Chevron
e a lista suspensa. Não repeti a leitura nó a nó dos 6 States porque a
estrutura já estava validada no Input.

**Doc oficial:** https://po-ui.io/documentation/po-select
`;

const options = [
  { label: 'São Paulo', value: 'sp' },
  { label: 'Rio de Janeiro', value: 'rj' },
  { label: 'Minas Gerais', value: 'mg' },
];

const meta = {
  title: 'POUi/Select (Dropdown)',
  component: PoSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: docs } },
  },
  args: { label: 'Estado', placeholder: 'Selecione', options },
} satisfies Meta<typeof PoSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive() {
  const [value, setValue] = useState<string>();
  return <PoSelect label="Estado" placeholder="Selecione" options={options} value={value} onChange={setValue} />;
}

export const Playground: Story = {
  render: () => <Interactive />,
};

export const Disabled: Story = {
  args: { disabled: true },
};
