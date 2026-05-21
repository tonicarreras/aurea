import type { ComponentDocOverview } from '../../../core/component-doc-overview';

export const OVERVIEWS_EN: Record<string, ComponentDocOverview> = {
  button: {
    intro: [
      'Action button with primary, secondary, outline, and ghost variants. Projected content is the visible label; use `label` when showing an icon only.',
      'Focus distinguishes keyboard (outer ring) and pointer (inner ring) via `tabFocusState`, aligned with other Aurea controls.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Primary or secondary actions in forms, dialogs, and toolbars.',
        'Loading states with `loading` without layout shift.',
        'Form submission with `type="submit"`.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: [
        'Navigation between views → links (`<a>`) or tabs.',
        'Toggle an on/off setting → `au-switch`.',
      ],
    },
    anatomy: [
      { region: 'Host `au-button`', detail: 'Attributes `data-au-variant` and `data-au-size`.' },
      { region: 'Native button', detail: 'Content projection; `aria-busy` when `loading`.' },
    ],
    accessibility: [
      'Visible focus ring when tabbing (`--au-color-focus-ring`).',
      '`loading` sets `aria-busy` and blocks click.',
      'Size `lg` respects `--au-touch-target-min` (44px).',
    ],
    keyboard: ['Enter and Space activate the native button.', 'Tab focuses the control; focus restored after closing dialogs.'],
  },
  'form-field': {
    intro: [
      'Shared label, hint, and error chrome around a projected control (`au-input-text`, `au-select`, `au-radio-group`, etc.).',
      'Exposes `AU_FORM_FIELD` via DI so the child gets the same `controlId`, `hintId`, and `errorId` for ARIA wiring.',
      'Checkbox and switch keep their inline `label` on the control; use `au-form-field` for hint and error only.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Any standard field where label/hint/error should match the design system.',
        'Signal forms: child `errors` / `invalid` flow into the wrapper error region.',
        'Stable ids with optional `[controlIdInput]`.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: [
        'Checkbox with only an inline label and no hint/error → bare `au-checkbox`.',
        'Non-form layout → do not wrap.',
      ],
    },
    anatomy: [
      { region: 'Label', detail: '`<label for>` tied to child `controlId`.' },
      { region: 'Projected control', detail: 'Single focusable control in the default slot.' },
      { region: 'Hint / error', detail: 'Hint `<p>`; error `role="alert"` with shared styles.' },
    ],
    accessibility: [
      'Child receives `aria-describedby` / `aria-errormessage` from context ids.',
      'Required asterisk is decorative with screen-reader text.',
    ],
    relatedExports: ['AU_FORM_FIELD', 'AuFormFieldContext'],
  },
  'input-text': {
    intro: [
      'Single-line control projected inside `au-form-field` for label, hint, and error.',
      'Implements `FormValueControl<string | null>`: bind `[formField]` in signal forms or `[(value)]` manually. An empty field is `null`, not an empty string.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Text, email, URL, tel, search, or password with the same chrome as other fields.',
        'Validation via signal forms or manual `errorMessage` / `invalid`.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Multi-line text → `au-textarea`.', 'Pick from a list → `au-select` or `au-autocomplete`.'],
    },
    anatomy: [
      { region: '`au-form-field`', detail: 'Label, hint, and error outside the control.' },
      { region: 'Shell', detail: 'Border, background, and focus/error rings on the input row.' },
      { region: 'Native input', detail: '`aria-invalid`, `aria-errormessage`, `aria-describedby` via context.' },
      { region: 'Password toggle', detail: 'Only with `type="password"` and `showPasswordToggle`.' },
    ],
    accessibility: [
      'Accessible name via visible label or external `aria-label`.',
      'Errors linked with `aria-errormessage`; hints with `aria-describedby`.',
      'Password toggle with `aria-pressed` and Show/Hide labels.',
    ],
    keyboard: [
      'Tab enters the field with outer ring (`--from-tab`); click uses inner ring.',
      'Space on the password toggle toggles visibility.',
    ],
  },
  textarea: {
    intro: [
      'Multi-line control projected inside `au-form-field`; same sm/md/lg sizes as other fields.',
      'Minimum height via `--au-textarea-min-h-*`; configurable `resize`.',
    ],
    whenToUse: {
      title: 'When to use',
      items: ['Comments, long descriptions, notes.', 'Content that does not fit on one line.'],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Single line → `au-input-text`.', 'Rich editor → third-party component.'],
    },
    anatomy: [
      { region: 'Shell', detail: 'Same as single-line fields.' },
      { region: '`<textarea>`', detail: 'Padding vertical `--au-textarea-pad-y`.' },
    ],
    accessibility: [
      'Same label, error, and hint semantics as input-text.',
      'Placeholder and hint contrast using tertiary text tokens.',
    ],
  },
  checkbox: {
    intro: [
      'Boolean checkbox with label and optional description. Supports `indeterminate` for partial selection.',
      'Implements `FormCheckboxControl` for signal forms with `[(checked)]` or `[formField]`.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Accept terms; multiple independent permissions.',
        '“Select all” pattern with indeterminate state on the parent.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Single on/off preference → `au-switch`.', 'Single choice in a list → `au-radio-group`.'],
    },
    anatomy: [
      { region: 'Native input', detail: 'Real checkbox; native indeterminate state.' },
      { region: 'Label / description', detail: 'Primary and secondary text.' },
    ],
    accessibility: [
      'Label/input association via `id`/`for`.',
      'Indeterminate via native property (no invented `aria-checked`).',
      'Focus ring differs for keyboard vs pointer.',
    ],
  },
  switch: {
    intro: [
      'On/off switch with `role="switch"` on a styled native checkbox.',
      'Shares field shell (border, error, hint) with other form controls.',
    ],
    whenToUse: {
      title: 'When to use',
      items: ['Immediate preferences (notifications, dark mode).', 'Enable/disable a system feature.'],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Mutually exclusive options → `au-radio-group`.', 'Legal acceptance → `au-checkbox`.'],
    },
    anatomy: [
      { region: 'Track and thumb', detail: 'Tokens `--au-color-switch-track-*` and thumb.' },
      { region: 'Label / hint', detail: 'Same structure as other fields.' },
    ],
    accessibility: [
      '`role="switch"` y estado `aria-checked`.',
      'Track/thumb contrast documented in tokens (WCAG UI components).',
    ],
  },
  select: {
    intro: [
      'Combobox-style dropdown: trigger button + portaled listbox with full keyboard (arrows, Home/End, Escape).',
      'Typed `AuSelectOption[]`; model value = option `value`, not the label.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Closed lists of 4–20 items where users know the options.',
        'Forms that must post a stable `name` value.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Search with filtering → `au-autocomplete`.', 'Only 2–3 visible options → `au-radio-group`.'],
    },
    anatomy: [
      { region: 'Trigger', detail: 'Shows the selected option label.' },
      { region: 'Listbox portal', detail: 'Highlight vs selected use distinct tokens.' },
    ],
    accessibility: [
      'ARIA combobox pattern (`aria-expanded`, `aria-controls`, `listbox`/`option`).',
      'Disabled options respect `disabled` on `AuSelectOption`.',
    ],
    keyboard: [
      'Space/Enter opens; arrows move highlight; Enter selects; Escape closes.',
    ],
    relatedExports: ['AuSelectOption'],
  },
  autocomplete: {
    intro: [
      'Search field filtering `AuAutocompleteOption[]` as you type (case-insensitive by default).',
      'Same surface and listbox as `au-select`; `strictSelection` prevents free text on blur.',
    ],
    whenToUse: {
      title: 'When to use',
      items: ['Large catalogs (cities, users, SKUs).', 'When the user knows part of the text to find.'],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Short fixed list → `au-select`.', 'Free text without a list → `au-input-text`.'],
    },
    anatomy: [
      { region: 'Search input', detail: 'Combobox with live query.' },
      { region: 'Suggestions panel', detail: '`noResultsText` when the filter matches nothing.' },
    ],
    accessibility: ['Combobox with listbox; open state on `data-au-listbox-open`.'],
    keyboard: ['Same as select; typing filters options.'],
    relatedExports: ['AuAutocompleteOption'],
  },
  'radio-group': {
    intro: [
      'Native radio buttons in a shell with legend. Single selection per `name`.',
      'Model value = active `AuRadioOption` `value`.',
    ],
    whenToUse: {
      title: 'When to use',
      items: ['2–5 mutually exclusive options visible without a dropdown.', 'Plans, payment methods, account type.'],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Many options → `au-select`.', 'Boolean → checkbox or switch.'],
    },
    anatomy: [
      { region: 'Legend', detail: 'Group label.' },
      { region: 'Options', detail: 'Each radio with its own label.' },
    ],
    accessibility: ['Associated legend; arrow keys move among radios with the same name.'],
    relatedExports: ['AuRadioOption'],
  },
  'input-number': {
    intro: [
      'Numeric input with `min`, `max`, and `step`; empty ↔ `null`.',
      'Styled increment/decrement buttons in the same field shell.',
    ],
    whenToUse: {
      title: 'When to use',
      items: ['Quantities, age, percentages with known bounds.'],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Currency mask → domain layer on input-text.', 'Continuous range → dedicated slider.'],
    },
    anatomy: [
      { region: 'Input `type="number"`', detail: 'Parses to a finite number or `null`.' },
      { region: 'Steppers', detail: 'Respect native min/max.' },
    ],
    accessibility: ['Label, error, and focus like other fields.'],
  },
  'input-date': {
    intro: [
      'Native date picker (`<input type="date">`) with Aurea tokens on icon and OS popup.',
      'Value as ISO `YYYY-MM-DD` or `null`.',
    ],
    whenToUse: {
      title: 'When to use',
      items: ['Calendar dates with the OS picker.', 'Range filters with `minDate` / `maxDate`.'],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Custom inline calendar → composite component or external library.'],
    },
    anatomy: [
      { region: 'Native input', detail: 'Tokens `--au-color-date-picker-*` for icon and accent.' },
    ],
    accessibility: ['Linked label and errors; native OS picker behavior.'],
  },
  dialog: {
    intro: [
      'Modal on native `<dialog>`: backdrop, focus trap, Escape and outside click to close (configurable).',
      'Projects free body and optional footer with `auDialogFooter`.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Destructive confirmations or flows that need an explicit decision.',
        'Short forms that do not need a new route.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Light confirmation → `au-snackbar` with action.', 'Persistent side panel → your own layout.'],
    },
    anatomy: [
      { region: 'Backdrop', detail: 'Mixes `--au-color-surface-inverted`.' },
      { region: 'Panel', detail: 'Header, body, footer (`auDialogFooter`).' },
    ],
    accessibility: [
      '`aria-labelledby` with `title` or `aria-label`.',
      'Initial focus inside the panel; restore to trigger on close.',
      'Tab cycles within the dialog.',
    ],
    keyboard: ['Escape closes when `closeOnEscape`.', 'Tab / Shift+Tab trapped in the panel.'],
    relatedExports: ['AuDialogFooter'],
  },
  card: {
    intro: [
      'Grouped surface with elevated, outlined, and filled variants. Regions: media, header, body, footer.',
      'Host is `<article>`: include a heading in `auCardHeader` for document outline.',
    ],
    whenToUse: {
      title: 'When to use',
      items: ['Entity summaries, dashboard tiles, settings blocks.'],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Only separate content → `au-divider` or spacing.', 'Blocking overlay → `au-dialog`.'],
    },
    anatomy: [
      { region: 'auCardMedia', detail: 'Bleed, outside inner padding.' },
      { region: 'auCardHeader / auCardBody', detail: 'Title and content with `--au-card-main-gap`.' },
      { region: 'auCardFooter', detail: 'Actions aligned below top border.' },
    ],
    accessibility: [
      'Use a heading in the header for hierarchy.',
      'Footer actions with real buttons (`au-button`).',
    ],
    relatedExports: ['AuCardFooter'],
  },
  tabs: {
    intro: [
      'WAI-ARIA tabs: `tablist`, `tab`, and `tabpanel`. Only the active tab is tabbable (`tabindex="0"`).',
      'Variants `line` (underline) and `contained` (segmented).',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Switch related panels on the same page (account, settings).',
        'When the user should not navigate away.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['App-wide navigation → router and menu.', 'Sequential steps with validation → `au-steps`.'],
    },
    anatomy: [
      { region: 'button[auTab]', detail: 'Triggeres en el tablist.' },
      { region: '[auTabPanel]', detail: 'Content; `hidden` when inactive.' },
    ],
    accessibility: [
      '`aria-selected`, `aria-controls`, paired tab/panel ids.',
      'Orientation exposed on the tablist.',
    ],
    keyboard: [
      'Arrows change active tab (horizontal or vertical per `orientation`).',
      'Home/End to first/last tab.',
    ],
    relatedExports: ['AuTab', 'AuTabPanel'],
  },
  chip: {
    intro: [
      'Compact label in three modes: static, selectable (`selectable` + `aria-pressed`), or removable (`removed`).',
      'Filled, outline, and accent variants (active-filter style).',
    ],
    whenToUse: {
      title: 'When to use',
      items: ['Tags, active filters, item metadata.', 'Multi-select categories in a toolbar.'],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: [
        'Primary action → `au-button`.',
        'Primary navigation → tabs or links.',
        'Selectable filters in a row → `au-chip-group`.',
        'Removable tag list → `au-list`.',
      ],
    },
    anatomy: [
      { region: 'Surface', detail: 'Projection or `label` input.' },
      { region: 'Remove button', detail: 'Only when `removable`; optional `removeLabel`.' },
    ],
    accessibility: [
      'Removable chip: button with accessible name.',
      'Selectable: `aria-pressed` synced with `selected`.',
    ],
  },
  snackbar: {
    intro: [
      'Brief non-modal message with auto-dismiss (`durationMs`), optional action, and screen position.',
      'Teleported to `body` so it is not clipped by `overflow`.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Confirm save, recoverable error, notice without blocking the UI.',
        'Feedback after an action where a dialog would be heavy.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Required decision → `au-dialog`.', 'Field form error → field `errorMessage`.'],
    },
    anatomy: [
      { region: 'Message', detail: 'Input `message` or projected content.' },
      { region: 'Action / close', detail: 'Optional buttons.' },
    ],
    accessibility: [
      '`role="status"` or `role="alert"` by variant (warning/error = alert).',
      'Matching `aria-live`; close button with `closeAriaLabel`.',
    ],
  },
  'chip-group': {
    intro: [
      'Accessible wrapper (`role="group"`) for a row of selectable filter chips.',
      'Pair with `au-chip` `[selectable]`; do not use for removable tag lists.',
    ],
    whenToUse: {
      title: 'When to use',
      items: ['Toolbar filters (status, category).', 'Multi-toggle filters where each chip is independent.'],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Removable tags → `au-list` + `removable` chips.', 'Single chip → bare `au-chip`.'],
    },
    anatomy: [{ region: 'Group', detail: '`aria-label` or `aria-labelledby` required.' }],
    accessibility: ['Named group; chips expose `aria-pressed` when selectable.'],
  },
  list: {
    intro: [
      'Accessible list (`role="list"`) for removable chips or custom rows with `auListItem`.',
      'Chips inside automatically become `listitem` unless `selectable`.',
    ],
    whenToUse: {
      title: 'When to use',
      items: ['Selected tags the user can remove.', 'Horizontal rows of peer items with list semantics.'],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Filter toggles → `au-chip-group`.', 'Navigation → tabs or links.'],
    },
    anatomy: [
      { region: 'List host', detail: '`au-list` with flex row layout.' },
      { region: 'Items', detail: '`au-chip` removable or `<div auListItem>`.' },
    ],
    accessibility: ['Provide `ariaLabel` or `ariaLabelledBy`.'],
    relatedExports: ['AuListItem'],
  },
  message: {
    intro: [
      'Inline callout for page-level status, validation summaries, or contextual help.',
      'Semantic variants map to token surfaces; optional `au-icon` glyph per variant.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Form-level errors above fields.',
        'Success after save, policy notices, non-blocking warnings.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Transient toast → `au-snackbar`.', 'Field error → `au-form-field` `errorMessage`.'],
    },
    anatomy: [
      { region: 'Icon', detail: 'Variant glyph when `showIcon` (not on default).' },
      { region: 'Title / body', detail: '`title` + `message` or projected slot.' },
      { region: 'Dismiss', detail: 'Optional close button.' },
    ],
    accessibility: [
      'Error and warning: `role="alert"`.',
      'Default, success, info: `role="status"`.',
    ],
  },
  icon: {
    intro: [
      'Shared SVG glyphs (check, warning, error, info, close, spinner) at sm/md/lg.',
      'Decorative by default — the parent control carries the accessible name.',
    ],
    whenToUse: {
      title: 'When to use',
      items: ['Inside `au-message`, removable chips, loading buttons.', 'Consistent stroke icons across the DS.'],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Custom brand icons → your own SVG.', 'Icon-only button → set `label` on `au-button`.'],
    },
    anatomy: [{ region: 'SVG', detail: '`data-au-icon` + `data-au-size` on host.' }],
    accessibility: ['Host is `aria-hidden="true"`.'],
    relatedExports: ['AuIconName', 'AuIconSize'],
  },
  skeleton: {
    intro: [
      'Loading placeholders: text lines, circles (avatars), blocks, and button bars.',
      'Pulse or wave animation; parent should set `aria-busy` while loading.',
    ],
    whenToUse: {
      title: 'When to use',
      items: ['Card/list loading states.', 'Profile header placeholder.'],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Spinner on a button → `au-icon` spinner.', 'Empty state → visible copy, not skeleton.'],
    },
    anatomy: [{ region: 'Host', detail: '`role="presentation"`; size from variant + `size`.' }],
    accessibility: ['Decorative only; pair with `aria-busy` on the loading region.'],
  },
  steps: {
    intro: [
      'Horizontal step navigation for docs and wizards: `button[auStep]` + `[auStepPanel]`.',
      '`layout="tabs"` shows one panel; `layout="sections"` scrolls to visible sections.',
    ],
    whenToUse: {
      title: 'When to use',
      items: ['Documentation sites (Overview / API / Examples).', 'Multi-section pages with stable keys.'],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['App primary nav → `au-tabs`.', 'Strict wizard with completion → dedicated stepper.'],
    },
    anatomy: [
      { region: 'Step list', detail: 'Horizontal buttons with active indicator.' },
      { region: 'Panels', detail: 'Tab panels or always-visible regions.' },
    ],
    accessibility: [
      'Tabs layout: tablist + tab + tabpanel.',
      'Sections layout: `aria-current` on active step.',
    ],
    keyboard: ['Arrow keys, Home, and End move between enabled steps.'],
    relatedExports: ['AuStep', 'AuStepPanel', 'AuStepsLayout'],
  },
  divider: {
    intro: [
      'Semantic `role="separator"` horizontal or vertical, with inset and optional centered label.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Separate content sections or list items.',
        'Vertical separator between flex groups.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Spacing only → spacing utilities.', 'Card border → `au-card` variant.'],
    },
    anatomy: [
      { region: 'Rule', detail: 'Line `--au-color-border-subtle`.' },
      { region: 'Label', detail: 'Horizontal only; text between two line halves.' },
    ],
    accessibility: ['`aria-orientation` from `orientation`.'],
  },
  tooltip: {
    intro: [
      'Contextual help in a portal on hover or focus of the trigger. Configurable delays to avoid flicker.',
      'Does not replace a visible label: the trigger needs its own accessible name.',
    ],
    whenToUse: {
      title: 'When to use',
      items: ['Action icons without visible text.', 'Clarify an already labeled control.'],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: [
        'Essential information → visible text or field `hint`.',
        'Long or interactive content → popover or dialog.',
      ],
    },
    anatomy: [
      { region: 'Trigger', detail: 'Element with `auTooltip` (e.g. `au-button`).' },
      { region: 'Tooltip bubble', detail: 'Class `.au-tooltip` on `document.body`.' },
    ],
    accessibility: [
      '`role="tooltip"` and `aria-describedby` on the host while open.',
      'No contiene foco interactivo.',
    ],
  },
};
