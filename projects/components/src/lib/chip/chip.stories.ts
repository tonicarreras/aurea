import type { Meta, StoryObj } from '@storybook/angular';
import { getStoryOverview } from '../story-docs/get-story-overview';
import { expect, fn, userEvent, within } from 'storybook/test';

import { AuChipGroup } from '../chip-group/chip-group';
import { AuList } from '../list/list';
import { AuChip } from './chip';

const docsOverview = getStoryOverview('chip');

const meta: Meta<AuChip> = {
  title: 'Aurea/Chip',
  component: AuChip,
  tags: ['autodocs', 'au', 'stable'],
  parameters: {
    layout: 'padded',
    docs: {
      extractArgTypes: () => ({}),
      description: { component: docsOverview },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible chip text (or use projected content when empty).',
      table: { category: 'Content' },
    },
    variant: {
      control: 'select',
      options: ['filled', 'outline', 'accent'],
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      table: { category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State' },
    },
    removable: {
      control: 'boolean',
      description: 'Shows a remove button; emits `removed`.',
      table: { category: 'Behavior' },
    },
    selectable: {
      control: 'boolean',
      description: 'Toggle filter chip with `aria-pressed` and `[(selected)]`.',
      table: { category: 'Behavior' },
    },
    selected: {
      control: 'boolean',
      table: { category: 'Value' },
    },
    removeLabel: {
      control: 'text',
      description: 'Accessible name for the remove control.',
      table: { category: 'Accessibility' },
    },
    removed: { table: { category: 'Events' } },
    selectedChange: { table: { category: 'Events' } },
    click: { table: { category: 'Events' } },
  },
  args: {
    label: 'Design system',
    removed: fn(),
    selectedChange: fn(),
    click: fn(),
  },
};

export default meta;
type Story = StoryObj<AuChip>;

export const Default: Story = {
  args: {
    label: 'Design system',
    variant: 'filled',
    size: 'md',
  },
};

export const Removable: Story = {
  args: {
    label: 'Angular',
    removable: true,
  },
  play: async ({ canvasElement }) => {
    const remove = within(canvasElement).getByRole('button', { name: /remove angular/i });
    await userEvent.click(remove);
    await expect(remove).toBeEnabled();
  },
};

export const Selectable: Story = {
  args: {
    label: 'Draft only',
    selectable: true,
    selected: false,
  },
  play: async ({ canvasElement }) => {
    const chip = within(canvasElement).getByRole('button', { name: 'Draft only' });
    await expect(chip).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(chip);
    await expect(chip).toHaveAttribute('aria-pressed', 'true');
  },
};

export const Selected: Story = {
  args: {
    label: 'Published',
    selectable: true,
    selected: true,
    variant: 'accent',
  },
};

export const Outline: Story = {
  args: {
    label: 'Outline',
    variant: 'outline',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Archived',
    removable: true,
    disabled: true,
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Compact',
    size: 'sm',
  },
};

export const ChipGroupFilters: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Selectable filter chips inside `au-chip-group` (`role="group"`).',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [AuChipGroup, AuChip] },
    template: `
      <au-chip-group ariaLabel="Status filters">
        <au-chip label="Draft" [selectable]="true" />
        <au-chip label="Published" [selectable]="true" [selected]="true" variant="accent" />
      </au-chip-group>
    `,
  }),
};

export const ChipGroup: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Wrap static/removable chips in `au-list`. Use `role="group"` with `aria-label` for selectable filter chips.',
      },
    },
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [AuList, AuChip] },
    template: `
      <au-list ariaLabel="Technologies">
        <au-chip label="Angular" removable />
        <au-chip label="TypeScript" removable />
        <au-chip label="Vitest" removable />
      </au-list>
    `,
  }),
};
