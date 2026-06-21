import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuBadge } from './badge';

const meta: Meta<AuBadge> = {
  title: 'Aurea/Badge',
  component: AuBadge,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('badge'),
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent', 'success', 'warning', 'error', 'info'],
      description: 'Semantic surface and border colors.',
      table: { category: 'Appearance' },
    },
    dot: {
      control: 'boolean',
      description: 'Renders a dot without visible label text.',
      table: { category: 'Appearance' },
    },
    label: {
      control: 'text',
      description: 'Visible count or status text.',
      table: { category: 'Content' },
    },
    appearance: {
      control: 'select',
      options: ['solid', 'glass'],
      table: { category: 'Appearance' },
    },
    corner: {
      control: 'select',
      options: ['inline', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
      description: 'Absolute corner placement (parent needs `position: relative`).',
      table: { category: 'Layout' },
    },
  },
  args: { variant: 'default', dot: false, label: '12', appearance: 'solid', corner: 'inline' },
};

export default meta;
type Story = StoryObj<AuBadge>;

export const Default: Story = {};

export const Dot: Story = { args: { dot: true, label: '' } };

export const Variants: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuBadge] },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;">
        <au-badge label="Default" />
        <au-badge variant="accent" label="New" />
        <au-badge variant="success" label="OK" />
        <au-badge variant="warning" label="!" />
        <au-badge variant="error" label="3" />
        <au-badge variant="info" label="i" />
      </div>
    `,
  }),
};

export const GlassOverlay: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuBadge] },
    template: `
      <div style="position:relative;max-width:18rem;border-radius:var(--au-radius-surface);overflow:hidden;">
        <img src="https://placehold.co/640x360/e2e8f0/64748b?text=Pizza" alt="" style="display:block;width:100%;height:auto;" />
        <au-badge appearance="glass" corner="top-start" variant="success" label="Nuevo" />
      </div>
    `,
  }),
};
