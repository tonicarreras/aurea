<!-- markdownlint-disable MD033 MD041 -->

<h1 align="center">✨ Aurea Design System</h1>

<p align="center"><strong>A semantic UI system for Angular 21</strong></p>

<!-- Badges must use HTML: Markdown images inside block HTML are not rendered on GitHub. -->
<p align="center">
  <a href="https://angular.dev"><img src="https://img.shields.io/badge/Angular-21-DD0031?logo=angular" alt="Angular" /></a>
  <a href="https://www.w3.org/WAI/WCAG21/quickref/"><img src="https://img.shields.io/badge/WCAG-2.2_AA-2ecc71" alt="WCAG" /></a>
  <a href="https://github.com/tonicarreras/aurea/actions/workflows/test.yml?query=branch%3Adevelop"><img src="https://github.com/tonicarreras/aurea/actions/workflows/test.yml/badge.svg?branch=develop&amp;event=push" alt="Tests" /></a>
  <a href="https://www.npmjs.com/package/@aurea-design-system/components"><img src="https://img.shields.io/npm/v/@aurea-design-system/components?label=npm" alt="npm" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/tonicarreras/aurea?color=blue" alt="License" /></a>
  <a href="https://github.com/tonicarreras/aurea"><img src="https://img.shields.io/badge/status-active-success" alt="Status" /></a>
</p>

<p align="center">
  <a href="https://aurea-ds.netlify.app/">Documentation</a> •
  <a href="https://aurea-ds-storybook.netlify.app/">Storybook</a> •
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-components">Components</a> •
  <a href="#-test-coverage">Coverage</a> •
  <a href="#-tokens">Tokens</a>
</p>

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

### Repository layout

Monorepo **aurea** with two Angular projects:

| Project | Path | Role |
|---------|------|------|
| **components** | [`projects/components`](projects/components) | Design system library (npm: `@aurea-design-system/components`) |
| **docs** | [`projects/docs`](projects/docs) | Official documentation site |

### Develop this repo

```bash
git clone https://github.com/tonicarreras/aurea.git
cd aurea
bun install
bun run storybook     # components — Storybook (port 6006)
bun run docs          # docs — official documentation site (port 4200)
bun run test          # unit tests (components)
```

### Use the published package

Install and usage docs for consumers: **[`projects/components/README.md`](projects/components/README.md)**  
(package **`@aurea-design-system/components`** on [npm](https://www.npmjs.com/package/@aurea-design-system/components)).

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

## 📖 Official documentation

**Live site:** [aurea-ds.netlify.app](https://aurea-ds.netlify.app/) — guides, theming, and a live preview for each component (English and Spanish: `/en/...`, `/es/...`).

Angular app in `projects/docs` that consumes `@aurea-design-system/components` from the monorepo.

```bash
bun run docs          # http://127.0.0.1:4200
bun run build:docs    # output in dist/docs/browser
```

Storybook remains the interactive catalog for development and testing; the **docs** app is the public, consumer-oriented reference.

---

## 📚 Storybook

**Live catalog:** [aurea-ds-storybook.netlify.app](https://aurea-ds-storybook.netlify.app/)

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
| `projects/components/src/lib/**/*.ts` | `*.stories.ts`, `*.docs-overview.ts`, `*-story-host.ts` |

### Commands

```bash
# Unit tests only
bun run test

# Unit tests + coverage report (fails below 100%)
bun run test:coverage
```

After `test:coverage`, open the HTML report at `coverage/components/index.html`.

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

The published package **`@aurea-design-system/components`** is [MIT](LICENSE). You may use it freely in commercial and open-source apps.

The monorepo root stays `"private": true` so only the library is published to npm; the repo is open source for transparency and contributions.

| Artifact | Visibility |
|----------|------------|
| GitHub repo | Public — [`tonicarreras/aurea`](https://github.com/tonicarreras/aurea) |
| npm package | Public — [`@aurea-design-system/components`](https://www.npmjs.com/package/@aurea-design-system/components) |
| License | MIT — [LICENSE](LICENSE) |

---

<div align="center">

_Built with ❤️ for accessible Angular applications_

</div>