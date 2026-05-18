import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { InputDate } from './input-date';

const meta: Meta<InputDate> = {
  title: 'Aurea/Input date',
  component: InputDate,
  tags: ['autodocs', 'au'],
  parameters: { layout: 'padded' },
  args: {
    valueChange: fn(),
    blur: fn(),
  },
};

export default meta;
type Story = StoryObj<InputDate>;

export const Default: Story = {
  args: {
    label: 'Start date',
    value: '',
    hint: 'Uses the native date picker where available.',
  },
};

export const WithBounds: Story = {
  args: {
    label: 'Booking',
    value: '2026-06-01',
    minDate: '2026-01-01',
    maxDate: '2026-12-31',
  },
};
