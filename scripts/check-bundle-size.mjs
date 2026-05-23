#!/usr/bin/env node
/**
 * Fails when the library FESM bundle exceeds baseline by more than maxIncreaseRatio (default 5%).
 * Usage: bun run build:components && node scripts/check-bundle-size.mjs
 */
import { readFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

const baselinePath = join(process.cwd(), 'scripts/bundle-size-baseline.json');
const bundlePath = join(
  process.cwd(),
  'dist/components/fesm2022/aurea-design-system-components.mjs',
);

const maxIncreaseRatio = Number(process.env['BUNDLE_MAX_INCREASE'] ?? 0.05);

function readBaseline() {
  return JSON.parse(readFileSync(baselinePath, 'utf8'));
}

function measure() {
  const raw = statSync(bundlePath).size;
  const gzip = gzipSync(readFileSync(bundlePath)).length;
  return { raw, gzip };
}

function main() {
  const baseline = readBaseline();
  const current = measure();
  const rawIncrease = (current.raw - baseline.raw) / baseline.raw;
  const gzipIncrease = (current.gzip - baseline.gzip) / baseline.gzip;

  console.log(`Bundle raw: ${current.raw} bytes (baseline ${baseline.raw}, +${(rawIncrease * 100).toFixed(2)}%)`);
  console.log(
    `Bundle gzip: ${current.gzip} bytes (baseline ${baseline.gzip}, +${(gzipIncrease * 100).toFixed(2)}%)`,
  );

  if (rawIncrease > maxIncreaseRatio || gzipIncrease > maxIncreaseRatio) {
    console.error(
      `Bundle size exceeded ${maxIncreaseRatio * 100}% increase threshold. Update scripts/bundle-size-baseline.json if intentional.`,
    );
    process.exit(1);
  }
}

main();
