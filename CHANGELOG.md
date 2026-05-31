# Changelog

All notable changes to **@aurea-design-system/components** are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).  
Versioning follows [Semantic Versioning](https://semver.org/) — see [VERSIONING.md](./docs/VERSIONING.md).

Git tags for library releases use the prefix **`components-v`** (monorepo convention — see [RELEASE.md](./docs/RELEASE.md)).

## [Unreleased]

### Added

- **`AuEmptyState`** (beta) — centered placeholder for empty lists, tables, and search results; media via preset `icon`, `imageSrc`, projected `[auEmptyStateMedia]`, projected actions, and configurable heading level.
- **`AuTable`** — empty rows accept projected `au-empty-state`; `emptyMessage` remains the text fallback.
- **`AuSpinner`** — default arc color is `--au-color-action-primary` (override with `--au-spinner-arc` or `color` on the host).
- **`AuAccordion`** (beta) — collapsible sections with `button[auAccordionItem]` + `[auAccordionPanel]`, `[(value)]`, and arrow/Home/End keyboard nav.
- **`AuFieldset`** (beta) — native `fieldset` wrapper with `legend`, optional `description`, and `disabled` for grouped fields.
- **`AuSlider`** (beta) — range input (`FormValueControl<number>`) with optional live value, min/max/step, and `au-form-field` integration.
- **`AuFileUpload`** (beta) — drag-and-drop file picker (`FormValueControl<File[]>`) with browse button, accept filter, and removable list.

## [1.0.0] - 2026-05-30

First **stable** release. Meets [V1_CRITERIA.md](./docs/V1_CRITERIA.md). The documented public API in `public-api.ts`, Storybook, and the docs catalog is semver-stable from this version forward; breaking changes require [DEPRECATION.md](./docs/DEPRECATION.md) and a **MAJOR** bump.

### Added

- **`AuSpinner`** — accessible loading indicator (`size`, optional `label`, `decorative` for embedded use). Storybook, docs (EN/ES), and visual smoke coverage.
- Public exports `lockPageScroll` / `unlockPageScroll` for custom overlay flows.

### Changed

- **`AuButton`** loading state uses `au-spinner` (`decorative`, size aligned to button size).
- **`AuTable`**, **`AuSelect`**, and **`AuAutocomplete`** loading UI uses `au-spinner`.
- Shared overlay stack: portaled panels inherit theme context; scroll dismiss and focus behavior aligned across **menu**, **popover**, and **dialog**.
- Governance and design docs moved from repo root to [docs/](./docs/) (index: [docs/README.md](./docs/README.md)).

### Fixed

- Page scroll lock when opening modals/menus (body overflow restored correctly).
- Menu keyboard navigation, scroll-inside-panel dismiss, and overlay detach on destroy.
- Tooltip and card spec assertions; overlay edge cases covered to 100% unit coverage.

### Migration from 0.9.x

No breaking API changes since **0.9.0**. Patch releases **0.9.1** and **0.9.2** on npm were internal/doc fixes without changelog sections; upgrade directly to **1.0.0**:

```bash
bun add @aurea-design-system/components@1.0.0
```

Optional: replace ad-hoc loading markup in app code with `<au-spinner />` where you mirror library loading patterns. Existing component selectors, inputs, and CSS tokens from **0.9.x** remain compatible.

**Beta** components (`autocomplete`, `tabs`, `chip-group`, `list`, `input-date`, `steps`) are unchanged in maturity — usable but not on the docs landing carousel.

## [0.9.0] - 2026-05-22

### API freeze candidate

From this release, the **documented public API** in `public-api.ts`, Storybook, and the docs catalog was treated as frozen until **1.0.0**, except for:

- New **optional** inputs on existing components
- New components in **MINOR** releases
- **Beta** components (`autocomplete`, `tabs`, `chip-group`, `list`, `input-date`, `steps`) may still gain APIs

Breaking changes require [DEPRECATION.md](./docs/DEPRECATION.md) and a **MAJOR** bump.

### Added

- **Phase 4 ecosystem:** Figma/Penpot JSON tokens (`projects/design-tokens/`), `validate:tokens` CI, Material/CDK migration guides, live CRUD reference demo, public roadmap and maturity matrix pages, [V1_CRITERIA.md](./docs/V1_CRITERIA.md), [GOOD_FIRST_ISSUES.md](./docs/GOOD_FIRST_ISSUES.md), [RELEASE.md](./docs/RELEASE.md).
- **Phase 3 quality:** Playwright visual smoke CI, axe-playwright on stable Storybook stories, `bun audit` in CI, GitHub issue templates, expanded CODEOWNERS, DEPRECATION / ANGULAR_COMPATIBILITY / SECURITY / PERFORMANCE docs.
- **Phase 2 components:** `AuMenu`, `AuPopover`, `AuPagination`, `AuTable`, `AuBadge`, `AuBreadcrumb`, `AuProgress`, `AuLink`.
- Public [ROADMAP.md](./docs/ROADMAP.md).
- Component maturity catalog (`COMPONENT_MATURITY`) and docs badges (stable / beta / experimental).
- Density tokens v2: `data-au-density` (`compact` | `comfortable` | `spacious`) and `AuDensityDirective`.
- Experimental high-contrast theme: `data-au-theme="high-contrast"`.
- Adoption guides in the docs site: signal forms, UI patterns, troubleshooting, bundle size.
- `ng add @aurea-design-system/components` schematic (global styles + next steps).
- Governance docs: `CONTRIBUTING.md`, `COMPONENT_DONE.md`, `A11Y_AUDIT.md`, `BUNDLE.md`.

### Changed

- **Maturity:** `menu`, `popover`, and `table` promoted to **stable** (P0 Phase 2).
- Docs landing carousel shows **stable** components only (V1 product criteria).
- `AuTheme` accepts `high-contrast` as a fixed palette mode.
- npm `homepage` points to the docs site.
- Docs component index shows maturity badges and legend.

### Fixed

- `AuButton` click handler stops propagation after emit (carousel / nested interactive regions).
- Docs carousel prev/next buttons expose `aria-controls` for the slide grid (A11Y-003).

## [0.3.0] - 2025-05-01

### Added

- Steps, chip-group, landing docs carousel, signal-form stories coverage expansion.

### Changed

- Angular 21.2 peer dependency alignment.

## [0.2.0] - 2025-04-01

### Added

- Form controls: select, autocomplete, switch, radio-group, input-number, input-date, dialog, snackbar, tabs, list, skeleton.

## [0.1.0] - 2025-03-01

### Added

- Initial public release: button, form-field, input-text, checkbox, card, message, icon, divider, tooltip.

[Unreleased]: https://github.com/tonicarreras/aurea/compare/components-v1.0.0...HEAD
[1.0.0]: https://github.com/tonicarreras/aurea/compare/components-v0.9.0...components-v1.0.0
[0.9.0]: https://github.com/tonicarreras/aurea/compare/v0.3.0...components-v0.9.0
[0.3.0]: https://github.com/tonicarreras/aurea/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/tonicarreras/aurea/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/tonicarreras/aurea/releases/tag/v0.1.0
