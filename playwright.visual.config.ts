import { defineConfig, devices } from '@playwright/test';

const STORYBOOK_PORT = 6010;
const baseURL = `http://127.0.0.1:${STORYBOOK_PORT}`;

export default defineConfig({
  testDir: 'projects/components/e2e-visual',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 1 : 0,
  workers: process.env['CI'] ? 2 : undefined,
  reporter: process.env['CI'] ? [['github'], ['list']] : [['list']],
  snapshotPathTemplate: '{testDir}/__snapshots__/{testFilePath}/{arg}{ext}',
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      animations: 'disabled',
    },
  },
  use: {
    baseURL,
    ...devices['Desktop Chrome'],
    viewport: { width: 800, height: 480 },
  },
  webServer: {
    command: `bunx http-server storybook-static -a 127.0.0.1 -p ${STORYBOOK_PORT} -s`,
    url: baseURL,
    reuseExistingServer: !process.env['CI'],
    timeout: 120_000,
  },
});
