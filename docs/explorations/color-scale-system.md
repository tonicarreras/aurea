# Radix-like 12-Step Color Scale + Alpha System for Aurea

**Exploration — pre-SDD discovery phase**

## 1. Radix Color System Summary

### The 12-step scale

Each Radix color is a 12-step numerical scale (1–12) where every step has a specific UI role. The relationship between steps is maintained when hue changes, so every color scale feels structurally identical even at different hues.

| Steps | Band | Role | Light mode behavior | Dark mode behavior |
|-------|------|------|-------------------|-------------------|
| 1–2 | **Backgrounds** | App background, subtle surfaces | Lightest tints (near white) | Darkest shades (near black) |
| 3–5 | **Component backgrounds** | UI elements: normal, hover, active | Medium-light, increasing saturation | Medium-dark, increasing saturation |
| 6–8 | **Borders & focus** | Subtle borders, interactive borders, focus rings | Visible but low contrast | Visible but low contrast |
| 9–10 | **Solid backgrounds** | Brand color, hover states: HIGHEST CHROMA step | Purest, most saturated | Adapted for dark bg |
| 11–12 | **Text** | Low-contrast, high-contrast | Dark text | Light text |

**Key design property**: Step 9 is the highest-chroma color (least white/black mixed in). Steps 11–12 are guaranteed Lc 60 and Lc 90 APCA contrast on top of step 2 from the same scale.

### Alpha scale (A1–A12)

For every 12-step solid scale, there's a corresponding **alpha scale** (`{color}A1`–`{color}A12`). These are NOT uniform opacity tints — they are **pre-calculated** hex values where the color's hue is mixed into the alpha channel itself:

- **Grays** use plain black alpha: `grayA1 = #00000003`
- **Chromatic colors** use hue-tinted alpha: `blueA1 = #0080ff04`, `tomatoA1 = #ff000003`

This means alpha colors **look visually identical to their solid counterparts** when placed over the page background, because the hue is embedded in the "transparency." This is essential for:
- Blurred panels (`backdrop-filter`) that need to inherit the surface color
- Overlays that sit on top of varying backgrounds
- Shadows with color casts

Each alpha scale also has **P3 wide-gamut equivalents** because alpha blending works differently in `display-p3` vs sRGB.

### Dark mode

Dark mode is NOT a simple inversion — each scale gets its own set of 12 values. Step 1 in dark mode is the darkest shade (near black), step 12 is the lightest (near white). The structural role relationships are preserved.

### Structure per color

```
{color}-1  through  {color}-12   → solid light
{color}-A1 through  {color}-A12  → alpha light
{dark-color}-1  through  12      → solid dark  
{dark-color}-A1 through  A12     → alpha dark
{color}P3-1     through  12      → P3 wide-gamut light
{color}P3-A1    through  A12     → P3 wide-gamut alpha
```

---

## 2. Current Aurea Color Map

Aurea currently has **~80 semantic color tokens** across 5 theme variants (light, dark, high-contrast, high-contrast-dark). Here's the full breakdown:

### Surfaces (4 tokens × 4 themes)
- `--au-color-surface-canvas` — page background
- `--au-color-surface-raised` — card/panel bg (white in light)
- `--au-color-surface-elevated` — subtle panel bg
- `--au-color-surface-sunken` — depressed area
- `--au-color-surface-inverted` — tooltip/sheet bg (dark in light)
- `--au-color-surface-raised-a` — translucent variant (CSS `color-mix`)
- `--au-color-surface-elevated-a` — translucent variant

### Text (7 tokens)
- `--au-color-text-primary`, `-secondary`, `-tertiary`, `-placeholder`, `-disabled`, `-label`, `-on-solid`

### Borders (3 tokens)
- `--au-color-border-subtle`, `-default`, `-strong`

### Action/Link (6 tokens)
- `--au-color-action-primary`, `-hover`, `-pressed`
- `--au-color-link`, `-link-hover`
- `--au-color-focus-ring`, `-focus-inner`

### Semantic states (16 tokens, 4 semantic groups × 4 themes)
- Error: `--au-color-semantic-error`, `-contrast`, `-surface`
- Success, Warning, Info: same pattern

