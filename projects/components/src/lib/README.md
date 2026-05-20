# Aurea components (`src/lib`)

Internal conventions for contributors. Public API: `public-api.ts`.

## Exported types

Every type re-exported from the package uses the **`Au` prefix** (e.g. `AuButtonVariant`, `AuSelectOption`, `AuTooltipPlacement`). Option lists for fields alias `AuFieldOption`.

## Density (`AuSize`)

`sm | md | lg` — used by form fields, `au-button`, and `au-card`. Subsets elsewhere: `au-chip` and `au-steps` only expose `sm | md`; `au-dialog` adds `full`.

Import: `import type { AuSize } from './au-size'` (not re-declared per file).

## Field options (`AuFieldOption`)

`AuSelectOption`, `AuAutocompleteOption`, and `AuRadioOption` are aliases of `AuFieldOption` (`field-option.ts`).

## Signal forms

| Component | Control interface |
|-----------|-------------------|
| `au-input-text`, `au-textarea`, `au-input-number`, `au-input-date`, `au-select`, `au-autocomplete`, `au-radio-group`, `au-switch` | `FormValueControl` |
| `au-checkbox` | `FormCheckboxControl` |

Shared field chrome: `label`, `hint`, `errorMessage`, `errors`, `invalid`, `showRequired` (checkbox included), `displayError` / `effectiveInvalid`, `tabFocusState` focus rings.

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
