# Phase 3: Radix-like Alpha Scales (A1–A12) for Aurea

**Exploration — pre-SDD discovery for Phase 3 of the color architecture overhaul**

---

## 1. Target Token Inventory

18 token declarations across 4 themes use transparency. Here's every one, grouped by category.

### 1.1 Translucent surfaces (color-mix with transparent)

Used by `.au-floating-panel` background (glassmorphism with `backdrop-filter: blur(12px)`).

| Token | Light | Dark |
|-------|-------|------|
| `--au-color-surface-raised-a` | `color-mix(surface-raised 85%, transparent)` | `color-mix(surface-raised 80%, transparent)` |
| `--au-color-surface-elevated-a` | `color-mix(surface-elevated 85%, transparent)` | `color-mix(surface-elevated 80%, transparent)` |

HC/HC-dark: hardcoded hex, no transparency.

### 1.2 Skeleton (color-mix text-primary + surface)

| Token | Light | Dark |
|-------|-------|------|
| `--au-color-skeleton-base` | `color-mix(text-primary 11%, surface-raised)` | `color-mix(text-primary 10%, surface-raised)` |
| `--au-color-skeleton-shimmer` | `color-mix(text-primary 5%, surface-raised)` | `color-mix(text-primary 20%, surface-raised)` |

Consumed by: `<au-skeleton>`.

### 1.3 Feedback backgrounds (color-mix semantic + surface)

Used by `<au-message>` and `<au-snackbar>`.

**Light** (mixed with `surface-raised`):

