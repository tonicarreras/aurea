import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';

import { AuFormField } from '../form-field/form-field';
import {
  defaultFieldChromeArgs,
  fieldChromeArgTypes,
  formFieldControlRender,
  type FieldChromeStoryArgs,
} from '../form-field';
import { AuInputText } from './input-text';

const docsOverview = `
## Overview

\`au-input-text\` is a single-line text control. It implements Angular **signal forms** \`FormValueControl<string | null>\` (\`[formField]\`) or classic \`[(value)]\`. For label, hint, and errors, wrap it in **\`au-form-field\`** (see package **README** → *Signal forms*).

## When to use

| Use \`au-input-text\` | Prefer something else |
|----------------------|-------------------------|
| Single-line text, email, URL, search, password | Multi-line content → **\`au-textarea\`** |
| Same visual grammar as the rest of Aurea | Native input only when you do not need label/hint/error chrome |

## Anatomy

| Region | Element / role | Notes |
|--------|----------------|-------|
| Label host | Wrapper for stacking | Keeps label painting above the control shell for reliable contrast checks |
| Label | \`<label for>\` | Optional; associates visible text with the input \`id\` |
| Required | \`*\` + \`(required)\` for SR | \`showRequired\` can hide the asterisk; \`required\` still sets the HTML attribute when true |
| Control row | Border, background, focus ring | One surface; invalid state changes border/background |
| Input | \`<input>\` | \`aria-invalid\`, \`aria-errormessage\`, \`aria-describedby\` wired from inputs |
| Password toggle | \`<button type="button">\` | \`aria-pressed\`, \`aria-label\`; only when \`type="password"\` and \`showPasswordToggle\` |
| Hint | \`<p id="…-hint">\` | Tertiary text; not the error channel |
| Error | \`<div role="alert" id="…-error">\` | Shown when \`errorMessage\` or \`errors\` yields text |

## Keyboard and focus

| Interaction | Behavior |
|-------------|----------|
| **Tab** into the field | Outer **outline** focus ring (WCAG-friendly), class \`--from-tab\` on the control row |
| **Click** / pointer focus | **Inset** ring (\`box-shadow\`) so pointer users are not surprised by a large outer ring |
| **Space** in password toggle | Activates the button (native button behavior) |
| **Disabled** | No \`valueChange\`; input is not editable |

Focus modality is shared via \`tabFocusState\` (\`au-tab-focus-state.ts\`): \`pointerdown\` clears the “next focus is from Tab” flag before \`focusin\`.

## Accessibility

| Topic | Implementation |
|-------|----------------|
| Name | Visible \`<label>\` + \`for\` / \`id\`, or your own label elsewhere |
| Required | \`aria-required\` on the input when \`required\` is true |
| Invalid | \`aria-invalid="true"\` when there is a displayed error |
| Error message | \`aria-errormessage\` points to the error region \`id\` |
| Hint | \`aria-describedby\` references the hint \`id\` when hint text is non-empty |
| Password | Toggle exposes \`aria-pressed\` and a clear **Show password** / **Hide password** label |
| Contrast | Uses semantic tokens (\`--au-color-text-label\`, \`--au-color-text-tertiary\`, etc.) tuned for **WCAG 2.2 AA** on \`surface-canvas\` / \`surface-raised\` |

### Manual checks (Storybook **Accessibility** addon)

1. Run **Accessibility** → **Run** on each story (axe is manual in this project to avoid noise on every keystroke).
2. Tab through **Password** and confirm the focus ring matches keyboard vs mouse behavior.
3. **With error**: screen reader should hear the error associated with the field (\`aria-errormessage\`).

## Signal forms vs manual

| Mode | Where | Validation |
|------|--------|------------|
| Signal forms | \`[formField]\` on \`au-input-text\`; \`form()\` in your component | Schema drives \`errors\` / \`invalid\`; \`au-form-field\` shows the message |
| Manual | \`[(value)]\` + \`au-form-field\` \`errorMessage\` / \`invalid\` | Parent sets chrome (see **With error** story) |

Full \`form()\` example: **\`@aurea-design-system/components\` README** → *Signal forms*.

## Design tokens (reference)

| Concern | Token examples |
|---------|----------------|
| Field border | \`--au-color-form-border\`, hover \`--au-color-form-border-hover\` |
| Field surface | \`--au-color-surface-raised\`, error \`--au-color-form-error-bg\` |
| Label / hint | \`--au-color-text-label\`, \`--au-color-text-tertiary\` |
| Focus | \`--au-color-focus-ring\`, \`--au-shadow-focus-ring\` |

See **docs/DESIGN.md** for the full token model.
`.trim();

type InputTextType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'search' | 'url';

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
  showPasswordToggle: boolean;
  errors: readonly unknown[];
}

const meta: Meta<InputTextStoryArgs> = {
  title: 'Aurea/InputText',
  component: AuInputText,
  tags: ['autodocs', 'au', 'stable'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: docsOverview,
      },
    },
  },
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
    showPasswordToggle: true,
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
  [showPasswordToggle]="showPasswordToggle"
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
