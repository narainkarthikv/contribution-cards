# GitHub Copilot Coding Agent Instructions

## Purpose

These instructions onboard GitHub Copilot Coding Agent to the Contribution Cards repository.
Follow this document as the single source of truth for understanding the codebase, architecture, and development practices. Only search the repository if information here is missing or incorrect.

---

## Repository Summary

**Contribution Cards** is a lightweight, modern web application built with Vite, React, and TypeScript that showcases GitHub contributor profiles through beautifully designed cards. It serves as an entry point for open-source contributors and includes production-ready GitHub API integration with advanced rate limiting and caching mechanisms.

Key features:

- Display contributors from multiple GitHub repositories
- Advanced rate limiting and concurrent request management
- Dual-layer caching system (memory + localStorage)
- Dark/Light theme support with smooth transitions
- Responsive design optimized for all devices
- Stale-While-Revalidate (SWR) pattern for optimal performance
- Beginner-friendly project for learning web development
- Interactive profile cards with social links

The project is a single-page application using React with TypeScript, featuring modern React patterns (hooks) and a focus on performance optimization through intelligent caching.

---

## High-Level Repository Information

- **Repository Size**: Small to Medium (frontend-only, component-based architecture)
- **Primary Language**: TypeScript/JavaScript
- **Framework**: React 19.x with React Router
- **Build Tool**: Vite 7.x
- **Styling**: Tailwind CSS v4
- **Deployment**: Static site (GitHub Pages, Vercel, Netlify)
- **Key Libraries**:
  - `swr` - Stale-While-Revalidate pattern for data fetching
  - `framer-motion` - Smooth animations and transitions
  - `lucide-react` - Modern icon library
  - `react-router-dom` - Client-side routing
  - Custom GitHub rate limiting and caching layers

---

## Environment Requirements

### Runtime Versions

- **Node.js**: 18.x or newer
- **npm**: 9.x or newer (or pnpm/yarn)
- **React**: 19.x
- **TypeScript**: ~5.9.3

### Development Setup

No complex environment setup required. Optional GitHub token for increased API rate limits.

### Environment Variables

- **VITE_GITHUB_TOKEN** (optional): GitHub Personal Access Token for higher API rate limits
- No token required for basic local development with cached data
- Test mode uses dummy data

---

## Build & Validation Instructions

### Development Server

```bash
npm install
npm run dev
```

- Runs on `http://localhost:5173`
- Hot reload enabled
- Includes all interactive features
- Rate limiting and caching fully functional

### Production Build

```bash
npm run build
```

- Generates optimized bundle in `dist/`
- Includes TypeScript type checking
- Minified CSS and JavaScript
- Optimized for deployment

### Preview Production Build

```bash
npm run preview
```

- Serves the built site locally for testing
- Simulates production environment

### Type Checking

```bash
npx tsc
```

- Validates TypeScript throughout the project
- Run before commits for safety

### Linting

```bash
npm run lint
```

- Uses ESLint with TypeScript and React Hooks support
- Checks code quality and style consistency

---

## Project Architecture & Layout

### Repository Root

