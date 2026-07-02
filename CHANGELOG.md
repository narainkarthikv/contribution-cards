# Changelog

All notable changes to this project will be documented in this file. Contributors and maintainers **must** record every meaningful change here using an industry-standard format.

To keep the history clear:

1. Follow the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.
2. Use [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for releases.
3. Prefer [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) when writing commit messages so that changelog entries can be generated and reviewed easily.
4. Update the **Unreleased** section with each pull request; group changes under `Added`, `Changed`, `Fixed`, etc.
5. When cutting a release, move entries into a versioned heading and tag the GitHub release accordingly.

These practices make it easier for everyone to track what's been done and why, and ensure our changelog remains a reliable source of truth.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.0] - 2026-07-02

### Added

- Introduced a reusable filter dropdown component so repository and sort controls share the same UI structure, keyboard behavior, and menu interaction model.

### Changed

- Replaced the native sort field select with the shared dropdown control to keep the filters bar visually aligned across repository and sort filters.
- Updated the sort dropdown trigger copy to show `Filter by:` and aligned its spacing with the repository dropdown.
- Expanded end-to-end coverage for keyboard-driven dropdown interaction and the new button-based sort selection flow.

## [1.2.1] - 2026-06-23

### Changed

- Playwright e2e scripts and CI now run Chromium only for now; Firefox and WebKit are deferred.

## [1.1.1] - 2026-05-24

### Fixed

- Remediated all npm audit findings (including critical/high severity advisories) and verified `0 vulnerabilities` at `--audit-level=moderate`.
- Updated vulnerable direct dependency ranges in `package.json`:
  - `vite` to `^7.3.3`
  - `react-router-dom` to `^7.15.1`
  - `postcss` to `^8.5.15`
- Refreshed lockfile to pull patched transitive dependencies (including `handlebars`, `rollup`, `esbuild`, `minimatch`, `picomatch`, `ajv`, and `flatted`).

## [1.1.0] - 2026-05-10

### Added

- GitHub Actions CI badge in the README so contributors can see project health at a glance.

### Changed

- Release workflow now publishes the matching changelog section as GitHub release notes.
- README and package metadata now reference the current project version.
- Added the canonical `LICENSE` file expected by GitHub and project badges.
- Repository filtering now updates visible contributor profiles live when a repository is selected from the dropdown.
- Contributor list UI was simplified by removing the extra "showing contributors" display from the filters bar.
- Community-facing references were updated for the FitProgressr rebrand.
- Contributor detail modals now resolve the selected contributor against the all-repositories aggregate so the contribution list shows every repository they have commit activity in, even when the page is filtered to a single repository.
- The contributor modal layout was refreshed with a more modern SaaS-style presentation, improved spacing, richer contribution hierarchy, and clearer summary insights.
- The contributor modal now uses a taller adaptive desktop viewport so the content feels less cramped vertically while remaining scrollable when needed.

### Fixed

- First-time contributor greeting workflow copy now welcomes contributors to the contribution-cards community consistently.

## [1.0.0] - 2026-02-24

### Added

- Initial release of the Contribution Cards web application.
- React + Vite + TypeScript application foundation with modular components, pages, and service/controller layers.
- Contributor discovery experience with card and list layouts, contributor details, and repository-aware contributor aggregation.
- GitHub data integration with caching and rate-limiting architecture, including stale-while-revalidate data fetching patterns.
- Multi-repository support, global stats hooks, and reusable utility/model/type abstractions.
- Contributor/community scaffolding including templates, funding config, and project governance files.

### Changed

- UI system migrated and standardized around Tailwind CSS with ongoing design-language refinements.
- Theme behavior and token usage were unified across views for more consistent light/dark presentation.
- Internal architecture and code organization were refactored multiple times to improve maintainability.

### Fixed

- Dark mode toggling and persistence behavior across sessions.
- Multiple UI/UX issues across responsive layouts, card rendering, and interaction polish.
- Build and workflow breakages, including CI runner/workflow fixes and cleanup of unstable test/package artifacts.
- SEO and metadata issues, including index and meta-tag correctness improvements.

### Documentation

- README and contributor-facing docs were refreshed and expanded across multiple iterations.
- Issue and pull request templates were improved to streamline contribution flow.

### Refactored

- Codebase cleanup and structural refactors to remove duplication, improve consistency, and align with the current design system.

[Unreleased]: https://github.com/narainkarthikv/contribution-cards/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/narainkarthikv/contribution-cards/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/narainkarthikv/contribution-cards/compare/v1.1.1...v1.2.1
[1.1.1]: https://github.com/narainkarthikv/contribution-cards/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/narainkarthikv/contribution-cards/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/narainkarthikv/contribution-cards/releases/tag/v1.0.0
