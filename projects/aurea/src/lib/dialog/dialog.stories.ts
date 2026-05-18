import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Button } from '../button/button';
import { Dialog } from './dialog';
import { CommonModule } from '@angular/common';

const meta: Meta<Dialog> = {
  title: 'Aurea/Dialog',
  component: Dialog,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls visibility of the dialog.',
      table: { category: 'State' },
    },
    close: {
      description: 'Emits when dialog should close.',
      table: { category: 'Events' },
    },
    title: {
      control: 'text',
      description: 'Dialog title for accessibility.',
      table: { category: 'Content' },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show/hide close button in header.',
      table: { category: 'Content' },
    },
    closeOnBackdrop: {
      control: 'boolean',
      description: 'Close when the dimmed overlay (outside the panel) is clicked.',
      table: { category: 'Behavior' },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close when the user presses Escape (native dialog cancel).',
      table: { category: 'Behavior' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name when there is no visible `title` (sets `aria-label` on the dialog).',
      table: { category: 'Content' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Dialog width size.',
      table: { category: 'Appearance' },
    },
  },
  args: {
    open: false,
    close: fn(),
    title: 'Dialog Title',
    size: 'md',
    showCloseButton: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
  },
};

export default meta;
type Story = StoryObj<Dialog>;

// Helper template for dialog with trigger button
const dialogTemplate = (
  title: string,
  body: string,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  footerTemplate = ''
) => `
  <au-button (click)="open = true">Open Dialog</au-button>
  <au-dialog [(open)]="open" title="${title}" size="${size}" [showCloseButton]="${showCloseButton}" [closeOnBackdrop]="${closeOnBackdrop}" [closeOnEscape]="${closeOnEscape}">
    ${body}
    ${footerTemplate ? `<div auDialogFooter>${footerTemplate}</div>` : ''}
  </au-dialog>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default medium dialog opened via trigger button.',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [CommonModule, Button] },
    template: dialogTemplate('Confirm Action', '<p>Are you sure you want to proceed with this action?</p>'),
    props: { open: false },
  }),
};

export const SmallSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small dialog for simple confirmations or alerts.',
      },
    },
  },
  args: {
    size: 'sm',
  },
  render: () => ({
    moduleMetadata: { imports: [CommonModule, Button] },
    template: dialogTemplate('Confirm', '<p>Continue?</p>', 'sm'),
    props: { open: false },
  }),
};

export const LargeSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Large dialog for complex content or forms.',
      },
    },
  },
  args: {
    size: 'lg',
  },
  render: () => ({
    moduleMetadata: { imports: [CommonModule, Button] },
    template: dialogTemplate('Detailed View', '<p>This is a larger dialog for displaying more content.</p><p>It can contain forms, multiple sections, or detailed information.</p>', 'lg'),
    props: { open: false },
  }),
};

export const FullScreen: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Full screen dialog for maximum content space.',
      },
    },
  },
  args: {
    size: 'full',
  },
  render: () => ({
    moduleMetadata: { imports: [CommonModule, Button] },
    template: dialogTemplate('Full Screen Dialog', '<p>This dialog takes the full viewport minus padding.</p>', 'full'),
    props: { open: false },
  }),
};

export const NoCloseButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dialog without close button in header. User must use backdrop or Escape.',
      },
    },
  },
  args: {
    showCloseButton: false,
  },
  render: () => ({
    moduleMetadata: { imports: [CommonModule, Button] },
    template: dialogTemplate('No Close Button', '<p>Close using backdrop click or Escape key.</p>', 'md', false),
    props: { open: false },
  }),
};

export const NoBackdropClose: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dialog that does not close when clicking backdrop.',
      },
    },
  },
  args: {
    closeOnBackdrop: false,
  },
  render: () => ({
    moduleMetadata: { imports: [CommonModule, Button] },
    template: dialogTemplate('Persistent Dialog', '<p>Backdrop does not dismiss; use the close button or Escape.</p>', 'md', true, false, true),
    props: { open: false },
  }),
};

export const WithFooter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dialog with footer actions using `auDialogFooter` attribute selector.',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [CommonModule, Button] },
    template: `
      <au-button (click)="open = true">Open Dialog</au-button>
      <au-dialog [(open)]="open" title="With Footer">
        <p>Dialog body content here.</p>
        <div auDialogFooter>
          <au-button variant="secondary" (click)="open = false">Cancel</au-button>
          <au-button (click)="open = false">Confirm</au-button>
        </div>
      </au-dialog>
    `,
    props: { open: false },
  }),
};

export const WithoutTitle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dialog without title. Useful for simple content or when title is in body.',
      },
    },
  },
  args: {
    title: '',
  },
  render: () => ({
    moduleMetadata: { imports: [CommonModule, Button] },
    template: `
      <au-button (click)="open = true">Open Dialog</au-button>
      <au-dialog [(open)]="open" [title]="''">
        <p>This dialog has no title.</p>
      </au-dialog>
    `,
    props: { open: false },
  }),
};