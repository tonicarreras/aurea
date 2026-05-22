import type { TestRunnerConfig } from '@storybook/test-runner';

/**
 * Test-runner: visit stories, run `play`, and fail on assertion, render, or a11y errors.
 * Axe failures use `parameters.a11y.test: 'error'` from `preview.ts` (full violation report in CI logs).
 * @see https://storybook.js.org/docs/writing-tests/accessibility-testing#test-behavior
 * @see https://storybook.js.org/docs/writing-tests/integrations/test-runner
 */
const config: TestRunnerConfig = {
  logLevel: process.env['CI'] ? 'warn' : 'info',
};

export default config;
