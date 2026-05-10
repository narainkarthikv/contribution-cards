![License](https://img.shields.io/github/license/narainkarthikv/contribution-cards)
[![CI](https://github.com/narainkarthikv/contribution-cards/actions/workflows/ci.yml/badge.svg)](https://github.com/narainkarthikv/contribution-cards/actions/workflows/ci.yml)
![Version](https://img.shields.io/badge/version-1.1.0-blue)
![Last Commit](https://img.shields.io/github/last-commit/narainkarthikv/contribution-cards)
[![GitHub issues](https://img.shields.io/github/issues/narainkarthikv/contribution-cards)](https://github.com/narainkarthikv/contribution-cards/issues)
[![GitHub stars](https://img.shields.io/github/stars/narainkarthikv/contribution-cards)](https://github.com/narainkarthikv/contribution-cards/stargazers)

# Contribution Cards

**Showcase GitHub contributors with beautifully designed profile cards.**

Contribution Cards is a lightweight, modern web application that transforms GitHub contributor data into stunning, interactive profile cards. Explore contributors from multiple repositories, filter by project, and discover amazing open-source developers with zero server dependency.

## ✨ Features

- **Multi-Repo Support**: Aggregate contributors from multiple repositories
- **Smart Filtering**: Search and sort by contributions, join date, and repo
- **Dark Mode**: Built-in theme toggle with smooth transitions
- **Performance First**: Dual-layer caching (memory + localStorage)
- **Rate Limit Smart**: Concurrent control, backoff, retries, and deduplication
- **Responsive UI**: Optimized for desktop, tablet, and mobile
- **Brand Typography**: Sora font across the interface
- **Blue Palette**: Consistent, accessible blue theme tokens

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher

### Local Installation

```bash
# Clone the repository
git clone https://github.com/narainkarthikv/contribution-cards.git
cd contribution-cards

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **http://localhost:5173** to see the app.

### Production Build

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **SWR** - Stale-while-revalidate data fetching
- **Lucide React** - Icons
- **Sora** - Brand typography

<p align="center">
	<img src="https://skillicons.dev/icons?i=react,vite,ts,tailwind" alt="Tech Stack" />
</p>

## 📁 Project Structure

```
contribution-cards/
├── src/
│   ├── components/     # Reusable UI components
│   ├── constants/      # App constants and repositories
│   ├── controllers/    # App-level state and logic
│   ├── lib/            # GitHub API, caching, debug utilities
│   ├── models/         # TypeScript interfaces
│   ├── pages/          # Page components
│   ├── services/       # Data aggregation and API services
│   ├── types/          # Type definitions
│   ├── utils/          # Helper utilities
│   └── App.tsx         # Root component with routing
├── public/             # Static assets
└── .github/            # GitHub templates and workflows
```

## 🔑 Environment Variables

**VITE_GITHUB_TOKEN** (optional): GitHub Personal Access Token for higher API rate limits.

No token required for local development with cached data.

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style Guidelines

- **Formatting**: Follow existing conventions and 2-space indentation
- **React**: Functional components with hooks
- **TypeScript**: Prefer typed props and models
- **Accessibility**: Semantic HTML and keyboard navigation

### Advanced Features

- **Rate Limiting**: Concurrent control with exponential backoff and retries
- **Dual-Layer Caching**: Memory cache + localStorage persistence
- **SWR Pattern**: Serve stale data while revalidating in the background
- **Debug Tools**: Console helpers via `__GITHUB_CACHE_DEBUG__`

### Formatting (Prettier)

Run these from the repository root so Prettier checks both frontend and backend:

```bash
# Check formatting
npx prettier --check .

# Write formatting fixes
npx prettier --write .
```

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

1. **Read the Guidelines**: Check [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed instructions
2. **Pick an Issue**: Browse [open issues](https://github.com/narainkarthikv/contribution-cards/issues) or create a new one
3. **Fork & Branch**: Create a feature branch from your fork
4. **Code**: Follow our code style and commit conventions
5. **Test**: Ensure everything works locally
6. **Submit PR**: Open a pull request with a clear description

### Ways to Contribute

- 🐛 **Fix bugs** and improve stability
- ✨ **Add features** that enhance the app
- 📚 **Improve documentation** and examples
- 🎨 **Enhance UI/UX** and accessibility
- ⚡ **Optimize performance**
- 🔧 **Improve caching and rate limiting strategies**

## 💬 Community & Support

- **Issues**: [Report bugs or request features](https://github.com/narainkarthikv/contribution-cards/issues)
- **Discussions**: [Ask questions and share ideas](https://github.com/narainkarthikv/contribution-cards/discussions)
- **Pull Requests**: [Contribute code improvements](https://github.com/narainkarthikv/contribution-cards/pulls)

## 📖 Documentation

- [Contributing Guide](./CONTRIBUTING.md) - How to contribute
- [Design System](./design-system.md) - Design tokens and interface guidance
- [Security Policy](./SECURITY.md) - Supported versions and vulnerability reporting
- [Changelog](./CHANGELOG.md) - Release history and upcoming changes
- [Contributors](./Contributors.md) - Contributor list
- [License](./LICENSE) - MIT License details

## 📜 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) for details.

**Summary:** You are free to use, modify, and distribute this software for any purpose, including commercial use.

## 🌟 Show Your Support

If Contribution Cards helps you discover amazing developers:

- ⭐ Star the repository
- 🐛 Report issues you encounter
- 💡 Share your feature ideas
- 🤝 Contribute code or docs
- 📢 Tell others about the project

## 🔗 Links

- **Production**: [https://contribution-cards.netlify.app/](https://contribution-cards.netlify.app/)
- **Development**: [https://contributioncards-dev.vercel.app/](https://contributioncards-dev.vercel.app/)
- **Repository**: [https://github.com/narainkarthikv/contribution-cards](https://github.com/narainkarthikv/contribution-cards)

---

**Built with ❤️ by the Wisdom Fox community**

Celebrating open-source contributors, one card at a time! 🚀
