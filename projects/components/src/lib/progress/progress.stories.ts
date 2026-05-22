import type { Meta, StoryObj } from '@storybook/angular';

import { AuProgress } from './progress';

const meta: Meta<AuProgress> = {
  title: 'Aurea/Progress',
  component: AuProgress,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
    docs: {
      extractArgTypes: () => ({}),
      description: { component: 'Determinate or indeterminate progress bar with ARIA progressbar.' },
    },
  },
  argTypes: {
    mode: { control: 'select', options: ['determinate', 'indeterminate'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
    max: { control: 'number' },
    label: { control: 'text' },
  },
  args: { mode: 'determinate', value: 45, max: 100, label: '' },
};

export default meta;
type Story = StoryObj<AuProgress>;

export const Determinate: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [AuProgress] },
    template: `<div style="max-width:20rem"><au-progress [mode]="mode" [value]="value" [max]="max" [label]="label" /></div>`,
  }),
};

export const Indeterminate: Story = {
  args: { mode: 'indeterminate' },
  render: Determinate.render,
};
