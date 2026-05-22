import type { Meta, StoryObj } from '@storybook/angular';

import { buildStoryDocsOverview } from '../story-docs/build-story-docs-overview';
import { AuBreadcrumb } from './breadcrumb';

const docsOverview = buildStoryDocsOverview({
  overview:
    '`au-breadcrumb` renders a hierarchical navigation trail with `role="navigation"` and `aria-label="Breadcrumb"`. Items may link (`href`) or represent the current page as plain text.',
  whenToUse: {
    use: [
      'Deep page hierarchies where users need context and upward navigation',
      'Settings or documentation sections with more than two levels',
    ],
    avoid: [
      'Flat apps with a single level → skip breadcrumbs',
      'Primary app navigation → router tabs or side nav',
    ],
  },
  anatomy: [
    { region: 'List', notes: 'Ordered trail with separators between items.' },
    { region: 'Link item', notes: 'Uses link tokens; keyboard focus ring.' },
    { region: 'Current item', notes: 'Last segment without `href`; emphasized text.' },
  ],
  accessibility: [
    {
      topic: 'Landmark',
      detail: 'Default `aria-label="Breadcrumb"` on the host.',
    },
    {
      topic: 'Current page',
      detail: 'Final segment is text, not a link — avoids redundant self-link.',
    },
  ],
  keyboard: [
    {
      interaction: 'Tab',
      behavior: 'Moves through linked segments; current page is not focusable.',
    },
  ],
  tokens: [
    { concern: 'Typography', examples: '`--au-text-sm`, `--au-color-text-primary`' },
    { concern: 'Links', examples: '`--au-color-link`, `--au-shadow-focus-ring`' },
  ],
});

const meta: Meta<AuBreadcrumb> = {
  title: 'Aurea/Breadcrumb',
  component: AuBreadcrumb,
  tags: ['autodocs', 'au', 'stable'],
  parameters: {
    layout: 'padded',
    docs: {
      extractArgTypes: () => ({}),
      description: { component: docsOverview },
    },
  },
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
