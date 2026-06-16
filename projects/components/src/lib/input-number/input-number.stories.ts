import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';
import { fn } from 'storybook/test';

import { AuFormField } from '../form-field/form-field';
import {
  defaultFieldChromeArgs,
  fieldChromeArgTypes,
  formFieldControlRender,
  type FieldChromeStoryArgs,
} from '../form-field';
import { AuInputNumber } from './au-input-number.directive';

interface InputNumberStoryArgs extends FieldChromeStoryArgs {
  valueChange: ReturnType<typeof fn>;
  blur: ReturnType<typeof fn>;
  value: number | null;
  placeholder: string;
  min: number | undefined;
  max: number | undefined;
  step: number | 'any';
  disabled: boolean;
  readOnly: boolean;
  name: string;
  autocomplete: string | undefined;
  size: 'sm' | 'md' | 'lg';
}

const meta: Meta<InputNumberStoryArgs> = {
  title: 'Aurea/InputNumber',
  component: AuInputNumber,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('input-number'),
  argTypes: {
    ...fieldChromeArgTypes,
    value: { control: 'number', table: { category: 'Value' } },
    valueChange: { table: { category: 'Events' } },
    blur: { table: { category: 'Events' } },
    placeholder: { control: 'text', table: { category: 'Field' } },
    min: { control: 'number', table: { category: 'Field' } },
    max: { control: 'number', table: { category: 'Field' } },
    step: { control: 'text', table: { category: 'Field' } },
    disabled: { control: 'boolean', table: { category: 'Field' } },
    readOnly: { control: 'boolean', table: { category: 'Field' } },
    name: { control: 'text', table: { category: 'Field' } },
    autocomplete: { control: 'text', table: { category: 'Field' } },
    size: { control: 'select', options: ['sm', 'md', 'lg'], table: { category: 'Field' } },
  } as Meta<InputNumberStoryArgs>['argTypes'],
  args: {
    ...defaultFieldChromeArgs,
    valueChange: fn(),
    blur: fn(),
    value: null,
    placeholder: '',
    min: undefined,
    max: undefined,
    step: 1,
    disabled: false,
    readOnly: false,
    name: '',
    autocomplete: undefined,
    size: 'md',
  },
  render: (args) =>
    formFieldControlRender(
      [AuFormField, AuInputNumber],
      args,
      `<input auInputNumber
  [(value)]="value"
  [placeholder]="placeholder"
  [min]="min"
  [max]="max"
  [step]="step"
  [disabled]="disabled"
  [readOnly]="readOnly"
  [required]="required"
  [name]="name"
  [autocomplete]="autocomplete"
  [size]="size"
  [invalid]="invalid"
/>`,
    ),
};

export default meta;
type Story = StoryObj<InputNumberStoryArgs>;

export const Default: Story = {
  args: {
    label: 'Quantity',
    placeholder: '0',
    value: null,
  },
};

export const WithBounds: Story = {
  args: {
    label: 'Port',
    min: 1,
    max: 65535,
    step: 1,
    value: 8080,
  },
};
