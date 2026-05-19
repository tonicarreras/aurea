import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';

import { TEXTAREA_DOCS_OVERVIEW } from './textarea.docs-overview';
import { AuTextarea } from './textarea';

const meta: Meta<AuTextarea> = {
  title: 'Aurea/Textarea',
  component: AuTextarea,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: TEXTAREA_DOCS_OVERVIEW,
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Current value (`ModelSignal<string>`).',
      table: { category: 'Value' },
    },
    valueChange: {
      description: 'Emits on input when not disabled.',
      table: { category: 'Events' },
    },
    blur: {
      description: 'Emits when the textarea loses focus.',
      table: { category: 'Events' },
    },
    label: {
      control: 'text',
      description: 'Visible label; `for` matches textarea `id`.',
      table: { category: 'Chrome' },
    },
    hint: {
      control: 'text',
      description: 'Helper text; `aria-describedby` when set.',
      table: { category: 'Chrome' },
    },
    placeholder: {
      control: 'text',
      description: 'Native placeholder.',
      table: { category: 'Chrome' },
    },
    showRequired: {
      control: 'boolean',
      description: 'Shows `*` + SR-only “(required)” when combined with `required`.',
      table: { category: 'Chrome' },
    },
    errorMessage: {
      control: 'text',
      description: 'Manual error; overrides `errors` display when non-empty.',
      table: { category: 'Validation' },
    },
    errors: {
      description: 'Signal-form errors via `formField`.',
      table: { category: 'Validation' },
    },
    invalid: {
      control: 'boolean',
      description: 'External invalid from parent or directive.',
      table: { category: 'Validation' },
    },
    required: {
      control: 'boolean',
      description: 'Native `required` + `aria-required`.',
      table: { category: 'Validation' },
    },
    minLength: {
      control: 'number',
      table: { category: 'Validation' },
    },
    maxLength: {
      control: 'number',
      table: { category: 'Validation' },
    },
    rows: {
      control: 'number',
      description: 'Logical rows (`rows` attribute).',
      table: { category: 'Field' },
    },
    cols: {
      control: 'number',
      description: 'Optional `cols` attribute.',
      table: { category: 'Field' },
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'both'],
      description: 'Default **vertical** to avoid breaking horizontal layouts.',
      table: { category: 'Field' },
    },
    wrap: {
      control: 'select',
      options: ['soft', 'hard'],
      table: { category: 'Field' },
    },
    spellcheck: {
      control: 'boolean',
      description: '`true` / `false` / unset for browser default.',
      table: { category: 'Field' },
    },
    readOnly: {
      control: 'boolean',
      table: { category: 'Field' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'Field' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Padding and type scale.',
      table: { category: 'Field' },
    },
    id: { control: 'text', table: { category: 'Field' } },
    name: { control: 'text', table: { category: 'Field' } },
    autocomplete: { control: 'text', table: { category: 'Field' } },
  },
  args: {
    value: '',
    valueChange: fn(),
    blur: fn(),
  },
};

export default meta;
type Story = StoryObj<AuTextarea>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default **`resize="vertical"`** and hint. **Play** types sample content.',
      },
    },
  },
  args: {
    label: 'Description',
    placeholder: 'Briefly describe the context…',
    hint: 'Visible to the rest of the team (depending on permissions).',
    size: 'md',
    rows: 4,
  },
  play: async ({ canvasElement }) => {
    const el = within(canvasElement);
    const field = el.getByLabelText('Description');
    await userEvent.clear(field);
    await userEvent.type(field, 'Test context');
    await expect(field).toHaveValue('Test context');
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error region uses **`role="alert"`** so assistive tech picks up validation text.',
      },
    },
  },
  args: {
    label: 'Comment',
    rows: 3,
    errorMessage: 'Add at least one sentence.',
  },
  play: async ({ canvasElement }) => {
    const el = within(canvasElement);
    const field = el.getByLabelText('Comment');
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    const errId = field.getAttribute('aria-errormessage');
    await expect(errId).toBeTruthy();
    const errEl = errId && canvasElement.ownerDocument.getElementById(errId);
    await expect(errEl).not.toBeNull();
    const alert = el.getByRole('alert');
    await expect(alert).toHaveTextContent('Add at least one sentence.');
  },
};

export const ReadOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: '**`readOnly`** — content is selectable but not editable; differs from **disabled** (greyed out, no edits).',
      },
    },
  },
  args: {
    label: 'System block',
    value: 'Auto-generated content.\nNot editable by the user.',
    readOnly: true,
  },
};
