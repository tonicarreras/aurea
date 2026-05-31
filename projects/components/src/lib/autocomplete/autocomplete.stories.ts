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
import { AuAutocomplete, type AuAutocompleteOption } from './autocomplete';

const cities: AuAutocompleteOption[] = [
  { value: 'mad', label: 'Madrid' },
  { value: 'bcn', label: 'Barcelona' },
  { value: 'vlc', label: 'Valencia' },
  { value: 'svq', label: 'Sevilla' },
  { value: 'bio', label: 'Bilbao' },
  { value: 'agp', label: 'Málaga' },
];

interface AutocompleteStoryArgs extends FieldChromeStoryArgs {
  valueChange: ReturnType<typeof fn>;
  blur: ReturnType<typeof fn>;
  value: string | null;
  placeholder: string;
  options: AuAutocompleteOption[];
  disabled: boolean;
  readOnly: boolean;
  minFilterLength: number;
  strictSelection: boolean;
  caseSensitive: boolean;
  size: 'sm' | 'md' | 'lg';
  name: string;
  errors: readonly unknown[];
}

const meta: Meta<AutocompleteStoryArgs> = {
  title: 'Aurea/Autocomplete',
  component: AuAutocomplete,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('autocomplete'),
  argTypes: {
    ...fieldChromeArgTypes,
    value: {
      control: 'text',
      description: 'Selected option `value` (`string | null`).',
      table: { category: 'Value' },
    },
    valueChange: { table: { category: 'Events' } },
    blur: { table: { category: 'Events' } },
    placeholder: { control: 'text', table: { category: 'Field' } },
    options: { control: false, table: { category: 'Field' } },
    errors: { control: false, table: { category: 'Validation' } },
    minFilterLength: { control: 'number', table: { category: 'Field' } },
    strictSelection: { control: 'boolean', table: { category: 'Field' } },
    caseSensitive: { control: 'boolean', table: { category: 'Field' } },
    size: { control: 'select', options: ['sm', 'md', 'lg'], table: { category: 'Field' } },
    disabled: { control: 'boolean', table: { category: 'Field' } },
    readOnly: { control: 'boolean', table: { category: 'Field' } },
    name: { control: 'text', table: { category: 'Field' } },
  } as Meta<AutocompleteStoryArgs>['argTypes'],
  args: {
    ...defaultFieldChromeArgs,
    valueChange: fn(),
    blur: fn(),
    value: null,
    placeholder: '',
    options: [],
    disabled: false,
    readOnly: false,
    minFilterLength: 0,
    strictSelection: true,
    caseSensitive: false,
    size: 'md',
    name: '',
    errors: [],
  },
  render: (args) =>
    formFieldControlRender(
      [AuFormField, AuAutocomplete],
      args,
      `<au-autocomplete
  [(value)]="value"
  [options]="options"
  [placeholder]="placeholder"
  [disabled]="disabled"
  [readOnly]="readOnly"
  [required]="required"
  [minFilterLength]="minFilterLength"
  [strictSelection]="strictSelection"
  [caseSensitive]="caseSensitive"
  [size]="size"
  [name]="name"
  [invalid]="invalid"
  [errors]="$any(errors)"
/>`,
    ),
};

export default meta;
type Story = StoryObj<AutocompleteStoryArgs>;

function getCombobox(canvasElement: HTMLElement, name: string | RegExp) {
  return within(canvasElement).getByRole('combobox', { name });
}

/** Listbox is portaled to `document.body` (see `FieldListboxOverlay`). */
function getListbox(canvasElement: HTMLElement) {
  return within(canvasElement.ownerDocument.body).getByRole('listbox');
}

export const Default: Story = {
  args: {
    label: 'City',
    placeholder: 'Search cities…',
    options: cities,
  },
};

/** Interaction test: filter by typing and pick an option (CI / test-runner). */
export const TypeAndSelect: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Type to filter, then click an option. The **play** function runs in test-runner only.',
      },
    },
  },
  args: {
    label: 'City',
    placeholder: 'Search cities…',
    options: cities,
  },
  play: async ({ canvasElement }) => {
    const combo = getCombobox(canvasElement, 'City');
    await userEvent.click(combo);
    await userEvent.type(combo, 'bar');
    const listbox = getListbox(canvasElement);
    await userEvent.click(within(listbox).getByRole('option', { name: 'Barcelona' }));
    await expect(combo).toHaveValue('Barcelona');
  },
};

export const WithValue: Story = {
  args: {
    label: 'City',
    options: cities,
    value: 'vlc',
  },
};

export const WithError: Story = {
  args: {
    label: 'City',
    options: cities,
    errorMessage: 'Choose a city from the list.',
    invalid: true,
  },
  play: async ({ canvasElement }) => {
    const combo = getCombobox(canvasElement, /City/);
    await expect(combo).toHaveAttribute('aria-invalid', 'true');
  },
};

export const Disabled: Story = {
  args: {
    label: 'City',
    options: cities,
    value: 'mad',
    disabled: true,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'City',
    placeholder: 'Search…',
    options: [
      { value: 'mad', label: 'Madrid' },
      { value: 'old', label: 'Legacy (deprecated)', disabled: true },
      { value: 'bcn', label: 'Barcelona' },
    ],
  },
};

export const MinFilterLength: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The list opens only after typing at least **`minFilterLength`** characters.',
      },
    },
  },
  args: {
    label: 'City',
    placeholder: 'Type 2+ letters…',
    options: cities,
    minFilterLength: 2,
  },
};

export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use **ArrowDown** / **ArrowUp**, **Enter** to select, **Escape** to close.',
      },
    },
  },
  args: {
    label: 'City',
    placeholder: 'Keyboard demo',
    options: cities,
  },
  play: async ({ canvasElement }) => {
    const combo = getCombobox(canvasElement, 'City');
    await userEvent.click(combo);
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(combo).toHaveValue('Barcelona');
  },
};

export const CompactSize: Story = {
  args: { label: 'City', size: 'sm', options: cities, placeholder: 'Search…' },
};

export const LargeSize: Story = {
  args: { label: 'City', size: 'lg', options: cities, placeholder: 'Search…' },
};
