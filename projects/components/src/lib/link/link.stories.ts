import type { Meta, StoryObj } from '@storybook/angular';
import { getStoryOverview } from '../story-docs/get-story-overview';

import { AuLink } from './link';

const docsOverview = getStoryOverview('link');

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
