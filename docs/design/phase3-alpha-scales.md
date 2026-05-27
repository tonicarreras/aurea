# Phase 3: Radix-like Alpha Scales (A1–A12) — Technical Design

**Status**: Approved · **Delivery**: 120 new CSS variables + 16 changed declarations in `au-tokens.css` + one-time generation script.

Alpha scales add hue-tuned transparency to the Aurea scale system. Feedback backgrounds, text selection, and date-picker highlights migrate from `color-mix`/`rgba` to pure-hue 8-digit hex values composited at the CSS variable level — surface-independent, zero runtime cost.

---

## Quick path

1. **Create** `scripts/generate-alpha-values.mjs` (the one-time generation tool)
2. **Generate** alpha values → paste into new `au-scales.css` section (after solid scales, before HC blocks)
3. **Update** `au-tokens.css` — 16 declarations changed (feedback bg, selection, date picker)
4. **Update** Storybook color-scales stories to show A-scale swatches
5. **Verify** with `ng test components`, Storybook visual review, and the verification checklist below

---

## 1. Script design: `scripts/generate-alpha-values.mjs`

### Purpose

One-time generation tool. NOT a build dependency. Run once, paste output into `au-scales.css`, commit the static CSS.

### Inputs

```js
// Alpha progression (12-step)
const ALPHA = [0.012, 0.031, 0.051, 0.078, 0.122, 0.180, 0.278, 0.447, 0.651, 0.749, 0.878, 0.973];

// Pure hue RGBs — one per scale × theme
const HUES = {
  light: {
    neutral:  [0,   0,   0  ],   // black
    action:   [0,   128, 255 ],   // sky blue
    error:    [224, 0,   48  ],   // pure red
    success:  [0,   179, 104 ],   // pure green
    warning:  [255, 160, 0   ],   // amber
  },
  dark: {
    neutral:  [255, 255, 255 ],   // white
    action:   [0,   80,  204 ],   // dark-adapted blue
    error:    [204, 0,   48  ],   // dark-adapted red
    success:  [0,   153, 85  ],   // dark-adapted green
    warning:  [204, 128, 0   ],   // dark-adapted amber
  },
};
```

### Generation formula

```js
function alphaHex(r, g, b, alphaPercent) {
  const rr = Math.round(r).toString(16).padStart(2, '0');
  const gg = Math.round(g).toString(16).padStart(2, '0');
  const bb = Math.round(b).toString(16).padStart(2, '0');
  const aa = Math.round(alphaPercent * 255).toString(16).padStart(2, '0');
  return `#${rr}${gg}${bb}${aa}`;
}
```

### 8-digit hex validation

Scripted verification: each A-step produces the expected alpha byte:

| Step | Alpha % | ×255 | Rounded | Hex byte |
|------|---------|------|---------|----------|
| A1   | 1.2%    | 3.06 | 3       | `03`     |
| A2   | 3.1%    | 7.91 | 8       | `08`     |
| A3   | 5.1%    | 13.0 | 13      | `0d`     |
| A4   | 7.8%    | 19.9 | 20      | `14`     |
| A5   | 12.2%   | 31.1 | 31      | `1f`     |
| A6   | 18.0%   | 45.9 | 46      | `2e`     |
| A7   | 27.8%   | 70.9 | 71      | `47`     |
| A8   | 44.7%   | 114.0| 114     | `72`     |
| A9   | 65.1%   | 166.0| 166     | `a6`     |
| A10  | 74.9%   | 191.0| 191     | `bf`     |
| A11  | 87.8%   | 223.9| 224     | `e0`     |
| A12  | 97.3%   | 248.1| 248     | `f8`     |

### Output format

Script prints to stdout. Format:

```css
/* Neutral alpha scale */

:root {
  --au-scale-neutral-A1: #00000003;
  --au-scale-neutral-A2: #00000008;
  ...
  --au-scale-neutral-A12: #000000f8;
}

[data-au-theme='dark'] {
  --au-scale-neutral-A1: #ffffff03;
  --au-scale-neutral-A2: #ffffff08;
  ...
  --au-scale-neutral-A12: #fffffff8;
}

