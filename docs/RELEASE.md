# Releases

How to ship `@aurea-design-system/components` versions and satisfy [V1_CRITERIA.md](./V1_CRITERIA.md).

## Version bump

1. Move `[Unreleased]` entries in [CHANGELOG.md](../CHANGELOG.md) to a new `## [X.Y.Z] - date` section.
2. Set `projects/components/package.json` `"version"` to `X.Y.Z`.
3. Run the full CI checklist from [CONTRIBUTING.md](../CONTRIBUTING.md).

## Git tag + GitHub Release

```bash
git tag -a components-vX.Y.Z -m "@aurea-design-system/components X.Y.Z"
git push origin components-vX.Y.Z
```

Then on GitHub: **Releases → Draft a new release** → choose tag `components-vX.Y.Z` → paste the `CHANGELOG` section for that version.

Optional: attach `dist/components` artifact from CI if you publish manually.

## npm

Publishing runs via [.github/workflows/publish.yml](../.github/workflows/publish.yml) on merge to `main` (or `workflow_dispatch`).

Recommended when your npm account supports it:

```bash
npm publish --access public --provenance
```

Add `--provenance` to the publish workflow step when ready.

## Semver milestones

| Version | Meaning                                             |
| ------- | --------------------------------------------------- |
| `0.4.x` | Phase 2 application core                            |
| `0.9.0` | **API freeze candidate** — P0 overlays/table stable |
| `1.0.0` | Stable core per [V1_CRITERIA.md](./V1_CRITERIA.md)  |
