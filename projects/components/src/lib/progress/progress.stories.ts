import type { Meta, StoryObj } from '@storybook/angular';
import { getStoryOverview } from '../story-docs/get-story-overview';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuProgress } from './progress';

const docsOverview = getStoryOverview('progress');

const meta: Meta<AuProgress> = {
  title: 'Aurea/Progress',
  component: AuProgress,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters(docsOverview),
  argTypes: {
    mode: {
      control: 'select',
      options: ['determinate', 'indeterminate'],
      description: 'Determinate shows a fill ratio; indeterminate animates.',
      table: { category: 'Behavior' },
    },
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Current value (determinate only).',
      table: { category: 'State' },
    },
    max: {
      control: 'number',
      description: 'Maximum value (determinate only).',
      table: { category: 'State' },
    },
    label: {
      control: 'text',
      description: 'Accessible name and `aria-valuetext` when non-empty.',
      table: { category: 'Accessibility' },
    },
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
