import { test, expect } from '@playwright/test';

test.describe('Contribution Cards - E2E flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Home -> navigate to contributors page', async ({ page }) => {
    const explore = page.getByRole('button', { name: /Explore contributors/i });
    await expect(explore).toBeVisible();

    await explore.click();

    // FiltersBar should be visible on contributors page
    await expect(page.getByText('Contributor Explorer')).toBeVisible();

    // Wait for at least one contributor card
    const card = page.getByRole('article', { name: /Contributor card for/i }).first();
    await expect(card).toBeVisible({ timeout: 15000 });
  });

  test('Filters: repo dropdown, search, sort, and sort direction', async ({ page }) => {
    await page.goto('/contributors');

    // Open repo dropdown
    const repoToggle = page.getByRole('button', { name: /Repo:/i }).first();
    await expect(repoToggle).toBeVisible();
    await repoToggle.click();

    const listbox = page.getByRole('listbox', { name: /Select repository/i });
    await expect(listbox).toBeVisible();

    // Select the first option
    const firstOption = listbox.getByRole('option').first();
    await firstOption.click();

    // Search input existence and typing
    const search = page.getByRole('textbox', { name: /Search contributors/i });
    await expect(search).toBeVisible();
    await search.fill('narain');

    // Change sort to 'Name'
    const sortBy = page.getByLabel('Sort by');
    await sortBy.selectOption('name');
    await expect(sortBy).toHaveValue('name');

    // Toggle sort order
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

    const card = page.getByRole('article', { name: /Contributor card for/i }).first();
    await expect(card).toBeVisible({ timeout: 15000 });

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
