import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';
import { signal } from '@angular/core';

import { AuButton } from '../button/button';
import { AuFormField } from '../form-field/form-field';
import { AuInputText } from '../input-text/input-text';
import { AuPopover, AuPopoverTrigger } from './index';

const meta: Meta<AuPopover> = {
  title: 'Aurea/Popover',
  component: AuPopover,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('popover'),
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the panel is open (`[(open)]`).',
      table: { category: 'State' },
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Preferred panel position.',
      table: { category: 'Layout' },
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents opening the panel.',
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

export const Filters: Story = {
  render: () => {
    const open = signal(false);
    return {
      props: { open },
      moduleMetadata: {
        imports: [AuPopover, AuPopoverTrigger, AuButton, AuFormField, AuInputText],
      },
      template: `
        <au-popover [(open)]="open">
          <au-button auPopoverTrigger variant="outline">Filters</au-button>
          <div class="au-story-field">
            <au-form-field label="Search">
              <au-input-text placeholder="Name…" />
            </au-form-field>
          </div>
        </au-popover>
      `,
    };
  },
};
