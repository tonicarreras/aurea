#!/usr/bin/env node
/**
 * Runs `bun audit` in CI. Fails only when the summary reports critical issues.
 * High/moderate transitive dev-tooling advisories emit a GitHub warning (see SECURITY.md).
 */
import { spawnSync } from 'node:child_process';

const result = spawnSync('bun', ['audit'], { encoding: 'utf8' });
const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;
console.log(output);

const criticalMatch = output.match(/(\d+) critical/);
if (criticalMatch) {
  const critical = Number(criticalMatch[1]);
  if (critical > 0) {
    console.error(`::error::${critical} critical vulnerability(ies) — must fix before merge`);
    process.exit(1);
  }
}

const summary = output.match(/(\d+) vulnerabilities \((\d+) high, (\d+) moderate, (\d+) low\)/);
if (summary) {
  const [, total, high, moderate, low] = summary.map(Number);
  if (high > 0 || moderate > 0) {
    console.log(
      `::warning title=Dependency audit::${total} advisories (${high} high, ${moderate} moderate, ${low} low). Schedule dependency updates.`,
    );
  }
}

process.exit(0);
