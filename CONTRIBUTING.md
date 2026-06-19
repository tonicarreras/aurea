# Contributing to Aurea

Monorepo:

- `projects/components` — `@aurea-design-system/components` (npm)
- `projects/docs` — documentation site
- `.github/workflows` — CI

## Prerequisites

- **Bun** or **Node 20.19+**
- **Angular CLI 21.2+**

```bash
bun install
bun run build:components
bun run docs           # http://127.0.0.1:4200 (`start` is an alias)
bun run storybook      # http://127.0.0.1:6006
```

## Workflow

1. Open an issue for non-trivial work.
2. Branch from `develop` (or `main`).
3. Keep PRs focused; include tests and docs in the same PR.
4. Run before push:

```bash
bun run ci:full          # install + full pipeline (GitHub Actions parity)
bun run ci               # full pipeline without fresh install
bun run ci:fast          # skip Playwright / Storybook test-runner
```

5. Update [CHANGELOG.md](./CHANGELOG.md) under `[Unreleased]` for user-visible library changes.

### CI (GitHub Actions)

| Workflow                                                 | Trigger                              | Notes                                                                                           |
| -------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| [test.yml](.github/workflows/test.yml)                   | PR → `main`/`develop`, push → `main` | Library checks, Storybook test-runner, lint, docs build; `docs-e2e` reuses `docs-dist` artifact |
| [publish.yml](.github/workflows/publish.yml)             | Merge/release → `main`               | npm publish + `components-v*` tag                                                               |
| [compat-matrix.yml](.github/workflows/compat-matrix.yml) | Weekly + manual                      | `verify-angular-compat.mjs` per `@angular/core` range                                           |
| Dependabot                                               | Weekly                               | [`.github/dependabot.yml`](.github/dependabot.yml) — Bun + GitHub Actions                       |

Install step uses [`.github/actions/bun-install`](.github/actions/bun-install) (Bun + `~/.bun/install/cache` cache).

### npm scripts (cheat sheet)

| Command                  | When to use                                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| `build`                  | Alias of `build:components` (library + schematics + strip sourcemaps).                              |
| `docs` / `start`         | Docs site dev server (port **4200**).                                                               |
| `sync:story-overviews`   | After changing component overviews in docs i18n — regenerates Storybook `story-overview-source.ts`. |
| `sync:visual-stories`    | Regenerate `e2e-visual/visual-story-manifest.ts` (no git check).                                    |
| `verify:visual-manifest` | CI: sync manifest + fail if out of date.                                                            |
| `maintain:storybook`     | Pre-PR: `sync:story-overviews` + `verify:story-tags` + `verify:visual-manifest`.                    |
| `tag:stories`            | Apply `stable` / `beta` tags from `component-maturity.ts`.                                          |
| `test:docs:e2e`          | Docs Playwright smoke (run after `build:docs`; CI passes artifact from `test` job).                 |

5. Update [CHANGELOG.md](./CHANGELOG.md) under `[Unreleased]` for user-visible library changes.

New contributors: see [docs/GOOD_FIRST_ISSUES.md](./docs/GOOD_FIRST_ISSUES.md). Design principles: [docs/DESIGN.md](./docs/DESIGN.md). **API conventions:** [docs/API_CONVENTIONS.md](./docs/API_CONVENTIONS.md). **Floating UI:** [docs/FLOATING_UI.md](./docs/FLOATING_UI.md). Design hand-off: [projects/design-tokens/README.md](./projects/design-tokens/README.md).

## API conventions

- **Native primitive** → attribute directive on the host (`button[auButton]`, `input[auInputDate]`).
- **Composite widget** → custom element (`au-table`, `au-menu`, `au-form-field`).
- Do **not** ship duplicate selectors for the same widget (e.g. `<au-table>` and `<table auTable>`).
- Table sort/selection logic belongs in `au-table-data.ts`; overlays use `TooltipOverlay` / `FloatingPickerOverlay`.
- Full guide: [docs/API_CONVENTIONS.md](./docs/API_CONVENTIONS.md). Overlay a11y checklist: [docs/FLOATING_UI.md](./docs/FLOATING_UI.md).

## Component Definition of Done

Required before marking **stable** in `component-maturity.ts`:

