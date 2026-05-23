#!/usr/bin/env node
/**
 * Adds Storybook tags `stable` or `beta` to *.stories.ts from component-maturity.ts slugs.
 * Run after changing COMPONENT_MATURITY: node scripts/tag-story-maturity.mjs
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';

const root = join(process.cwd(), 'projects/components/src/lib');
const maturityPath = join(root, 'component-maturity.ts');
const maturitySrc = readFileSync(maturityPath, 'utf8');

const stable = new Set();
const beta = new Set();
for (const match of maturitySrc.matchAll(/(\S+): \{ level: '(stable|beta)'/g)) {
  const slug = match[1].replace(/'/g, '');
  if (match[2] === 'stable') stable.add(slug);
  else beta.add(slug);
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      walk(path);
      continue;
    }
    if (!name.endsWith('.stories.ts')) continue;

    const slug = basename(dirname(path));
    const level = stable.has(slug) ? 'stable' : beta.has(slug) ? 'beta' : null;
    if (!level) continue;

    let content = readFileSync(path, 'utf8');
    if (content.includes(`'${level}'`)) continue;

    let replaced = content.replace(
      /tags: \['autodocs', 'au', '(?:stable|beta)'\]/,
      `tags: ['autodocs', 'au', '${level}']`,
    );
    if (replaced === content) {
      replaced = content.replace(
        /tags: \['autodocs', 'au'\]/,
        `tags: ['autodocs', 'au', '${level}']`,
      );
    }
    if (replaced === content) {
      console.warn(`Skip (no tags line): ${path}`);
      continue;
    }
    writeFileSync(path, replaced);
    console.log(`Tagged ${slug} → ${level}`);
  }
}

walk(root);
