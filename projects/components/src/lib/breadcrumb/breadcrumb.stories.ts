import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuBreadcrumb } from './breadcrumb';


const meta: Meta<AuBreadcrumb> = {
  title: 'Aurea/Breadcrumb',
  component: AuBreadcrumb,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('breadcrumb'),
  argTypes: {
    items: {
      control: 'object',
      description: 'Trail segments: `{ label, href? }[]`.',
      table: { category: 'Content' },
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
