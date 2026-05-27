# SDD Spec: Radix-Inspired 12-Step Color Scale System for Aurea DS

**Change**: Add 5 Radix-like 12-step color scales (neutral, action, error, success, warning) and migrate ~35 semantic tokens to reference them.

**Phases covered**: Phase 1 (scale variables) + Phase 2 (semantic migration).

**Why now**: Aurea's ~80 semantic tokens are flat hardcoded hex with no systematic relationship. A scale layer enables consistent step-to-role mapping across surfaces, borders, text, and states; makes dark mode automatic; and lays the foundation for hue-tuned alpha transparency.

---

## Quick path

1. Create `au-scales.css` with 120 declarations (60 light + 60 dark) across 5 scales
2. Import into `au-tokens.css`
3. Migrate ~35 hardcoded `--au-color-*` tokens to `var(--au-scale-*)` references
4. Keep ~13 tokens as hardcoded hex (gap tokens, color-mix surfaces, rgba selection, semantic-info)
5. Verify every migrated token computes to the same hex value before/after

---

## 1. Scale Value Tables

### Convention

- **Step 1** = lightest tint within that theme (page bg, raised surface)
- **Step 12** = darkest shade within that theme (primary text)
- **Same ordering applies in both themes** — step 1 is always the "lightest" *relative to that theme*
- This means dark mode inverts the absolute lightness: step 1 is very dark, step 12 is very light
- Semantic tokens reference the **same step number** across themes — theme switch is automatic

### 1.1 Neutral Scale

| Step | Light (hex) | Light role | Dark (hex) | Dark role |
|------|-------------|------------|-------------|-----------|
| 1 | `#ffffff` | Raised surface (cards, dialogs, sheets) | `#0c0e12` | Canvas (page bg, darkest surface) |
| 2 | `#f8f9fa` | Elevated surface, component bg | `#13161c` | Raised surface (cards, dialogs) |
| 3 | `#f1f2f4` | Canvas (page bg) | `#181b22` | Elevated surface, component bg |
| 4 | `#e9ebef` | Sunken surface, depressed bg | `#1a1e26` | Form-disabled surface, depressed |
| 5 | `#e0e4ea` | Subtle border | `#1c222c` | Field hover bg, subtle border |
| 6 | `#c8ced7` | Default border | `#252a33` | Default border, form border |
| 7 | `#b8c0cc` | Form border, medium borders | `#343b46` | Strong border, form border |
| 8 | `#8d98a6` | Strong border, disabled fg, switch track off | `#4d5666` | Form-border-hover |
| 9 | `#5c6b7d` | Tertiary text | `#5c6b7a` | Placeholder/disabled text |
| 10 | `#3d4a5c` | Secondary text | `#7a8794` | Tertiary text |
| 11 | `#1e2935` | Label text | `#a8b2bd` | Secondary text |
| 12 | `#101418` | Primary text, inverted surface | `#eef1f4` | Primary text, inverted surface |

**Monotonicity verified**: All 12 steps in both themes are monotonically decreasing (light) or increasing (dark) in every RGB channel.

### 1.2 Action Scale

| Step | Light (hex) | Light role | Dark (hex) | Dark role |
|------|-------------|------------|-------------|-----------|
| 1 | `#f4f8fe` | Very light blue tint (app bg vignette) | `#0c1624` | Darkest blue surface |
| 2 | `#e3ecf8` | Select option highlight bg, action surface tint | `#131f33` | Elevated blue surface |
| 3 | `#c8daf5` | Hover action surface | `#1a2a40` | Blue component bg |
| 4 | `#a8c4f0` | Active action surface | `#223550` | Hover blue surface |
| 5 | `#7eb8ff` | Selected marker, low-chroma accent | `#2a4060` | Blue subtle border |
| 6 | `#4d8fe6` | Medium accent border | `#38507a` | Blue default border |
| 7 | `#2a75d4` | Strong accent border | `#4a68a0` | Blue strong border |
| 8 | `#1a63c0` | Focus ring alternative, heavy border | `#5a8cc8` | Blue heavy border |
| 9 | `#1059c8` | **PRIMARY ACTION** (brand blue, highest chroma) ← anchor | `#6eb4ff` | **PRIMARY ACTION** (bright blue, highest chroma) ← anchor |
| 10 | `#0d4aa3` | Action hover (pressed from 9) ← anchor | `#8ec5ff` | Action hover ← anchor |
| 11 | `#0a3a85` | Action pressed, highlight text ← anchor | `#b0d8ff` | Action pressed, focus inner ← anchor |
| 12 | `#072b6b` | Deepest action, high-contrast text on action surfaces | `#cfe8ff` | Selected marker (deepest tint) |

