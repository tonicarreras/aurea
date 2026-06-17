#!/usr/bin/env node
/**
 * Validates design-tokens JSON:
 * 1. DTCG 2025.10 JSON Schema (official format.json)
 * 2. Bidirectional hex sync with light/dark token CSS
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import Ajv from 'ajv';

import { collectTokenHexes } from './dtcg-token-utils.mjs';

const root = process.cwd();
const tokensDir = join(root, 'projects/components/src/lib/tokens');
const designTokensDir = join(root, 'projects/design-tokens');

function read(name) {
  return readFileSync(join(tokensDir, name), 'utf8');
}

function blockFor(css, selector) {
  const idx = css.indexOf(selector);
  if (idx === -1) {
    return '';
  }
  const open = css.indexOf('{', idx);
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') {
      depth++;
    } else if (css[i] === '}') {
      depth--;
      if (depth === 0) {
        return css.slice(open + 1, i);
      }
    }
  }
  return '';
}

function hexFromBlock(block) {
  const out = new Set();
  for (const m of block.matchAll(/(--au-color-[a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
    out.add(m[2].toLowerCase());
  }
  return out;
}

function themeCssHex(theme) {
  const semantic = read('au-tokens-semantic.css');
  const domain = read('au-tokens-domain.css');
  const selector = theme === 'light' ? ":root,\n[data-au-theme='light']" : "[data-au-theme='dark']";
  return new Set([
    ...hexFromBlock(blockFor(semantic, selector)),
    ...hexFromBlock(blockFor(domain, selector)),
  ]);
}

function normalizeCssHex(hex) {
  let h = hex.replace('#', '').toLowerCase();
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (h.length === 8) {
    h = h.slice(0, 6);
  }
  return `#${h}`;
}

function normalizeCssHexSet(set) {
  return new Set([...set].map(normalizeCssHex));
}

function validateSchema(files) {
  const schemaPath = join(designTokensDir, 'dtcg-format-2025.10.schema.json');
  const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  let failed = 0;
  for (const [name, json] of files) {
    if (!validate(json)) {
      console.error(`[schema:${name}] DTCG validation failed:`);
      for (const err of validate.errors ?? []) {
        console.error(`  ${err.instancePath || '/'} ${err.message}`);
      }
      failed++;
    }
  }
  return failed;
}

const light = JSON.parse(
  readFileSync(join(designTokensDir, 'au-tokens.light.tokens.json'), 'utf8'),
);
const dark = JSON.parse(readFileSync(join(designTokensDir, 'au-tokens.dark.tokens.json'), 'utf8'));

let failed = validateSchema([
  ['light', light],
  ['dark', dark],
]);

for (const [name, json, cssHex] of [
  ['light', light, themeCssHex('light')],
  ['dark', dark, themeCssHex('dark')],
]) {
  const jsonHex = collectTokenHexes(json);
  const cssNormalized = normalizeCssHexSet(cssHex);

  for (const hex of jsonHex) {
    if (!cssNormalized.has(hex)) {
      console.error(`[${name}] JSON hex ${hex} not found in ${name} theme CSS`);
      failed++;
    }
  }
  for (const hex of [...cssNormalized].sort()) {
    if (!jsonHex.includes(hex)) {
      console.error(`[${name}] CSS hex ${hex} missing from ${name} JSON export`);
      failed++;
    }
  }
}

if (failed > 0) {
  process.exit(1);
}
console.log('Design tokens: DTCG schema + JSON ↔ CSS validation passed.');
