import { JsonPipe } from '@angular/common';
import { signal } from '@angular/core';
import { type Meta, type StoryObj } from '@storybook/angular';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import { AuFormField } from '../form-field/form-field';
import { TEXTAREA_SIGNAL_DOCS_OVERVIEW } from './textarea-signal.docs-overview';
import { AuTextarea } from './textarea';

const signalFormImports = [AuFormField, AuTextarea, FormField, JsonPipe];

const meta: Meta = {
  title: 'Aurea/Textarea/Signal form',
  tags: ['autodocs', 'au'],
  parameters: {
    layout: 'padded',
    docs: {
      extractArgTypes: () => ({}),
      description: {
        component: TEXTAREA_SIGNAL_DOCS_OVERVIEW,
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
        story: 'Type fewer than **20** characters and blur to trigger **minLength** from the schema.',
      },
    },
  },
  render: () => {
    const data = signal({ bio: '' });
    const fieldRoot = form(data, (f) => {
      required(f.bio, { message: 'Bio is required' });
      minLength(f.bio, 20, { message: 'Write at least 20 characters' });
    });
    return {
      props: { data, fieldRoot },
      moduleMetadata: { imports: signalFormImports },
      template: `
        <p style="font:0.8rem/1.4 var(--au-font-sans,system-ui); color: var(--au-color-text-secondary, #5c6b7a); max-width: 26rem; margin: 0 0 1rem 0">
          Model: <code>{{ data() | json }}</code>
        </p>
        <au-form-field
          label="Bio"
          hint="Required validation + minimum length (signal form)."
          required
        >
          <au-textarea
            [formField]="fieldRoot.bio"
            placeholder="Who you are and what you do (20+ characters)…"
            [rows]="5"
          />
        </au-form-field>
      `,
    };
  },
};
