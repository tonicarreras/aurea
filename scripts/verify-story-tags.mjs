#!/usr/bin/env node
/**
 * Ensures every *.stories.ts under components/src/lib includes tag 'au'
 * and stable/beta maturity tags match COMPONENT_MATURITY.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';

const libRoot = join(process.cwd(), 'projects/components/src/lib');
const maturityPath = join(libRoot, 'component-maturity.ts');

function readMaturity() {
  const src = readFileSync(maturityPath, 'utf8');
  const map = new Map();
  const single = /^\s{2}(?:'([^']+)'|([\w-]+)):\s*\{\s*level:\s*'(stable|beta)'/;
  const blockStart = /^\s{2}(?:'([^']+)'|([\w-]+)):\s*\{/;
  const levelLine = /level:\s*'(stable|beta)'/;
  let pending = null;
  for (const line of src.split('\n')) {
    const s = line.match(single);
    if (s) {
      map.set(s[1] ?? s[2], s[3]);
      pending = null;
      continue;
    }
    const start = line.match(blockStart);
    if (start) pending = start[1] ?? start[2];
    const lvl = line.match(levelLine);
    if (pending && lvl) {
      map.set(pending, lvl[1]);
      pending = null;
    }
  }
  return map;
}

function walkStories(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walkStories(path, files);
    else if (name.endsWith('.stories.ts')) files.push(path);
  }
  return files;
}

const maturity = readMaturity();
const errors = [];

for (const path of walkStories(libRoot)) {
  const slug = basename(join(path, '..'));
  const content = readFileSync(path, 'utf8');
  const tagsMatch = content.match(/tags:\s*\[([^\]]+)\]/);
  if (!tagsMatch) {
    errors.push(`${path}: missing tags array`);
    continue;
  }
  const tags = tagsMatch[1];
  if (!tags.includes("'au'") && !tags.includes('"au"')) {
    errors.push(`${path}: missing 'au' tag`);
  }
  const level = maturity.get(slug);
  if (level && !tags.includes(`'${level}'`)) {
    errors.push(`${path}: expected tag '${level}' for slug ${slug}`);
  }
}

if (errors.length) {
  console.error('Story tag verification failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

console.log(`Story tags OK (${walkStories(libRoot).length} stories).`);
