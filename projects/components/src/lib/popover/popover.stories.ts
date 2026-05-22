import type { Meta, StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';

import { AuButton } from '../button/button';
import { AuInputText } from '../input-text/input-text';
import { AuPopover, AuPopoverTrigger } from './index';

const meta: Meta = {
  title: 'Aurea/Popover',
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'centered',
    docs: {
      extractArgTypes: () => ({}),
      description: { component: 'Anchored panel for filters or compact forms. Toggle with `auPopoverTrigger`.' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Filters: Story = {
  render: () => {
    const open = signal(false);
    return {
      props: { open },
      moduleMetadata: { imports: [AuPopover, AuPopoverTrigger, AuButton, AuInputText] },
      template: `
        <au-popover [(open)]="open">
          <au-button auPopoverTrigger variant="outline">Filters</au-button>
          <p style="margin:0 0 0.5rem;font-size:0.875rem">Search</p>
          <au-input-text placeholder="Name…" />
        </au-popover>
      `,
    };
  },
};
