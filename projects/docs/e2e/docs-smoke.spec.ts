import { expect, test } from '@playwright/test';

test.describe('Docs site smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/es');
    await page.locator('docs-shell').waitFor({ state: 'attached', timeout: 30_000 });
  });

  test('landing shows stable carousel', async ({ page }) => {
    await expect(page.locator('.landing-carousel')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('.landing-carousel__card').first()).toBeVisible();
  });

  test('get-started loads in en and es', async ({ page }) => {
    await page.goto('/en/get-started');
    await page.locator('docs-shell').waitFor({ state: 'attached' });
    await expect(page.locator('docs-page')).toBeVisible();

    await page.goto('/es/get-started');
    await page.locator('docs-shell').waitFor({ state: 'attached' });
    await expect(page.locator('docs-page')).toBeVisible();
  });

  test('api table descriptions follow locale on input-text', async ({ page }) => {
    await page.goto('/en/components/input-text');
    await page.locator('docs-shell').waitFor({ state: 'attached' });
    await page.locator('.docs-component-steps [auStep="api"]').click();
    await expect(page.locator('docs-component-api-table').first()).toContainText(
      /show\/hide button when/i,
    );
    await expect(page.locator('docs-component-api-table').first()).not.toContainText(
      /botón mostrar/i,
    );

    await page.goto('/es/components/input-text');
    await page.locator('docs-shell').waitFor({ state: 'attached' });
    await page.locator('.docs-component-steps [auStep="api"]').click();
    await expect(page.locator('docs-component-api-table').first()).toContainText(
      /botón mostrar\/ocultar/i,
    );
  });

  test('get-started component snippet follows locale', async ({ page }) => {
    await page.goto('/en/get-started');
    await page.locator('docs-shell').waitFor({ state: 'attached' });
    const enCode = page.locator('docs-code-block').last().locator('code');
    await expect(enCode).toContainText('Remember me');
    await expect(enCode).not.toContainText('Recordarme');

    await page.goto('/es/get-started');
    await page.locator('docs-shell').waitFor({ state: 'attached' });
    const esCode = page.locator('docs-code-block').last().locator('code');
    await expect(esCode).toContainText('Recordarme');
    await expect(esCode).not.toContainText('Remember me');
  });

  test('code block labels follow locale', async ({ page }) => {
    await page.goto('/en/get-started');
    await page.locator('docs-shell').waitFor({ state: 'attached' });
    const enToggle = page.locator('docs-code-block').first().getByRole('button').first();
    await expect(enToggle).toContainText(/hide code/i);
    await expect(enToggle).not.toContainText(/ocultar código/i);

    await page.goto('/es/get-started');
    await page.locator('docs-shell').waitFor({ state: 'attached' });
    const esToggle = page.locator('docs-code-block').first().getByRole('button').first();
    await expect(esToggle).toContainText(/ocultar código/i);
    await expect(esToggle).not.toContainText(/hide code/i);
  });

  test('component doc page loads', async ({ page }) => {
    await page.goto('/es/components/button');
    await page.locator('docs-shell').waitFor({ state: 'attached' });
    await expect(page.locator('h1, .docs-page__title').first()).toBeVisible();
  });

  test('theme select updates data-au-theme', async ({ page }) => {
    await page.goto('/es/themes');
    await page.locator('docs-shell').waitFor({ state: 'attached' });
    const themeField = page.locator('au-select').nth(1);
    await themeField.click();
    await page.getByRole('option', { name: /oscuro|dark/i }).click();
    await expect(page.locator('html')).toHaveAttribute('data-au-theme', /dark|light/);
  });

  test('storybook external link is present', async ({ page }) => {
    const link = page.getByRole('link', { name: /storybook/i });
    await expect(link.first()).toBeVisible();
    await expect(link.first()).toHaveAttribute('href', /storybook|netlify/i);
  });
});
