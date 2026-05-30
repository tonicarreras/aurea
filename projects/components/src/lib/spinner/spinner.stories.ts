import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuSpinner } from './spinner';

const meta: Meta<AuSpinner> = {
  title: 'Aurea/Spinner',
  component: AuSpinner,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('spinner'),
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Glyph footprint (sm scales with `1em`).',
      table: { category: 'Appearance' },
    },
    decorative: {
      control: 'boolean',
      description: 'Glyph only when a parent already names the wait.',
      table: { category: 'Accessibility' },
    },
    label: {
      control: 'text',
      description: 'Visible copy; omit for glyph-only (`aria-label="Loading"`).',
      table: { category: 'Accessibility' },
    },
  },
  args: { size: 'md' },
};

export default meta;
type Story = StoryObj<AuSpinner>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'sm' } };

export const Large: Story = { args: { size: 'lg' } };

export const CustomLabel: Story = {
  args: { label: 'Saving changes' },
};

export const Sizes: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuSpinner] },
    template: `
      <div style="display:flex;align-items:center;gap:1rem;">
        <au-spinner size="sm" />
        <au-spinner size="md" />
        <au-spinner size="lg" />
      </div>
    `,
  }),
};

export const InlineWithText: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuSpinner] },
    template: `
      <au-spinner size="sm" label="Loading team members…" style="color:var(--au-color-action-primary)" />
    `,
  }),
};
