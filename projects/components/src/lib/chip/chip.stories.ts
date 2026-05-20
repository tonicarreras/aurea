import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';

import { AuChip } from './chip';

const meta: Meta<AuChip> = {
  title: 'Aurea/Chip',
  component: AuChip,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
    docs: {
      extractArgTypes: () => ({}),
      description: {
        component:
          'Compact chip for filters, tags, or selections. Filled, outline, or accent variants; optional remove button and selectable toggle.',
      },
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

export const ChipGroup: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Wrap related chips in a list (`role="list"`) for static/removable tags, or a `role="group"` with `aria-label` for filter chips.',
      },
    },
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [AuChip] },
    template: `
      <div role="list" style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;">
        <au-chip label="Angular" removable />
        <au-chip label="TypeScript" removable />
        <au-chip label="Vitest" removable />
      </div>
    `,
  }),
};
