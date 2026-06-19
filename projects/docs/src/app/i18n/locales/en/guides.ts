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
        title: 'API conventions',
        description: 'Native directives vs au-* widgets; table headless helpers.',
        path: 'guides/api-conventions',
      },
      {
        title: 'Floating UI',
        description: 'Shared overlays: menu, popover, tooltip, listbox, pickers.',
        path: 'guides/floating-ui',
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
        description:
          'JSON DTCG 2025.10 sincronizado con au-tokens.css (`export:tokens` / `validate:tokens`).',
        path: 'design-tokens',
      },
    ],
  },
  apiConventions: {
    title: 'API conventions',
    lead: 'When to use a directive on a native element vs an au-* composite component.',
    sections: [
      {
        heading: 'Native primitive → attribute directive',
        body: 'Use when the control is a single HTML element and you need native semantics, forms, and keyboard behaviour.',
        code: `<button auButton variant="primary">Save</button>
<input auInputText [(value)]="name" />
<a auLink href="/docs">Docs</a>`,
        codeLanguage: 'html',
        expandLabel: 'Show examples',
      },
      {
        heading: 'Composite widget → au-* element',
        body: 'Use when the component owns multiple nodes, projection, or overlay state. Examples: au-form-field, au-dialog, au-table, au-menu, au-popover.',
        code: `<au-form-field label="Start">
  <input auInputDate [(value)]="start" />
</au-form-field>

<au-table [data]="rows">
  <au-table-column name="name" header="Name" [sortable]="true" />
</au-table>`,
        codeLanguage: 'html',
        expandLabel: 'Show examples',
      },
      {
        heading: 'au-table is not mat-table',
        body: 'Aurea ships a high-level data table (data + au-table-column). For custom grids or virtual scroll, import headless helpers from au-table-data (sortTableRows, toggleTableSortState, selection helpers) instead of forking the public table API.',
        code: `import { resolveTableViewRows, toggleTableSortState } from '@aurea-design-system/components';`,
        codeLanguage: 'typescript',
        expandLabel: 'Show import',
      },
      {
        heading: 'Avoid duplicate selectors',
        body: 'Do not expose the same widget as both <au-foo> and <native auFoo>. Pick one pattern per component and document it in Storybook.',
      },
    ],
  },
  floatingUi: {
    title: 'Floating UI',
    lead: 'How menu, popover, tooltip, listbox, and date/time pickers share overlays, tokens, and accessibility.',
    sections: [
      {
        heading: 'Overlay stack',
        body: 'Components delegate to TooltipOverlay, FieldListboxOverlay, or FloatingPickerOverlay. Panels portal to document.body or the open <dialog> so they stay in the top layer.',
      },
      {
        heading: 'Shared tokens',
        body: 'Desktop popovers use --au-floating-panel-bg and blur. Modal surfaces (dialog, drawer, mobile picker sheet) use --au-dialog-bg for an opaque panel. Arrows use --au-floating-arrow-* on menu, popover, and tooltip.',
        code: `@import '@aurea-design-system/components/styles/au-tokens.css';
@import '@aurea-design-system/components/styles/aurea-global.css';`,
        codeLanguage: 'css',
        expandLabel: 'Show imports',
      },
      {
        heading: 'Accessibility checklist',
        body: 'For new floating UI: aria-expanded/haspopup/controls on the trigger; correct panel role; focus on open/close; Escape to dismiss; block page scroll only while open; sync data-au-theme on portaled nodes.',
      },
      {
        heading: 'Responsive pickers',
        body: 'Below 42rem, AuInputDate and AuInputTime open a bottom sheet (FloatingPickerOverlay + scrim). Above that breakpoint they use popover positioning with the same panel component.',
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
      {
        heading: 'Nested fields',
        body: 'Bind nested properties with dotted paths on the form tree: profileForm.address.city.',
        code: `readonly profile = signal({ name: '', address: { city: '' as string } });
readonly profileForm = form(this.profile, (p) => {
  required(p.address.city, { message: 'City is required' });
});`,
        codeLanguage: 'typescript',
        expandLabel: 'Show nested model',
      },
    ],
  },
};
