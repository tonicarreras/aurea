# Internal style capabilities

How layout primitives share gap/padding without duplicating token logic. **Internal architecture** — consumers use `[auStack]`, `[auCluster]`, etc.; they do not import capability directives.

## Layers

```
token resolvers   tokens/resolvers/spacing.ts     auSpacingValue(), AuSpacing
       ↓
DI tokens         core/capabilities/au-style-tokens.ts   AU_STYLE_NAMESPACE, AU_STYLE_DEFAULTS
       ↓
capabilities      AuGapCapability, AuPaddingCapability   write inline gap/padding + data-* attrs
       ↓
primitives        layout/* directives                  hostDirectives + anatomy inputs
       ↓
CSS               styles/au-layout-primitives.css      :where([data-au-stack]) { … }
```

## Host contract (required for every capability)

A capability **must not** be used alone in application code. A layout primitive host provides:

| Requirement    | Token / API                                                  | Purpose                                                                      |
| -------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Namespace      | `AU_STYLE_NAMESPACE` → e.g. `'stack'`                        | Builds `--au-{namespace}-gap` / `--au-{namespace}-padding` for CSS overrides |
| Defaults       | `AU_STYLE_DEFAULTS` → e.g. `{ gap: 'md' }`                   | Primitive-specific default before capability hard fallback                   |
| Capability     | `hostDirectives: [AuGapCapability]` or `AuPaddingCapability` | Writes spacing on the host element                                           |
| Anatomy marker | `data-au-stack`, `data-au-cluster`, …                        | Activates layout rules in `au-layout-primitives.css`                         |
| Public input   | `gap` / `padding` on the primitive                           | Forwarded to the capability via `hostDirectives` `inputs`                    |

If **`AU_STYLE_NAMESPACE` is missing**, Angular throws at runtime — capabilities are not standalone public APIs.

## What each capability writes

### `AuGapCapability`

| Output                | Example                                                           |
| --------------------- | ----------------------------------------------------------------- |
| Host class            | `au-gap-capability`                                               |
| Resolved token        | `data-au-gap="md"`                                                |
| Inline gap            | `gap: var(--au-stack-gap, var(--au-space-3))` when input unset    |
| Inline gap (explicit) | `gap: var(--au-space-4)` when `gap="lg"` — bypasses namespace var |
| Default fallback var  | `--_au-gap-default` for internal use                              |

### `AuPaddingCapability`

Same pattern with `data-au-padding`, `padding`, and `--au-{namespace}-padding`.

## Resolution order

Inside each capability:

`explicit input → AU_STYLE_DEFAULTS → hard fallback (md gap / lg padding)`

## Namespaces (primitive ↔ CSS)

| Primitive     | Namespace | Capability | Default | Public CSS var (override) |
| ------------- | --------- | ---------- | ------- | ------------------------- |
| `[auStack]`   | `stack`   | gap        | `md`    | `--au-stack-gap`          |
| `[auCluster]` | `cluster` | gap        | `sm`    | `--au-cluster-gap`        |
| `[auSplit]`   | `split`   | gap        | `lg`    | `--au-split-gap`          |
| `[auSection]` | `section` | padding    | `lg`    | `--au-section-padding`    |

App CSS may override spacing with the **namespace var** on an ancestor, e.g.:

```css
.my-form {
  --au-stack-gap: var(--au-space-2);
}
```

## Orphan capability (unsupported)

Using `[auGapCapability]` without a layout primitive is **undefined behaviour** for consumers:

| Scenario                               | Gap/padding inline            | Layout anatomy (`display`, separators, grid) |
| -------------------------------------- | ----------------------------- | -------------------------------------------- |
| `auStack` + defaults                   | ✅                            | ✅ via `[data-au-stack]` + global CSS        |
| Capability + `AU_STYLE_NAMESPACE` only | ✅ inline + `data-au-gap`     | ❌ no flex/grid — **no `data-au-*` marker**  |
| Capability alone (no namespace)        | ❌ throws `NullInjectorError` | ❌                                           |

Contributors: never ship orphan capabilities in public templates. Apps: use `[auStack] gap="md"`, not `[auGapCapability]`.

## Why not capabilities on every component?

Card, button, and chip use **domain tokens** and `data-au-*` selectors in bundled CSS — simpler for Encapsulation.None + global bundle. Capabilities are reserved for **layout** where the same gap scale must compose without new CSS files.

**Contributor rule:** do not import `[auGapCapability]` / `[auPaddingCapability]` in app code or new composite components. If a component needs tokenized spacing, use public inputs + domain CSS vars, or propose a layout primitive.

**Adding a new layout primitive:**

1. Pick a unique `AU_STYLE_NAMESPACE` string.
2. Provide `AU_STYLE_DEFAULTS` on the primitive's element injector.
3. Compose the matching capability via `hostDirectives`.
4. Add `data-au-{primitive}` anatomy attrs consumed by `au-layout-primitives.css`.
5. Extend `LAYOUT_CAPABILITY_CONTRACT` in `au-style-capabilities-integration.spec.ts`.
6. Document the namespace row in this file and `--au-{namespace}-*` in `COMPONENT_CSS_VARS.md` if publicly overridable.

Future: optional `AuElevationCapability` for chip/badge if variant drift appears — follow the same namespace pattern.

## Tests

| File                                        | Scope                                                         |
| ------------------------------------------- | ------------------------------------------------------------- |
| `au-style-capabilities.spec.ts`             | Capability resolution in isolation                            |
| `au-style-capabilities-integration.spec.ts` | Primitive ↔ capability contract, orphans, namespace isolation |
| `layout.spec.ts`                            | Public anatomy attrs and behaviour                            |
| `*.tokens.spec.ts`                          | Public `data-au-*` contract on button, card, input            |

## Related

- [API_CONVENTIONS.md](./API_CONVENTIONS.md) — style capabilities section
- [API_VOCABULARY.md](./API_VOCABULARY.md)
- [COMPONENT_CSS_VARS.md](./COMPONENT_CSS_VARS.md)
