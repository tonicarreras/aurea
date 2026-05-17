<!-- markdownlint-disable MD033 MD041 -->

<div align="center">

# ✨ Aurea Design System

<p align="center">
  <strong>A semantic UI system for Angular 21</strong>
</p>

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular)](https://angular.dev)
[![WCAG](https://img.shields.io/badge/WCAG-2.2_AA-2ecc71)](https://www.w3.org/WAI/WCAG21/quickref/)
[![License](https://img.shields.io/github/license/tonicarreras/aurea-ds?color=blue)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-success)](https://github.com/tonicarreras/aurea-ds)

<p>
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-components">Components</a> •
  <a href="#-storybook">Storybook</a> •
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

```bash
# Clone the repository
git clone https://github.com/tonicarreras/aurea-ds.git
cd aurea-ds

# Install dependencies
bun install

# Start Storybook
bun run storybook
```

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
- **Testing**: Vitest + Playwright
- **Documentation**: Storybook 10
- **Accessibility**: WCAG 2.2 AA

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

_Built with ❤️ for accessible Angular applications_

</div>