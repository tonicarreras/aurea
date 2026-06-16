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
import { AuInputTime } from './au-input-time.directive';

interface InputTimeStoryArgs extends FieldChromeStoryArgs {
  valueChange: ReturnType<typeof fn>;
  blur: ReturnType<typeof fn>;
  value: string | null;
  placeholder: string;
  minTime: string | undefined;
  maxTime: string | undefined;
  disabled: boolean;
  readOnly: boolean;
  name: string;
  autocomplete: string | undefined;
  size: 'sm' | 'md' | 'lg';
}

const meta: Meta<InputTimeStoryArgs> = {
  title: 'Aurea/InputTime',
  component: AuInputTime,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('input-time'),
  argTypes: {
    ...fieldChromeArgTypes,
    value: { control: 'text', table: { category: 'Value' } },
    valueChange: { table: { category: 'Events' } },
    blur: { table: { category: 'Events' } },
    placeholder: { control: 'text', table: { category: 'Field' } },
    minTime: { control: 'text', table: { category: 'Field' } },
    maxTime: { control: 'text', table: { category: 'Field' } },
    disabled: { control: 'boolean', table: { category: 'Field' } },
    readOnly: { control: 'boolean', table: { category: 'Field' } },
    name: { control: 'text', table: { category: 'Field' } },
    autocomplete: { control: 'text', table: { category: 'Field' } },
    size: { control: 'select', options: ['sm', 'md', 'lg'], table: { category: 'Field' } },
  } as Meta<InputTimeStoryArgs>['argTypes'],
  args: {
    ...defaultFieldChromeArgs,
    valueChange: fn(),
    blur: fn(),
    value: null,
    placeholder: '',
    minTime: undefined,
    maxTime: undefined,
    disabled: false,
    readOnly: false,
    name: '',
    autocomplete: undefined,
    size: 'md',
  },
  render: (args) =>
    formFieldControlRender(
      [AuFormField, AuInputTime],
      args,
      `<input auInputTime
  [(value)]="value"
  [placeholder]="placeholder"
  [minTime]="minTime"
  [maxTime]="maxTime"
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
type Story = StoryObj<InputTimeStoryArgs>;

export const Default: Story = {
  args: {
    label: 'Start time',
    value: '',
    hint: 'Uses the native time picker where available.',
  },
};

export const WithBounds: Story = {
  args: {
    label: 'Booking',
    value: '10:30',
    minTime: '08:00',
    maxTime: '20:00',
  },
};

export const PickerTheming: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Open the native time picker and toggle **Theme** in the toolbar. The popup is browser-owned; inline segments use Aurea tokens (WebKit and Firefox). Chromium/Safari show the Aurea clock icon; Firefox uses its native icon (no CSS hook to hide it).',
      },
    },
  },
  args: {
    label: 'Event time',
    value: '14:00',
    hint: 'Toggle light / dark in the Storybook toolbar.',
    minTime: '08:00',
    maxTime: '22:00',
  },
};
