/**
 * Markdown for Storybook Docs (`parameters.docs.description.component`).
 * Keep tables ASCII-only for reliable rendering in the Docs addon.
 */
export const INPUT_TEXT_DOCS_OVERVIEW = `
## Overview

\`au-input-text\` is a single-line field with optional label, hint, validation error, and password visibility. It implements Angular **signal forms** \`FormValueControl<string>\` so you can bind \`[formField]\` or use classic \`[(value)]\`.

## When to use

| Use \`au-input-text\` | Prefer something else |
|----------------------|-------------------------|
| Single-line text, email, URL, search, password | Multi-line content → **\`au-textarea\`** |
| Same visual grammar as the rest of Aurea | Native input only when you do not need label/hint/error chrome |

## Anatomy

| Region | Element / role | Notes |
|--------|----------------|-------|
| Label host | Wrapper for stacking | Keeps label painting above the control shell for reliable contrast checks |
| Label | \`<label for>\` | Optional; associates visible text with the input \`id\` |
| Required | \`*\` + \`(required)\` for SR | \`showRequired\` can hide the asterisk; \`required\` still sets the HTML attribute when true |
| Control row | Border, background, focus ring | One surface; invalid state changes border/background |
| Input | \`<input>\` | \`aria-invalid\`, \`aria-errormessage\`, \`aria-describedby\` wired from inputs |
| Password toggle | \`<button type="button">\` | \`aria-pressed\`, \`aria-label\`; only when \`type="password"\` and \`showPasswordToggle\` |
| Hint | \`<p id="…-hint">\` | Tertiary text; not the error channel |
| Error | \`<div role="alert" id="…-error">\` | Shown when \`errorMessage\` or \`errors\` yields text |

## Keyboard and focus

| Interaction | Behavior |
|-------------|----------|
| **Tab** into the field | Outer **outline** focus ring (WCAG-friendly), class \`--from-tab\` on the control row |
| **Click** / pointer focus | **Inset** ring (\`box-shadow\`) so pointer users are not surprised by a large outer ring |
| **Space** in password toggle | Activates the button (native button behavior) |
| **Disabled** | No \`valueChange\`; input is not editable |

Focus modality is shared via \`tabFocusState\` (\`au-tab-focus-state.ts\`): \`pointerdown\` clears the “next focus is from Tab” flag before \`focusin\`.

## Accessibility

| Topic | Implementation |
|-------|----------------|
| Name | Visible \`<label>\` + \`for\` / \`id\`, or your own label elsewhere |
| Required | \`aria-required\` on the input when \`required\` is true |
| Invalid | \`aria-invalid="true"\` when there is a displayed error |
| Error message | \`aria-errormessage\` points to the error region \`id\` |
| Hint | \`aria-describedby\` references the hint \`id\` when hint text is non-empty |
| Password | Toggle exposes \`aria-pressed\` and a clear **Show password** / **Hide password** label |
| Contrast | Uses semantic tokens (\`--au-color-text-label\`, \`--au-color-text-tertiary\`, etc.) tuned for **WCAG 2.2 AA** on \`surface-canvas\` / \`surface-raised\` |

### Manual checks (Storybook **Accessibility** addon)

1. Run **Accessibility** → **Run** on each story (axe is manual in this project to avoid noise on every keystroke).
2. Tab through **Password** and confirm the focus ring matches keyboard vs mouse behavior.
3. **With error**: screen reader should hear the error associated with the field (\`aria-errormessage\`).

## Signal forms vs manual

| Mode | Bindings | Validation source |
|------|------------|-------------------|
| Signal forms | \`[formField]\` on \`au-input-text\` | \`form()\` schema + \`errors\` / \`invalid\` from the directive |
| Manual / template | \`[(value)]\`, \`errorMessage\`, \`invalid\` | Your component sets \`errorMessage\` or \`invalid\` |

## Design tokens (reference)

| Concern | Token examples |
|---------|----------------|
| Field border | \`--au-color-form-border\`, hover \`--au-color-form-border-hover\` |
| Field surface | \`--au-color-surface-raised\`, error \`--au-color-form-error-bg\` |
| Label / hint | \`--au-color-text-label\`, \`--au-color-text-tertiary\` |
| Focus | \`--au-color-focus-ring\`, \`--au-shadow-focus-ring\` |

See **DESIGN.md** at the repo root for the full token model.
`.trim();
