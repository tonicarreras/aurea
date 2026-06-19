# @aurea-design-system/components

**Aurea** — design system for **Angular 22**: accessible components, semantic tokens, and signal-friendly forms.

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular)](https://angular.dev)
[![WCAG](https://img.shields.io/badge/WCAG-2.2_AA-2ecc71)](https://www.w3.org/WAI/WCAG21/quickref/)
[![npm](https://img.shields.io/npm/v/@aurea-design-system/components?label=npm)](https://www.npmjs.com/package/@aurea-design-system/components)
[![License](https://img.shields.io/github/license/tonicarreras/aurea?color=blue)](https://github.com/tonicarreras/aurea/blob/main/LICENSE)

Monorepo project **`components`** (this folder).

- **Documentation:** [aurea-ds.netlify.app](https://aurea-ds.netlify.app/)
- **Storybook:** [aurea-ds-storybook.netlify.app](https://aurea-ds-storybook.netlify.app/)
- **Source:** [tonicarreras/aurea](https://github.com/tonicarreras/aurea)

---

## Requirements

- Angular **21.2+** (`@angular/core`, `@angular/common`, `@angular/forms`)
- Node **20.19+** (for the consuming app toolchain)

---

## Install

```bash
bun add @aurea-design-system/components
```

```bash
npm install @aurea-design-system/components
```

---

## Quick start

### 1. Design tokens (global styles)

Token layers: **primitives → semantic → roles → domain → high-contrast** — see [`src/lib/tokens/README.md`](src/lib/tokens/README.md).

In `angular.json` → `styles`, or in `src/styles.scss`:

```scss
@import '@aurea-design-system/components/styles/au-tokens.css';
@import '@aurea-design-system/components/styles/aurea-global.css';
```

### 2. Schematic (optional)

```bash
ng add @aurea-design-system/components
```

Adds global styles to `angular.json` and prints next steps.

### 3. Dark mode (optional)

```html
<html data-au-theme="dark"></html>
```

Or use the `auTheme` directive from the same package (`light`, `dark`, `system`, `high-contrast`, `high-contrast-dark`).

Optional **runtime brand** via `provideAurea()` (writes semantic tokens on `:root`):

```ts
import { provideAurea } from '@aurea-design-system/components';

bootstrapApplication(App, {
  providers: [
    provideAurea({
      theme: { actionPrimary: '#1059c8', radiusField: '0.5rem' },
    }),
  ],
});
```

See docs `/guides/composition` and [docs/COMPONENT_CSS_VARS.md](../../docs/COMPONENT_CSS_VARS.md).

### 4. Density (optional)

```html
<body data-au-density="compact"></body>
```

Or `[auDensity]="'spacious'"` on your shell.

### 5. Components

```ts
import { AuButton, AuCheckbox, AuDivider, AuTooltip } from '@aurea-design-system/components';

@Component({
  imports: [AuButton, AuCheckbox, AuDivider, AuTooltip],
  template: `
    <button
      auButton
      variant="primary"
    >
      Save
    </button>
    <button
      auButton
      type="button"
      variant="outline"
      auTooltip="Extra help"
    >
      ?
    </button>
    <au-divider />
    <input
      type="checkbox"
      auCheckbox
      label="Remember me"
    />
  `,
})
export class Example {}
```

---

## API conventions

Aurea uses a **hybrid** public API:

| Pattern                  | Use when                                     | Examples                                                |
| ------------------------ | -------------------------------------------- | ------------------------------------------------------- |
| Directive on native host | Single HTML element, forms semantics         | `button[auButton]`, `input[auInputText]`, `[auTooltip]` |
| `au-*` custom element    | Composite widget, projection, internal state | `au-form-field`, `au-dialog`, `au-table`, `au-menu`     |

`au-table` is a **high-level data table** (`[data]` + `au-table-column`), not a `<table>` directive like Angular Material CDK. Headless helpers (`sortTableRows`, `toggleTableSortState`, …) live in `au-table-data.ts` for custom UIs.

Monorepo guides: [docs/API_CONVENTIONS.md](../../docs/API_CONVENTIONS.md) · [docs/API_VOCABULARY.md](../../docs/API_VOCABULARY.md) · [docs/COMPOSITION.md](../../docs/COMPOSITION.md) · [docs/COMPONENT_CSS_VARS.md](../../docs/COMPONENT_CSS_VARS.md) · [docs/FLOATING_UI.md](../../docs/FLOATING_UI.md) · [docs/STYLE_CAPABILITIES.md](../../docs/STYLE_CAPABILITIES.md) · docs site `/guides/*`.

---

## Signal forms (Angular 22+)

Field controls implement `FormValueControl` and bind with **`[formField]`** from `@angular/forms/signals`. Put **`form()`** and the model **`signal()`** in your **page or feature component** (injection context). Wrap the control in **`au-form-field`** for label, hint, and error chrome — do not duplicate `label` on the inner control.

Import **`FormField`** next to the control in the same `@Component.imports` array.

### Example: email with `required` + `email`

```ts
import { Component, signal } from '@angular/core';
import { FormField, email, form, required } from '@angular/forms/signals';
import { AuFormField, AuInputText } from '@aurea-design-system/components';

@Component({
  selector: 'app-profile-email',
  imports: [AuFormField, AuInputText, FormField],
  template: `
    <au-form-field
      label="Email"
      hint="We only use this for account notices."
      [required]="true"
    >
      <input
        auInputText
        [formField]="fieldRoot.email"
        type="email"
        placeholder="you@company.com"
      />
    </au-form-field>
  `,
})
export class ProfileEmailComponent {
  private readonly data = signal({ email: '' as string });

  readonly fieldRoot = form(this.data, (schema) => {
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Enter a valid email address' });
  });
}
```

### Controls with `[formField]`

| Component                                     | Value type       | Notes                 |
| --------------------------------------------- | ---------------- | --------------------- |
| `AuInputText`, `AuTextarea`                   | `string \| null` | Empty field → `null`  |
| `AuInputNumber`, `AuInputDate`, `AuInputTime` | `string \| null` | Same empty semantics  |
| `AuSelect`, `AuAutocomplete`                  | `string \| null` | Option `value`        |
| `AuCheckbox`, `AuSwitch`                      | `boolean`        |                       |
| `AuRadioGroup`                                | `string \| null` | Selected option value |
| `AuSlider`                                    | `number`         | Native range input    |
| `AuFileUpload`                                | `File[]`         | Drag-and-drop picker  |

### Manual validation (no `form()`)

Use `[(value)]` / `[(checked)]` and set **`errorMessage`** + **`invalid`** on `au-form-field`. Storybook demos use this pattern — see **Aurea/InputText** → _With error_ and **Aurea/FormField**.

### Nested model

```ts
readonly profile = signal({ name: '', address: { city: '' as string } });
readonly profileForm = form(this.profile, (p) => {
  required(p.name, { message: 'Name is required' });
  required(p.address.city, { message: 'City is required' });
});
```

```html
<au-form-field label="City">
  <input
    auInputText
    [formField]="profileForm.address.city"
  />
</au-form-field>
```

### Disabled submit

Gate actions with `profileForm().valid()` and call `profileForm().markAllAsTouched()` before submit so errors surface.

---

## Components

| Export               | Selector / API                       | Notes                                                                 |
| -------------------- | ------------------------------------ | --------------------------------------------------------------------- |
| `AuButton`           | `<button auButton>`                  | Variants, loading, focus ring                                         |
| `AuInputText`        | `<input auInputText>`                | `[formField]` or `[(value)]` + `au-form-field`                        |
| `AuTextarea`         | `<textarea auTextarea>`              | Same as input-text                                                    |
| `AuFormField`        | `<au-form-field>`                    | Label / hint / error wrapper                                          |
| `AuCheckbox`         | `<input type="checkbox" auCheckbox>` |                                                                       |
| `AuSelect`           | `<au-select>`                        | Portaled listbox                                                      |
| `AuAutocomplete`     | `<au-autocomplete>`                  |                                                                       |
| `AuSwitch`           | `<button type="button" auSwitch>`    |                                                                       |
| `AuRadioGroup`       | `<au-radio-group>`                   |                                                                       |
| `AuInputNumber`      | `<input auInputNumber>`              |                                                                       |
| `AuInputDate`        | `<input auInputDate>`                | Native date field (stable **1.5.0**)                                  |
| `AuInputTime`        | `<input auInputTime>`                | Native time field (stable **1.5.0**)                                  |
| `AuInputPassword`    | `<input auInputPassword>`            | Password with reveal toggle (stable **1.6.0**)                        |
| `AuButtonGroup`      | `<au-button-group>`                  | Groups `button[auButton]` actions (stable **1.6.0**)                  |
| `AuTagInput`         | `<au-tag-input>`                     | Multi-value tags (stable **1.6.0**)                                   |
| `AuDialog`           | `<au-dialog>`                        | Native `<dialog>`                                                     |
| `AuCard`             | `<au-card>`                          | `AuCardFooter` directive                                              |
| `AuTabs`             | `<au-tabs>`                          | `AuTab`, `AuTabPanel`                                                 |
| `AuChip`             | `<au-chip>`                          | Removable / selectable                                                |
| `AuChipGroup`        | `<au-chip-group>`                    | Filter / choice groups (stable **1.5.0**)                             |
| `AuList`             | `<au-list>`                          | Removable list items (stable **1.5.0**)                               |
| `AuSteps`            | `<au-steps>`                         | Step indicator (stable **1.5.0**)                                     |
| `AuMessage`          | `<au-message>`                       | Inline / banner notices (`layout="banner"` since **1.5.0**)           |
| `AuIcon`             | `<au-icon>`                          | SVG icon set                                                          |
| `AuSkeleton`         | `<au-skeleton>`                      | Loading placeholder                                                   |
| `AuSnackbar`         | `<au-snackbar>`                      |                                                                       |
| `AuDivider`          | `<au-divider>`                       | Horizontal / vertical                                                 |
| `AuDescriptionList`  | `<au-description-list>`              | Key–value `dl` with `au-description-item` (stable **1.6.0**)          |
| `AuTooltip`          | `[auTooltip]`                        | Directive on the trigger                                              |
| `AuBadge`            | `<au-badge>`                         | Status / count label                                                  |
| `AuBreadcrumb`       | `<au-breadcrumb>`                    | Navigation trail                                                      |
| `AuPagination`       | `<au-pagination>`                    | Page controls (1-based)                                               |
| `AuMenu`             | `<au-menu>`                          | Dropdown + `auMenuTrigger` / `au-menu-item`                           |
| `AuPopover`          | `<au-popover>`                       | Anchored panel + `auPopoverTrigger`                                   |
| `AuTable`            | `<au-table>`                         | `au-table-column`; headless helpers in `au-table-data`                |
| `AuProgress`         | `<au-progress>`                      | Progressbar                                                           |
| `AuLink`             | `a[auLink]`                          | Semantic inline link                                                  |
| `AuEmptyState`       | `<au-empty-state>`                   | Empty lists/tables/search (stable **1.2.0**)                          |
| `AuAvatar`           | `<au-avatar>`                        | User image or initials (stable **1.4.0**)                             |
| `AuDrawer`           | `<au-drawer>`                        | Side panel overlay (stable **1.4.0**)                                 |
| `AuAccordion`        | `<au-accordion>`                     | `button[auAccordionItem]` + `<au-accordion-panel>` (stable **1.2.0**) |
| `AuFieldset`         | `<au-fieldset>`                      | Grouped fields with legend (stable **1.2.0**)                         |
| `AuSlider`           | `<au-slider>`                        | Range control + `[formField]` (stable **1.2.0**)                      |
| `AuFileUpload`       | `<au-file-upload>`                   | File picker + `[formField]` (stable **1.2.0**)                        |
| `AuSpinner`          | `<au-spinner>`                       | Loading indicator                                                     |
| `AuTheme`            | `[auTheme]`                          | `light` / `dark` / `system` / `high-contrast` / `high-contrast-dark`  |
| `AuDensityDirective` | `[auDensity]`                        | `compact` / `comfortable` / `spacious`                                |
| `AuStack`            | `[auStack]`                          | Vertical flex stack; `gap`, `align`, `separator`                      |
| `AuCluster`          | `[auCluster]`                        | Inline wrap row; toolbars, filter bars                                |
| `AuSplit`            | `[auSplit]`                          | Two-column grid; `ratio`, responsive `collapse`                       |
| `AuSection`          | `[auSection]`                        | Padded block; optional `divider`                                      |
| `provideAurea`       | `provideAurea({ theme })`            | Optional bootstrap override for semantic CSS variables                |

---

## Governance & maturity

- [CHANGELOG](../../CHANGELOG.md) · [CONTRIBUTING](../../CONTRIBUTING.md) · [VERSIONING](../../docs/VERSIONING.md) · [A11y audit](./A11Y_AUDIT.md)
- Maturity: `getComponentMaturity()` or [docs matrix](https://aurea-ds.netlify.app/en/maturity). Full catalog **stable** as of **1.6.0**.

## Bundle & performance

- Import per symbol (`import { AuButton } from '…'`), not `import *`.
- Global CSS: `au-tokens.css` (required) + `aurea-global.css` (field chrome, layout directives, listbox, description list, accordion item shells). See `src/lib/styles/README.md`.
- All components use `ChangeDetectionStrategy.OnPush`; overlays attach to `document.body` only while open.
- Lazy-load feature routes; paginate large tables server-side.
- CI: `bun run check:bundle` (+5% vs baseline). Update baseline with `bun run update:bundle-baseline` after intentional size changes.

---

## License

[MIT](https://github.com/tonicarreras/aurea/blob/main/LICENSE)
