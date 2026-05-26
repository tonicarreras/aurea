import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';
import { signal } from '@angular/core';

import { AuButton } from '../button/button';
import { AuMenu, AuMenuItem, AuMenuTrigger } from './index';

const storyImports = { imports: [AuMenu, AuMenuTrigger, AuMenuItem, AuButton] };

const meta: Meta<AuMenu> = {
  title: 'Aurea/Menu',
  component: AuMenu,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('menu'),
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the panel is open (`[(open)]`).',
      table: { category: 'State' },
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Preferred panel position; flips when needed.',
      table: { category: 'Layout' },
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents opening the menu.',
      table: { category: 'State' },
    },
    openChange: {
      description: 'Emits when open state changes.',
      table: { category: 'Events' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const open = signal(false);
    return {
      props: { open },
      moduleMetadata: storyImports,
      template: `
        <au-menu [(open)]="open">
          <au-button auMenuTrigger variant="outline">Actions</au-button>
          <au-menu-item>Edit</au-menu-item>
          <au-menu-item>Duplicate</au-menu-item>
          <au-menu-item>Archive</au-menu-item>
        </au-menu>
      `,
    };
  },
};
