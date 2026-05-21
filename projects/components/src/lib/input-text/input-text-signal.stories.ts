import { JsonPipe } from '@angular/common';
import { signal } from '@angular/core';
import { type Meta, type StoryObj } from '@storybook/angular';
import { FormField, email, form, required } from '@angular/forms/signals';
import { AuFormField } from '../form-field/form-field';
import { INPUT_TEXT_SIGNAL_DOCS_OVERVIEW } from './input-text-signal.docs-overview';
import { AuInputText } from './input-text';

const signalFormImports = [AuFormField, AuInputText, FormField, JsonPipe];

const meta: Meta = {
  title: 'Aurea/InputText/Signal form',
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
    docs: {
      extractArgTypes: () => ({}),
      description: {
        component: INPUT_TEXT_SIGNAL_DOCS_OVERVIEW,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const WithValidation: Story = {
  name: 'With validation',
  parameters: {
    docs: {
      description: {
        story: 'Interact with the field to see **signal form** validation messages flow into `au-input-text`.',
      },
    },
  },
  render: () => {
    const data = signal({ email: '' });
    const fieldRoot = form(data, (f) => {
      required(f.email, { message: 'Email is required' });
      email(f.email, { message: 'Enter a valid email address' });
    });
    return {
      props: { data, fieldRoot },
      moduleMetadata: { imports: signalFormImports },
      template: `
        <p style="font:0.8rem/1.4 var(--au-font-sans,system-ui); color: var(--au-color-text-secondary, #5c6b7a); max-width: 26rem; margin: 0 0 1rem 0">
          Model: <code>{{ data() | json }}</code>
        </p>
        <au-form-field
          label="Email"
          hint="Required validation and email format (signal form)."
          required
        >
          <au-input-text
            [formField]="fieldRoot.email"
            type="email"
            placeholder="you@company.com"
          />
        </au-form-field>
      `,
    };
  },
};