### Feedback (12 tokens, 4 groups × 3 tokens each)
- `--au-color-feedback-{type}-bg`, `-border`, `-title` for success/warning/error/info

### Selection (2 tokens)
- `--au-color-selection`, `-selection-text`

### Forms (10 tokens)
- `--au-color-form-border`, `-hover`, `-text`, `-placeholder`, `-caret`, `-error`, `-error-bg`, `-error-foreground`, `-disabled-foreground`, `-disabled-surface`

### Switch (4 tokens)
- Track off, track off hover, track off border, thumb off

### Select (9 tokens)
- Menu bg, menu text, field hover bg, option highlight bg/text/marker, option selected bg/text/marker, option disabled text

### Date picker (4 tokens)
- Accent, icon, icon hover, icon active, edit highlight

### Skeleton (2 tokens)
- Base, shimmer

### Shadows (references color tokens via `color-mix`)

### Current approach to transparency
Aurea already uses CSS `color-mix()` for:
- Translucent surfaces: `color-mix(in srgb, var(--au-color-surface-raised) 85%, transparent)`
- Feedback backgrounds: `color-mix(in srgb, var(--au-color-semantic-success) 28%, var(--au-color-surface-raised))`
- Selection: `rgba(16, 89, 200, 0.2)` (hardcoded)

---

## 3. Mapping Proposal

### Core idea: Add a Radix-like 12-step "primitive" color scale layer that semantic tokens reference.

The proposal introduces a **three-layer architecture**:

```
Layer 1: RAW PALETTE        → au-color-palette-blue-1..12 (not used in components directly)
Layer 2: PRIMITIVE SCALES   → au-scale-action-1..12, au-scale-neutral-1..12, au-scale-error-1..12 (12-step scales)
Layer 3: SEMANTIC TOKENS    → au-color-surface-raised, au-color-text-primary (existing, now reference scales)
```

### Proposed scale names

| Scale | Purpose | Maps to current |
|-------|---------|-----------------|
| `--au-scale-neutral-1..12` | Gray/slate for text, borders, surfaces | Replaces `--au-color-text-*`, `--au-color-border-*`, most surfaces |
| `--au-scale-action-1..12` | Brand blue for interactive | Replaces `--au-color-action-*`, `--au-color-link-*`, `--au-color-focus-ring` |
| `--au-scale-error-1..12` | Red semantic | Replaces `--au-color-semantic-error*` |
| `--au-scale-success-1..12` | Green semantic | Replaces `--au-color-semantic-success*` |
| `--au-scale-warning-1..12` | Amber semantic | Replaces `--au-color-semantic-warning*` |
| `--au-scale-info-1..12` | Blue/cyan semantic | Replaces `--au-color-semantic-info*` |
| `--au-scale-form-1..12` | Form-specific gray | Could share neutral or be separate |

### How semantic tokens would reference scales

```css
/* Current */
--au-color-surface-raised: #ffffff;
--au-color-text-primary: #101418;
--au-color-border-subtle: #e0e4ea;

/* New — semantic tokens reference scale steps */
--au-color-surface-raised: var(--au-scale-neutral-1);
--au-color-text-primary: var(--au-scale-neutral-12);
--au-color-text-secondary: var(--au-scale-neutral-11);
--au-color-border-subtle: var(--au-scale-neutral-6);
```

### Radix-to-Aurea step mapping

| Scale Step | Aurea use | Example token |
|-----------|-----------|--------------|
| 1 | Canvas background | `--au-color-surface-canvas` |
| 2 | Raised surface | `--au-color-surface-raised` |
| 3 | Elevated surface | `--au-color-surface-elevated` |
| 4 | Hover surface state | `--au-color-surface-elevated-a` hover |
| 4–5 | Component bg hover/active | `--au-color-select-option-highlight-bg` |
| 6 | Subtle border | `--au-color-border-subtle` |
| 7 | Default border | `--au-color-border-default` |
| 8 | Strong border/focus | `--au-color-border-strong`, focus ring |
| 9 | Solid brand color | `--au-color-action-primary` |
| 10 | Solid hover | `--au-color-action-primary-hover` |
| 11 | Low-contrast text | `--au-color-text-secondary` |
| 12 | High-contrast text | `--au-color-text-primary` |

