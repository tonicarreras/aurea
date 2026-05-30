#!/usr/bin/env node
/**
 * Heuristic audit: flags spec files whose tests look like smoke-only
 * (create + detectChanges + toBeTruthy/toBeDefined, without interaction or value assertions).
 * Writes spec-quality-report.md and exits 1 in CI when any stable component exceeds 50% smoke tests.
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';

const libRoot = join(process.cwd(), 'projects/components/src/lib');
const maturityPath = join(libRoot, 'component-maturity.ts');
const outPath = join(process.cwd(), 'spec-quality-report.md');

function readStableSlugs() {
  const src = readFileSync(maturityPath, 'utf8');
  const slugs = new Set();
  const singleStable = /^\s{2}(?:'([^']+)'|([\w-]+)):\s*\{\s*level:\s*'stable'/;
  const blockStart = /^\s{2}(?:'([^']+)'|([\w-]+)):\s*\{/;
  const levelStable = /level:\s*'stable'/;
  let pending = null;
  for (const line of src.split('\n')) {
    const single = line.match(singleStable);
    if (single) {
      slugs.add(single[1] ?? single[2]);
      pending = null;
      continue;
    }
    const start = line.match(blockStart);
    if (start) pending = start[1] ?? start[2];
    if (pending && levelStable.test(line)) {
      slugs.add(pending);
      pending = null;
    }
  }
  return slugs;
}

function walkSpecs(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      walkSpecs(path, files);
      continue;
    }
    if (name.endsWith('.spec.ts')) files.push(path);
  }
  return files;
}

/** Slice a single `it(...)` body (handles indented tests). */
function sliceItBody(content, startIndex) {
  const tail = content.slice(startIndex + 1);
  const nextIt = tail.search(/\n\s*it\s*\(/);
  const nextDescribe = tail.search(/\n\s*describe\s*\(/);
  const offsets = [nextIt, nextDescribe].filter((i) => i >= 0).sort((a, b) => a - b);
  const end =
    offsets.length > 0 ? startIndex + 1 + offsets[0] : content.length;
  return content.slice(startIndex, end);
}

function isSmokeTest(body) {
  const normalized = body.replace(/\s+/g, ' ').toLowerCase();
  const hasCreate = /createcomponent|testbed\.create|createfieldfixture/.test(normalized);
  const hasDetect = /detectchanges/.test(normalized);
  const hasTruthy = /\.(tobetruthy|tobedefined)\(/.test(normalized);
  const hasInteraction =
    /\.(click|dispatchEvent)\(|keydown|keyup|keypress|\.input\(|\.toggle\(|\.emit\(/.test(
      normalized,
    );
  const hasMeaningfulExpect = /expect\([^)]*\)\.(not\.)?to(?!betruthy|bedefined)[a-z]/.test(
    normalized,
  );
  return hasCreate && hasDetect && hasTruthy && !hasInteraction && !hasMeaningfulExpect;
}

function analyzeSpec(path) {
  const content = readFileSync(path, 'utf8');
  const tests = [...content.matchAll(/\bit\s*\(\s*['"`]([^'"`]+)['"`]\s*,/g)];
  let smoke = 0;
  let total = 0;
  const smokeNames = [];
  for (const match of tests) {
    total++;
    const body = sliceItBody(content, match.index ?? 0);
    if (isSmokeTest(body)) {
      smoke++;
      smokeNames.push(match[1]);
    }
  }
  return { total, smoke, smokeNames, specFile: basename(path) };
}

const stable = readStableSlugs();
const byComponent = new Map();

for (const specPath of walkSpecs(libRoot)) {
  const slug = basename(specPath, '.spec.ts');
  const folderSlug = basename(join(specPath, '..'));
  const componentSlug = stable.has(folderSlug) ? folderSlug : slug;
  if (!stable.has(componentSlug)) continue;

  const result = analyzeSpec(specPath);
  if (result.total === 0) continue;

  const existing = byComponent.get(componentSlug) ?? {
    componentSlug,
    total: 0,
    smoke: 0,
    smokeNames: [],
    specFiles: [],
  };
  existing.total += result.total;
  existing.smoke += result.smoke;
  existing.smokeNames.push(...result.smokeNames);
  existing.specFiles.push(result.specFile);
  byComponent.set(componentSlug, existing);
}

const rows = [...byComponent.values()].map((entry) => {
  const ratio = entry.smoke / entry.total;
  return { ...entry, ratio, flag: ratio > 0.5 };
});

rows.sort((a, b) => b.ratio - a.ratio);

const flagged = rows.filter((r) => r.flag);

const md = [
  '# Spec quality audit',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '| Component | Tests | Smoke-like | Ratio | Flag |',
  '| --------- | ----- | ---------- | ----- | ---- |',
  ...rows.map(
    (r) =>
      `| \`${r.componentSlug}\` | ${r.total} | ${r.smoke} | ${(r.ratio * 100).toFixed(0)}% | ${r.flag ? '⚠' : '✓'} |`,
  ),
  '',
  'Smoke-like = create + detectChanges + only `toBeTruthy`/`toBeDefined`, no clicks/keyboard or value assertions.',
  '',
];

if (flagged.length > 0) {
  md.push('## Flagged smoke tests', '');
  for (const row of flagged) {
    md.push(`### \`${row.componentSlug}\` (${row.specFiles.join(', ')})`, '');
    for (const name of row.smokeNames) {
      md.push(`- ${name}`);
    }
    md.push('');
  }
}

writeFileSync(outPath, md.join('\n'));

const format = spawnSync('bunx', ['prettier', '--write', outPath], { encoding: 'utf8' });
if (format.status !== 0) {
  console.error(format.stderr || format.stdout);
  process.exit(format.status ?? 1);
}

console.log(`Wrote ${outPath} (${rows.length} stable components, ${flagged.length} flagged)`);

if (flagged.length > 0) {
  const names = flagged.map((r) => `${r.componentSlug} (${(r.ratio * 100).toFixed(0)}%)`).join(', ');
  console.error(`\n✗ ${flagged.length} stable component(s) exceed 50% smoke-like tests: ${names}\n`);
  process.exit(1);
}
