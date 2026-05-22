import type { Meta, StoryObj } from '@storybook/angular';

import { AuBreadcrumb } from './breadcrumb';

const meta: Meta<AuBreadcrumb> = {
  title: 'Aurea/Breadcrumb',
  component: AuBreadcrumb,
  tags: ['autodocs', 'au', 'stable'],
  parameters: {
    layout: 'padded',
    docs: {
      extractArgTypes: () => ({}),
      description: { component: 'Hierarchical navigation trail with optional links.' },
    },
  },
};

export default meta;
type Story = StoryObj<AuBreadcrumb>;

export const Default: Story = {
  args: {
    items: [{ label: 'Home', href: '#' }, { label: 'Components', href: '#' }, { label: 'Button' }],
  },
};
