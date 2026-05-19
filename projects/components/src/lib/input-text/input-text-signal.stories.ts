import { CommonModule, JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { type Meta, type StoryObj } from '@storybook/angular';
import { FormField, email, form, required } from '@angular/forms/signals';
import { INPUT_TEXT_SIGNAL_DOCS_OVERVIEW } from './input-text-signal.docs-overview';
import { AuInputText } from './input-text';

/**
 * Story-only host: wires `au-input-text` to `form()` with `required` + `email` validators.
 * Shipped for Storybook; not part of the published public API.
 */
@Component({
  selector: 'story-input-signal-wrapper',
  imports: [AuInputText, FormField, CommonModule, JsonPipe],
  template: `
    <p style="font:0.8rem/1.4 var(--au-font-sans,system-ui); color: var(--au-color-text-secondary, #5c6b7a); max-width: 26rem; margin: 0 0 1rem 0">
      Model: <code>{{ data() | json }}</code>
    </p>
    <au-input-text
      [formField]="fieldRoot.email"
      label="Email"
      type="email"
      placeholder="you@company.com"
      hint="Required validation and email format (signal form)."
    />
  `,
})
export class InputTextSignalHost {
  protected readonly data = signal({ email: '' });
  protected readonly fieldRoot = form(this.data, (f) => {
    required(f.email, { message: 'Email is required' });
    email(f.email, { message: 'Enter a valid email address' });
  });
}

const meta: Meta<InputTextSignalHost> = {
  title: 'Aurea/InputText/Signal form',
  component: AuInputTextSignalHost,
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
type Story = StoryObj<InputTextSignalHost>;

export const WithValidation: Story = {
  name: 'With validation',
  parameters: {
    docs: {
      description: {
        story: 'Interact with the field to see **signal form** validation messages flow into `au-input-text`.',
      },
    },
  },
};
