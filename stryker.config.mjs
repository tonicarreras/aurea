/**
 * Optional mutation testing pilot (dialog, form-field, select).
 * Install: bun add -d @stryker-mutator/core @stryker-mutator/vitest-runner
 * Run: bunx stryker run
 */
export default {
  mutate: [
    'projects/components/src/lib/dialog/**/*.ts',
    'projects/components/src/lib/form-field/**/*.ts',
    'projects/components/src/lib/select/**/*.ts',
    '!**/*.spec.ts',
    '!**/*.stories.ts',
  ],
  testRunner: 'vitest',
  coverageAnalysis: 'perTest',
  thresholds: { high: 80, low: 60, break: 50 },
};
