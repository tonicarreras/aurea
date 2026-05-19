import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';

import { INPUT_TEXT_DOCS_OVERVIEW } from './input-text.docs-overview';
import { AuInputText } from './input-text';

const meta: Meta<AuInputText> = {
  title: 'Aurea/InputText',
  component: AuInputText,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: INPUT_TEXT_DOCS_OVERVIEW,
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Current value (`ModelSignal<string>`). Prefer `[(value)]` or `[formField]`.',
      table: { category: 'Value' },
    },
    valueChange: {
      description: 'Emits on every input event when not disabled.',
      table: { category: 'Events' },
    },
    blur: {
      description: 'Emits when the input loses focus.',
      table: { category: 'Events' },
    },
    label: {
      control: 'text',
      description: 'Visible label; linked with `for` / `id`.',
      table: { category: 'Chrome' },
    },
    hint: {
      control: 'text',
      description: 'Helper copy; `aria-describedby` when non-empty.',
      table: { category: 'Chrome' },
    },
    placeholder: {
      control: 'text',
      description: 'Native placeholder; use hint for longer guidance.',
      table: { category: 'Chrome' },
    },
    showRequired: {
      control: 'boolean',
      description: 'When `true` and `required`, shows `*` and screen-reader “(required)”.',
      table: { category: 'Chrome' },
    },
    errorMessage: {
      control: 'text',
      description: 'Manual error string; takes precedence over `errors` for display.',
      table: { category: 'Validation' },
    },
    errors: {
      description: 'Populated by `formField` from signal forms.',
      table: { category: 'Validation' },
    },
    invalid: {
      control: 'boolean',
      description: 'External invalid flag (e.g. from `formField`).',
      table: { category: 'Validation' },
    },
    required: {
      control: 'boolean',
      description: 'Sets native `required` and `aria-required`.',
      table: { category: 'Validation' },
    },
    minLength: {
      control: 'number',
      description: 'Native `minlength` attribute.',
      table: { category: 'Validation' },
    },
    maxLength: {
      control: 'number',
      description: 'Native `maxlength` attribute.',
      table: { category: 'Validation' },
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'search', 'url'],
      description: 'HTML input type; password enables optional visibility toggle.',
      table: { category: 'Field' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables editing and suppresses `valueChange`.',
      table: { category: 'Field' },
    },
    readOnly: {
      control: 'boolean',
      description: 'Read-only input (still focusable; not the same as disabled).',
      table: { category: 'Field' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Density token on `data-au-size`.',
      table: { category: 'Field' },
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
    autocomplete: {
      control: 'text',
      description: 'Native autocomplete hint.',
      table: { category: 'Field' },
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Only applies when `type` is `password`.',
      table: { category: 'Password' },
    },
  },
  args: {
    value: '',
    valueChange: fn(),
    blur: fn(),
  },
};

export default meta;
type Story = StoryObj<AuInputText>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic bound field with label and hint. The **play** function types sample text.',
      },
    },
  },
  args: {
    label: 'Username',
    placeholder: 'e.g. your_name',
    hint: 'Shown on your profile.',
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const el = within(canvasElement);
    const field = el.getByLabelText('Username');
    await userEvent.clear(field);
    await userEvent.type(field, 'hello');
    await expect(field).toHaveValue('hello');
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Invalid state driven by `errorMessage`. Check **`aria-invalid`** and **`aria-errormessage`** on the input in DevTools or the Accessibility tree.',
      },
    },
  },
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'email',
    errorMessage: 'Enter a valid email address.',
  },
  play: async ({ canvasElement }) => {
    const el = within(canvasElement);
    const field = el.getByLabelText('Email');
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    const errId = field.getAttribute('aria-errormessage');
    await expect(errId).toBeTruthy();
    const errEl = errId && canvasElement.ownerDocument.getElementById(errId);
    await expect(errEl).not.toBeNull();
    const alert = el.getByRole('alert');
    await expect(alert).toHaveTextContent('Enter a valid email address.');
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled fields keep focus rules platform-dependent; **no** `valueChange` while disabled.',
      },
    },
  },
  args: {
    label: 'Read-only (disabled)',
    disabled: true,
    placeholder: 'Not editable',
    value: 'fixed value',
  },
};

export const Password: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Password toggle is a **button** with `aria-pressed` and an explicit **Show password** / **Hide password** label. Tab into the field vs click to see different focus ring treatments.',
      },
    },
  },
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Min. 8 characters',
    autocomplete: 'new-password',
    showPasswordToggle: true,
  },
};

export const CompactSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Uses **`size="sm"`** (`data-au-size="sm"`) for denser layouts.',
      },
    },
  },
  args: {
    label: 'Small size',
    size: 'sm',
    placeholder: 'Smaller text',
  },
};

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'When **`required`** is true, the native attribute and **`aria-required`** are set; the asterisk is decorative with screen-reader text.',
      },
    },
  },
  args: {
    label: 'Subject',
    required: true,
    placeholder: 'Required on classic form submit',
  },
};
