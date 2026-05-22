import { expect, test } from '@playwright/test';

/**
 * Smoke visual regression — one snapshot per critical story.
 * IDs match Storybook 10 static build (iframe.html?id=…).
 */
const VISUAL_STORIES: { name: string; id: string }[] = [
  { name: 'button-primary', id: 'aurea-button--primary' },
  { name: 'card-default', id: 'aurea-card--default' },
  { name: 'checkbox-default', id: 'aurea-checkbox--default' },
  { name: 'dialog-default', id: 'aurea-dialog--default' },
  { name: 'input-text-default', id: 'aurea-inputtext--default' },
  { name: 'select-default', id: 'aurea-select--default' },
  { name: 'message-success', id: 'aurea-message--success' },
  { name: 'badge-variants', id: 'aurea-badge--variants' },
  { name: 'pagination-default', id: 'aurea-pagination--default' },
];

for (const story of VISUAL_STORIES) {
  test(`visual: ${story.name}`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
    await page.locator('#storybook-root').waitFor({ state: 'visible' });
    await page.waitForTimeout(200);
    await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story.name}.png`);
  });
}
