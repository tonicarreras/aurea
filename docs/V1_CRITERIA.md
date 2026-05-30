# Aurea 1.0.0 criteria

Checklist before tagging **`@aurea-design-system/components@1.0.0`**.

Last audit: **2026-05-30** (`1.0.0` shipped).

## Product

- [x] All **P0** components from [ROADMAP.md](./ROADMAP.md) Phase 2 marked **stable** (`menu`, `popover`, `pagination`, `table` shell + sort header)
- [x] No **experimental** components in the public “recommended” set on the docs landing (carousel filters `stable` only)
- [x] Reference **CRUD demo** published and linked from docs (`/guides/crud-demo`, get-started, adoption cards)

## API & semver

- [x] **6+ months** of `0.x` releases with [CHANGELOG.md](../CHANGELOG.md) discipline (first public `0.1.0` 2025-03-01)
- [x] [DEPRECATION.md](./DEPRECATION.md) followed for any breaking renames
- [x] [ANGULAR_COMPATIBILITY.md](./ANGULAR_COMPATIBILITY.md) lists supported Angular LTS
- [x] API freeze announcement in **`0.9.0`** release notes (see [CHANGELOG.md](../CHANGELOG.md))

## Quality

- [x] CI green: unit coverage thresholds, Storybook test-runner, visual smoke, audit, `validate:tokens`
- [x] axe-core on all **stable** stories via test-runner (`stable-story-ids.ts` + `tag:stories`)
- [x] No open **blocker** a11y issues — known debt tracked with milestone 0.10 ([A11Y_AUDIT.md](./projects/components/A11Y_AUDIT.md) A11Y-001–004)

## Ecosystem

- [x] [Storybook](https://aurea-ds-storybook.netlify.app/) + [docs](https://aurea-ds.netlify.app/) stable URLs in npm `homepage`
- [x] Figma/Penpot token files maintained under `projects/design-tokens/` (+ CI `validate:tokens`)
- [x] GitHub **releases** with notes for each version — tag `components-v*` + CHANGELOG body via [publish.yml](../.github/workflows/publish.yml) after npm publish
- [x] **Good first issue** label documented ([GOOD_FIRST_ISSUES.md](./GOOD_FIRST_ISSUES.md) + [`.github/labels.yml`](../.github/labels.yml))

## Governance

- [x] MIT license, [SECURITY.md](../SECURITY.md), [CONTRIBUTING.md](../CONTRIBUTING.md)
- [x] CODEOWNERS on critical paths
- [x] npm provenance — enabled in publish workflow (`npm publish --provenance`)

---

## 1.0.0 shipped

**`@aurea-design-system/components@1.0.0`** (2026-05-30) — tag **`components-v1.0.0`**, migration notes in [CHANGELOG.md](../CHANGELOG.md#100---2026-05-30). Beta components remain usable but are not promoted on the landing carousel.
