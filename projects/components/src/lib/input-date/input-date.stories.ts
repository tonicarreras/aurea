import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { AuFormField } from '../form-field/form-field';
import {
  defaultFieldChromeArgs,
  fieldChromeArgTypes,
  formFieldControlRender,
  type FieldChromeStoryArgs,
} from '../form-field';
import { AuInputDate } from './input-date';

interface InputDateStoryArgs extends FieldChromeStoryArgs {
  valueChange: ReturnType<typeof fn>;
  blur: ReturnType<typeof fn>;
  value: string | null;
  placeholder: string;
  minDate: string | undefined;
  maxDate: string | undefined;
  disabled: boolean;
  readOnly: boolean;
  name: string;
  autocomplete: string | undefined;
  size: 'sm' | 'md' | 'lg';
}

const meta: Meta<InputDateStoryArgs> = {
  title: 'Aurea/Input date',
  component: AuInputDate,
  tags: ['autodocs', 'au', 'beta'],
  parameters: { layout: 'padded' },
  argTypes: {
    ...fieldChromeArgTypes,
    value: { control: 'text', table: { category: 'Value' } },
    valueChange: { table: { category: 'Events' } },
    blur: { table: { category: 'Events' } },
    placeholder: { control: 'text', table: { category: 'Field' } },
    minDate: { control: 'text', table: { category: 'Field' } },
    maxDate: { control: 'text', table: { category: 'Field' } },
    disabled: { control: 'boolean', table: { category: 'Field' } },
    readOnly: { control: 'boolean', table: { category: 'Field' } },
    name: { control: 'text', table: { category: 'Field' } },
    autocomplete: { control: 'text', table: { category: 'Field' } },
    size: { control: 'select', options: ['sm', 'md', 'lg'], table: { category: 'Field' } },
  } as Meta<InputDateStoryArgs>['argTypes'],
  args: {
    ...defaultFieldChromeArgs,
    valueChange: fn(),
    blur: fn(),
    value: null,
    placeholder: '',
    minDate: undefined,
    maxDate: undefined,
    disabled: false,
    readOnly: false,
    name: '',
    autocomplete: undefined,
    size: 'md',
  },
  render: (args) =>
    formFieldControlRender(
      [AuFormField, AuInputDate],
      args,
      `<au-input-date
  [(value)]="value"
  [placeholder]="placeholder"
  [minDate]="minDate"
  [maxDate]="maxDate"
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
type Story = StoryObj<InputDateStoryArgs>;

export const Default: Story = {
  args: {
    label: 'Start date',
    value: '',
    hint: 'Uses the native date picker where available.',
  },
};

export const WithBounds: Story = {
  args: {
    label: 'Booking',
    value: '2026-06-01',
    minDate: '2026-01-01',
    maxDate: '2026-12-31',
  },
};

export const CalendarTheming: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Abre el calendario nativo y cambia **Tema** en la barra. El popup sigue siendo del navegador (`accent-color` + `color-scheme`); el icono del campo y los segmentos de fecha usan tokens Aurea (Chromium / Safari).',
      },
    },
  },
  args: {
    label: 'Event date',
    value: '2026-05-18',
    hint: 'Toggle light / dark in the Storybook toolbar.',
    minDate: '2026-01-01',
    maxDate: '2026-12-31',
  },
};
