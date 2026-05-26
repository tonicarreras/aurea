#!/usr/bin/env node
/**
 * Heuristic audit: flags spec files whose tests look like smoke-only (create + detectChanges + toBeTruthy).
 * Writes spec-quality-report.md and exits 1 if any stable component has >50% smoke tests.
 */
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

function isSmokeTest(body) {
  const normalized = body.replace(/\s+/g, ' ').toLowerCase();
  const hasCreate = /createcomponent|testbed\.create/.test(normalized);
  const hasDetect = /detectchanges/.test(normalized);
  const hasTruthy = /tobetruthy|tobedefined/.test(normalized);
  const hasBehavior =
    /click|keydown|keyup|input|toggle|emit|expect\(.*\)\.(to|not\.)/.test(normalized) &&
    !/tobetruthy|tobedefined/.test(normalized);
  return hasCreate && hasDetect && hasTruthy && !hasBehavior;
}

function analyzeSpec(path) {
  const content = readFileSync(path, 'utf8');
  const tests = [...content.matchAll(/\bit\s*\(\s*['"`]([^'"`]+)['"`]\s*,/g)];
  let smoke = 0;
  let total = 0;
  const smokeNames = [];
  for (const match of tests) {
    total++;
    const start = match.index ?? 0;
    const nextIt = content.indexOf('\nit(', start + 1);
    const nextDescribe = content.indexOf('\ndescribe(', start + 1);
    const end = [nextIt, nextDescribe, content.length]
      .filter((i) => i > start)
      .sort((a, b) => a - b)[0];
    const body = content.slice(start, end);
    if (isSmokeTest(body)) {
      smoke++;
      smokeNames.push(match[1]);
    }
  }
  return { total, smoke, smokeNames };
}

const stable = readStableSlugs();
const rows = [];
let flagged = 0;

for (const specPath of walkSpecs(libRoot)) {
  const slug = basename(specPath, '.spec.ts');
  if (slug.includes('-') && !stable.has(slug)) {
    const folder = basename(join(specPath, '..'));
    if (!stable.has(folder)) continue;
  }
  const folderSlug = basename(join(specPath, '..'));
  const componentSlug = stable.has(folderSlug) ? folderSlug : slug;
  if (!stable.has(componentSlug)) continue;

  const { total, smoke, smokeNames } = analyzeSpec(specPath);
  if (total === 0) continue;
  const ratio = smoke / total;
  const flag = ratio > 0.5;
  if (flag) flagged++;
  rows.push({ componentSlug, total, smoke, ratio, smokeNames, flag });
}

rows.sort((a, b) => b.ratio - a.ratio);

const md = [
  '# Spec quality audit',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '| Component | Tests | Smoke-like | Ratio | Flag |',
  '| --------- | ----- | ------------ | ----- | ---- |',
  ...rows.map(
    (r) =>
      `| \`${r.componentSlug}\` | ${r.total} | ${r.smoke} | ${(r.ratio * 100).toFixed(0)}% | ${r.flag ? '⚠' : '✓'} |`,
  ),
  '',
  'Smoke-like = createComponent + detectChanges + toBeTruthy/defined without interaction assertions.',
  '',
].join('\n');

writeFileSync(outPath, md);
console.log(`Wrote ${outPath} (${rows.length} stable specs, ${flagged} flagged)`);

if (process.env['CI'] === 'true' && flagged > 0) {
  console.warn(`${flagged} stable component(s) exceed 50% smoke-like tests (warning only).`);
}
