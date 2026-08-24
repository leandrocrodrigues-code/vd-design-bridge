import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoTabs } from './PoTabs';

const items = [
  { key: '1', label: 'Tab 1' },
  { key: '2', label: 'Tab 2' },
  { key: '3', label: 'Tab 3' },
];

const meta = {
  title: 'POUi/Tabs',
  component: PoTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Preview do **po-tabs** (Figma node `3635:7682`, página "Tabs ✅"). Confirmado: Default bg `surface/card` + texto `content/pure`; Active bg `surface/brand/pure` + texto `content/on-brand`. Doc oficial: https://po-ui.io/documentation/po-tabs',
      },
    },
  },
  args: { items, active: '1' },
} satisfies Meta<typeof PoTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive() {
  const [active, setActive] = useState('1');
  return <PoTabs items={items} active={active} onChange={setActive} />;
}

export const Playground: Story = {
  render: () => <Interactive />,
};
