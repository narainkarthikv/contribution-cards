import { test, expect } from '@playwright/test';
import {
  contributorFixtures,
  mockGitHubApi,
  waitForContributorCards,
} from '../support/githubApiMock';

test.describe('Contribution Cards - E2E flows', () => {
  test.beforeEach(async ({ page }) => {
    await mockGitHubApi(page);
    await page.goto('/');
  });

  test('Home -> navigate to contributors page', async ({ page }) => {
    const explore = page.getByRole('button', { name: /Explore contributors/i });
    await expect(explore).toBeVisible();

    await explore.click();

    // The filters panel is only rendered after mocked contributor data arrives.
    await expect(page.getByText('Contributor Explorer')).toBeVisible();

    const card = (await waitForContributorCards(page)).first();
    await expect(card).toBeVisible();
  });

  test('Filters: repo dropdown, search, sort, and sort direction', async ({ page }) => {
    await page.goto('/contributors');
    const cards = await waitForContributorCards(page);

    const repoToggle = page.locator('button[aria-haspopup="listbox"]');
    await expect(repoToggle).toBeVisible();
    await repoToggle.click();

    const listbox = page.getByRole('listbox', { name: /Select repository/i });
    await expect(listbox).toBeVisible();

    await listbox.getByRole('button', { name: /fitprogressr/i }).click();
    await expect(repoToggle).toContainText('fitprogressr');
    await expect(cards).toHaveCount(2);

    const search = page.getByLabel('Search contributors');
    await expect(search).toBeVisible();
    await search.fill('alice');
    await expect(cards.filter({ hasText: contributorFixtures.alice.name })).toHaveCount(1);
    await expect(cards.filter({ hasText: 'Cara Singh' })).toHaveCount(0);

    const sortBy = page.getByLabel('Sort by');
    await sortBy.selectOption('name');
    await expect(sortBy).toHaveValue('name');

    const asc = page.getByRole('radio', { name: /Sort ascending/i });
    const desc = page.getByRole('radio', { name: /Sort descending/i });
    await desc.click();
    await expect(desc).toHaveAttribute('aria-checked', 'true');
    await asc.click();
    await expect(asc).toHaveAttribute('aria-checked', 'true');
  });

  test('Theme toggle and token warning banner', async ({ page }) => {
    await page.goto('/contributors');

    // If token warning appears, dismiss it
    const dismiss = page.getByRole('button', { name: /Dismiss warning/i });
    if (await dismiss.isVisible().catch(() => false)) {
      await dismiss.click();
      await expect(dismiss).not.toBeVisible();
    }

    // Toggle theme button in header
    const themeToggle = page.getByRole('button', { name: /Toggle theme/i });
    await expect(themeToggle).toBeVisible();

    const html = page.locator('html');
    const initial = await html.getAttribute('data-theme');

    await themeToggle.click();
    const after = await html.getAttribute('data-theme');

    expect(after).not.toBe(initial);
  });

  test('Open contributor modal and close', async ({ page }) => {
    await page.goto('/contributors');

    const card = (await waitForContributorCards(page)).first();

    await card.click();

    const dialog = page.getByRole('dialog', { name: /Profile details for/i });
    await expect(dialog).toBeVisible({ timeout: 5000 });

    // Close modal via close button or overlay
    const closeBtn = dialog.getByRole('button', { name: /Close/i }).first();
    if (await closeBtn.isVisible().catch(() => false)) {
      await closeBtn.click();
      await expect(dialog).not.toBeVisible();
    } else {
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
    }
  });
});
