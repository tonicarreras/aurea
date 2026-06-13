import type { GuidesMessages } from '../../types/guides';

export const GUIDES_EN: GuidesMessages = {
  adoption: {
    title: 'Adoption guide',
    lead: 'Index of guides by topic; each one has its own page.',
    cards: [
      {
        title: 'Get started',
        description: 'Install, au-tokens + aurea-global.css, and your first component.',
        path: 'get-started',
      },
      {
        title: 'Signal forms',
        description: 'Angular 22 signal forms with au-form-field and validators.',
        path: 'guides/signal-forms',
      },
      {
        title: 'Themes & tokens',
        description: 'Light/dark, density, and high-contrast palettes.',
        path: 'themes',
      },
      {
        title: 'CRUD reference demo',
        description: 'Table, pagination, menu, dialog, signal forms.',
        path: 'guides/crud-demo',
      },
      {
        title: 'Component maturity',
        description: 'Stable, beta, and experimental levels per component.',
        path: 'maturity',
      },
      {
        title: 'Figma design tokens',
        description: 'JSON files synced with au-tokens.css.',
        path: 'design-tokens',
      },
    ],
  },
  signalForms: {
    title: 'Signal forms',
    lead: 'Field controls implement FormValueControl and bind with [formField] from @angular/forms/signals.',
    sections: [
      {
        heading: 'Model and form() in the host',
        body: 'Define a writable signal for your model and call form() in an injection context (component constructor or field initializer).',
        code: `import { Component, signal } from '@angular/core';
import { FormField, email, form, required } from '@angular/forms/signals';
import { AuFormField, AuInputText } from '@aurea-design-system/components';

@Component({
  imports: [AuFormField, AuInputText, FormField],
  template: \`
    <au-form-field
      label="Email"
      hint="We only use your email for notifications."
      [required]="true"
    >
      <input auInputText type="email" [formField]="profileForm.email" />
    </au-form-field>
  \`,
})
export class ProfileEmail {
  readonly profile = signal({ email: '' });
  readonly profileForm = form(this.profile, (p) => {
    required(p.email, { message: 'Email is required' });
    email(p.email, { message: 'Enter a valid email' });
  });
}`,
        codeLanguage: 'typescript',
        expandLabel: 'Show example',
      },
      {
        heading: 'Label, hint, and errors live on au-form-field',
        body: 'Do not duplicate label on the inner control. Put hints below the label; au-form-field wires aria-describedby and shows validation messages from the bound field state.',
      },
      {
        heading: 'Submit and touch',
        body: 'Call profileForm().markAllAsTouched() before submit, then read profile() only when profileForm().valid() is true.',
        code: `protected save(): void {
  this.profileForm().markAllAsTouched();
  if (!this.profileForm().valid()) return;
  // persist this.profile()
}`,
        codeLanguage: 'typescript',
        expandLabel: 'Show submit guard',
      },
    ],
  },
};
