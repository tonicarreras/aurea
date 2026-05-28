#!/usr/bin/env node
/**
 * Validates that design-tokens JSON values exist in Aurea CSS token files.
 *
 * Architecture: JSON represents DESIGN VALUES → CSS maps them as scale steps
 * or semantic tokens.  This check ensures no value in the JSON has drifted
 * from the CSS source of truth (au-tokens.css + au-primitives.css).
 *
 * Checks:
 * - Color hex values (light + dark) — checked against both CSS files
 * - Dimension tokens (fontSize, spacing, borderRadius)
 * - fontFamily token names
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

// Source of truth: infra tokens + default theme scales
const cssFiles = [
  'projects/components/src/lib/tokens/au-tokens.css',
  'projects/components/src/lib/styles/au-primitives.css',
];
const cssContent = cssFiles
  .map((f) => readFileSync(join(root, f), 'utf8'))
  .join('\n')
  .toLowerCase();

const light = JSON.parse(
  readFileSync(join(root, 'projects/design-tokens/au-tokens.light.json'), 'utf8'),
);
const dark = JSON.parse(
  readFileSync(join(root, 'projects/design-tokens/au-tokens.dark.json'), 'utf8'),
);

let failed = 0;

function validateValues(json, label, assertFn) {
  const walk = (obj, path) => {
    if (obj && typeof obj === 'object') {
      if ('$value' in obj && '$type' in obj) {
        assertFn(obj.$value, obj.$type, `${label}.${path}`);
      } else {
        for (const [key, val] of Object.entries(obj)) {
          walk(val, path ? `${path}.${key}` : key);
        }
      }
    }
  };
  walk(json, '');
}

// ── Color hex values ──────────────────────────────────────────

validateValues(light, 'light', (value, type, path) => {
  if (type !== 'color' || typeof value !== 'string' || !value.startsWith('#')) return;
  if (!cssContent.includes(value.toLowerCase())) {
    console.error(`[${path}] hex ${value} not found in au-tokens.css or au-scales.css`);
    failed++;
  }
});

validateValues(dark, 'dark', (value, type, path) => {
  if (type !== 'color' || typeof value !== 'string' || !value.startsWith('#')) return;
  if (!cssContent.includes(value.toLowerCase())) {
    console.error(`[${path}] hex ${value} not found in au-tokens.css or au-scales.css`);
    failed++;
  }
});

// ── Dimension values ──────────────────────────────────────────

validateValues(light, 'light', (value, type, path) => {
  if (type !== 'dimension' || typeof value !== 'string') return;
  if (!cssContent.includes(value.toLowerCase())) {
    console.error(`[${path}] dimension "${value}" not found in CSS`);
    failed++;
  }
});

// ── fontFamily names ──────────────────────────────────────────

validateValues(light, 'light', (value, type, path) => {
  if (type !== 'fontFamily' || !Array.isArray(value)) return;
  for (const name of value) {
    if (typeof name === 'string' && !cssContent.includes(name.toLowerCase())) {
      console.error(`[${path}] font name "${name}" not found in CSS`);
      failed++;
    }
  }
});

// ── Summary ───────────────────────────────────────────────────

if (failed > 0) {
  console.error(`\n✗ ${failed} validation error(s) — update JSON or CSS to match.`);
  process.exit(1);
}
console.log('✓ Design tokens JSON values confirmed in au-tokens.css / au-primitives.css.');
