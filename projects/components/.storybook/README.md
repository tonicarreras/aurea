# Storybook config (Aurea library)

## UI interactions and checks

- Utilities live in **`storybook/test`** (`expect`, `userEvent`, `within`, `fn` for output `args`). Stories use `play` for assertions on the **canvas** (same scope as [interaction testing](https://storybook.js.org/docs/writing-tests/interaction-testing), compatible with Docs mode).
- In Storybook 10 **Interactions** is part of the runtime; you do not need a separate npm addon (the legacy `@storybook/addon-interactions` targets an 8.x line on the registry).

## Tema (claro / oscuro)

- La barra de herramientas incluye **Tema** (globals `auTheme`). Aplica `data-au-theme` en `document.documentElement` para que tokens y canvas de Docs usen `au-tokens.css` (misma cascada que en la app con la directiva `AuTheme`).

## Test runner (CI / headless)

- Build static output: `bun run build-storybook` (writes `storybook-static` at the monorepo root).
- Local with a running server (e.g. `bun run storybook`): in another terminal `bun run test-storybook` (same URL as port `6006`).
- One step: `bun run test-storybook:ci` (starts `http-server` on `127.0.0.1:6006` then the runner; includes the prior build in the script).

Global Playwright/CLI tweaks: `test-runner.ts` in this folder (`@storybook/test-runner` reads it via `--config-dir`).

Stories with **custom `render`** (Button, Card, Divider, etc.): `preview.ts` disables Compodoc `extractArgTypes` / `extractComponentDescription` globally so static builds (Netlify, `build-storybook`) do not throw `Invalid component undefined` when class names are minified. Add `parameters.docs.description.component` on the story `Meta` when you want an Autodocs blurb.

Signal-form hosts: same `extractArgTypes` override on the story `Meta` if needed. Export story names as ASCII in `export const` (e.g. `WithValidation` + `name: 'With validation'`) so URLs and the runner stay aligned.
