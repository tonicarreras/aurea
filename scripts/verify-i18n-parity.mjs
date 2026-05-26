#!/usr/bin/env node
/**
 * Compares object keys between en/ and es/ locale TypeScript modules (static parse, no Angular import).
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const localesRoot = join(process.cwd(), 'projects/docs/src/app/i18n/locales');
const enRoot = join(localesRoot, 'en');
const esRoot = join(localesRoot, 'es');

function collectKeysFromSource(source) {
  const keys = new Set();
  for (const match of source.matchAll(/^\s{2,}([A-Za-z_][\w]*):\s/gm)) {
    const key = match[1];
    if (key === 'export' || key === 'import' || key === 'type') continue;
    keys.add(key);
  }
  return keys;
}

function walkLocaleFiles(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walkLocaleFiles(path, files);
    else if (name.endsWith('.ts') && !name.endsWith('.d.ts')) files.push(path);
  }
  return files;
}

function main() {
  let failed = false;

  for (const enPath of walkLocaleFiles(enRoot)) {
    const rel = enPath.slice(enRoot.length + 1);
    const esPath = join(esRoot, rel);
    try {
      readFileSync(esPath);
    } catch {
      console.error(`Missing es/${rel}`);
      failed = true;
      continue;
    }
    const enKeys = collectKeysFromSource(readFileSync(enPath, 'utf8'));
    const esKeys = collectKeysFromSource(readFileSync(esPath, 'utf8'));
    const missingInEs = [...enKeys].filter((k) => !esKeys.has(k)).sort();
    const missingInEn = [...esKeys].filter((k) => !enKeys.has(k)).sort();
    if (missingInEs.length || missingInEn.length) {
      failed = true;
      console.error(`\n${rel}:`);
      for (const k of missingInEs) console.error(`  missing in es: ${k}`);
      for (const k of missingInEn) console.error(`  missing in en: ${k}`);
    }
  }

  if (failed) process.exit(1);
  console.log('i18n parity OK (en/es top-level keys match per file).');
}

main();
