/**
 * Markdown for the signal-form wrapper story page.
 */
export const INPUT_TEXT_SIGNAL_DOCS_OVERVIEW = `
## Overview

This story mounts a small **host component** that wires \`au-input-text\` to Angular **signal forms**: \`form()\` + \`FormField\` + \`required\` + \`email\` validators.

## Why a wrapper?

Storybook’s docs extractor can fail on advanced directive trees. This host keeps the canvas stable while still showing a realistic \`[formField]\` binding.

## Flow

| Piece | Role |
|-------|------|
| \`signal({ email: '' })\` | Holds the model |
| \`form(data, schema)\` | Builds \`fieldRoot\` with validators |
| \`au-form-field\` | Label, hint, and error chrome |
| \`FormField\` + \`[formField]="fieldRoot.email"\` | Connects the input to the schema |
| \`au-input-text\` | Control only; receives \`errors\` / \`invalid\` from the directive |

## Try it

1. Leave the field empty and tab away — expect **required** messaging from the schema.
2. Type \`not-an-email\` — expect **email** format messaging.

## Accessibility

Validation messages should surface through the same \`aria-invalid\` / \`aria-errormessage\` path as manual \`errorMessage\` stories. Use the **Accessibility** panel to confirm after interacting.
`.trim();
