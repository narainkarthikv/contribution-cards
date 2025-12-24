# 🎴 Contribution Cards

> **Showcase your profile with beautifully designed contributor cards**

Welcome to **Contribution Cards**! This project lets you design and showcase your profile cards. It's a fun way to get started with open-source, practice your frontend skills, and join a friendly community. Whether you're a beginner or a pro, your contribution is welcome! 🤍🤝

[![GitHub issues](https://img.shields.io/github/issues/narainkarthikv/contribution-cards?style=flat-square)](https://github.com/narainkarthikv/contribution-cards/issues)
[![GitHub forks](https://img.shields.io/github/forks/narainkarthikv/contribution-cards?style=flat-square)](https://github.com/narainkarthikv/contribution-cards/network)
[![GitHub stars](https://img.shields.io/github/stars/narainkarthikv/contribution-cards?style=flat-square)](https://github.com/narainkarthikv/contribution-cards/stargazers)
[![MIT License](https://img.shields.io/github/license/narainkarthikv/contribution-cards?style=flat-square)](./MIT-LICENSE.txt)
[![Version](https://img.shields.io/github/package-json/v/narainkarthikv/contribution-cards?style=flat-square)](./package.json)
---

## 🌟 Why Contribution Cards?

**Contribution Cards** is a lightweight, beginner-friendly project designed to help you **learn web development**, **contribute to open-source**, and **build your portfolio**. Whether you're new to coding or an experienced developer, this project offers a welcoming space to showcase your skills and connect with others.

✨ **Key Features:**

- 👤 **Create Your Profile Card** — Add your details, social links, and bio
- 🎨 **Beautiful Design** — Responsive, modern UI with TailwindCSS
- 🌓 **Dark & Light Themes** — Toggle between themes with smooth transitions
- 🔗 **Social Links** — Showcase GitHub, LinkedIn, portfolio, and more
- 📱 **Fully Responsive** — Perfect on desktop, tablet, and mobile devices
- 💡 **Learning Friendly** — Great for beginners learning HTML, CSS, and JavaScript
- 🚀 **Easy Setup** — Clone, add your card, and submit a PR
- 🎓 **Study Resources** — Links to freeCodeCamp, W3Schools, and GitHub Docs

---

## 📑 Table of Contents

- [Why Contribution Cards?](#-why-contribution-cards)
# Contribution Cards

Lightweight Vite + React + TypeScript app for showcasing contributor/profile cards. This repository includes a production-ready GitHub integration with advanced rate limiting and a dual-layer caching system (memory + localStorage) to significantly reduce API calls and improve perceived performance.

Highlights:
- Built with `vite`, `react` (v19) and `typescript`
- Styling with `tailwindcss`
- Stale-While-Revalidate pattern via `swr`
- Production-ready rate limiting & caching (see `docs/`)

Live demo: https://narainkarthikv.github.io/contribution-cards/

**Quick links**
- Docs (start here): `docs/RATE_LIMITING_CACHING_README.md`
- Implementation summary: `docs/IMPLEMENTATION_SUMMARY.md`
- Developer quick start: `docs/QUICK_START.md`

---

## Tech stack
- Frontend: `React` + `TypeScript`
- Bundler: `Vite`
- Styling: `TailwindCSS`
- Data fetching: `swr` (SWR pattern in `src/hooks`)

---

## Local development
Prerequisites: Node 18+ and npm

Install and run:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

---

## What’s implemented (short)
- Advanced rate limiting in `src/lib/github.ts` (concurrent control, backoff, retries, deduplication)
- Dual-layer caching in `src/lib/cache.ts` (memory + localStorage, TTLs, versioning)
- SWR / stale-while-revalidate hook in `src/hooks/useContributors.ts`
- Debug & monitoring utilities in `src/lib/debugUtils.ts` exposed as `__GITHUB_CACHE_DEBUG__` in console

For full technical details, performance numbers and configuration options see `docs/CACHING_AND_RATE_LIMITING.md` and `docs/RATE_LIMITING_CACHING_README.md`.

---

## Repo layout (top-level)
```
. 
├── docs/        # Rate limiting & caching docs, quick start, implementation summary
├── public/      # Static assets
├── src/         # Application source (components, hooks, lib, pages, types)
├── index.html
├── package.json
└── README.md
```

---

## Contributing
Standard flow:

```bash
git checkout -b feature/your-change
# implement
git add .
git commit -m "feat: brief description"
git push origin feature/your-change
```

Open a PR against `develop`. If you're adding or editing data used by the app, check the relevant code in `src/pages` and `src/lib`.

---

## Debugging & quick checks
- Console helper: `__GITHUB_CACHE_DEBUG__.help()`
- Cache stats: `__GITHUB_CACHE_DEBUG__.cache.getStats()`
- Clear cache: `__GITHUB_CACHE_DEBUG__.cache.clearAll()`

---
