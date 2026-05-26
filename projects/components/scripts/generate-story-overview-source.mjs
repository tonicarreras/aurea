/**
 * Regenerates story-overview-source.ts from docs site en/es overviews.
 * Run: node projects/components/scripts/generate-story-overview-source.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '../../..');

function loadOverviews(locale) {
  const overviewPath = join(root, `projects/docs/src/app/i18n/locales/${locale}/overview.ts`);
  const raw = readFileSync(overviewPath, 'utf8');
  const exportName = locale === 'en' ? 'OVERVIEWS_EN' : 'OVERVIEWS_ES';
  const start = raw.indexOf(`export const ${exportName}`);
  const end = raw.lastIndexOf('};');
  const objLiteral = raw.slice(raw.indexOf('{', start), end + 1);
  // eslint-disable-next-line no-new-func
  return new Function(`return (${objLiteral});`)();
}

const extrasEn = {
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

const extrasEs = {
  'input-text': `## Signal forms vs manual

| Modo | Dónde | Validación |
|------|--------|------------|
| Signal forms | \`[formField]\` en \`au-input-text\`; \`form()\` en tu componente | El esquema define \`errors\` / \`invalid\`; \`au-form-field\` muestra el mensaje |
| Manual | \`[(value)]\` + \`errorMessage\` / \`invalid\` en \`au-form-field\` | El padre controla el cromado (story **With error**) |

Ejemplo completo con \`form()\`: README de **\`@aurea-design-system/components\`** → *Signal forms*.

### Comprobaciones manuales (addon **Accessibility**)

1. **Accessibility** → **Run** en cada story.
2. Tab en **Password** y revisa anillos de foco teclado vs puntero.
3. **With error**: el lector debe anunciar \`aria-errormessage\`.`,
  popover: `### Controles en paneles

Los controles \`au-input-text\`, \`au-select\`, etc. **dentro de \`au-form-field\`** requieren \`AU_FORM_FIELD\` por DI.`,
  'form-field': `### Exportaciones relacionadas

\`AU_FORM_FIELD\`, \`AuFormFieldContext\` — import desde \`@aurea-design-system/components\`.`,
};

function toSource(overviews, extras) {
  const out = {};
  for (const [slug, o] of Object.entries(overviews)) {
    out[slug] = {
      intro: o.intro,
      whenToUse: o.whenToUse.items,
      whenNotToUse: o.whenNotToUse?.items ?? [],
      anatomy: o.anatomy,
      accessibility: o.accessibility,
      keyboard: o.keyboard,
      extra: extras[slug],
    };
  }
  return out;
}

const OVERVIEWS_EN = loadOverviews('en');
const OVERVIEWS_ES = loadOverviews('es');

const STORY_OVERVIEW_SOURCE = {
  en: toSource(OVERVIEWS_EN, extrasEn),
  es: toSource(OVERVIEWS_ES, extrasEs),
};

const outPath = join(root, 'projects/components/src/lib/story-docs/story-overview-source.ts');
const lines = [
  '/** Auto-generated from projects/docs/.../locales/{en,es}/overview.ts — do not edit by hand. */',
  "import type { StoryOverviewSource } from './story-overview-types';",
  '',
  "export type StoryOverviewLocale = 'en' | 'es';",
  '',
  'export const STORY_OVERVIEW_SOURCE = {',
  `  en: ${JSON.stringify(STORY_OVERVIEW_SOURCE.en, null, 2).replaceAll('\n', '\n  ')},`,
  `  es: ${JSON.stringify(STORY_OVERVIEW_SOURCE.es, null, 2).replaceAll('\n', '\n  ')},`,
  '} as const satisfies Record<StoryOverviewLocale, Record<string, StoryOverviewSource>>;',
  '',
  '/** @deprecated Use STORY_OVERVIEW_SOURCE.en — kept for type inference in tests. */',
  'export const STORY_OVERVIEW_SOURCE_EN = STORY_OVERVIEW_SOURCE.en;',
  '',
];

writeFileSync(outPath, lines.join('\n'));
console.log(`Wrote ${outPath} (${Object.keys(OVERVIEWS_EN).length} slugs × 2 locales)`);
