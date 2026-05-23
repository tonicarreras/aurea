# Accessibility audit — Aurea v0.9

Baseline: **WCAG 2.2 Level AA** for documented **stable** components.  
Last review: **2026-05-23** (post Phase 4 + menu/popover/table stable).

## Summary

| Area                        | Status       | Notes                                                          |
| --------------------------- | ------------ | -------------------------------------------------------------- |
| Focus visibility            | Pass         | `--au-focus-ring-width` + `box-shadow` on interactive controls |
| Color contrast (light/dark) | Pass         | Semantic tokens tuned per theme                                |
| High contrast theme         | Experimental | `data-au-theme="high-contrast"` — manual QA ongoing            |
| Keyboard — buttons, chips   | Pass         | Native focus; chip group roving tabindex                       |
| Keyboard — dialogs          | Pass         | Escape closes; focus trap in `AuDialog`                        |
| Keyboard — tabs             | Pass         | Arrow keys between tabs                                        |
| Form errors                 | Pass         | `aria-invalid`, `aria-describedby` via `au-form-field`         |
| Screen reader labels        | Pass         | Visible labels or `aria-label` documented per component        |

## Per-component notes

### Stable

- **au-button**: `type="button"` default; loading state uses `aria-busy`.
- **au-form-field**: Associates label, hint, error ids.
- **au-input-text / textarea / select**: Inherit field semantics; native autocomplete respected.
- **au-checkbox / switch / radio-group**: Label click targets; group legends for radio.
- **au-dialog**: `role="dialog"`, `aria-modal`, labelled by header.

### Phase 2 (0.9 stable)

| Component       | Status | Notes                                                              |
| --------------- | ------ | ------------------------------------------------------------------ |
| `au-menu`       | Stable | Escape closes; roving tabindex / typeahead planned 0.10 (A11Y-004) |
| `au-popover`    | Stable | `role="dialog"` non-modal; focus return on close                   |
| `au-pagination` | Stable | `aria-current="page"` on active page button                        |
| `au-table`      | Stable | Native table semantics; sort header exposes `aria-sort`            |
| `au-breadcrumb` | Stable | `nav` + `aria-current="page"` on last item                         |
| `au-badge`      | Stable | Decorative when dot-only; pair with visible text when possible     |
| `au-progress`   | Stable | `progressbar` + valuemin/max/now                                   |
| `au-link`       | Stable | Focus ring; external links get `rel="noopener"`                    |

### Beta — extra checks recommended

- **au-autocomplete**: Verify listbox `aria-activedescendant` in strict keyboard flows.
- **au-input-date**: Browser-native picker; see [input-date ADR](../../docs/decisions/input-date-strategy.md).
- **au-tabs**: Ensure selected tab `aria-selected` when dynamically added tabs.
- **au-steps**: Step state should expose current step to SR (roadmap: `aria-current="step"`).

### Known debt (tracked as GitHub issues)

| ID       | Component       | Issue                                                              | Milestone |
| -------- | --------------- | ------------------------------------------------------------------ | --------- |
| A11Y-001 | `au-snackbar`   | Multiple live regions — verify polite vs assertive                 | 0.10      |
| A11Y-002 | `au-chip-group` | Horizontal scroll + keyboard on mobile                             | 0.10      |
| A11Y-003 | Docs site       | ~~Carousel arrows need `aria-controls`~~ **Fixed** in docs landing | —         |
| A11Y-004 | `au-menu`       | Roving tabindex + typeahead                                        | 0.10      |

Issue bodies: [docs/a11y/issue-templates.md](../../docs/a11y/issue-templates.md).

## Testing checklist (manual)

1. Tab through each Storybook story without mouse.
2. VoiceOver (macOS) or NVDA (Windows): form field error after blur.
3. `prefers-reduced-motion: reduce` — no essential motion-only cues.
4. High-contrast theme toggle in app shell — borders and focus ring visible.

## Automated

- Storybook test-runner in CI for smoke interaction tests.
- **CI:** `axe-playwright` runs on stable Storybook stories via test-runner (`stable-story-ids.ts` + tag `stable` on stories).

## Reporting

Open GitHub issues with label `a11y` and reference this table. Fixes to **stable** components are **patch** releases unless they require API changes.
