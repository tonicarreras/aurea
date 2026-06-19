# API conventions

How Aurea names and structures public APIs. Goal: predictable DX without duplicating the same widget under two selectors.

## Hybrid model

| Kind                 | Pattern                                 | When                                                                  | Examples                                                |
| -------------------- | --------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------- |
| **Native primitive** | Attribute directive on the host element | The control **is** a single HTML element (semantics, forms, keyboard) | `button[auButton]`, `input[auInputText]`, `[auTooltip]` |
| **Composite widget** | Custom element `au-*`                   | Shell with projection, internal state, or multiple roots              | `au-form-field`, `au-dialog`, `au-table`, `au-menu`     |

### Do

```html
<button
  auButton
  variant="primary"
>
  Save
</button>
<input
  auInputText
  [(value)]="name"
/>
<au-form-field label="Email">
  <input
    auInputText
    [formField]="form.email"
  />
</au-form-field>
<au-table [data]="rows">
  <au-table-column
    name="name"
    header="Name"
  />
</au-table>
```

### Don't

```html
<!-- No custom element for a lone button -->
<au-button>Save</au-button>

<!-- Don't mimic Material CDK table unless you need that granularity -->
<table auTable>
  ...
</table>

<!-- Don't duplicate the same widget with two public selectors -->
<au-table>
  +
  <table auTable>
    <!-- pick one -->
  </table></au-table
>
```

## Why not `<table mat-table>` everywhere?

Angular Material exposes a **low-level CDK table**: you own every `th`/`td` via directives. Aurea ships a **high-level data table** (`au-table` + `au-table-column`) for the common CRUD case — same idea as declaring columns, not the same DOM contract.

For custom layouts or virtual scroll, use headless helpers (`au-table-data`) or build on native `<table>` with tokens; do not fork the public `au-table` API.

## Headless logic

| Area                 | Module                                    | UI component                    |
| -------------------- | ----------------------------------------- | ------------------------------- |
| Table sort/selection | `au-table-data.ts`                        | `AuTable`                       |
| Floating position    | `TooltipOverlay`, `FloatingPickerOverlay` | Menu, popover, tooltip, pickers |
| Listbox portal       | `FieldListboxOverlay`                     | Select, autocomplete            |

Import headless helpers when composing new surfaces; keep components thin.

## Forms

- **Preferred:** `form()` + `[formField]` + `au-form-field` — see [Signal forms guide](https://aurea-ds.netlify.app/en/guides/signal-forms).
- **Manual:** `[(value)]` + `invalid` / `errorMessage` on `au-form-field` for demos or legacy paths.

## Floating UI

Menu, popover, tooltip, select listbox, and date/time pickers share overlay tokens and guards. See [FLOATING_UI.md](./FLOATING_UI.md).

## Contributors

New components: pick native vs composite **before** naming. Document in Storybook overview + `component-maturity.ts`. See [CONTRIBUTING.md](../CONTRIBUTING.md).

## Further reading

| Doc                                              | Topic                                                   |
| ------------------------------------------------ | ------------------------------------------------------- |
| [API_VOCABULARY.md](./API_VOCABULARY.md)         | Shared input names and primitive responsibilities       |
| [COMPOSITION.md](./COMPOSITION.md)               | Three-layer composition (primitives / tokens / app CSS) |
| [COMPONENT_CSS_VARS.md](./COMPONENT_CSS_VARS.md) | Public `--au-*` override contract                       |
| [STYLE_CAPABILITIES.md](./STYLE_CAPABILITIES.md) | Internal layout capability architecture                 |
