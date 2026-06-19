# Design principles

Semantic UI for **WCAG 2.2 AA** on primary flows, **Angular 22** (signals, `formField`).

## Principles

1. **Visual hierarchy** — typography, spacing, and contrast use `--au-*` tokens only in product code.
2. **Single source of truth** — forms use Angular’s model; controls do not duplicate `FieldTree` validation.
3. **Accessibility by default** — visible focus roles (`--au-focus-inset`, `--au-focus-tactile`, `--au-focus-tab`), wired `aria-*`, `prefers-reduced-motion` on motion.
4. **Layers** — primitives (internal) → semantic → roles → domain → high-contrast in `au-tokens.css`; component CSS maps roles to UI.
5. **Color coherence** — slate neutrals, one accent; dark mode reuses the same semantic names.
6. **Adaptive density** — `data-au-density` scales field heights via `--au-size-field-h-*`.

## Tokens

- **Source of truth:** `projects/components/src/lib/tokens/au-tokens.css` (imports primitives → semantic → roles → domain → high-contrast).
- **App setup:** import `au-tokens.css` + `aurea-global.css` once at app level.
- **Theme:** `data-au-theme="light" | "dark" | "high-contrast" | "high-contrast-dark"` or `[auTheme]` (`light`, `dark`, `system`, high-contrast variants).
- **Portaled overlays:** domain chrome tokens (`--au-dialog-bg`, listbox colors, …) resolve on themed selectors so portaled nodes inherit the overlay’s `data-au-theme`.
- **Design hand-off:** [projects/design-tokens/README.md](../projects/design-tokens/README.md) — DTCG 2025.10 JSON (`*.tokens.json`), `export:tokens` / `validate:tokens`.

## Forms

- Prefer `[formField]` + `form()` for validation; use `au-form-field` for label, hint, and error chrome.
- Manual mode: `[(value)]` + `errorMessage` / `invalid` on `au-form-field` (see Storybook _With error_ stories).
- Patterns: [Signal forms guide](https://aurea-ds.netlify.app/en/guides/signal-forms).

## API shape

- **Native primitives** → attribute directives (`button[auButton]`, `input[auInputText]`).
- **Composite widgets** → `au-*` elements (`au-table`, `au-dialog`, `au-form-field`).
- Details: [API_CONVENTIONS.md](./API_CONVENTIONS.md) · floating UI: [FLOATING_UI.md](./FLOATING_UI.md).

## Storybook overview text

Autodocs pull long-form copy from `projects/docs/src/app/i18n/locales/{en,es}/overview.ts` via `getStoryOverview()`. Token categories for Storybook footers: see **Themes & tokens** on [aurea-ds.netlify.app](https://aurea-ds.netlify.app/en/themes). After editing overview i18n, run `bun run sync:story-overviews`.
