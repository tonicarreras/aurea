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
import { AuTagInput } from './tag-input';

interface TagInputStoryArgs extends FieldChromeStoryArgs {
  valueChange: ReturnType<typeof fn>;
  blur: ReturnType<typeof fn>;
  value: string[];
  placeholder: string;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  name: string;
  size: 'sm' | 'md' | 'lg';
  allowDuplicates: boolean;
  maxTags: number | undefined;
}

const meta: Meta<TagInputStoryArgs> = {
  title: 'Aurea/TagInput',
  component: AuTagInput,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('tag-input'),
  argTypes: {
    ...fieldChromeArgTypes,
    value: { control: false, table: { category: 'Value' } },
    valueChange: { table: { category: 'Events' } },
    blur: { table: { category: 'Events' } },
    placeholder: { control: 'text', table: { category: 'Field' } },
    disabled: { control: 'boolean', table: { category: 'Field' } },
    readOnly: { control: 'boolean', table: { category: 'Field' } },
    name: { control: 'text', table: { category: 'Field' } },
    size: { control: 'select', options: ['sm', 'md', 'lg'], table: { category: 'Field' } },
    allowDuplicates: { control: 'boolean', table: { category: 'Field' } },
    maxTags: { control: 'number', table: { category: 'Field' } },
  },
  args: {
    ...defaultFieldChromeArgs,
    valueChange: fn(),
    blur: fn(),
    value: ['angular', 'typescript'],
    placeholder: 'Add tag…',
    disabled: false,
    readOnly: false,
    name: '',
    size: 'md',
    allowDuplicates: false,
    maxTags: undefined,
  },
  render: (args) =>
    formFieldControlRender(
      [AuFormField, AuTagInput],
      args,
      `<au-tag-input
  [(value)]="value"
  [placeholder]="placeholder"
  [disabled]="disabled"
  [readOnly]="readOnly"
  [required]="required"
  [name]="name"
  [size]="size"
  [invalid]="invalid"
  [allowDuplicates]="allowDuplicates"
  [maxTags]="maxTags"
/>`,
    ),
};

export default meta;
type Story = StoryObj<TagInputStoryArgs>;

export const Default: Story = {
  args: {
    label: 'Technologies',
    hint: 'Press Enter or comma to add a tag.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Skills',
    errorMessage: 'Add at least one skill.',
    invalid: true,
    value: [],
  },
  play: async ({ canvasElement }) => {
    const el = within(canvasElement);
    const field = el.getByLabelText('Skills');
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    await expect(el.getByRole('alert')).toHaveTextContent('Add at least one skill.');
  },
};

export const RemoveTag: Story = {
  args: { label: 'Tags', value: ['angular'] },
  play: async ({ canvasElement }) => {
    const el = within(canvasElement);
    await userEvent.click(el.getByRole('button', { name: 'Remove tag: angular' }));
    await expect(el.getByLabelText('Tags')).toBeTruthy();
    await expect(el.queryByRole('button', { name: /Remove tag/ })).toBeNull();
  },
};
