# Aurea

A **semantic** UI system, targeting **WCAG 2.2 AA** on primary flows, aligned with **Angular 21** (signals, `model`, `FieldTree` / `formField`).

## Principles

1. **Clear task, quiet UI**: users complete a goal; the system provides hierarchy, contrast, and calm—not decoration that fights the text.
2. **Single source of truth (state)**: in forms, Angular’s reactive model is the truth; the UI does not duplicate validation logic already in `FieldTree`.
3. **Accessibility by default**: **visible, consistent** focus (ring tokens), regions and `aria-*` wired to controls, `prefers-reduced-motion` respected on interactive pieces.
4. **Design layers**:
   - *Primitives* (not used in product stylesheets) — base palette, reference or design files only.
   - *Semantic* — `au-tokens.css` (`--au-*`): surfaces, action, borders, form, states, z-index, motion.
   - *Component* — maps semantics to pieces (label, box, hint, error); add only what is necessary.
5. **Color coherence**: slate neutrals, one accent, error/success/warning **independent** of brand blue; dark mode = same semantic structure, not a hand-crafted alternate theme.
6. **Adaptive density**: control size `md` balances reading and density; `--au-touch-target-min` (44px) guides touch targets (`lg`, buttons, icons) without bloating desktop UI.

## Source of truth: tokens

- **Package path:** `projects/aurea/src/lib/theme/au-tokens.css`
- **App consumption:** import **once** at app level (e.g. `angular.json` → `styles` or entry stylesheet) so `var(--au-*)` resolves app-wide, **plus** library build if you ship embedded styles.
- **Published components** may still `@import` the same theme for a predictable bundle.

## Categories (reference)

| Category | Variables (examples) | Use |
|----------|----------------------|-----|
| Typography | `--au-font-sans`, `--au-text-sm`, `--au-leading-tight`, `--au-tracking-ui`, `--au-weight-medium` | Body, labels, reading density |
| Spacing | `--au-space-1` … `--au-space-12`, `--au-content-max` | Margins, grids, form columns |
| Shape | `--au-radius-field`, `--au-radius-sm` … `--au-radius-pill` | Fields, cards, pills (avoid pill fields for a tool-like feel) |
| Color — surfaces | `surface-canvas`, `surface-raised`, `surface-elevated`, `surface-sunken`, `surface-inverted` | Page, cards, inset, inverted contrast |
| Color — text | `text-primary` … `text-tertiary`, `text-label`, `text-disabled` | Headings, body, hint, disabled, form label |
| Color — borders | `border-subtle` … `border-strong` | Separation without noise |
| Interaction | `action-primary`, `link`, `action-*-hover|pressed` | CTAs, links, supporting actions |
| Focus | `--au-focus-ring-width`, `--au-shadow-focus-ring`, `--au-shadow-focus-ring-error` | Rings; **same width and offset** product-wide |
| Form | `form-border`, `form-error`, `form-error-bg`, `form-placeholder`, field sizes | Controls and messages tied to surfaces |
| States (semantic) | `semantic-error|success|warning|info` (+ *surface) | Banners, alerts, future badges |
| Elevation | `shadow-raised`, `shadow-overlay` | Light elevation, no forced neumorphism |
| Stacking | `--au-z-sticky` … `--au-z-toast` | No arbitrary `z-index` in feature modules |
| Motion | `duration-*`, `ease-*`, `transition-control`, `transition-glyph` | Color/border/shadow vs. color-only on glyphs |
| Theme | `data-au-theme="dark"` or `light` (default `:root`) + `color-scheme` in dark | App body or shell |

## Theme and selection

- Light theme: default on `:root`.
- Dark theme: set `data-au-theme="dark"` on an ancestor (e.g. `<html class="app">`). Redefined tokens adjust surfaces, borders, and rings; `color-scheme: dark` keeps native controls consistent.
- Text selection: `::selection` uses `--au-color-selection` (follows theme cascade).

## Forms (Angular 21 + signal forms)

- Classic: `[(value)]` with `errorMessage` / `hint`. Controls implement `FormValueControl<string>`: `value` is a `ModelSignal`; with `[formField]`, `errors`, `invalid`, etc. bind per contract. Prefer `model()` for value; avoid duplicating `value` + `valueChange` except for telemetry or tests.

## Text field anatomy

1. **Label** (optional for copy, not a11y if the name is provided elsewhere) — `for` / `id`; color `--au-color-text-label` vs body.
2. **Box** — one border, one background, focus via `--au-shadow-focus-ring`; invalid: error border/background or error ring per component rules.
3. **Hint** — tertiary, not error voice; `aria-describedby` when applicable.
4. **Error** — visible when there is a message; role and `aria-errormessage` on the control. Sufficient contrast (e.g. `--au-color-semantic-error-contrast` on paragraph errors).
5. **Required** — `required` on `input` when applicable; asterisk and screen-reader text per component.

**`au-textarea`**: same stack (label, box, hint, error with decorative `×` and `role="alert"`). Native multiline, so no redundant `aria-multiline`. Default `resize` is **vertical** (avoids horizontal growth breaking layouts); optional `rows` / `cols`, `wrap`, `spellcheck`. Tab vs pointer focus: shared `au-tab-focus-state` (same rules as `au-input-text`).

## Storybook

- Tokens load as `/au-tokens/au-tokens.css` (story project static dir).
- Preview shell applies `surface-canvas` background and DS font stack via `au-preview-shell.css` (linked in `preview-head` after `au-tokens.css`).
- **Docs pages:** long-form Markdown (tables, a11y, keyboard) lives in `*.docs-overview.ts` next to stories and is injected via `parameters.docs.description.component`; per-story notes use `parameters.docs.description.story`. Docs **TOC** is enabled globally in `.storybook/preview.ts`.
- **Interaction tests**: stories use `play` with `storybook/test` (`userEvent`, `expect`, `within`); the **Interactions** panel helps debug. For terminal/CI this repo uses **@storybook/test-runner** (works with Angular + Webpack; integrated Vitest addon does not apply here). Commands: `bun run test-storybook` (Storybook already running) and `bun run test-storybook:ci` (static build + runner). See `projects/aurea/.storybook/README.md`.

## Versioning and migrations

- New semantic names: minor if aliases; changing meaning or removing: **major** or migration guide.
- New components: consume the semantic layer and composite tokens (`--au-shadow-focus-ring`) before inventing component-only variables.
