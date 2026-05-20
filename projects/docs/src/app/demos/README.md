# Docs demos

Live Angular components for the documentation app. Split by responsibility:

| Folder | Role |
|--------|------|
| `previews/` | One component per file — overview tab preview (`docs-preview-*`). |
| `examples/` | One file per DS component — examples tab live demos (`docs-example-*`). |
| `shared/` | Reusable layout styles and option fixtures. |

Example **metadata** (title, description, code snippet) lives in `i18n/locales/{es,en}/examples/` and only imports demo classes from here.

Adding a new documented component:

1. `previews/<slug>.preview.ts` — overview demo.
2. `examples/<slug>.examples.ts` — one exported class per example variant.
3. `i18n/locales/es/examples/<slug>.ts` and `en/examples/<slug>.ts` — wire demos to copy.
4. Register the preview in `core/component-docs.registry.ts` and export both slugs in the locale `examples/index.ts` files.
