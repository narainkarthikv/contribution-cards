import { expect, test, type Page } from '@playwright/test';
import {
  contributorFixtures,
  mockGitHubApi,
  repositories,
  waitForContributorCards,
} from './support/githubApiMock';

const apiBaseUrl = 'https://api.github.com';

type Diagnostics = {
  consoleErrors: string[];
  pageErrors: string[];
  failedRequests: string[];
};

const installDiagnostics = (page: Page): Diagnostics => {
  const diagnostics: Diagnostics = {
    consoleErrors: [],
    pageErrors: [],
    failedRequests: [],
  };

  page.on('console', (message) => {
    if (message.type() === 'error') {
      diagnostics.consoleErrors.push(message.text());
    }
  });

  page.on('pageerror', (error) => {
    diagnostics.pageErrors.push(error.message);
  });

  page.on('requestfailed', (request) => {
    const failureText = request.failure()?.errorText ?? 'unknown';
    if (
      request.url().startsWith('http') &&
      failureText !== 'net::ERR_ABORTED'
    ) {
      diagnostics.failedRequests.push(
        `${request.method()} ${request.url()} :: ${failureText}`
      );
    }
  });

  return diagnostics;
};

const expectNoRuntimeIssues = (diagnostics: Diagnostics): void => {
  expect(diagnostics.consoleErrors, 'console errors').toEqual([]);
  expect(diagnostics.pageErrors, 'uncaught page errors').toEqual([]);
  expect(diagnostics.failedRequests, 'failed network requests').toEqual([]);
};

test.describe('Integration Tests - Contribution Cards', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    await mockGitHubApi(page);
  });

  test('persists the selected theme across reloads', async ({ page }) => {
    const diagnostics = installDiagnostics(page);

    await test.step('Open the app and navigate to the contributors page', async () => {
      await page.goto('/');
      await expect(
        page.getByRole('button', { name: /Explore contributors/i })
      ).toBeVisible();
      await page.getByRole('button', { name: /Explore contributors/i }).click();
      await expect(page).toHaveURL(/\/contributors$/);
      await waitForContributorCards(page);
    });

    const root = page.locator('html');
    const themeToggle = page.getByRole('button', { name: /Toggle theme/i });
    const initialTheme =
      (await root.getAttribute('data-theme')) === 'dark' ? 'dark' : 'light';
    const switchedTheme = initialTheme === 'dark' ? 'light' : 'dark';

    await test.step('Switch the theme and verify DOM + localStorage state', async () => {
      await themeToggle.click();
      await expect(root).toHaveAttribute('data-theme', switchedTheme);

      if (switchedTheme === 'dark') {
        await expect(root).toHaveClass(/dark/);
      } else {
        await expect(root).not.toHaveClass(/dark/);
      }

      const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
      expect(storedTheme).toBe(switchedTheme);
    });

    await test.step('Reload the page and verify theme persistence', async () => {
      await page.goto('/');
      await page.reload();
      await page.waitForLoadState('networkidle');
      await expect(root).toHaveAttribute('data-theme', switchedTheme);

      const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
      expect(storedTheme).toBe(switchedTheme);

      await page.getByRole('button', { name: /Explore contributors/i }).click();
      await waitForContributorCards(page);
      await expect(root).toHaveAttribute('data-theme', switchedTheme);
    });

    expectNoRuntimeIssues(diagnostics);
  });

  test('opens the contributor modal and shows contributor details', async ({
    page,
  }) => {
    const diagnostics = installDiagnostics(page);

    await test.step('Load contributor cards', async () => {
      await page.goto('/contributors');
      await waitForContributorCards(page);
    });

    const card = page
      .locator('article[aria-label="Contributor card for Alice Johnson"]')
      .first();

    await test.step('Open the contributor modal', async () => {
      await card.click();
      await expect(
        page.getByRole('dialog', { name: /Profile details for Alice Johnson/i })
      ).toBeVisible();
    });

    await test.step('Verify detailed contributor content is rendered', async () => {
      const dialog = page.getByRole('dialog', {
        name: /Profile details for Alice Johnson/i,
      });

      await expect(dialog.getByRole('heading', { name: 'Alice Johnson' })).toBeVisible();
      await expect(dialog.getByText('@alice')).toBeVisible();
      await expect(
        dialog.getByText(contributorFixtures.alice.bio, { exact: false })
      ).toBeVisible();
      await expect(dialog.getByText(/^Total commits$/)).toBeVisible();
      await expect(dialog.getByText(/^Repositories$/)).toBeVisible();
      await expect(
        dialog.getByRole('link', { name: /View GitHub Profile/i })
      ).toHaveAttribute('href', contributorFixtures.alice.html_url);
      await expect(
        dialog.getByRole('heading', { name: 'narainkarthikv/contribution-cards' })
      ).toBeVisible();
    });

    await test.step('Close the modal and confirm the card view returns', async () => {
      await page.getByRole('button', { name: /Close dialog/i }).click();
      await expect(
        page.getByRole('dialog', { name: /Profile details for Alice Johnson/i })
      ).not.toBeVisible();
      await expect(card).toBeVisible();
    });

    expectNoRuntimeIssues(diagnostics);
  });

  test('loads contributor data and reuses cached data on reload', async ({
    page,
  }) => {
    const diagnostics = installDiagnostics(page);
    const githubRequests: string[] = [];

    page.on('request', (request) => {
      if (request.url().startsWith(apiBaseUrl)) {
        githubRequests.push(request.url());
      }
    });

    await test.step('Load contributors and verify GitHub API activity', async () => {
      await page.goto('/contributors');
      await waitForContributorCards(page);

      expect(githubRequests.length).toBeGreaterThan(0);
      expect(
        githubRequests.some((url) =>
          repositories.some((repository) =>
            url.includes(`/repos/${repository}/contributors`)
          )
        )
      ).toBeTruthy();
    });

    await test.step('Confirm cache entries are stored after the first load', async () => {
      const cacheKeys = await page.evaluate(() =>
        Object.keys(localStorage).filter((key) => key.startsWith('github_cache_'))
      );

      expect(cacheKeys.length).toBeGreaterThan(0);
      expect(cacheKeys.some((key) => key.includes('contributors'))).toBeTruthy();
    });

    await test.step('Reload and verify the page can render from cache', async () => {
      githubRequests.length = 0;
      await page.reload();
      await waitForContributorCards(page);

      const visibleCards = await page
        .locator('article[aria-label*="Contributor card"]')
        .count();
      expect(visibleCards).toBeGreaterThan(0);
      expect(githubRequests).toEqual([]);
    });

    expectNoRuntimeIssues(diagnostics);
  });
});
