/**
 * Patches all *.stories.ts to use getStoryOverview(slug).
 * Run: node projects/components/scripts/patch-stories-overview.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { globSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const lib = join(dirname(fileURLToPath(import.meta.url)), '../src/lib');
const files = globSync('**/*.stories.ts', { cwd: lib });

const importLine = `import { getStoryOverview } from '../story-docs/get-story-overview';`;

for (const rel of files) {
  const slug = dirname(rel);
  const path = join(lib, rel);
  let src = readFileSync(path, 'utf8');

  if (src.includes("getStoryOverview('")) {
    continue;
  }

  // Remove buildStoryDocsOverview import and block
  src = src.replace(
    /import \{ buildStoryDocsOverview \} from ['"]\.\.\/story-docs\/build-story-docs-overview['"];\n?/,
    '',
  );
  src = src.replace(/const docsOverview = buildStoryDocsOverview\(\{[\s\S]*?\}\);\n\n?/, '');

  // Remove legacy template literal overview
  src = src.replace(/const docsOverview = `[\s\S]*?`\.trim\(\);\n\n?/, '');

  // Remove short inline component description — keep extractArgTypes block
  src = src.replace(
    /description: \{\s*component:\s*(?:'[^']*'|"[^"]*"|docsOverview),?\s*\}/,
    'description: { component: docsOverview }',
  );

  // Insert import after last storybook/angular import
  if (!src.includes('get-story-overview')) {
    const m = src.match(/^import .+from '@storybook\/angular';?\n/m);
    if (m) {
      const idx = src.indexOf(m[0]) + m[0].length;
      src = src.slice(0, idx) + importLine + '\n' + src.slice(idx);
    } else {
      src = importLine + '\n' + src;
    }
  }

  // Insert docsOverview const before first const meta or interface after imports
  if (!src.includes('const docsOverview = getStoryOverview')) {
    const anchor = src.match(/\n(const meta|interface \w+Story)/);
    const insert = `\nconst docsOverview = getStoryOverview('${slug}');\n`;
    if (anchor) {
      src = src.slice(0, anchor.index) + insert + src.slice(anchor.index);
    }
  }

  // Ensure parameters.docs.description uses docsOverview
  if (!src.includes('component: docsOverview')) {
    src = src.replace(
      /docs: \{\s*extractArgTypes: \(\) => \(\{\}\),\s*description: \{\s*component:[^}]+\},/,
      'docs: {\n      extractArgTypes: () => ({}),\n      description: { component: docsOverview },',
    );
    src = src.replace(
      /docs: \{\s*description: \{\s*component:[^}]+\},/,
      'docs: {\n      description: { component: docsOverview },',
    );
  }

  writeFileSync(path, src);
  console.log('patched', rel);
}

console.log('done', files.length, 'files');
