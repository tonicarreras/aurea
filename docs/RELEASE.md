# Releases

How to ship `@aurea-design-system/components` versions and satisfy [V1_CRITERIA.md](./V1_CRITERIA.md).

## Version bump

1. Move `[Unreleased]` entries in [CHANGELOG.md](../CHANGELOG.md) to a new `## [X.Y.Z] - date` section.
2. Set `projects/components/package.json` `"version"` to `X.Y.Z`.
3. Run the full CI checklist from [CONTRIBUTING.md](../CONTRIBUTING.md).

## Git tag + GitHub Release

On merge to `main`, [.github/workflows/publish.yml](../.github/workflows/publish.yml) will:

1. Publish to npm (when `NPM_TOKEN` is set and the version is new).
2. Create git tag `components-vX.Y.Z` (if missing).
3. Create a **GitHub Release** with notes extracted from the matching `CHANGELOG.md` section (`scripts/extract-changelog-section.mjs`).

Manual fallback:

```bash
git tag -a components-vX.Y.Z -m "@aurea-design-system/components X.Y.Z"
git push origin components-vX.Y.Z
gh release create components-vX.Y.Z --title "@aurea-design-system/components X.Y.Z" --notes-file release-notes.md
```

## npm

Publishing runs via publish workflow on merge to `main` (or `workflow_dispatch`).

Uses `npm publish --access public --provenance`.

## Semver milestones

| Version | Meaning                                             |
| ------- | --------------------------------------------------- |
| `0.4.x` | Phase 2 application core                            |
| `0.9.0` | **API freeze candidate** — P0 overlays/table stable |
| `1.0.0` | Stable core per [V1_CRITERIA.md](./V1_CRITERIA.md)  |
