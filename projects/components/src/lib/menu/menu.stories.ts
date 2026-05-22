import type { Meta, StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';

import { AuButton } from '../button/button';
import { AuMenu, AuMenuItem, AuMenuTrigger } from './index';

const storyImports = { imports: [AuMenu, AuMenuTrigger, AuMenuItem, AuButton] };

const meta: Meta = {
  title: 'Aurea/Menu',
  tags: ['autodocs', 'au', 'stable'],
  parameters: {
    layout: 'centered',
    docs: {
      extractArgTypes: () => ({}),
      description: {
        component:
          'Dropdown menu with portaled panel. Use `auMenuTrigger` on the trigger and `au-menu-item` for actions.',
      },
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
      ...storyImports,
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
