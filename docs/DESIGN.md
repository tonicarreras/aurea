# Design principles

Semantic UI for **WCAG 2.2 AA** on primary flows, **Angular 21** (signals, `formField`).

## Principles

1. **Visual hierarchy** — typography, spacing, and contrast use `--au-*` tokens only in product code.
2. **Single source of truth** — forms use Angular’s model; controls do not duplicate `FieldTree` validation.
3. **Accessibility by default** — visible focus rings, wired `aria-*`, `prefers-reduced-motion` on motion.
4. **Layers** — primitives (design files) → semantic tokens (`au-tokens.css`) → component chrome.
5. **Color coherence** — slate neutrals, one accent; dark mode reuses the same semantic names.
6. **Adaptive density** — `data-au-density` scales field heights via `--au-size-field-h-*`.

## Tokens

- **Source of truth:** `projects/components/src/lib/tokens/au-tokens.css`
- **App setup:** import `au-tokens.css` + `aurea-global.css` once at app level.
- **Theme:** `data-au-theme="light" | "dark"` or `[auTheme]` directive (`light`, `dark`, `system`, high-contrast experimental).
- **Design hand-off:** [projects/design-tokens/README.md](../projects/design-tokens/README.md)

## Forms

- Prefer `[formField]` + `form()` for validation; use `au-form-field` for label, hint, and error chrome.
- Manual mode: `[(value)]` + `errorMessage` / `invalid` on `au-form-field` (see Storybook _With error_ stories).

## Storybook overview text

Autodocs pull long-form copy from `projects/docs/src/app/i18n/locales/{en,es}/overview.ts` via `getStoryOverview()`. Token categories for Storybook footers: see **Themes & tokens** on [aurea-ds.netlify.app](https://aurea-ds.netlify.app/en/themes).
