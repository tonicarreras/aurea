#!/usr/bin/env node
/**
 * Ensures design-tokens JSON hex values still exist in au-tokens.css (light/dark blocks).
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const css = readFileSync(join(root, 'projects/components/src/lib/tokens/au-tokens.css'), 'utf8');
const light = JSON.parse(
  readFileSync(join(root, 'projects/design-tokens/au-tokens.light.json'), 'utf8'),
);
const dark = JSON.parse(
  readFileSync(join(root, 'projects/design-tokens/au-tokens.dark.json'), 'utf8'),
);

function collectHex(obj, out = []) {
  if (obj && typeof obj === 'object') {
    if (typeof obj.$value === 'string' && obj.$value.startsWith('#')) {
      out.push(obj.$value.toLowerCase());
    }
    for (const v of Object.values(obj)) {
      collectHex(v, out);
    }
  }
  return out;
}

let failed = 0;
for (const [name, json] of [
  ['light', light],
  ['dark', dark],
]) {
  for (const hex of collectHex(json)) {
    if (!css.toLowerCase().includes(hex)) {
      console.error(`[${name}] ${hex} not found in au-tokens.css`);
      failed++;
    }
  }
}

if (failed > 0) {
  process.exit(1);
}
console.log('Design tokens JSON matches au-tokens.css.');
