#!/usr/bin/env node
/**
 * Creates a minimal temp app, installs @angular/core at the requested range,
 * and verifies TypeScript can compile against the built Aurea package.
 */
import { mkdtempSync, writeFileSync, readFileSync, cpSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

const angularCore = process.argv[2] ?? '^21.2.0';
const root = process.cwd();
const distPkg = join(root, 'dist/components');
const work = mkdtempSync(join(tmpdir(), 'aurea-compat-'));

try {
  writeFileSync(
    join(work, 'package.json'),
    JSON.stringify(
      {
        name: 'aurea-compat-smoke',
        private: true,
        type: 'module',
        dependencies: {
          '@angular/core': angularCore,
          '@aurea-design-system/components': `file:${distPkg}`,
        },
      },
      null,
      2,
    ),
  );

  writeFileSync(
    join(work, 'smoke.ts'),
    `import { AuButton } from '@aurea-design-system/components';
export const used = AuButton;
`,
  );

  writeFileSync(
    join(work, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'bundler',
          strict: true,
          skipLibCheck: true,
          noEmit: true,
        },
        include: ['smoke.ts'],
      },
      null,
      2,
    ),
  );

  const install = spawnSync('npm', ['install', '--ignore-scripts'], { cwd: work, stdio: 'inherit' });
  if (install.status !== 0) process.exit(install.status ?? 1);

  const tsc = spawnSync('npx', ['tsc', '-p', 'tsconfig.json'], { cwd: work, stdio: 'inherit' });
  if (tsc.status !== 0) process.exit(tsc.status ?? 1);

  console.log(`Compat OK for @angular/core@${angularCore}`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
