import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import type { SnackbarPosition, SnackbarVariant } from './snackbar';
import { SnackbarStoryHost } from './snackbar-story-host';

const meta: Meta<SnackbarStoryHost> = {
  title: 'Aurea/Snackbar',
  component: SnackbarStoryHost,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      extractArgTypes: () => ({}),
      description: {
        component:
          'Transient feedback toast with optional action, auto-dismiss, and semantic variants. Use **open** or the trigger button to preview; controls update the live snackbar.',
      },
    },
  },
  argTypes: {
    hint: { control: 'text', table: { category: 'Storybook' } },
    triggerLabel: { control: 'text', table: { category: 'Storybook' } },
    open: { control: 'boolean', table: { category: 'State' } },
    message: { control: 'text', table: { category: 'Content' } },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'] satisfies SnackbarVariant[],
      table: { category: 'Appearance' },
    },
    position: {
      control: 'select',
      options: [
        'bottom-center',
        'bottom-start',
        'bottom-end',
        'top-center',
        'top-start',
        'top-end',
      ] satisfies SnackbarPosition[],
      table: { category: 'Appearance' },
    },
    durationMs: { control: 'number', table: { category: 'Behavior' } },
    actionLabel: { control: 'text', table: { category: 'Content' } },
    showCloseButton: { control: 'boolean', table: { category: 'Content' } },
    dismiss: { action: 'dismiss', table: { category: 'Events' } },
    action: { action: 'action', table: { category: 'Events' } },
  },
  args: {
    hint: 'Use **open** or the button below. Controls apply to the snackbar on the page.',
    triggerLabel: 'Show snackbar',
    open: false,
    message: 'Changes saved successfully.',
    variant: 'default',
    position: 'bottom-center',
    durationMs: 5000,
    actionLabel: '',
    showCloseButton: true,
    dismiss: fn(),
    action: fn(),
  },
};

export default meta;
type Story = StoryObj<SnackbarStoryHost>;

export const Default: Story = {};

export const Success: Story = {
  args: {
    hint: 'Semantic success surface for positive feedback.',
    triggerLabel: 'Show success',
    message: 'Profile updated.',
    variant: 'success',
  },
};

export const WithAction: Story = {
  args: {
    hint: 'Optional action closes the snackbar and emits **action**.',
    triggerLabel: 'Show with action',
    message: 'Item removed.',
    actionLabel: 'Undo',
    durationMs: 8000,
  },
};

export const ErrorPersistent: Story = {
  args: {
    hint: 'Error uses role="alert"; **durationMs** 0 requires manual dismiss.',
    triggerLabel: 'Show error',
    message: 'Could not save changes. Try again.',
    variant: 'error',
    durationMs: 0,
  },
};

export const TopEnd: Story = {
  args: {
    hint: 'Placement via **position** = top-end.',
    triggerLabel: 'Show top-end',
    message: 'New message received.',
    variant: 'info',
    position: 'top-end',
  },
};
