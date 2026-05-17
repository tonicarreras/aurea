/**
 * Markdown for the textarea signal-form wrapper story page.
 */
export const TEXTAREA_SIGNAL_DOCS_OVERVIEW = `
## Overview

Host component demonstrating \`au-textarea\` with \`form()\`, \`required\`, and \`minLength\` on a \`bio\` field.

## Schema

| Validator | Message (example) |
|-----------|---------------------|
| \`required(f.bio)\` | Bio is required |
| \`minLength(f.bio, 20)\` | Write at least 20 characters |

## Try it

Enter fewer than 20 characters and blur — the schema should drive the error UI on \`au-textarea\`.

## Docs extraction

\`parameters.docs.extractArgTypes\` is a no-op so the Storybook test runner does not choke on the wrapper component. See \`.storybook/README.md\` for the pattern.
`.trim();
