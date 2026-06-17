# Aurea design tokens

Entry point: `au-tokens.css` (npm package: `@aurea-design-system/components`).

## Layer model

| Layer            | File                          | Examples                                                                          |
| ---------------- | ----------------------------- | --------------------------------------------------------------------------------- |
| 1. Primitives    | `au-tokens-primitives.css`    | `--au-space-*`, `--au-radius-field`, `--au-shadow-control`, `--au-z-dropdown`     |
| 2. Semantic      | `au-tokens-semantic.css`      | `--au-color-surface-*`, `--au-color-text-*`, `--au-color-semantic-*`              |
| 3. Roles         | `au-tokens-roles.css`         | `--au-elevation-flat`, `--au-focus-inset`, `--au-focus-tactile`, `--au-focus-tab` |
| 4. Domain        | `au-tokens-domain.css`        | `--au-color-listbox-*`, `--au-drawer-*`, `--au-dialog-*`                          |
| 5. High contrast | `au-tokens-high-contrast.css` | `[data-au-theme='high-contrast']` palettes                                        |

Import order in `au-tokens.css`: primitives → semantic → roles → domain → high-contrast.

## Usage rules

1. **Components use role tokens** for elevation and focus — never raw `--au-shadow-*` primitives.
2. **Focus naming** — three roles only:
   - `--au-focus-inset` / `--au-focus-inset-error` — flat controls (inputs, cards)
   - `--au-focus-tactile` / `--au-focus-tactile-error` — buttons
   - `--au-focus-tab` / `--au-focus-tab-error` — keyboard Tab (`--from-tab`)
   - `--au-color-focus-ring` — focus _color_ only; `--au-focus-ring-width` — thickness
3. **Spacing** — prefer roles (`--au-gap-field`, `--au-pad-card`) over raw scale in UI code.
4. **Listbox colors** — use `--au-color-listbox-*`; `--au-color-select-*` are stable aliases.
5. **Temporal icons** — use `--au-color-temporal-icon*`; `--au-color-date-picker-icon*` are aliases.
6. **Portaled overlays** — chrome tokens (`--au-dialog-bg`, `--au-drawer-bg`, …) are defined on themed selectors so `var(--au-color-*)` resolves in the overlay's `data-au-theme` context, not on `<html>`.

## Themes & density

- Themes: `data-au-theme="light" | "dark" | "high-contrast" | "high-contrast-dark"`
- Density: `data-au-density="compact" | "comfortable" | "spacious"`

## Design tool sync

```bash
node scripts/export-design-tokens.mjs   # CSS → *.tokens.json (DTCG 2025.10)
node scripts/validate-design-tokens.mjs # schema + bidirectional hex check
```

Source of truth for production: **CSS**. JSON in `projects/design-tokens/` is for Figma/Penpot import (`*.tokens.json`).
