import type { GuidesMessages } from '../../types/guides';

export const GUIDES_EN: GuidesMessages = {
  adoption: {
    title: 'Adoption guide',
    lead: 'Index of guides by topic; each one has its own page.',
    cards: [
      {
        title: 'Get started',
        description: 'Install, global CSS, and your first component.',
        path: 'get-started',
      },
      {
        title: 'Signal forms',
        description: 'Angular 21 signal forms with au-form-field and validators.',
        path: 'guides/signal-forms',
      },
      {
        title: 'Troubleshooting',
        description: 'Common setup mistakes and fixes.',
        path: 'guides/troubleshooting',
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
    <au-form-field label="Email" [required]="true">
      <au-input-text type="email" [formField]="profileForm.email" />
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
        heading: 'Label and errors live on au-form-field',
        body: 'Do not duplicate label on the inner control. au-form-field wires aria-describedby and shows validation messages from the bound field state.',
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
  troubleshooting: {
    title: 'Troubleshooting',
    lead: 'Common integration issues and how to fix them.',
    colProblem: 'Symptom',
    colCause: 'Cause',
    colFix: 'Fix',
    items: [
      {
        problem: 'Components render unstyled',
        cause: 'au-tokens.css not in global styles',
        fix: 'Run ng add @aurea-design-system/components or import styles/au-tokens.css in angular.json.',
      },
      {
        problem: 'Select/autocomplete list looks broken',
        cause: 'Missing au-field-listbox.css',
        fix: 'Add styles/au-field-listbox.css next to tokens.',
      },
      {
        problem: 'Validation messages never show',
        cause: 'Control not wrapped in au-form-field or missing FormField import',
        fix: 'Wrap control and import FormField from @angular/forms/signals.',
      },
      {
        problem: 'Theme does not switch',
        cause: 'data-au-theme on a child while tokens expect ancestor',
        fix: 'Set data-au-theme on html/body or app shell; use [auTheme] directive.',
      },
      {
        problem: 'Double submit / carousel skips slides',
        cause: 'Click bubbles to parent handlers',
        fix: 'Upgrade to latest @aurea-design-system/components (button stops propagation after emit).',
      },
      {
        problem: 'Bundle larger than expected',
        cause: 'Barrel import import * as Aurea',
        fix: 'Import named symbols from @aurea-design-system/components; avoid namespace imports.',
      },
    ],
  },
};
