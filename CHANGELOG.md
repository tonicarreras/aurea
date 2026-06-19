# Changelog

All notable changes to **@aurea-design-system/components** are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).  
Versioning follows [Semantic Versioning](https://semver.org/) — see [VERSIONING.md](./docs/VERSIONING.md).

Git tags for library releases use the prefix **`components-v`** (see [VERSIONING.md](./docs/VERSIONING.md#release-process)).

## [Unreleased]

### Added

- **Architecture docs** — [API_CONVENTIONS.md](./docs/API_CONVENTIONS.md) (native directives vs `au-*` widgets) and [FLOATING_UI.md](./docs/FLOATING_UI.md) (overlay platform + a11y checklist).
- **Vocabulary & composition** — [API_VOCABULARY.md](./docs/API_VOCABULARY.md), [COMPOSITION.md](./docs/COMPOSITION.md), [COMPONENT_CSS_VARS.md](./docs/COMPONENT_CSS_VARS.md), [STYLE_CAPABILITIES.md](./docs/STYLE_CAPABILITIES.md).
- **`au-table-data`** — headless sort/selection helpers exported from the table module; `AuTable` delegates to them.
- **Layout directives** — `[auStack]`, `[auCluster]`, `[auSplit]`, `[auSection]` with internal gap/padding capabilities; styles in `aurea-global.css`.
- **`provideAurea()`** — optional bootstrap override for semantic theme tokens (`actionPrimary`, radii, fonts).
- **`auSpacingValue()`** — shared spacing resolver for layout inputs.
- **Token contract tests** — `*.tokens.spec.ts` for button, card, and input-text.
- **Docs site** — guides `/guides/api-conventions`, `/guides/floating-ui`, `/guides/composition`, `/guides/recipes`; expanded signal-forms guide (nested fields).

### Changed

- **README** / **CONTRIBUTING** / **DESIGN.md** — document hybrid API conventions and link to floating UI guide.
- **Button / native inputs** — base selectors use `:where()` for easier consumer overrides.

## [2.1.2] - 2026-06-19

### Fixed

- **`AuInputDate`** / **`AuInputTime`** — on touch devices (`pointer: coarse`), the native OS date/time picker no longer opens alongside the Aurea panel; coarse-pointer inputs use a read-only guard, `touchstart` interception, and focus returns to the calendar/clock trigger on dismiss (`field-temporal-native-guard`).
- **`AuPopover`** — floating arrow now renders like menu and tooltip; panel scroll moved to an inner `.au-popover__body` so `overflow` no longer clips the shared arrow chrome.
- **Date/time picker (mobile sheet)** — bottom-sheet layout below `42rem` uses opaque dialog surface tokens instead of translucent floating-panel glass, so calendar and time columns are readable over the scrim.
- **`AuInputDate`** / **`AuInputTime`** — anchor and field row stay within the parent in flex/grid layouts; touch icon no longer exceeds field height; picker panel hosts use `display: contents` so they do not widen the control row.

## [2.1.1] - 2026-06-13

### Changed

- **Documentation** — README, `DESIGN.md`, CONTRIBUTING, and library READMEs now describe the five-layer token model (primitives → semantic → roles → domain → high-contrast) and role tokens (`--au-elevation-*`, `--au-focus-*`) instead of legacy shadow primitives.
- **Docs site (EN/ES)** — Themes catalog, per-component Styling tables, ecosystem/design-token guides, and SEO copy aligned with DTCG 2025.10 `*.tokens.json`, `export:tokens` / `validate:tokens`, listbox `--au-field-listbox-gap`, and domain tokens on portaled overlays.
- **Storybook** — Regenerated overview source from updated i18n (`sync:story-overviews`).

## [2.1.0] - 2026-06-17

### Added

- **`FloatingPickerOverlay`** — calendar and time picker panels open as a bottom-sheet modal (backdrop + slide-up) below **`42rem`**; popover positioning on wider viewports. Exported: `FloatingPickerOverlay`, `AU_RESPONSIVE_FLOATING_MODAL_MQ`, `prefersResponsiveFloatingModal`.
- **`FieldListboxOverlay`** — blocks page wheel/touch scroll while **`AuSelect`** / **`AuAutocomplete`** listboxes are open; scrolling inside the listbox still works.
- **`installRootScrollLock`** and **`installModalPageScrollPrevention`** — ref-counted root scroll lock plus wheel/touch guards for modal surfaces.
- **`scrollIntoViewRespectingMotion`** — steps and similar flows honor `prefers-reduced-motion`.

### Changed

- **`AuInputDate`** / **`AuInputTime`** — picker panels use **`FloatingPickerOverlay`**; keyboard activation on the native trigger; transparent WebKit datetime segment backgrounds (no Chromium edit highlight).
- **`AuPopover`** — page scroll prevention and outside-interaction block while open; focus returns to the trigger on close.
- **`AuDialog`** / **`AuDrawer`** — modal scroll lock allows scrolling only inside `.au-dialog__body` / `.au-drawer__body`.
- **`AuDrawer`** — header title and dialog chrome use theme tokens when portaled (`data-au-theme` on the native `<dialog>`).
- **Overlay** — modal backdrop clicks ignore portaled pickers/listboxes inside dialogs; tooltip reposition skips scroll inside anchored content.

### Fixed

- **`AuDrawer`** title low contrast when the portaled theme differs from the page shell (e.g. CRUD demo light preview).
- Date/time picker dismiss on outside scroll; time column scroll no longer closes the panel incorrectly.
- Popover and picker focus/keyboard handling on open and close.

### Migration from 2.0.0

No template changes required. Rebuild global styles if you vendor CSS:

```bash
bun add @aurea-design-system/components@2.1.0
```

## [2.0.0] - 2026-06-13

### Changed (breaking)

- **Native host directives** — primitive controls no longer use custom element selectors. Migrate templates as follows:
  - `<au-button>` → `<button auButton>`
  - `<au-input-text>` → `<input auInputText>`
  - `<au-textarea>` → `<textarea auTextarea>`
  - `<au-input-number>` → `<input auInputNumber>`
  - `<au-input-date>` → `<input auInputDate>`
  - `<au-input-time>` → `<input auInputTime>`
  - `<au-input-password>` → `<input auInputPassword>`
  - `<au-checkbox>` → `<input type="checkbox" auCheckbox>`
  - `<au-switch>` → `<button type="button" auSwitch>`
  - `<au-link>` → `<a auLink>` (custom element removed; attribute-only)
- **`AuButton`** — no `@Output() click`; use native `(click)` on the `<button>` host. Loading/disabled states block activation via capture-phase handler.
- **`AuButtonGroup`** — groups projected **`button[auButton]`** actions (not `<au-button>`).
- **Styles** — control CSS for migrated primitives is bundled via `aurea-global.css` (directives use `@Directive` without `styleUrl`).
- **Peer dependency** — `@angular/*` **^22.0.0** (Angular 22).

### Added

- **`AuFormField`** — optional `hint` in the header; wired to control `aria-describedby`.
- **`AuInputDate`** / **`AuInputTime`** — bounded calendar/time picker panels with `minDate`/`maxDate` and `minTime`/`maxTime`.
- **Overlay scrim** — shared backdrop styling for **`AuDialog`** and **`AuDrawer`**.
- **`AuMenu`** — page scroll prevention while the menu is open.
- **Form field ids** — scoped auto-ids (`au-field-{appId}-{n}`) to avoid duplicate `id` collisions across fields.

### Changed

- **`AuDialog`** / **`AuDrawer`** — scroll lock delegated to native `<dialog>`; backdrop uses overlay scrim CSS.
- **`AuInputPassword`** — reveal toggle integrated in the control shell (single border, visible toggle button).
- **Focus styles** — elevation/focus tokens replace ad-hoc box-shadows on button, checkbox, card, and related controls.
- **Overlay** — modal backdrop clicks no longer propagate to underlying interactive content; floating panels ignore scroll inside allowed regions; tooltip reposition skips internal scroll jitter.

### Fixed

- Time picker column scroll no longer dismisses the panel.
- Tooltip overlay micro-movement when scrolling inside anchored content.

### Migration from 1.6.0

Replace custom-element hosts with native elements + attribute directives. Update button groups and password fields if you still use legacy selectors.

```html
<!-- Before -->
<au-button
  variant="primary"
  (click)="save()"
  >Save</au-button
>
<au-form-field label="Email">
  <au-input-text
    [formField]="form.email"
    type="email"
  />
</au-form-field>
<au-input-password [formField]="form.password" />

<!-- After -->
<button
  auButton
  variant="primary"
  type="button"
  (click)="save()"
>
  Save
</button>
<au-form-field label="Email">
  <input
    auInputText
    type="email"
    [formField]="form.email"
  />
</au-form-field>
<input
  auInputPassword
  [formField]="form.password"
/>
```

```bash
bun add @aurea-design-system/components@2.0.0
```

## [1.6.0] - 2026-06-01

### Added

- **`AuInputPassword`** — dedicated password field with reveal toggle for sign-in flows.
- **`AuButtonGroup`** — groups projected `au-button` actions (`role="group"`); not a form control.
- **`AuDescriptionList`** — semantic `dl` layout with `au-description-item` pairs; horizontal and multi-column modes.
- **`AuDescriptionItem`** — term/description pair (`term` + projected content) inside `au-description-list`.
- **`AuTagInput`** — multi-value tags with removable chips; Enter or comma to add.

### Changed

- Promoted to **stable** (since **1.6.0**) after a11y audit: **`AuInputPassword`**, **`AuButtonGroup`**, **`AuDescriptionList`**, **`AuTagInput`**.
- **`AuInputPassword`** — `revealLabelShow` / `revealLabelHide` for localized reveal toggle labels.
- **`AuTagInput`** — `readOnly` uses native `readonly` (keeps focus order); remove buttons stay disabled when read-only.
- **`AuButtonGroup`** — refactored from segmented `radiogroup` to layout wrapper for `au-button` children.
- **`AuAccordion`** — panel expand/collapse animation (`grid-template-rows`); styles in `aurea-global.css`. **`AuAccordionPanel`** selector is `au-accordion-panel` with `panel` input (replaces `[auAccordionPanel]` attribute).
- **`AuDescriptionList`** — styles in `aurea-global.css`; list renders valid `dl` > `div` > `dt`/`dd` for axe (hidden `au-description-item` hosts).
- **`AuInputText`** — removed `type="password"` and `showPasswordToggle`; use **`AuInputPassword`** for password fields.
- **`AuInputTime`** promoted to **stable** (since **1.5.0**) after a11y audit and axe on Storybook stories.

### Migration from 1.5.0

- Password fields: replace `<au-input-text type="password" …>` with **`<au-input-password>`** (and `revealLabelShow` / `revealLabelHide` for i18n).
- Accordion panels: use **`<au-accordion-panel [panel]="…">`** instead of **`[auAccordionPanel]`** on a generic element.

```bash
bun add @aurea-design-system/components@1.6.0
```

## [1.5.0] - 2026-05-31

### Added

- **`AuInputTime`** (beta) — native `type="time"` field (`FormValueControl<string | null>`) with `minTime` / `maxTime` and `au-form-field` integration.
- **`AuMessage`** — `layout="inline" | "banner"`, optional `actionLabel` / `(action)` for full-width persistent notices.
- **`AuIcon`** — new `clock` glyph for time fields.

### Changed

- Promoted to **stable** (since 0.2.0–0.3.0 beta): **`AuAutocomplete`**, **`AuInputDate`**, **`AuTabs`**, **`AuSteps`**, **`AuChipGroup`**, **`AuList`** — after a11y audit and docs review.
- **`AuSnackbar`** — only the topmost toast in a stack uses an active `aria-live` region; older stacked toasts use `aria-live="off"` (closes **A11Y-001**).
- **`AuChipGroup`** — horizontal scroll row with `scrollIntoView` on chip focus (closes **A11Y-002**).

### Migration from 1.4.0

No breaking API changes. Former **beta** components are now **stable**; **`AuInputTime`** is **beta**. Use `au-message layout="banner"` instead of a separate banner component.

```bash
bun add @aurea-design-system/components@1.5.0
```

## [1.4.0] - 2026-05-31

### Changed

- Promoted to **stable** (since 1.3.0 beta): **`AuAvatar`**, **`AuDrawer`** — after a11y audit and docs review.
- **`AuAvatar`** — `shape` values are `circle` (default) and `square` (rounded corners; replaces confusing `rounded`).
- **`AuDrawer`** — full-viewport overlay (`inset: 0`, `overflow: clip`); panel flush to edge; scroll lock before `showModal()`.

### Migration from 1.3.0

No breaking API changes. If you used `shape="rounded"` on `au-avatar`, rename to **`shape="square"`**.

```bash
bun add @aurea-design-system/components@1.4.0
```

## [1.3.0] - 2026-05-29

### Added

- **`AuAvatar`** (beta) — user image with `alt`, or initials fallback from `name`; sizes xs–xl; `circle` (default) or `square` shape.
- **`AuDrawer`** (beta) — side panel overlay on native `<dialog>` with `start`/`end` position, focus trap, scroll lock, and `[auDrawerFooter]` actions slot.

### Changed

- **`AuDialogFooter`** — selector extended to `[auDrawerFooter]` for drawer footers.

### Migration from 1.2.0

No breaking changes. New components are **beta**.

```bash
bun add @aurea-design-system/components@1.3.0
```

## [1.2.0] - 2026-05-29

### Changed

- Promoted to **stable** (since 1.1.0 beta): **`AuEmptyState`**, **`AuAccordion`**, **`AuFieldset`**, **`AuSlider`**, **`AuFileUpload`** — after a11y audit and docs review.
- **`AuMenu`** — roving `tabindex` on items and first-character typeahead (closes **A11Y-004**).

### Migration from 1.1.0

No breaking API changes. Beta components from **1.1.0** are now **stable**; update maturity badges in your internal catalogs if you gate on `beta`.

```bash
bun add @aurea-design-system/components@1.2.0
```

## [1.1.0] - 2026-05-31

### Added

- **`AuEmptyState`** (beta) — centered placeholder for empty lists, tables, and search results; media via preset `icon`, `imageSrc`, projected `[auEmptyStateMedia]`, projected actions, and configurable heading level.
- **`AuAccordion`** (beta) — collapsible sections with `button[auAccordionItem]` + `au-accordion-panel`, `[(value)]`, and arrow/Home/End keyboard nav.
- **`AuFieldset`** (beta) — native `fieldset` wrapper with `legend`, optional `description`, and `disabled` for grouped fields.
- **`AuSlider`** (beta) — range input (`FormValueControl<number>`) with optional live value, min/max/step, and `au-form-field` integration.
- **`AuFileUpload`** (beta) — drag-and-drop file picker (`FormValueControl<File[]>`) with browse button, accept filter, and removable list.

### Changed

- **`AuTable`** — empty rows accept projected `au-empty-state`; `emptyMessage` remains the text fallback.
- **`AuSpinner`** — default arc color is `--au-color-action-primary` (override with `--au-spinner-arc` or `color` on the host).

### Migration from 1.0.0

No breaking API changes. New components are **beta** (see [component maturity](./projects/components/src/lib/component-maturity.ts)).

```bash
bun add @aurea-design-system/components@1.1.0
```

## [1.0.0] - 2026-05-30

First **stable** release. Meets [V1_CRITERIA.md](./docs/V1_CRITERIA.md). The documented public API in `public-api.ts`, Storybook, and the docs catalog is semver-stable from this version forward; breaking changes require [DEPRECATION.md](./docs/DEPRECATION.md) and a **MAJOR** bump.

### Added

- **`AuSpinner`** — accessible loading indicator (`size`, optional `label`, `decorative` for embedded use). Storybook, docs (EN/ES), and visual smoke coverage.
- Public exports `lockPageScroll` / `unlockPageScroll` for custom overlay flows.

### Changed

- **`AuButton`** loading state uses `au-spinner` (`decorative`, size aligned to button size).
- **`AuTable`**, **`AuSelect`**, and **`AuAutocomplete`** loading UI uses `au-spinner`.
- Shared overlay stack: portaled panels inherit theme context; scroll dismiss and focus behavior aligned across **menu**, **popover**, and **dialog**.
- Governance and design docs moved from repo root to [docs/](./docs/) (index: [docs/README.md](./docs/README.md)).

### Fixed

- Page scroll lock when opening modals/menus (body overflow restored correctly).
- Menu keyboard navigation, scroll-inside-panel dismiss, and overlay detach on destroy.
- Tooltip and card spec assertions; overlay edge cases covered to 100% unit coverage.

### Migration from 0.9.x

No breaking API changes since **0.9.0**. Patch releases **0.9.1** and **0.9.2** on npm were internal/doc fixes without changelog sections; upgrade directly to **1.0.0**:

```bash
bun add @aurea-design-system/components@1.0.0
```

Optional: replace ad-hoc loading markup in app code with `<au-spinner />` where you mirror library loading patterns. Existing component selectors, inputs, and CSS tokens from **0.9.x** remain compatible.

**Beta** components (`autocomplete`, `tabs`, `chip-group`, `list`, `input-date`, `steps`) are unchanged in maturity — usable but not on the docs landing carousel.

## [0.9.0] - 2026-05-22

### API freeze candidate

From this release, the **documented public API** in `public-api.ts`, Storybook, and the docs catalog was treated as frozen until **1.0.0**, except for:

- New **optional** inputs on existing components
- New components in **MINOR** releases
- **Beta** components (`autocomplete`, `tabs`, `chip-group`, `list`, `input-date`, `steps`) may still gain APIs

Breaking changes require [DEPRECATION.md](./docs/DEPRECATION.md) and a **MAJOR** bump.

### Added

- **Phase 4 ecosystem:** Figma/Penpot JSON tokens (`projects/design-tokens/`), `validate:tokens` CI, Material/CDK migration guides, live CRUD reference demo, public roadmap and maturity matrix pages, [V1_CRITERIA.md](./docs/V1_CRITERIA.md), [GOOD_FIRST_ISSUES.md](./docs/GOOD_FIRST_ISSUES.md), [RELEASE.md](./docs/RELEASE.md).
- **Phase 3 quality:** Playwright visual smoke CI, axe-playwright on stable Storybook stories, `bun audit` in CI, GitHub issue templates, expanded CODEOWNERS, DEPRECATION / ANGULAR_COMPATIBILITY / SECURITY / PERFORMANCE docs.
- **Phase 2 components:** `AuMenu`, `AuPopover`, `AuPagination`, `AuTable`, `AuBadge`, `AuBreadcrumb`, `AuProgress`, `AuLink`.
- Public [ROADMAP.md](./docs/ROADMAP.md).
- Component maturity catalog (`COMPONENT_MATURITY`) and docs badges (stable / beta / experimental).
- Density tokens v2: `data-au-density` (`compact` | `comfortable` | `spacious`) and `AuDensityDirective`.
- Experimental high-contrast theme: `data-au-theme="high-contrast"`.
- Adoption guides in the docs site: signal forms, UI patterns, troubleshooting, bundle size.
- `ng add @aurea-design-system/components` schematic (global styles + next steps).
- Governance docs: `CONTRIBUTING.md`, `COMPONENT_DONE.md`, `A11Y_AUDIT.md`, `BUNDLE.md`.

### Changed

- **Maturity:** `menu`, `popover`, and `table` promoted to **stable** (P0 Phase 2).
- Docs landing carousel shows **stable** components only (V1 product criteria).
- `AuTheme` accepts `high-contrast` as a fixed palette mode.
- npm `homepage` points to the docs site.
- Docs component index shows maturity badges and legend.

### Fixed

- `AuButton` click handler stops propagation after emit (carousel / nested interactive regions).
- Docs carousel prev/next buttons expose `aria-controls` for the slide grid (A11Y-003).

## [0.3.0] - 2025-05-01

### Added

- Steps, chip-group, landing docs carousel, signal-form stories coverage expansion.

### Changed

- Angular 22.2 peer dependency alignment.

## [0.2.0] - 2025-04-01

### Added

- Form controls: select, autocomplete, switch, radio-group, input-number, input-date, dialog, snackbar, tabs, list, skeleton.

## [0.1.0] - 2025-03-01

### Added

- Initial public release: button, form-field, input-text, checkbox, card, message, icon, divider, tooltip.

[Unreleased]: https://github.com/tonicarreras/aurea/compare/components-v2.1.2...HEAD
[2.1.2]: https://github.com/tonicarreras/aurea/compare/components-v2.1.1...components-v2.1.2
[2.1.1]: https://github.com/tonicarreras/aurea/compare/components-v2.1.0...components-v2.1.1
[2.1.0]: https://github.com/tonicarreras/aurea/compare/components-v2.0.0...components-v2.1.0
[2.0.0]: https://github.com/tonicarreras/aurea/compare/components-v1.6.0...components-v2.0.0
[1.6.0]: https://github.com/tonicarreras/aurea/compare/components-v1.5.0...components-v1.6.0
[1.5.0]: https://github.com/tonicarreras/aurea/compare/components-v1.4.0...components-v1.5.0
[1.4.0]: https://github.com/tonicarreras/aurea/compare/components-v1.3.0...components-v1.4.0
[1.3.0]: https://github.com/tonicarreras/aurea/compare/components-v1.2.0...components-v1.3.0
[1.2.0]: https://github.com/tonicarreras/aurea/compare/components-v1.1.0...components-v1.2.0
[1.1.0]: https://github.com/tonicarreras/aurea/compare/components-v1.0.0...components-v1.1.0
[1.0.0]: https://github.com/tonicarreras/aurea/compare/components-v0.9.0...components-v1.0.0
[0.9.0]: https://github.com/tonicarreras/aurea/compare/v0.3.0...components-v0.9.0
[0.3.0]: https://github.com/tonicarreras/aurea/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/tonicarreras/aurea/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/tonicarreras/aurea/releases/tag/v0.1.0
