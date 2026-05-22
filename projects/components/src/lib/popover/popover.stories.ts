import type { Meta, StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';

import { AuButton } from '../button/button';
import { AuFormField } from '../form-field/form-field';
import { AuInputText } from '../input-text/input-text';
import { buildStoryDocsOverview } from '../story-docs/build-story-docs-overview';
import { AuPopover, AuPopoverTrigger } from './index';

const docsOverview = buildStoryDocsOverview({
  overview:
    '`au-popover` anchors a lightweight panel to **`auPopoverTrigger`** (filters, help, compact forms). Same overlay model as **`au-menu`**: portaled panel, **`[(open)]`**, outside click, and **Escape** to dismiss.',
  whenToUse: {
    use: [
      'Inline filters or settings that should stay near the trigger',
      'Short supplementary content that is not a full modal',
    ],
    avoid: [
      'Simple hover hints → **`auTooltip`**',
      'Destructive or blocking flows → **`au-dialog`**',
      'Action lists → **`au-menu`**',
    ],
  },
  anatomy: [
    {
      region: 'Trigger',
      notes: '`auPopoverTrigger`; `aria-haspopup="dialog"` and `aria-expanded`.',
    },
    { region: 'Panel', notes: 'Projected content in portaled `.au-floating-panel`.' },
  ],
  accessibility: [
    {
      topic: 'Expanded state',
      detail: 'Trigger `aria-expanded` reflects `open`.',
    },
    {
      topic: 'Form controls',
      detail: 'Project `au-input-text` (and other fields) inside `au-form-field` — they require `AU_FORM_FIELD`.',
    },
    {
      topic: 'Focus',
      detail: 'Plan focus order when the panel contains form controls.',
    },
    {
      topic: 'Dismiss',
      detail: 'Escape and outside click close the panel.',
    },
  ],
  keyboard: [
    { interaction: 'Enter / Space (trigger)', behavior: 'Toggles the panel.' },
    { interaction: 'Escape', behavior: 'Closes the open panel.' },
  ],
  tokens: [
    {
      concern: 'Panel',
      examples: '`--au-color-surface-elevated`, `--au-shadow-overlay`, `--au-radius-md`',
    },
  ],
});

const meta: Meta<AuPopover> = {
  title: 'Aurea/Popover',
  component: AuPopover,
  tags: ['autodocs', 'au', 'stable'],
  parameters: {
    layout: 'centered',
    docs: {
      extractArgTypes: () => ({}),
      description: { component: docsOverview },
    },
  },
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
          <au-form-field label="Search">
            <au-input-text placeholder="Name…" />
          </au-form-field>
        </au-popover>
      `,
    };
  },
};
