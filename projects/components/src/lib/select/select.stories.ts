import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';

import { AuSelect, type SelectOption } from './select';

const sampleOptions: SelectOption[] = [
  { value: 'option1', label: 'Option One' },
  { value: 'option2', label: 'Option Two' },
  { value: 'option3', label: 'Option Three' },
  { value: 'option4', label: 'Option Four' },
];

const groupedOptions: SelectOption[] = [
  { value: 'group1', label: 'Group A - Option 1', disabled: true },
  { value: 'group2', label: 'Group A - Option 2' },
  { value: 'group3', label: 'Group B - Option 1' },
  { value: 'group4', label: 'Group B - Option 2' },
  { value: 'group5', label: 'Group B - Option 3', disabled: true },
];

const meta: Meta<AuSelect> = {
  title: 'Aurea/Select',
  component: AuSelect,
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
    docs: { extractArgTypes: () => ({}) },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Current value (`ModelSignal<string>`). Prefer `[(value)]` or `[formField]`.',
      table: { category: 'Value' },
    },
    valueChange: {
      description: 'Emits on every change event when not disabled.',
      table: { category: 'Events' },
    },
    blur: {
      description: 'Emits when the select loses focus.',
      table: { category: 'Events' },
    },
    label: {
      control: 'text',
      description: 'Visible label; linked with `for` / `id`.',
      table: { category: 'Chrome' },
    },
    hint: {
      control: 'text',
      description: 'Helper copy; `aria-describedby` when non-empty.',
      table: { category: 'Chrome' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder option displayed when no value is selected.',
      table: { category: 'Chrome' },
    },
    showRequired: {
      control: 'boolean',
      description: 'When `true` and `required`, shows `*` and screen-reader "(required)".',
      table: { category: 'Chrome' },
    },
    errorMessage: {
      control: 'text',
      description: 'Manual error string; takes precedence over `errors` for display.',
      table: { category: 'Validation' },
    },
    errors: {
      description: 'Populated by `formField` from signal forms.',
      table: { category: 'Validation' },
    },
    invalid: {
      control: 'boolean',
      description: 'External invalid flag (e.g. from `formField`).',
      table: { category: 'Validation' },
    },
    required: {
      control: 'boolean',
      description: 'Sets native `required` and `aria-required`.',
      table: { category: 'Validation' },
    },
    options: {
      description: 'Array of `SelectOption` objects.',
      table: { category: 'Field' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select and suppresses `valueChange`.',
      table: { category: 'Field' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Density token on `data-au-size`.',
      table: { category: 'Field' },
    },
    id: {
      control: 'text',
      description: 'Explicit `id`; auto-generated when empty.',
      table: { category: 'Field' },
    },
    name: {
      control: 'text',
      description: 'Native `name` for form posts.',
      table: { category: 'Field' },
    },
  },
  args: {
    value: '',
    valueChange: fn(),
    blur: fn(),
  },
};

export default meta;
type Story = StoryObj<AuSelect>;

/** Native label text includes required markers; match by accessible name. */
function getSelect(canvasElement: HTMLElement, name: string | RegExp) {
  return within(canvasElement).getByRole('combobox', { name });
}

/** Listbox is portaled to `document.body` (see `FieldListboxOverlay`). */
function getListbox(canvasElement: HTMLElement) {
  return within(canvasElement.ownerDocument.body).getByRole('listbox');
}

export const DropdownTheming: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Open the list and toggle **Tema** (toolbar). **Highlight** (hover / teclado) y **selected** comparten el mismo listbox que `au-autocomplete`.',
      },
    },
  },
  args: {
    label: 'Region',
    placeholder: 'Select a region…',
    options: [
      { value: 'eu', label: 'Europe' },
      { value: 'na', label: 'North America' },
      { value: 'sa', label: 'South America' },
      { value: 'ap', label: 'Asia Pacific' },
      { value: 'af', label: 'Africa' },
      { value: 'oc', label: 'Oceania' },
    ],
    size: 'md',
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic select with label, placeholder, and options. The **play** function selects an option.',
      },
    },
  },
  args: {
    label: 'Choose an option',
    placeholder: 'Select one...',
    options: sampleOptions,
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const select = getSelect(canvasElement, 'Choose an option');
    await userEvent.click(select);
    const listbox = getListbox(canvasElement);
    await userEvent.click(within(listbox).getByRole('option', { name: 'Option Two' }));
    await expect(select).toHaveTextContent('Option Two');
  },
};

export const WithValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select with a pre-selected value.',
      },
    },
  },
  args: {
    label: 'Country',
    placeholder: 'Select country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico' },
    ],
    value: 'ca',
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Invalid state driven by `errorMessage`. Check **`aria-invalid`** and **`aria-errormessage`** on the select in DevTools or the Accessibility tree.',
      },
    },
  },
  args: {
    label: 'Country',
    placeholder: 'Select country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
    ],
    errorMessage: 'Please select a country.',
  },
  play: async ({ canvasElement }) => {
    const el = within(canvasElement);
    const select = getSelect(canvasElement, /Country/);
    await expect(select).toHaveAttribute('aria-invalid', 'true');
    const errId = select.getAttribute('aria-errormessage');
    await expect(errId).toBeTruthy();
    const errEl = errId && canvasElement.ownerDocument.getElementById(errId);
    await expect(errEl).not.toBeNull();
    const alert = el.getByRole('alert');
    await expect(alert).toHaveTextContent('Please select a country.');
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled select; still focusable but `valueChange` does not fire.',
      },
    },
  },
  args: {
    label: 'Country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
    ],
    value: 'us',
    disabled: true,
  },
};

export const WithDisabledOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select with some options disabled (non-selectable).',
      },
    },
  },
  args: {
    label: 'Select item',
    placeholder: 'Choose...',
    options: groupedOptions,
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
    placeholder: 'Select...',
    options: sampleOptions,
  },
};

export const LargeSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Uses **`size="lg"`** (`data-au-size="lg"`) for larger touch targets.',
      },
    },
  },
  args: {
    label: 'Large size',
    size: 'lg',
    placeholder: 'Select...',
    options: sampleOptions,
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
    label: 'Country',
    placeholder: 'Select country (required)',
    required: true,
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
    ],
  },
  play: async ({ canvasElement }) => {
    const el = within(canvasElement);
    const select = getSelect(canvasElement, /Country/);
    await expect(select).toHaveAttribute('aria-required', 'true');
  },
};

export const WithHint: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select with hint text linked via **`aria-describedby`** when present.',
      },
    },
  },
  args: {
    label: 'Timezone',
    placeholder: 'Select timezone',
    hint: 'Used for scheduling and notifications.',
    options: [
      { value: 'est', label: 'Eastern Time (EST)' },
      { value: 'pst', label: 'Pacific Time (PST)' },
      { value: 'utc', label: 'UTC' },
    ],
  },
  play: async ({ canvasElement }) => {
    const el = within(canvasElement);
    const select = getSelect(canvasElement, 'Timezone');
    const hintId = select.getAttribute('aria-describedby');
    await expect(hintId).toBeTruthy();
  },
};