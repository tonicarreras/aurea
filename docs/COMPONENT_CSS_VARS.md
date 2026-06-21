# Component CSS variable contract

Public override surface per component. Set on the host (or `:root` via `provideAurea()` for semantic keys).

Internal implementation may use additional variables; only listed keys are stability guarantees.

## Global semantic (via `provideAurea()`)

| Config key             | CSS variable                        |
| ---------------------- | ----------------------------------- |
| `actionPrimary`        | `--au-color-action-primary`         |
| `actionPrimaryHover`   | `--au-color-action-primary-hover`   |
| `actionPrimaryPressed` | `--au-color-action-primary-pressed` |
| `radiusSurface`        | `--au-radius-surface`               |
| `radiusField`          | `--au-radius-field`                 |
| `fontSans`             | `--au-font-sans`                    |
| `fontMono`             | `--au-font-mono`                    |

## Native button (`button[auButton]`)

Domain tokens in `au-tokens-domain.css`. Override on the button or a parent:

| Variable                      | Role                       |
| ----------------------------- | -------------------------- |
| `--au-button-radius`          | Corner radius              |
| `--au-button-gap`             | Icon + label gap           |
| `--au-button-height-sm/md/lg` | Heights per `data-au-size` |

## Card (`au-card`)

| Variable               | Role                                  |
| ---------------------- | ------------------------------------- |
| `--au-card-padding`    | Inner padding (also driven by `size`) |
| `--au-card-main-gap`   | Gap between header/body               |
| `--au-card-footer-gap` | Footer spacing                        |

CSS parts: `container`, `inner`, `main`, `footer`; project `part="card-title"` on headers for brand typography.

## Message (`au-message`)

CSS parts: `surface`, `title`, `text` — e.g. `au-message.forno-promo::part(title) { font-family: var(--font-display); }`.

## Empty state (`au-empty-state`)

CSS parts: `media`, `title`, `description`.

## Layout directives

| Host          | Variable               | Role                                  |
| ------------- | ---------------------- | ------------------------------------- |
| `[auStack]`   | `--au-stack-gap`       | Column gap (default from `gap` input) |
| `[auCluster]` | `--au-cluster-gap`     | Row gap                               |
| `[auSplit]`   | `--au-split-ratio`     | Grid template (set by `ratio` input)  |
| `[auSection]` | `--au-section-padding` | Block padding                         |

Example local override:

```html
<div
  auStack
  gap="md"
  style="--au-stack-gap: var(--au-space-8)"
>
  ...
</div>
```

## Overlays (see FLOATING_UI.md)

| Surface         | Key variables                                 |
| --------------- | --------------------------------------------- |
| Desktop popover | `--au-floating-panel-bg`, `--au-floating-gap` |
| Modal / sheet   | `--au-dialog-bg`                              |
| Listbox         | `--au-field-listbox-gap`                      |

## Rules

1. Prefer **role tokens** (`--au-elevation-tactile`) in component CSS — expose **component vars** only where white-label overrides are expected.
2. Do not document raw primitives (`--au-space-4`) as component API; reference spacing **inputs** (`gap="lg"`) or `--au-stack-gap`.
3. Changing undocumented `--au-*` vars is not a breaking change; changing documented keys requires `CHANGELOG` migration notes.
