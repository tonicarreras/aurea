/**
 * Removes per-story layout overrides; wires storyMetaParameters where needed.
 * Run: node projects/components/scripts/normalize-story-layout.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { globSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const lib = join(dirname(fileURLToPath(import.meta.url)), '../src/lib');
const files = globSync('**/*.stories.ts', { cwd: lib });

const importLine =
  "import { storyMetaParameters } from '../story-docs/story-meta-parameters';";

for (const rel of files) {
  const path = join(lib, rel);
  let src = readFileSync(path, 'utf8');

  if (!src.includes('getStoryOverview')) {
    continue;
  }

  src = src.replace(/\n    layout: '(?:padded|centered)',/g, '');
  src = src.replace(/\n  parameters: \{ layout: '(?:padded|centered)' \},/g, '');

  const emptyParams = /  parameters: \{\s*\},/s;
  if (emptyParams.test(src)) {
    src = src.replace(emptyParams, '  parameters: storyMetaParameters(docsOverview),');
  }

  if (
    /const meta: Meta[\s\S]*?tags: \['autodocs'[\s\S]*?\n  argTypes:/.test(src) &&
    !/parameters: storyMetaParameters/.test(src.split('const meta:')[1]?.split('export default')[0] ?? '')
  ) {
    src = src.replace(
      /(  tags: \['autodocs[^\]]*\],\n)(  argTypes:)/,
      '$1  parameters: storyMetaParameters(docsOverview),\n$2',
    );
  }

  src = src.replace(
    /  parameters: \{\s*docs: \{\s*extractArgTypes: \(\) => \(\{\}\),\s*\},\s*\},/,
    '  parameters: storyMetaParameters(docsOverview),',
  );
  src = src.replace(
    /  parameters: \{\s*docs: \{\s*description: \{ component: docsOverview \},\s*\},\s*\},/,
    '  parameters: storyMetaParameters(docsOverview),',
  );

  if (!src.includes('story-meta-parameters')) {
    const anchor = src.indexOf("from '../story-docs/get-story-overview';");
    if (anchor !== -1) {
      const end = anchor + "from '../story-docs/get-story-overview';".length;
      src = src.slice(0, end) + '\n' + importLine + src.slice(end);
    }
  }

  writeFileSync(path, src);
  console.log('normalized', rel);
}

console.log('done');
