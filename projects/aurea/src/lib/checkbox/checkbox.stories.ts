import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Checkbox } from './checkbox';

const meta: Meta<Checkbox> = {
  title: 'Aurea/Checkbox',
  component: Checkbox,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Current checked state (`ModelSignal<boolean | "indeterminate">`). Use `[(checked)]`.',
      table: { category: 'Value' },
    },
    checkedChange: {
      description: 'Emits the new checked state on each change when not disabled.',
      table: { category: 'Events' },
    },
    label: {
      control: 'text',
      description: 'Visible label; linked with `for` / `id`.',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Supporting description; `aria-describedby` when non-empty.',
      table: { category: 'Content' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction and suppresses `checkedChange`.',
      table: { category: 'State' },
    },
    required: {
      control: 'boolean',
      description: 'Sets native `required` and `aria-required`.',
      table: { category: 'Validation' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Density token on `data-au-size`.',
      table: { category: 'Appearance' },
    },
    id: {
      control: 'text',
      description: 'Explicit `id`; auto-generated when empty.',
      table: { category: 'Field' },
    },
    name: {
      control: 'text',
      description: 'Native `name` for form posts.',
      table: { category: 'Field' },
    },
  },
  args: {
    checked: false,
    checkedChange: fn(),
  },
};

export default meta;
type Story = StoryObj<Checkbox>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic checkbox with label. The **play** function clicks the checkbox.',
      },
    },
  },
  args: {
    label: 'Accept terms',
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const el = within(canvasElement);
    const checkbox = el.getByRole('checkbox');
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checkbox with label and description. Description has `aria-describedby`.',
      },
    },
  },
  args: {
    label: 'Subscribe to newsletter',
    description: 'Receive weekly updates about new features.',
    size: 'md',
  },
};

export const Checked: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pre-checked checkbox. Uses `aria-checked="true"`.',
      },
    },
  },
  args: {
    label: 'Remember me',
    checked: true,
    size: 'md',
  },
};

export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate state (partial selection). Uses `aria-checked="mixed"` — common for "select all" patterns.',
      },
    },
  },
  args: {
    label: 'Select items',
    checked: true,
    indeterminate: true,
    size: 'md',
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled checkbox — muted, non-interactive, still focusable by AT.',
      },
    },
  },
  args: {
    label: 'Disabled option',
    disabled: true,
    size: 'md',
  },
};

export const DisabledChecked: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled but checked — muted fill, non-interactive.',
      },
    },
  },
  args: {
    label: 'Already subscribed',
    checked: true,
    disabled: true,
    size: 'md',
  },
};

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When **`required`** is true, the native attribute and **`aria-required`** are set; the asterisk is decorative with screen-reader text.',
      },
    },
  },
  args: {
    label: 'I agree to the terms',
    required: true,
    size: 'md',
  },
};

export const SmallSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Uses **`size="sm"`** (`data-au-size="sm"`) for denser layouts.',
      },
    },
  },
  args: {
    label: 'Compact checkbox',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Uses **`size="lg"`** (`data-au-size="lg"`) — 24x24 target (WCAG 2.5.8).',
      },
    },
  },
  args: {
    label: 'Large touch target',
    size: 'lg',
  },
};

export const FocusRing: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tab into the checkbox to see the **outer focus ring**; click to see the **inset ring**. Both use `--au-color-focus-ring`.',
      },
    },
  },
  args: {
    label: 'Focus demo',
    size: 'md',
  },
};

export const DarkTheme: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dark theme via `data-au-theme="dark"` — tokens switch to dark palette automatically.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `<div data-au-theme="dark"><au-checkbox [label]="label" [checked]="checked" [disabled]="disabled" [size]="size" /></div>`,
  }),
  args: {
    label: 'Dark mode checkbox',
    checked: true,
    size: 'md',
  },
};