### Alpha scale mapping

Alpha scales mainly serve:
- **Blurred surfaces**: `--au-color-surface-raised-a` would become `var(--au-scale-neutral-A2)` instead of `color-mix(...)`
- **Selection**: `--au-color-selection` would become `var(--au-scale-action-A5)` 
- **Shadows**: Colored shadow casts could use `--au-scale-action-A3`
- **Feedback backgrounds**: `--au-color-feedback-success-bg` could be `color-mix(in srgb, var(--au-scale-success-9) X%, var(--au-color-surface-raised))` OR use the alpha scale directly as `var(--au-scale-success-A3)`

**Critical insight**: Aurea's current `color-mix()` approach for feedback backgrounds is functional but the Radix alpha approach would be more visually consistent. Because Radix alpha values are hue-adjusted, a `success-A3` over *any* surface would look like `success-3` without needing to know the surface color.

### Dark mode

Each scale would ship with both light and dark values (like Radix). The `[data-au-theme="dark"]` block would override the scale variables:

```css
:root {
  --au-scale-neutral-1: #fcfcfc;
  --au-scale-neutral-2: #f9f9f9;
  /* ... */
}

[data-au-theme="dark"] {
  --au-scale-neutral-1: #0c0e12;  /* not an inversion — purpose-tuned */
  --au-scale-neutral-2: #13161c;
  /* ... */
}
```

This means semantic tokens like `--au-color-surface-raised: var(--au-scale-neutral-1)` automatically switch with the theme.

---

## 4. Technical Approach Options

### Option A: Pure CSS — Hand-authored or imported static scales

**How**: Define all 12-step scales as CSS custom properties in `au-tokens.css`, manually tuned per theme. Could import Radix Colors directly via npm (`@radix-ui/colors`) and alias or copy values.

**Pros**:
- Zero runtime cost
- Zero build step
- Fully debuggable in DevTools
- Can use Radix values directly (proven accessible)
- Works with existing `AuTheme` directive

**Cons**:
- ~1200 CSS variables for 5 scales × 2 variants × 12 steps (light, dark, alpha)
- Manual maintenance if tuning colors
- Hard to generate custom brand palettes
- Radix alpha values are 8-digit hex — less readable than `rgba()`

**File size estimate**: ~8KB gzipped for 5 full scales + alpha + P3

### Option B: JS/TS build-time generator

**How**: A build script (Node/Bun) that takes a hue input and generates CSS variable output. Could be a PostCSS plugin or standalone script that outputs `au-tokens.css` sections.

**Pros**:
- Can generate brand-specific palettes from a single hue value
- Enables a "palette builder" configuration
- Can interpolate between Radix reference curves
- Alpha values can be calculated algorithmically

**Cons**:
- Adds a build step to the components library
- Color generation math is complex (Radix uses a proprietary algorithm)
- Would need to ship the generator or pre-generate
- Testing visual output requires review

### Option C: Hybrid — CSS variables reference a JS color utility

**How**: Define CSS variables as numbered steps, but use a JS utility (similar to Radix Themes) to compute dark mode values and alpha at runtime. The `AuTheme` directive could swap entire palette objects.

**Pros**:
- Dynamic palette switching at runtime
- Can support user-customizable colors
- Single source of truth in TypeScript

**Cons**:
- Runtime computation cost
- Changes require Angular change detection
- More complex than pure CSS
- JS bundle size increase

### Option D: CSS-only with `color-mix()` generation

**How**: Use CSS `color-mix()` to derive the 12 steps from a base color. Steps 1–12 could be defined as percentages of the base color mixed with white/black.

**Pros**:
- No build step, no JS
- Dynamic — change the base and all steps follow
- Modern CSS approach

**Cons**:
- `color-mix()` produces perceptually uneven steps (not tuned like Radix)
- No hue shift between steps (Radix shifts hue slightly for perceptual evenness)
- Alpha values would be uniform — losing the hue-tuned alpha advantage
- Contrast guarantees are lost — Radix steps are *tested* for APCA

