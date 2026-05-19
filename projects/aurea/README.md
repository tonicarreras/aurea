# @tonicarreras/aurea

**Aurea** — design system for **Angular 21**: accessible components, semantic tokens, and signal-friendly forms.

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular)](https://angular.dev)
[![WCAG](https://img.shields.io/badge/WCAG-2.2_AA-2ecc71)](https://www.w3.org/WAI/WCAG21/quickref/)
[![npm](https://img.shields.io/npm/v/@tonicarreras/aurea?label=npm)](https://www.npmjs.com/package/@tonicarreras/aurea)
[![License](https://img.shields.io/github/license/tonicarreras/aurea-ds?color=blue)](https://github.com/tonicarreras/aurea-ds/blob/main/LICENSE)

Source & Storybook: [tonicarreras/aurea-ds](https://github.com/tonicarreras/aurea-ds).

---

## Requirements

- Angular **21.2+** (`@angular/core`, `@angular/common`, `@angular/forms`)
- Node **20.19+** (for the consuming app toolchain)

---

## Install

Scoped name: **`@tonicarreras/aurea`** (not `tonicarreras aurea`).

### npm / Bun (recommended — no token)

Published to [npmjs.com](https://www.npmjs.com/package/@tonicarreras/aurea). No `.npmrc` required:

```bash
bun add @tonicarreras/aurea
```

```bash
npm install @tonicarreras/aurea
```

> Requires the **`NPM_TOKEN`** secret in the repo’s `production` environment so CI can publish to npm.
> Create an [npm access token](https://www.npmjs.com/settings/~your-user/tokens) (type **Automation**) and add it as secret **`NPM_TOKEN`**.

### GitHub Packages (optional mirror)

GitHub’s npm registry **always requires authentication**, even for public packages ([docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)).

In your app root, `.npmrc`:

```ini
@tonicarreras:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

```bash
export NODE_AUTH_TOKEN=ghp_…   # PAT with read:packages
bun add @tonicarreras/aurea
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

| Symptom | Cause | Fix |
|---------|--------|-----|
| Asks for token with only `@tonicarreras:registry=…github` | GitHub npm **always** needs auth | Install from **npm** (above) or add `_authToken` |
| `404` on npm | Version not published to npmjs yet | Add `NPM_TOKEN` secret and run publish workflow |
| `404` on GitHub | Wrong registry / private package | Use npm, or fix visibility + `.npmrc` |

---

## Publishing (maintainers)

1. Bump `version` in `projects/aurea/package.json`.
2. Tag `v0.1.2` and create a GitHub Release.
3. Workflow publishes to **npm** (needs `NPM_TOKEN`) and **GitHub Packages**.

---

## License

[MIT](https://github.com/tonicarreras/aurea-ds/blob/main/LICENSE)
