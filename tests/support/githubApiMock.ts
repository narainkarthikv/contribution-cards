import { expect, type Locator, type Page } from '@playwright/test';

const apiBaseUrl = 'https://api.github.com';

export const repositories = [
  'narainkarthikv/contribution-cards',
  'narainkarthikv/fitprogressr',
  'narainkarthikv/helios',
  'narainkarthikv/nmoji',
  'narainkarthikv/ownlyst',
  'narainkarthikv/markdown-shop',
] as const;

const avatarDataUrl = (label: string): string =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
      <rect width="120" height="120" rx="60" fill="#4f46e5" />
      <text x="50%" y="54%" text-anchor="middle" font-size="42" fill="white" font-family="Arial, sans-serif">${label}</text>
    </svg>`
  )}`;

export const contributorFixtures = {
  alice: {
    login: 'alice',
    name: 'Alice Johnson',
    bio: 'Frontend engineer building polished contributor experiences.',
    avatar_url: avatarDataUrl('A'),
    html_url: 'https://github.com/alice',
  },
  bob: {
    login: 'bob',
    name: 'Bob Lee',
    bio: 'Full-stack maintainer focused on reliability and DX.',
    avatar_url: avatarDataUrl('B'),
    html_url: 'https://github.com/bob',
  },
  cara: {
    login: 'cara',
    name: 'Cara Singh',
    bio: 'Open source contributor helping across product surfaces.',
    avatar_url: avatarDataUrl('C'),
    html_url: 'https://github.com/cara',
  },
} as const;

export const contributorsByRepository: Record<
  string,
  Array<{
    login: keyof typeof contributorFixtures;
    contributions: number;
  }>
> = {
  'narainkarthikv/contribution-cards': [
    { login: 'alice', contributions: 12 },
    { login: 'bob', contributions: 7 },
  ],
  'narainkarthikv/fitprogressr': [
    { login: 'alice', contributions: 5 },
    { login: 'cara', contributions: 4 },
  ],
  'narainkarthikv/helios': [
    { login: 'bob', contributions: 9 },
    { login: 'cara', contributions: 3 },
  ],
  'narainkarthikv/nmoji': [{ login: 'cara', contributions: 8 }],
  'narainkarthikv/ownlyst': [{ login: 'alice', contributions: 6 }],
  'narainkarthikv/markdown-shop': [{ login: 'bob', contributions: 2 }],
};

/**
 * Intercepts all GitHub API traffic so E2E tests never depend on live rate
 * limits, tokens, or third-party availability.
 */
export const mockGitHubApi = async (page: Page): Promise<void> => {
  await page.route(`${apiBaseUrl}/**`, async (route) => {
    const requestUrl = new URL(route.request().url());
    const pathName = requestUrl.pathname;

    if (pathName === '/user') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ login: 'test-user' }),
      });
      return;
    }

    if (pathName === '/rate_limit') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          rate_limit: { limit: 5000, remaining: 4999 },
        }),
      });
      return;
    }

    const repositoryMatch = pathName.match(
      /^\/repos\/([^/]+)\/([^/]+)\/contributors$/
    );
    if (repositoryMatch) {
      const [, owner, repository] = repositoryMatch;
      const repositoryKey = `${owner}/${repository}`;
      const repositoryContributors = contributorsByRepository[repositoryKey] ?? [];

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          repositoryContributors.map(({ login, contributions }) => {
            const contributor = contributorFixtures[login];
            return {
              login: contributor.login,
              contributions,
              avatar_url: contributor.avatar_url,
              html_url: contributor.html_url,
            };
          })
        ),
      });
      return;
    }

    const userMatch = pathName.match(/^\/users\/([^/]+)$/);
    if (userMatch) {
      const [, login] = userMatch;
      const contributor =
        contributorFixtures[login as keyof typeof contributorFixtures];

      await route.fulfill({
        status: contributor ? 200 : 404,
        contentType: 'application/json',
        body: JSON.stringify(contributor ?? { message: 'Not Found' }),
      });
      return;
    }

    await route.fulfill({
      status: 404,
      contentType: 'application/json',
      body: JSON.stringify({ message: `Unhandled GitHub API route: ${pathName}` }),
    });
  });
};

export const dismissTokenWarning = async (page: Page): Promise<void> => {
  const dismissWarning = page.getByRole('button', {
    name: /dismiss warning/i,
  });

  if (await dismissWarning.isVisible().catch(() => false)) {
    await dismissWarning.click();
  }
};

/**
 * Wait for mocked contributor content to replace the skeleton state.
 */
export const waitForContributorCards = async (
  page: Page
): Promise<Locator> => {
  await page.waitForLoadState('domcontentloaded');
  await dismissTokenWarning(page);

  await expect(
    page.getByText('Failed to Load Contributors'),
    'The contributors page should not show a loading error.'
  ).toHaveCount(0);

  await expect(
    page.getByText('No Contributors Found'),
    'The contributors page should render mocked contributor data.'
  ).toHaveCount(0);

  const contributorCards = page.locator(
    'article[aria-label*="Contributor card"]'
  );

  await expect(
    contributorCards.first(),
    'Expected contributor cards to render on the contributors page.'
  ).toBeVisible({ timeout: 20_000 });

  return contributorCards;
};
