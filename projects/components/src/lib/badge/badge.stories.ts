import type { Meta, StoryObj } from '@storybook/angular';
import { getStoryOverview } from '../story-docs/get-story-overview';

import { AuBadge } from './badge';

const docsOverview = getStoryOverview('badge');

const meta: Meta<AuBadge> = {
  title: 'Aurea/Badge',
  component: AuBadge,
  tags: ['autodocs', 'au', 'stable'],
  parameters: {
    layout: 'centered',
    docs: {
      extractArgTypes: () => ({}),
      description: { component: docsOverview },
    },
  },
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
  },
  args: { variant: 'default', dot: false, label: '12' },
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