| Token | Semantic | Opacity | Surface |
|-------|----------|---------|---------|
| `--au-color-feedback-success-bg` | success-9 (#047857) | 28% | surface-raised |
| `--au-color-feedback-warning-bg` | warning-9 (#b45309) | 30% | surface-raised |
| `--au-color-feedback-error-bg` | error-9 (#b42318) | 26% | surface-raised |
| `--au-color-feedback-info-bg` | info (#0369a1) | 28% | surface-raised |

**Dark** (mixed with `surface-elevated`):

| Token | Semantic | Opacity | Surface |
|-------|----------|---------|---------|
| `--au-color-feedback-success-bg` | success-9 (#4ade80) | 24% | surface-elevated |
| `--au-color-feedback-warning-bg` | warning-9 (#fbbf24) | 26% | surface-elevated |
| `--au-color-feedback-error-bg` | error-9 (#f97066) | 24% | surface-elevated |
| `--au-color-feedback-info-bg` | info (#38bdf8) | 24% | surface-elevated |

HC/HC-dark: solid hex, no transparency.

### 1.4 Feedback borders (color-mix semantic + border-default)

**Light** (mixed with `border-default` = neutral-7 = #b8c0cc):

| Token | Semantic | Opacity |
|-------|----------|---------|
| `--au-color-feedback-success-border` | success-9 (#047857) | 44% |
| `--au-color-feedback-warning-border` | warning-9 (#b45309) | 46% |
| `--au-color-feedback-error-border` | error-9 (#b42318) | 44% |
| `--au-color-feedback-info-border` | info (#0369a1) | 44% |

**Dark** (mixed with `border-default` = neutral-6 = #252a33):

| Token | Semantic | Opacity |
|-------|----------|---------|
| `--au-color-feedback-success-border` | success-9 (#4ade80) | 50% |
| `--au-color-feedback-warning-border` | warning-9 (#fbbf24) | 52% |
| `--au-color-feedback-error-border` | error-9 (#f97066) | 50% |
| `--au-color-feedback-info-border` | info (#38bdf8) | 50% |

HC/HC-dark: solid hex, no transparency.

### 1.5 Selection (hardcoded rgba)

| Theme | Value | α |
|-------|-------|---|
| Light | `rgba(16, 89, 200, 0.2)` | 20% |
| Dark | `rgba(110, 180, 255, 0.28)` | 28% |
| HC | `rgba(16, 89, 200, 0.28)` | 28% |
| HC-dark | `rgba(110, 180, 255, 0.35)` | 35% |

Used by `::selection` in au-tokens.css.

### 1.6 Date picker edit highlight (hardcoded rgba)

| Theme | Value | α |
|-------|-------|---|
| Light | `rgba(16, 89, 200, 0.14)` | 14% |
| Dark | `rgba(110, 180, 255, 0.22)` | 22% |
| HC | `rgba(16, 89, 200, 0.2)` | 20% |
| HC-dark | `rgba(110, 180, 255, 0.25)` | 25% |

Used by `.au-input-date__edit-highlight` in `input-date.css`. Already annotated with `/* deferred to Phase 3 (alpha scales) */`.

### 1.7 Shadow with color-mix (bonus)

`--au-shadow-button-primary` uses `color-mix(action-primary 36%, transparent)` in light and `color-mix(action-primary 42%, transparent)` in dark. This is a shadow, not a color token — NOT in scope for Phase 3.

---

## 2. Alpha Scale Architecture

### 2.1 Naming

```
--au-scale-{name}-A{step}
```

- **name**: neutral, action, error, success, warning (same 5 scales)
- **step**: 1–12 (A1 = most transparent, A12 = most opaque)
- **Values**: 8-digit hex `#RRGGBBAA`
- **File**: new section at bottom of `au-scales.css`

### 2.2 Scale variable count

5 scales × 12 steps × 2 themes = **120 new variables**, plus HC empty blocks.

Same footprint as Phase 1. Puts the total in `au-scales.css` at 240 variables.

### 2.3 Alpha progression

Radix's 12-step alpha progression is the starting point. Values are NOT opinionated — they are directly observable from Radix neutral alpha:

| Step | Alpha | 8-digit suffix | Perceived effect |
|------|-------|----------------|------------------|
| A1 | 1.2% | `03` | Barely perceptible ghost |
| A2 | 3.1% | `08` | Subtle hint |
| A3 | 5.1% | `0d` | Light whisper |
| A4 | 7.8% | `14` | Visible tint |
| A5 | 12.2% | `1f` | Clear tint |
| A6 | 18.0% | `2e` | Moderate transparent |
| A7 | 27.8% | `47` | Prominent overlay |
| A8 | 44.7% | `72` | Strong overlay |
| A9 | 65.1% | `a6` | High opacity |
| A10 | 74.9% | `bf` | Nearly solid |
| A11 | 87.8% | `e0` | Almost opaque |
| A12 | 97.3% | `f8` | Fully opaque |

The progression is identical for all scales. Only the RGB channels differ per scale.

### 2.4 Pure hue per scale

For chromatic alpha, Radix uses the **fully saturated hue** of the color, NOT the desaturated step value. The alpha channel then controls transparency. This is what produces "hue-tuned" transparency:

| Scale | Light mode pure hue | Dark mode pure hue |
|-------|---------------------|--------------------|
| Neutral | `#000000` (black) | `#ffffff` (white) |
| Action | `#0080ff` (pure sky blue) | `#0050cc` (dark-adapted blue) |
| Error | `#e00030` (pure red) | `#cc0030` (dark-adapted red) |
| Success | `#00b368` (pure green) | `#009955` (dark-adapted green) |
| Warning | `#ffa000` (pure amber) | `#cc8000` (dark-adapted amber) |

**Why pure hue**: When you composite `rgba(pure_blue, 12%)` over any background, the blue hue dominates the alpha channel. When you use `rgba(desaturated_blue, 12%)`, the gray component of the desaturated color bleeds through. Pure hue = cleaner, more consistent tinting.

**Neutral is special**: Black over white (light) and white over dark (dark). There is no hue to tune — plain alpha works perfectly. This is why Radix neutralA values are simply `#000000XX`.

### 2.5 Dark mode values

Dark mode alpha values use the SAME alpha progression but with a dark-adapted pure hue. The hue is darker (lower lightness) so the composited result over a dark background has equivalent perceptual weight to the light-mode equivalent over white.

For dark mode neutral: the hue is `#ffffff` (white) instead of `#000000` — this gives the equivalent "subtle lightening" that black gives in light mode.

Example value shape:

```css
/* Light */
--au-scale-action-A1: #0080ff03;    /* pure blue @ 1.2% */
--au-scale-action-A5: #0080ff1f;    /* pure blue @ 12.2% */
--au-scale-action-A9: #0080ffa6;    /* pure blue @ 65.1% */

/* Dark */
--au-scale-action-A1: #0050cc03;    /* dark blue @ 1.2% */
--au-scale-action-A5: #0050cc1f;    /* dark blue @ 12.2% */
--au-scale-action-A9: #0050cca6;    /* dark blue @ 65.1% */
```

---

## 3. Value Derivation Approach

### 3.1 Recommended: Script-generated 8-digit hex with manual tuning

**Why**: 120 values × 2 themes = 240 hex codes. Hand-authoring is error-prone. A small Node.js script can generate all values from the 10 pure hue inputs (5 scales × 2 themes) and the alpha progression array. Then a human verifies in Storybook.

**Generation formula**:

```js
function alphaHex(r, g, b, alphaPercent) {
  const aa = Math.round(alphaPercent * 255).toString(16).padStart(2, '0');
  const rr = Math.round(r).toString(16).padStart(2, '0');
  const gg = Math.round(g).toString(16).padStart(2, '0');
  const bb = Math.round(b).toString(16).padStart(2, '0');
  return `#${rr}${gg}${bb}${aa}`;
}
```

**Inputs needed**:

```js
const ALPHA_PROGRESSION = [
  0.012, 0.031, 0.051, 0.078, 0.122, 0.180,
  0.278, 0.447, 0.651, 0.749, 0.878, 0.973,
];

const HUES = {
  // Each hue: [r, g, b] in 0–255
  light: {
    neutral: [0, 0, 0],
    action: [0, 128, 255],
    error: [224, 0, 48],
    success: [0, 179, 104],
    warning: [255, 160, 0],
  },
  dark: {
    neutral: [255, 255, 255],
    action: [0, 80, 204],
    error: [204, 0, 48],
    success: [0, 153, 85],
    warning: [204, 128, 0],
  },
};
```

### 3.2 Dark pure hue derivation

The dark pure hues should be perceptually weight-equivalent to the light hues. A simple estimation method:

1. Take the scale's step-9 value in dark mode (the highest-chroma step)
2. Increase saturation to 100% (push chroma to max)
3. Reduce lightness slightly for visibility on dark backgrounds

For action dark: step-9 is `#6eb4ff`. The pure hue is approximately `#0050cc` — a darker blue that still carries the brand's blue identity but is visible over `#0c0e12`.

The exact dark pure hues should be verified in Storybook during implementation.

### 3.3 Files the script would produce

The script doesn't need to be committed to the repo. It produces output that gets pasted into `au-scales.css`:

```
scripts/generate-alpha-values.mjs  →  output to clipboard or file
```

This is a one-time generation, not a build dependency. Values are committed as static CSS.

---

## 4. Migration Strategy

### 4.1 What changes vs what stays

Critical distinction: **not every alpha token should migrate to alpha scales**. Here's the scoped decision:

| Category | Decision | Rationale |
|----------|----------|-----------|
| **Feedback backgrounds** | ✅ **REPLACE** color-mix → alpha scale | Surface independence is a real UX improvement |
| **Selection** | ✅ **REPLACE** rgba → alpha scale | Cleaner, themable, consistent with scale system |
| **Date picker edit highlight** | ✅ **REPLACE** rgba → alpha scale | Already annotated for Phase 3 |
| **Translucent surfaces** | ❌ **KEEP** color-mix | Glassmorphism NEEDS the surface color to carry through — alpha scales would give the wrong hue |
| **Skeleton** | ❌ **KEEP** color-mix | Intentionally surface-matched; alpha scale compositing produces different result |
| **Feedback borders** | ❌ **KEEP** color-mix | Borders are context-dependent (always drawn against a known feedback background); color-mix gives the right blend |
| **Shadow button-primary** | ❌ **KEEP** color-mix | Not a color token; shadows are a different domain |

**Rationale for keeping translucent surfaces as color-mix**:

`--au-color-surface-raised-a` is `color-mix(in srgb, var(--au-color-surface-raised) 85%, transparent)` — this gives the surface color at 85% opacity. Used with `backdrop-filter`, it creates a glass effect where the SURFACE COLOR shows through.

If we replaced this with `--au-scale-neutral-A11` (#000000e0 at 88% black over white):  
→ Over a white canvas, this renders as NEARLY BLACK — completely wrong.

Alpha scales are designed for CHROMATIC tinting over arbitrary backgrounds. Translucent surfaces need to carry their SURFACE COLOR. These are different use cases.

### 4.2 Proposed alpha step mapping

For each target token, the alpha step should produce a similar perceptual weight:

| Token | Current opacity | Alpha step | Rationale |
|-------|----------------|------------|-----------|
| Feedback bg (light, 28%) | 28% semantic + surface | A4 (7.8%) → A5 (12.2%) | Pure hue at lower opacity ≈ desaturated hue at higher opacity. Must validate in Storybook. |
| Feedback bg (dark, 24%) | 24% semantic + surface | A4–A5 | Same logic, dark-adapted |
| Selection (light) | 20% rgba action-9 | A5–A6 (12–18%) | Action-9 is desaturated; pure hue needs less opacity for same weight |
| Selection (dark) | 28% rgba | A7 (27.8%) | Close match to current opacity |
| Date picker (light) | 14% rgba action-9 | A5 (12.2%) | Close to current |
| Date picker (dark) | 22% rgba | A6 (18.0%) | Close to current |
| HC selection | 28–35% | A7–A8 | Higher contrast needs more opacity |

**Important**: These mappings are APPROXIMATIONS. The exact visual result depends on the pure hue chosen and will look slightly different from the current color-mix. This is INTENTIONAL — the goal is BETTER consistency, not pixel-identical reproduction.

### 4.3 Migration order

| Step | What | Files |
|------|------|-------|
| 1 | Add alpha scale variables | `au-scales.css` (+120 vars) |
| 2 | Feedback background → alpha (4 tokens × 2 themes) | `au-tokens.css` (8 lines) |
| 3 | Selection → alpha (4 themes) | `au-tokens.css` (4 lines) |
| 4 | Date picker → alpha (4 themes) | `au-tokens.css` (4 lines) |
| 5 | Update docs/styling tokens reference | docs i18n files |

### 4.4 High-contrast themes

HC and HC-dark themes have their own selection and date-picker values (different opacities: 28% and 20% vs light/dark). These SHOULD also migrate to alpha scale references:

```
--au-color-selection: rgba(16, 89, 200, 0.28)
→ --au-scale-action-A7  (27.8% — close match)
```

HC feedback backgrounds are SOLID hex (no transparency) — they stay as-is.

### 4.5 Total change scope

| Theme | Declarations changed |
|-------|---------------------|
| Light (def. root) | 6 (4 feedback bg + selection + date picker) |
| Dark | 6 (same categories) |
| HC | 2 (selection + date picker) |
| HC-dark | 2 (selection + date picker) |
| **Total** | **16** declarations changed |
| Plus | 120 new alpha scale variables in au-scales.css |

That's 16 lines changed in `au-tokens.css` plus the big block in `au-scales.css`. Very scoped.

---

## 5. Recommended Approach

### Option A: All pre-calculated 8-digit hex (full Radix approach)

✅ **Recommended**

| Factor | Score |
|--------|-------|
| Visual quality | ★★★★★ — hue-tuned transparency is Radix's killer feature |
| Runtime cost | ★★★★★ — zero (static CSS) |
| Implementation effort | ★★★☆☆ — need generation script + Storybook tuning |
| Maintenance | ★★★★☆ — values are static, need re-generation if hues change |
| Surface independence | ★★★★★ — feedback backgrounds look identical on any surface |

**Why not Option B (color-mix references)**: `color-mix(in srgb, var(--au-scale-action-5) 12%, transparent)` is just uniform opacity — it loses hue tuning and looks muddy over non-white backgrounds. If we're doing alpha scales, do them properly.

**Why not Option C (hybrid)**: The pure-hue approach already handles neutral alpha naturally (black/white has no hue). So Option A IS the hybrid — neutral is plain alpha, chromatic is hue-tuned. No need for a separate hybrid category.

### How to generate the values

Write a small Node.js script:

```js
// scripts/generate-alpha-values.mjs
const ALPHA = [0.012, 0.031, 0.051, 0.078, 0.122, 0.180, 0.278, 0.447, 0.651, 0.749, 0.878, 0.973];
const HUES = { /* light and dark pure hues per scale */ };
for (const [theme, hues] of Object.entries(HUES)) {
  for (const [scale, [r, g, b]] of Object.entries(hues)) {
    for (let i = 0; i < 12; i++) {
      const aa = Math.round(ALPHA[i] * 255).toString(16).padStart(2, '0');
      const rr = r.toString(16).padStart(2, '0');
      const gg = g.toString(16).padStart(2, '0');
      const bb = b.toString(16).padStart(2, '0');
      console.log(`--au-scale-${scale}-A${i + 1}: #${rr}${gg}${bb}${aa};`);
    }
  }
}
```

Run once, paste output into `au-scales.css`. The script is a development tool, not a build dependency.

---

## 6. Risk Mitigation

### 6.1 Visual change risk

**Risk**: Feedback backgrounds will look slightly different after migration. Current: `color-mix(success-9 28%, surface-raised)`. New: `--au-scale-success-A4` (pure green at 7.8% over actual background).

**Mitigation**:
- Document this as an INTENTIONAL improvement, not a regression
- The new behavior is surface-independent — feedback looks the same on raised, elevated, canvas, or any other surface
- Verify in Storybook with message and snackbar stories on different surface backgrounds
- If a specific step's visual weight is off, bump up/down one step (A3 → A4 or A5 → A4)

### 6.2 Floating panel glassmorphism

**Risk**: Changing `--au-color-surface-raised-a` would break `.au-floating-panel`'s glass effect.

**Mitigation**: We're NOT changing it. This token stays as color-mix. The alpha scales don't touch it.

### 6.3 High-contrast compatibility

**Risk**: Migration to alpha scales reduces contrast in HC themes.

**Mitigation**: HC selection uses a higher alpha step (A7/A8 vs A5/A6). Verify with the `::selection` background contrast against the HC text color. If insufficient, keep HC selection as hardcoded rgba.

### 6.4 "Info" color has no scale

**Risk**: Info feedback tokens can't use alpha scales because there's no info scale.

**Mitigation**: Info feedback bg stays as color-mix for now. The deferred info scale (Phase 4) would resolve this. Or: info uses a manual 8-digit hex alpha value with the info hue (#0369a1 light / #38bdf8 dark) — a one-off, but simple.

### 6.5 Consumer override behavior

**Risk**: Consumers overriding `--au-color-feedback-success-bg` on their `:root` may find the alpha scale reference harder to override than the current color-mix.

**Mitigation**: CSS cascade rules apply — `:root { --au-color-feedback-success-bg: red }` still wins. No change in override behavior.

### 6.6 Shadow button-primary stays as-is

The `--au-shadow-button-primary` token uses `color-mix(action-primary 36%, transparent)` to create a colored box shadow. This is NOT affected by Phase 3 — shadows are not color tokens and follow different compositing rules.

---

## 7. Phase 3 Scope Summary

```
┌─────────────────────────────────────────────────────────────┐
│  Phase 3: Alpha scales A1-A12                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  NEW: au-scales.css                                         │
│  ─────────────────                                          │
│  --au-scale-{name}-A1 through A12 (5 scales × 2 themes)    │
│  = 120 new variables                                        │
│                                                             │
│  CHANGED: au-tokens.css                                     │
│  ─────────────────────                                      │
│  Feedback bg:  color-mix → alpha-scale   (8 declarations)   │
│  Selection:    rgba → alpha-scale         (4 declarations)   │
│  Date picker:  rgba → alpha-scale         (4 declarations)   │
│  Total: 16 declarations changed                             │
│                                                             │
│  UNCHANGED:                                                 │
│  ──────────                                                 │
│  Surface-raised-a / surface-elevated-a (color-mix stays)    │
│  Skeleton base/shimmer (color-mix stays)                    │
│  Feedback borders (color-mix stays)                         │
│  Shadow button-primary (color-mix stays)                    │
│  Info feedback bg (no info scale — color-mix stays)         │
│                                                             │
│  NEXT: Phase 4 — Info scale (cyan), if needed               │
└─────────────────────────────────────────────────────────────┘
```