**Code:** stable `au-*` selector; signal inputs/outputs; export in `public-api.ts`; only `--au-*` in styles.

- Specs (unit) + Storybook stories + docs registry entry
- Maturity level in `component-maturity.ts`; tag stories via `bun run tag:stories`
- Run `bun run maintain:storybook` before PR when stories/maturity/overviews change
- Per-component styling tokens documented
- Keyboard and ARIA notes in overview
- Signal-forms story when the control implements `FormValueControl`

## Storybook development

- Interaction tests: `play` with `storybook/test`; CI via `bun run test-storybook:ci`.
- axe-core runs on **stable** stories only (`stable-story-ids.ts`).
- Theme toolbar sets `data-au-theme` on `document.documentElement`.

## Code style

- Angular **standalone** components, **signals** for inputs/outputs.
- Styles: component CSS using `--au-*` tokens only (no hard-coded hex in components).
- Match existing file layout under `projects/components/src/lib/<name>/`.
- Shared CSS: `styles/aurea-global.css` where cross-host children need global rules.

**A11y:** visible focus; labels via `au-form-field`; notes in overview; no open items in [A11Y_AUDIT.md](./projects/components/A11Y_AUDIT.md).

**Release:** CHANGELOG entry; breaking changes follow [VERSIONING.md](./docs/VERSIONING.md).

## npm scripts (cheat sheet)

| Command                  | When to use                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `build`                  | Alias of `build:components` (library + schematics + strip sourcemaps).                                             |
| `build:components`       | Same as `build`; used explicitly in CI.                                                                            |
| `docs` / `start`         | Docs site dev server (port **4200**). `start` → `docs`.                                                            |
| `sync:story-overviews`   | After changing component overviews in `projects/docs/.../i18n` — regenerates Storybook `story-overview-source.ts`. |
| `sync:visual-stories`    | Regenerate `e2e-visual/visual-story-manifest.ts` (no git check).                                                   |
| `verify:visual-manifest` | CI: sync manifest + fail if `visual-story-manifest.ts` is out of date.                                             |
| `maintain:storybook`     | Pre-PR: `sync:story-overviews` + `verify:story-tags` + `verify:visual-manifest`.                                   |
| `tag:stories`            | Apply `stable` / `beta` tags from `component-maturity.ts`.                                                         |
| `update:bundle-baseline` | After intentional FESM size change; then `check:bundle` in CI.                                                     |
| `pack:package`           | Local `.tgz` smoke test before publish.                                                                            |
| `test:docs:e2e`          | Docs Playwright smoke (run after `build:docs`; CI does both).                                                      |

## Storybook development

- Interaction tests: `play` with `storybook/test`; CI via `bun run test-storybook:ci`.
- axe-core runs on **stable** stories only (`stable-story-ids.ts`).
- Theme toolbar sets `data-au-theme` on `document.documentElement`.
- Signal forms: document in [components README](./projects/components/README.md#signal-forms-angular-21); no separate “Signal form” story files (`form()` needs injection context).
- Custom `render` stories: Compodoc extraction disabled in `preview.ts` — add `parameters.docs.description.component` manually when needed.

## Code style

- Standalone components, **signals** for inputs/outputs.
- File layout: `projects/components/src/lib/<name>/`.
- Shared CSS: `styles/aurea-global.css` (field chrome, listbox overlay, description list, accordion shells). Portaled hosts (`au-snackbar`, `au-dialog`, …) ship component `styleUrl`.

## Commits

Keep [CHANGELOG.md](./CHANGELOG.md) updated under `[Unreleased]` for user-visible library changes. Post-1.0 releases follow [VERSIONING.md](./docs/VERSIONING.md).

## Accessibility

[A11Y_AUDIT.md](./projects/components/A11Y_AUDIT.md). Focus order and role regressions block **stable** releases.

## Links

- Docs: [aurea-ds.netlify.app](https://aurea-ds.netlify.app/)
- Design tokens: [projects/design-tokens/README.md](./projects/design-tokens/README.md)
- Versioning: [docs/VERSIONING.md](./docs/VERSIONING.md)
- Roadmap: [docs/ROADMAP.md](./docs/ROADMAP.md)
