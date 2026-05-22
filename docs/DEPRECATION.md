# Deprecation policy

How we retire public APIs in `@aurea-design-system/components` without surprising consumers.

## Timeline

| Step        | When                                        | Action                                                                                |
| ----------- | ------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. Announce | First **minor** that introduces replacement | `@deprecated` JSDoc + [CHANGELOG.md](../CHANGELOG.md) + docs note                     |
| 2. Warn     | Next **minor** (≥ 2 minors before removal)  | Runtime `console.warn` in dev mode only (optional)                                    |
| 3. Remove   | **Major** only                              | Delete export, selector, or token; migration guide in [CHANGELOG.md](../CHANGELOG.md) |

Minimum notice: **two MINOR releases** (or ~2 months on `0.x`) between announcement and removal, whichever is longer.

## What can be deprecated

- Exported classes, directives, types
- Component inputs/outputs (prefer keeping alias inputs one major)
- Documented CSS custom properties in component Styling sections
- Schematic options

## What we avoid breaking without a major

- Undocumented CSS internals
- Story-only hosts
- Docs site-only content

## Migration notes

Each deprecation entry in [CHANGELOG.md](../CHANGELOG.md) must include:

1. **Removed in** — target major version
2. **Replacement** — API or pattern to use
3. **Before / after** — minimal code sample

## Experimental and beta components

Components marked **experimental** or **beta** in `component-maturity.ts` may change in a MINOR without full deprecation cycle. Promoting to **stable** freezes the API under this policy.
