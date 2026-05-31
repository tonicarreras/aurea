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
ng build components
ng serve docs          # http://127.0.0.1:4200
bun run storybook      # http://127.0.0.1:6006
```

## Workflow

1. Open an issue for non-trivial work.
2. Branch from `develop` (or `main`).
3. Keep PRs focused; include tests and docs in the same PR.
4. Run before push:

```bash
bun run ci:full          # same as GitHub Actions (install + full pipeline)
bun run ci               # full pipeline without fresh install
bun run ci:fast          # skip Playwright / Storybook test-runner
```

5. Update [CHANGELOG.md](./CHANGELOG.md) under `[Unreleased]` for user-visible library changes.

## Good first issues

Filter GitHub issues with label **`good first issue`** (see [`.github/labels.yml`](./.github/labels.yml)). Good candidates: under ~200 lines, tests + Storybook included, no deep overlay architecture.

| Area    | Example                                               |
| ------- | ----------------------------------------------------- |
| Docs    | EN/ES parity in `projects/docs/src/app/i18n`          |
| Stories | Missing variant for a stable component                |
| A11y    | `aria-*` improvement with test-runner proof           |
| Tokens  | Sync `projects/design-tokens/*.json` after CSS change |
| Tests   | Spec edge case (disabled, keyboard)                   |

## Component Definition of Done

Required before marking **stable** in `component-maturity.ts`:

**Code:** stable `au-*` selector; signal inputs/outputs; export in `public-api.ts`; only `--au-*` in styles.

**Tests:** `*.spec.ts` (render, disabled/invalid, events); form integration when `FormValueControl`.

**Storybook:** variant stories; signal-forms story when applicable; tag `stable`/`beta` via `bun run tag:stories`.

**Docs site:** `component-docs.registry.ts`; overview + API + styling in `i18n/locales/{en,es}/`; preview + examples.

**A11y:** visible focus; labels via `au-form-field`; notes in overview; no open items in [A11Y_AUDIT.md](./projects/components/A11Y_AUDIT.md).

**Release:** CHANGELOG entry; breaking changes follow [VERSIONING.md](./docs/VERSIONING.md).

## Storybook development

- Interaction tests: `play` with `storybook/test`; CI via `bun run test-storybook:ci`.
- axe-core runs on **stable** stories only (`stable-story-ids.ts`).
- Theme toolbar sets `data-au-theme` on `document.documentElement`.
- Signal forms: document in [components README](./projects/components/README.md#signal-forms-angular-21); no separate “Signal form” story files (`form()` needs injection context).
- Custom `render` stories: Compodoc extraction disabled in `preview.ts` — add `parameters.docs.description.component` manually when needed.

## Code style

- Standalone components, **signals** for inputs/outputs.
- File layout: `projects/components/src/lib/<name>/`.
- Shared CSS: `styles/aurea-global.css` (field chrome, listbox, snackbar).

## Commits

Imperative subjects; Conventional Commits when helpful (`feat(components):`, `fix(button):`, `docs:`).

## Accessibility

[A11Y_AUDIT.md](./projects/components/A11Y_AUDIT.md). Focus order and role regressions block **stable** releases.

## Links

- Docs: [aurea-ds.netlify.app](https://aurea-ds.netlify.app/)
- Design tokens: [projects/design-tokens/README.md](./projects/design-tokens/README.md)
- Versioning: [docs/VERSIONING.md](./docs/VERSIONING.md)
- Roadmap: [docs/ROADMAP.md](./docs/ROADMAP.md)
