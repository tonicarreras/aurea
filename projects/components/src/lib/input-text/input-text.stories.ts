import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';
import { expect, fn, within } from 'storybook/test';

import { playUserEvent } from '../../../.storybook/story-user-event';
import { AuFormField } from '../form-field/form-field';
import {
  defaultFieldChromeArgs,
  fieldChromeArgTypes,
  formFieldControlRender,
  type FieldChromeStoryArgs,
} from '../form-field';
import { AuInputText } from './input-text';

type InputTextType = 'text' | 'email' | 'number' | 'tel' | 'search' | 'url';

interface InputTextStoryArgs extends FieldChromeStoryArgs {
  valueChange: ReturnType<typeof fn>;
  blur: ReturnType<typeof fn>;
  value: string | null;
  placeholder: string;
  type: InputTextType;
  disabled: boolean;
  readOnly: boolean;
  name: string;
  autocomplete: string | undefined;
  minLength: number | undefined;
  maxLength: number | undefined;
  size: 'sm' | 'md' | 'lg';
  errors: readonly unknown[];
}

const meta: Meta<InputTextStoryArgs> = {
  title: 'Aurea/InputText',
  component: AuInputText,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('input-text'),
  argTypes: {
    ...fieldChromeArgTypes,
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
    placeholder: {
      control: 'text',
      description: 'Native placeholder; use hint for longer guidance.',
      table: { category: 'Field' },
    },
    errors: {
      description: 'Populated by `formField` from signal forms.',
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
      options: ['text', 'email', 'number', 'tel', 'search', 'url'],
      description: 'Native HTML input type. For passwords use `au-input-password`.',
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
  } as Meta<InputTextStoryArgs>['argTypes'],
  args: {
    ...defaultFieldChromeArgs,
    value: '',
    valueChange: fn(),
    blur: fn(),
    placeholder: '',
    type: 'text',
    disabled: false,
    readOnly: false,
    name: '',
    autocomplete: undefined,
    minLength: undefined,
    maxLength: undefined,
    size: 'md',
    errors: [],
  },
  render: (args) =>
    formFieldControlRender(
      [AuFormField, AuInputText],
      args,
      `<au-input-text
  [(value)]="value"
  [placeholder]="placeholder"
  [type]="type"
  [disabled]="disabled"
  [readOnly]="readOnly"
  [required]="required"
  [name]="name"
  [autocomplete]="autocomplete"
  [minLength]="minLength"
  [maxLength]="maxLength"
  [size]="size"
  [invalid]="invalid"
  [errors]="$any(errors)"
/>`,
    ),
};

export default meta;
type Story = StoryObj<InputTextStoryArgs>;

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
    await playUserEvent.clear(field);
    await playUserEvent.type(field, 'hello');
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
    invalid: true,
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
        story:
          'Disabled fields keep focus rules platform-dependent; **no** `valueChange` while disabled.',
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
