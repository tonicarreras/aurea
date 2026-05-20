import type { Meta, StoryObj } from '@storybook/angular';

import { AuDivider } from './divider';

const meta: Meta<AuDivider> = {
  title: 'Aurea/Divider',
  component: AuDivider,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
    docs: {
      extractArgTypes: () => ({}),
      description: {
        component:
          'Visual separator between sections. Horizontal (optional inset or label) or vertical in flex layouts; `role="separator"` with `aria-orientation`.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      table: { category: 'Appearance' },
    },
    inset: {
      control: 'boolean',
      description: 'Indents the start edge (horizontal, unlabeled).',
      table: { category: 'Appearance' },
    },
    label: {
      control: 'text',
      description: 'Centered caption between rules (horizontal).',
      table: { category: 'Content' },
    },
  },
  args: {
    orientation: 'horizontal',
    inset: false,
    label: '',
  },
};

export default meta;
type Story = StoryObj<AuDivider>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [AuDivider] },
    template: `
      <div style="max-width: 24rem; display: flex; flex-direction: column; gap: 1rem;">
        <p style="margin: 0;">Section above</p>
        <au-divider [orientation]="orientation" [inset]="inset" [label]="label" />
        <p style="margin: 0;">Section below</p>
      </div>
    `,
  }),
};

export const Inset: Story = {
  args: { inset: true },
  render: Default.render,
};

export const WithLabel: Story = {
  args: { label: 'or' },
  render: Default.render,
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [AuDivider] },
    template: `
      <div style="display: flex; align-items: stretch; gap: 1rem; min-height: 3rem;">
        <span>Projects</span>
        <au-divider orientation="vertical" />
        <span>Archive</span>
      </div>
    `,
  }),
};
