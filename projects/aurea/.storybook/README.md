# Storybook config (Aurea library)

## UI interactions and checks

- Utilities live in **`storybook/test`** (`expect`, `userEvent`, `within`, `fn` for output `args`). Stories use `play` for assertions on the **canvas** (same scope as [interaction testing](https://storybook.js.org/docs/writing-tests/interaction-testing), compatible with Docs mode).
- In Storybook 10 **Interactions** is part of the runtime; you do not need a separate npm addon (the legacy `@storybook/addon-interactions` targets an 8.x line on the registry).

## Test runner (CI / headless)

- Build static output: `bun run build-storybook` (writes `storybook-static` at the monorepo root).
- Local with a running server (e.g. `bun run storybook`): in another terminal `bun run test-storybook` (same URL as port `6006`).
- One step: `bun run test-storybook:ci` (starts `http-server` on `127.0.0.1:6006` then the runner; includes the prior build in the script).

Global Playwright/CLI tweaks: `test-runner.ts` in this folder (`@storybook/test-runner` reads it via `--config-dir`).

Stories with **wrapper** components using `formField` + a custom template: if the Angular/docs enhancer returns `Invalid component` in the test-runner, add to that story’s `Meta`: `parameters.docs.extractArgTypes: () => ({})` (the signal demos in this repo already do). Export story names as ASCII in `export const` (e.g. `WithValidation` + `name: 'With validation'`) so URLs and the runner stay aligned.