/* Action alpha scale */
...same pattern for action, error, success, warning
```

Scale order: **neutral, action, error, success, warning** (matches solid scales).

### Script design decisions

| Concern | Decision |
|---------|----------|
| **File name** | `scripts/generate-alpha-values.mjs` — ESM, zero dependencies |
| **Dev dependencies** | None (uses `node:process` only) |
| **Invocation** | `node scripts/generate-alpha-values.mjs` → stdout |
| **Output size** | 120 declarations (5 scales × 12 steps × 2 themes) + section headers |
| **Commit to repo?** | Yes — the script IS committed. It documents the derivation of values. Generated output is also committed (as CSS). |
| **Re-generation** | If pure hues or alpha progression change, re-run script, update CSS, commit both |

---

## 2. File architecture

### au-scales.css — new sections

All alpha variables go in `au-scales.css` after the solid scales, before the HC empty-block section (line ~184):

```
...solid scales (lines 1–183)
/* ==========================================================================
   Neutral alpha scale (A1–A12)
   ========================================================================== */

:root { ... }

[data-au-theme='dark'] { ... }

/* ==========================================================================
   Action alpha scale (A1–A12)
   ========================================================================== */
...

/* ==========================================================================
   High-contrast themes — empty (all tokens hardcoded in au-tokens.css)
   ========================================================================== */

[data-au-theme='high-contrast'] {}
[data-au-theme='high-contrast-dark'] {}
```

**HC themes**: alpha scale blocks are empty for high-contrast. HC themes hardcode their own values. This is the same pattern as the solid scales.

### Variable count

- Solid scales (existing): 120 vars (5 scales × 12 steps × 2 themes)
- Alpha scales (new): 120 vars (5 scales × 12 steps × 2 themes)
- **Total au-scales.css**: 240 variables

---

## 3. Migration: `au-tokens.css` (16 declarations)

### 3A. Feedback backgrounds (8 declarations)

Current: `color-mix(in srgb, var(--au-color-semantic-*) X%, var(--au-color-surface-*))`  
New: `var(--au-scale-{name}-A5)`

All feedback backgrounds use **A5** (12.2% opacity). Pure hue at A5 produces similar perceptual weight to the current desaturated color-mix at 24–28%.

| Token | Light (current) | Light (new) | Dark (current) | Dark (new) |
|-------|----------------|-------------|----------------|-------------|
| `--au-color-feedback-success-bg` | color-mix(success 28%, surface-raised) | `var(--au-scale-success-A5)` | color-mix(success 24%, surface-elevated) | `var(--au-scale-success-A5)` |
| `--au-color-feedback-warning-bg` | color-mix(warning 30%, surface-raised) | `var(--au-scale-warning-A5)` | color-mix(warning 26%, surface-elevated) | `var(--au-scale-warning-A5)` |
| `--au-color-feedback-error-bg` | color-mix(error 26%, surface-raised) | `var(--au-scale-error-A5)` | color-mix(error 24%, surface-elevated) | `var(--au-scale-error-A5)` |
| `--au-color-feedback-info-bg` | color-mix(info 28%, surface-raised) | `var(--au-scale-action-A5)` | color-mix(info 24%, surface-elevated) | `var(--au-scale-action-A5)` |

**Key changes**:
- Info uses **action** scale (Aurean blue, not info cyan). There is no info scale — using action consolidates color usage. The visual result changes intentionally (less cyan, more sky blue).
- Dark theme references the SAME `-A5` variable — the scale automatically resolves to `#0050cc1f` in dark mode because `[data-au-theme='dark']` wins in the cascade.
- **HC themes**: keep solid hex — no change.

### 3B. Selection (4 declarations)

Current: `rgba(...)`  
New: `var(--au-scale-action-A{step})`

