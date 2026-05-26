#!/usr/bin/env node
/**
 * Ensures stable-story-ids.ts matches COMPONENT_MATURITY stable slugs.
 */
import { spawnSync } from 'node:child_process';

const sync = spawnSync('node', ['scripts/sync-stable-story-ids.mjs'], {
  encoding: 'utf8',
  stdio: 'inherit',
});
if (sync.status !== 0) {
  process.exit(sync.status ?? 1);
}

const diff = spawnSync(
  'git',
  ['diff', '--exit-code', 'projects/components/.storybook/stable-story-ids.ts'],
  { encoding: 'utf8' },
);
if (diff.status !== 0) {
  console.error(
    'stable-story-ids.ts is out of sync with COMPONENT_MATURITY. Run: bun run sync:stable-story-ids',
  );
  process.exit(1);
}

console.log('stable-story-ids OK (matches COMPONENT_MATURITY).');
