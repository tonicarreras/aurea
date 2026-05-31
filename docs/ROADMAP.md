# Aurea roadmap

Public plan for `@aurea-design-system/components`. See [VERSIONING.md](./VERSIONING.md) for release policy.

## Completed

| Phase | Focus                                                                                        | Status    |
| ----- | -------------------------------------------------------------------------------------------- | --------- |
| **0** | Gobernanza, madurez, guías adopción, auditoría a11y                                          | ✅        |
| **1** | Tokens v2, densidad, alto contraste, schematic `ng add`, guías docs                          | ✅        |
| **2** | Core de aplicación: menú, popover, paginación, tabla, badge, breadcrumb, progress, link      | ✅ (v0.4) |
| **3** | Calidad pro: axe stable, visual regression, audit CI, issue templates, CODEOWNERS, políticas | ✅        |

## Phase 2 — Application core (delivered in 0.4.x)

| Priority | Component                   | Export                                  |
| -------- | --------------------------- | --------------------------------------- |
| P0       | Menu / dropdown             | `AuMenu`, `AuMenuItem`, `AuMenuTrigger` |
| P0       | Popover                     | `AuPopover`, `AuPopoverTrigger`         |
| P0       | Pagination                  | `AuPagination`                          |
| P1       | Table (shell + sort header) | `AuTable`, `AuTableSortHeader`          |
| P1       | Breadcrumb                  | `AuBreadcrumb`                          |
| P1       | Badge                       | `AuBadge`                               |
| P1       | Progress                    | `AuProgress`                            |
| P2       | Link                        | `AuLink`                                |

**Next in 0.5.x (phase 2 continuation):** Accordion, Empty state, Slider, File upload, Fieldset layout — **delivered in 1.1.0** (beta); **promoted to stable in 1.2.0** after a11y + docs audit. New components ship **1–2 per MINOR** release (same cadence as 1.1.0).

## Phase 3 — Pro quality (delivered)

- Playwright visual smoke tests (`test:visual:ci`, **stable** stories via `visual-story-manifest.ts`, snapshots in `e2e-visual/__snapshots__`)
- axe-core via `axe-playwright` on **stable** stories in test-runner (`stable-story-ids.ts`)
- GitHub issue templates (bug, feature, a11y) + `config.yml`
- CODEOWNERS by area (forms, overlay, tokens, CI, docs)
- [DEPRECATION.md](./DEPRECATION.md), [ANGULAR_COMPATIBILITY.md](./ANGULAR_COMPATIBILITY.md), [SECURITY.md](../SECURITY.md), [PERFORMANCE.md](../projects/components/PERFORMANCE.md)
- `bun audit` in CI; `ng build components` in CI

## Phase 4 — Ecosystem (delivered)

| Deliverable                             | Location                                                                               |
| --------------------------------------- | -------------------------------------------------------------------------------------- |
| Figma / Penpot tokens ↔ `au-tokens.css` | `projects/design-tokens/`, `scripts/validate-design-tokens.mjs`, docs `/design-tokens` |
| Reference CRUD demo                     | Docs `/guides/crud-demo` (`docs-crud-demo`)                                            |
| Public roadmap & maturity matrix        | Docs `/roadmap`, `/maturity`                                                           |
| v1 criteria & contributor onboarding    | [V1_CRITERIA.md](./V1_CRITERIA.md), [GOOD_FIRST_ISSUES.md](./GOOD_FIRST_ISSUES.md)     |

**0.9.0** — API freeze candidate (P0 overlays/table **stable**). **1.0.0** when [V1_CRITERIA.md](./V1_CRITERIA.md) is fully checked — see [RELEASE.md](./RELEASE.md) for GitHub Release tags.

## Version targets

| Version       | Focus                                                                           |
| ------------- | ------------------------------------------------------------------------------- |
| **0.4.x**     | Phase 2 core components                                                         |
| **0.5.x**     | Accordion, empty state, form layout, slider (**1.1.0** beta → **1.2.0** stable) |
| **0.6–0.8.x** | Table data features, file upload (**1.1.0** beta → **1.2.0** stable)            |
| **0.9.x**     | Visual regression + API freeze candidate                                        |
| **1.0.0**     | Stable core, public roadmap, reference app                                      |
| **1.1.0**     | Empty state, accordion, fieldset, slider, file upload (beta)                    |
| **1.2.0**     | Promote 1.1.0 betas to stable; menu roving tabindex + typeahead (A11Y-004)      |
| **1.3.0**     | `AuAvatar` + `AuDrawer` (beta) — 2 components per MINOR cadence                 |
| **1.4.0**     | Promote 1.3.0 betas to stable; avatar `square` shape + drawer overlay polish    |

## Post-1.0 — Tooling

| Item                                                      | Status  | Notes                                                                                  |
| --------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------- |
| Changelog automation (`changesets` or `standard-version`) | Planned | Evaluate after API freeze; keep [Keep a Changelog](https://keepachangelog.com/) format |
| Angular compat matrix CI                                  | ✅      | Weekly workflow `compat-matrix.yml`                                                    |
| Docs site Playwright smoke                                | ✅      | `test:docs:e2e:ci`                                                                     |
| Bundle size guard                                         | ✅      | `check:bundle` (+5% threshold)                                                         |
