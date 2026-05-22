import type { Meta, StoryObj } from '@storybook/angular';

import { AuBadge } from './badge';

const meta: Meta<AuBadge> = {
  title: 'Aurea/Badge',
  component: AuBadge,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'centered',
    docs: {
      extractArgTypes: () => ({}),
      description: {
        component: 'Compact status or count label. Variants map to semantic tokens; dot mode for indicators without text.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'accent', 'success', 'warning', 'error', 'info'] },
    dot: { control: 'boolean' },
    label: { control: 'text' },
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
