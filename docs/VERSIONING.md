# Versioning & releases

Aurea follows **[Semantic Versioning 2.0.0](https://semver.org/)** for `@aurea-design-system/components`.

## Version format

`MAJOR.MINOR.PATCH` (e.g. `1.5.0`)

| Bump      | When                                                                                                                    |
| --------- | ----------------------------------------------------------------------------------------------------------------------- |
| **MAJOR** | Breaking public API: removed exports, renamed selectors, incompatible input/output contracts, required peer major bump. |
| **MINOR** | Backward-compatible features: new components, new optional inputs, new tokens, new schematics.                          |
| **PATCH** | Backward-compatible fixes: a11y, visual bugs, docs-only package metadata.                                               |

While `0.x`, MINOR may include small breaking changes; document them in [CHANGELOG.md](../CHANGELOG.md).

## Public API surface

Breaking without deprecation:

- Exported symbols from `public-api.ts`
- Component selectors (`au-*`)
- Required inputs and documented default behavior
- Documented CSS custom properties in component Styling sections
- Peer dependency ranges in `package.json`

Not breaking: internal CSS, Storybook-only demos, docs site content, new optional inputs with defaults.

## Component maturity

| Badge            | Meaning                                                       |
| ---------------- | ------------------------------------------------------------- |
| **stable**       | API and a11y covered by tests; safe for production.           |
| **beta**         | Usable; optional props may still land; edge cases documented. |
| **experimental** | May change or be removed in a MINOR until promoted.           |

Promotions are announced in [CHANGELOG.md](../CHANGELOG.md). As of **1.6.0**, all entries in `component-maturity.ts` are **stable**.

## Deprecations

| Step        | When            | Action                                      |
| ----------- | --------------- | ------------------------------------------- |
| 1. Announce | First **minor** | `@deprecated` JSDoc + CHANGELOG + docs note |
| 2. Warn     | Next **minor**  | Optional dev-only `console.warn`            |
| 3. Remove   | **Major** only  | Delete API; migration sample in CHANGELOG   |

Minimum notice: **two MINOR releases** before removal. Each entry must list target major, replacement, and before/after sample.

## Angular compatibility

| Aurea   | Angular (`@angular/core`) | Node (tooling) | Status      |
| ------- | ------------------------- | -------------- | ----------- |
| **2.x** | **22.0.x** — `^22.0.0`    | 20.19+         | Active      |
| **1.x** | **21.2.x** — `^21.2.0`    | 20.19+         | Maintenance |

- **Signal forms** (`[formField]`, `form()`) require Angular **21.2+**.
- **Standalone** components only; **zoneless** supported per [Angular docs](https://angular.dev/guide/zoneless).
- CI pins versions in root `package.json`; published peers define the consumer range.

## Release process

1. Move `[Unreleased]` in [CHANGELOG.md](../CHANGELOG.md) to `## [X.Y.Z] - date`.
2. Set `projects/components/package.json` `"version"`.
3. Run `bun run ci` (see [CONTRIBUTING.md](../CONTRIBUTING.md)).
4. Merge to `main` — [.github/workflows/publish.yml](../.github/workflows/publish.yml) publishes to npm, tags `components-vX.Y.Z`, and creates a GitHub Release from the CHANGELOG section.

Manual tag fallback:

```bash
git tag -a components-vX.Y.Z -m "@aurea-design-system/components X.Y.Z"
git push origin components-vX.Y.Z
gh release create components-vX.Y.Z --title "@aurea-design-system/components X.Y.Z" --notes-file release-notes.md
```

Git tags use prefix **`components-v`**. **`1.0.0`** shipped **2026-05-30** (`components-v1.0.0`).