| Theme | Current | Alpha | New var | Alpha match |
|-------|---------|-------|---------|-------------|
| Light | `rgba(16,89,200,0.2)` | 20% | `var(--au-scale-action-A6)` | 18.0% — close match; pure hue needs slightly less opacity |
| Dark | `rgba(110,180,255,0.28)` | 28% | `var(--au-scale-action-A7)` | 27.8% — near-identical |
| HC | `rgba(16,89,200,0.28)` | 28% | `var(--au-scale-action-A7)` | 27.8% — near-identical |
| HC-dark | `rgba(110,180,255,0.35)` | 35% | `var(--au-scale-action-A8)` | 44.7% — higher opacity compensates for HC dark background |

### 3C. Date picker edit highlight (4 declarations)

Current: `rgba(...)` in `au-tokens.css`  
New: `var(--au-scale-action-A{step})`

| Theme | Current | Alpha | New var | Alpha match |
|-------|---------|-------|---------|-------------|
| Light | `rgba(16,89,200,0.14)` | 14% | `var(--au-scale-action-A5)` | 12.2% — close match |
| Dark | `rgba(110,180,255,0.22)` | 22% | `var(--au-scale-action-A6)` | 18.0% — slightly lower, check in Storybook |
| HC | `rgba(16,89,200,0.2)` | 20% | `var(--au-scale-action-A7)` | 27.8% — higher for HC visibility |
| HC-dark | `rgba(110,180,255,0.25)` | 25% | `var(--au-scale-action-A7)` | 27.8% — close match |

### Change summary

| File | Additions | Changes | Notes |
|------|-----------|---------|-------|
| `au-scales.css` | +120 alpha vars | — | New sections after solid scales |
| `au-tokens.css` | — | 16 lines | 8 feedback bg + 4 selection + 4 date picker |
| `scripts/generate-alpha-values.mjs` | New file | — | One-time generation tool |

---

## 4. Backward compatibility

### Consumer overrides

Consumers override at the semantic level — no change from Phase 1/2:

```css
/* Consumer override — still works exactly as before */
:root {
  --au-color-feedback-success-bg: #e6f4e6; /* replaces the A5 reference */
}
```

The CSS cascade is identical: `var(--au-color-feedback-success-bg)` resolves whatever the consumer sets on `:root`. There is no indirection leak.

### Surface independence

This is the key behavioral change and it's **intentional**:

- **Before**: `color-mix(success-9 28%, surface-raised)` — the result depends on which surface it's mixed with. Feedback background changes hue when placed on `canvas` vs `raised` vs `elevated`.
- **After**: `var(--au-scale-success-A5)` → `#00b3681f` — pure green at 12.2% composited by the browser over whatever background it sits on. The hue is pure green regardless of surface.

### What stays as-is

| Token | Reason |
|-------|--------|
| `--au-color-surface-raised-a` / `-elevated-a` | Glassmorphism needs the surface color to carry through |
| `--au-color-skeleton-base` / `-shimmer` | Intentionally surface-matched |
| `--au-color-feedback-*-border` | Borders blend against the feedback bg, not arbitrary backgrounds |
| `--au-shadow-button-primary` | Shadow color — different domain |
| HC feedback bg colors | Solid hex — no transparency in HC |

---

## 5. Verification strategy

### 5.1 Script correctness

```bash
# Run the script, capture output
node scripts/generate-alpha-values.mjs > /tmp/alpha-test.css

# Verify first neutral A1 value
grep 'neutral-A1' /tmp/alpha-test.css
# Expected: --au-scale-neutral-A1: #00000003;  (light)
# Expected: --au-scale-neutral-A1: #ffffff03;  (dark)

# Spot-check by hand:
# neutral light × A1: rgb(0,0,0) × 1.2% = #00000003
# neutral dark × A12: rgb(255,255,255) × 97.3% = #ffffffF8
# action light × A5:  rgb(0,128,255) × 12.2% = #0080FF1F
```

### 5.2 CSS integrity (unit tests)

Extend `au-scales.spec.ts` to add alpha-scale test blocks (LIGHT_ALPHA_VARS and DARK_ALPHA_VARS) following the same pattern as the solid scales. The test validates:

1. Every declared alpha variable produces the expected computed value
2. Count is 60 per theme (5 scales × 12 steps)
3. Build compiles (styleUrl resolution gate)