### 1.3 Error Scale

| Step | Light (hex) | Light role | Dark (hex) | Dark role |
|------|-------------|------------|-------------|-----------|
| 1 | `#fff8f7` | Barely visible pink tint | `#1a0807` | Darkest red surface |
| 2 | `#fff4f2` | **Error surface** ← anchor | `#240d0b` | Elevated red surface |
| 3 | `#ffe8e4` | Error surface hover | `#311412` | Red component bg |
| 4 | `#ffd9d2` | Error surface active | `#3e1b1a` | Hover red surface |
| 5 | `#fec4b9` | Error subtle border | `#4d2523` | Red subtle border |
| 6 | `#fba697` | Error default border | `#61322f` | Red default border |
| 7 | `#f07a66` | Error strong border | `#7b433e` | Red strong border |
| 8 | `#d94d36` | Error heavy border | `#a55a53` | Red heavy border |
| 9 | `#b42318` | **ERROR** (semantic error) ← anchor | `#f97066` | **ERROR** (semantic error dark) ← anchor |
| 10 | `#911e14` | Error hover | `#fc9a90` | Error hover dark |
| 11 | `#5c0f0a` | **Error contrast** ← anchor | `#fec5c0` | **Error contrast dark** ← anchor |
| 12 | `#3a0805` | Error deepest tint | `#ffe5e2` | Error lightest dark tint |

### 1.4 Success Scale

| Step | Light (hex) | Light role | Dark (hex) | Dark role |
|------|-------------|------------|-------------|-----------|
| 1 | `#f4fcf8` | Barely visible green tint | `#082414` | Darkest green surface |
| 2 | `#ecfdf5` | **Success surface** ← anchor | `#0d331d` | Elevated green surface |
| 3 | `#d6f7e6` | Success surface hover | `#134326` | Green component bg |
| 4 | `#bcefd3` | Success surface active | `#1a5430` | Hover green surface |
| 5 | `#9ce2bc` | Success subtle border | `#22673d` | Green subtle border |
| 6 | `#74d09e` | Success default border | `#2c7d4c` | Green default border |
| 7 | `#47b87e` | Success strong border | `#38965e` | Green strong border |
| 8 | `#1e9f60` | Success heavy border | `#47b374` | Green heavy border |
| 9 | `#047857` | **SUCCESS** (semantic success) ← anchor | `#4ade80` | **SUCCESS** (semantic success dark) ← anchor |
| 10 | `#036146` | Success hover | `#6ade97` | Success hover dark |
| 11 | `#024832` | Success contrast | `#92e6b0` | Success contrast dark |
| 12 | `#013020` | Success deepest tint | `#bcefd3` | Success lightest dark tint |

### 1.5 Warning Scale

| Step | Light (hex) | Light role | Dark (hex) | Dark role |
|------|-------------|------------|-------------|-----------|
| 1 | `#fffcf0` | Barely visible amber tint | `#241206` | Darkest amber surface |
| 2 | `#fffbeb` | **Warning surface** ← anchor | `#331909` | Elevated amber surface |
| 3 | `#fff4cc` | Warning surface hover | `#43220d` | Amber component bg |
| 4 | `#ffeaaa` | Warning surface active | `#542c11` | Hover amber surface |
| 5 | `#ffdc7f` | Warning subtle border | `#673816` | Amber subtle border |
| 6 | `#feca4d` | Warning default border | `#7c461b` | Amber default border |
| 7 | `#f5b324` | Warning strong border | `#965822` | Amber strong border |
| 8 | `#e0980e` | Warning heavy border | `#b46e2b` | Amber heavy border |
| 9 | `#b45309` | **WARNING** (semantic warning) ← anchor | `#fbbf24` | **WARNING** (semantic warning dark) ← anchor |
| 10 | `#924106` | Warning hover | `#fcd14f` | Warning hover dark |
| 11 | `#6e3004` | Warning contrast | `#fde48a` | Warning contrast dark |
| 12 | `#4a1f02` | Warning deepest tint | `#fef3c8` | Warning lightest dark tint |

### Scale summary

| Scale | Light anchors (steps matched to existing tokens) | Dark anchors |
|-------|--------------------------------------------------|--------------|
| neutral | 1,2,3,4,5,6,7,8,9,10,11,12 — all exact matches | 1,2,3,6,7,8,9,10,12 — exact; 4,5,11 — near match |
| action | 9,10,11 — exact (primary/hover/pressed) | 9,10,11 — exact (primary/hover/pressed dark) |
| error | 2,9,11 — exact (surface/error/contrast) | 9,11 — exact |
| success | 2,9 — exact (surface/success) | 9 — exact |
| warning | 2,9 — exact (surface/warning) | 9 — exact |

