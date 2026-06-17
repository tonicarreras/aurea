#!/usr/bin/env node
/**
 * Regenerates projects/design-tokens/*.tokens.json from documented hex colors in token CSS.
 * Output conforms to DTCG Format Module 2025.10.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { DTCG_SCHEMA, dimensionToken, numberToken, setColorPath } from './dtcg-token-utils.mjs';

const root = process.cwd();
const tokensDir = join(root, 'projects/components/src/lib/tokens');
const outDir = join(root, 'projects/design-tokens');

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
  const colors = {};
  for (const m of block.matchAll(/(--au-color-[a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
    colors[m[1]] = m[2].toLowerCase();
  }
  return colors;
}

function collect(theme) {
  const semantic = read('au-tokens-semantic.css');
  const domain = read('au-tokens-domain.css');
  const selector = theme === 'light' ? ":root,\n[data-au-theme='light']" : "[data-au-theme='dark']";
  return {
    ...hexFromBlock(blockFor(semantic, selector)),
    ...hexFromBlock(blockFor(domain, selector)),
  };
}

function buildJson(theme) {
  const colors = collect(theme);
  const colorTree = {};
  for (const [token, hex] of Object.entries(colors).sort(([a], [b]) => a.localeCompare(b))) {
    const parts = token.replace('--au-color-', '').split('-');
    setColorPath(colorTree, parts, hex);
  }

  return {
    $schema: DTCG_SCHEMA,
    color: colorTree,
    fontFamily: {
      sans: {
        $value: ['Onest', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        $type: 'fontFamily',
      },
      mono: {
        $value: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        $type: 'fontFamily',
      },
    },
    fontSize: {
      xs: dimensionToken('0.75rem'),
      sm: dimensionToken('0.875rem'),
      md: dimensionToken('1rem'),
      base: dimensionToken('1rem'),
      lg: dimensionToken('1.125rem'),
      xl: dimensionToken('1.25rem'),
    },
    spacing: {
      1: dimensionToken('0.25rem'),
      2: dimensionToken('0.5rem'),
      3: dimensionToken('0.75rem'),
      4: dimensionToken('1rem'),
      6: dimensionToken('1.5rem'),
      8: dimensionToken('2rem'),
    },
    borderRadius: {
      field: dimensionToken('0.25rem'),
      control: dimensionToken('0.375rem'),
      surface: dimensionToken('0.75rem'),
      modal: dimensionToken('1rem'),
      pill: dimensionToken('9999px'),
    },
    zIndex: {
      dropdown: numberToken(40),
      drawer: numberToken(50),
      modal: numberToken(50),
      toast: numberToken(60),
    },
  };
}

for (const theme of ['light', 'dark']) {
  writeFileSync(
    join(outDir, `au-tokens.${theme}.tokens.json`),
    `${JSON.stringify(buildJson(theme), null, 2)}\n`,
  );
}

console.log('Exported DTCG 2025.10 design tokens (*.tokens.json) from CSS.');
