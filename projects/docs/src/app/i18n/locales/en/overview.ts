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
      '`loading` sets `aria-busy`, shows a decorative `au-spinner`, and blocks click.',
      'Size `lg` respects `--au-touch-target-min` (44px).',
    ],
    keyboard: [
      'Enter and Space activate the native button.',
      'Tab focuses the control; focus restored after closing dialogs.',
    ],
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
      'Full `form()` example: `@aurea-design-system/components` package README → *Signal forms* (not a separate Storybook page).',
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
      items: [
        'Multi-line text → `au-textarea`.',
        'Pick from a list → `au-select` or `au-autocomplete`.',
      ],
    },
    anatomy: [
      { region: '`au-form-field`', detail: 'Label, hint, and error outside the control.' },
      { region: 'Shell', detail: 'Border, background, and focus/error rings on the input row.' },
      {
        region: 'Native input',
        detail: '`aria-invalid`, `aria-errormessage`, `aria-describedby` via context.',
      },
      {
        region: 'Password toggle',
        detail: 'Only with `type="password"` and `showPasswordToggle`.',
      },
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
      items: [
        'Single on/off preference → `au-switch`.',
        'Single choice in a list → `au-radio-group`.',
      ],
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
      items: [
        'Immediate preferences (notifications, dark mode).',
        'Enable/disable a system feature.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: [
        'Mutually exclusive options → `au-radio-group`.',
        'Legal acceptance → `au-checkbox`.',
      ],
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
      items: [
        'Search with filtering → `au-autocomplete`.',
        'Only 2–3 visible options → `au-radio-group`.',
      ],
    },
    anatomy: [
      { region: 'Trigger', detail: 'Shows the selected option label.' },
      { region: 'Listbox portal', detail: 'Highlight vs selected use distinct tokens.' },
    ],
    accessibility: [
      'ARIA combobox pattern (`aria-expanded`, `aria-controls`, `listbox`/`option`).',
      'Disabled options respect `disabled` on `AuSelectOption`.',
    ],
    keyboard: ['Space/Enter opens; arrows move highlight; Enter selects; Escape closes.'],
    relatedExports: ['AuSelectOption'],
  },
  autocomplete: {
    intro: [
      'Search field filtering `AuAutocompleteOption[]` as you type (case-insensitive by default).',
      'Same surface and listbox as `au-select`; `strictSelection` prevents free text on blur.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Large catalogs (cities, users, SKUs).',
        'When the user knows part of the text to find.',
      ],
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
      items: [
        '2–5 mutually exclusive options visible without a dropdown.',
        'Plans, payment methods, account type.',
      ],
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
      items: [
        'Currency mask → domain layer on input-text.',
        'Continuous range → dedicated slider.',
      ],
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
      items: [
        'Light confirmation → `au-snackbar` with action.',
        'Persistent side panel → your own layout.',
      ],
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
      items: [
        'Only separate content → `au-divider` or spacing.',
        'Blocking overlay → `au-dialog`.',
      ],
    },
    anatomy: [
      { region: 'auCardMedia', detail: 'Bleed, outside inner padding.' },
      {
        region: 'auCardHeader / auCardBody',
        detail: 'Title and content with `--au-card-main-gap`.',
      },
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
      items: [
        'App-wide navigation → router and menu.',
        'Sequential steps with validation → `au-steps`.',
      ],
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
      items: [
        'Toolbar filters (status, category).',
        'Multi-toggle filters where each chip is independent.',
      ],
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
      items: [
        'Selected tags the user can remove.',
        'Horizontal rows of peer items with list semantics.',
      ],
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
      items: [
        'Inside `au-message`, removable chips, loading buttons.',
        'Consistent stroke icons across the DS.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: [
        'Custom brand icons → your own SVG.',
        'Icon-only button → set `label` on `au-button`.',
        'Standalone loading → `au-spinner`.',
      ],
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
      items: [
        'Spinner on a button → `au-button` `loading`.',
        'Inline loading indicator → `au-spinner`.',
        'Empty state → visible copy, not skeleton.',
      ],
    },
    anatomy: [{ region: 'Host', detail: '`role="presentation"`; size from variant + `size`.' }],
    accessibility: ['Decorative only; pair with `aria-busy` on the loading region.'],
  },
  spinner: {
    intro: [
      'Inline loading indicator with `role="status"` and `aria-busy="true"`.',
      'Dual-ring SVG: muted track and rotating arc (~0.9s). Glyph uses `currentColor`.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Table or panel loading rows while data fetches.',
        'Visible status copy via `label` when the wait needs context.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: [
        'Button in-flight state → `au-button` `loading`.',
        'Known completion ratio → `au-progress`.',
        'Content placeholders → `au-skeleton`.',
      ],
    },
    anatomy: [
      {
        region: 'Host `au-spinner`',
        detail: '`role="status"`; `data-au-size` sets sm/md/lg footprint.',
      },
      {
        region: 'Rings',
        detail: 'Decorative SVG track and animated arc (`aria-hidden`).',
      },
      { region: 'Label', detail: 'Optional visible copy when `label` is set (`aria-labelledby`).' },
    ],
    accessibility: [
      'Omit `label` for glyph-only waits (`aria-label="Loading"`).',
      'Set `label` to show visible copy and name the live region.',
      'Use `decorative` inside buttons or other controls that already expose busy state.',
    ],
  },
  steps: {
    intro: [
      'Horizontal step navigation for docs and wizards: `button[auStep]` + `[auStepPanel]`.',
      '`layout="tabs"` shows one panel; `layout="sections"` scrolls to visible sections.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Documentation sites (Overview / API / Examples).',
        'Multi-section pages with stable keys.',
      ],
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
  badge: {
    intro: [
      'Compact status or count label. Variants map to semantic surface tokens; dot mode for indicators without readable text.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Unread counts, status pills, or category labels inline with headings or list rows.',
        'Dot indicator when meaning is clear from surrounding text (e.g. online status).',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: [
        'Removable or selectable filters → `au-chip` / `au-chip-group`.',
        'Full sentences or dismissible alerts → `au-message`.',
      ],
    },
    anatomy: [
      { region: 'Host `au-badge`', detail: '`data-au-variant`; optional `data-au-dot`.' },
      { region: 'Label', detail: 'Text via `label`; omitted visually in dot-only mode.' },
    ],
    accessibility: [
      'Pair dot-only badges with visible text or an accessible name on a parent.',
      'Counts that change live should use `aria-live` on a parent region if announced.',
    ],
  },
  breadcrumb: {
    intro: [
      'Hierarchical navigation trail with `role="navigation"` and `aria-label="Breadcrumb"`.',
      'Items may link (`href`) or represent the current page as plain text.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Deep page hierarchies where users need context and upward navigation.',
        'Settings or docs sections with more than two levels.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: [
        'Flat apps with one level → skip breadcrumbs.',
        'Primary app navigation → router tabs or side nav.',
      ],
    },
    anatomy: [
      { region: 'List', detail: 'Ordered trail with separators between items.' },
      { region: 'Link item', detail: 'Uses link tokens; focus ring on keyboard.' },
      { region: 'Current item', detail: 'Last segment without `href`; emphasized text.' },
    ],
    accessibility: [
      'Landmark `navigation` with default `aria-label`.',
      'Current page is text, not a link — avoids redundant self-link.',
    ],
    keyboard: ['Tab moves through linked segments; current page is not in tab order.'],
  },
  link: {
    intro: [
      'Inline link styled with Aurea link tokens on native `<a auLink>` or `<au-link>`.',
      'Supports default and subtle variants; `external` adds `target="_blank"` and `rel="noopener noreferrer"`.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Inline navigation within copy, tables, or messages.',
        'External references with safe `rel` when `external` is true.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: [
        'Primary actions → `au-button`.',
        'Breadcrumb trail → `au-breadcrumb` items with `href`.',
      ],
    },
    anatomy: [
      { region: 'Anchor', detail: 'Host `au-link` with `data-au-variant`.' },
      { region: 'Projected content', detail: 'Link text in the default slot.' },
    ],
    accessibility: [
      'Visible focus ring (`--au-shadow-focus-ring`) on keyboard focus.',
      'External links open in a new browsing context with `noopener`.',
    ],
    keyboard: ['Enter activates the native link; Tab follows document order.'],
  },
  menu: {
    intro: [
      'Dropdown menu with a portaled panel anchored to `auMenuTrigger`.',
      'Use `[(open)]` for controlled state; items are `au-menu-item` actions that close on select.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Row or toolbar actions that do not need a full dialog.',
        'Command lists opened from a single trigger button.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: [
        'Non-modal filters or compact forms → `au-popover`.',
        'Blocking confirmation → `au-dialog`.',
      ],
    },
    anatomy: [
      { region: 'Trigger', detail: '`auMenuTrigger`; `aria-haspopup="menu"` and `aria-expanded`.' },
      { region: 'Panel', detail: 'Portaled `.au-floating-panel`; positioned via overlay helper.' },
      { region: 'Items', detail: '`au-menu-item` buttons; `select` output closes the menu.' },
    ],
    accessibility: [
      'Trigger exposes expanded state while open.',
      'Dismiss with Escape or outside click; focus returns to trigger pattern documented in overlay.',
    ],
    keyboard: [
      'Trigger: Enter/Space toggles; Escape closes.',
      'Items: activate with click; extend with roving tabindex if you add composite patterns.',
    ],
    relatedExports: ['AuMenu', 'AuMenuItem', 'AuMenuTrigger', 'AU_MENU'],
  },
  popover: {
    intro: [
      'Lightweight anchored panel for filters, help, or compact forms. Same overlay model as `au-menu`.',
      'Trigger uses `auPopoverTrigger` with `aria-haspopup="dialog"`.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Inline filters or settings that should stay near the trigger.',
        'Short supplementary content that is not a full modal.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: [
        'Simple hover hints → `auTooltip`.',
        'Destructive or blocking flows → `au-dialog`.',
        'Action lists → `au-menu`.',
      ],
    },
    anatomy: [
      { region: 'Trigger', detail: '`auPopoverTrigger` toggles `[(open)]`.' },
      { region: 'Panel', detail: 'Projected content in portaled `.au-floating-panel`.' },
    ],
    accessibility: [
      'Trigger `aria-expanded` reflects open state.',
      'Keep focus management explicit when panel contains form controls.',
      'Escape and outside click dismiss.',
    ],
    keyboard: ['Trigger toggles with Enter/Space; Escape closes the panel.'],
    relatedExports: ['AuPopover', 'AuPopoverTrigger', 'AU_POPOVER'],
  },
  pagination: {
    intro: [
      'Page navigation for tables and lists. Pages are **1-based**; emits `pageChange` when the user picks a page.',
      'Collapses long ranges with ellipses when `pageCount` > 7.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Server- or client-paginated tables and card grids.',
        'When users need direct jumps to numbered pages.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: ['Infinite scroll feeds → load-more pattern.', 'Very small lists → show all rows.'],
    },
    anatomy: [
      { region: 'Nav', detail: '`role="navigation"` with `aria-label="Pagination"`.' },
      { region: 'Prev / next', detail: '`au-button` ghost controls.' },
      { region: 'Page buttons', detail: 'Numbered pages; current page styled as active.' },
    ],
    accessibility: [
      'Navigation landmark with default accessible name.',
      'Current page should be distinguishable visually; wire `aria-current="page"` in app if you replace buttons.',
    ],
    keyboard: ['Tab through prev, page numbers, and next; Space/Enter activate buttons.'],
  },
  progress: {
    intro: [
      'Determinate or indeterminate progress bar with `role="progressbar"`.',
      'Determinate mode sets `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`; optional `label` overrides `aria-valuetext`.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'File uploads, multi-step tasks, or known completion percentage.',
        'Indeterminate waits when duration is unknown.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: [
        'Loading placeholders for content → `au-skeleton`.',
        'Button in-flight state → `au-button` `loading`.',
      ],
    },
    anatomy: [
      { region: 'Track', detail: 'Sunken surface with pill radius.' },
      { region: 'Bar', detail: 'Width from `value`/`max` or indeterminate animation.' },
    ],
    accessibility: [
      '`aria-valuetext` from `label` or rounded percent.',
      'Indeterminate mode omits value min/max/now per ARIA practice.',
    ],
  },
  table: {
    intro: [
      'Material-style data table: pass `[data]` and declare columns with `au-table-column`. Optional `title`, `description`, `striped`, `compact`, `stickyHeader`, and `loading`.',
      'Sort with `sortable` columns, `[(sort)]`, and `clientSort`. Sort icons use shared `au-icon` glyphs (`sort-asc`, `sort-desc`, `sort-neutral`).',
      'Row selection: `selectionMode` (`none` | `single` | `multiple`) with `[(selection)]`, header select-all (multiple), and row click — checkboxes use `au-checkbox`.',
      'Custom cells: `ng-template[auTableCell] let-row` inside a column for badges, menus, or actions.',
    ],
    whenToUse: {
      title: 'When to use',
      items: [
        'Tabular data with headers and body rows.',
        'Sortable columns when the parent owns or delegates sort state.',
        'Pick one or many rows for bulk actions, detail panels, or comparison.',
      ],
    },
    whenNotToUse: {
      title: 'Alternatives',
      items: [
        'Layout-only grids → CSS grid, not tables.',
        'Very wide responsive lists → consider card list patterns.',
      ],
    },
    anatomy: [
      {
        region: '`au-table`',
        detail:
          'Shell, header, `<table>`, body, loading/empty rows. Host attrs: `data-au-striped`, `data-au-compact`, `data-au-sticky-header`, `data-au-loading`, `data-au-selection`.',
      },
      {
        region: 'Selection column',
        detail:
          'Prepended when `selectionMode` is not `none`: header checkbox (multiple) or sr-only label (single), row checkboxes, `aria-selected` on rows.',
      },
      {
        region: '`au-table-column`',
        detail:
          'Defines `name`, `header`, `sortable`, `align`, `cellVariant`, optional `accessor`.',
      },
      {
        region: '`auTableCell`',
        detail: 'Optional template for rich cell content (badges, menus).',
      },
    ],
    accessibility: [
      'Preserve native table semantics (`thead`, `tbody`, `th scope`).',
      'Sort buttons are real buttons with `aria-sort` and `au-icon` indicators.',
      'Selection checkboxes expose `selectAllLabel` / `selectRowLabel`; rows use `aria-selected`.',
      'Loading sets `aria-busy` on the host; the row uses `au-spinner` with `loadingMessage` as `label`.',
    ],
    keyboard: [
      'Tab to sort buttons; Enter/Space toggles sort cycle.',
      'Tab to row checkboxes; Space toggles selection. Row click also toggles when selection is enabled.',
    ],
    relatedExports: ['AuTable', 'AuTableColumn', 'AuTableCellDef'],
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
