#!/usr/bin/env node
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

const bundlePath = join(
  process.cwd(),
  'dist/components/fesm2022/aurea-design-system-components.mjs',
);
const baselinePath = join(process.cwd(), 'scripts/bundle-size-baseline.json');

const raw = statSync(bundlePath).size;
const gzip = gzipSync(readFileSync(bundlePath)).length;
writeFileSync(
  baselinePath,
  JSON.stringify(
    {
      raw,
      gzip,
      note: 'Measured from dist/components/fesm2022/aurea-design-system-components.mjs. Update via: bun run build:components && node scripts/update-bundle-baseline.mjs',
    },
    null,
    2,
  ) + '\n',
);
console.log(`Updated baseline: raw=${raw} gzip=${gzip}`);
