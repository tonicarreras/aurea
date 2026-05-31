import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuMessage, type AuMessageVariant } from './message';

const variants: AuMessageVariant[] = ['default', 'success', 'warning', 'error', 'info'];

const meta: Meta<AuMessage> = {
  title: 'Aurea/Message',
  component: AuMessage,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('message'),
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      table: { category: 'Appearance' },
    },
    layout: {
      control: 'select',
      options: ['inline', 'banner'],
      table: { category: 'Appearance' },
    },
    title: { control: 'text', table: { category: 'Content' } },
    message: { control: 'text', table: { category: 'Content' } },
    actionLabel: { control: 'text', table: { category: 'Content' } },
    dismissible: { control: 'boolean', table: { category: 'Behavior' } },
    showIcon: {
      control: 'boolean',
      description: 'Semantic icon only (success, warning, error, info). Default never shows one.',
      table: { category: 'Appearance' },
    },
    closeAriaLabel: { control: 'text', table: { category: 'Accessibility' } },
  },
  args: {
    variant: 'info',
    layout: 'inline',
    title: '',
    message: 'Your session will expire in 10 minutes.',
    actionLabel: '',
    dismissible: false,
    showIcon: true,
    closeAriaLabel: 'Dismiss message',
  },
};

export default meta;
type Story = StoryObj<AuMessage>;

export const Default: Story = {
  args: {
    variant: 'default',
    message: 'Neutral callout without a leading icon — only semantic variants show one.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Profile updated',
    message: 'Your public profile is now visible to your team.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Storage almost full',
    message: 'You have less than 5% space remaining. Remove old files or upgrade your plan.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Could not save',
    message: 'The server returned an error. Try again in a few minutes.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Tip',
    message: 'Use keyboard shortcuts from the help menu to work faster.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    message: 'This notice can be dismissed.',
    dismissible: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'success',
    message: 'Compact message without a leading icon.',
    showIcon: false,
  },
};

export const AllVariants: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuMessage] },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 36rem;">
        <au-message variant="default" title="Default" message="Neutral callout on a raised surface." />
        <au-message variant="success" title="Success" message="Operation completed successfully." />
        <au-message variant="warning" title="Warning" message="Review before continuing." />
        <au-message variant="error" title="Error" message="Something went wrong." />
        <au-message variant="info" title="Info" message="Helpful context for the user." />
      </div>
    `,
  }),
};

export const ProjectedContent: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuMessage] },
    template: `
      <au-message variant="warning" title="Custom body">
        <p style="margin: 0;">You can pass <strong>rich HTML</strong> via content projection.</p>
      </au-message>
    `,
  }),
};

export const Banner: Story = {
  args: {
    layout: 'banner',
    variant: 'info',
    title: 'Scheduled maintenance',
    message: 'The app will be read-only from 18:00–19:00 UTC.',
    dismissible: true,
  },
};

export const BannerWithAction: Story = {
  args: {
    layout: 'banner',
    variant: 'warning',
    title: 'Trial ending soon',
    message: 'Upgrade to keep team features.',
    actionLabel: 'View plans',
    dismissible: true,
  },
};

export const BannerAllVariants: Story = {
  render: () => ({
    moduleMetadata: { imports: [AuMessage] },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 48rem;">
        <au-message layout="banner" variant="default" title="Default" message="Neutral full-width notice." [dismissible]="true" />
        <au-message layout="banner" variant="success" title="Success" message="Your subscription is active." [dismissible]="true" />
        <au-message layout="banner" variant="warning" title="Warning" message="Review before continuing." [dismissible]="true" />
        <au-message layout="banner" variant="error" title="Error" message="Something went wrong." />
        <au-message layout="banner" variant="info" title="Info" message="Helpful context for the user." [dismissible]="true" />
      </div>
    `,
  }),
};
