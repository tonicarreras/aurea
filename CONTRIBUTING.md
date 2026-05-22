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
ng build components
ng serve docs
```

## Workflow

1. Open an issue or comment on an existing one for non-trivial work.
2. Branch from `develop` (or `main` per team policy).
3. Keep PRs focused; link related docs and tests in the same PR.
4. Run before push:

```bash
ng test components --no-watch --browsers=ChromeHeadless
ng build components
ng build docs
```

5. Update `CHANGELOG.md` under `[Unreleased]` for user-visible library changes.

## Component Definition of Done

Every new or materially changed component must satisfy **[projects/components/COMPONENT_DONE.md](./projects/components/COMPONENT_DONE.md)**.

Summary:

- Specs (unit) + Storybook stories + docs registry entry
- Maturity level in `component-maturity.ts`
- Per-component styling tokens documented
- Keyboard and ARIA notes in overview
- Signal-forms story when the control implements `FormValueControl`

## Code style

- Angular **standalone** components, **signals** for inputs/outputs.
- Styles: component CSS using `--au-*` tokens only (no hard-coded hex in components).
- Match existing file layout under `projects/components/src/lib/<name>/`.

## Commits

Use clear, imperative subjects. Prefer Conventional Commits prefixes when helpful:

- `feat(components): add AuFoo`
- `fix(button): stop click propagation`
- `docs: signal forms guide`

## Accessibility

See **[projects/components/A11Y_AUDIT.md](./projects/components/A11Y_AUDIT.md)**. Regressions in focus order or roles are release blockers for **stable** components.

## Questions

- Docs: [aurea-ds.netlify.app](https://aurea-ds.netlify.app/)
- Issues: GitHub repository linked from the root README
