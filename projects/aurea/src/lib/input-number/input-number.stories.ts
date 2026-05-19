import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { AuInputNumber } from './input-number';

const meta: Meta<AuInputNumber> = {
  title: 'Aurea/Input number',
  component: AuInputNumber,
  tags: ['autodocs', 'au'],
  parameters: { layout: 'padded' },
  args: {
    valueChange: fn(),
    blur: fn(),
  },
};

export default meta;
type Story = StoryObj<AuInputNumber>;

export const Default: Story = {
  args: {
    label: 'Quantity',
    placeholder: '0',
    value: null,
  },
};

export const WithBounds: Story = {
  args: {
    label: 'Port',
    min: 1,
    max: 65535,
    step: 1,
    value: 8080,
  },
};
