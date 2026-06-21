import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import type { Meta, StoryObj } from '@storybook/angular';
import { storyMetaParameters } from '../story-docs/story-meta-parameters';

import { AuButton } from '../button';
import { AuInputText } from '../input-text';
import { AuMessage } from '../message/message';
import { AuSelect } from '../select/select';
import { AuStack } from '../layout/au-stack.directive';
import { AuFormDirective } from '../form/au-form';
import { AuFormField } from './form-field';
import { JsonPipe } from '@angular/common';

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
    hint: 'We only use your email for notifications.',
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
      <div class="au-story-field">
        <au-form-field
          [label]="label"
          [hint]="hint"
          [errorMessage]="errorMessage"
          [invalid]="invalid"
          [required]="required"
          [controlIdInput]="controlIdInput"
        >
          <input auInputText placeholder="you@example.com" />
        </au-form-field>
      </div>
    `,
  }),
};

export const WithHint: Story = {
  args: {
    hint: 'Shown below the label, above the control.',
    required: false,
  },
  render: WithInput.render,
};

export const WithError: Story = {
  args: {
    hint: '',
    invalid: true,
    errorMessage: 'Enter a valid email address.',
  },
  render: WithInput.render,
};

@Component({
  selector: 'validate-on-submit-demo',
  imports: [
    AuButton,
    AuFormField,
    AuInputText,
    AuMessage,
    AuSelect,
    AuStack,
    AuFormDirective,
    FormField,
    FormRoot,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="au-story-field">
      @if (profileForm().invalid() && submitAttempted()) {
        <au-message
          variant="warning"
          message="Please fix the errors below."
        />
      }
      <p></p>
      @if (saved()) {
        <au-message
          variant="success"
          message="Saved."
        />
      }

      <form
        auForm
        [formRoot]="profileForm"
        [showValidation]="submitAttempted()"
        style="display: flex; flex-direction: column; gap: var(--au-space-4);"
      >
        <div
          auStack
          gap="md"
        >
          <au-form-field
            label="Name"
            [required]="true"
          >
            <input
              auInputText
              [formField]="profileForm.name"
              placeholder="Your name"
            />
          </au-form-field>

          <au-form-field
            label="Role"
            [required]="true"
          >
            <au-select
              [formField]="profileForm.role"
              [options]="roleOptions"
              placeholder="Select a role"
            />
          </au-form-field>
        </div>

        <button
          auButton
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  `,
})
class ValidateOnSubmitDemo {
  readonly submitAttempted = signal(false);
  readonly saved = signal(false);

  readonly profile = signal({ name: '' as string, role: null as string | null });

  readonly profileForm = form(
    this.profile,
    (model) => {
      required(model.name, { message: 'This field is required.' });
      required(model.role, { message: 'This field is required.' });
    },
    {
      submission: {
        action: async () => {
          this.saved.set(true);
          this.submitAttempted.set(false);
        },
        onInvalid: () => {
          this.submitAttempted.set(true);
          this.saved.set(false);
        },
      },
    },
  );

  readonly roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
  ];
}

export const ValidateOnSubmit: Story = {
  name: 'Validate on submit',
  render: () => ({
    moduleMetadata: { imports: [ValidateOnSubmitDemo] },
    template: `<validate-on-submit-demo />`,
  }),
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `@Component({
  imports: [AuFormField, AuFormDirective, AuInputText, AuSelect, AuButton, FormField, FormRoot],
  template: \`
    <form auForm [formRoot]="profileForm" [showValidation]="submitAttempted()">
      <au-form-field label="Name" [required]="true">
        <input auInputText [formField]="profileForm.name" />
      </au-form-field>
      <au-form-field label="Role" [required]="true">
        <au-select [formField]="profileForm.role" [options]="roleOptions" />
      </au-form-field>
      <button auButton type="submit">Submit</button>
    </form>
  \`,
})
export class ProfileForm {
  readonly submitAttempted = signal(false);
  readonly profile = signal({ name: '', role: null as string | null });
  readonly profileForm = form(this.profile, (m) => {
    required(m.name, { message: 'This field is required.' });
    required(m.role, { message: 'This field is required.' });
  }, {
    submission: {
      action: async () => { /* saved */ },
      onInvalid: () => this.submitAttempted.set(true),
    },
  });
}`.trim(),
      },
      description: {
        story: `
Signal form with **validate on submit** (app-owned visibility):

1. \`form[auForm]\` with \`[showValidation]="submitAttempted()"\` once — all fields inherit; override per field if needed.
2. \`[formRoot]\` on the \`<form>\`; set \`submitAttempted\` in \`submission.onInvalid\` (or your own submit handler).
3. Default without inherited \`showValidation\`: \`showErrorsWhen="touched"\` uses control interaction only.
4. Do not mix manual \`[invalid]\` on the wrapper with \`[formField]\` on the child.

For modal footers outside the form, use \`type="submit"\` + \`[attr.form]="formId"\` (see composition guide).
        `.trim(),
      },
    },
  },
};
