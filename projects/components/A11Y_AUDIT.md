# Accessibility audit — Aurea v0.9

Baseline: **WCAG 2.2 Level AA** for documented **stable** components.  
Last review: **2026-05-29** (1.5.0+: `au-input-time` promoted to stable; axe on date/time stories).

## Summary

| Area                        | Status       | Notes                                                          |
| --------------------------- | ------------ | -------------------------------------------------------------- |
| Focus visibility            | Pass         | `--au-focus-ring-width` + `box-shadow` on interactive controls |
| Color contrast (light/dark) | Pass         | Semantic tokens tuned per theme                                |
| High contrast theme         | Experimental | `high-contrast` / `high-contrast-dark` — manual QA ongoing     |
| Keyboard — buttons, chips   | Pass         | Native focus; chip group scroll-into-view on focus             |
| Keyboard — dialogs / drawer | Pass         | Escape closes; focus trap in `AuDialog` / `AuDrawer`           |
| Keyboard — tabs             | Pass         | Arrow keys between tabs                                        |
| Form errors                 | Pass         | `aria-invalid`, `aria-describedby` via `au-form-field`         |
| Screen reader labels        | Pass         | Visible labels or `aria-label` documented per component        |
| Live regions — snackbar     | Pass         | Only topmost toast in a stack announces (A11Y-001)             |

## Per-component notes

### Stable

- **au-button**: `type="button"` default; loading state uses `aria-busy`.
- **au-form-field**: Associates label, hint, error ids.
- **au-input-text / textarea / select**: Inherit field semantics; native autocomplete respected.
- **au-checkbox / switch / radio-group**: Label click targets; group legends for radio.
- **au-dialog**: `role="dialog"`, `aria-modal`, labelled by header.

### Phase 2 (0.9 stable)

| Component       | Status | Notes                                                          |
| --------------- | ------ | -------------------------------------------------------------- |
| `au-menu`       | Stable | Escape closes; roving `tabindex` + typeahead (1.2.0, A11Y-004) |
| `au-popover`    | Stable | `role="dialog"` non-modal; focus return on close               |
| `au-pagination` | Stable | `aria-current="page"` on active page button                    |
| `au-table`      | Stable | Native table semantics; sort header exposes `aria-sort`        |
| `au-breadcrumb` | Stable | `nav` + `aria-current="page"` on last item                     |
| `au-badge`      | Stable | Decorative when dot-only; pair with visible text when possible |
| `au-progress`   | Stable | `progressbar` + valuemin/max/now                               |
| `au-link`       | Stable | Focus ring; external links get `rel="noopener"`                |

### Stable (1.1.0 → 1.2.0)

| Component        | Status | Notes                                                                 |
| ---------------- | ------ | --------------------------------------------------------------------- |
| `au-empty-state` | Stable | Heading level configurable; not for loading or alerts                 |
| `au-accordion`   | Stable | `button[auAccordionItem]` + `[auAccordionPanel]`; arrow/Home/End keys |
| `au-fieldset`    | Stable | Native `fieldset` + legend/description                                |
| `au-slider`      | Stable | Native range; use inside `au-form-field`                              |
| `au-file-upload` | Stable | Drag-and-drop + browse; label/`controlId` aligned with form-field     |

### Stable (1.3.0 → 1.4.0)

| Component   | Status | Notes                                                                                    |
| ----------- | ------ | ---------------------------------------------------------------------------------------- |
| `au-avatar` | Stable | `alt` on images; initials use `role="img"` + `aria-label`; `decorative` in labelled rows |
| `au-drawer` | Stable | Native modal `<dialog>`; focus trap; Escape/backdrop close; `prefers-reduced-motion`     |

### Stable (1.4.0 → 1.5.0)

| Component         | Status | Notes                                                                                              |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------- |
| `au-autocomplete` | Stable | Listbox `aria-activedescendant`; strict keyboard flows documented                                  |
| `au-input-date`   | Stable | Native date picker; see [input-date ADR](../../docs/decisions/input-date-strategy.md)              |
| `au-input-time`   | Stable | Native time picker; `aria-invalid` / `aria-describedby` via `au-form-field`; decorative clock icon |
| `au-tabs`         | Stable | Selected tab `aria-selected`; arrow-key navigation                                                 |
| `au-steps`        | Stable | Current step exposed to SR; keyboard between steps                                                 |
| `au-chip-group`   | Stable | `role="group"`; horizontal scroll + `scrollIntoView` on focus (A11Y-002)                           |
| `au-list`         | Stable | Removable tags; `auListItem` semantics                                                             |
| `au-snackbar`     | Stable | Stacked toasts: only topmost uses `aria-live` polite/assertive (A11Y-001)                          |

## Known debt (tracked as GitHub issues)

| ID       | Component       | Issue                                                              | Milestone |
| -------- | --------------- | ------------------------------------------------------------------ | --------- |
| A11Y-001 | `au-snackbar`   | ~~Multiple live regions~~ **Fixed** in **1.5.0** (topmost-only)    | —         |
| A11Y-002 | `au-chip-group` | ~~Horizontal scroll keyboard~~ **Fixed** in **1.5.0**              | —         |
| A11Y-003 | Docs site       | ~~Carousel arrows need `aria-controls`~~ **Fixed** in docs landing | —         |
| A11Y-004 | `au-menu`       | ~~Roving tabindex + typeahead~~ **Fixed** in **1.2.0**             | —         |

Issue bodies: [docs/a11y/issue-templates.md](../../docs/a11y/issue-templates.md).

## Testing checklist (manual)

1. Tab through each Storybook story without mouse.
2. VoiceOver (macOS) or NVDA (Windows): form field error after blur.
3. `prefers-reduced-motion: reduce` — no essential motion-only cues.
4. High-contrast theme toggle in app shell — borders and focus ring visible.
5. Stacked snackbars: only the newest toast is announced by screen readers.

## Automated

- Storybook test-runner in CI for smoke interaction tests.
- **CI:** `axe-playwright` runs on stable Storybook stories via test-runner (`stable-story-ids.ts` + tag `stable` on stories).

## Reporting

Open GitHub issues with label `a11y` and reference this table. Fixes to **stable** components are **patch** releases unless they require API changes.
