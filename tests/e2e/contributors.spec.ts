import { test, expect } from '@playwright/test';

test.describe('Contributors page', () => {
  test.beforeEach(async ({ page }) => {
    // Precondition: dev server running at http://localhost:5173
    await page.goto('http://localhost:5173');
  });

  test('loads contributors and opens contributor modal', async ({ page }) => {
    // Wait for at least one contributor card to appear
    const card = page.getByRole('article', { name: /Contributor card for/i }).first();
    await expect(card).toBeVisible({ timeout: 15000 });

    // Click the card to open the details modal
    await card.click();

    // Verify the contributor modal opens
    const dialog = page.getByRole('dialog', { name: /Profile details for/i });
    await expect(dialog).toBeVisible({ timeout: 5000 });
  });
});
