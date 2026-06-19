import { test, expect } from '@playwright/test';
import {
  mockGitHubApi,
  waitForContributorCards,
} from './support/githubApiMock';

test.describe('Smoke Tests - Contribution Cards', () => {
  test.beforeEach(async ({ page }) => {
    await mockGitHubApi(page);
  });

  test('home page loads and navigation to contributors works', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    await expect(
      page.getByRole('heading', {
        name: /spotlight the builders shaping wisdom fox community/i,
      }),
      'Expected the home hero heading to be visible.'
    ).toBeVisible();

    const exploreContributorsButton = page.getByRole('button', {
      name: /explore contributors/i,
    });

    await expect(
      exploreContributorsButton,
      'Expected the primary navigation CTA to be accessible on the home page.'
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: /view the repo/i }),
      'Expected the supporting repository navigation link to be visible.'
    ).toBeVisible();

    await exploreContributorsButton.click();

    await expect(
      page,
      'Expected navigation to reach the contributors page.'
    ).toHaveURL(/\/contributors$/);

    await expect(
      page.getByRole('button', { name: /go to home/i }),
      'Expected the contributors page navigation header to be visible.'
    ).toBeVisible();

    await waitForContributorCards(page);
  });

  test('contributors display with expected card structure', async ({
    page,
  }) => {
    test.slow();

    await page.goto('/contributors');
    const contributorCards = await waitForContributorCards(page);

    expect(
      await contributorCards.count(),
      'Expected at least one contributor card to be rendered.'
    ).toBeGreaterThan(0);

    const firstCard = contributorCards.first();

    await expect(
      firstCard.getByRole('heading'),
      'Expected each contributor card to show a contributor name.'
    ).toBeVisible();

    await expect(
      firstCard.locator('img'),
      'Expected each contributor card to show an avatar.'
    ).toBeVisible();

    await expect(
      firstCard.locator('[aria-label$="contributions"]'),
      'Expected each contributor card to show a contribution count.'
    ).toBeVisible();

    await firstCard.hover();

    await expect(
      firstCard.getByRole('link', { name: /open .* github profile/i }),
      'Expected contributor cards to expose a GitHub profile link.'
    ).toBeVisible();
  });

  test('repository filtering updates contributors', async ({ page }) => {
    test.slow();

    await page.goto('/contributors');
    await waitForContributorCards(page);

    const repositoryFilter = page.locator('button[aria-haspopup="listbox"]');
    await expect(
      repositoryFilter,
      'Expected the repository filter control to be visible.'
    ).toBeVisible();

    await repositoryFilter.click();

    const repositoryListbox = page.getByRole('listbox', {
      name: /select repository/i,
    });
    await expect(repositoryListbox).toBeVisible();

    await repositoryListbox.getByRole('button', { name: /fitprogressr/i }).click();

    const filteredCards = await waitForContributorCards(page);

    await expect(
      repositoryFilter,
      'Expected the selected repository label to update after filtering.'
    ).toContainText('fitprogressr');

    await expect(
      filteredCards,
      'Expected only mocked contributors for the selected repository to remain.'
    ).toHaveCount(2);
    await expect(filteredCards.filter({ hasText: 'Alice Johnson' })).toHaveCount(1);
    await expect(filteredCards.filter({ hasText: 'Cara Singh' })).toHaveCount(1);

    await filteredCards.first().click();

    const contributorDialog = page.getByRole('dialog', {
      name: /profile details for/i,
    });

    await expect(contributorDialog).toBeVisible();
    await expect(
      contributorDialog.getByRole('heading', {
        name: 'narainkarthikv/fitprogressr',
      }),
      'Expected the selected repository to appear in the contributor details.'
    ).toBeVisible();
  });
});
