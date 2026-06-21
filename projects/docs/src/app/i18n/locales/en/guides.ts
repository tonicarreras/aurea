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
        title: 'Composition',
        description: 'Layout directives, three-layer model, and CSS variable overrides.',
        path: 'guides/composition',
      },
      {
        title: 'Recipes',
        description: 'Filter bar, settings row, and dashboard card built from primitives.',
        path: 'guides/recipes',
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
  composition: {
    title: 'Composition',
    lead: 'How primitives, tokens, and app CSS divide responsibility — plus layout directives and provideAurea().',
    sections: [
      {
        heading: 'Three layers',
        body: 'Aurea inputs for common design decisions; --au-{component}-* variables for local art direction; application CSS for page layout (max-width, breakpoints, marketing geometry).',
      },
      {
        heading: 'Layout directives',
        body: 'auStack (column), auCluster (inline wrap), auSplit (two columns), auSection (padded block with optional divider). Styles ship in aurea-global.css.',
        code: `<div auStack gap="md" separator="solid">
  <au-form-field label="Search">
    <input auInputText />
  </au-form-field>
  <div auCluster gap="sm">
    <button auButton variant="ghost">Reset</button>
    <button auButton>Apply</button>
  </div>
</div>`,
        codeLanguage: 'html',
        expandLabel: 'Show layout example',
      },
      {
        heading: 'provideAurea() — runtime theming',
        body: 'Optional bootstrap override for semantic tokens (primary color, radii, fonts). Complements [auTheme] for light/dark/HC. SSR: use static aurea-theme-bridge.css or applyAureaThemeVars(document, config) during server render.',
        code: `import { applyAureaThemeVars, provideAurea } from '@aurea-design-system/components';

bootstrapApplication(App, {
  providers: [
    provideAurea({
      theme: {
        actionPrimary: '#1059c8',
        radiusField: '0.5rem',
      },
    }),
  ],
});

// SSR / prerender (optional):
// applyAureaThemeVars(document, { actionPrimary: '#1059c8' });`,
        codeLanguage: 'typescript',
        expandLabel: 'Show provider',
      },
      {
        heading: 'Public CSS overrides',
        body: 'Documented per-component variables (--au-card-padding, --au-stack-gap, …). See repo docs/COMPONENT_CSS_VARS.md and API_VOCABULARY.md for input naming rules.',
      },
    ],
  },
  recipes: {
    title: 'Composition recipes',
    lead: 'End-to-end patterns assembled only from Aurea primitives — no domain-specific components.',
    sections: [
      {
        heading: 'Filter bar',
        body: 'Cluster for inline controls; form fields for labels; primary action aligned end.',
        code: `<div auCluster gap="md" justify="between" class="filter-bar">
  <div auCluster gap="sm">
    <au-form-field label="Status">
      <au-select [options]="statuses" [(value)]="status" />
    </au-form-field>
    <au-form-field label="Query">
      <input auInputText [(value)]="query" />
    </au-form-field>
  </div>
  <button auButton (click)="search()">Search</button>
</div>`,
        codeLanguage: 'html',
        expandLabel: 'Show filter bar',
      },
      {
        heading: 'Settings row',
        body: 'Split for label + control columns; collapses on small viewports.',
        code: `<div auSplit ratio="1:2" gap="lg">
  <div auStack gap="xs">
    <strong>Notifications</strong>
    <span class="text-secondary">Email alerts for billing events.</span>
  </div>
  <div auCluster gap="sm" justify="end">
    <button auSwitch [(checked)]="emailAlerts">Toggle</button>
  </div>
</div>`,
        codeLanguage: 'html',
        expandLabel: 'Show settings row',
      },
      {
        heading: 'Dashboard card',
        body: 'Card regions with stack + cluster footer actions.',
        code: `<au-card variant="elevated" [interactive]="true">
  <div auSection padding="lg">
    <div auStack gap="sm">
      <span auCardHeader>Revenue</span>
      <span auCardBody>$24,500</span>
      <au-badge variant="success">+12%</au-badge>
    </div>
  </div>
  <div auCardFooter>
    <div auCluster gap="sm" justify="end">
      <button auButton variant="ghost">Details</button>
      <button auButton>Export</button>
    </div>
  </div>
</au-card>`,
        codeLanguage: 'html',
        expandLabel: 'Show dashboard card',
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
        body: 'By default, validation chrome appears when a field is touched (`showErrorsWhen="touched"`). For validate-on-submit, set `[showValidation]="submitAttempted()"` on `form[auForm]` once (individual fields can still override).',
        code: `readonly submitAttempted = signal(false);

protected save(): void {
  this.submitAttempted.set(true);
  if (!this.profileForm().valid()) return;
  // persist this.profile()
}`,
        codeLanguage: 'typescript',
        expandLabel: 'Show submit guard',
      },
      {
        heading: 'Modal forms',
        body: 'Use `form[auForm]` with `[showValidation]="submitAttempted()"` once, `FormRoot` on the form, and associate footer buttons with `[attr.form]` + `type="submit"`. Prefer `au-message` and in-dialog snackbars over body toasts.',
        code: `<au-dialog [(open)]="open">
  <form auForm [formRoot]="form" id="dialog-form" [showValidation]="submitAttempted()">
    <au-form-field label="Role">
      <au-select [formField]="form.role" … />
    </au-form-field>
  </form>
  <div auDialogFooter>
    <button auButton type="submit" [attr.form]="'dialog-form'">Save</button>
  </div>
</au-dialog>`,
        codeLanguage: 'html',
        expandLabel: 'Ver formulario en modal',
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