Expected values for the spec tests are generated by running the script and copying the output into the test file.

### 5.3 Visual review (Storybook)

1. **Color Scales story** — add an "Alpha Scales" section showing A1–A12 swatches for each scale against a checkerboard or multi-surface background to demonstrate the hue-tuned transparency
2. **Message stories** — verify feedback backgrounds (success, warning, error, info) render on `surface-raised` (default) and on `surface-canvas` (edge case — should look consistent)
3. **Snackbar stories** — same surface-independence check
4. **Input date story** — verify edit highlight is visible and meets WCAG contrast for the date text
5. **Text selection** — manually test `::selection` color against various text backgrounds

### 5.4 High-contrast

- HC selection: verify `rgba(16,89,200,0.28)` → `var(--au-scale-action-A7)` produces no visual regression
- HC dark selection: verify `rgba(110,180,255,0.35)` → `var(--au-scale-action-A8)` is still readable
- HC feedback backgrounds: confirm SOLID hex values are unchanged (not accidentally migrated)

### 5.5 Build + CI

```bash
ng build components
ng test components --no-watch
npm run test-storybook:ci   # if stories changed
```

### 5.6 Acceptance checklist

- [ ] 120 alpha scale variables generated and added to `au-scales.css`
- [ ] A-step suffix matches expected alpha byte (03, 08, 0d, 14, 1f, 2e, 47, 72, a6, bf, e0, f8)
- [ ] All 8 feedback bg declarations migrated to `var(--au-scale-*-A5)` (success, warning, error, info)
- [ ] Info uses action scale (no info scale exists yet)
- [ ] All 4 selection declarations migrated (`A6` light, `A7` dark, `A7` HC, `A8` HC-dark)
- [ ] All 4 date picker edit highlight declarations migrated (`A5` light, `A6` dark, `A7` HC, `A7` HC-dark)
- [ ] HC feedback backgrounds remain solid hex (unchanged)
- [ ] `ng build components` passes
- [ ] `ng test components --no-watch` passes (updated spec)
- [ ] Feedback backgrounds look consistent across `surface-raised` and `surface-canvas` in Storybook
- [ ] Date picker edit highlight renders in input-date story
- [ ] Script committed for future re-generation

---

## 6. Edge cases and risks

### 6.1 Info feedback background uses action hue

`--au-color-feedback-info-bg` changes from info-cyan (`#0369a1` / `#38bdf8`) to sky blue (`#0080ff` / `#0050cc`) via the action scale. This is a deliberate design decision: info is semantically "informational blue" and the action scale is the system's blue axis. If the brand requires a true cyan info color in the future, Phase 4 (info/cyan scale) should resolve this.

### 6.2 Dark mode pure hues are theoretical

The dark pure hues (e.g. action dark: `#0050cc`) are estimated by reducing lightness of the light pure hue while maintaining saturation. These should be visually verified in Storybook during implementation. If a dark pure hue looks perceptually off, adjust the RGB values, re-run the script, and re-paste.

### 6.3 Date picker dark edit highlight (A6 = 18% vs current 22%)

`--au-color-date-picker-edit-highlight` in dark moves from 22% to 18% opacity (A6). If this looks too faint against the dark elevated background, bump to A7 (27.8%). The spec lists the best-guess step; validate in Storybook and adjust if needed.

### 6.4 HC-dark selection (A8 = 44.7% vs current 35%)

Moving from `rgba(110,180,255,0.35)` to `var(--au-scale-action-A8)` (44.7%). This is a higher opacity than current. Verify the selection background doesn't obscure the selected text in HC-dark. If too strong, use a one-off hardcoded value instead.

---

## 7. Storybook update

The `color-scales.stories.ts` story should gain a second block after the solid scales showing the alpha scales. The alpha block should:

- Use a checkerboard/grid pattern background so the alpha transparency is visible
- Group by scale (neutral, action, error, success, warning)
- Show A1–A12 labels per column
- Use two rows: light theme and dark theme

This helps designers and developers understand what each alpha step looks like in context.
