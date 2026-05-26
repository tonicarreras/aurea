#!/usr/bin/env node
import { copyFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const schematicsSrc = join(root, 'projects/components/schematics');
const schematicsDist = join(root, 'dist/components/schematics');

const tsc = spawnSync('npx', ['tsc', '-p', 'projects/components/tsconfig.schematics.json'], {
  stdio: 'inherit',
  cwd: root,
});
if (tsc.status !== 0) {
  process.exit(tsc.status ?? 1);
}

async function copyJsonFiles(dir, base = schematicsSrc) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const src = join(dir, entry.name);
    if (entry.isDirectory()) {
      await copyJsonFiles(src, base);
    } else if (entry.name.endsWith('.json')) {
      const rel = src.slice(base.length + 1);
      const dest = join(schematicsDist, rel);
      await mkdir(dirname(dest), { recursive: true });
      await copyFile(src, dest);
    }
  }
}

await mkdir(schematicsDist, { recursive: true });
await copyJsonFiles(schematicsSrc);
await writeFile(
  join(schematicsDist, 'package.json'),
  JSON.stringify({ type: 'commonjs' }, null, 2) + '\n',
);
console.log('Schematics built to dist/components/schematics');