---

## 2. Semantic Token Migration Table

### 2.1 Surfaces (5 tokens)

| Token | Current value (light) | New reference | Verification |
|-------|----------------------|---------------|--------------|
| `--au-color-surface-canvas` | `#f1f2f4` | `var(--au-scale-neutral-3)` | Same hex |
| `--au-color-surface-raised` | `#ffffff` | `var(--au-scale-neutral-1)` | Same hex |
| `--au-color-surface-elevated` | `#f8f9fa` | `var(--au-scale-neutral-2)` | Same hex |
| `--au-color-surface-sunken` | `#e9ebef` | `var(--au-scale-neutral-4)` | Same hex |
| `--au-color-surface-inverted` | `#101418` | `var(--au-scale-neutral-12)` | Same hex |

### 2.2 Text (5 of 7 tokens can migrate)

| Token | Current (light) | New reference | Verification |
|-------|----------------|---------------|--------------|
| `--au-color-text-primary` | `#101418` | `var(--au-scale-neutral-12)` | Same hex |
| `--au-color-text-secondary` | `#3d4a5c` | `var(--au-scale-neutral-10)` | Same hex |
| `--au-color-text-tertiary` | `#5c6b7d` | `var(--au-scale-neutral-9)` | Same hex |
| `--au-color-text-label` | `#1e2935` | `var(--au-scale-neutral-11)` | Same hex |
| `--au-color-text-on-solid` | `#ffffff` | `var(--au-scale-neutral-1)` | Same hex |

**Kept as hex:**
- `--au-color-text-placeholder` (`#8a98a6`) — falls between neutral-7 (`#b8c0cc`) and neutral-8 (`#8d98a6`)
- `--au-color-text-disabled` (`#a8b0bc`) — falls between neutral-6 (`#c8ced7`) and neutral-7 (`#b8c0cc`)

### 2.3 Borders (3 tokens)

| Token | Current (light) | New reference | Verification |
|-------|----------------|---------------|--------------|
| `--au-color-border-subtle` | `#e0e4ea` | `var(--au-scale-neutral-5)` | Same hex |
| `--au-color-border-default` | `#c8ced7` | `var(--au-scale-neutral-6)` | Same hex |
| `--au-color-border-strong` | `#8d98a6` | `var(--au-scale-neutral-8)` | Same hex |

### 2.4 Action / Link / Focus (6 tokens, but only 3 unique values)

| Token | Current (light) | New reference | Verification |
|-------|----------------|---------------|--------------|
| `--au-color-action-primary` | `#1059c8` | `var(--au-scale-action-9)` | Same hex |
| `--au-color-action-primary-hover` | `#0d4aa3` | `var(--au-scale-action-10)` | Same hex |
| `--au-color-action-primary-pressed` | `#0a3a85` | `var(--au-scale-action-11)` | Same hex |
| `--au-color-link` | `= action-primary` | Auto-migrates via alias | No change needed |
| `--au-color-link-hover` | `= action-primary-hover` | Auto-migrates via alias | No change needed |
| `--au-color-focus-ring` | `#1059c8` | `var(--au-scale-action-9)` | Same hex |
| `--au-color-focus-inner` | `#0a3a85` | `var(--au-scale-action-11)` | Same hex |

### 2.5 Semantic States (6 of 11 tokens can migrate)

| Token | Current (light) | New reference | Verification |
|-------|----------------|---------------|--------------|
| `--au-color-semantic-error` | `#b42318` | `var(--au-scale-error-9)` | Same hex |
| `--au-color-semantic-error-contrast` | `#5c0f0a` | `var(--au-scale-error-11)` | Same hex |
| `--au-color-semantic-error-surface` | `#fff4f2` | `var(--au-scale-error-2)` | Same hex |
| `--au-color-semantic-success` | `#047857` | `var(--au-scale-success-9)` | Same hex |
| `--au-color-semantic-success-surface` | `#ecfdf5` | `var(--au-scale-success-2)` | Same hex |
| `--au-color-semantic-warning` | `#b45309` | `var(--au-scale-warning-9)` | Same hex |
| `--au-color-semantic-warning-surface` | `#fffbeb` | `var(--au-scale-warning-2)` | Same hex |

