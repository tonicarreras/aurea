import type { TestRunnerConfig } from '@storybook/test-runner';
import { injectAxe, checkA11y } from 'axe-playwright';

import { isStableStoryId } from './stable-story-ids';

/**
 * Test-runner: visit stories, run `play`, addon a11y (`parameters.a11y.test: 'error'`),
 * and axe-core on **stable** stories only.
 * @see https://storybook.js.org/docs/writing-tests/integrations/test-runner
 */
const config: TestRunnerConfig = {
  logLevel: process.env['CI'] ? 'warn' : 'info',
  tags: {
    include: ['au'],
    exclude: ['skip-test'],
  },
  async postVisit(page, context) {
    const storyRoot = page.locator('#storybook-root');
    await storyRoot.waitFor({ state: 'visible', timeout: 10_000 }).catch(() => undefined);

    if (!isStableStoryId(context.id)) {
      return;
    }

    await injectAxe(page);
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  },
};

export default config;
