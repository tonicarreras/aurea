# Aurea global styles

## What consumers import

| File               | Required                                  | Role                                                            |
| ------------------ | ----------------------------------------- | --------------------------------------------------------------- |
| `au-tokens.css`    | Yes                                       | Design tokens (`--au-*`); imports `au-tokens-high-contrast.css` |
| `aurea-global.css` | Yes for form controls & description lists | Shared CSS + primitive directives (bundled from `aurea-global.entry.css`) + `au-high-contrast-aaa.css` |

After editing `aurea-global.entry.css` or primitive `*.css` under `src/lib/`, run:

```bash
node projects/components/scripts/bundle-aurea-global.mjs
```

## Token layers (elevation & focus)

Components use **role tokens**, not raw `--au-shadow-*` primitives:

| Role | Token | Use for |
| ---- | ----- | ------- |
| Flat surface | `--au-elevation-flat` | Inputs, cards, tables, chips, badges |
| Tactile control | `--au-elevation-tactile` | Buttons (secondary/outline) |
| Raised toast | `--au-elevation-raised` | Snackbar |
| Floating panel | `--au-elevation-floating` | Menu, popover (`.au-floating-panel`) |
| Overlay | `--au-elevation-overlay` | Dialog, drawer, tooltip, listbox |
| Inset focus | `--au-focus-inset` / `--au-focus-inset-error` | Pointer focus on flat controls |
| Tactile focus | `--au-focus-tactile` | Pointer focus on buttons |
| Tab focus | `--au-focus-tab` / `--au-focus-tab-error` | Keyboard Tab (`--from-tab` pattern) |

Shared borders: `--au-chrome-border`, `--au-chrome-border-color-hover`.

Legacy aliases `--au-field-shadow*` and `--au-chrome-shadow*` remain for external consumers; prefer role tokens in new code.

## When CSS goes in `aurea-global.css`

Import a file from `styles/` into `aurea-global.css` **only** if at least one applies:

1. **Shared chrome** — one stylesheet targets several `au-*` hosts (e.g. `au-field-chrome.css` for `input[auInputText]`, `textarea[auTextarea]`, `au-select`, …).
2. **Cross-host children** — layout/typography must reach elements rendered by another component or `display: contents` (e.g. `au-description-list.css` for `dt` / `dd` inside `au-description-item`).
3. **Projected consumer DOM** — markup or directives declared in the parent template (e.g. `au-accordion` → `.au-accordion__item` divs and `button[auAccordionItem]` triggers). Use a child component `styleUrl` when the node is an `au-*` host (e.g. `au-accordion-panel`).

Do **not** add a global file for a single control whose template and host are fully owned by one component.

## Default for every component

- Use **emulated** encapsulation and a **`styleUrl`** next to the component.
- Target the host with **`:host`** / **`:host([data-au-size])`**, not the element name (`au-textarea { }`) inside component CSS.
- Field **chrome** (border, label row, focus on `.au-*__control-row`) lives in `au-field-chrome.css`; the component CSS only styles the inner native control.
- Flat surfaces: `--au-chrome-border` + `--au-elevation-flat`; focus `--au-focus-inset` (pointer) or `--au-focus-tab` (Tab).
- Buttons: `--au-elevation-tactile`; focus `--au-focus-tactile` (pointer) or `--au-focus-tab` (Tab).
- **`ViewEncapsulation.None`** only when documented and unavoidable (e.g. `au-table` token surface). Prefer splitting child components/directives instead.

## Portals and overlays

Portaled hosts (`au-snackbar`, `au-dialog`, …) still use their component **`styleUrl`**. Importing `aurea-global.css` does not replace component styles for portaled UI.

## Checklist before adding `@import` to `aurea-global.css`

- [ ] Styles touch more than one component host, or projected/third-party DOM the host cannot scope.
- [ ] Not duplicating rules already in a component `styleUrl`.
- [ ] README / Storybook still load `au-tokens.css` + `aurea-global.css`.
