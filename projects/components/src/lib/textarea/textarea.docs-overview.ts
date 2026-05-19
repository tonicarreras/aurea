/**
 * Markdown for Storybook Docs (`parameters.docs.description.component`).
 */
export const TEXTAREA_DOCS_OVERVIEW = `
## Overview

\`au-textarea\` is a multi-line control with the same **label → control row → hint → error** grammar as \`au-input-text\`. It implements \`FormValueControl<string>\` for \`[formField]\` or \`[(value)]\`.

## When to use

| Use \`au-textarea\` | Prefer \`au-input-text\` |
|--------------------|---------------------------|
| Long text, descriptions, comments | Single line, email, password, compact fields |
| User-controlled height (\`resize\`) | Fixed single-line height |

## Anatomy

| Region | Notes |
|--------|-------|
| Label + host | Same stacking pattern as input-text for focus overlay / contrast tooling |
| Control row | Wraps \`<textarea>\`; error and focus styles mirror the input |
| Textarea | \`rows\`, \`cols\`, \`wrap\`, \`spellcheck\`, \`resize\` exposed as inputs |
| Hint / error | Same ARIA pattern as input-text (\`aria-describedby\`, \`aria-errormessage\`, \`role="alert"\`) |

## Resize

| \`resize\` value | Typical use |
|----------------|-------------|
| \`vertical\` **(default)** | User expands height; avoids breaking horizontal grids |
| \`none\` | Fixed layout |
| \`both\` | Power users; may affect layout width |

## Accessibility

| Topic | Implementation |
|-------|----------------|
| Multiline | Native \`<textarea>\`; **no** redundant \`aria-multiline\` (implicit) |
| Invalid / error | Same as input: \`aria-invalid\`, \`aria-errormessage\`, live region for error |
| Hint | \`aria-describedby\` when hint text is present |
| Keyboard | Tab order: label (if present) → textarea → no extra traps inside the row |

### Manual checks

1. Run the **Accessibility** addon on **Default**, **With error**, and **Read-only**.
2. Confirm error text is announced when \`errorMessage\` is set (role **alert**).
3. With **Read-only**, verify the control is not editable but still readable.

## Signal forms vs manual

Same contract as \`au-input-text\`: prefer \`[formField]\` + \`form()\` for schema-driven validation; otherwise \`errorMessage\` / \`invalid\` from the parent.

## Tokens

Uses the same form surface tokens as \`au-input-text\` (\`--au-color-form-*\`, \`--au-color-text-label\`, etc.). See **DESIGN.md** for the semantic palette.
`.trim();
