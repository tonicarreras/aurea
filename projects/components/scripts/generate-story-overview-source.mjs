/**
 * Regenerates story-overview-source.ts from docs site English overviews.
 * Run: node projects/components/scripts/generate-story-overview-source.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '../../..');
const overviewPath = join(root, 'projects/docs/src/app/i18n/locales/en/overview.ts');
const outPath = join(root, 'projects/components/src/lib/story-docs/story-overview-source.ts');

const raw = readFileSync(overviewPath, 'utf8');
const start = raw.indexOf('export const OVERVIEWS_EN');
const end = raw.lastIndexOf('};');
const objLiteral = raw.slice(raw.indexOf('{', start), end + 1);

// eslint-disable-next-line no-new-func
const OVERVIEWS_EN = new Function(`return (${objLiteral});`)();

const extras = {
  'input-text': `## Signal forms vs manual

| Mode | Where | Validation |
|------|--------|------------|
| Signal forms | \`[formField]\` on \`au-input-text\`; \`form()\` in your component | Schema drives \`errors\` / \`invalid\`; \`au-form-field\` shows the message |
| Manual | \`[(value)]\` + \`au-form-field\` \`errorMessage\` / \`invalid\` | Parent sets chrome (see **With error** story) |

Full \`form()\` example: **\`@aurea-design-system/components\` README** → *Signal forms*.

### Manual checks (Storybook **Accessibility** addon)

1. Run **Accessibility** → **Run** on each story.
2. Tab through **Password** and confirm keyboard vs pointer focus rings.
3. **With error**: screen reader should hear \`aria-errormessage\`.`,
  popover: `### Form controls in panels

Project \`au-input-text\`, \`au-select\`, and other field controls **inside \`au-form-field\`** — they require \`AU_FORM_FIELD\` via DI.`,
  'form-field': `### Related exports

\`AU_FORM_FIELD\`, \`AuFormFieldContext\` — import from \`@aurea-design-system/components\`.`,
};

const lines = [
  `/** Auto-generated from projects/docs/.../en/overview.ts — do not edit by hand. */`,
  `import type { StoryOverviewSource } from './story-overview-types';`,
  '',
  'export const STORY_OVERVIEW_SOURCE = {',
];

for (const [slug, o] of Object.entries(OVERVIEWS_EN)) {
  lines.push(
    `  ${JSON.stringify(slug)}: ${JSON.stringify(
      {
        intro: o.intro,
        whenToUse: o.whenToUse.items,
        whenNotToUse: o.whenNotToUse?.items ?? [],
        anatomy: o.anatomy,
        accessibility: o.accessibility,
        keyboard: o.keyboard,
        extra: extras[slug],
      },
      null,
      2,
    ).replaceAll('\n', '\n  ')},`,
  );
}

lines.push('} satisfies Record<string, StoryOverviewSource>;', '');

writeFileSync(outPath, lines.join('\n'));
console.log(`Wrote ${outPath} (${Object.keys(OVERVIEWS_EN).length} slugs)`);