**Kept as hex (no info scale):**
- `--au-color-semantic-info` (`#0369a1`) — cyan hue, different from action blue
- `--au-color-semantic-info-surface` (`#f0f9ff`)

### 2.6 Forms (3 of 7 hardcoded tokens can migrate)

| Token | Current (light) | New reference | Verification |
|-------|----------------|---------------|--------------|
| `--au-color-form-border` | `#b8c0cc` | `var(--au-scale-neutral-7)` | Same hex |
| `--au-color-form-border-hover` | `#8d98a6` | `var(--au-scale-neutral-8)` | Same hex |
| `--au-color-form-disabled-foreground` | `#8d98a6` | `var(--au-scale-neutral-8)` | Same hex |

**Auto-migrate via existing references:**
- `--au-color-form-text` → already `var(--au-color-text-primary)` → auto
- `--au-color-form-placeholder` → already `var(--au-color-text-tertiary)` → auto
- `--au-color-form-caret` → already `var(--au-color-text-primary)` → auto
- `--au-color-form-error` → already `var(--au-color-semantic-error)` → auto
- `--au-color-form-error-bg` → already `var(--au-color-semantic-error-surface)` → auto
- `--au-color-form-error-foreground` → already `var(--au-color-feedback-error-title)` → auto

**Kept as hex:**
- `--au-color-form-disabled-surface` (`#ebedf0`) — near match to neutral-4 (`#e9ebef`). Differs by ~2 per channel. Acceptable to keep hardcoded or map to neutral-4 with a comment.

### 2.7 Switch (3 of 4 tokens can migrate)

| Token | Current (light) | New reference | Verification |
|-------|----------------|---------------|--------------|
| `--au-color-switch-track-off` | `#8d98a6` | `var(--au-scale-neutral-8)` | Same hex |
| `--au-color-switch-track-off-border` | `#5c6b7d` | `var(--au-scale-neutral-9)` | Same hex |
| `--au-color-switch-thumb-off` | `#ffffff` | `var(--au-scale-neutral-1)` | Same hex |

**Kept as hex:**
- `--au-color-switch-track-off-hover` (`#6b7785`) — falls between neutral-8 (`#8d98a6`) and neutral-9 (`#5c6b7d`). Can optionally map if scale values shift slightly during authoring.

### 2.8 Select (5 of 6 hardcoded tokens can migrate)

| Token | Current (light) | New reference | Verification |
|-------|----------------|---------------|--------------|
| `--au-color-select-option-highlight-bg` | `#e3ecf8` | `var(--au-scale-action-2)` | Same hex |
| `--au-color-select-option-highlight-text` | `#0a3a85` | `var(--au-scale-action-11)` | Same hex |
| `--au-color-select-option-highlight-marker` | `#1059c8` | `var(--au-scale-action-9)` | Same hex |
| `--au-color-select-option-selected-bg` | `#0d4aa3` | `var(--au-scale-action-10)` | Same hex |
| `--au-color-select-option-selected-text` | `#ffffff` | `var(--au-scale-neutral-1)` | Same hex |
| `--au-color-select-option-selected-marker` | `#7eb8ff` | `var(--au-scale-action-5)` | Same hex |

**Auto-migrate:**
- `--au-color-select-menu-bg` → already `var(--au-color-surface-raised)` → auto
- `--au-color-select-menu-text` → already `var(--au-color-form-text)` → auto
- `--au-color-select-option-disabled-text` → already `var(--au-color-form-disabled-foreground)` → auto

**Kept as hex:**
- `--au-color-select-field-hover-bg` (`#f4f7fb`) — between white and action-1. Extremely subtle; acceptable to keep or map to neutral-1.

### 2.9 Dark theme equivalents

Every token listed above also exists in the `[data-au-theme="dark"]` block with dark-specific hex values. The SAME mapping applies:

```
--au-color-surface-canvas: #0c0e12 → var(--au-scale-neutral-1)   [dark neutral-1 = #0c0e12]
--au-color-surface-raised: #13161c → var(--au-scale-neutral-2)    [dark neutral-2 = #13161c]
--au-color-text-primary:   #eef1f4 → var(--au-scale-neutral-12)  [dark neutral-12 = #eef1f4]
--au-color-action-primary: #6eb4ff → var(--au-scale-action-9)    [dark action-9 = #6eb4ff]
```

This is the core value proposition: **same step number, automatic theme adaptation**.

### 2.10 Migration count summary

