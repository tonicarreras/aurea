import type { Meta, StoryObj } from '@storybook/angular';
import { getStoryOverview } from '../story-docs/get-story-overview';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuBreadcrumb } from './breadcrumb';

const docsOverview = getStoryOverview('breadcrumb');

const meta: Meta<AuBreadcrumb> = {
  title: 'Aurea/Breadcrumb',
  component: AuBreadcrumb,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters(docsOverview),
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
