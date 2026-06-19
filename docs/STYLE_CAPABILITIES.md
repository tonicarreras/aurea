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

## Resolution order

Inside each capability:

`explicit input → AU_STYLE_DEFAULTS → hard fallback (md gap / lg padding)`

## Namespaces

| Primitive | Namespace | Capability | CSS variable |
| --------- | --------- | ---------- | ------------- |
| `[auStack]` | `stack` | gap | `--au-stack-gap` |
| `[auCluster]` | `cluster` | gap | `--au-cluster-gap` |
| `[auSplit]` | `split` | gap | `--au-split-gap` |
| `[auSection]` | `section` | padding | `--au-section-padding` |

## Why not capabilities on every component?

Card, button, and chip use **domain tokens** and `data-au-*` selectors in bundled CSS — simpler for Encapsulation.None + global bundle. Capabilities are reserved for **layout** where the same gap scale must compose without new CSS files.

Future: optional `AuElevationCapability` for chip/badge if variant drift appears — follow the same namespace pattern.

## Tests

- `au-style-capabilities.spec.ts` — capability resolution
- `layout.spec.ts` — primitive + capability integration
- `*.tokens.spec.ts` — public `data-au-*` contract on button, card, input

## Related

- [API_VOCABULARY.md](./API_VOCABULARY.md)
- [COMPONENT_CSS_VARS.md](./COMPONENT_CSS_VARS.md)
