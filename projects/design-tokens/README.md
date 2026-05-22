# Aurea design tokens (Figma / Penpot)

Machine-readable exports aligned with `projects/components/src/lib/tokens/au-tokens.css`.

## Files

| File                   | Use                                                     |
| ---------------------- | ------------------------------------------------------- |
| `au-tokens.light.json` | Light theme semantic colors, type, spacing (DTCG-style) |
| `au-tokens.dark.json`  | Dark theme color overrides                              |

**Source of truth for production apps:** `au-tokens.css` (npm package). Update JSON when you change documented semantic colors in CSS, then re-import in design tools.

## Figma (Variables)

1. Install a tokens plugin (e.g. **Tokens Studio**, **Variables Import Export**).
2. Import `au-tokens.light.json` as a collection named `Aurea / Light`.
3. Import `au-tokens.dark.json` into mode **Dark** on the same collection (map keys to match light structure).
4. Bind variables to components:
   - Surfaces → fills on frames
   - `color.text.*` → text styles
   - `color.action.primary` → primary buttons
   - `spacing.*` → auto-layout gap and padding
5. On hand-off to dev, reference CSS names: `--au-color-surface-raised`, etc. (see docs **Themes & tokens**).

## Penpot

1. **Libraries → Import** JSON (or paste via plugin if available).
2. Create color styles from `color.*` paths.
3. Create typography from `fontFamily.sans` + `fontSize.*`.

## Drift check

After editing `au-tokens.css`:

```bash
node scripts/validate-design-tokens.mjs
```

Fails if documented hex values in JSON no longer match the CSS light/dark blocks.

## Related

- [Theming guide](https://aurea-ds.netlify.app/en/themes)
- [PERFORMANCE.md](../components/PERFORMANCE.md)
