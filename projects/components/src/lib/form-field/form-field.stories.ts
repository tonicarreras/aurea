import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuInputText } from '../input-text/input-text';
import { AuFormField } from './form-field';

/** Story args use plain values; do not name args `controlId` — it collides with controls' `controlId()` signals. */

interface FormFieldStoryArgs {
  label: string;
  hint: string;
  errorMessage: string;
  invalid: boolean;
  required: boolean;
  controlIdInput: string;
}

const meta: Meta<FormFieldStoryArgs> = {
  title: 'Aurea/FormField',
  component: AuFormField,
  tags: ['autodocs', 'au', 'stable'],
  parameters: storyMetaParameters('form-field'),
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    hint: { control: 'text', table: { category: 'Content' } },
    errorMessage: { control: 'text', table: { category: 'Validation' } },
    invalid: { control: 'boolean', table: { category: 'Validation' } },
    required: { control: 'boolean', table: { category: 'Validation' } },
    controlIdInput: { control: 'text', table: { category: 'Accessibility' } },
  },
  args: {
    label: 'Email',
    hint: '',
    errorMessage: '',
    invalid: false,
    required: true,
    controlIdInput: 'story-email',
  },
};

export default meta;
type Story = StoryObj<FormFieldStoryArgs>;

export const WithInput: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [AuFormField, AuInputText] },
    template: `
      <au-form-field
        [label]="label"
        [hint]="hint"
        [errorMessage]="errorMessage"
        [invalid]="invalid"
        [required]="required"
        [controlIdInput]="controlIdInput"
      >
        <au-input-text placeholder="you@example.com" />
      </au-form-field>
    `,
  }),
};

export const WithError: Story = {
  args: {
    invalid: true,
    errorMessage: 'Enter a valid email address.',
  },
  render: WithInput.render,
};
