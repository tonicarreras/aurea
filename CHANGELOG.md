# Changelog

All notable changes to **@aurea-design-system/components** are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).  
Versioning follows [Semantic Versioning](https://semver.org/) — see [VERSIONING.md](./VERSIONING.md).

## [Unreleased]

### Added

- **Phase 2 components:** `AuMenu`, `AuPopover`, `AuPagination`, `AuTable`, `AuBadge`, `AuBreadcrumb`, `AuProgress`, `AuLink`.
- Public [ROADMAP.md](./ROADMAP.md).

### Added (0.4 prep)

- Component maturity catalog (`COMPONENT_MATURITY`) and docs badges (stable / beta / experimental).
- Density tokens v2: `data-au-density` (`compact` | `comfortable` | `spacious`) and `AuDensityDirective`.
- Experimental high-contrast theme: `data-au-theme="high-contrast"`.
- Adoption guides in the docs site: signal forms, UI patterns, troubleshooting, bundle size.
- `ng add @aurea-design-system/components` schematic (global styles + next steps).
- Governance docs: `CONTRIBUTING.md`, `COMPONENT_DONE.md`, `A11Y_AUDIT.md`, `BUNDLE.md`.

### Changed

- `AuTheme` accepts `high-contrast` as a fixed palette mode.
- Docs component index shows maturity badges and legend.

### Fixed

- `AuButton` click handler stops propagation after emit (carousel / nested interactive regions).

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

[Unreleased]: https://github.com/tonicarreras/aurea/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/tonicarreras/aurea/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/tonicarreras/aurea/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/tonicarreras/aurea/releases/tag/v0.1.0