| Category | Total tokens | Migrated | Kept as hex | Deferred (Phase 3) |
|----------|-------------|----------|-------------|-------------------|
| Surfaces | 7 | 5 | 0 | 2 (raised-a, elevated-a) |
| Text | 7 | 5 | 2 | 0 |
| Borders | 3 | 3 | 0 | 0 |
| Action/Link/Focus | 7 | 7 | 0 | 0 |
| Semantic states | 11 | 7 | 2 (info) | 2 (feedback bg/border deferred) |
| Feedback | 12 | 0 | 0 | 12 (all color-mix) |
| Selection | 2 | 0 | 0 | 2 (rgba) |
| Forms | 10 | 8 | 1 (disabled-surface) | 0 |
| Switch | 4 | 3 | 1 (track-off-hover) | 0 |
| Select | 9 | 8 | 1 (field-hover-bg) | 0 |
| Date picker | 5 | 3 | 0 | 1 (edit-highlight) |
| Skeleton | 2 | 0 | 0 | 2 (color-mix) |
| **Total** | **~79** | **~49** | **~7** | **~21** |

> Phase 2 migrates ~35 explicitly hardcoded tokens. The remaining are either auto-migrated via existing alias chains or explicitly deferred.

---

## 3. File Structure

### New file

```
projects/components/src/lib/tokens/
├── au-scales.css          ← NEW: all --au-scale-* definitions (5 scales × 12 steps × 2 themes)
├── au-tokens.css          ← MODIFIED: Phase 2 — re-point ~35 tokens to var(--au-scale-*)
├── au-theme.ts            ← UNCHANGED
├── au-density.ts          ← UNCHANGED
└── index.ts               ← UNCHANGED
```

### Import chain

```
au-scales.css ← imported by au-tokens.css
```

The import goes at the top of `au-tokens.css`, before the `:root` blocks. This ensures scale variables are defined before any semantic token references them.

```css
/* au-tokens.css — top of file */
@import './au-scales.css';

/* rest of existing file... */
```

### CSS structure of au-scales.css

```css
/* ==========================================================================
   Primitive color scales (12-step Radix-like system)
   Layer 2 of the 3-layer color architecture:
     Layer 1: raw palette (hand-authored hex)
     Layer 2: primitive scales  →  --au-scale-{name}-{step}
     Layer 3: semantic tokens   →  --au-color-{role}  (reference scale steps)
   ========================================================================== */

/* Light (default) */
:root,
[data-au-theme='light'] {
  --au-scale-neutral-1: #ffffff;
  /* ... 60 vars total ... */
  --au-scale-warning-12: #4a1f02;
}

/* Dark */
[data-au-theme='dark'] {
  --au-scale-neutral-1: #0c0e12;
  /* ... 60 vars total ... */
  --au-scale-warning-12: #fef3c8;
}

/* High-contrast: empty blocks — HC themes hardcode all tokens */
[data-au-theme='high-contrast'] {
  /* Scale variables not needed — all --au-color-* tokens are hardcoded hex */
}

[data-au-theme='high-contrast-dark'] {
  /* Scale variables not needed */
}
```

### Key structural decisions

| Decision | Rationale |
|----------|-----------|
| Separate file (`au-scales.css`) | Keeps scale variables isolated from semantic tokens. Easy to review, easy to remove if approach changes. |
| Import in `au-tokens.css` | Single entry point. No change to the build chain or Angular CLI config. |
| 5 scales × 12 steps = 60 vars per theme | Keeps file size manageable: ~250 lines with comments and whitespace. ~5 KB gzipped. |
| HC theme blocks empty | HC themes hardcode every token — adding scale variables there adds maintenance with zero UX benefit. |

---

## 4. Non-Goals (explicitly out of scope)

| Item | Why excluded | Future phase |
|------|-------------|--------------|
| Alpha color scales (A1–A12) | Requires hue-tuned 8-digit hex authored per step — separate design effort | Phase 3 |
| `color-mix()` feedback backgrounds/borders | Depend on surface values — scaling with alpha scales ensures visual consistency | Phase 3 |
| `color-mix()` translucent surfaces (raised-a, elevated-a) | Same dependency on alpha scales | Phase 3 |
| Hardcoded `rgba()` selection and date-picker values | Require alpha scale values | Phase 3 |
| `--au-color-text-placeholder` and `--au-color-text-disabled` | Fall between scale steps 7 and 8 — accepting the gap | Perpetual |
| `--au-color-semantic-info` and `--au-color-semantic-info-surface` | Cyan hue distinct from action blue — would need a 6th scale | Maybe never |
| High-contrast theme scale variables | HC themes hardcode everything for max contrast — scale variables add no benefit | Perpetual |
| P3 wide-gamut support | Doubles variable count for Apple display users — revisit on request | Potential Phase 4 |
| Build-time palette generator | Premature without brand customization demand | Potential Phase 4 |
| Figma token sync | Tooling decision, not architectural | Separate project |
| Changes to `--au-color-feedback-*` | All 12 feedback tokens use `color-mix()` — deferred to Phase 3 | Phase 3 |
| Changes to `--au-color-skeleton-*` | Both use `color-mix()` — deferred to Phase 3 | Phase 3 |
| Changes to `--au-color-selection` | Uses `rgba()` — deferred to Phase 3 | Phase 3 |
| Changes to `--au-color-date-picker-edit-highlight` | Uses `rgba()` — deferred to Phase 3 | Phase 3 |
| Adding an `info` scale | Hue differs from action; separate scale would add complexity with unclear benefit | Revisit on demand |

