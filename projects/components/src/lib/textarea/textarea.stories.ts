import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';
import { expect, fn, userEvent, within } from 'storybook/test';

import { AuFormField } from '../form-field/form-field';
import {
  defaultFieldChromeArgs,
  fieldChromeArgTypes,
  formFieldControlRender,
  type FieldChromeStoryArgs,
} from '../form-field';
import { AuTextarea } from './textarea';

type TextareaResize = 'none' | 'vertical' | 'both';

interface TextareaStoryArgs extends FieldChromeStoryArgs {
  valueChange: ReturnType<typeof fn>;
  blur: ReturnType<typeof fn>;
  value: string | null;
  placeholder: string;
  rows: number;
  cols: number | undefined;
  resize: TextareaResize;
  wrap: 'soft' | 'hard';
  spellcheck: boolean | undefined;
  disabled: boolean;
  readOnly: boolean;
  name: string;
  autocomplete: string | undefined;
  minLength: number | undefined;
  maxLength: number | undefined;
  size: 'sm' | 'md' | 'lg';
  errors: readonly unknown[];
}

const meta: Meta<TextareaStoryArgs> = {
  title: 'Aurea/Textarea',
  component: AuTextarea,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('textarea'),
  argTypes: {
    ...fieldChromeArgTypes,
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
    placeholder: {
      control: 'text',
      description: 'Native placeholder.',
      table: { category: 'Field' },
    },
    errors: {
      description: 'Signal-form errors via `formField`.',
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
    name: { control: 'text', table: { category: 'Field' } },
    autocomplete: { control: 'text', table: { category: 'Field' } },
  } as Meta<TextareaStoryArgs>['argTypes'],
  args: {
    ...defaultFieldChromeArgs,
    value: '',
    valueChange: fn(),
    blur: fn(),
    placeholder: '',
    rows: 4,
    cols: undefined,
    resize: 'vertical',
    wrap: 'soft',
    spellcheck: undefined,
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
      [AuFormField, AuTextarea],
      args,
      `<au-textarea
  [(value)]="value"
  [placeholder]="placeholder"
  [rows]="rows"
  [cols]="cols"
  [resize]="resize"
  [wrap]="wrap"
  [spellcheck]="spellcheck"
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
type Story = StoryObj<TextareaStoryArgs>;

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
    invalid: true,
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
        story:
          '**`readOnly`** — content is selectable but not editable; differs from **disabled** (greyed out, no edits).',
      },
    },
  },
  args: {
    label: 'System block',
    value: 'Auto-generated content.\nNot editable by the user.',
    readOnly: true,
  },
};
