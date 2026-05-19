import { CommonModule, JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { type Meta, type StoryObj } from '@storybook/angular';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import { TEXTAREA_SIGNAL_DOCS_OVERVIEW } from './textarea-signal.docs-overview';
import { AuTextarea } from './textarea';

/**
 * Story-only host: `au-textarea` + `form()` with `required` + `minLength(20)` on `bio`.
 * Not exported from the library package.
 */
@Component({
  selector: 'story-textarea-signal-wrapper',
  imports: [AuTextarea, FormField, CommonModule, JsonPipe],
  template: `
    <p style="font:0.8rem/1.4 var(--au-font-sans,system-ui); color: var(--au-color-text-secondary, #5c6b7a); max-width: 26rem; margin: 0 0 1rem 0">
      Model: <code>{{ data() | json }}</code>
    </p>
    <au-textarea
      [formField]="fieldRoot.bio"
      label="Bio"
      placeholder="Who you are and what you do (20+ characters)…"
      [rows]="5"
      hint="Required validation + minimum length (signal form)."
    />
  `,
})
export class TextareaSignalHost {
  protected readonly data = signal({ bio: '' });
  protected readonly fieldRoot = form(this.data, (f) => {
    required(f.bio, { message: 'Bio is required' });
    minLength(f.bio, 20, { message: 'Write at least 20 characters' });
  });
}

const meta: Meta<TextareaSignalHost> = {
  title: 'Aurea/Textarea/Signal form',
  component: AuTextareaSignalHost,
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
type Story = StoryObj<TextareaSignalHost>;

export const WithValidation: Story = {
  name: 'With validation',
  parameters: {
    docs: {
      description: {
        story: 'Type fewer than **20** characters and blur to trigger **minLength** from the schema.',
      },
    },
  },
};
