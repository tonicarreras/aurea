import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';

import { AuFormField } from '../form-field/form-field';
import { fieldChromeHintOnlyArgTypes, formFieldHintOnlyRender } from '../form-field';
import { AuCheckbox } from './checkbox';

interface CheckboxStoryArgs {
  checkedChange: ReturnType<typeof fn>;
  label: string;
  description: string;
  hint: string;
  errorMessage: string;
  invalid: boolean;
  required: boolean;
  controlIdInput: string;
  showRequired?: boolean;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  name: string;
  size: 'sm' | 'md' | 'lg';
  errors: readonly unknown[];
}

const meta: Meta<CheckboxStoryArgs> = {
  title: 'Aurea/Checkbox',
  component: AuCheckbox,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    ...fieldChromeHintOnlyArgTypes,
    checked: {
      control: 'boolean',
      description:
        'Current checked state (`ModelSignal<boolean>`). Use `[(checked)]` or bind with `[formField]` on a boolean field.',
      table: { category: 'Value' },
    },
    checkedChange: {
      description: 'Emits the new checked state on each change when not disabled.',
      table: { category: 'Events' },
    },
    label: {
      control: 'text',
      description: 'Inline label on the checkbox control.',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Supporting description; `aria-describedby` when non-empty.',
      table: { category: 'Content' },
    },
    indeterminate: {
      control: 'boolean',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction and suppresses `checkedChange`.',
      table: { category: 'State' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Density token on `data-au-size`.',
      table: { category: 'Appearance' },
    },
    name: {
      control: 'text',
      description: 'Native `name` for form posts.',
      table: { category: 'Field' },
    },
    errors: {
      control: 'object',
      description: 'Validation errors from `[formField]` / signal forms.',
      table: { category: 'Validation' },
    },
  } as Meta<CheckboxStoryArgs>['argTypes'],
  args: {
    label: '',
    description: '',
    hint: '',
    errorMessage: '',
    invalid: false,
    required: false,
    controlIdInput: '',
    showRequired: true,
    checked: false,
    indeterminate: false,
    disabled: false,
    name: '',
    size: 'md',
    errors: [],
    checkedChange: fn(),
  },
  render: (args) =>
    formFieldHintOnlyRender(
      [AuFormField, AuCheckbox],
      args,
      `<au-checkbox
  [(checked)]="checked"
  [label]="label"
  [description]="description"
  [disabled]="disabled"
  [required]="required"
  [showRequired]="showRequired"
  [indeterminate]="indeterminate"
  [size]="size"
  [name]="name"
  [invalid]="invalid"
  [errors]="$any(errors)"
/>`,
    ),
};

export default meta;
type Story = StoryObj<CheckboxStoryArgs>;

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
        story:
          'Indeterminate state (partial selection) via the native `indeterminate` property — common for "select all" patterns.',
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
        story:
          'When **`required`** is true, the native attribute and **`aria-required`** are set; the label shows a decorative asterisk.',
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
    invalid: true,
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
        story:
          'Tab into the checkbox to see the **outer focus ring**; click to see the **inset ring**. Both use `--au-color-focus-ring`.',
      },
    },
  },
  args: {
    label: 'Focus demo',
    size: 'md',
  },
};
