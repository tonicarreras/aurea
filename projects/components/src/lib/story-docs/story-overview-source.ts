/** Auto-generated from projects/docs/.../locales/{en,es}/overview.ts — do not edit by hand. */
import type { StoryOverviewSource } from './story-overview-types';

export type StoryOverviewLocale = 'en' | 'es';

export const STORY_OVERVIEW_SOURCE = {
  en: {
    button: {
      intro: [
        'Action button with primary, secondary, outline, and ghost variants. Projected content is the visible label; use `label` when showing an icon only.',
        'Focus distinguishes keyboard (outer ring) and pointer (inner ring) via `tabFocusState`, aligned with other Aurea controls.',
      ],
      whenToUse: [
        'Primary or secondary actions in forms, dialogs, and toolbars.',
        'Loading states with `loading` without layout shift.',
        'Form submission with `type="submit"`.',
      ],
      whenNotToUse: [
        'Navigation between views → links (`<a>`) or tabs.',
        'Toggle an on/off setting → `au-switch`.',
      ],
      anatomy: [
        {
          region: 'Host `au-button`',
          detail: 'Attributes `data-au-variant` and `data-au-size`.',
        },
        {
          region: 'Native button',
          detail: 'Content projection; `aria-busy` when `loading`.',
        },
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
    'button-group': {
      intro: [
        'Layout wrapper that groups related `au-button` actions with `role="group"`.',
        'Default **`attached`** mode shares borders between buttons; set `[attached]="false"` for spaced actions.',
      ],
      whenToUse: [
        'Save / Cancel / secondary actions on forms and dialogs.',
        'Compact toolbars of independent buttons.',
      ],
      whenNotToUse: [
        'Exclusive visible choice in a form → `au-radio-group` or `au-tabs` `variant="contained"`.',
        'Multi-select filters → `au-chip-group`.',
        'Single action → lone `au-button`.',
      ],
      anatomy: [
        {
          region: 'Group',
          detail: '`role="group"` with `ariaLabel` or `ariaLabelledBy`.',
        },
        {
          region: '`au-button`',
          detail: 'Projected children; variants and clicks stay on each button.',
        },
      ],
      accessibility: [
        'Name the group when more than one button is present.',
        'Each `au-button` keeps its own accessible name and keyboard behavior.',
      ],
      keyboard: ['Tab moves between buttons in document order.'],
    },
    'form-field': {
      intro: [
        'Shared label, hint, and error chrome around a projected control (`au-input-text`, `au-select`, `au-radio-group`, etc.).',
        'Exposes `AU_FORM_FIELD` via DI so the child gets the same `controlId`, `hintId`, and `errorId` for ARIA wiring.',
        'Checkbox and switch keep their inline `label` on the control; use `au-form-field` for hint and error only.',
      ],
      whenToUse: [
        'Any standard field where label/hint/error should match the design system.',
        'Signal forms: child `errors` / `invalid` flow into the wrapper error region.',
        'Stable ids with optional `[controlIdInput]`.',
      ],
      whenNotToUse: [
        'Checkbox with only an inline label and no hint/error → bare `au-checkbox`.',
        'Non-form layout → do not wrap.',
      ],
      anatomy: [
        {
          region: 'Label',
          detail: '`<label for>` tied to child `controlId`.',
        },
        {
          region: 'Projected control',
          detail: 'Single focusable control in the default slot.',
        },
        {
          region: 'Hint / error',
          detail: 'Hint `<p>`; error `role="alert"` with shared styles.',
        },
      ],
      accessibility: [
        'Child receives `aria-describedby` / `aria-errormessage` from context ids.',
        'Required asterisk is decorative with screen-reader text.',
      ],
      extra:
        '### Related exports\n\n`AU_FORM_FIELD`, `AuFormFieldContext` — import from `@aurea-design-system/components`.',
    },
    fieldset: {
      intro: [
        'Groups related controls with a native `<fieldset>`, optional `<legend>`, and supporting description.',
        'Use `[disabled]="true"` to disable every nested control in one place.',
      ],
      whenToUse: [
        'Address blocks, payment sections, or filter groups that belong together semantically.',
        'Forms where a shared legend names the region for assistive tech.',
      ],
      whenNotToUse: [
        'Visual grouping only → card or divider.',
        'Single field → bare `au-form-field`.',
      ],
      anatomy: [
        {
          region: 'Legend',
          detail: 'Omitted when `legend` is empty.',
        },
        {
          region: 'Description',
          detail: 'Optional helper copy under the legend.',
        },
        {
          region: 'Content slot',
          detail: 'Project `au-form-field` rows or other controls.',
        },
      ],
      accessibility: [
        'Native `fieldset`/`legend` semantics propagate to nested inputs.',
        'Disabled state disables all descendants without extra wiring.',
      ],
    },
    'input-text': {
      intro: [
        'Single-line control projected inside `au-form-field` for label, hint, and error.',
        'Implements `FormValueControl<string | null>`: bind `[formField]` in signal forms or `[(value)]` manually. An empty field is `null`, not an empty string.',
        'Full `form()` example: `@aurea-design-system/components` package README → *Signal forms* (not a separate Storybook page).',
      ],
      whenToUse: [
        'Text, email, URL, tel, or search with the same chrome as other fields.',
        'Validation via signal forms or manual `errorMessage` / `invalid`.',
      ],
      whenNotToUse: [
        'Password fields → `au-input-password`.',
        'Multi-line text → `au-textarea`.',
        'Pick from a list → `au-select` or `au-autocomplete`.',
      ],
      anatomy: [
        {
          region: '`au-form-field`',
          detail: 'Label, hint, and error outside the control.',
        },
        {
          region: 'Shell',
          detail: 'Border, background, and focus/error rings on the input row.',
        },
        {
          region: 'Native input',
          detail: '`aria-invalid`, `aria-errormessage`, `aria-describedby` via context.',
        },
      ],
      accessibility: [
        'Accessible name via visible label or external `aria-label`.',
        'Errors linked with `aria-errormessage`; hints with `aria-describedby`.',
      ],
      keyboard: ['Tab enters the field with outer ring (`--from-tab`); click uses inner ring.'],
      extra:
        '## Signal forms vs manual\n\n| Mode | Where | Validation |\n|------|--------|------------|\n| Signal forms | `[formField]` on `au-input-text`; `form()` in your component | Schema drives `errors` / `invalid`; `au-form-field` shows the message |\n| Manual | `[(value)]` + `au-form-field` `errorMessage` / `invalid` | Parent sets chrome (see **With error** story) |\n\nFull `form()` example: **`@aurea-design-system/components` README** → *Signal forms*.\n\n### Manual checks (Storybook **Accessibility** addon)\n\n1. Run **Accessibility** → **Run** on each story.\n2. Tab through **Password** and confirm keyboard vs pointer focus rings.\n3. **With error**: screen reader should hear `aria-errormessage`.',
    },
    textarea: {
      intro: [
        'Multi-line control projected inside `au-form-field`; same sm/md/lg sizes as other fields.',
        'Minimum height via `--au-textarea-min-h-*`; configurable `resize`.',
      ],
      whenToUse: ['Comments, long descriptions, notes.', 'Content that does not fit on one line.'],
      whenNotToUse: ['Single line → `au-input-text`.', 'Rich editor → third-party component.'],
      anatomy: [
        {
          region: 'Shell',
          detail: 'Same as single-line fields.',
        },
        {
          region: '`<textarea>`',
          detail: 'Padding vertical `--au-textarea-pad-y`.',
        },
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
      whenToUse: [
        'Accept terms; multiple independent permissions.',
        '“Select all” pattern with indeterminate state on the parent.',
      ],
      whenNotToUse: [
        'Single on/off preference → `au-switch`.',
        'Single choice in a list → `au-radio-group`.',
      ],
      anatomy: [
        {
          region: 'Native input',
          detail: 'Real checkbox; native indeterminate state.',
        },
        {
          region: 'Label / description',
          detail: 'Primary and secondary text.',
        },
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
      whenToUse: [
        'Immediate preferences (notifications, dark mode).',
        'Enable/disable a system feature.',
      ],
      whenNotToUse: [
        'Mutually exclusive options → `au-radio-group`.',
        'Legal acceptance → `au-checkbox`.',
      ],
      anatomy: [
        {
          region: 'Track and thumb',
          detail: 'Tokens `--au-color-switch-track-*` and thumb.',
        },
        {
          region: 'Label / hint',
          detail: 'Same structure as other fields.',
        },
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
      whenToUse: [
        'Closed lists of 4–20 items where users know the options.',
        'Forms that must post a stable `name` value.',
      ],
      whenNotToUse: [
        'Search with filtering → `au-autocomplete`.',
        'Only 2–3 visible options → `au-radio-group`.',
      ],
      anatomy: [
        {
          region: 'Trigger',
          detail: 'Shows the selected option label.',
        },
        {
          region: 'Listbox portal',
          detail: 'Highlight vs selected use distinct tokens.',
        },
      ],
      accessibility: [
        'ARIA combobox pattern (`aria-expanded`, `aria-controls`, `listbox`/`option`).',
        'Disabled options respect `disabled` on `AuSelectOption`.',
      ],
      keyboard: ['Space/Enter opens; arrows move highlight; Enter selects; Escape closes.'],
    },
    autocomplete: {
      intro: [
        'Search field filtering `AuAutocompleteOption[]` as you type (case-insensitive by default).',
        'Same surface and listbox as `au-select`; `strictSelection` prevents free text on blur.',
      ],
      whenToUse: [
        'Large catalogs (cities, users, SKUs).',
        'When the user knows part of the text to find.',
      ],
      whenNotToUse: [
        'Short fixed list → `au-select`.',
        'Free text without a list → `au-input-text`.',
      ],
      anatomy: [
        {
          region: 'Search input',
          detail: 'Combobox with live query.',
        },
        {
          region: 'Suggestions panel',
          detail: '`noResultsText` when the filter matches nothing.',
        },
      ],
      accessibility: ['Combobox with listbox; open state on `data-au-listbox-open`.'],
      keyboard: ['Same as select; typing filters options.'],
    },
    avatar: {
      intro: [
        'Displays a user photo or initials derived from `name` when no image is available.',
        'Sizes xs–xl; `circle` (default, fully round) or `square` (rounded corners).',
      ],
      whenToUse: [
        'Profile headers, comment authors, or assignee chips in lists.',
        'Initials fallback when no photo URL is available.',
      ],
      whenNotToUse: [
        'Loading placeholder → `au-skeleton` variant circular.',
        'Decorative brand mark without a person → `au-icon` or custom SVG.',
      ],
      anatomy: [
        {
          region: 'Image',
          detail: '`<img>` when `src` is set; requires `alt`.',
        },
        {
          region: 'Initials',
          detail: 'Two-letter fallback from first/last word of `name`.',
        },
      ],
      accessibility: [
        'With image: accessible name from `alt`.',
        'Initials-only: host `role="img"` and `aria-label` from `name`.',
        'Use `decorative` when a parent row exposes the person name.',
      ],
    },
    accordion: {
      intro: [
        'Collapsible sections built on WAI-ARIA accordion pattern: `button[auAccordionItem]` triggers and `au-accordion-panel` regions share a string key.',
        'Bind `[(value)]` to the list of expanded keys; set `[multiple]="false"` for exclusive expand.',
      ],
      whenToUse: [
        'FAQ, settings panels, or filters where only a subset should be visible at once.',
        'Long forms split into scannable sections on one page.',
      ],
      whenNotToUse: [
        'Mutually exclusive views with persistent tab chrome → `au-tabs`.',
        'Sequential wizard with validation gates → `au-steps`.',
      ],
      anatomy: [
        {
          region: '`.au-accordion__item`',
          detail: 'Wrap each trigger + panel pair.',
        },
        {
          region: '`button[auAccordionItem]`',
          detail: 'Trigger with `aria-expanded` and `aria-controls`.',
        },
        {
          region: '`au-accordion-panel`',
          detail: 'Region with height transition; `aria-hidden` and `inert` when collapsed.',
        },
      ],
      accessibility: [
        'Root `role="region"` with `aria-label` or labelledby.',
        'Triggers stay in the tab order; panels expose `aria-labelledby`.',
      ],
      keyboard: [
        'Arrow Down/Up move focus among enabled triggers.',
        'Home/End jump to first/last trigger; Enter/Space toggle on the button.',
      ],
    },
    'radio-group': {
      intro: [
        'Native radio buttons in a shell with legend. Single selection per `name`.',
        'Model value = active `AuRadioOption` `value`.',
      ],
      whenToUse: [
        '2–5 mutually exclusive options visible without a dropdown.',
        'Plans, payment methods, account type.',
      ],
      whenNotToUse: ['Many options → `au-select`.', 'Boolean → checkbox or switch.'],
      anatomy: [
        {
          region: 'Legend',
          detail: 'Group label.',
        },
        {
          region: 'Options',
          detail: 'Each radio with its own label.',
        },
      ],
      accessibility: ['Associated legend; arrow keys move among radios with the same name.'],
    },
    'input-number': {
      intro: [
        'Numeric input with `min`, `max`, and `step`; empty ↔ `null`.',
        'Styled increment/decrement buttons in the same field shell.',
      ],
      whenToUse: ['Quantities, age, percentages with known bounds.'],
      whenNotToUse: [
        'Currency mask → domain layer on input-text.',
        'Continuous range → dedicated slider.',
      ],
      anatomy: [
        {
          region: 'Input `type="number"`',
          detail: 'Parses to a finite number or `null`.',
        },
        {
          region: 'Steppers',
          detail: 'Respect native min/max.',
        },
      ],
      accessibility: ['Label, error, and focus like other fields.'],
    },
    slider: {
      intro: [
        'Native `input[type="range"]` styled with Aurea tokens and optional live value output.',
        'Implements `FormValueControl<number>`; project inside `au-form-field` for label, hint, and errors.',
      ],
      whenToUse: [
        'Volume, opacity, or any bounded continuous value where dragging is faster than typing.',
        'Settings with a visible min/max and coarse steps.',
      ],
      whenNotToUse: [
        'Exact numeric entry → `au-input-number`.',
        'Discrete choices → radio group or select.',
      ],
      anatomy: [
        {
          region: 'Track',
          detail: 'Fill percentage driven by value between min and max.',
        },
        {
          region: 'Thumb',
          detail: 'Native range thumb with focus ring.',
        },
        {
          region: 'Value output',
          detail: 'Optional `showValue` region linked via `aria-describedby`.',
        },
      ],
      accessibility: [
        'Linked label and error ids from `au-form-field`.',
        'Live value announced when `showValue` is enabled.',
      ],
      keyboard: ['Arrow keys adjust the value per native range behavior.'],
    },
    'input-date': {
      intro: [
        'Native date picker (`<input type="date">`) with Aurea tokens on icon and OS popup.',
        'Value as ISO `YYYY-MM-DD` or `null`.',
      ],
      whenToUse: [
        'Calendar dates with the OS picker.',
        'Range filters with `minDate` / `maxDate`.',
      ],
      whenNotToUse: ['Custom inline calendar → composite component or external library.'],
      anatomy: [
        {
          region: 'Native input',
          detail: 'Tokens `--au-color-date-picker-*` for icon and accent.',
        },
      ],
      accessibility: ['Linked label and errors; native OS picker behavior.'],
    },
    'input-time': {
      intro: [
        'Native time picker (`<input type="time">`) with Aurea tokens on icon and OS popup.',
        'Value as 24h `HH:mm` or `null`.',
      ],
      whenToUse: [
        'Clock times with the OS picker.',
        'Business-hour filters with `minTime` / `maxTime`.',
      ],
      whenNotToUse: ['Custom duration steppers → composite component or external library.'],
      anatomy: [
        {
          region: 'Native input',
          detail: 'Tokens `--au-color-date-picker-*` for icon and accent.',
        },
      ],
      accessibility: [
        'Linked label, hint, and errors via `au-form-field` (`aria-invalid`, `aria-describedby`).',
        'Decorative clock icon (`aria-hidden`); picker opens via native control.',
      ],
    },
    'input-password': {
      intro: [
        'Dedicated password field with optional reveal toggle and shared Aurea field chrome.',
        'Implements `FormValueControl<string | null>`; empty ↔ `null`.',
      ],
      whenToUse: [
        'Login, registration, and change-password forms.',
        'When users may need to verify what they typed (`showRevealToggle`).',
      ],
      whenNotToUse: ['Fixed-length OTP or PIN → specialized input pattern.'],
      anatomy: [
        {
          region: 'Native input',
          detail: 'Toggles `type="password"` / `type="text"` when revealed.',
        },
        {
          region: 'Reveal control',
          detail: 'Optional icon button with `aria-pressed` and localized label.',
        },
      ],
      accessibility: [
        'Label, hint, and errors linked via `au-form-field`.',
        'Reveal button is keyboard accessible and does not submit the form.',
      ],
    },
    'file-upload': {
      intro: [
        'Drag-and-drop target with hidden native `input[type="file"]`, browse button, and removable file list.',
        'Implements `FormValueControl<File[]>`; empty selection is `[]`.',
      ],
      whenToUse: [
        'Attachments, imports, or media uploads in forms.',
        'When users benefit from dropping files onto a large target.',
      ],
      whenNotToUse: [
        'Camera capture only → native input without the dropzone chrome.',
        'Async cloud picker → integrate your provider UI.',
      ],
      anatomy: [
        {
          region: 'Dropzone',
          detail: 'Prompt, browse button, and hidden file input.',
        },
        {
          region: 'File list',
          detail: 'Name, size, and remove control per file.',
        },
      ],
      accessibility: [
        'Browse button is keyboard reachable; dropzone respects `aria-disabled`.',
        'Remove buttons expose `aria-label` per file.',
        'List updates use `aria-live="polite"`.',
      ],
      keyboard: ['Tab to browse; activate with Enter/Space on the button.'],
    },
    dialog: {
      intro: [
        'Modal on native `<dialog>`: backdrop, focus trap, Escape and outside click to close (configurable).',
        'Projects free body and optional footer with `auDialogFooter`.',
      ],
      whenToUse: [
        'Destructive confirmations or flows that need an explicit decision.',
        'Short forms that do not need a new route.',
      ],
      whenNotToUse: [
        'Light confirmation → `au-snackbar` with action.',
        'Persistent side panel → your own layout.',
      ],
      anatomy: [
        {
          region: 'Backdrop',
          detail: 'Mixes `--au-color-surface-inverted`.',
        },
        {
          region: 'Panel',
          detail: 'Header, body, footer (`auDialogFooter`).',
        },
      ],
      accessibility: [
        '`aria-labelledby` with `title` or `aria-label`.',
        'Initial focus inside the panel; restore to trigger on close.',
        'Tab cycles within the dialog.',
      ],
      keyboard: ['Escape closes when `closeOnEscape`.', 'Tab / Shift+Tab trapped in the panel.'],
    },
    drawer: {
      intro: [
        'Side panel on native `<dialog>`: slides from `start` or `end`, with the same focus trap and scroll lock as `au-dialog`.',
        'Project body content and optional footer actions with `[auDrawerFooter]`.',
      ],
      whenToUse: [
        'Mobile navigation, filter panels, or detail without leaving the page.',
        'Secondary workflows that need more width than a popover.',
      ],
      whenNotToUse: [
        'Centered confirmation → `au-dialog`.',
        'Non-modal contextual panel → `au-popover`.',
      ],
      anatomy: [
        {
          region: 'Backdrop',
          detail: 'Dimmed overlay; click closes when enabled.',
        },
        {
          region: 'Panel',
          detail: 'Header, scrollable body, optional footer.',
        },
      ],
      accessibility: [
        '`aria-labelledby` with `title` or `aria-label`.',
        'Focus moves into the panel on open; restored on close.',
      ],
      keyboard: ['Escape closes when `closeOnEscape`.', 'Tab trapped within the panel.'],
    },
    card: {
      intro: [
        'Grouped surface with elevated, outlined, and filled variants. Regions: media, header, body, footer.',
        'Host is `<article>`: include a heading in `auCardHeader` for document outline.',
        'Set `[interactive]="true"` only when the whole card is a link or click target (hover border emphasis on elevated).',
      ],
      whenToUse: [
        'Entity summaries, dashboard tiles, settings blocks.',
        'Clickable tiles with `interactive` and a real link or button pattern.',
      ],
      whenNotToUse: [
        'Only separate content → `au-divider` or spacing.',
        'Blocking overlay → `au-dialog`.',
      ],
      anatomy: [
        {
          region: 'auCardMedia',
          detail: 'Bleed, outside inner padding.',
        },
        {
          region: 'auCardHeader / auCardBody',
          detail: 'Title and content with `--au-card-main-gap`.',
        },
        {
          region: 'auCardFooter',
          detail: 'Actions aligned below top border.',
        },
      ],
      accessibility: [
        'Use a heading in the header for hierarchy.',
        'Footer actions with real buttons (`au-button`).',
      ],
    },
    tabs: {
      intro: [
        'WAI-ARIA tabs: `tablist`, `tab`, and `tabpanel`. Only the active tab is tabbable (`tabindex="0"`).',
        'Variants `line` (underline) and `contained` (segmented).',
      ],
      whenToUse: [
        'Switch related panels on the same page (account, settings).',
        'When the user should not navigate away.',
      ],
      whenNotToUse: [
        'App-wide navigation → router and menu.',
        'Sequential steps with validation → `au-steps`.',
      ],
      anatomy: [
        {
          region: 'button[auTab]',
          detail: 'Triggeres en el tablist.',
        },
        {
          region: '[auTabPanel]',
          detail: 'Content; `hidden` when inactive.',
        },
      ],
      accessibility: [
        '`aria-selected`, `aria-controls`, paired tab/panel ids.',
        'Orientation exposed on the tablist.',
      ],
      keyboard: [
        'Arrows change active tab (horizontal or vertical per `orientation`).',
        'Home/End to first/last tab.',
      ],
    },
    'tag-input': {
      intro: [
        'Multi-value text field that shows entered values as removable chips.',
        'Implements `FormValueControl<string[]>`; confirm with Enter, comma, or blur.',
      ],
      whenToUse: [
        'Skills, topics, email recipients, or filter tokens in forms.',
        'When each value should stay visible and be removed individually.',
      ],
      whenNotToUse: [
        'Single free-text value → `au-input-text` or `au-textarea`.',
        'Predefined filters → `au-chip-group`.',
        'Removable list without typing → `au-list` + `au-chip`.',
      ],
      anatomy: [
        {
          region: 'Chips',
          detail: 'Removable labels with a remove button per chip.',
        },
        {
          region: 'Draft input',
          detail: 'Inline field for the next tag.',
        },
      ],
      accessibility: [
        'Remove buttons expose `aria-label` via `removeTagLabel`.',
        'Backspace with an empty draft removes the last tag.',
      ],
      keyboard: [
        'Enter or comma confirms the draft as a tag.',
        'Backspace with empty input removes the last tag.',
      ],
    },
    chip: {
      intro: [
        'Compact label in three modes: static, selectable (`selectable` + `aria-pressed`), or removable (`removed`).',
        'Filled, outline, and accent variants (active-filter style).',
      ],
      whenToUse: ['Tags, active filters, item metadata.', 'Multi-select categories in a toolbar.'],
      whenNotToUse: [
        'Primary action → `au-button`.',
        'Primary navigation → tabs or links.',
        'Selectable filters in a row → `au-chip-group`.',
        'Removable tag list → `au-list`.',
      ],
      anatomy: [
        {
          region: 'Surface',
          detail: 'Projection or `label` input.',
        },
        {
          region: 'Remove button',
          detail: 'Only when `removable`; optional `removeLabel`.',
        },
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
      whenToUse: [
        'Confirm save, recoverable error, notice without blocking the UI.',
        'Feedback after an action where a dialog would be heavy.',
      ],
      whenNotToUse: [
        'Required decision → `au-dialog`.',
        'Field form error → field `errorMessage`.',
      ],
      anatomy: [
        {
          region: 'Message',
          detail: 'Input `message` or projected content.',
        },
        {
          region: 'Action / close',
          detail: 'Optional buttons.',
        },
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
      whenToUse: [
        'Toolbar filters (status, category).',
        'Multi-toggle filters where each chip is independent.',
      ],
      whenNotToUse: [
        'Removable tags → `au-list` + `removable` chips.',
        'Single chip → bare `au-chip`.',
      ],
      anatomy: [
        {
          region: 'Group',
          detail: '`aria-label` or `aria-labelledby` required.',
        },
      ],
      accessibility: ['Named group; chips expose `aria-pressed` when selectable.'],
    },
    list: {
      intro: [
        'Accessible list (`role="list"`) for removable chips or custom rows with `auListItem`.',
        'Chips inside automatically become `listitem` unless `selectable`.',
      ],
      whenToUse: [
        'Selected tags the user can remove.',
        'Horizontal rows of peer items with list semantics.',
      ],
      whenNotToUse: ['Filter toggles → `au-chip-group`.', 'Navigation → tabs or links.'],
      anatomy: [
        {
          region: 'List host',
          detail: '`au-list` with flex row layout.',
        },
        {
          region: 'Items',
          detail: '`au-chip` removable or `<div auListItem>`.',
        },
      ],
      accessibility: ['Provide `ariaLabel` or `ariaLabelledBy`.'],
    },
    message: {
      intro: [
        'Inline callout (`layout="inline"`) or full-width banner (`layout="banner"`) for status and notices.',
        'Semantic variants map to token surfaces; optional `au-icon` glyph per variant.',
      ],
      whenToUse: [
        'Form-level errors above fields (`inline`).',
        'App-wide maintenance, billing, or policy notices (`banner`).',
      ],
      whenNotToUse: [
        'Transient toast → `au-snackbar`.',
        'Field error → `au-form-field` `errorMessage`.',
      ],
      anatomy: [
        {
          region: 'Icon',
          detail: 'Variant glyph when `showIcon` (not on default).',
        },
        {
          region: 'Title / body',
          detail: '`title` + `message` or projected slot.',
        },
        {
          region: 'Actions',
          detail: 'Optional `actionLabel` and dismiss control.',
        },
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
      whenToUse: [
        'Inside `au-message`, removable chips, loading buttons.',
        'Consistent stroke icons across the DS.',
      ],
      whenNotToUse: [
        'Custom brand icons → your own SVG.',
        'Icon-only button → set `label` on `au-button`.',
        'Standalone loading → `au-spinner`.',
      ],
      anatomy: [
        {
          region: 'SVG',
          detail: '`data-au-icon` + `data-au-size` on host.',
        },
      ],
      accessibility: ['Host is `aria-hidden="true"`.'],
    },
    skeleton: {
      intro: [
        'Loading placeholders: text lines, circles (avatars), blocks, and button bars.',
        'Pulse or wave animation; parent should set `aria-busy` while loading.',
      ],
      whenToUse: ['Card/list loading states.', 'Profile header placeholder.'],
      whenNotToUse: [
        'Spinner on a button → `au-button` `loading`.',
        'Inline loading indicator → `au-spinner`.',
        'Empty state → visible copy, not skeleton.',
      ],
      anatomy: [
        {
          region: 'Host',
          detail: '`role="presentation"`; size from variant + `size`.',
        },
      ],
      accessibility: ['Decorative only; pair with `aria-busy` on the loading region.'],
    },
    spinner: {
      intro: [
        'Inline loading indicator with `role="status"` and `aria-busy="true"`.',
        'Dual-ring SVG: muted track and rotating arc (~0.9s). Glyph uses `--au-color-action-primary` by default.',
      ],
      whenToUse: [
        'Table or panel loading rows while data fetches.',
        'Visible status copy via `label` when the wait needs context.',
      ],
      whenNotToUse: [
        'Button in-flight state → `au-button` `loading`.',
        'Known completion ratio → `au-progress`.',
        'Content placeholders → `au-skeleton`.',
      ],
      anatomy: [
        {
          region: 'Host `au-spinner`',
          detail: '`role="status"`; `data-au-size` sets sm/md/lg footprint.',
        },
        {
          region: 'Rings',
          detail: 'Decorative SVG track and animated arc (`aria-hidden`).',
        },
        {
          region: 'Label',
          detail: 'Optional visible copy when `label` is set (`aria-labelledby`).',
        },
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
      whenToUse: [
        'Documentation sites (Overview / API / Examples).',
        'Multi-section pages with stable keys.',
      ],
      whenNotToUse: [
        'App primary nav → `au-tabs`.',
        'Strict wizard with completion → dedicated stepper.',
      ],
      anatomy: [
        {
          region: 'Step list',
          detail: 'Horizontal buttons with active indicator.',
        },
        {
          region: 'Panels',
          detail: 'Tab panels or always-visible regions.',
        },
      ],
      accessibility: [
        'Tabs layout: tablist + tab + tabpanel.',
        'Sections layout: `aria-current` on active step.',
      ],
      keyboard: ['Arrow keys, Home, and End move between enabled steps.'],
    },
    divider: {
      intro: [
        'Semantic `role="separator"` horizontal or vertical, with inset and optional centered label.',
      ],
      whenToUse: [
        'Separate content sections or list items.',
        'Vertical separator between flex groups.',
      ],
      whenNotToUse: ['Spacing only → spacing utilities.', 'Card border → `au-card` variant.'],
      anatomy: [
        {
          region: 'Rule',
          detail: 'Line `--au-color-border-subtle`.',
        },
        {
          region: 'Label',
          detail: 'Horizontal only; text between two line halves.',
        },
      ],
      accessibility: ['`aria-orientation` from `orientation`.'],
    },
    'description-list': {
      intro: [
        'Semantic description list container (`<dl>`) for key–value pairs.',
        'Compose with `au-description-item` (`term` + projected description); native `<dt>` / `<dd>` for advanced markup.',
      ],
      whenToUse: [
        'Profile summaries, invoice detail, metadata panels.',
        'Read-only detail beside forms or in settings sidebars.',
      ],
      whenNotToUse: [
        'Editable fields → form controls inside `au-form-field`.',
        'Sortable tabular data → `au-table`.',
        'Simple stacked labels → typography utilities.',
      ],
      anatomy: [
        {
          region: '`dl` shell',
          detail: 'CSS grid from `layout` and `columns`.',
        },
        {
          region: '`au-description-item`',
          detail: 'Renders `<dt>` and `<dd>`; host uses `display: contents`.',
        },
        {
          region: 'Native `dt` / `dd`',
          detail: 'Optional projection for rich descriptions.',
        },
      ],
      accessibility: [
        'Preserves native list semantics for screen readers.',
        'Each `dt` should be followed by its `dd` in document order.',
      ],
    },
    'empty-state': {
      intro: [
        'Centered placeholder when a list, table, panel, or search has no data to show.',
        'Compose with `title`, optional `description`, media (`icon`, `imageSrc`, or projected `[auEmptyStateMedia]`), and projected actions.',
      ],
      whenToUse: [
        'Empty table or list after filters return zero rows.',
        'First-use panels that need a primary action (create, import, connect).',
      ],
      whenNotToUse: [
        'Loading placeholders → `au-skeleton`.',
        'Inline status or errors → `au-message`.',
        'Blocking fetch in a button or row → `au-spinner`.',
      ],
      anatomy: [
        {
          region: 'Media',
          detail:
            'Optional illustration: preset icon, `imageSrc`, or custom markup via `[auEmptyStateMedia]` (first match wins).',
        },
        {
          region: 'Title',
          detail: 'Heading (`headingLevel` 2–4) names the region.',
        },
        {
          region: 'Description',
          detail: 'Supporting copy under the title.',
        },
        {
          region: 'Actions',
          detail: 'Project buttons or links; container hidden when empty.',
        },
      ],
      accessibility: [
        '`role="region"` with `aria-labelledby` on the title.',
        'Pick `headingLevel` to fit the surrounding heading outline.',
      ],
    },
    badge: {
      intro: [
        'Compact status or count label. Variants map to semantic surface tokens; dot mode for indicators without readable text.',
      ],
      whenToUse: [
        'Unread counts, status pills, or category labels inline with headings or list rows.',
        'Dot indicator when meaning is clear from surrounding text (e.g. online status).',
      ],
      whenNotToUse: [
        'Removable or selectable filters → `au-chip` / `au-chip-group`.',
        'Full sentences or dismissible alerts → `au-message`.',
      ],
      anatomy: [
        {
          region: 'Host `au-badge`',
          detail: '`data-au-variant`; optional `data-au-dot`.',
        },
        {
          region: 'Label',
          detail: 'Text via `label`; omitted visually in dot-only mode.',
        },
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
      whenToUse: [
        'Deep page hierarchies where users need context and upward navigation.',
        'Settings or docs sections with more than two levels.',
      ],
      whenNotToUse: [
        'Flat apps with one level → skip breadcrumbs.',
        'Primary app navigation → router tabs or side nav.',
      ],
      anatomy: [
        {
          region: 'List',
          detail: 'Ordered trail with separators between items.',
        },
        {
          region: 'Link item',
          detail: 'Uses link tokens; focus ring on keyboard.',
        },
        {
          region: 'Current item',
          detail: 'Last segment without `href`; emphasized text.',
        },
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
      whenToUse: [
        'Inline navigation within copy, tables, or messages.',
        'External references with safe `rel` when `external` is true.',
      ],
      whenNotToUse: [
        'Primary actions → `au-button`.',
        'Breadcrumb trail → `au-breadcrumb` items with `href`.',
      ],
      anatomy: [
        {
          region: 'Anchor',
          detail: 'Host `au-link` with `data-au-variant`.',
        },
        {
          region: 'Projected content',
          detail: 'Link text in the default slot.',
        },
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
      whenToUse: [
        'Row or toolbar actions that do not need a full dialog.',
        'Command lists opened from a single trigger button.',
      ],
      whenNotToUse: [
        'Non-modal filters or compact forms → `au-popover`.',
        'Blocking confirmation → `au-dialog`.',
      ],
      anatomy: [
        {
          region: 'Trigger',
          detail: '`auMenuTrigger`; `aria-haspopup="menu"` and `aria-expanded`.',
        },
        {
          region: 'Panel',
          detail: 'Portaled `.au-floating-panel`; positioned via overlay helper.',
        },
        {
          region: 'Items',
          detail: '`au-menu-item` buttons; `select` output closes the menu.',
        },
      ],
      accessibility: [
        'Trigger exposes expanded state while open.',
        'Dismiss with Escape or outside click; focus returns to trigger pattern documented in overlay.',
      ],
      keyboard: [
        'Trigger: Enter/Space toggles; Escape closes.',
        'Items: activate with click; extend with roving tabindex if you add composite patterns.',
      ],
    },
    popover: {
      intro: [
        'Lightweight anchored panel for filters, help, or compact forms. Same overlay model as `au-menu`.',
        'Trigger uses `auPopoverTrigger` with `aria-haspopup="dialog"`.',
      ],
      whenToUse: [
        'Inline filters or settings that should stay near the trigger.',
        'Short supplementary content that is not a full modal.',
      ],
      whenNotToUse: [
        'Simple hover hints → `auTooltip`.',
        'Destructive or blocking flows → `au-dialog`.',
        'Action lists → `au-menu`.',
      ],
      anatomy: [
        {
          region: 'Trigger',
          detail: '`auPopoverTrigger` toggles `[(open)]`.',
        },
        {
          region: 'Panel',
          detail: 'Projected content in portaled `.au-floating-panel`.',
        },
      ],
      accessibility: [
        'Trigger `aria-expanded` reflects open state.',
        'Keep focus management explicit when panel contains form controls.',
        'Escape and outside click dismiss.',
      ],
      keyboard: ['Trigger toggles with Enter/Space; Escape closes the panel.'],
      extra:
        '### Form controls in panels\n\nProject `au-input-text`, `au-select`, and other field controls **inside `au-form-field`** — they require `AU_FORM_FIELD` via DI.',
    },
    pagination: {
      intro: [
        'Page navigation for tables and lists. Pages are **1-based**; emits `pageChange` when the user picks a page.',
        'Collapses long ranges with ellipses when `pageCount` > 7.',
      ],
      whenToUse: [
        'Server- or client-paginated tables and card grids.',
        'When users need direct jumps to numbered pages.',
      ],
      whenNotToUse: [
        'Infinite scroll feeds → load-more pattern.',
        'Very small lists → show all rows.',
      ],
      anatomy: [
        {
          region: 'Nav',
          detail: '`role="navigation"` with `aria-label="Pagination"`.',
        },
        {
          region: 'Prev / next',
          detail: '`au-button` ghost controls.',
        },
        {
          region: 'Page buttons',
          detail: 'Numbered pages; current page styled as active.',
        },
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
      whenToUse: [
        'File uploads, multi-step tasks, or known completion percentage.',
        'Indeterminate waits when duration is unknown.',
      ],
      whenNotToUse: [
        'Loading placeholders for content → `au-skeleton`.',
        'Button in-flight state → `au-button` `loading`.',
      ],
      anatomy: [
        {
          region: 'Track',
          detail: 'Sunken surface with pill radius.',
        },
        {
          region: 'Bar',
          detail: 'Width from `value`/`max` or indeterminate animation.',
        },
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
        'Empty data: project `au-empty-state` as a child (use `size="sm"` and `headingLevel="3"`); otherwise `emptyMessage` is shown.',
      ],
      whenToUse: [
        'Tabular data with headers and body rows.',
        'Sortable columns when the parent owns or delegates sort state.',
        'Pick one or many rows for bulk actions, detail panels, or comparison.',
      ],
      whenNotToUse: [
        'Layout-only grids → CSS grid, not tables.',
        'Very wide responsive lists → consider card list patterns.',
      ],
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
        {
          region: 'Empty row',
          detail:
            'When `data` is empty, project `au-empty-state` for rich placeholders; falls back to `emptyMessage`.',
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
    },
    tooltip: {
      intro: [
        'Contextual help in a portal on hover or focus of the trigger. Configurable delays to avoid flicker.',
        'Does not replace a visible label: the trigger needs its own accessible name.',
      ],
      whenToUse: ['Action icons without visible text.', 'Clarify an already labeled control.'],
      whenNotToUse: [
        'Essential information → visible text or field `hint`.',
        'Long or interactive content → popover or dialog.',
      ],
      anatomy: [
        {
          region: 'Trigger',
          detail: 'Element with `auTooltip` (e.g. `au-button`).',
        },
        {
          region: 'Tooltip bubble',
          detail: 'Class `.au-tooltip` on `document.body`.',
        },
      ],
      accessibility: [
        '`role="tooltip"` and `aria-describedby` on the host while open.',
        'No contiene foco interactivo.',
      ],
    },
  },
  es: {
    button: {
      intro: [
        'Botón de acción con variantes primary, secondary, outline y ghost. El contenido proyectado es la etiqueta visible; usa `label` si solo muestras un icono.',
        'El foco distingue teclado (anillo exterior) y ratón (anillo interior) mediante `tabFocusState`, alineado con el resto de controles Aurea.',
      ],
      whenToUse: [
        'Acciones principales o secundarias en formularios, diálogos y barras de herramientas.',
        'Estados de carga con `loading` sin cambiar el layout.',
        'Envío de formularios con `type="submit"`.',
      ],
      whenNotToUse: [
        'Navegación entre vistas → enlaces (`<a>`) o tabs.',
        'Conmutar un ajuste on/off → `au-switch`.',
      ],
      anatomy: [
        {
          region: 'Host `au-button`',
          detail: 'Atributos `data-au-variant` y `data-au-size`.',
        },
        {
          region: 'Botón nativo',
          detail: 'Proyección de contenido; `aria-busy` cuando `loading`.',
        },
      ],
      accessibility: [
        'Anillo de foco visible al tabular (`--au-color-focus-ring`).',
        '`loading` activa `aria-busy`, muestra un `au-spinner` decorativo y bloquea el click.',
        'Tamaño `lg` respeta `--au-touch-target-min` (44px).',
      ],
      keyboard: [
        'Enter y Space activan el botón nativo.',
        'Tab enfoca el control; foco restaurado tras cerrar diálogos.',
      ],
    },
    'button-group': {
      intro: [
        'Contenedor de layout que agrupa acciones `au-button` relacionadas con `role="group"`.',
        'Por defecto **`attached`** une bordes entre botones; `[attached]="false"` los separa.',
      ],
      whenToUse: [
        'Acciones Guardar / Cancelar / secundarias en formularios y diálogos.',
        'Toolbars compactas de botones independientes.',
      ],
      whenNotToUse: [
        'Elección exclusiva en formulario → `au-radio-group` o `au-tabs` `variant="contained"`.',
        'Filtros multi-selección → `au-chip-group`.',
        'Una sola acción → `au-button` suelto.',
      ],
      anatomy: [
        {
          region: 'Grupo',
          detail: '`role="group"` con `ariaLabel` o `ariaLabelledBy`.',
        },
        {
          region: '`au-button`',
          detail: 'Hijos proyectados; variantes y clics en cada botón.',
        },
      ],
      accessibility: [
        'Nombra el grupo cuando hay más de un botón.',
        'Cada `au-button` conserva su nombre accesible y teclado propio.',
      ],
      keyboard: ['Tab recorre los botones en orden de documento.'],
    },
    'form-field': {
      intro: [
        'Cromado compartido de etiqueta, hint y error alrededor de un control proyectado (`au-input-text`, `au-select`, `au-radio-group`, etc.).',
        'Expone `AU_FORM_FIELD` por DI para que el hijo comparta `controlId`, `hintId` y `errorId` en ARIA.',
        'Checkbox y switch mantienen `label` inline en el control; usa `au-form-field` solo para hint y error.',
      ],
      whenToUse: [
        'Campos estándar con etiqueta/hint/error alineados al design system.',
        'Signal forms: `errors` / `invalid` del hijo alimentan la región de error del wrapper.',
        'Ids estables con `[controlIdInput]` opcional.',
      ],
      whenNotToUse: [
        'Checkbox solo con etiqueta inline y sin hint/error → `au-checkbox` sin wrapper.',
        'Layout que no es formulario → no envolver.',
      ],
      anatomy: [
        {
          region: 'Etiqueta',
          detail: '`<label for>` enlazado al `controlId` del hijo.',
        },
        {
          region: 'Control proyectado',
          detail: 'Un solo control enfocable en el slot por defecto.',
        },
        {
          region: 'Hint / error',
          detail: 'Hint en `<p>`; error `role="alert"` con estilos compartidos.',
        },
      ],
      accessibility: [
        'El hijo recibe `aria-describedby` / `aria-errormessage` desde los ids del contexto.',
        'El asterisco de obligatorio es decorativo con texto para lectores de pantalla.',
      ],
      extra:
        '### Exportaciones relacionadas\n\n`AU_FORM_FIELD`, `AuFormFieldContext` — import desde `@aurea-design-system/components`.',
    },
    fieldset: {
      intro: [
        'Agrupa controles relacionados con un `<fieldset>` nativo, `<legend>` opcional y descripción de apoyo.',
        'Usa `[disabled]="true"` para deshabilitar todos los controles anidados de una vez.',
      ],
      whenToUse: [
        'Bloques de dirección, secciones de pago o filtros que pertenecen juntos semánticamente.',
        'Formularios donde una leyenda compartida nombra la región para tecnología asistiva.',
      ],
      whenNotToUse: [
        'Solo agrupación visual → card o divider.',
        'Un solo campo → `au-form-field` suelto.',
      ],
      anatomy: [
        {
          region: 'Leyenda',
          detail: 'Se omite cuando `legend` está vacío.',
        },
        {
          region: 'Descripción',
          detail: 'Texto de ayuda opcional bajo la leyenda.',
        },
        {
          region: 'Slot de contenido',
          detail: 'Proyecta filas `au-form-field` u otros controles.',
        },
      ],
      accessibility: [
        'Semántica nativa `fieldset`/`legend` propagada a inputs anidados.',
        'El estado disabled deshabilita todos los descendientes sin cableado extra.',
      ],
    },
    'input-text': {
      intro: [
        'Control de una línea proyectado dentro de `au-form-field` para etiqueta, hint y error.',
        'Implementa `FormValueControl<string | null>`: enlaza `[formField]` en signal forms o `[(value)]` en modo manual. Un campo vacío se representa como `null`, no como cadena vacía.',
        'Ejemplo completo con `form()`: README del paquete `@aurea-design-system/components` → *Signal forms* (no hay página aparte en Storybook).',
      ],
      whenToUse: [
        'Texto, email, URL, teléfono o búsqueda con la misma cromática que el resto de campos.',
        'Validación con signal forms o `errorMessage` / `invalid` manuales.',
      ],
      whenNotToUse: [
        'Texto multilínea → `au-textarea`.',
        'Contraseña → `au-input-password`.',
        'Elección en lista → `au-select` o `au-autocomplete`.',
      ],
      anatomy: [
        {
          region: '`au-form-field`',
          detail: 'Etiqueta, hint y error fuera del control.',
        },
        {
          region: 'Shell',
          detail: 'Borde, fondo y anillos de foco/error en la fila del input.',
        },
        {
          region: 'Input nativo',
          detail: '`aria-invalid`, `aria-errormessage`, `aria-describedby` vía contexto.',
        },
      ],
      accessibility: [
        'Nombre accesible vía etiqueta visible o `aria-label` externo.',
        'Errores enlazados con `aria-errormessage`; hints con `aria-describedby`.',
      ],
      keyboard: [
        'Tab entra al campo con anillo exterior (`--from-tab`); clic usa anillo interior.',
      ],
      extra:
        '## Signal forms vs manual\n\n| Modo | Dónde | Validación |\n|------|--------|------------|\n| Signal forms | `[formField]` en `au-input-text`; `form()` en tu componente | El esquema define `errors` / `invalid`; `au-form-field` muestra el mensaje |\n| Manual | `[(value)]` + `errorMessage` / `invalid` en `au-form-field` | El padre controla el cromado (story **With error**) |\n\nEjemplo completo con `form()`: README de **`@aurea-design-system/components`** → *Signal forms*.\n\n### Comprobaciones manuales (addon **Accessibility**)\n\n1. **Accessibility** → **Run** en cada story.\n2. Tab en **Password** y revisa anillos de foco teclado vs puntero.\n3. **With error**: el lector debe anunciar `aria-errormessage`.',
    },
    textarea: {
      intro: [
        'Control multilínea proyectado dentro de `au-form-field`; mismos tamaños sm/md/lg que el resto de campos.',
        'Altura mínima controlada por `--au-textarea-min-h-*`; `resize` configurable.',
      ],
      whenToUse: [
        'Comentarios, descripciones largas, notas.',
        'Contenido que no cabe en una sola línea.',
      ],
      whenNotToUse: ['Una sola línea → `au-input-text`.', 'Editor rico → componente de terceros.'],
      anatomy: [
        {
          region: 'Shell',
          detail: 'Igual que campos de una línea.',
        },
        {
          region: '`<textarea>`',
          detail: 'Padding vertical `--au-textarea-pad-y`.',
        },
      ],
      accessibility: [
        'Misma semántica de label, error y hint que input-text.',
        'Contraste de placeholder y hint en tokens de texto terciario.',
      ],
    },
    checkbox: {
      intro: [
        'Casilla booleana con etiqueta y descripción opcional. Soporta `indeterminate` para selección parcial.',
        'Implementa `FormCheckboxControl` para signal forms con `[(checked)]` o `[formField]`.',
      ],
      whenToUse: [
        'Aceptar términos, permisos múltiples independientes.',
        'Patrón «seleccionar todo» con estado indeterminado en el padre.',
      ],
      whenNotToUse: [
        'Un solo on/off de configuración → `au-switch`.',
        'Elección única en lista → `au-radio-group`.',
      ],
      anatomy: [
        {
          region: 'Input nativo',
          detail: 'Checkbox real; estado indeterminado nativo.',
        },
        {
          region: 'Etiqueta / descripción',
          detail: 'Texto principal y secundario.',
        },
      ],
      accessibility: [
        'Asociación label/input con `id`/`for`.',
        'Indeterminado vía propiedad nativa (no `aria-checked` inventado).',
        'Anillo de foco diferenciado teclado vs puntero.',
      ],
    },
    switch: {
      intro: [
        'Interruptor on/off con `role="switch"` sobre checkbox nativo estilizado.',
        'Comparte shell de campo (borde, error, hint) con el resto de formularios.',
      ],
      whenToUse: [
        'Preferencias inmediatas (notificaciones, modo oscuro).',
        'Activar/desactivar una función del sistema.',
      ],
      whenNotToUse: [
        'Varias opciones excluyentes → `au-radio-group`.',
        'Aceptar legal → `au-checkbox`.',
      ],
      anatomy: [
        {
          region: 'Pista y thumb',
          detail: 'Tokens `--au-color-switch-track-*` y thumb.',
        },
        {
          region: 'Label / hint',
          detail: 'Misma estructura que otros campos.',
        },
      ],
      accessibility: [
        '`role="switch"` y estado `aria-checked`.',
        'Contraste pista/thumb documentado en tokens (WCAG UI components).',
      ],
    },
    select: {
      intro: [
        'Desplegable tipo combobox: botón trigger + listbox en portal con teclado completo (flechas, Home/End, Escape).',
        'Opciones tipadas `AuSelectOption[]`; valor del modelo = `value` de la opción, no el label.',
      ],
      whenToUse: [
        'Listas cerradas de 4–20 ítems donde el usuario conoce las opciones.',
        'Formularios que deben enviar un `name` estable en POST.',
      ],
      whenNotToUse: [
        'Búsqueda con filtrado → `au-autocomplete`.',
        'Solo 2–3 opciones visibles → `au-radio-group`.',
      ],
      anatomy: [
        {
          region: 'Trigger',
          detail: 'Muestra label de la opción seleccionada.',
        },
        {
          region: 'Listbox portal',
          detail: 'Highlight vs selected con tokens distintos.',
        },
      ],
      accessibility: [
        'Patrón combobox ARIA (`aria-expanded`, `aria-controls`, `listbox`/`option`).',
        'Opciones deshabilitadas respetan `disabled` en `AuSelectOption`.',
      ],
      keyboard: ['Space/Enter abre; flechas mueven highlight; Enter selecciona; Escape cierra.'],
    },
    autocomplete: {
      intro: [
        'Campo de búsqueda que filtra `AuAutocompleteOption[]` al escribir (insensible a mayúsculas por defecto).',
        'Misma superficie y listbox que `au-select`; `strictSelection` evita valores libres al perder foco.',
      ],
      whenToUse: [
        'Catálogos largos (ciudades, usuarios, SKU).',
        'Cuando el usuario conoce parte del texto a buscar.',
      ],
      whenNotToUse: ['Lista corta fija → `au-select`.', 'Texto libre sin lista → `au-input-text`.'],
      anatomy: [
        {
          region: 'Input de búsqueda',
          detail: 'Combobox con query en tiempo real.',
        },
        {
          region: 'Panel de sugerencias',
          detail: '`noResultsText` cuando el filtro no coincide.',
        },
      ],
      accessibility: ['Combobox con listbox; estado abierto en `data-au-listbox-open`.'],
      keyboard: ['Igual que select; escritura filtra opciones.'],
    },
    avatar: {
      intro: [
        'Muestra una foto de usuario o iniciales derivadas de `name` cuando no hay imagen.',
        'Tamaños xs–xl; `circle` (por defecto, circular) o `square` (cuadrado con esquinas redondeadas).',
      ],
      whenToUse: [
        'Cabeceras de perfil, autores de comentarios o asignados en listas.',
        'Iniciales cuando no hay URL de foto.',
      ],
      whenNotToUse: [
        'Placeholder de carga → `au-skeleton` variante circular.',
        'Marca decorativa sin persona → `au-icon` o SVG propio.',
      ],
      anatomy: [
        {
          region: 'Imagen',
          detail: '`<img>` con `src`; requiere `alt`.',
        },
        {
          region: 'Iniciales',
          detail: 'Dos letras desde la primera/última palabra de `name`.',
        },
      ],
      accessibility: [
        'Con imagen: nombre accesible en `alt`.',
        'Solo iniciales: host `role="img"` y `aria-label` desde `name`.',
        'Usa `decorative` cuando la fila padre expone el nombre.',
      ],
    },
    accordion: {
      intro: [
        'Secciones plegables con patrón WAI-ARIA accordion: `button[auAccordionItem]` y `au-accordion-panel` comparten una clave string.',
        'Enlaza `[(value)]` a la lista de claves expandidas; `[multiple]="false"` para expansión exclusiva.',
      ],
      whenToUse: [
        'FAQ, paneles de ajustes o filtros donde solo parte del contenido debe estar visible.',
        'Formularios largos divididos en secciones escaneables en una página.',
      ],
      whenNotToUse: [
        'Vistas mutuamente excluyentes con chrome de pestañas → `au-tabs`.',
        'Asistente secuencial con validación → `au-steps`.',
      ],
      anatomy: [
        {
          region: '`.au-accordion__item`',
          detail: 'Envuelve cada par trigger + panel.',
        },
        {
          region: '`button[auAccordionItem]`',
          detail: 'Disparador con `aria-expanded` y `aria-controls`.',
        },
        {
          region: '`au-accordion-panel`',
          detail: 'Región con transición de altura; `aria-hidden` e `inert` al colapsar.',
        },
      ],
      accessibility: [
        'Raíz `role="region"` con `aria-label` o labelledby.',
        'Los triggers permanecen en el orden de tabulación; los paneles exponen `aria-labelledby`.',
      ],
      keyboard: [
        'Flecha abajo/arriba mueven el foco entre triggers habilitados.',
        'Home/End saltan al primero/último; Enter/Espacio alternan en el botón.',
      ],
    },
    'radio-group': {
      intro: [
        'Grupo de botones radio nativos dentro de un shell con leyenda. Una sola selección por `name`.',
        'Valor del modelo = `value` de la `AuRadioOption` activa.',
      ],
      whenToUse: [
        '2–5 opciones mutuamente excluyentes visibles sin desplegar.',
        'Planes, métodos de pago, tipo de cuenta.',
      ],
      whenNotToUse: ['Muchas opciones → `au-select`.', 'Booleano → checkbox o switch.'],
      anatomy: [
        {
          region: 'Leyenda',
          detail: 'Label del grupo.',
        },
        {
          region: 'Opciones',
          detail: 'Cada radio con label propio.',
        },
      ],
      accessibility: ['Leyenda asociada; navegación por flechas entre radios del mismo nombre.'],
    },
    'input-number': {
      intro: [
        'Entrada numérica con `min`, `max` y `step`; vacío ↔ `null`.',
        'Botones de incremento/decremento estilizados en el mismo shell de campo.',
      ],
      whenToUse: ['Cantidades, edad, porcentajes con límites conocidos.'],
      whenNotToUse: [
        'Formato moneda con máscara → capa de dominio sobre input-text.',
        'Rango continuo → slider dedicado.',
      ],
      anatomy: [
        {
          region: 'Input `type="number"`',
          detail: 'Parsing a número finito o `null`.',
        },
        {
          region: 'Steppers',
          detail: 'Respetan min/max nativos.',
        },
      ],
      accessibility: ['Label, error y foco como el resto de campos.'],
    },
    slider: {
      intro: [
        'Input nativo `type="range"` estilizado con tokens Aurea y salida de valor opcional.',
        'Implementa `FormValueControl<number>`; proyecta dentro de `au-form-field` para label, hint y errores.',
      ],
      whenToUse: [
        'Volumen, opacidad o cualquier valor continuo acotado donde arrastrar es más rápido que escribir.',
        'Ajustes con min/max visibles y pasos gruesos.',
      ],
      whenNotToUse: [
        'Entrada numérica exacta → `au-input-number`.',
        'Opciones discretas → radio group o select.',
      ],
      anatomy: [
        {
          region: 'Pista',
          detail: 'Relleno según el valor entre min y max.',
        },
        {
          region: 'Thumb',
          detail: 'Control nativo con anillo de foco.',
        },
        {
          region: 'Valor visible',
          detail: 'Región opcional `showValue` enlazada vía `aria-describedby`.',
        },
      ],
      accessibility: [
        'Ids de label y error desde `au-form-field`.',
        'El valor se anuncia cuando `showValue` está activo.',
      ],
      keyboard: ['Las flechas ajustan el valor según el comportamiento nativo del range.'],
    },
    'input-date': {
      intro: [
        'Selector de fecha nativo (`<input type="date">`) con tokens Aurea en icono y popup del SO.',
        'Valor en formato ISO `YYYY-MM-DD` o `null`.',
      ],
      whenToUse: [
        'Fechas de calendario con picker del sistema operativo.',
        'Filtros de rango con `minDate` / `maxDate`.',
      ],
      whenNotToUse: ['Calendario inline personalizado → componente compuesto o librería externa.'],
      anatomy: [
        {
          region: 'Input nativo',
          detail: 'Tokens `--au-color-date-picker-*` para icono y acento.',
        },
      ],
      accessibility: [
        'Label y mensajes de error enlazados; comportamiento nativo del SO para el picker.',
      ],
    },
    'input-time': {
      intro: [
        'Selector de hora nativo (`<input type="time">`) con tokens Aurea en icono y popup del SO.',
        'Valor en formato 24h `HH:mm` o `null`.',
      ],
      whenToUse: [
        'Horas del reloj con picker del sistema operativo.',
        'Filtros de horario laboral con `minTime` / `maxTime`.',
      ],
      whenNotToUse: [
        'Steppers de duración personalizados → componente compuesto o librería externa.',
      ],
      anatomy: [
        {
          region: 'Input nativo',
          detail: 'Tokens `--au-color-date-picker-*` para icono y acento.',
        },
      ],
      accessibility: [
        'Label, hint y errores enlazados vía `au-form-field` (`aria-invalid`, `aria-describedby`).',
        'Icono reloj decorativo (`aria-hidden`); el picker se abre con el control nativo.',
      ],
    },
    'input-password': {
      intro: [
        'Campo de contraseña dedicado con toggle de revelar opcional y cromado Aurea compartido.',
        'Campo de contraseña dedicado con toggle de revelar y autocomplete específico.',
        'Implementa `FormValueControl<string | null>`; vacío ↔ `null`.',
      ],
      whenToUse: [
        'Formularios de inicio de sesión, registro y cambio de contraseña.',
        'Cuando el usuario puede necesitar verificar lo escrito (`showRevealToggle`).',
      ],
      whenNotToUse: ['OTP o PIN de longitud fija → patrón de input especializado.'],
      anatomy: [
        {
          region: 'Input nativo',
          detail: 'Alterna `type="password"` / `type="text"` al revelar.',
        },
        {
          region: 'Control revelar',
          detail: 'Botón icono opcional con `aria-pressed` y etiqueta localizada.',
        },
      ],
      accessibility: [
        'Label, hint y errores enlazados vía `au-form-field`.',
        'El botón de revelar es accesible por teclado; no envía el formulario.',
      ],
    },
    'file-upload': {
      intro: [
        'Zona drag-and-drop con `input[type="file"]` oculto, botón de explorar y lista de archivos removibles.',
        'Implementa `FormValueControl<File[]>`; selección vacía = `[]`.',
      ],
      whenToUse: [
        'Adjuntos, importaciones o subida de medios en formularios.',
        'Cuando conviene soltar archivos sobre un objetivo grande.',
      ],
      whenNotToUse: [
        'Solo captura de cámara → input nativo sin chrome de dropzone.',
        'Selector en la nube → integra el UI de tu proveedor.',
      ],
      anatomy: [
        {
          region: 'Dropzone',
          detail: 'Texto, botón explorar e input file oculto.',
        },
        {
          region: 'Lista',
          detail: 'Nombre, tamaño y quitar por archivo.',
        },
      ],
      accessibility: [
        'El botón explorar es alcanzable por teclado; la dropzone respeta `aria-disabled`.',
        'Los botones quitar exponen `aria-label` por archivo.',
        'La lista usa `aria-live="polite"`.',
      ],
      keyboard: ['Tab al explorar; Enter/Espacio activan el botón.'],
    },
    dialog: {
      intro: [
        'Modal sobre `<dialog>` nativo: backdrop, trampa de foco, cierre por Escape y clic fuera (configurable).',
        'Proyecta cuerpo libre y pie opcional con `auDialogFooter`.',
      ],
      whenToUse: [
        'Confirmaciones destructivas o flujos que requieren decisión explícita.',
        'Formularios cortos que no merecen una ruta nueva.',
      ],
      whenNotToUse: [
        'Confirmación ligera → `au-snackbar` con acción.',
        'Panel lateral persistente → layout propio.',
      ],
      anatomy: [
        {
          region: 'Backdrop',
          detail: 'Mezcla `--au-color-surface-inverted`.',
        },
        {
          region: 'Panel',
          detail: 'Cabecera, cuerpo, pie (`auDialogFooter`).',
        },
      ],
      accessibility: [
        '`aria-labelledby` con `title` o `aria-label`.',
        'Foco inicial dentro del panel; restauración al elemento disparador al cerrar.',
        'Tab cicla dentro del diálogo.',
      ],
      keyboard: ['Escape cierra si `closeOnEscape`.', 'Tab / Shift+Tab atrapados en el panel.'],
    },
    drawer: {
      intro: [
        'Panel lateral sobre `<dialog>` nativo: entra desde `start` o `end`, con trampa de foco y bloqueo de scroll como `au-dialog`.',
        'Proyecta contenido y pie opcional con `[auDrawerFooter]`.',
      ],
      whenToUse: [
        'Navegación móvil, filtros o detalle sin cambiar de ruta.',
        'Flujos secundarios que necesitan más ancho que un popover.',
      ],
      whenNotToUse: [
        'Confirmación centrada → `au-dialog`.',
        'Panel contextual no modal → `au-popover`.',
      ],
      anatomy: [
        {
          region: 'Backdrop',
          detail: 'Overlay atenuado; clic cierra si está habilitado.',
        },
        {
          region: 'Panel',
          detail: 'Cabecera, cuerpo con scroll, pie opcional.',
        },
      ],
      accessibility: [
        '`aria-labelledby` con `title` o `aria-label`.',
        'El foco entra al panel al abrir; se restaura al cerrar.',
      ],
      keyboard: ['Escape cierra con `closeOnEscape`.', 'Tab atrapado dentro del panel.'],
    },
    card: {
      intro: [
        'Superficie agrupada con variantes elevated, outlined y filled. Proyección por regiones: media, cabecera, cuerpo y pie.',
        'El host es un `<article>`: incluye un heading en `auCardHeader` para el outline del documento.',
        'Usa `[interactive]="true"` solo cuando toda la tarjeta sea enlace o destino de clic (refuerzo de borde al hover en elevated).',
      ],
      whenToUse: [
        'Resúmenes de entidad, tiles de dashboard, bloques de configuración.',
        'Tiles clicables con `interactive` y un patrón real de enlace o botón.',
      ],
      whenNotToUse: [
        'Solo separar contenido → `au-divider` o espaciado.',
        'Overlay bloqueante → `au-dialog`.',
      ],
      anatomy: [
        {
          region: 'auCardMedia',
          detail: 'A sangre, fuera del padding interior.',
        },
        {
          region: 'auCardHeader / auCardBody',
          detail: 'Título y contenido con gap `--au-card-main-gap`.',
        },
        {
          region: 'auCardFooter',
          detail: 'Acciones alineadas tras borde superior.',
        },
      ],
      accessibility: [
        'Usa heading en cabecera para jerarquía.',
        'Acciones en footer con botones reales (`au-button`).',
      ],
    },
    tabs: {
      intro: [
        'Pestañas WAI-ARIA: `tablist`, `tab` y `tabpanel`. Solo la pestaña activa está en orden de tabulación (`tabindex="0"`).',
        'Variantes `line` (subrayado) y `contained` (segmented).',
      ],
      whenToUse: [
        'Alternar entre paneles relacionados en la misma página (cuenta, ajustes).',
        'Cuando el usuario no debe navegar a otra URL.',
      ],
      whenNotToUse: [
        'Navegación global de la app → router y menú.',
        'Pasos secuenciales con validación → `au-steps`.',
      ],
      anatomy: [
        {
          region: 'button[auTab]',
          detail: 'Disparadores en el tablist.',
        },
        {
          region: '[auTabPanel]',
          detail: 'Contenido; `hidden` cuando inactivo.',
        },
      ],
      accessibility: [
        '`aria-selected`, `aria-controls`, ids emparejados tab/panel.',
        'Orientación expuesta en el tablist.',
      ],
      keyboard: [
        'Flechas cambian pestaña activa (horizontal o vertical según `orientation`).',
        'Home/End al primer/último tab.',
      ],
    },
    'tag-input': {
      intro: [
        'Campo de texto multi-valor que muestra los valores introducidos como chips removibles.',
        'Implementa `FormValueControl<string[]>`; confirma con Enter, coma o blur.',
      ],
      whenToUse: [
        'Habilidades, temas, destinatarios de correo o tokens de filtro en formularios.',
        'Cuando cada valor debe permanecer visible y eliminarse individualmente.',
      ],
      whenNotToUse: [
        'Un solo valor de texto libre → `au-input-text` o `au-textarea`.',
        'Filtros predefinidos → `au-chip-group`.',
        'Lista removible sin teclear → `au-list` + `au-chip`.',
      ],
      anatomy: [
        {
          region: 'Chips',
          detail: 'Etiquetas removibles con botón de quitar por chip.',
        },
        {
          region: 'Input borrador',
          detail: 'Campo inline para la siguiente etiqueta.',
        },
      ],
      accessibility: [
        'Los botones de quitar exponen `aria-label` vía `removeTagLabel`.',
        'Backspace con borrador vacío elimina la última etiqueta.',
      ],
      keyboard: [
        'Enter o coma confirman el borrador como etiqueta.',
        'Backspace con input vacío elimina la última etiqueta.',
      ],
    },
    chip: {
      intro: [
        'Etiqueta compacta en tres modos: estática, seleccionable (`selectable` + `aria-pressed`) o removible (`removed`).',
        'Variantes filled, outline y accent (resaltado tipo filtro activo).',
      ],
      whenToUse: [
        'Tags, filtros activos, metadatos de ítem.',
        'Selección múltiple de categorías en toolbar.',
      ],
      whenNotToUse: [
        'Acción principal → `au-button`.',
        'Navegación principal → tabs o enlaces.',
        'Filtros seleccionables → `au-chip-group`.',
        'Lista de tags removibles → `au-list`.',
      ],
      anatomy: [
        {
          region: 'Superficie',
          detail: 'Proyección o `label` input.',
        },
        {
          region: 'Botón quitar',
          detail: 'Solo si `removable`; etiqueta `removeLabel` opcional.',
        },
      ],
      accessibility: [
        'Chip removible: botón con nombre accesible.',
        'Selectable: `aria-pressed` sincronizado con `selected`.',
      ],
    },
    snackbar: {
      intro: [
        'Mensaje breve no modal con auto-cierre (`durationMs`), acción opcional y posición en pantalla.',
        'Se teleporta al `body` para no quedar recortado por `overflow`.',
      ],
      whenToUse: [
        'Confirmar guardado, error recuperable, aviso sin bloquear la UI.',
        'Feedback tras una acción donde un diálogo sería pesado.',
      ],
      whenNotToUse: [
        'Decisión obligatoria → `au-dialog`.',
        'Error de formulario en campo → `errorMessage` del campo.',
      ],
      anatomy: [
        {
          region: 'Mensaje',
          detail: 'Input `message` o contenido proyectado.',
        },
        {
          region: 'Acción / cerrar',
          detail: 'Botones opcionales.',
        },
      ],
      accessibility: [
        '`role="status"` o `role="alert"` según variant (warning/error = alert).',
        '`aria-live` acorde; botón cerrar con `closeAriaLabel`.',
      ],
    },
    'chip-group': {
      intro: [
        'Contenedor accesible (`role="group"`) para chips de filtro seleccionables.',
        'Combina con `au-chip` `[selectable]`; no uses listas de tags removibles aquí.',
      ],
      whenToUse: ['Filtros en toolbar (estado, categoría).', 'Toggles independientes en una fila.'],
      whenNotToUse: [
        'Tags removibles → `au-list` + chips `removable`.',
        'Un solo chip → `au-chip` suelto.',
      ],
      anatomy: [
        {
          region: 'Grupo',
          detail: 'Requiere `ariaLabel` o `ariaLabelledBy`.',
        },
      ],
      accessibility: ['Grupo nombrado; chips con `aria-pressed` si son seleccionables.'],
    },
    list: {
      intro: [
        'Lista accesible (`role="list"`) para chips removibles o filas con `auListItem`.',
        'Los chips hijos pasan a `listitem` salvo que sean `selectable`.',
      ],
      whenToUse: [
        'Tags seleccionados que el usuario puede quitar.',
        'Filas horizontales con semántica de lista.',
      ],
      whenNotToUse: ['Filtros toggle → `au-chip-group`.', 'Navegación → tabs o enlaces.'],
      anatomy: [
        {
          region: 'Host lista',
          detail: '`au-list` en fila flex.',
        },
        {
          region: 'Ítems',
          detail: 'Chips `removable` o `<div auListItem>`.',
        },
      ],
      accessibility: ['Indica `ariaLabel` o `ariaLabelledBy`.'],
    },
    message: {
      intro: [
        'Aviso inline (`layout="inline"`) o banner a ancho completo (`layout="banner"`) para estado y avisos.',
        'Variantes semánticas con tokens; icono `au-icon` opcional.',
      ],
      whenToUse: [
        'Errores de formulario encima de campos (`inline`).',
        'Mantenimiento global, facturación o políticas (`banner`).',
      ],
      whenNotToUse: [
        'Toast → `au-snackbar`.',
        'Error de campo → `errorMessage` en `au-form-field`.',
      ],
      anatomy: [
        {
          region: 'Icono',
          detail: 'Glifo de variante si `showIcon` (no en default).',
        },
        {
          region: 'Título / cuerpo',
          detail: '`title` + `message` o slot.',
        },
        {
          region: 'Acciones',
          detail: '`actionLabel` opcional y botón cerrar.',
        },
      ],
      accessibility: ['Error/warning: `role="alert"`.', 'Resto: `role="status"`.'],
    },
    icon: {
      intro: [
        'Glifos SVG compartidos (check, warning, error, info, close, spinner) en sm/md/lg.',
        'Decorativos por defecto — el control padre lleva el nombre accesible.',
      ],
      whenToUse: [
        'Dentro de `au-message`, chips removibles, botones en carga.',
        'Iconografía coherente en el DS.',
      ],
      whenNotToUse: [
        'Iconos de marca → SVG propio.',
        'Botón solo icono → `label` en `au-button`.',
        'Carga standalone → `au-spinner`.',
      ],
      anatomy: [
        {
          region: 'SVG',
          detail: '`data-au-icon` y `data-au-size` en el host.',
        },
      ],
      accessibility: ['Host con `aria-hidden="true"`.'],
    },
    skeleton: {
      intro: [
        'Placeholders de carga: líneas, círculos (avatar), bloques y barra de botón.',
        'Animación pulse o wave; el padre debe marcar `aria-busy` mientras carga.',
      ],
      whenToUse: ['Estados de carga en tarjetas o listas.', 'Cabecera de perfil provisional.'],
      whenNotToUse: [
        'Spinner en botón → `au-button` `loading`.',
        'Indicador inline → `au-spinner`.',
        'Estado vacío → texto visible.',
      ],
      anatomy: [
        {
          region: 'Host',
          detail: '`role="presentation"`; tamaño por variant + `size`.',
        },
      ],
      accessibility: ['Solo decorativo; combina con `aria-busy` en la región de carga.'],
    },
    spinner: {
      intro: [
        'Indicador de carga inline con `role="status"` y `aria-busy="true"`.',
        'SVG de doble anillo: pista tenue y arco animado (~0,9 s). El glifo usa `--au-color-action-primary` por defecto.',
      ],
      whenToUse: [
        'Filas o paneles mientras llegan datos.',
        'Copy de estado visible con `label` cuando hace falta contexto.',
      ],
      whenNotToUse: [
        'Estado de botón en vuelo → `au-button` `loading`.',
        'Porcentaje conocido → `au-progress`.',
        'Placeholders de contenido → `au-skeleton`.',
      ],
      anatomy: [
        {
          region: 'Host `au-spinner`',
          detail: '`role="status"`; `data-au-size` define la escala sm/md/lg.',
        },
        {
          region: 'Anillos',
          detail: 'SVG decorativo con pista + arco animado (`aria-hidden`).',
        },
        {
          region: 'Label',
          detail: 'Copy visible opcional cuando se define `label` (`aria-labelledby`).',
        },
      ],
      accessibility: [
        'Omite `label` para esperas solo con glifo (`aria-label="Loading"`).',
        'Define `label` para mostrar copy visible y nombrar la región viva.',
        'Usa `decorative` dentro de botones u otros controles que ya exponen estado busy.',
      ],
    },
    steps: {
      intro: [
        'Navegación horizontal por secciones: `button[auStep]` + `[auStepPanel]`.',
        '`layout="tabs"` muestra un panel; `layout="sections"` hace scroll a secciones visibles.',
      ],
      whenToUse: [
        'Sitios de documentación (Overview / API / Examples).',
        'Páginas largas con claves de sección.',
      ],
      whenNotToUse: [
        'Nav principal de app → `au-tabs`.',
        'Wizard estricto con pasos completados → stepper dedicado.',
      ],
      anatomy: [
        {
          region: 'Lista de pasos',
          detail: 'Botones horizontales con indicador activo.',
        },
        {
          region: 'Paneles',
          detail: 'Tab panels o regiones siempre visibles.',
        },
      ],
      accessibility: [
        'Layout tabs: tablist + tab + tabpanel.',
        'Layout sections: `aria-current` en el paso activo.',
      ],
      keyboard: ['Flechas, Home y End entre pasos habilitados.'],
    },
    divider: {
      intro: [
        'Separador semántico `role="separator"` horizontal o vertical, con inset y etiqueta opcional centrada.',
      ],
      whenToUse: [
        'Separar secciones de contenido o ítems de lista.',
        'Separador vertical entre grupos en flex.',
      ],
      whenNotToUse: [
        'Solo espacio → utilidades de spacing.',
        'Borde de tarjeta → variant del `au-card`.',
      ],
      anatomy: [
        {
          region: 'Regla',
          detail: 'Línea `--au-color-border-subtle`.',
        },
        {
          region: 'Label',
          detail: 'Solo horizontal; texto entre dos mitades de línea.',
        },
      ],
      accessibility: ['`aria-orientation` según `orientation`.'],
    },
    'description-list': {
      intro: [
        'Contenedor semántico de lista de descripción (`<dl>`) para pares clave–valor.',
        'Compón con `au-description-item` (`term` + descripción proyectada); `<dt>` / `<dd>` nativos para markup avanzado.',
      ],
      whenToUse: [
        'Resúmenes de perfil, detalle de factura, paneles de metadatos.',
        'Detalle de solo lectura junto a formularios o en barras laterales de ajustes.',
      ],
      whenNotToUse: [
        'Campos editables → controles de formulario dentro de `au-form-field`.',
        'Datos tabulares ordenables → `au-table`.',
        'Etiquetas apiladas simples → utilidades tipográficas.',
      ],
      anatomy: [
        {
          region: 'Shell `dl`',
          detail: 'Rejilla CSS según `layout` y `columns`.',
        },
        {
          region: '`au-description-item`',
          detail: 'Renderiza `<dt>` y `<dd>`; host con `display: contents`.',
        },
        {
          region: '`dt` / `dd` nativos',
          detail: 'Proyección opcional para descripciones ricas.',
        },
      ],
      accessibility: [
        'Preserva la semántica nativa de lista para lectores de pantalla.',
        'Cada `dt` debe ir seguido de su `dd` en orden del documento.',
      ],
    },
    'empty-state': {
      intro: [
        'Placeholder centrado cuando una lista, tabla, panel o búsqueda no tiene datos.',
        'Compón con `title`, `description` opcional, media (`icon`, `imageSrc` o `[auEmptyStateMedia]` proyectado) y acciones proyectadas.',
      ],
      whenToUse: [
        'Tabla o lista vacía tras aplicar filtros.',
        'Paneles de primer uso con acción principal (crear, importar, conectar).',
      ],
      whenNotToUse: [
        'Carga → `au-skeleton`.',
        'Estado inline o errores → `au-message`.',
        'Espera en botón o fila → `au-spinner`.',
      ],
      anatomy: [
        {
          region: 'Media',
          detail:
            'Ilustración opcional: icono preset, `imageSrc` o markup custom con `[auEmptyStateMedia]` (gana el primero).',
        },
        {
          region: 'Título',
          detail: 'Encabezado (`headingLevel` 2–4) que nombra la región.',
        },
        {
          region: 'Descripción',
          detail: 'Texto de apoyo bajo el título.',
        },
        {
          region: 'Acciones',
          detail: 'Proyecta botones o enlaces; oculto si está vacío.',
        },
      ],
      accessibility: [
        '`role="region"` con `aria-labelledby` en el título.',
        'Elige `headingLevel` según el outline de la página.',
      ],
    },
    badge: {
      intro: [
        'Etiqueta compacta de estado o contador. Las variantes usan tokens semánticos; el modo punto para indicadores sin texto legible.',
      ],
      whenToUse: [
        'Contadores no leídos, píldoras de estado o categorías junto a títulos o filas.',
        'Punto indicador cuando el significado está claro en el contexto (p. ej. en línea).',
      ],
      whenNotToUse: [
        'Etiquetas removibles o filtros seleccionables → `au-chip` / `au-chip-group`.',
        'Frases completas o alertas descartables → `au-message`.',
      ],
      anatomy: [
        {
          region: 'Host `au-badge`',
          detail: '`data-au-variant`; `data-au-dot` opcional.',
        },
        {
          region: 'Label',
          detail: 'Texto vía `label`; oculto visualmente en modo solo punto.',
        },
      ],
      accessibility: [
        'Combina badges solo-punto con texto visible o nombre accesible en un padre.',
        'Contadores que cambian en vivo: considera `aria-live` en la región padre.',
      ],
    },
    breadcrumb: {
      intro: [
        'Ruta jerárquica con `role="navigation"` y `aria-label="Breadcrumb"`.',
        'Los ítems pueden enlazar (`href`) o representar la página actual como texto.',
      ],
      whenToUse: [
        'Jerarquías profundas donde el usuario necesita contexto y navegación hacia arriba.',
        'Ajustes o documentación con más de dos niveles.',
      ],
      whenNotToUse: [
        'Apps planas de un nivel → omitir breadcrumbs.',
        'Navegación principal → tabs o menú lateral del router.',
      ],
      anatomy: [
        {
          region: 'Lista',
          detail: 'Ruta ordenada con separadores entre ítems.',
        },
        {
          region: 'Ítem enlace',
          detail: 'Tokens de enlace; anillo de foco con teclado.',
        },
        {
          region: 'Página actual',
          detail: 'Último segmento sin `href`; texto enfatizado.',
        },
      ],
      accessibility: [
        'Landmark `navigation` con `aria-label` por defecto.',
        'La página actual es texto, no enlace — evita auto-enlace redundante.',
      ],
      keyboard: [
        'Tab recorre segmentos enlazados; la página actual no está en el orden de tabulación.',
      ],
    },
    link: {
      intro: [
        'Enlace inline con tokens Aurea en `<a auLink>` o `<au-link>`.',
        'Variantes default y subtle; `external` añade `target="_blank"` y `rel="noopener noreferrer"`.',
      ],
      whenToUse: [
        'Navegación inline en párrafos, tablas o mensajes.',
        'Referencias externas con `rel` seguro cuando `external` es true.',
      ],
      whenNotToUse: [
        'Acciones principales → `au-button`.',
        'Ruta de migas → ítems de `au-breadcrumb` con `href`.',
      ],
      anatomy: [
        {
          region: 'Ancla',
          detail: 'Host `au-link` con `data-au-variant`.',
        },
        {
          region: 'Contenido proyectado',
          detail: 'Texto del enlace en el slot por defecto.',
        },
      ],
      accessibility: [
        'Anillo de foco visible (`--au-shadow-focus-ring`) con teclado.',
        'Enlaces externos abren contexto nuevo con `noopener`.',
      ],
      keyboard: ['Enter activa el enlace nativo; Tab sigue el orden del documento.'],
    },
    menu: {
      intro: [
        'Menú desplegable con panel en portal anclado a `auMenuTrigger`.',
        'Usa `[(open)]` para estado controlado; los ítems `au-menu-item` cierran al seleccionar.',
      ],
      whenToUse: [
        'Acciones de fila o barra que no requieren un diálogo completo.',
        'Listas de comandos desde un único disparador.',
      ],
      whenNotToUse: [
        'Filtros o formularios compactos no modales → `au-popover`.',
        'Confirmación bloqueante → `au-dialog`.',
      ],
      anatomy: [
        {
          region: 'Disparador',
          detail: '`auMenuTrigger`; `aria-haspopup="menu"` y `aria-expanded`.',
        },
        {
          region: 'Panel',
          detail: '`.au-floating-panel` en portal; posicionado por overlay.',
        },
        {
          region: 'Ítems',
          detail: 'Botones `au-menu-item`; `select` cierra el menú.',
        },
      ],
      accessibility: [
        'El disparador expone estado expandido mientras está abierto.',
        'Cierra con Escape o clic fuera; devuelve foco según el patrón del overlay.',
      ],
      keyboard: [
        'Disparador: Enter/Espacio alterna; Escape cierra.',
        'Ítems: activación por clic; extiende con tabindex roving si añades patrones compuestos.',
      ],
    },
    popover: {
      intro: [
        'Panel anclado ligero para filtros, ayuda o formularios compactos. Mismo modelo de overlay que `au-menu`.',
        'Disparador `auPopoverTrigger` con `aria-haspopup="dialog"`.',
      ],
      whenToUse: [
        'Filtros o ajustes inline cerca del disparador.',
        'Contenido breve que no es un modal completo.',
      ],
      whenNotToUse: [
        'Ayuda al hover → `auTooltip`.',
        'Flujos destructivos o bloqueantes → `au-dialog`.',
        'Listas de acciones → `au-menu`.',
      ],
      anatomy: [
        {
          region: 'Disparador',
          detail: '`auPopoverTrigger` alterna `[(open)]`.',
        },
        {
          region: 'Panel',
          detail: 'Contenido proyectado en `.au-floating-panel` portaled.',
        },
      ],
      accessibility: [
        '`aria-expanded` del disparador refleja el estado abierto.',
        'Gestiona foco explícitamente si el panel contiene controles de formulario.',
        'Escape y clic fuera cierran.',
      ],
      keyboard: ['El disparador alterna con Enter/Espacio; Escape cierra el panel.'],
      extra:
        '### Controles en paneles\n\nLos controles `au-input-text`, `au-select`, etc. **dentro de `au-form-field`** requieren `AU_FORM_FIELD` por DI.',
    },
    pagination: {
      intro: [
        'Navegación por páginas para tablas y listas. Las páginas son **base 1**; emite `pageChange` al elegir.',
        'Colapsa rangos largos con elipsis cuando `pageCount` > 7.',
      ],
      whenToUse: [
        'Tablas o rejillas paginadas en servidor o cliente.',
        'Cuando el usuario necesita saltar a páginas numeradas.',
      ],
      whenNotToUse: [
        'Feeds con scroll infinito → patrón load-more.',
        'Listas muy pequeñas → mostrar todas las filas.',
      ],
      anatomy: [
        {
          region: 'Nav',
          detail: '`role="navigation"` con `aria-label="Pagination"`.',
        },
        {
          region: 'Anterior / siguiente',
          detail: 'Controles `au-button` ghost.',
        },
        {
          region: 'Botones de página',
          detail: 'Páginas numeradas; la actual con estilo activo.',
        },
      ],
      accessibility: [
        'Landmark de navegación con nombre accesible por defecto.',
        'La página actual debe distinguirse visualmente; `aria-current="page"` en la app si personalizas botones.',
      ],
      keyboard: ['Tab por anterior, números y siguiente; Espacio/Enter activan botones.'],
    },
    progress: {
      intro: [
        'Barra de progreso determinada o indeterminada con `role="progressbar"`.',
        'Modo determinado: `aria-valuenow`, `aria-valuemin`, `aria-valuemax`; `label` opcional para `aria-valuetext`.',
      ],
      whenToUse: [
        'Subidas, tareas multi-paso o porcentaje conocido.',
        'Esperas indeterminadas cuando la duración es desconocida.',
      ],
      whenNotToUse: [
        'Placeholders de contenido → `au-skeleton`.',
        'Estado de botón en vuelo → `au-button` `loading`.',
      ],
      anatomy: [
        {
          region: 'Pista',
          detail: 'Superficie hundida con radio pill.',
        },
        {
          region: 'Barra',
          detail: 'Ancho desde `value`/`max` o animación indeterminada.',
        },
      ],
      accessibility: [
        '`aria-valuetext` desde `label` o porcentaje redondeado.',
        'Modo indeterminado omite min/max/now según práctica ARIA.',
      ],
    },
    table: {
      intro: [
        'Tabla estilo Material: `[data]` + columnas `au-table-column`. Opcional `title`, `description`, `striped`, `compact`, `stickyHeader` y `loading`.',
        'Orden con columnas `sortable`, `[(sort)]` y `clientSort`. Los iconos de orden usan `au-icon` (`sort-asc`, `sort-desc`, `sort-neutral`).',
        'Selección de filas: `selectionMode` (`none` | `single` | `multiple`) con `[(selection)]`, select-all en cabecera (multiple) y clic en fila — checkboxes con `au-checkbox`.',
        'Celdas custom: `ng-template[auTableCell] let-row` en la columna para badges, menús o acciones.',
        'Datos vacíos: proyecta `au-empty-state` como hijo (`size="sm"`, `headingLevel="3"`); si no, se muestra `emptyMessage`.',
      ],
      whenToUse: [
        'Datos tabulares con cabeceras y filas.',
        'Columnas ordenables cuando el padre posee o delega el estado de orden.',
        'Elegir una o varias filas para acciones masivas, paneles de detalle o comparación.',
      ],
      whenNotToUse: [
        'Rejillas solo de maquetación → CSS grid, no tablas.',
        'Listas muy anchas responsive → patrones de tarjetas.',
      ],
      anatomy: [
        {
          region: '`au-table`',
          detail:
            'Shell, cabecera, `<table>`, cuerpo, filas loading/vacío. Host: `data-au-striped`, `data-au-compact`, `data-au-sticky-header`, `data-au-loading`, `data-au-selection`.',
        },
        {
          region: 'Columna de selección',
          detail:
            'Se antepone si `selectionMode` ≠ `none`: checkbox en cabecera (multiple) o etiqueta sr-only (single), checkboxes por fila, `aria-selected` en filas.',
        },
        {
          region: '`au-table-column`',
          detail:
            'Define `name`, `header`, `sortable`, `align`, `cellVariant`, `accessor` opcional.',
        },
        {
          region: '`auTableCell`',
          detail: 'Plantilla opcional para celdas ricas (badges, menús).',
        },
        {
          region: 'Fila vacía',
          detail:
            'Con `data` vacío, proyecta `au-empty-state` para placeholders ricos; si no, `emptyMessage`.',
        },
      ],
      accessibility: [
        'Conserva semántica nativa (`thead`, `tbody`, `th scope`).',
        'Botones de orden reales con `aria-sort` e iconos `au-icon`.',
        'Checkboxes con `selectAllLabel` / `selectRowLabel`; filas con `aria-selected`.',
        'Loading pone `aria-busy` en el host; la fila usa `au-spinner` con `loadingMessage` como `label`.',
      ],
      keyboard: [
        'Tab a botones de orden; Enter/Espacio alternan el ciclo.',
        'Tab a checkboxes de fila; Espacio alterna selección. Clic en fila también alterna si hay selección.',
      ],
    },
    tooltip: {
      intro: [
        'Ayuda contextual en portal al hacer hover o foco en el disparador. Retardos configurables para evitar parpadeos.',
        'No sustituye a una etiqueta visible: el disparador debe tener nombre accesible propio.',
      ],
      whenToUse: ['Iconos de acción sin texto visible.', 'Aclarar un control ya etiquetado.'],
      whenNotToUse: [
        'Información esencial → texto visible o `hint` en el campo.',
        'Contenido largo o interactivo → popover o diálogo.',
      ],
      anatomy: [
        {
          region: 'Disparador',
          detail: 'Elemento con `auTooltip` (p. ej. `au-button`).',
        },
        {
          region: 'Globo',
          detail: 'Clase `.au-tooltip` en `document.body`.',
        },
      ],
      accessibility: [
        '`role="tooltip"` y `aria-describedby` en el host mientras está abierto.',
        'No contiene foco interactivo.',
      ],
    },
  },
} as const satisfies Record<StoryOverviewLocale, Record<string, StoryOverviewSource>>;

/** @deprecated Use STORY_OVERVIEW_SOURCE.en — kept for type inference in tests. */
export const STORY_OVERVIEW_SOURCE_EN = STORY_OVERVIEW_SOURCE.en;
