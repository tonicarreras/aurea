# @tonicarreras/aurea

**Aurea** — design system for **Angular 21**: accessible components, semantic tokens, and signal-friendly forms.

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular)](https://angular.dev)
[![WCAG](https://img.shields.io/badge/WCAG-2.2_AA-2ecc71)](https://www.w3.org/WAI/WCAG21/quickref/)
[![License](https://img.shields.io/github/license/tonicarreras/aurea-ds?color=blue)](https://github.com/tonicarreras/aurea-ds/blob/main/LICENSE)

Public package on [GitHub Packages](https://github.com/tonicarreras/aurea-ds/packages).  
Source & Storybook: [tonicarreras/aurea-ds](https://github.com/tonicarreras/aurea-ds).

---

## Requirements

- Angular **21.2+** (`@angular/core`, `@angular/common`, `@angular/forms`)
- Node **20.19+** (for the consuming app toolchain)

---

## Install

The scoped name is **`@tonicarreras/aurea`** (not `tonicarreras aurea`).  
The package is **public**: you do **not** need a token to install, only to tell Bun/npm which registry serves the `@tonicarreras` scope.

### 1. Scope registry (once per project)

Create or append **`.npmrc`** in your Angular app root:

```ini
@tonicarreras:registry=https://npm.pkg.github.com
```

Do **not** add `_authToken` for a public package.  
If you still see permission errors, the package may be **private** on GitHub — open the package page → **Package settings** → **Change visibility** → **Public**, then try again.

### 2. Add the dependency

```bash
bun add @tonicarreras/aurea
```

```bash
# npm
npm install @tonicarreras/aurea
```

---

## Quick start

### 1. Design tokens (global styles)

In `angular.json` → `styles`, or in `src/styles.scss`:

```scss
@import '@tonicarreras/aurea/styles/au-tokens.css';
```

Optional (form/listbox overlays):

```scss
@import '@tonicarreras/aurea/styles/au-field-error.css';
@import '@tonicarreras/aurea/styles/au-field-listbox.css';
```

### 2. Dark mode (optional)

On a layout root or `document.documentElement`:

```html
<html data-au-theme="dark">
```

Or use the `auTheme` directive from the same package.

### 3. Components

```ts
import { Button, Checkbox, Divider, AuTooltip } from '@tonicarreras/aurea';

@Component({
  imports: [Button, Checkbox, Divider, AuTooltip],
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
| `Button` | `<au-button>` | Variants, loading, focus ring |
| `InputText` | `<au-input-text>` | Signal forms via `formField` |
| `Textarea` | `<au-textarea>` | |
| `Checkbox` | `<au-checkbox>` | |
| `Select` | `<au-select>` | Portaled listbox |
| `Autocomplete` | `<au-autocomplete>` | |
| `Switch` | `<au-switch>` | |
| `RadioGroup` | `<au-radio-group>` | |
| `InputNumber` | `<au-input-number>` | |
| `InputDate` | `<au-input-date>` | |
| `Dialog` | `<au-dialog>` | Native `<dialog>` |
| `Card` | `<au-card>` | `AuCardFooter` directive |
| `Tabs` | `<au-tabs>` | `AuTab`, `AuTabPanel` |
| `Chip` | `<au-chip>` | Removable / selectable |
| `Snackbar` | `<au-snackbar>` | |
| `Divider` | `<au-divider>` | Horizontal / vertical |
| `AuTooltip` | `[auTooltip]` | Directive on the trigger |
| `AuTheme` | `[auTheme]` | `light` / `dark` / `system` |

---

## Troubleshooting install

| Error | Cause | Fix |
|-------|--------|-----|
| `404` / package not found | Wrong name or registry | Use `@tonicarreras/aurea` + `.npmrc` scope line above |
| `401` / `403` permission | Package still private, or stray `_authToken` | Make package **public** on GitHub; remove invalid token from `.npmrc` |
| Resolves from `registry.npmjs.org` | Missing scope mapping | Add `@tonicarreras:registry=…` to `.npmrc` |

---

## Contributing

This package is built from the [aurea-ds](https://github.com/tonicarreras/aurea-ds) monorepo (`projects/aurea`).  
Clone the repo, run `bun install`, `bun run storybook`, and `bun run test:coverage` (100% thresholds).

Releases are published to GitHub Packages on each [GitHub Release](https://github.com/tonicarreras/aurea-ds/releases).

---

## License

[MIT](https://github.com/tonicarreras/aurea-ds/blob/main/LICENSE)