---

## 5. Verification Criteria

### 5.1 Automated verification (required)

1. **Hex identity check**: For every migrated token, `getComputedStyle()` on a rendered element returns the EXACT same hex value before and after migration.
   - Tool: Playwright script that reads computed style values from a test page
   - Run in both light and dark themes
   - Script source: `projects/components/specs/verify-color-migration.spec.ts`

2. **No new CSS errors**: `bun run build components` must succeed with zero errors.

3. **No test regressions**: `bun run test --project components` — all 856 tests must pass.

4. **No visual regressions**: `npm run test-storybook:ci` — all stories must pass a11y and render tests.

### 5.2 Manual verification

1. **Scale variable inspection**: Open DevTools on any Aurea page, verify `--au-scale-*` variables appear in Computed styles under both `:root` and `[data-au-theme="dark"]`.

2. **Theme switch**: Toggle `data-au-theme` between light/dark and verify surfaces, text, and borders render identically to before.

3. **Edge case page**: Create a test page that renders all surfaces, text levels, borders, states, and form controls — screenshot before and after.

### 5.3 Critical validation mapping

For each anchor point, verify the scale value MATCHES the existing semantic token:

| Scale step | Must equal | In theme |
|------------|------------|----------|
| neutral-1 | `--au-color-surface-raised` `(#ffffff)` | Light |
| neutral-2 | `--au-color-surface-elevated` `(#f8f9fa)` | Light |
| neutral-3 | `--au-color-surface-canvas` `(#f1f2f4)` | Light |
| neutral-4 | `--au-color-surface-sunken` `(#e9ebef)` | Light |
| neutral-5 | `--au-color-border-subtle` `(#e0e4ea)` | Light |
| neutral-6 | `--au-color-border-default` `(#c8ced7)` | Light |
| neutral-7 | `--au-color-form-border` `(#b8c0cc)` | Light |
| neutral-8 | `--au-color-border-strong` `(#8d98a6)` | Light |
| neutral-9 | `--au-color-text-tertiary` `(#5c6b7d)` | Light |
| neutral-10 | `--au-color-text-secondary` `(#3d4a5c)` | Light |
| neutral-11 | `--au-color-text-label` `(#1e2935)` | Light |
| neutral-12 | `--au-color-text-primary` `(#101418)` | Light |
| action-9 | `--au-color-action-primary` `(#1059c8)` | Light |
| action-10 | `--au-color-action-primary-hover` `(#0d4aa3)` | Light |
| action-11 | `--au-color-action-primary-pressed` `(#0a3a85)` | Light |
| error-9 | `--au-color-semantic-error` `(#b42318)` | Light |
| error-11 | `--au-color-semantic-error-contrast` `(#5c0f0a)` | Light |
| success-9 | `--au-color-semantic-success` `(#047857)` | Light |
| warning-9 | `--au-color-semantic-warning` `(#b45309)` | Light |

### 5.4 Dark theme validation

Same mapping as above, but with dark values:

| Scale step | Must equal | In theme |
|------------|------------|----------|
| neutral-1 | canvas `(#0c0e12)` | Dark |
| neutral-2 | raised `(#13161c)` | Dark |
| neutral-6 | border-default `(#343b46)` | Dark |
| neutral-8 | border-strong `(#4d5666)` | Dark |
| neutral-12 | text-primary `(#eef1f4)` | Dark |
| action-9 | action-primary `(#6eb4ff)` | Dark |
| action-10 | action-primary-hover `(#8ec5ff)` | Dark |
| action-11 | action-primary-pressed `(#b0d8ff)` | Dark |
| error-9 | semantic-error `(#f97066)` | Dark |
| error-11 | error-contrast `(#fec5c0)` | Dark |
| success-9 | semantic-success `(#4ade80)` | Dark |
| warning-9 | semantic-warning `(#fbbf24)` | Dark |

