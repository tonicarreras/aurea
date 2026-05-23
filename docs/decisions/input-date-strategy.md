# ADR: input-date strategy

**Status:** Proposed  
**Date:** 2026-05-23  
**Component:** `au-input-date` (beta since 0.2.0)

## Context

`au-input-date` wraps the native `<input type="date">`. Browser vendors render the picker UI differently (Chrome, Safari, Firefox), which blocks visual consistency and complicates design-system guarantees. The component remains **beta** for this reason.

## Options considered

### 1. Keep native input + UX copy (current)

- **Pros:** Zero bundle cost, strong mobile support, built-in a11y for picker on many platforms.
- **Cons:** Inconsistent styling; hard to meet pixel-perfect DS reviews.

### 2. Custom calendar overlay (Material-style)

- **Pros:** Full visual control; keyboard model can match Aurea tokens.
- **Cons:** Large implementation surface (grid, range, i18n, TZ); ongoing a11y maintenance.

### 3. Popover + native input hybrid

- **Pros:** Native value semantics; optional branded shell using `AuPopover` for hints/format.
- **Cons:** Still relies on native picker for actual date selection on most browsers.

## Recommendation

**Post-1.0:** pursue **option 3** as an incremental improvement (branded field + format hint), then evaluate **option 2** only if adoption feedback requires full calendar parity.

## Exit criteria for stable

1. Documented format/locale behavior in docs (EN/ES).
2. Visual regression snapshot stable across Chromium + WebKit CI.
3. Keyboard path documented: focus → open picker → Escape closes without trap leaks.
4. axe-clean in Storybook stable story.

## References

- [component-maturity.ts](../projects/components/src/lib/component-maturity.ts)
- [A11Y_AUDIT.md](../projects/components/A11Y_AUDIT.md)
- [ROADMAP.md](./ROADMAP.md)
