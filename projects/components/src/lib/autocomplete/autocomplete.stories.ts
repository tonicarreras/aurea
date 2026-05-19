import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';

import { AuAutocomplete, type AutocompleteOption } from './autocomplete';

const cities: AutocompleteOption[] = [
  { value: 'mad', label: 'Madrid' },
  { value: 'bcn', label: 'Barcelona' },
  { value: 'vlc', label: 'Valencia' },
  { value: 'svq', label: 'Sevilla' },
  { value: 'bio', label: 'Bilbao' },
  { value: 'agp', label: 'Málaga' },
];

const meta: Meta<AuAutocomplete> = {
  title: 'Aurea/Autocomplete',
  component: AuAutocomplete,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
    docs: { extractArgTypes: () => ({}) },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Selected option `value` (`string | null`).',
      table: { category: 'Value' },
    },
    valueChange: { table: { category: 'Events' } },
    blur: { table: { category: 'Events' } },
    label: { control: 'text', table: { category: 'Chrome' } },
    hint: { control: 'text', table: { category: 'Chrome' } },
    placeholder: { control: 'text', table: { category: 'Chrome' } },
    options: { control: false, table: { category: 'Field' } },
    errors: { control: false, table: { category: 'Validation' } },
    minFilterLength: { control: 'number', table: { category: 'Field' } },
    strictSelection: { control: 'boolean', table: { category: 'Field' } },
    size: { control: 'select', options: ['sm', 'md', 'lg'], table: { category: 'Field' } },
    errorMessage: { control: 'text', table: { category: 'Validation' } },
    invalid: { control: 'boolean', table: { category: 'Validation' } },
    required: { control: 'boolean', table: { category: 'Validation' } },
  },
  args: {
    valueChange: fn(),
    blur: fn(),
  },
};

export default meta;
type Story = StoryObj<AuAutocomplete>;

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
  play: async ({ canvasElement }) => {
    const combo = getCombobox(canvasElement, 'City');
    await userEvent.click(combo);
    await userEvent.type(combo, 'bar');
    const listbox = getListbox(canvasElement);
    await expect(listbox).toBeVisible();
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
