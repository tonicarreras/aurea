import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { AuFormField } from '../form-field/form-field';
import {
  defaultFieldChromeArgs,
  fieldChromeArgTypes,
  formFieldControlRender,
  type FieldChromeStoryArgs,
} from '../form-field';
import { AuRadioGroup, type AuRadioOption } from './radio-group';

const sample: AuRadioOption[] = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
  { value: 'none', label: 'None' },
];

interface RadioGroupStoryArgs extends FieldChromeStoryArgs {
  valueChange: ReturnType<typeof fn>;
  blur: ReturnType<typeof fn>;
  value: string | null;
  options: AuRadioOption[];
  disabled: boolean;
  readOnly: boolean;
  name: string;
  size: 'sm' | 'md' | 'lg';
  errors: readonly unknown[];
}

const meta: Meta<RadioGroupStoryArgs> = {
  title: 'Aurea/Radio group',
  component: AuRadioGroup,
  tags: ['autodocs', 'au', 'stable'],
  parameters: { layout: 'padded' },
  argTypes: {
    ...fieldChromeArgTypes,
    value: { control: 'text', table: { category: 'Value' } },
    valueChange: { table: { category: 'Events' } },
    blur: { table: { category: 'Events' } },
    options: { control: false, table: { category: 'Field' } },
    disabled: { control: 'boolean', table: { category: 'Field' } },
    readOnly: { control: 'boolean', table: { category: 'Field' } },
    name: { control: 'text', table: { category: 'Field' } },
    size: { control: 'select', options: ['sm', 'md', 'lg'], table: { category: 'Field' } },
    errors: { control: false, table: { category: 'Validation' } },
  } as Meta<RadioGroupStoryArgs>['argTypes'],
  args: {
    ...defaultFieldChromeArgs,
    options: sample,
    valueChange: fn(),
    blur: fn(),
    value: null,
    disabled: false,
    readOnly: false,
    name: '',
    size: 'md',
    errors: [],
  },
  render: (args) =>
    formFieldControlRender(
      [AuFormField, AuRadioGroup],
      args,
      `<au-radio-group
          [(value)]="value"
          [options]="options"
          [disabled]="disabled"
          [readOnly]="readOnly"
          [required]="required"
          [name]="name"
          [size]="size"
          [invalid]="invalid"
          [errors]="$any(errors)"
        />`,
    ),
};

export default meta;
type Story = StoryObj<RadioGroupStoryArgs>;

export const Default: Story = {
  args: {
    label: 'Contact preference',
    value: 'email',
  },
};

export const Required: Story = {
  args: {
    label: 'Pick one',
    required: true,
    value: '',
  },
};
