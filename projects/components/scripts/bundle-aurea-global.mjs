#!/usr/bin/env node
/**
 * Inlines aurea-global.entry.css @imports into aurea-global.css so static hosts
 * (Storybook preview-head, npm package) resolve styles without sibling paths.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const libRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../src/lib');
const entry = resolve(libRoot, 'styles/aurea-global.entry.css');
const out = resolve(libRoot, 'styles/aurea-global.css');

function bundle(file, seen = new Set()) {
  const abs = resolve(file);
  if (seen.has(abs)) {
    return '';
  }
  seen.add(abs);

  const dir = dirname(abs);
  const content = readFileSync(abs, 'utf8');
  return content.replace(/@import\s+['"]([^'"]+)['"]\s*;/g, (_, imp) => {
    const resolved = resolve(dir, imp);
    return `\n/* --- ${imp} --- */\n${bundle(resolved, seen)}\n`;
  });
}

const header = `/**
 * GENERATED — do not edit directly.
 * Source: styles/aurea-global.entry.css
 * Run: node projects/components/scripts/bundle-aurea-global.mjs
 */
`;

writeFileSync(out, header + bundle(entry));
console.log(`Wrote ${out}`);
