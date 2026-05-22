import type { Meta, StoryObj } from '@storybook/angular';

import { buildStoryDocsOverview } from '../story-docs/build-story-docs-overview';
import { AuProgress } from './progress';

const docsOverview = buildStoryDocsOverview({
  overview:
    '`au-progress` is a determinate or indeterminate progress bar (`role="progressbar"`). Determinate mode exposes `aria-valuenow` / min / max; optional **`label`** overrides `aria-valuetext`.',
  whenToUse: {
    use: [
      'File uploads, multi-step tasks, or known completion percentage',
      'Indeterminate waits when duration is unknown',
    ],
    avoid: [
      'Content placeholders → **`au-skeleton`**',
      'Button in-flight state → **`au-button`** `loading`',
    ],
  },
  anatomy: [
    { region: 'Track', notes: 'Sunken surface with pill radius.' },
    { region: 'Bar', notes: 'Width from `value`/`max` or indeterminate animation.' },
  ],
  accessibility: [
    {
      topic: 'Value text',
      detail: '`label` or rounded percent becomes `aria-valuetext`.',
    },
    {
      topic: 'Indeterminate',
      detail: 'Omits value min/max/now per ARIA guidance.',
    },
  ],
  tokens: [
    { concern: 'Track / fill', examples: '`--au-color-surface-sunken`, `--au-color-action-primary`' },
    { concern: 'Motion', examples: '`--au-duration-default`, `--au-ease-out`' },
  ],
});

const meta: Meta<AuProgress> = {
  title: 'Aurea/Progress',
  component: AuProgress,
  tags: ['autodocs', 'au', 'stable'],
  parameters: {
    layout: 'padded',
    docs: {
      extractArgTypes: () => ({}),
      description: { component: docsOverview },
    },
  },
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
      description: 'Overrides `aria-valuetext` when non-empty.',
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
