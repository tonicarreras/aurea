import { defineConfig, devices } from '@playwright/test';

const DOCS_PORT = 6020;
const baseURL = `http://127.0.0.1:${DOCS_PORT}`;

export default defineConfig({
  testDir: 'projects/docs/e2e',
  fullyParallel: true,
  retries: process.env['CI'] ? 1 : 0,
  reporter: process.env['CI'] ? [['github'], ['list']] : [['list']],
  use: {
    baseURL,
    ...devices['Desktop Chrome'],
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    // -P: SPA fallback (http-server -s is "silent", not single-page-app mode)
    command: `bunx http-server dist/docs/browser -a 127.0.0.1 -p ${DOCS_PORT} -c-1 -P ${baseURL}/?`,
    url: baseURL,
    reuseExistingServer: !process.env['CI'],
    timeout: 120_000,
  },
});
