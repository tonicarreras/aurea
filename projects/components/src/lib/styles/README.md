# Aurea global styles

## What consumers import

| File               | Required                                          | Role                                                                                                   |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `au-tokens.css`    | Yes                                               | Design tokens (`--au-*`); imports `au-tokens-high-contrast.css`                                        |
| `aurea-global.css` | Yes for form controls, layout & description lists | Shared CSS + primitive directives (bundled from `aurea-global.entry.css`) + `au-high-contrast-aaa.css` |
| `aurea-chrome.css` | Optional slimmer bundle                           | Field chrome only (inputs, select, listbox) — bundled from `aurea-chrome.entry.css`                    |

## Choosing `aurea-global.css` vs `aurea-chrome.css`

Both require `au-tokens.css` first. Never import both global bundles — they overlap on field chrome.

| You need…                                                                               | Import                                                                                                       |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Forms, inputs, selects, autocomplete                                                    | `au-tokens.css` + **`aurea-chrome.css`**                                                                     |
| Above + `[auStack]` / `[auCluster]` / `[auSplit]` / `[auSection]`                       | **`aurea-global.css`**                                                                                       |
| Above + `au-card`, `au-table`, `au-dialog`, `au-app-shell`, accordion, description list | **`aurea-global.css`**                                                                                       |
| White-label brand colors on SSR                                                         | Static `aurea-theme-bridge.css` after tokens, or `applyAureaThemeVars()` during SSR (see `provide-aurea.ts`) |

Field-only embeds (settings panel, auth form in a host app) → **`aurea-chrome.css`**.  
Full Aurea pages and layout recipes → **`aurea-global.css`**.

After editing `aurea-global.entry.css` or primitive `*.css` under `src/lib/`, run:

```bash
node projects/components/scripts/bundle-aurea-global.mjs
```

## Token layers (elevation & focus)

Components use **role tokens**, not raw `--au-shadow-*` primitives:

| Role            | Token                                         | Use for                              |
| --------------- | --------------------------------------------- | ------------------------------------ |
| Flat surface    | `--au-elevation-flat`                         | Inputs, cards, tables, chips, badges |
| Tactile control | `--au-elevation-tactile`                      | Buttons (secondary/outline)          |
| Raised toast    | `--au-elevation-raised`                       | Snackbar                             |
| Floating panel  | `--au-elevation-floating`                     | Menu, popover (`.au-floating-panel`) |
| Overlay         | `--au-elevation-overlay`                      | Dialog, drawer, tooltip, listbox     |
| Inset focus     | `--au-focus-inset` / `--au-focus-inset-error` | Pointer focus on flat controls       |
| Tactile focus   | `--au-focus-tactile`                          | Pointer focus on buttons             |
| Tab focus       | `--au-focus-tab` / `--au-focus-tab-error`     | Keyboard Tab (`--from-tab` pattern)  |

Shared borders: `--au-chrome-border`, `--au-chrome-border-color-hover`.

Token architecture: see `tokens/README.md` (primitives → semantic → roles → domain → high-contrast).

## Global bundle modules (`aurea-global.entry.css`)

| File                                     | Role                                                                                                                        |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `au-layout.css`                          | Layout directives (`[auStack]`, `[auCluster]`, `[auSplit]`, `[auSection]`) via `au-layout-primitives.css`                   |
| `au-utilities.css`                       | Shared utilities (`.au-sr-only`)                                                                                            |
| `au-floating-panel.css`                  | Tooltip + floating panel chrome                                                                                             |
| `au-native-text-field.css`               | Shared rules for `input.au-input-text` / `input.au-input-number`                                                            |
| `au-field-temporal-input.css`            | Date/time anchor, icon, picker chrome                                                                                       |
| `input-text.css` … `link.css`            | Native directive styles re-exported from `src/lib/*`                                                                        |
| `card.css` … `drawer.css`                | Shell components with projected/portaled DOM (`au-card`, `au-table`, `au-tabs`, `au-stepper`, `au-dialog`, `au-drawer`)    |
| `au-field-chrome.css`                    | Field shells for native hosts + select/autocomplete/tag-input                                                               |
| `au-floating-panel-responsive-modal.css` | Responsive sheet behavior for portaled pickers                                                                              |
| `au-field-error.css`                     | Shared error glyph layout                                                                                                   |
| `au-field-listbox.css`                   | Listbox overlay (select, autocomplete); `--au-field-listbox-gap` flush attach; `FieldListboxOverlay` portals to body/dialog |
| `au-description-list.css`                | Cross-host `dl` layout                                                                                                      |
| `au-accordion.css`                       | Projected accordion item/trigger shells                                                                                     |
| `au-high-contrast-aaa.css`               | HC theme overrides                                                                                                          |

## Z-index scale

| Token             | Value | Use                                        |
| ----------------- | ----- | ------------------------------------------ |
| `--au-z-raised`   | 1     | Sticky table headers, floating panel caret |
| `--au-z-dropdown` | 40    | Listboxes, tooltips, menus                 |
| `--au-z-drawer`   | 50    | Drawer shell                               |
| `--au-z-modal`    | 50    | Dialog, responsive picker sheet            |
| `--au-z-toast`    | 60    | Snackbar                                   |

Dropdowns intentionally sit **below** modals/drawers so overlays stack correctly when a select opens inside a dialog.

## When CSS goes in `aurea-global.css`

Import a file from `styles/` into `aurea-global.css` **only** if at least one applies:

1. **Shared chrome** — one stylesheet targets several `au-*` hosts (e.g. `au-field-chrome.css` for `input[auInputText]`, `textarea[auTextarea]`, `au-select`, …).
2. **Cross-host children** — layout/typography must reach elements rendered by another component or `display: contents` (e.g. `au-description-list.css` for `dt` / `dd` inside `au-description-item`).
3. **Projected consumer DOM** — markup or directives declared in the parent template (e.g. `au-accordion` → `.au-accordion__item` divs and `button[auAccordionItem]` triggers). Panel chrome lives on the internal `.au-accordion__panel` host in `accordion.css`.

Do **not** add a global file for a single control whose template and host are fully owned by one component.

## Default for every component

- Use **emulated** encapsulation and a **`styleUrl`** next to the component.
- Target the host with **`:host`** / **`:host([data-au-size])`**, not the element name (`au-textarea { }`) inside component CSS.
- Field **chrome** (border, label row, focus on `.au-*__control-row`) lives in `au-field-chrome.css`; the component CSS only styles the inner native control.
- Flat surfaces: `--au-chrome-border` + `--au-elevation-flat`; focus `--au-focus-inset` (pointer) or `--au-focus-tab` (Tab).
- Buttons: `--au-elevation-tactile`; focus `--au-focus-tactile` (pointer) or `--au-focus-tab` (Tab).
- Shell components with projected or portaled DOM (`au-card`, `au-table`, `au-tabs`, `au-stepper`, `au-dialog`, `au-drawer`) ship CSS via `aurea-global.entry.css` and use default emulated encapsulation (no component `styleUrl`).

## Portals and overlays

Portaled hosts (`au-snackbar`, `au-dialog`, …) still use their component **`styleUrl`**. Importing `aurea-global.css` does not replace component styles for portaled UI.

## Checklist before adding `@import` to `aurea-global.css`

- [ ] Styles touch more than one component host, or projected/third-party DOM the host cannot scope.
- [ ] Not duplicating rules already in a component `styleUrl`.
- [ ] README / Storybook still load `au-tokens.css` + `aurea-global.css`.
