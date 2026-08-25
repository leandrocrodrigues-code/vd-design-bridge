import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoStepper } from './PoStepper';

const steps = [{ label: 'Label' }, { label: 'Label' }, { label: 'Label' }];

const meta = {
  title: 'Componentes/POUi/Stepper',
  component: PoStepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Preview do **po-stepper** (Figma node `3624:6575`, página "Stepper ✅"). Tokens reais: `--background-done/-current`, `--color-icon-done/-current/-next`, `--color-line-done`. Doc oficial: https://po-ui.io/documentation/po-stepper',
      },
    },
  },
  args: { steps, step: 2 },
} satisfies Meta<typeof PoStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
