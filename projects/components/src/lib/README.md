# Shared library internals (`src/lib`)

Component folders (`button/`, `input-text/`, `dialog/`, …) own their public API. **Directives, services, and helpers** live in their own files when it helps. **Stories** stay in one `*.stories.ts` (hosts inline); **tests** in one `*.spec.ts`. `form-field` also has `*.stories-chrome.ts` (Storybook chrome, not `*.stories.ts`) and `*.spec-hosts.ts` (shared hosts for sibling specs). Cross-cutting pieces:

| Folder           | Contents                                                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`tokens/`**    | `au-tokens.css`, `AuTheme` directive (`[auTheme]` → `data-au-theme`)                                                                      |
| **`styles/`**    | Shared CSS bundles (`aurea-global.css`) and partials (`au-field-chrome.css`, `au-field-error.css`, `au-field-listbox.css`, `au-snackbar.css`) |
| **`overlay/`**   | `tooltip-position.ts`, `tooltip-overlay.ts`, `field-listbox-overlay.ts`; tests in `overlay.spec.ts` only — not exported from `public-api` |
| **`storybook/`** | Storybook-only assets (`au-preview-shell.css`)                                                                                            |

Consumers import tokens via `@aurea-design-system/components/styles/au-tokens.css` and `AuTheme` from the package entry.

Signal forms (`form()`, `[formField]`) are documented in [`../README.md`](../README.md), not as separate Storybook pages.
