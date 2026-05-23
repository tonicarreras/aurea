# Aurea 1.0.0 criteria

Checklist before tagging **`@aurea-design-system/components@1.0.0`**.

Last audit: **2026-05-22** (post Phase 4 + 0.9.0 API freeze candidate).

## Product

- [x] All **P0** components from [ROADMAP.md](./ROADMAP.md) Phase 2 marked **stable** (`menu`, `popover`, `pagination`, `table` shell + sort header)
- [x] No **experimental** components in the public “recommended” set on the docs landing (carousel filters `stable` only)
- [x] Reference **CRUD demo** published and linked from docs (`/guides/crud-demo`, get-started, adoption cards)
- [x] Migration guides: Material + CDK (`/guides/migrate-material`, `/guides/migrate-cdk`)

## API & semver

- [x] **6+ months** of `0.x` releases with [CHANGELOG.md](../CHANGELOG.md) discipline (first public `0.1.0` 2025-03-01)
- [x] [DEPRECATION.md](./DEPRECATION.md) followed for any breaking renames
- [x] [ANGULAR_COMPATIBILITY.md](./ANGULAR_COMPATIBILITY.md) lists supported Angular LTS
- [x] API freeze announcement in **`0.9.0`** release notes (see [CHANGELOG.md](../CHANGELOG.md))

## Quality

- [x] CI green: unit coverage thresholds, Storybook test-runner, visual smoke, audit, `validate:tokens`
- [x] axe-core on all **stable** stories via test-runner (`stable-story-ids.ts` + `tag:stories`)
- [x] No open **blocker** a11y issues — known debt is non-blocking ([A11Y_AUDIT.md](./projects/components/A11Y_AUDIT.md) A11Y-001–004 target 0.5+)

## Ecosystem

- [x] [Storybook](https://aurea-ds-storybook.netlify.app/) + [docs](https://aurea-ds.netlify.app/) stable URLs in npm `homepage`
- [x] Figma/Penpot token files maintained under `projects/design-tokens/` (+ CI `validate:tokens`)
- [ ] GitHub **releases** with notes for each version — use tags `components-v*` and [RELEASE.md](./RELEASE.md); publish workflow does not auto-create GitHub Release yet
- [x] **Good first issue** label documented ([GOOD_FIRST_ISSUES.md](./GOOD_FIRST_ISSUES.md) + [`.github/labels.yml`](../.github/labels.yml))

## Governance

- [x] MIT license, [SECURITY.md](../SECURITY.md), [CONTRIBUTING.md](../CONTRIBUTING.md)
- [x] CODEOWNERS on critical paths
- [ ] npm provenance (optional) — enable on registry when publishing with `--provenance` (see [RELEASE.md](./RELEASE.md))

---

## Ready for 1.0.0?

When the two open items above are satisfied (GitHub Release notes per tag, optional provenance), tag **`components-v1.0.0`**, publish to npm, and add a migration section from **`0.9.x`** in [CHANGELOG.md](../CHANGELOG.md).

**Current candidate:** `0.9.0` — API freeze for the documented public surface; beta components remain usable but are not promoted on the landing carousel.
