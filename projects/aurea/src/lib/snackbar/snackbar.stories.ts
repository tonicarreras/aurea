import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { Snackbar, type SnackbarPosition, type SnackbarVariant } from './snackbar';
import { SnackbarStoryHost } from './snackbar-story-host';

/** Args wired to `au-snackbar-story-host` (Storybook canvas + live controls). */
export interface SnackbarStoryArgs {
  hint: string;
  triggerLabel: string;
  open: boolean;
  message: string;
  variant: SnackbarVariant;
  position: SnackbarPosition;
  durationMs: number;
  actionLabel: string;
  showCloseButton: boolean;
  dismiss: ReturnType<typeof fn>;
  action: ReturnType<typeof fn>;
};

const meta: Meta<SnackbarStoryArgs> = {
  title: 'Aurea/Snackbar',
  component: Snackbar,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'fullscreen',
    docs: {
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
      options: ['default', 'success', 'warning', 'error', 'info'],
      table: { category: 'Appearance' },
    },
    position: {
      control: 'select',
      options: ['bottom-center', 'bottom-start', 'bottom-end', 'top-center', 'top-start', 'top-end'],
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
type Story = StoryObj<SnackbarStoryArgs>;

function snackbarRender(args: SnackbarStoryArgs) {
  return {
    moduleMetadata: { imports: [SnackbarStoryHost] },
    props: args,
    template: `
      <au-snackbar-story-host
        [hint]="hint"
        [triggerLabel]="triggerLabel"
        [(open)]="open"
        [message]="message"
        [variant]="variant"
        [position]="position"
        [durationMs]="durationMs"
        [actionLabel]="actionLabel"
        [showCloseButton]="showCloseButton"
        (dismiss)="dismiss($event)"
        (action)="action($event)"
      />
    `,
  };
}

export const Default: Story = {
  render: (args) => snackbarRender(args),
};

export const Success: Story = {
  args: {
    hint: 'Semantic success surface for positive feedback.',
    triggerLabel: 'Show success',
    message: 'Profile updated.',
    variant: 'success',
  },
  render: (args) => snackbarRender(args),
};

export const WithAction: Story = {
  args: {
    hint: 'Optional action closes the snackbar and emits **action**.',
    triggerLabel: 'Show with action',
    message: 'Item removed.',
    actionLabel: 'Undo',
    durationMs: 8000,
  },
  render: (args) => snackbarRender(args),
};

export const ErrorPersistent: Story = {
  args: {
    hint: 'Error uses role="alert"; **durationMs** 0 requires manual dismiss.',
    triggerLabel: 'Show error',
    message: 'Could not save changes. Try again.',
    variant: 'error',
    durationMs: 0,
  },
  render: (args) => snackbarRender(args),
};

export const TopEnd: Story = {
  args: {
    hint: 'Placement via **position** = top-end.',
    triggerLabel: 'Show top-end',
    message: 'New message received.',
    variant: 'info',
    position: 'top-end',
  },
  render: (args) => snackbarRender(args),
};
