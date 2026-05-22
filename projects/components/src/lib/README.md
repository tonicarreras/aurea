# Shared library internals (`src/lib`)

Component folders (`button/`, `input-text/`, …) own their public API. **`form-field/`** keeps runtime code in `form-field.ts`, stories in `form-field.stories.ts`, shared Storybook chrome in `form-field.stories-chrome.ts` (re-exported from `index.ts`; not `*.stories.ts` so Storybook does not index render helpers as stories), unit tests in `form-field.spec.ts`, and shared test hosts in `form-field.spec-hosts.ts`. Cross-cutting pieces live alongside them:

| Folder | Contents |
|--------|----------|
| **`tokens/`** | `au-tokens.css`, `AuTheme` directive (`[auTheme]` → `data-au-theme`) |
| **`styles/`** | Shared CSS: `au-field-error.css`, `au-field-listbox.css` (published under `styles/`) |
| **`overlay/`** | Portal/position helpers for tooltip and select/autocomplete listbox (not exported from `public-api`) |
| **`storybook/`** | Storybook-only assets (`au-preview-shell.css`) |

Consumers import tokens via `@aurea-design-system/components/styles/au-tokens.css` and `AuTheme` from the package entry.

Signal forms (`form()`, `[formField]`) are documented in [`../README.md`](../README.md), not as separate Storybook pages.
