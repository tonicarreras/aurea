import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { AuButton } from '../button/button';
import { AuDialogFooter } from './dialog-footer.directive';
import { AuDialog } from './dialog';
import { DialogStoryHost } from './dialog-story-host';

const meta: Meta<AuDialog> = {
  title: 'Aurea/Dialog',
  component: AuDialog,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Native `<dialog>` modal. Use the trigger in each story to preview overlay, backdrop, and size. The dashed canvas shell is Storybook-only.',
      },
    },
  },
  argTypes: {
    open: { control: 'boolean', table: { category: 'State' } },
    close: { table: { category: 'Events' } },
    title: { control: 'text', table: { category: 'Content' } },
    showCloseButton: { control: 'boolean', table: { category: 'Content' } },
    closeOnBackdrop: { control: 'boolean', table: { category: 'Behavior' } },
    closeOnEscape: { control: 'boolean', table: { category: 'Behavior' } },
    ariaLabel: { control: 'text', table: { category: 'Content' } },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      table: { category: 'Appearance' },
    },
  },
  args: {
    open: false,
    close: fn(),
    title: 'Dialog title',
    size: 'md',
    showCloseButton: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
    ariaLabel: '',
  },
};

export default meta;
type Story = StoryObj<AuDialog>;

function hostStory(config: {
  hint?: string;
  triggerLabel?: string;
  title?: string;
  body: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  ariaLabel?: string;
  showDemoFooter?: boolean;
}): Story {
  return {
    // No `args` in render: Storybook signal-input args are not typed for custom hosts.
    render: () => ({
      moduleMetadata: { imports: [AuDialogStoryHost, AuButton, AuDialogFooter] },
      template: `
        <au-dialog-story-host
          [hint]="hint"
          [triggerLabel]="triggerLabel"
          [title]="title"
          [size]="size"
          [showCloseButton]="showCloseButton"
          [closeOnBackdrop]="closeOnBackdrop"
          [closeOnEscape]="closeOnEscape"
          [ariaLabel]="ariaLabel"
          [showDemoFooter]="showDemoFooter"
        >
          ${config.body}
        </au-dialog-story-host>
      `,
      props: {
        hint: config.hint ?? '',
        triggerLabel: config.triggerLabel ?? 'Open dialog',
        title: config.title ?? 'Dialog title',
        size: config.size ?? 'md',
        showCloseButton: config.showCloseButton ?? true,
        closeOnBackdrop: config.closeOnBackdrop ?? true,
        closeOnEscape: config.closeOnEscape ?? true,
        ariaLabel: config.ariaLabel ?? '',
        showDemoFooter: config.showDemoFooter ?? false,
      },
    }),
  };
}

export const Default: Story = hostStory({
  hint: 'Centred panel (max 35rem). Click outside the panel or press Escape to dismiss.',
  title: 'Confirm action',
  body: '<p>Are you sure you want to proceed with this action?</p>',
});

export const SmallSize: Story = hostStory({
  hint: 'Compact width (24rem) for short confirmations.',
  title: 'Confirm',
  size: 'sm',
  body: '<p>Continue?</p>',
});

export const LargeSize: Story = hostStory({
  hint: 'Wider panel (45rem) for forms or longer copy.',
  title: 'Detailed view',
  size: 'lg',
  body: `
    <p>This dialog can hold multiple paragraphs or form fields.</p>
    <p>Body scrolls when content exceeds the viewport.</p>
  `,
});

export const FullScreen: Story = hostStory({
  hint: 'Fills the viewport with a 16px inset — for wizards, editors, or immersive flows.',
  triggerLabel: 'Open full-screen dialog',
  title: 'Full screen',
  size: 'full',
  showDemoFooter: true,
  body: `
    <p>The panel stretches to the viewport minus padding.</p>
    <p>Scroll still works inside the body when content overflows.</p>
  `,
});

export const WithFooter: Story = hostStory({
  hint: 'Footer actions match card footers. Import `AuDialogFooter` in your host component.',
  title: 'With footer',
  showDemoFooter: true,
  body: '<p>Dialog body content here.</p>',
});

export const NoCloseButton: Story = hostStory({
  hint: 'Dismiss with backdrop click or Escape only.',
  title: 'No close button',
  showCloseButton: false,
  body: '<p>There is no header close control in this variant.</p>',
});

export const NoBackdropClose: Story = hostStory({
  hint: 'Backdrop clicks are ignored; use the close button or Escape.',
  title: 'Persistent dialog',
  closeOnBackdrop: false,
  body: '<p>Clicking the dimmed overlay does not close this dialog.</p>',
});

export const WithoutTitle: Story = hostStory({
  hint: 'Provide `ariaLabel` when there is no visible title.',
  title: '',
  ariaLabel: 'Information',
  body: '<p>This dialog has no visible title. The accessible name comes from <code>ariaLabel</code>.</p>',
});
