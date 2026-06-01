# Contributing to Aurea

Thank you for improving the design system. This monorepo contains:

- `projects/components` — publishable library `@aurea-design-system/components`
- `projects/docs` — documentation site
- `.github/workflows` — CI (build, test, Storybook, publish)

## Prerequisites

- **Bun** or **Node 20.19+**
- **Angular CLI 21.2+** (`ng` in PATH)

```bash
bun install
bun run build:components
bun run docs           # http://127.0.0.1:4200 (`start` is an alias)
bun run storybook      # http://127.0.0.1:6006
```

## Workflow

1. Open an issue or comment on an existing one for non-trivial work.
2. Branch from `develop` (or `main` per team policy).
3. Keep PRs focused; link related docs and tests in the same PR.
4. Run before push (same order as `.github/workflows/test.yml`):

```bash
bun run ci:full          # install + full pipeline (GitHub Actions parity)
bun run ci               # full pipeline without fresh install
bun run ci:fast          # skip Playwright / Storybook test-runner
```

Individual steps (e.g. `bun run test:coverage`, `bun run verify:i18n`) remain available in `package.json` when debugging one check.

### CI (GitHub Actions)

| Workflow | Trigger | Notes |
| -------- | ------- | ----- |
| [test.yml](.github/workflows/test.yml) | PR → `main`/`develop`, push → `main` | Library checks, Storybook test-runner, lint, docs build; `docs-e2e` reuses `docs-dist` artifact |
| [publish.yml](.github/workflows/publish.yml) | Merge/release → `main` | npm publish + `components-v*` tag |
| [compat-matrix.yml](.github/workflows/compat-matrix.yml) | Weekly + manual | `verify-angular-compat.mjs` per `@angular/core` range |
| Dependabot | Weekly | [`.github/dependabot.yml`](.github/dependabot.yml) — Bun + GitHub Actions |

Install step uses [`.github/actions/bun-install`](.github/actions/bun-install) (Bun + `~/.bun/install/cache` cache).

### npm scripts (cheat sheet)

| Command | When to use |
| ------- | ----------- |
| `build` | Alias of `build:components` (library + schematics + strip sourcemaps). |
| `docs` / `start` | Docs site dev server (port **4200**). |
| `sync:story-overviews` | After changing component overviews in docs i18n — regenerates Storybook `story-overview-source.ts`. |
| `sync:visual-stories` | Regenerate `e2e-visual/visual-story-manifest.ts` (no git check). |
| `verify:visual-manifest` | CI: sync manifest + fail if out of date. |
| `maintain:storybook` | Pre-PR: `sync:story-overviews` + `verify:story-tags` + `verify:visual-manifest`. |
| `tag:stories` | Apply `stable` / `beta` tags from `component-maturity.ts`. |
| `test:docs:e2e` | Docs Playwright smoke (run after `build:docs`; CI passes artifact from `test` job). |

5. Update [CHANGELOG.md](./CHANGELOG.md) under `[Unreleased]` for user-visible library changes.

New contributors: see [docs/GOOD_FIRST_ISSUES.md](./docs/GOOD_FIRST_ISSUES.md). Governance index: [docs/README.md](./docs/README.md). Design hand-off: [projects/design-tokens/README.md](./projects/design-tokens/README.md).

## Component Definition of Done

Every new or materially changed component must satisfy **[projects/components/COMPONENT_DONE.md](./projects/components/COMPONENT_DONE.md)**.

Summary:

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

## Commits

Use clear, imperative subjects. Prefer Conventional Commits prefixes when helpful:

- `feat(components): add AuFoo`
- `fix(button): stop click propagation`
- `docs: signal forms guide`

## Changelog

Keep [CHANGELOG.md](./CHANGELOG.md) updated under `[Unreleased]` for user-visible library changes. Post-1.0 releases follow [VERSIONING.md](./docs/VERSIONING.md).

## Accessibility

See **[projects/components/A11Y_AUDIT.md](./projects/components/A11Y_AUDIT.md)**. Regressions in focus order or roles are release blockers for **stable** components.

## Questions

- Docs: [aurea-ds.netlify.app](https://aurea-ds.netlify.app/)
- Issues: GitHub repository linked from the root README
