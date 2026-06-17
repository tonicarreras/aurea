# Aurea design tokens (Figma / Penpot)

Machine-readable exports aligned with [DTCG Format Module 2025.10](https://www.designtokens.org/) and `projects/components/src/lib/tokens/au-tokens.css`.

## Files

| File                              | Use                                                                |
| --------------------------------- | ------------------------------------------------------------------ |
| `au-tokens.light.tokens.json`     | Light theme — semantic/domain colors, typography, spacing, z-index |
| `au-tokens.dark.tokens.json`      | Dark theme color overrides (same structure as light)               |
| `dtcg-format-2025.10.schema.json` | Vendored official JSON Schema for CI validation                    |

**Source of truth for production apps:** `au-tokens.css` (npm package). After changing semantic/domain colors:

```bash
bun run export:tokens
bun run validate:tokens
```

`validate:tokens` checks:

1. **DTCG schema** — structure, types, color/dimension/number value formats
2. **CSS drift** — documented hex values in JSON match light/dark CSS blocks

## DTCG conventions in these files

- Colors: `{ colorSpace: "srgb", components: [r,g,b], hex: "#rrggbb" }`
- Dimensions: `{ value: number, unit: "px" | "rem" }`
- Variant tokens use a `default` leaf when a group has states (e.g. `color.action.primary.default`, `.hover`, `.pressed`)
- Extension: `.tokens.json` (recommended by DTCG)

## Figma (Variables)

1. Install a tokens plugin (e.g. **Tokens Studio**, **Variables Import Export**).
2. Import `au-tokens.light.tokens.json` as a collection named `Aurea / Light`.
3. Import `au-tokens.dark.tokens.json` into mode **Dark** on the same collection (map keys to match light structure).
4. Bind variables to components:
   - Surfaces → fills on frames
   - `color.text.*` → text styles
   - `color.action.primary.default` → primary buttons
   - `spacing.*` → auto-layout gap and padding
5. On hand-off to dev, reference CSS names: `--au-color-surface-raised`, etc. (see docs **Themes & tokens**).

## Penpot

1. **Libraries → Import** JSON (or paste via plugin if available).
2. Create color styles from `color.*` paths (use `hex` fallback or sRGB components).
3. Create typography from `fontFamily.sans` + `fontSize.*`.

## Related

- [Theming guide](https://aurea-ds.netlify.app/en/themes) · [Library README](../components/README.md#bundle--performance)
