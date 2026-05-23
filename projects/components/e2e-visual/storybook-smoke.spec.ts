import { expect, test } from '@playwright/test';

import { VISUAL_STORIES } from './visual-story-manifest';

/**
 * Smoke visual regression — one snapshot per stable component story.
 * Manifest: sync with `bun run sync:visual-stories` from COMPONENT_MATURITY.
 */
for (const story of VISUAL_STORIES) {
  test(`visual: ${story.name}`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
    await page.locator('#storybook-root').waitFor({ state: 'visible' });
    await page.waitForTimeout(200);
    await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story.name}.png`);
  });
}
