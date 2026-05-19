#!/usr/bin/env node
import { readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist', 'components');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(path)));
    } else {
      files.push(path);
    }
  }
  return files;
}

const files = await walk(distDir);
let removedMaps = 0;
let strippedRefs = 0;

for (const file of files) {
  if (file.endsWith('.map')) {
    await unlink(file);
    removedMaps++;
    continue;
  }

  if (file.endsWith('.mjs') || file.endsWith('.js')) {
    const content = await readFile(file, 'utf8');
    const next = content.replace(/\n?\/\/# sourceMappingURL=.*$/gm, '');
    if (next !== content) {
      await writeFile(file, next);
      strippedRefs++;
    }
  }
}

console.log(`Removed ${removedMaps} .map file(s), stripped ${strippedRefs} sourceMappingURL reference(s).`);
