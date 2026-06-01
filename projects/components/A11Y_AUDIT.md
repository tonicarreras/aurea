# Accessibility audit

Baseline: **WCAG 2.2 Level AA** for **stable** components.  
Last review: **2026-05-29** (1.5.0: full stable catalog; axe on date/time stories).

## Summary

| Area                | Status       | Notes                                                |
| ------------------- | ------------ | ---------------------------------------------------- |
| Focus visibility    | Pass         | `--au-shadow-focus-ring` on interactive controls     |
| Color contrast      | Pass         | Semantic tokens per light/dark theme                 |
| High contrast theme | Pass         | `high-contrast` / `high-contrast-dark` — stable tokens |
| Keyboard            | Pass         | Documented per component in docs overviews           |
| Form errors         | Pass         | `aria-invalid`, `aria-describedby` via form-field    |
| Live regions        | Pass         | Stacked snackbars: topmost only announces (A11Y-001) |

Per-component keyboard and ARIA notes: docs site overviews (`/en/components/:slug`) and Storybook Autodocs.

## Resolved debt

| ID       | Fix                                       |
| -------- | ----------------------------------------- |
| A11Y-001 | Snackbar: single active `aria-live` stack |
| A11Y-002 | Chip group: `scrollIntoView` on focus     |
| A11Y-003 | Docs carousel: `aria-controls` on arrows  |
| A11Y-004 | Menu: roving tabindex + typeahead (1.2.0) |

## Manual QA (before promoting to stable)

1. Tab through Storybook stories without mouse.
2. Screen reader: field error after blur.
3. `prefers-reduced-motion: reduce` — no motion-only essential cues.
4. High-contrast theme — borders and focus ring visible.

## Automated CI

- `bun run test-storybook:ci` — interaction tests + **axe-playwright** on stable stories (`stable-story-ids.ts`, tag `stable` via `bun run tag:stories`).
- `bun run test:coverage` — 100% unit coverage on `src/lib`.

Report regressions with GitHub label `a11y`. Stable component fixes ship as **patch** unless API changes.
