# @aurea-design-system/components

**Aurea** — design system for **Angular 21**: accessible components, semantic tokens, and signal-friendly forms.

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular)](https://angular.dev)
[![WCAG](https://img.shields.io/badge/WCAG-2.2_AA-2ecc71)](https://www.w3.org/WAI/WCAG21/quickref/)
[![npm](https://img.shields.io/npm/v/@aurea-design-system/components?label=npm)](https://www.npmjs.com/package/@aurea-design-system/components)
[![License](https://img.shields.io/github/license/tonicarreras/aurea-ds?color=blue)](https://github.com/tonicarreras/aurea-ds/blob/main/LICENSE)

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

In `angular.json` → `styles`, or in `src/styles.scss`:

```scss
@import '@aurea-design-system/components/styles/au-tokens.css';
```

Optional (form/listbox overlays):

```scss
@import '@aurea-design-system/components/styles/au-field-error.css';
@import '@aurea-design-system/components/styles/au-field-listbox.css';
```

### 2. Dark mode (optional)

```html
<html data-au-theme="dark">
```

Or use the `auTheme` directive from the same package.

### 3. Components

```ts
import { AuButton, AuCheckbox, AuDivider, AuTooltip } from '@aurea-design-system/components';

@Component({
  imports: [AuButton, AuCheckbox, AuDivider, AuTooltip],
  template: `
    <au-button variant="primary">Save</au-button>
    <au-button variant="outline" auTooltip="Extra help">?</au-button>
    <au-divider />
    <au-checkbox label="Remember me" />
  `,
})
export class Example {}
```

---

## Signal forms (Angular 21+)

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
      <au-input-text
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

| Component | Value type | Notes |
|-----------|------------|--------|
| `AuInputText`, `AuTextarea` | `string \| null` | Empty field → `null` |
| `AuInputNumber`, `AuInputDate` | `string \| null` | Same empty semantics |
| `AuSelect`, `AuAutocomplete` | `string \| null` | Option `value` |
| `AuCheckbox`, `AuSwitch` | `boolean` | |
| `AuRadioGroup` | `string \| null` | Selected option value |

### Manual validation (no `form()`)

Use `[(value)]` / `[(checked)]` and set **`errorMessage`** + **`invalid`** on `au-form-field`. Storybook demos use this pattern — see **Aurea/InputText** → *With error* and **Aurea/Form field**.

---

## Components

| Export | Selector / API | Notes |
|--------|----------------|-------|
| `AuButton` | `<au-button>` | Variants, loading, focus ring |
| `AuInputText` | `<au-input-text>` | `[formField]` or `[(value)]` + `au-form-field` |
| `AuTextarea` | `<au-textarea>` | Same as input-text |
| `AuFormField` | `<au-form-field>` | Label / hint / error wrapper |
| `AuCheckbox` | `<au-checkbox>` | |
| `AuSelect` | `<au-select>` | Portaled listbox |
| `AuAutocomplete` | `<au-autocomplete>` | |
| `AuSwitch` | `<au-switch>` | |
| `AuRadioGroup` | `<au-radio-group>` | |
| `AuInputNumber` | `<au-input-number>` | |
| `AuInputDate` | `<au-input-date>` | |
| `AuDialog` | `<au-dialog>` | Native `<dialog>` |
| `AuCard` | `<au-card>` | `AuCardFooter` directive |
| `AuTabs` | `<au-tabs>` | `AuTab`, `AuTabPanel` |
| `AuChip` | `<au-chip>` | Removable / selectable |
| `AuSnackbar` | `<au-snackbar>` | |
| `AuDivider` | `<au-divider>` | Horizontal / vertical |
| `AuTooltip` | `[auTooltip]` | Directive on the trigger |
| `AuTheme` | `[auTheme]` | `light` / `dark` / `system` |

---

## License

[MIT](https://github.com/tonicarreras/aurea-ds/blob/main/LICENSE)
