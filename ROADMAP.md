# Aurea roadmap

Public plan for `@aurea-design-system/components`. See [VERSIONING.md](./VERSIONING.md) for release policy.

## Completed

| Phase | Focus | Status |
|-------|--------|--------|
| **0** | Gobernanza, madurez, guías adopción, auditoría a11y | ✅ |
| **1** | Tokens v2, densidad, alto contraste, schematic `ng add`, patrones docs | ✅ |
| **2** | Core de aplicación: menú, popover, paginación, tabla, badge, breadcrumb, progress, link | ✅ (v0.4) |

## Phase 2 — Application core (delivered in 0.4.x)

| Priority | Component | Export |
|----------|-----------|--------|
| P0 | Menu / dropdown | `AuMenu`, `AuMenuItem`, `AuMenuTrigger` |
| P0 | Popover | `AuPopover`, `AuPopoverTrigger` |
| P0 | Pagination | `AuPagination` |
| P1 | Table (shell + sort header) | `AuTable`, `AuTableSortHeader` |
| P1 | Breadcrumb | `AuBreadcrumb` |
| P1 | Badge | `AuBadge` |
| P1 | Progress | `AuProgress` |
| P2 | Link | `AuLink` |

**Next in 0.5.x (phase 2 continuation):** Accordion, Empty state, Slider, File upload, Fieldset layout.

## Phase 3 — Pro quality (planned)

- Visual regression (Chromatic / Playwright screenshots)
- axe-core on stable Storybook stories in test-runner
- GitHub issue templates, CODEOWNERS
- Performance audit (overlay lazy init, virtualized table)

## Phase 4 — Ecosystem (planned)

- Figma / Penpot tokens ↔ `au-tokens.css`
- Migration guides (Material, CDK)
- Reference app (CRUD demo)
- **v1.0.0** when core is stable + 6 months semver discipline

## Version targets

| Version | Focus |
|---------|--------|
| **0.4.x** | Phase 2 core components |
| **0.5.x** | Accordion, empty state, form layout, slider |
| **0.6–0.8.x** | Table data features, file upload |
| **0.9.x** | Visual regression + API freeze candidate |
| **1.0.0** | Stable core, public roadmap, reference app |
