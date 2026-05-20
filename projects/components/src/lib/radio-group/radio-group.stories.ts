import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { AuRadioGroup, AuRadioOption } from './radio-group';

const sample: AuRadioOption[] = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
  { value: 'none', label: 'None' },
];

const meta: Meta<AuRadioGroup> = {
  title: 'Aurea/Radio group',
  component: AuRadioGroup,
  tags: ['autodocs', 'au'],
  parameters: { layout: 'padded' },
  args: {
    options: sample,
    valueChange: fn(),
    blur: fn(),
  },
};

export default meta;
type Story = StoryObj<AuRadioGroup>;

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
