# Roadmap

Public plan for `@aurea-design-system/components`. History lives in [CHANGELOG.md](../CHANGELOG.md). Policy: [VERSIONING.md](./VERSIONING.md).

## Shipped

| Milestone | Focus                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------------- |
| **0.4.x** | Application core: menu, popover, pagination, table, badge, link, …                                       |
| **0.9.x** | API freeze candidate; visual regression + axe on stable Storybook                                        |
| **1.0.0** | Stable core, public docs, CRUD demo, npm provenance                                                      |
| **1.2.0** | Form layout components stable; menu keyboard (A11Y-004)                                                  |
| **1.4.0** | Avatar + drawer stable                                                                                   |
| **1.5.0** | Full catalog stable (incl. `AuInputTime`); snackbar/chip a11y fixes                                      |
| **1.6.0** | `AuInputPassword`, `AuButtonGroup`, `AuDescriptionList`, `AuTagInput`; password split from `AuInputText` |

Live status: [maturity matrix](https://aurea-ds.netlify.app/en/maturity) · [roadmap page](https://aurea-ds.netlify.app/en/roadmap).

## Post-1.0 tooling

| Item                     | Status                            |
| ------------------------ | --------------------------------- |
| Changelog automation     | Planned                           |
| Angular compat matrix CI | ✅ Weekly `compat-matrix.yml`     |
| Docs Playwright smoke    | ✅ `build:docs` + `test:docs:e2e` |
| Bundle size guard        | ✅ `check:bundle` (+5%)           |

## Ideas (not committed)

- Branded date/time field shell (native picker kept)
- Optional virtualized table data source
- Deferred overlay registration for rarely used primitives
