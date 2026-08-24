import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoSearch } from './PoSearch';

const meta = {
  title: 'POUi/Search',
  component: PoSearch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Preview do **po-search** (Figma node `321:8197`, página "Search ✅"). Reaproveita os tokens do po-input — mesmo campo visual confirmado nos 7 States. Doc oficial: https://po-ui.io/documentation/po-search',
      },
    },
  },
} satisfies Meta<typeof PoSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive() {
  const [value, setValue] = useState('');
  return <PoSearch value={value} onChange={setValue} onClear={() => setValue('')} />;
}

export const Playground: Story = {
  render: () => <Interactive />,
};

export const Disabled: Story = {
  render: () => <PoSearch disabled />,
};
