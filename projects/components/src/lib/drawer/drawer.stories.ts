import { signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';
import { fn } from 'storybook/test';

import { AuButton } from '../button/button';
import { AuDialogFooter } from '../dialog/dialog-footer.directive';
import { AuDrawer } from './drawer';

const meta: Meta<AuDrawer> = {
  title: 'Aurea/Drawer',
  component: AuDrawer,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('drawer'),
  argTypes: {
    open: { control: 'boolean', table: { category: 'State' } },
    close: { table: { category: 'Events' } },
    title: { control: 'text', table: { category: 'Content' } },
    showCloseButton: { control: 'boolean', table: { category: 'Content' } },
    closeOnBackdrop: { control: 'boolean', table: { category: 'Behavior' } },
    closeOnEscape: { control: 'boolean', table: { category: 'Behavior' } },
    ariaLabel: { control: 'text', table: { category: 'Content' } },
    position: {
      control: 'select',
      options: ['start', 'end'],
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      table: { category: 'Appearance' },
    },
  },
  args: {
    open: false,
    close: fn(),
    title: 'Drawer title',
    size: 'md',
    position: 'end',
    showCloseButton: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
    ariaLabel: '',
  },
};

export default meta;
type Story = StoryObj<AuDrawer>;

function drawerStory(config: { body: string; footer?: string }): Story {
  const footerBlock = config.footer ?? '';
  return {
    render: (args) => ({
      props: { ...args, open: signal(false) },
      moduleMetadata: { imports: [AuDrawer, AuButton, AuDialogFooter] },
      template: `
        <div class="au-story-stage">
          <au-button type="button" (click)="open.set(true)">Open drawer</au-button>
          <au-drawer
            [(open)]="open"
            [title]="title"
            [size]="size"
            [position]="position"
            [showCloseButton]="showCloseButton"
            [closeOnBackdrop]="closeOnBackdrop"
            [closeOnEscape]="closeOnEscape"
            [ariaLabel]="ariaLabel"
            (close)="close($event)"
          >
            ${config.body}
            ${footerBlock}
          </au-drawer>
        </div>
      `,
    }),
  };
}

export const Default: Story = {
  ...drawerStory({
    body: '<p>Navigation links, filters, or detail content.</p>',
    footer: `
      <div auDrawerFooter>
        <au-button variant="secondary" type="button" (click)="open.set(false)">Cancel</au-button>
        <au-button type="button" (click)="open.set(false)">Apply</au-button>
      </div>`,
  }),
};

export const StartPosition: Story = {
  ...drawerStory({
    body: '<p>Panel slides in from the start edge (left in LTR).</p>',
  }),
  args: { position: 'start', title: 'Filters' },
};

export const Large: Story = {
  ...drawerStory({
    body: '<p>Wider panel for forms or multi-step flows.</p>',
  }),
  args: { size: 'lg', title: 'Account settings' },
};
