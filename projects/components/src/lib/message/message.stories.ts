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
    title: { control: 'text', table: { category: 'Content' } },
    message: { control: 'text', table: { category: 'Content' } },
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
    title: '',
    message: 'Your session will expire in 10 minutes.',
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