```
/
├── docs/
│   ├── CACHING_AND_RATE_LIMITING.md
│   ├── IMPLEMENTATION_SUMMARY.md
│   └── QUICK_START.md
├── public/                     # Static assets (favicon, images)
├── src/
│   ├── components/
│   │   ├── ContributorCard.tsx     # Individual contributor card
│   │   ├── ContributorModal.tsx    # Detailed contributor view
│   │   ├── FiltersBar.tsx          # Repository/sorting filters
│   │   └── LoadingStates.tsx       # Loading skeletons and states
│   ├── controllers/                # Business logic hooks
│   │   ├── useContributors.ts      # Main data fetching hook
│   │   ├── useContributorsPageState.ts  # Page state management
│   │   ├── useGlobalStats.ts       # Global statistics
│   │   └── useTheme.ts             # Theme management
│   ├── hooks/
│   │   └── useContributors.ts      # SWR-based data fetching
│   ├── lib/
│   │   ├── cache.ts                # Dual-layer caching (memory + localStorage)
│   │   ├── debugUtils.ts           # Console debugging utilities
│   │   └── github.ts               # GitHub API with rate limiting
│   ├── models/
│   │   └── Contributor.ts          # TypeScript interfaces
│   ├── pages/
│   │   ├── Home.tsx                # Landing page
│   │   └── Contributors.tsx        # Contributors display page
│   ├── services/
│   │   ├── ContributorAggregationService.ts  # Data aggregation
│   │   └── GitHubService.ts        # GitHub API wrapper
│   ├── types/
│   │   └── github.d.ts             # GitHub API type definitions
│   ├── utils/
│   │   ├── aggregateContributors.ts # Data transformation
│   │   └── common.ts               # Utility functions
│   ├── App.tsx                     # Root component with routing
│   ├── main.tsx                    # Entry point
│   ├── App.css                     # App-level styles
│   └── index.css                   # Global styles
├── astro.config.mjs
├── eslint.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Component Architecture

- **React Function Components**: All components use hooks-based architecture
- **Custom Hooks**: Business logic separated into `controllers/` and `hooks/`
- **Services**: Data fetching and GitHub API interactions in `services/`
- **Types**: TypeScript interfaces in `models/` and `types/`

### Data Flow

1. **GitHub API** → `GitHubService` (with rate limiting)
2. **Cache Layer** → `cache.ts` (memory + localStorage)
3. **SWR Hook** → `useContributors` (stale-while-revalidate)
4. **Page State** → `useContributorsPageState` (filtering, sorting)
5. **Components** → Render contributor cards with animations

### Rate Limiting & Caching Strategy

- **Primary Source**: Memory cache (fast, session-scoped)
- **Secondary Source**: localStorage (persistent across sessions)
- **API Flow**: Only hits GitHub API when cache is stale (24-hour TTL)
- **Concurrent Control**: Max 6 concurrent API requests
- **Backoff Strategy**: Exponential backoff on rate limits
- **Deduplication**: Prevents duplicate in-flight requests

---

## Coding Standards

### General

- **Language**: TypeScript preferred, avoid `any` types
- **Formatting**: Prettier with 2-space indentation
- **Naming**: camelCase for variables/functions, PascalCase for components/services
- **Imports**: Use relative paths or absolute paths as configured
- **File Extensions**: `.tsx` for React components, `.ts` for logic

### React Components

- Functional components with hooks only (no class components)
- Props typed with interfaces (no inline object types)
- Separate concerns: UI logic in components, business logic in hooks
- Use `React.FC` type annotation
- Memoize components if they re-render unnecessarily (`React.memo`)

### TypeScript

- Always type function parameters and return types
- Use interfaces for object shapes (not `type`)
- Avoid `any` type - use `unknown` if truly unknown
- Use `const` for variable declarations
- Use strict mode settings in tsconfig.json

### Hooks & Custom Logic

- Keep hooks focused and reusable
- Prefix custom hooks with `use`
- Place controller logic in `src/controllers/`
- Place utility hooks in `src/hooks/`
- Document complex hook logic with comments

### Styling

- **Primary**: Tailwind CSS utility classes
- **Custom CSS**: Use `index.css` for global styles only
- **Responsive**: Mobile-first approach with `sm:`, `md:`, `lg:` breakpoints
- **Dark Mode**: Use `dark:` prefix utilities (managed globally)
- **Animations**: Framer Motion for complex animations, CSS transitions for simple effects

### Error Handling

- Always handle API errors gracefully
- Log errors to console in development (use `debugUtils`)
- Show user-friendly error messages
- Implement retry logic for failed requests

### Performance

- Use React.memo for expensive components
- Lazy load routes with React.lazy if needed
- Avoid unnecessary re-renders (useCallback, useMemo)
- Keep bundle size in mind when adding dependencies

### Accessibility

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Sufficient color contrast
- Test with keyboard navigation

---

## Key Features Explained

### GitHub Integration

- **File**: [src/lib/github.ts](src/lib/github.ts)
- Implements advanced rate limiting with concurrent control
- Includes exponential backoff and retry logic
- Deduplicates in-flight requests
- Respects GitHub API rate limits (60 req/hr without token, 5000 with token)

### Caching System

- **File**: [src/lib/cache.ts](src/lib/cache.ts)
- Dual-layer: memory cache (fast) + localStorage (persistent)
- TTL-based expiration (default 24 hours)
- Version checking to invalidate stale data
- Debug utilities exposed via `window.__GITHUB_CACHE_DEBUG__`

### Data Fetching

- **File**: [src/hooks/useContributors.ts](src/hooks/useContributors.ts)
- Uses SWR pattern for optimal performance
- Stale-while-revalidate: serves cached data while fetching fresh data
- Smart cache strategy reduces API calls significantly
- Provides loading, error, and data states

### Page State Management

- **File**: [src/controllers/useContributorsPageState.ts](src/controllers/useContributorsPageState.ts)
- Local component state (no Redux/Zustand needed)
- Handles filtering by repository
- Handles sorting (by contributions, joined date, etc.)
- Persists filters across sessions

### Multiple Repositories

- **File**: [src/constants/repositories.ts](src/constants/repositories.ts)
- Aggregates contributors from multiple GitHub repositories
- Deduplicates contributors across repos
- Tracks contribution counts per repository

---

## Deployment & Ci/CD

### Build Optimization

- Vite handles code splitting automatically
- Dynamic imports for route-based code splitting
- CSS minification via Tailwind
- JavaScript minification via Vite
- Tree-shaking removes unused code

### Deployment Targets

- **GitHub Pages**: Static site deployment
- **Vercel**: Automatic deployments on push
- **Netlify**: Standard static site deployment
- **Cloudflare Pages**: Workers for edge-cached content

### Performance Goals

- Fast initial load with SWR caching
- Smooth animations without jank
- Optimized images and assets
- Minimal JavaScript footprint
- 24-hour cache reduces API dependency

---

## Development Workflow

### Adding a New Repository

1. Add repository name to `REPOSITORY_LIST` in [src/constants/repositories.ts](src/constants/repositories.ts)
2. No other changes needed - aggregation is automatic
3. Contributors from the new repo will appear after next API fetch

### Creating a New Component

1. Create `.tsx` file in `src/components/`
2. Use functional component with TypeScript
3. Type all props with interfaces
4. Export as named export
5. Import and use in pages or other components

### Adding Data Fetching

1. Create hook in `src/hooks/` or `src/controllers/`
2. Use `useContributors` hook or create similar SWR-based hook
3. Handle loading, error, and data states
4. Consider caching requirements

### Styling New Component

1. Use Tailwind utility classes primarily
2. Add custom styles to `index.css` only if necessary
3. Follow existing color and spacing patterns
4. Test in both light and dark themes
5. Ensure responsive behavior

### Debugging

- Use `window.__GITHUB_CACHE_DEBUG__` to inspect cache
- Check console for rate limiting info and errors
- Inspect Redux DevTools for state changes
- Use browser DevTools Network tab to monitor API calls

---

## Common Issues & Solutions

### Rate Limit Errors (429)

- App automatically handles with exponential backoff
- Check GitHub token is valid if using one
- Review rate limit in browser console via debug utilities
- Consider increasing cache TTL for your use case

### Stale Data

- Data is cached for 24 hours by default
- Clear localStorage to force refresh: `localStorage.clear()`
- Use browser DevTools to inspect cached data
- Debug utilities show cache status in console

### Styling Not Applied

- Ensure Tailwind classes are spelled correctly
- Check dark mode prefix is applied if needed
- Clear build cache: `npm run build` after CSS changes
- Verify selector isn't too specific

### Missing Contributors

- Check repository is in `REPOSITORY_LIST` constant
- Verify GitHub token is valid (if using one)
- Check browser console for API errors
- May need to wait for rate limit reset

### Theme Not Persisting

- Verify localStorage is enabled in browser
- Check `useTheme` hook implementation
- Ensure CSS custom properties are set on root element
- Test in incognito mode to rule out cache

---

## Testing & Validation

### Before Committing

1. Run `npm run lint` and fix any errors
2. Run `npm run build` to check for TypeScript errors
3. Test in both light and dark themes
4. Test on mobile viewport (DevTools)
5. Check console for warnings and errors

### Manual Testing Checklist

- [ ] Contributors load correctly
- [ ] Filtering by repository works
- [ ] Sorting options work
- [ ] Dark/light theme toggle works
- [ ] Theme persists on page reload
- [ ] Modal opens and displays details
- [ ] Responsive layout on mobile
- [ ] No console errors or warnings
- [ ] Loading states appear correctly
- [ ] Error states display properly

---

## Architecture Decision Records

### Why Vite?

- Fast development server with HMR
- Optimal build output and bundling
- Better ESM support than older bundlers
- Smaller configuration compared to Webpack

### Why React?

- Component-based architecture
- Rich ecosystem of libraries
- Hook-based state management (no Redux needed)
- Good performance with memoization

### Why SWR Pattern?

- Reduces API calls through intelligent caching
- Better perceived performance (serve stale, revalidate)
- Network error resilience
- Simple, hook-based API

### Why Dual-Layer Caching?

- Memory cache for same-session performance
- localStorage for persistence across sessions
- Reduces GitHub API dependency significantly
- Respects rate limits naturally

### Why No State Management Library?

- Complexity not justified for current data flow
- React hooks sufficient for local state
- Custom hooks provide encapsulation
- Easier to debug and maintain

### Why Framer Motion?

- Smooth, performant animations
- Declarative animation API
- Good React integration
- Commonly used in modern React apps

---

## Agent Guidance

### Development Workflow

- Always run `npm run lint` before committing
- Test changes in both light and dark themes
- Verify responsive design on multiple screen sizes
- Check browser console for warnings and errors

### Code Quality

- Follow existing patterns and naming conventions
- Keep components small and focused on single responsibility
- Use TypeScript strictly (no `any` types)
- Add comments for complex logic
- Extract reusable logic into custom hooks

### Feature Development

- Start with data model in `models/` or `types/`
- Create service layer or hook for data fetching
- Build UI component with typing
- Test with real GitHub data
- Ensure proper error handling

### Performance Optimizations

- Implement caching before adding more data
- Use React.memo for expensive components
- Lazy load routes if needed
- Monitor bundle size with `npm run build`

### When to Ask for Help

- Architectural changes affecting data flow
- Complex animations or interactions
- Integration with new libraries
- Significant performance issues
- Deployment or CI/CD setup

---

## End of Instructions

This document serves as the comprehensive guide for developing in the Contribution Cards repository. Refer back to it for architectural understanding, coding standards, and development best practices.
