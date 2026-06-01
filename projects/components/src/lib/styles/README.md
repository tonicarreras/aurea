# Aurea global styles

## What consumers import

| File               | Required                                  | Role                                                         |
| ------------------ | ----------------------------------------- | ------------------------------------------------------------ |
| `au-tokens.css`    | Yes                                       | Design tokens (`--au-*`); imports `au-tokens-high-contrast.css` |
| `aurea-global.css` | Yes for form controls & description lists | Shared CSS + `au-high-contrast-aaa.css` (HC AAA overrides) |

## When CSS goes in `aurea-global.css`

Import a file from `styles/` into `aurea-global.css` **only** if at least one applies:

1. **Shared chrome** — one stylesheet targets several `au-*` hosts (e.g. `au-field-chrome.css` for `au-input-text`, `au-textarea`, `au-select`, …).
2. **Cross-host children** — layout/typography must reach elements rendered by another component or `display: contents` (e.g. `au-description-list.css` for `dt` / `dd` inside `au-description-item`).
3. **Projected consumer DOM** — markup or directives declared in the parent template (e.g. `au-accordion` → `.au-accordion__item` divs and `button[auAccordionItem]` triggers). Use a child component `styleUrl` when the node is an `au-*` host (e.g. `au-accordion-panel`).

Do **not** add a global file for a single control whose template and host are fully owned by one component.

## Default for every component

- Use **emulated** encapsulation and a **`styleUrl`** next to the component.
- Target the host with **`:host`** / **`:host([data-au-size])`**, not the element name (`au-textarea { }`) inside component CSS.
- Field **chrome** (border, label row, focus ring on `.au-*__control-row`) lives in `au-field-chrome.css`; the component CSS only styles the inner native control.
- Interactive surfaces share **`--au-chrome-*`** tokens (same as `au-button` secondary): `1px solid border-default` + `--au-shadow-button`; focus uses `--au-chrome-shadow-focus` (`--au-shadow-focus-control`).
- **`ViewEncapsulation.None`** only when documented and unavoidable (e.g. `au-table` token surface). Prefer splitting child components/directives instead.

## Portals and overlays

Portaled hosts (`au-snackbar`, `au-dialog`, …) still use their component **`styleUrl`**. Importing `aurea-global.css` does not replace component styles for portaled UI.

## Checklist before adding `@import` to `aurea-global.css`

- [ ] Styles touch more than one component host, or projected/third-party DOM the host cannot scope.
- [ ] Not duplicating rules already in a component `styleUrl`.
- [ ] README / Storybook still load `au-tokens.css` + `aurea-global.css`.
