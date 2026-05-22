import type { Meta, StoryObj } from '@storybook/angular';

import { buildStoryDocsOverview } from '../story-docs/build-story-docs-overview';
import { AuLink } from './link';

const docsOverview = buildStoryDocsOverview({
  overview:
    '`au-link` styles inline links with Aurea tokens on `<a auLink>` or `<au-link>`. Set **`external`** for `target="_blank"` and `rel="noopener noreferrer"`.',
  whenToUse: {
    use: [
      'Inline navigation within copy, tables, or messages',
      'External references that must open in a new tab safely',
    ],
    avoid: [
      'Primary actions → **`au-button`**',
      'Full breadcrumb trails → **`au-breadcrumb`**',
    ],
  },
  anatomy: [
    { region: 'Anchor host', notes: '`data-au-variant` on `au-link`.' },
    { region: 'Projected text', notes: 'Link label in the default slot.' },
  ],
  accessibility: [
    {
      topic: 'Focus',
      detail: 'Visible `--au-shadow-focus-ring` on `:focus-visible`.',
    },
    {
      topic: 'External',
      detail: '`rel="noopener noreferrer"` when `external` is true.',
    },
  ],
  keyboard: [
    { interaction: 'Enter', behavior: 'Activates the native link.' },
    { interaction: 'Tab', behavior: 'Follows document tab order.' },
  ],
  tokens: [
    { concern: 'Color', examples: '`--au-color-link`, `--au-color-link-hover`' },
    { concern: 'Focus', examples: '`--au-shadow-focus-ring`' },
  ],
});

const meta: Meta<AuLink> = {
  title: 'Aurea/Link',
  component: AuLink,
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
      options: ['default', 'subtle'],
      description: 'Visual emphasis of the link.',
      table: { category: 'Appearance' },
    },
    href: {
      control: 'text',
      description: 'Destination URL.',
      table: { category: 'Navigation' },
    },
    external: {
      control: 'boolean',
      description: 'Opens in a new tab with safe `rel`.',
      table: { category: 'Navigation' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuLink] },
    template: `<p style="margin:0">Read the <a auLink href="#">design guidelines</a> before shipping.</p>`,
  }),
};

export const External: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuLink] },
    template: `<a auLink href="https://angular.dev" [external]="true">Angular docs</a>`,
  }),
};
