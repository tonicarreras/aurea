# Changelog

All notable changes to **@aurea-design-system/components** are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).  
Versioning follows [Semantic Versioning](https://semver.org/) — see [VERSIONING.md](./docs/VERSIONING.md).

## [Unreleased]

### Changed

- Governance and design docs moved from repo root to [docs/](./docs/) (index: [docs/README.md](./docs/README.md)). Root keeps README, CHANGELOG, CONTRIBUTING, SECURITY.

## [0.9.0] - 2026-05-22

### API freeze candidate

From this release, the **documented public API** in `public-api.ts`, Storybook, and the docs catalog is treated as frozen until **1.0.0**, except for:

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

[Unreleased]: https://github.com/tonicarreras/aurea/compare/v0.9.0...HEAD
[0.9.0]: https://github.com/tonicarreras/aurea/compare/v0.3.0...v0.9.0
[0.3.0]: https://github.com/tonicarreras/aurea/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/tonicarreras/aurea/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/tonicarreras/aurea/releases/tag/v0.1.0
