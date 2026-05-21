# Aurea components (`src/lib`)

Internal conventions for contributors. Public API: `public-api.ts`.

## Exported types

Every type re-exported from the package uses the **`Au` prefix** (e.g. `AuButtonVariant`, `AuIconName`, `AuMessageVariant`). Option lists for fields alias `AuFieldOption`.

## Density (`AuSize`)

| Scale | Components |
|-------|------------|
| `sm \| md \| lg` | Form fields, `au-button`, `au-card`, `au-icon` (sm/md/lg) |
| `sm \| md` | `au-chip`, `au-steps` |
| `sm \| md \| lg \| full` | `au-dialog` |

Import: `import type { AuSize } from './au-size'`. Component-specific size types (`AuChipSize`, …) document subsets explicitly.

## Collections (list / group)

| Container | Role | Use with |
|-----------|------|----------|
| `au-list` | `list` | Static or removable chips; any host with `auListItem` |
| `au-chip-group` | `group` | Selectable filter chips (`ariaLabel` / `ariaLabelledBy`) |

`au-chip` applies `auListItem` via `hostDirectives` (`listitem` inside `au-list`; suppressed when `selectable`). **`selectable` and `removable` are mutually exclusive.**

## Icons (`au-icon`)

Shared glyphs: `check-circle`, `warning`, `error`, `info`, `close`, `spinner`. Used by `au-message`, `au-dialog`, `au-button` (loading), `au-chip` (remove). Decorative (`aria-hidden`); controls keep their own accessible names.

## Form chrome (`au-form-field`)

Wrap value controls in `au-form-field` for label, hint, and error. The projected control reads ids and ARIA targets from `AU_FORM_FIELD` (you do not inject that token in app code).

```html
<au-form-field label="Email" hint="Work address" [controlIdInput]="emailId" required>
  <au-input-text formField [field]="email" type="email" />
</au-form-field>
```

| Control | `label` on form-field | `label` on control |
|---------|----------------------|-------------------|
| input-text, textarea, select, autocomplete, radio-group, input-number, input-date | Yes (legend for radio) | No |
| checkbox, switch | No (hint/error only) | Yes (inline) |

Optional stable id: `[controlIdInput]` on `au-form-field` (auto-generated when omitted).

## Signal forms

| Component | Control interface |
|-----------|-------------------|
| `au-input-text`, `au-textarea`, `au-input-number`, `au-input-date`, `au-select`, `au-autocomplete`, `au-radio-group`, `au-switch` | `FormValueControl` |
| `au-checkbox` | `FormCheckboxControl` |

Shared field chrome: `label`, `hint`, `errorMessage`, `errors`, `invalid`, `showRequired`, `displayError` / `effectiveInvalid`, `tabFocusState` focus rings.

## ARIA roles (host vs inner surface)

| Pattern | Where `role` / `aria-live` lives |
|---------|----------------------------------|
| `au-message`, `au-snackbar` | Inner **surface** (callout / toast content) |
| `au-list`, `au-chip-group` | **Host** container |
| `au-chip` + `auListItem` | **Host** (`listitem` when inside `au-list`) |
| `au-dialog` | Native `<dialog>` + titled heading |

## Directive input naming

| Kind | Convention | Example |
|------|------------|---------|
| Attribute directive | `au` + feature prefix on inputs | `auTooltip`, `auListItemDisabled` |
| Component | Plain names | `label`, `variant`, `dismissible` |

## Tabs vs steps

| | `au-tabs` | `au-steps` |
|---|-----------|------------|
| Use | App UI (one panel) | Docs / wizards |
| Layout | Tablist + tabpanels | `tabs` or `sections` (scroll in docs) |
| Encapsulation | `None` | `None` |

## `ViewEncapsulation.None`

`au-card`, `au-dialog`, `au-snackbar`, `au-tabs`, `au-steps` — global layout/portal styles. Consumers must import `au-tokens.css` (see package `exports`).

## Queries and effects

- Prefer `viewChild()` / `contentChild()` over `@ViewChild` / `@ContentChild`. `au-card` / `au-dialog` footer detection uses `@ContentChild` setters so projected footer queries stay fully covered in Vitest v8.
- Register `afterRenderEffect` as a class field (no empty `constructor()`).

## Skeleton (`au-skeleton`)

Decorative loading placeholders: variants `text`, `circular`, `rectangular`, `rounded`, `button`; animations `pulse`, `wave`, `none`. Host is `aria-hidden` — set `aria-busy` on the parent loading region.

## Storybook / test-runner

Components use **emulated** encapsulation (not Shadow DOM). Query the host, then `querySelector('button')` on the host — not `shadowRoot` (see `button.stories.ts` for the host button pattern).
