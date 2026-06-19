import { test, expect } from '@playwright/test';
import { mockGitHubApi, waitForContributorCards } from '../support/githubApiMock';

test.describe('Contributors page', () => {
  test.beforeEach(async ({ page }) => {
    await mockGitHubApi(page);
    await page.goto('http://localhost:5173/contributors');
  });

  test('loads contributors and opens contributor modal', async ({ page }) => {
    const card = (await waitForContributorCards(page)).first();

    await card.click();

    const dialog = page.getByRole('dialog', { name: /Profile details for/i });
    await expect(dialog).toBeVisible({ timeout: 5000 });
  });
});
