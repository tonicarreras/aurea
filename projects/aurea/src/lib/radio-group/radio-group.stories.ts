import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { RadioGroup, RadioOption } from './radio-group';

const sample: RadioOption[] = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
  { value: 'none', label: 'None' },
];

const meta: Meta<RadioGroup> = {
  title: 'Aurea/Radio group',
  component: RadioGroup,
  tags: ['autodocs', 'au'],
  parameters: { layout: 'padded' },
  args: {
    options: sample,
    valueChange: fn(),
    blur: fn(),
  },
};

export default meta;
type Story = StoryObj<RadioGroup>;

export const Default: Story = {
  args: {
    label: 'Contact preference',
    value: 'email',
  },
};

export const Required: Story = {
  args: {
    label: 'Pick one',
    required: true,
    value: '',
  },
};
