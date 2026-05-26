#!/usr/bin/env node
/**
 * Runs the same checks as .github/workflows/test.yml (local parity with CI).
 *
 * Usage:
 *   bun run ci                  # full pipeline
 *   bun run ci -- --skip-e2e    # skip Playwright / Storybook test-runner
 *   bun run ci -- --install     # run `bun install --frozen-lockfile` first
 */
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`Usage: bun run ci [--] [options]

Options:
  --install     Run bun install --frozen-lockfile before checks
  --skip-e2e    Skip Playwright install and all E2E jobs (faster)
  -h, --help    Show this help

Mirrors .github/workflows/test.yml (jobs: test, docs-e2e, visual-regression).
Does not run compat-matrix (scheduled) or publish workflows.
`);
  process.exit(0);
}

const skipE2e = args.includes('--skip-e2e');
const runInstall = args.includes('--install');

function run(label, command, cmdArgs = []) {
  console.log(`\n━━ ${label} ━━\n`);
  const result = spawnSync(command, cmdArgs, { stdio: 'inherit', shell: false });
  if (result.status !== 0) {
    console.error(`\n✗ Failed: ${label}\n`);
    process.exit(result.status ?? 1);
  }
}

function bunRun(script) {
  run(script, 'bun', ['run', script]);
}

function nodeScript(path, scriptArgs = []) {
  run(path, 'node', [path, ...scriptArgs]);
}

console.log('Aurea CI (local) — same steps as .github/workflows/test.yml\n');

if (runInstall) {
  run('Install dependencies', 'bun', ['install', '--frozen-lockfile']);
}

// --- job: test ---
bunRun('audit:ci');
bunRun('build:components');
bunRun('check:bundle');
bunRun('validate:tokens');
bunRun('verify:story-tags');
bunRun('verify:i18n');
bunRun('verify:visual-manifest');
bunRun('test:coverage');
bunRun('test:schematics');
bunRun('audit:spec-quality');

if (!skipE2e) {
  run('Install Playwright browsers', 'node', [
    'node_modules/playwright/cli.js',
    'install',
    '--with-deps',
    'chromium',
    'chromium-headless-shell',
  ]);
  bunRun('test-storybook:ci');
}

nodeScript('scripts/write-coverage-summary.mjs');

bunRun('format:check');
bunRun('lint');
bunRun('build:docs');

if (!skipE2e) {
  // --- job: docs-e2e ---
  bunRun('test:docs:e2e');

  // --- job: visual-regression ---
  bunRun('test:visual:ci');
}

console.log('\n✓ CI passed (local parity with test.yml)\n');
