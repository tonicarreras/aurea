import type { TestRunnerConfig } from '@storybook/test-runner';

/**
 * Test-runner hook: visit stories, run `play`, and fail on assertion or render errors.
 * @see https://storybook.js.org/docs/writing-tests/integrations/test-runner
 */
const config: TestRunnerConfig = {
  logLevel: process.env.CI ? 'warn' : 'info',
};

export default config;
