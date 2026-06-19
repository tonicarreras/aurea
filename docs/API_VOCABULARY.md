# API vocabulary audit

Shared naming rules for Aurea inputs and tokens. Same concept → same name, type, and meaning across primitives.

See also [API_CONVENTIONS.md](./API_CONVENTIONS.md) (native vs composite) and [COMPONENT_CSS_VARS.md](./COMPONENT_CSS_VARS.md) (override contract).

## Global rules

| Rule                   | Decision                                                                          |
| ---------------------- | --------------------------------------------------------------------------------- |
| Medium density         | Always `md`, never `default`                                                      |
| Size input             | Anatomical density (height, padding) — **not** typography                         |
| Variant input          | Visual style / emphasis (`primary`, `outline`, `elevated`) — **not** layout       |
| Typography             | Use document tokens (`--au-text-*`) or app CSS — **not** button/card inputs       |
| Gap / padding (layout) | Use `auStack`, `auCluster`, `auSplit`, `auSection` or spacing roles               |
| Divider vs separator   | `divider` = region edge (Section); `separator` = between siblings (Stack/Cluster) |

## Primitive responsibility matrix

| Primitive            | Owns                                         | Does not own                               |
| -------------------- | -------------------------------------------- | ------------------------------------------ |
| `button[auButton]`   | variant, size, loading, disabled, focus ring | label typography, page layout              |
| `input[auInputText]` | size, value, invalid, readonly               | label/error chrome (→ `au-form-field`)     |
| `au-form-field`      | label, hint, error, listbox anchor           | control value (→ inner input)              |
| `au-card`            | variant, size, interactive, regions          | page max-width, grid columns               |
| `au-chip`            | selectable/removable, tone via variant       | filter group semantics (→ `au-chip-group`) |
| `[auStack]`          | vertical gap, align, justify, separator      | horizontal layout                          |
| `[auCluster]`        | inline wrap gap, separator                   | grid columns                               |
| `[auSplit]`          | two-column ratio, responsive collapse        | more than two columns                      |
| `[auSection]`        | padding block, divider placement             | card shell (→ `au-card`)                   |
| `au-table`           | sort, selection, columns                     | cell editors (project in templates)        |

## Input vocabulary

| Input           | Type                            | Used on                          | Meaning                                      |
| --------------- | ------------------------------- | -------------------------------- | -------------------------------------------- |
| `variant`       | semantic enum                   | button, card, badge, message     | Visual emphasis / surface style              |
| `size`          | `sm \| md \| lg`                | button, inputs, card, form-field | Density / touch target                       |
| `gap`           | `AuSpacing`                     | layout directives                | Distance between flex/grid children          |
| `padding`       | `AuSpacing`                     | `[auSection]`                    | Inner block padding                          |
| `divider`       | `none \| top \| bottom \| both` | `[auSection]`                    | Border on section edge                       |
| `separator`     | `none \| solid`                 | `[auStack]`, `[auCluster]`       | Rule between adjacent children               |
| `interactive`   | boolean                         | card                             | Hover/focus elevation when tile is clickable |
| `selectionMode` | `none \| single \| multiple`    | table                            | Row selection model                          |

## No generic capabilities

Do **not** add a shared `AuSizeCapability` applied to every primitive. `size` on a button (height) ≠ `size` on a card (padding scale) ≠ `size` on a chip (pill density). Share **token resolvers** (`auSpacingValue`) and **internal gap/padding capabilities** for layout only.

## Breaking-change checklist

Before renaming a public input:

1. Update Storybook argTypes + docs overview (EN/ES).
2. Add migration note in `CHANGELOG.md`.
3. Run `verify:i18n` if docs strings reference the old name.
4. Prefer `@deprecated` alias for one minor release when feasible.