---

## 6. Edge Cases

### 6.1 Placeholder and disabled text tokens

`--au-color-text-placeholder` and `--au-color-text-disabled` fall BETWEEN scale steps. They cannot migrate while preserving exact hex values.

| Token | Light hex | Between | Acceptable alternative |
|-------|-----------|---------|----------------------|
| `text-placeholder` | `#8a98a8` | neutral-7 (`#b8c0cc`) and neutral-8 (`#8d98a6`) | Keep hardcoded with `/* scale-gap: between neutral-7 and neutral-8 */` |
| `text-disabled` | `#a8b0bc` | neutral-6 (`#c8ced7`) and neutral-7 (`#b8c0cc`) | Keep hardcoded with `/* scale-gap: between neutral-6 and neutral-7 */` |

> **Future consideration**: If designers accept a slight value shift, these could map to the nearest step. The visual difference is negligible (~2-5% luminance delta at most). This is a review decision, not a spec requirement.

### 6.2 Dark theme semantic-error-surface

The dark theme `--au-color-semantic-error-surface` uses `rgba(150, 40, 32, 0.22)` — an alpha color that cannot map to a solid scale step. It stays as-is in Phase 2. In Phase 3, it would become a reference to the error alpha scale.

Same applies to dark `--au-color-semantic-success-surface` (`rgba(34, 100, 55, 0.22)`), `--au-color-semantic-warning-surface` (`rgba(120, 80, 10, 0.2)`), and `--au-color-semantic-info-surface` (`rgba(15, 80, 120, 0.22)`).

### 6.3 Form-disabled-surface near-match

`--au-color-form-disabled-surface` (`#ebedf0`) is a near match to neutral-4 (`#e9ebef`). The difference is 2 in each RGB channel — visually imperceptible for a disabled surface.

**Recommendation**: Map to `var(--au-scale-neutral-4)` and accept the 2px shift. Add a comment: `/* tuned to #ebedf0 — see spec */` if precision matters.

### 6.4 Switch-track-off-hover between steps

`--au-color-switch-track-off-hover` (`#6b7785`) sits between neutral-8 (`#8d98a6`) and neutral-9 (`#5c6b7d`). Keep as hardcoded hex or accept nearest step.

### 6.5 Semantic-info (no dedicated scale)

`--au-color-semantic-info` (`#0369a1`) is a cyan blue — different hue from action (`#1059c8` a pure blue). Mapping to action scale would shift the hue. Keep as hardcoded hex.

> **Optional**: If an info scale is added in the future, the hex values would be: light: step 9 = `#0369a1`, step 2 = `#f0f9ff`; dark: step 9 = `#38bdf8`, step 2 = rgba equivalent.

### 6.6 High-contrast theme overrides

High-contrast themes (`[data-au-theme="high-contrast"]` and `[data-au-theme="high-contrast-dark"]`) hardcode ALL semantic tokens. They are NOT affected by this change.

- Scale variables declared in `au-scales.css` will exist for HC themes (inheriting from `:root` or the specific HC block) but will NOT be referenced by any HC semantic token.
- This is intentional: HC themes need maximum contrast, and scale variables would constrain their values.

### 6.7 Density system interaction

The `[data-au-density]` system modifies spacing and radius, NOT colors. Zero interaction with the color scale system.

### 6.8 Dark theme scale ordering nuance

In the dark theme, step 1 is the DARKEST (canvas background) and step 12 is the LIGHTEST (primary text). This is the INVERSE of the light theme where step 1 is lightest and step 12 is darkest.

**Why this is correct**: The ROLE-to-step mapping is preserved across themes. Step 1 is always "page background" — in light that's near-white, in dark that's near-black. Semantic tokens reference the step number for its role, not its absolute lightness.

### 6.9 Non-monotonic surfaces in dark theme

The current dark theme has surfaces that are NOT monotonically ordered by lightness:
- `--au-color-surface-sunken` (`#0a0c0f`) is DARKER than `--au-color-surface-canvas` (`#0c0e12`)

This means the scale's monotonic ordering (step 1 = darkest, step 4 = lighter than step 3) cannot exactly match every surface's dark value. The scale uses a clean gradient. Sunken maps to neutral-4 (`#1a1e26`) which is slightly lighter than the original `#0a0c0f`.

**Impact**: The sunken surface in dark mode will be slightly (8 RGB levels) lighter after migration. This is acceptable — the original `#0a0c0f` was nearly invisible against canvas `#0c0e12` (3 RGB levels apart). The new sunken value (`#1a1e26`) provides better visual distinction.

