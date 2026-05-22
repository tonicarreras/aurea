import type { Meta, StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';

import { AuButton } from '../button/button';
import { buildStoryDocsOverview } from '../story-docs/build-story-docs-overview';
import { AuMenu, AuMenuItem, AuMenuTrigger } from './index';

const storyImports = { imports: [AuMenu, AuMenuTrigger, AuMenuItem, AuButton] };

const docsOverview = buildStoryDocsOverview({
  overview:
    '`au-menu` is a dropdown with a portaled panel anchored to **`auMenuTrigger`**. Bind **`[(open)]`** for controlled state; **`au-menu-item`** emits `select` and closes the menu. Dismiss with outside click or **Escape**.',
  whenToUse: {
    use: [
      'Row or toolbar actions that do not need a full dialog',
      'Command lists opened from a single trigger button',
    ],
    avoid: [
      'Inline filters or compact forms → **`au-popover`**',
      'Blocking confirmation → **`au-dialog`**',
    ],
  },
  anatomy: [
    {
      region: 'Trigger',
      notes: '`auMenuTrigger`; `aria-haspopup="menu"` and `aria-expanded`.',
    },
    { region: 'Panel', notes: 'Portaled `.au-floating-panel`; positioned via overlay helper.' },
    { region: 'Items', notes: '`au-menu-item` buttons; `select` closes the menu.' },
  ],
  accessibility: [
    {
      topic: 'Expanded state',
      detail: 'Trigger reflects `open` with `aria-expanded`.',
    },
    {
      topic: 'Dismiss',
      detail: 'Escape and outside click close; manage focus return in your app shell.',
    },
  ],
  keyboard: [
    { interaction: 'Enter / Space (trigger)', behavior: 'Toggles the menu.' },
    { interaction: 'Escape', behavior: 'Closes the open menu.' },
  ],
  tokens: [
    {
      concern: 'Panel',
      examples: '`--au-color-surface-elevated`, `--au-shadow-overlay`, `--au-z-dropdown`',
    },
    { concern: 'Items', examples: '`--au-space-2`, `--au-shadow-focus-ring`' },
  ],
});

const meta: Meta<AuMenu> = {
  title: 'Aurea/Menu',
  component: AuMenu,
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
