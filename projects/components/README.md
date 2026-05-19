# @aurea

**Aurea** — design system for **Angular 21**: accessible components, semantic tokens, and signal-friendly forms.

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular)](https://angular.dev)
[![WCAG](https://img.shields.io/badge/WCAG-2.2_AA-2ecc71)](https://www.w3.org/WAI/WCAG21/quickref/)
[![npm](https://img.shields.io/npm/v/@aurea?label=npm)](https://www.npmjs.com/package/@aurea)
[![License](https://img.shields.io/github/license/tonicarreras/aurea-ds?color=blue)](https://github.com/tonicarreras/aurea-ds/blob/main/LICENSE)

Monorepo project **`components`** (this folder). Official docs: [`projects/docs`](../docs).  
Source & Storybook: [tonicarreras/aurea-ds](https://github.com/tonicarreras/aurea-ds).

---

## Requirements

- Angular **21.2+** (`@angular/core`, `@angular/common`, `@angular/forms`)
- Node **20.19+** (for the consuming app toolchain)

---

## Install

```bash
bun add @aurea
```

```bash
npm install @aurea
```

---

## Quick start

### 1. Design tokens (global styles)

In `angular.json` → `styles`, or in `src/styles.scss`:

```scss
@import '@aurea/styles/au-tokens.css';
```

Optional (form/listbox overlays):

```scss
@import '@aurea/styles/au-field-error.css';
@import '@aurea/styles/au-field-listbox.css';
```

### 2. Dark mode (optional)

```html
<html data-au-theme="dark">
```

Or use the `auTheme` directive from the same package.

### 3. Components

```ts
import { AuButton, AuCheckbox, AuDivider, AuTooltip } from '@aurea';

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

## Components

| Export | Selector / API | Notes |
|--------|----------------|-------|
| `AuButton` | `<au-button>` | Variants, loading, focus ring |
| `AuInputText` | `<au-input-text>` | Signal forms via `formField` |
| `AuTextarea` | `<au-textarea>` | |
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
