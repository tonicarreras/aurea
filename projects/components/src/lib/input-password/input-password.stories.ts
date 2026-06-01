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
import { AuInputPassword } from './input-password';

interface InputPasswordStoryArgs extends FieldChromeStoryArgs {
  valueChange: ReturnType<typeof fn>;
  blur: ReturnType<typeof fn>;
  value: string | null;
  placeholder: string;
  autocomplete: string | undefined;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  name: string;
  size: 'sm' | 'md' | 'lg';
  showRevealToggle: boolean;
}

const meta: Meta<InputPasswordStoryArgs> = {
  title: 'Aurea/InputPassword',
  component: AuInputPassword,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('input-password'),
  argTypes: {
    ...fieldChromeArgTypes,
    value: { control: 'text', table: { category: 'Value' } },
    valueChange: { table: { category: 'Events' } },
    blur: { table: { category: 'Events' } },
    placeholder: { control: 'text', table: { category: 'Field' } },
    autocomplete: { control: 'text', table: { category: 'Field' } },
    disabled: { control: 'boolean', table: { category: 'Field' } },
    readOnly: { control: 'boolean', table: { category: 'Field' } },
    name: { control: 'text', table: { category: 'Field' } },
    size: { control: 'select', options: ['sm', 'md', 'lg'], table: { category: 'Field' } },
    showRevealToggle: { control: 'boolean', table: { category: 'Field' } },
  },
  args: {
    ...defaultFieldChromeArgs,
    valueChange: fn(),
    blur: fn(),
    value: null,
    placeholder: '',
    autocomplete: 'current-password',
    disabled: false,
    readOnly: false,
    name: '',
    size: 'md',
    showRevealToggle: true,
  },
  render: (args) =>
    formFieldControlRender(
      [AuFormField, AuInputPassword],
      args,
      `<au-input-password
  [(value)]="value"
  [placeholder]="placeholder"
  [autocomplete]="autocomplete"
  [disabled]="disabled"
  [readOnly]="readOnly"
  [required]="required"
  [name]="name"
  [size]="size"
  [invalid]="invalid"
  [showRevealToggle]="showRevealToggle"
/>`,
    ),
};

export default meta;
type Story = StoryObj<InputPasswordStoryArgs>;

export const Default: Story = {
  args: { label: 'Password', hint: 'Use at least 12 characters.' },
};

export const SignUp: Story = {
  args: {
    label: 'Create password',
    autocomplete: 'new-password',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    errorMessage: 'Password is required.',
    invalid: true,
    required: true,
  },
  play: async ({ canvasElement }) => {
    const el = within(canvasElement);
    const field = el.getByLabelText('Password');
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    const errId = field.getAttribute('aria-errormessage');
    await expect(errId).toBeTruthy();
    await expect(el.getByRole('alert')).toHaveTextContent('Password is required.');
  },
};

export const RevealToggle: Story = {
  args: { label: 'Password', value: 'secret' },
  play: async ({ canvasElement }) => {
    const el = within(canvasElement);
    const toggle = el.getByRole('button', { name: 'Show password' });
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(toggle);
    await expect(el.getByLabelText('Password')).toHaveAttribute('type', 'text');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect(toggle).toHaveAccessibleName('Hide password');
  },
};