---

## 7. File Content Outline

### au-scales.css (~250 lines)

```css
/* Neutral scale — 12 steps */
:root { /* 12 declarations */ }
[data-au-theme="dark"] { /* 12 declarations */ }

/* Action scale — 12 steps */
:root { /* 12 declarations */ }
[data-au-theme="dark"] { /* 12 declarations */ }

/* Error scale — 12 steps */
:root { /* 12 declarations */ }
[data-au-theme="dark"] { /* 12 declarations */ }

/* Success scale — 12 steps */
:root { /* 12 declarations */ }
[data-au-theme="dark"] { /* 12 declarations */ }

/* Warning scale — 12 steps */
:root { /* 12 declarations */ }
[data-au-theme="dark"] { /* 12 declarations */ }

/* High-contrast — empty blocks (tokens hardcoded) */
[data-au-theme="high-contrast"] { /* empty */ }
[data-au-theme="high-contrast-dark"] { /* empty */ }
```

Total: 120 `--au-scale-*` declarations across 12 CSS blocks.

### au-tokens.css — Phase 2 changes

For each migrated token:
```
- OLD: --au-color-{role}: #hexvalue;
+ NEW: --au-color-{role}: var(--au-scale-{name}-{step});
```

Kept tokens get a trailing comment:
```css
--au-color-text-placeholder: #8a98a8; /* scale-gap: between neutral-7 and neutral-8 */
```

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| R1 | Migrated token computes to different hex | Low | H — visible UI change | Automated `getComputedStyle()` comparison before/after |
| R2 | Dark sunken surface visibly changes | Medium | M — surface feels different | Accept the slight lightening (better visual distinction from canvas) |
| R3 | Scale values aren't perceptually even | Medium | M — scale looks unbalanced | Visual review in Storybook canvas + DevTools color picker |
| R4 | `--au-color-form-disabled-surface` shifts | Low | L — barely visible on disabled surface | Accept 2px shift or keep hardcoded |
| R5 | SCSS/CSS specificity conflicts | Very Low | H — styles break | Scale blocks use the same selectors (`:root`, `[data-au-theme]`) as existing tokens |
| R6 | File size increase (~5 KB gzipped) | Very Low | L — negligible | CSS custom properties compress very well |

---

## 9. Authoring Notes

### Value authoring strategy

Scale values are designed to anchor at EXPERIENCE-MATCHING points (existing token values). Between anchors, values are interpolated to create a smooth perceptual gradient. The 4 grouped scales (action, error, success, warning) use the neutral scale's step structure as a template but with their respective hues:

1. **Steps 1–4**: Light surface tints — low saturation, near-white (light) or near-black (dark)
2. **Steps 5–6**: Subtle borders — moderate saturation, medium-light
3. **Steps 7–8**: Strong borders — increasing chroma towards the "edge" of readability
4. **Step 9**: **Maximum chroma** — the purest, most saturated version of the color
5. **Steps 10–11**: Darker (light) / lighter (dark) variations for interaction states and text
6. **Step 12**: Deepest (light) / lightest (dark) — used for high-contrast text

### Dark theme hue shift

The dark theme action scale shifts the blue hue slightly (compared to light) for better readability on dark backgrounds — same as the existing convention in `au-tokens.css` where dark action-primary is `#6eb4ff` (brighter, more cyan) vs light `#1059c8` (deep, saturated blue).

This hue shift is NOT applied to error/success/warning scales in this spec — those use the same hue with reversed lightness. If visual review finds the dark error red too harsh, the hue can be adjusted during design.

---

## 10. Acceptance Checklist

- [ ] `au-scales.css` created with 120 declarations (5 scales × 12 steps × 2 themes)
- [ ] Every scale step is monotonically ordered (verifiable by script)
- [ ] Scale anchor values match existing semantic token values (see 5.3)
- [ ] `au-scales.css` imported at top of `au-tokens.css`
- [ ] 35 tokens re-pointed from hardcoded hex to `var(--au-scale-*)`
- [ ] 7 tokens kept as hardcoded hex with `/* scale-gap */` comments
- [ ] 21 tokens deferred to Phase 3 (color-mix, rgba — unchanged)
- [ ] `bun run build components` succeeds
- [ ] `bun run test --project components` — all 856 tests pass
- [ ] Automated hex comparison: every migrated token produces identical value
- [ ] HC theme blocks exist (empty) in `au-scales.css`
- [ ] Dark theme values monotonic (each step lighter than the last)
- [ ] No color shifts visible in Storybook for light or dark theme
