import { appendFileSync, existsSync, readFileSync } from 'node:fs';

const summaryPath = 'coverage/components/coverage-summary.json';
const out = process.env.GITHUB_STEP_SUMMARY;

if (!out) {
  console.log('GITHUB_STEP_SUMMARY not set; skipping.');
  process.exit(0);
}

if (!existsSync(summaryPath)) {
  appendFileSync(
    out,
    '\n## Coverage\n\n_No coverage report found. Run `bun run test:coverage` first._\n',
  );
  process.exit(0);
}

const { total } = JSON.parse(readFileSync(summaryPath, 'utf8'));
const metrics = ['statements', 'branches', 'functions', 'lines'];

const rows = metrics.map((key) => {
  const m = total[key];
  const pct = m.pct ?? 0;
  const icon = pct >= 100 ? '✅' : pct >= 90 ? '⚠️' : '❌';
  return `| ${icon} ${key} | ${m.covered}/${m.total} | **${pct}%** |`;
});

const md = [
  '',
  '## 📊 Test coverage',
  '',
  'Library: `projects/components` (Vitest + v8). Thresholds in `angular.json`: **100%** per metric.',
  '',
  '| Metric | Covered | % |',
  '|--------|---------|-----|',
  ...rows,
  '',
  'Download the HTML report from the **coverage-report** artifact on this workflow run.',
  '',
].join('\n');

appendFileSync(out, md);
console.log('Coverage summary written to job summary.');
