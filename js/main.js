// Design System Constants
const ANIMATION_DURATION = 250; // matches CSS --duration-normal
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

// Theme Management
const THEME_KEY = 'contribution-cards-theme';
const DARK_CLASS = 'dark';
const LIGHT_MODE_ICON = 'light_mode';
const DARK_MODE_ICON = 'dark_mode';

// State Management
const state = {
    currentView: 'grid',
    isDark: false,
    prefersReducedMotion: window.matchMedia(REDUCED_MOTION_QUERY).matches
};

// DOM Elements
const elements = {
    gridView: document.getElementById('gridView'),
    listView: document.getElementById('listView'),
    gridTab: document.getElementById('gridTab'),
    listTab: document.getElementById('listTab'),
    themeToggle: document.getElementById('themeToggleBtn'),
    searchInput: document.getElementById('searchInput')
};

/**
 * Theme Management
 */
const themeManager = {
    init() {
        // Check saved preference (canonical key) or migrate old key if present
        let savedTheme = localStorage.getItem(THEME_KEY);
        // backwards-compat: older code used 'darkMode' with values 'enabled'|'disabled'
        if (!savedTheme) {
            const legacy = localStorage.getItem('darkMode');
            if (legacy === 'enabled' || legacy === 'disabled') {
                savedTheme = legacy === 'enabled' ? 'dark' : 'light';
                try {
                    localStorage.setItem(THEME_KEY, savedTheme);
                    // migration: remove legacy key now that canonical key is set
                    try {
                        localStorage.removeItem('darkMode');
                    } catch (err) {
                        // ignore storage removal errors
                    }
                } catch (e) {
                    // ignore
                }
            }
        }

        if (savedTheme) {
            this.setTheme(savedTheme === 'dark');
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark);
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(THEME_KEY)) {
                this.setTheme(e.matches);
            }
        });

        // Set up theme toggle
        elements.themeToggle.addEventListener('click', () => this.toggleTheme());
    },

    setTheme(isDark) {
        // Add transition class before changing theme
        document.documentElement.classList.add('theme-transition');
        document.body.classList.add('theme-transition');
        
        // Update theme state
        state.isDark = isDark;
        document.documentElement.classList.toggle(DARK_CLASS, isDark);
        document.body.classList.toggle(DARK_CLASS, isDark);
        // Also set a data attribute to allow CSS selectors or other scripts to read current theme
        try {
            document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
            document.body.dataset.theme = isDark ? 'dark' : 'light';
        } catch (e) {
            // ignore
        }
        
        // Update button state and icon
        elements.themeToggle.setAttribute('aria-pressed', isDark);
        elements.themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
        
        const icon = elements.themeToggle.querySelector('.material-icons');
        icon.style.transform = 'rotate(180deg)';
        icon.style.opacity = '0';
        
        setTimeout(() => {
            icon.textContent = isDark ? LIGHT_MODE_ICON : DARK_MODE_ICON;
            icon.style.transform = 'rotate(0)';
            icon.style.opacity = '1';
        }, 150);
        
        // Save preference
        try {
            localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
        } catch (e) {
            console.warn('Unable to persist theme preference', e);
        }
        
        // Remove transition class after animation completes
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
            document.body.classList.remove('theme-transition');
        }, 300);
    },

    toggleTheme() {
        this.setTheme(!state.isDark);
    }
};

/**
 * View Management
 */
const viewManager = {
    init() {
        elements.gridTab.addEventListener('click', () => this.setView('grid'));
        elements.listTab.addEventListener('click', () => this.setView('list'));

        // Set initial view
        this.setView(state.currentView);
    },

    async setView(view) {
        if (view === state.currentView) return;

        const [currentView, newView] = view === 'grid' 
            ? [elements.listView, elements.gridView]
            : [elements.gridView, elements.listView];

        const [currentTab, newTab] = view === 'grid'
            ? [elements.listTab, elements.gridTab]
            : [elements.gridTab, elements.listTab];

        // Update state
        state.currentView = view;

        // Remove display:none first
        newView.style.display = '';
        currentView.style.display = '';
        
        // Begin transition after a frame
        requestAnimationFrame(() => {
            currentView.setAttribute('aria-hidden', 'true');
            newView.classList.remove('hidden');
            
            // Force reflow
            void newView.offsetWidth;
        
            // Complete transition
            newView.removeAttribute('aria-hidden');
            
            // Update tabs
            currentTab.setAttribute('aria-pressed', 'false');
            newTab.setAttribute('aria-pressed', 'true');

            // Clean up after transition
            if (!state.prefersReducedMotion) {
                setTimeout(() => {
                    currentView.classList.add('hidden');
                }, ANIMATION_DURATION);
            } else {
                currentView.classList.add('hidden');
            }
        });
    }
};

/**
 * Search Functionality
 */
const searchManager = {
    init() {
        elements.searchInput.addEventListener('input', this.handleSearch.bind(this));
    },

    handleSearch(event) {
        const query = event.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.ds-card');

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const matches = text.includes(query);
            
            // Use opacity for smooth transitions
            card.style.opacity = matches ? '1' : '0';
            // Use visibility instead of display for animation
            card.style.visibility = matches ? 'visible' : 'hidden';
            // Remove from layout flow when hidden
            card.style.position = matches ? 'relative' : 'absolute';
        });
    }
};

/**
 * Accessibility
 */
const a11yManager = {
    init() {
        // Listen for reduced motion preference
        window.matchMedia(REDUCED_MOTION_QUERY).addEventListener('change', (e) => {
            state.prefersReducedMotion = e.matches;
        });

        // Ensure keyboard navigation
        this.setupKeyboardNav();
    },

    setupKeyboardNav() {
        // Handle arrow keys in view toggle
        elements.gridTab.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                elements.listTab.focus();
            }
        });

        elements.listTab.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                elements.gridTab.focus();
            }
        });
    }
};

/**
 * Initialize Application
 */
document.addEventListener('DOMContentLoaded', () => {
    themeManager.init();
    viewManager.init();
    searchManager.init();
    a11yManager.init();
});
