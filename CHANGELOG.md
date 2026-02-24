# Changelog

All notable changes to this project will be documented in this file.  Contributors and maintainers **must** record every meaningful change here using an industry-standard format.

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

No unreleased changes yet.

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

[Unreleased]: https://github.com/narainkarthikv/contribution-cards/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/narainkarthikv/contribution-cards/releases/tag/v1.0.0
