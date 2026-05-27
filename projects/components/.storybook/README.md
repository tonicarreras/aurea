# Storybook config (Aurea library)

## UI interactions and checks

- Utilities live in **`storybook/test`** (`expect`, `userEvent`, `within`, `fn` for output `args`). Stories use `play` for assertions on the **canvas** (same scope as [interaction testing](https://storybook.js.org/docs/writing-tests/interaction-testing), compatible with Docs mode).
- In Storybook 10 **Interactions** is part of the runtime; you do not need a separate npm addon (the legacy `@storybook/addon-interactions` targets an 8.x line on the registry).

## Barra de herramientas (canvas global)

| Global | Atributo / efecto |
|--------|-------------------|
| **Tema** (`auTheme`) | `light` / `dark` — apariencia base |
| **Contraste** (`auHighContrast`) | `off` / `on` — combina con tema → `high-contrast` o `high-contrast-dark` |
| **Espacio** (`auDensity`) | `compact` / `comfortable` / `spacious` → `data-au-density` en `<html>` |
| **Docs** (`docsLocale`) | `en` / `es` — overview de Autodocs |

La lógica vive en `src/lib/storybook/apply-preview-globals.ts` (misma regla que `resolveDocsPreviewTheme` en la app de documentación).

- `main.ts` sirve estáticos desde `src/lib/tokens` → `/au-tokens/` y `src/lib/storybook` → `/au-storybook/` (`preview-head.html`).

## Test runner (CI / headless)

- Build static output: `bun run build-storybook` (writes `storybook-static` at the monorepo root).
- Local with a running server (e.g. `bun run storybook`): in another terminal `bun run test-storybook` (same URL as port `6006`).
- One step: `bun run test-storybook:ci` (starts `http-server` on `127.0.0.1:6006` then the runner; includes the prior build in the script).

Global Playwright/CLI tweaks: `test-runner.ts` in this folder (`@storybook/test-runner` reads it via `--config-dir`).

- **Addon a11y:** `parameters.a11y.test: 'error'` fails CI on violations.
- **axe-core (stable only):** `postVisit` runs `axe-playwright` for story ids listed in `stable-story-ids.ts`. Stories are tagged `stable` / `beta` via `bun run tag:stories` (from `component-maturity.ts`).
- **Visual smoke:** `bun run test:visual:ci` — Playwright screenshots in `../e2e-visual/__snapshots__/`.

Stories with **custom `render`** (Button, Card, Divider, etc.): `preview.ts` disables Compodoc `extractArgTypes` / `extractComponentDescription` globally so static builds (Netlify, `build-storybook`) do not throw `Invalid component undefined` when class names are minified. Add `parameters.docs.description.component` on the story `Meta` when you want an Autodocs blurb.

Signal forms: document in [`../README.md`](../README.md) with a host-component example; do not add separate Storybook “Signal form” story files (`form()` needs an app injection context).
