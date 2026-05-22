import type { Meta, StoryObj } from '@storybook/angular';

import { AuLink } from './link';

const meta: Meta<AuLink> = {
  title: 'Aurea/Link',
  component: AuLink,
  tags: ['autodocs', 'au', 'stable'],
  parameters: {
    layout: 'centered',
    docs: {
      extractArgTypes: () => ({}),
      description: { component: 'Semantic inline link using --au-color-link tokens.' },
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
