import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuFieldset } from './fieldset';

const meta: Meta<AuFieldset> = {
  title: 'Aurea/Fieldset',
  component: AuFieldset,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('fieldset'),
  argTypes: {
    legend: { control: 'text', table: { category: 'Content' } },
    description: { control: 'text', table: { category: 'Content' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      table: { category: 'Appearance' },
    },
  },
  args: {
    legend: 'Shipping address',
    description: 'Where we deliver your order.',
    disabled: false,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<AuFieldset>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [AuFieldset] },
    template: `
      <au-fieldset [legend]="legend" [description]="description" [disabled]="disabled" [size]="size">
        <p style="margin:0;color:var(--au-color-text-secondary)">Project form fields here.</p>
      </au-fieldset>
    `,
  }),
};

export const Compact: Story = {
  args: { size: 'sm' },
  render: Default.render,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
};
