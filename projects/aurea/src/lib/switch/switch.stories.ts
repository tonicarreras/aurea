import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { AuSwitch } from './switch';

const meta: Meta<AuSwitch> = {
  title: 'Aurea/Switch',
  component: AuSwitch,
  tags: ['autodocs', 'au'],
  parameters: { layout: 'padded' },
  args: {
    checkedChange: fn(),
    blur: fn(),
  },
};

export default meta;
type Story = StoryObj<AuSwitch>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    checked: false,
  },
};

export const On: Story = {
  args: {
    label: 'Enabled',
    checked: true,
  },
};

export const WithHint: Story = {
  args: {
    label: 'Marketing emails',
    hint: 'You can change this anytime in settings.',
    checked: false,
  },
};
