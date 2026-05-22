# Accessibility audit — Aurea v0.3

Baseline: **WCAG 2.2 Level AA** for documented **stable** components.  
Last review: 2025-05 (Fase 0).

## Summary

| Area | Status | Notes |
|------|--------|-------|
| Focus visibility | Pass | `--au-focus-ring-width` + `box-shadow` on interactive controls |
| Color contrast (light/dark) | Pass | Semantic tokens tuned per theme |
| High contrast theme | Experimental | `data-au-theme="high-contrast"` — manual QA ongoing |
| Keyboard — buttons, chips | Pass | Native focus; chip group roving tabindex |
| Keyboard — dialogs | Pass | Escape closes; focus trap in `AuDialog` |
| Keyboard — tabs | Pass | Arrow keys between tabs |
| Form errors | Pass | `aria-invalid`, `aria-describedby` via `au-form-field` |
| Screen reader labels | Pass | Visible labels or `aria-label` documented per component |

## Per-component notes

### Stable

- **au-button**: `type="button"` default; loading state uses `aria-busy`.
- **au-form-field**: Associates label, hint, error ids.
- **au-input-text / textarea / select**: Inherit field semantics; native autocomplete respected.
- **au-checkbox / switch / radio-group**: Label click targets; group legends for radio.
- **au-dialog**: `role="dialog"`, `aria-modal`, labelled by header.

### Beta — extra checks recommended

- **au-autocomplete**: Verify listbox `aria-activedescendant` in strict keyboard flows.
- **au-input-date**: Browser-native picker; announce format in app copy.
- **au-tabs**: Ensure selected tab `aria-selected` when dynamically added tabs.
- **au-steps**: Step state should expose current step to SR (roadmap: `aria-current="step"`).

### Known debt (visible)

| ID | Component | Issue | Target |
|----|-----------|-------|--------|
| A11Y-001 | `au-snackbar` | Multiple live regions — verify polite vs assertive | 0.4.0 |
| A11Y-002 | `au-chip-group` | Horizontal scroll + keyboard on mobile | 0.4.0 |
| A11Y-003 | Docs site | Skip link present; carousel arrows need `aria-controls` link to slide | 0.3.1 docs |

## Testing checklist (manual)

1. Tab through each Storybook story without mouse.
2. VoiceOver (macOS) or NVDA (Windows): form field error after blur.
3. `prefers-reduced-motion: reduce` — no essential motion-only cues.
4. High-contrast theme toggle in app shell — borders and focus ring visible.

## Automated

- Storybook test-runner in CI for smoke interaction tests.
- Future: axe-core in test-runner per stable story (Fase 2 roadmap).

## Reporting

Open GitHub issues with label `a11y` and reference this table. Fixes to **stable** components are **patch** releases unless they require API changes.
