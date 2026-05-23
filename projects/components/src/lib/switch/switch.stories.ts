import type { Meta, StoryObj } from '@storybook/angular';
import { getStoryOverview } from '../story-docs/get-story-overview';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';
import { fn } from 'storybook/test';

import { AuFormField } from '../form-field/form-field';
import { fieldChromeHintOnlyArgTypes, formFieldHintOnlyRender } from '../form-field';
import { AuSwitch } from './switch';

const docsOverview = getStoryOverview('switch');

interface SwitchStoryArgs {
  checkedChange: ReturnType<typeof fn>;
  blur: ReturnType<typeof fn>;
  label: string;
  hint: string;
  errorMessage: string;
  invalid: boolean;
  required: boolean;
  controlIdInput: string;
  showRequired?: boolean;
  checked: boolean;
  disabled: boolean;
  name: string;
  size: 'sm' | 'md' | 'lg';
  errors: readonly unknown[];
}

const meta: Meta<SwitchStoryArgs> = {
  title: 'Aurea/Switch',
  component: AuSwitch,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters(docsOverview),
  argTypes: {
    ...fieldChromeHintOnlyArgTypes,
    label: {
      control: 'text',
      description: 'Inline label on the switch control.',
      table: { category: 'Content' },
    },
    checked: { control: 'boolean', table: { category: 'Value' } },
    checkedChange: { table: { category: 'Events' } },
    blur: { table: { category: 'Events' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    size: { control: 'select', options: ['sm', 'md', 'lg'], table: { category: 'Appearance' } },
    name: { control: 'text', table: { category: 'Field' } },
    errors: { control: false, table: { category: 'Validation' } },
  } as Meta<SwitchStoryArgs>['argTypes'],
  args: {
    label: '',
    hint: '',
    errorMessage: '',
    invalid: false,
    required: false,
    controlIdInput: '',
    showRequired: true,
    checkedChange: fn(),
    blur: fn(),
    checked: false,
    disabled: false,
    name: '',
    size: 'md',
    errors: [],
  },
  render: (args) =>
    formFieldHintOnlyRender(
      [AuFormField, AuSwitch],
      args,
      `<au-switch
  [(checked)]="checked"
  [label]="label"
  [disabled]="disabled"
  [required]="required"
  [showRequired]="showRequired"
  [size]="size"
  [name]="name"
  [invalid]="invalid"
  [errors]="$any(errors)"
/>`,
    ),
};

export default meta;
type Story = StoryObj<SwitchStoryArgs>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    checked: false,
  },
};

export const On: Story = {
  args: {
    label: 'Enabled',
    checked: true,
  },
};

export const WithHint: Story = {
  args: {
    label: 'Marketing emails',
    hint: 'You can change this anytime in settings.',
    checked: false,
  },
};
