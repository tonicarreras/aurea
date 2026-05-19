import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';

import { AuCheckbox } from './checkbox';

const meta: Meta<AuCheckbox> = {
  title: 'Aurea/Checkbox',
  component: AuCheckbox,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Current checked state (`ModelSignal<boolean>`). Use `[(checked)]` or bind with `[formField]` on a boolean field.',
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
    errorMessage: {
      control: 'text',
      description: 'Manual error copy (shown when non-empty).',
      table: { category: 'Validation' },
    },
    errors: {
      control: 'object',
      description: 'Validation errors from `[formField]` / signal forms (first message shown when `errorMessage` is empty).',
      table: { category: 'Validation' },
    },
    invalid: {
      control: 'boolean',
      description: 'Invalid flag from the bound field (e.g. `formField`); drives `aria-invalid` and error styling.',
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
type Story = StoryObj<AuCheckbox>;

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
        story: 'Pre-checked checkbox (`checked` binding).',
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
        story: 'Indeterminate state (partial selection) via the native `indeterminate` property — common for "select all" patterns.',
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
        story: 'When **`required`** is true, the native attribute and **`aria-required`** are set; the label shows a decorative asterisk.',
      },
    },
  },
  args: {
    label: 'I agree to the terms',
    required: true,
    size: 'md',
  },
};

export const WithErrorMessage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Manual **`errorMessage`** (or **`errors`** from `[formField]`). Implements **`FormCheckboxControl`** for Angular signal forms on boolean fields.',
      },
    },
  },
  args: {
    label: 'I accept the privacy policy',
    errorMessage: 'This field is required to continue.',
    checked: false,
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