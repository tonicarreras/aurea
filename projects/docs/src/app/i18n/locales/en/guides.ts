import type { GuidesMessages } from '../../types/guides';

export const GUIDES_EN: GuidesMessages = {
  adoption: {
    title: 'Adoption guide',
    lead: 'End-to-end path from install to production patterns. Each topic has a dedicated page.',
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
        title: 'UI patterns',
        description: 'Validated forms, confirm dialogs, and feedback with snackbar.',
        path: 'guides/patterns',
      },
      {
        title: 'Troubleshooting',
        description: 'Common setup mistakes and fixes.',
        path: 'guides/troubleshooting',
      },
      {
        title: 'Bundle & tree-shaking',
        description: 'Imports, CSS footprint, and lazy routes.',
        path: 'guides/bundle',
      },
      {
        title: 'Themes & tokens',
        description: 'Light/dark, density, and high-contrast palettes.',
        path: 'themes',
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
  patterns: {
    title: 'UI patterns',
    lead: 'Composable recipes built from stable Aurea primitives.',
    sections: [
      {
        heading: 'Validated sign-in block',
        body: 'Combine au-form-field, au-input-text, au-checkbox, and au-button with a single signal form model.',
        code: `readonly model = signal({ email: '', password: '', remember: false });
readonly loginForm = form(this.model, (m) => {
  required(m.email);
  email(m.email);
  required(m.password);
});`,
        codeLanguage: 'typescript',
        expandLabel: 'Show model',
      },
      {
        heading: 'Destructive action with dialog',
        body: 'Use au-dialog with au-button variant="danger" in the footer. Trap focus stays inside the dialog; Escape closes when auDialogClose is set.',
        code: `<au-dialog [open]="confirmOpen()" (openChange)="confirmOpen.set($event)">
  <h2 auDialogTitle>Delete project?</h2>
  <p>This cannot be undone.</p>
  <div auDialogFooter>
    <au-button variant="outline" (click)="confirmOpen.set(false)">Cancel</au-button>
    <au-button variant="danger" (click)="onConfirmDelete()">Delete</au-button>
  </div>
</au-dialog>`,
        codeLanguage: 'html',
        expandLabel: 'Show dialog markup',
      },
      {
        heading: 'CRUD list screen',
        body: 'Combine au-breadcrumb, au-table with auTableSortHeader, au-pagination, au-menu for row actions, and au-popover for filters.',
        code: `<au-breadcrumb [items]="crumbs" />
<au-table striped>
  <thead>...</thead>
  <tbody>...</tbody>
</au-table>
<au-pagination [page]="page()" [pageCount]="totalPages" (pageChange)="loadPage($event)" />`,
        codeLanguage: 'html',
        expandLabel: 'Show CRUD layout',
      },
      {
        heading: 'Async feedback with snackbar',
        body: 'After a successful mutation, push a message via AuSnackbar service (or host) with politeness appropriate to urgency.',
        code: `this.snackbar.show({
  message: 'Profile saved',
  variant: 'success',
  duration: 4000,
});`,
        codeLanguage: 'typescript',
        expandLabel: 'Show snackbar call',
      },
    ],
  },
  troubleshooting: {
    title: 'Troubleshooting',
    lead: 'Symptoms we see most often when adopting Aurea in existing Angular apps.',
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
        fix: 'Import symbols individually; see Bundle guide.',
      },
    ],
  },
  bundle: {
    title: 'Bundle & tree-shaking',
    lead: 'The library ships as ES modules; Angular CLI tree-shakes unused components when imports are per-symbol.',
    sections: [
      {
        heading: 'Per-component imports',
        body: 'Always import named exports. Avoid namespace imports that defeat static analysis.',
        code: `import { AuButton, AuCard } from '@aurea-design-system/components';`,
        codeLanguage: 'typescript',
        expandLabel: 'Show import',
      },
      {
        heading: 'CSS is not tree-shaken',
        body: 'Include au-tokens.css always; add au-field-error.css and au-field-listbox.css only when you use those features.',
        code: `@import '@aurea-design-system/components/styles/au-tokens.css';`,
        codeLanguage: 'css',
        expandLabel: 'Show CSS',
      },
      {
        heading: 'Measure your app',
        body: 'Run ng build --configuration=production --stats-json and inspect the chunk that contains @aurea-design-system/components.',
        code: 'ng build --configuration=production --stats-json',
        codeLanguage: 'bash',
        expandLabel: 'Show command',
      },
    ],
  },
};
