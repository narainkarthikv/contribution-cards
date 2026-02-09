/**
 * Design Tokens - Strict Semantic Color System
 *
 * Minimal, focused color palette across light and dark modes
 * Colors communicate: action, state, focus - not decoration
 */

export type Theme = 'light' | 'dark';

export interface ThemeTokens {
  // Backgrounds
  background: {
    primary: string;
    secondary: string;
  };

  // Surfaces
  surface: {
    primary: string;
    secondary: string;
    overlay: string;
  };

  // Text
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
  };

  // Interactive
  interactive: {
    default: string;
    hover: string;
    active: string;
    disabled: string;
  };

  // Semantic
  success: string;
  error: string;
  warning: string;

  // Borders
  border: {
    primary: string;
    subtle: string;
  };
}

export const lightTokens: ThemeTokens = {
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
  },
  surface: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#6B7280',
    muted: '#9CA3AF',
    inverse: '#FFFFFF',
  },
  interactive: {
    default: '#3B82F6',
    hover: '#2563EB',
    active: '#1D4ED8',
    disabled: '#D1D5DB',
  },
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  border: {
    primary: '#E5E7EB',
    subtle: '#F0F0F0',
  },
};

export const darkTokens: ThemeTokens = {
  background: {
    primary: '#0B1118',
    secondary: '#121B26',
  },
  surface: {
    primary: '#121B26',
    secondary: '#0F1822',
    overlay: 'rgba(2, 10, 18, 0.65)',
  },
  text: {
    primary: '#EAF2F6',
    secondary: '#9FB0C3',
    muted: '#7C8CA0',
    inverse: '#0B1118',
  },
  interactive: {
    default: '#3B82F6',
    hover: '#2563EB',
    active: '#1E4FBF',
    disabled: '#1F2C3B',
  },
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  border: {
    primary: '#1E2C3C',
    subtle: '#0F1822',
  },
};

export function getThemeTokens(theme: Theme): ThemeTokens {
  return theme === 'dark' ? darkTokens : lightTokens;
}

export function generateThemeCSS(theme: Theme): string {
  const tokens = getThemeTokens(theme);
  const prefix = theme === 'dark' ? 'dark' : 'light';

  return `
    :root[data-theme="${prefix}"] {
      --color-bg-primary: ${tokens.background.primary};
      --color-bg-secondary: ${tokens.background.secondary};
      --color-surface-primary: ${tokens.surface.primary};
      --color-surface-secondary: ${tokens.surface.secondary};
      --color-surface-overlay: ${tokens.surface.overlay};
      --color-text-primary: ${tokens.text.primary};
      --color-text-secondary: ${tokens.text.secondary};
      --color-text-muted: ${tokens.text.muted};
      --color-text-inverse: ${tokens.text.inverse};
      --color-action-default: ${tokens.interactive.default};
      --color-action-hover: ${tokens.interactive.hover};
      --color-action-active: ${tokens.interactive.active};
      --color-action-disabled: ${tokens.interactive.disabled};
      --color-success: ${tokens.success};
      --color-error: ${tokens.error};
      --color-warning: ${tokens.warning};
      --color-border-primary: ${tokens.border.primary};
      --color-border-subtle: ${tokens.border.subtle};
    }
  `;
}