---

## 5. Risk Assessment

### Breaking changes

| Risk | Severity | Mitigation |
|------|----------|------------|
| Existing tokens change value | High | Keep existing token names; re-point to scales. Values should remain identical |
| `color-mix()` feedback colors change | Medium | Feedback backgrounds use `color-mix()` with surfaces — if surface tokens change value, feedback shifts |
| Third-party overrides of `--au-color-*` break | Medium | If those overrides were set to hardcoded colors, they still work. If they reference `--au-color-surface-raised`, they still work |
| High-contrast themes need separate scale values | Low | High-contrast themes already hardcode everything — they'd need their own scale values |

### Migration complexity

1. **Backward-compatible layering**: Add scales as new variables first, then migrate semantic tokens to reference them one-by-one
2. **No current consumer uses scales** (they don't exist), so there's zero breakage from adding them
3. **Existing semantic tokens must not change value** during migration — they should reference scale steps that produce the identical hex

### Gotchas

- **P3 wide-gamut**: Radix provides P3 equivalents for alpha colors. Aurea would need to decide if `display-p3` color space support is needed. Current `color-mix()` works in sRGB.
- **Radix alpha ≠ CSS opacity**: `rgba()` on a solid color does NOT produce the same visual result as Radix's pre-calculated hue-blended alpha. This is the hardest part to replicate without the original generation algorithm.
- **Step 9 contrast for light colors**: Radix specifically handles light hues (Sky, Mint, Lime, Yellow, Amber) by making step 9 work with *dark* text instead of white. Aurea's current action-primary (#1059c8 blue) works with white text, so this is less of an issue.
- **Density system**: The density system scales spacing and radius, not colors. No impact.

---

## 6. Recommended Path

### Phased approach

#### Phase 1 — Add primitive scales (pure CSS, zero breakage)
1. Define 5 Radix-style scales in `au-tokens.css`: `neutral`, `action`, `error`, `success`, `warning`
2. Each scale: 12 steps for light, 12 for dark, alpha variants for each
3. Start with manually-curated values inspired by Radix but tuned to Aurea's existing palette
4. Add scale tokens alongside existing semantic tokens (don't change anything yet)

#### Phase 2 — Migrate semantic tokens
1. Re-point `--au-color-text-primary` → `var(--au-scale-neutral-12)` and verify hex matches
2. Re-point surfaces, borders, and forms
3. Re-point action colors and focus
4. Re-point semantic states

#### Phase 3 — Alpha migration
1. Replace `color-mix()` translucent surfaces with scale alpha references
2. Replace `color-mix()` feedback backgrounds with alpha scale references
3. Replace hardcoded `rgba()` selection colors with alpha scale references

#### Phase 4 — Tooling (optional, future)
1. Consider a build-time palette generator if brand customization is needed
2. Consider a Figma plugin to keep design tokens in sync

### Technical recommendation

**Go with Option A (pure CSS) for Phase 1**, using Radix Colors as a reference for the 12-step structure but tuning values to match Aurea's existing palette exactly at the semantic token level.

**Why not Option B or C**: Aurea has no JavaScript color runtime today, and adding one would be premature. The existing `AuTheme` directive already swaps CSS variables via `data-au-theme` attributes — scales fit perfectly into this model. A build-time generator can be added later if needed.

**Why not Option D**: `color-mix()` produces perceptually uneven steps without hue-shifting, and the alpha values would lose Radix's key advantage (hue-tuned transparency). If we want Radix-quality output, we need Radix-quality input values.

### Key open questions for the design phase

1. **Should we import `@radix-ui/colors` or author our own values?** Importing gives us proven accessible values. Authoring gives us tighter Aurea brand alignment.
2. **How many scales do we actually need?** Neutral + action are essential. Error/success/warning could share scales or be separate.
3. **Do we need alpha scales immediately?** Phase 3 can be deferred — the `color-mix()` approach works for now.
4. **P3 wide-gamut: needed or not?** Adds ~2× the variable count. Benefits Apple display users.
5. **Should high-contrast themes get scale variables?** They currently hardcode everything and override manually — scales might be more work than benefit there.
