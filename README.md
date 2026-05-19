<!-- markdownlint-disable MD033 MD041 -->

<div align="center">

# ✨ Aurea Design System

<p align="center">
  <strong>A semantic UI system for Angular 21</strong>
</p>

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular)](https://angular.dev)
[![WCAG](https://img.shields.io/badge/WCAG-2.2_AA-2ecc71)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Tests](https://github.com/tonicarreras/aurea-ds/actions/workflows/test.yml/badge.svg)](https://github.com/tonicarreras/aurea-ds/actions/workflows/test.yml)
[![Statements](https://img.shields.io/badge/statements-100%25-brightgreen)](#-test-coverage)
[![Branches](https://img.shields.io/badge/branches-100%25-brightgreen)](#-test-coverage)
[![Functions](https://img.shields.io/badge/functions-100%25-brightgreen)](#-test-coverage)
[![Lines](https://img.shields.io/badge/lines-100%25-brightgreen)](#-test-coverage)
[![License](https://img.shields.io/github/license/tonicarreras/aurea-ds?color=blue)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-success)](https://github.com/tonicarreras/aurea-ds)

<p>
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-components">Components</a> •
  <a href="#-storybook">Storybook</a> •
  <a href="#-test-coverage">Coverage</a> •
  <a href="#-tokens">Tokens</a>
</p>

</div>

---

## 🎯 Philosophy

> **Clear task, quiet UI** — users complete a goal; the system provides hierarchy, contrast, and calm—not decoration that fights the text.

Aurea is built on three pillars:

| Pillar | Description |
|--------|-------------|
| **Semantic Design** | Single source of truth for state; design tokens map to meaning, not implementation |
| **Accessibility First** | WCAG 2.2 AA on primary flows; visible focus, `aria-*`, `prefers-reduced-motion` |
| **Angular 21 Native** | Signals, `model()`, `FieldTree` / `formField` for reactive forms |

---

## ✨ Features

- **Design Tokens** — Semantic CSS custom properties (`--au-*`) for theming, including dark mode
- **Signal Forms** — Modern reactive forms with Angular 21's `model()` and signal-based controls
- **Accessible by Default** — Focus rings, keyboard navigation, ARIA attributes wired to controls
- **Component Composition** — Primitives → Semantic → Component layers for maintainability
- **Interactive Documentation** — Storybook with interaction tests and accessibility audits

---

## 🚀 Quick Start

### Develop this repo

```bash
git clone https://github.com/tonicarreras/aurea-ds.git
cd aurea-ds
bun install
bun run storybook
```

### Install the package (GitHub Packages)

In CI, configure Node with `registry-url: https://npm.pkg.github.com`, scope `@tonicarreras`, and
`NODE_AUTH_TOKEN` from a secret (PAT with `read:packages`). Locally, export the same token or run
`npm login --registry=https://npm.pkg.github.com` once (no `.npmrc` committed to the repo).

```bash
npm install @tonicarreras/aurea
```

Then in app styles: `@import '@tonicarreras/aurea/styles/au-tokens.css';` and import components from
`@tonicarreras/aurea`.

Published on each [GitHub Release](https://github.com/tonicarreras/aurea-ds/releases). The workflow
uses the **`GH_PACKAGES_TOKEN`** repository secret. See [`projects/aurea/README.md`](projects/aurea/README.md).

---

## 🧩 Components

| Component | Description | Status |
|-----------|-------------|--------|
| `au-button` | Primary, secondary, ghost variants with focus states | ✅ |
| `au-input-text` | Text input with label, hint, error, and signal support | ✅ |
| `au-textarea` | Multi-line text area with resize control | ✅ |
| `au-checkbox` | Accessible checkbox with custom styling | ✅ |
| `au-select` | Dropdown select with keyboard navigation | ✅ |

---

## 📚 Storybook

Interactive component documentation with:

- **Play functions** — Interaction tests verified in CI
- **a11y addon** — Automatic WCAG compliance checks
- **Documentation** — Overview pages with usage guidelines

```bash
# Development
bun run storybook

# Build static
bun run build-storybook

# Run interaction tests (CI)
bun run test-storybook:ci
```

---

## 🧪 Test coverage

Unit tests run with **Vitest** (via `ng test`). Coverage is collected with **v8** and enforced in CI at
**100%** for statements, branches, functions, and lines (`angular.json` → `coverageThresholds`).

| Metric | Threshold | Enforced in CI |
|--------|-----------|----------------|
| Statements | 100% | ✅ |
| Branches | 100% | ✅ |
| Functions | 100% | ✅ |
| Lines | 100% | ✅ |

Run `bun run test:coverage` locally to see the current file-level report and totals.

### Scope

| Included | Excluded |
|----------|----------|
| `projects/aurea/src/lib/**/*.ts` | `*.stories.ts`, `*.docs-overview.ts`, `*-story-host.ts` |

### Commands

```bash
# Unit tests only
bun run test

# Unit tests + coverage report (fails below 100%)
bun run test:coverage
```

After `test:coverage`, open the HTML report at `coverage/aurea/index.html`.

### CI

| Workflow | What it runs |
|----------|----------------|
| [Test](.github/workflows/test.yml) | `bun run test:coverage` on push/PR to `main` and `develop` |
| Storybook (local/CI) | `bun run test-storybook:ci` — interaction tests, separate from unit coverage |

---

## 🎨 Design Tokens

Aurea uses semantic tokens organized by category:

| Category | Examples |
|----------|----------|
| **Typography** | `--au-font-sans`, `--au-text-sm`, `--au-weight-medium` |
| **Spacing** | `--au-space-1` … `--au-space-12` |
| **Colors** | `--au-color-surface-canvas`, `--au-color-text-primary` |
| **Focus** | `--au-shadow-focus-ring`, `--au-focus-ring-width` |
| **Form** | `--au-color-form-border`, `--au-color-form-error` |

### Dark Mode

Set `data-au-theme="dark"` on an ancestor to activate dark theme:

```html
<html data-au-theme="dark">
  <!-- Your app -->
</html>
```

---

## 🛠 Tech Stack

- **Framework**: Angular 21 (Signals, Standalone APIs)
- **Package Manager**: Bun
- **Testing**: Vitest (100% unit coverage) + Playwright (Storybook test-runner)
- **Documentation**: Storybook 10
- **Accessibility**: WCAG 2.2 AA

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

_Built with ❤️ for accessible Angular applications_

</div>