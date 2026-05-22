# Versioning policy

Aurea follows **[Semantic Versioning 2.0.0](https://semver.org/)** for `@aurea-design-system/components`.

## Version format

`MAJOR.MINOR.PATCH` (e.g. `0.3.1`)

| Bump | When |
|------|------|
| **MAJOR** | Breaking public API: removed exports, renamed selectors, incompatible input/output contracts, required peer major bump. |
| **MINOR** | Backward-compatible features: new components, new optional inputs, new tokens, new schematics. |
| **PATCH** | Backward-compatible fixes: a11y, visual bugs, docs-only package metadata. |

While `0.x`, MINOR may include small breaking changes; we document them in `CHANGELOG.md` and bump MINOR with a clear migration note.

## Public API surface

Counted as breaking if changed without deprecation:

- Exported TypeScript symbols from `public-api.ts`
- Component selectors (`au-*`)
- Required inputs and default behavior documented in Storybook / docs
- CSS custom properties listed in per-component **Styling** sections
- Peer dependency ranges in `package.json`

Not breaking:

- Internal CSS not documented as tokens
- Storybook-only demos
- Docs site content
- Adding optional inputs with defaults

## Component maturity vs semver

| Badge | Meaning for consumers |
|-------|------------------------|
| **stable** | API and a11y contract covered by tests; safe for production. |
| **beta** | Usable; API may still gain optional props; edge cases documented. |
| **experimental** | May change or be removed in a MINOR until promoted. |

Promoting **experimental → beta → stable** is announced in `CHANGELOG.md` but does not require a MAJOR by itself unless the API changes.

## Release process

1. Update `CHANGELOG.md` under `[Unreleased]`.
2. Bump `projects/components/package.json` version.
3. Tag `components-vX.Y.Z` (or monorepo tag per your CI).
4. Publish to npm from `dist/components` after `ng build components`.

## Angular peers

- **Angular 21.2+** is required for signal forms and current control APIs.
- A new **Angular major** from Google may require a matching Aurea MAJOR when peer ranges tighten.
