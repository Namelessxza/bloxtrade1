// Theme configuration for consistent design system
export const theme = {
  colors: {
    // Primary brand colors
    primary: {
      50: 'rgba(6, 182, 212, 0.05)',
      100: 'rgba(6, 182, 212, 0.1)',
      200: 'rgba(6, 182, 212, 0.2)',
      300: 'rgba(6, 182, 212, 0.3)',
      400: 'rgba(6, 182, 212, 0.4)',
      500: 'rgba(6, 182, 212, 0.5)',
      600: 'rgba(6, 182, 212, 0.6)',
      700: 'rgba(6, 182, 212, 0.7)',
      800: 'rgba(6, 182, 212, 0.8)',
      900: 'rgba(6, 182, 212, 0.9)',
      full: '#06b6d4',
    },
    
    // Secondary colors
    secondary: {
      50: 'rgba(139, 92, 246, 0.05)',
      100: 'rgba(139, 92, 246, 0.1)',
      200: 'rgba(139, 92, 246, 0.2)',
      300: 'rgba(139, 92, 246, 0.3)',
      400: 'rgba(139, 92, 246, 0.4)',
      500: 'rgba(139, 92, 246, 0.5)',
      full: '#8b5cf6',
    },
    
    // Accent colors
    accent: {
      yellow: '#fbbf24',
      orange: '#fb923c',
      red: '#ef4444',
      green: '#10b981',
      blue: '#3b82f6',
      purple: '#a855f7',
      pink: '#ec4899',
    },
    
    // Background colors
    background: {
      primary: '#0a0f1c',
      secondary: '#0d1520',
      tertiary: '#111827',
      card: 'rgba(17, 24, 39, 0.5)',
      hover: 'rgba(255, 255, 255, 0.03)',
      active: 'rgba(255, 255, 255, 0.05)',
    },
    
    // Text colors
    text: {
      primary: '#ffffff',
      secondary: '#94a3b8',
      tertiary: '#64748b',
      muted: '#475569',
      disabled: '#334155',
    },
    
    // Border colors (minimal usage)
    border: {
      subtle: 'rgba(255, 255, 255, 0.05)',
      light: 'rgba(255, 255, 255, 0.08)',
      medium: 'rgba(255, 255, 255, 0.12)',
    },
  },
  
  // Spacing system
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  // Border radius
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  
  // Shadow system
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    glow: {
      primary: '0 0 20px rgba(6, 182, 212, 0.3)',
      secondary: '0 0 20px rgba(139, 92, 246, 0.3)',
    },
  },
  
  // Transitions
  transitions: {
    fast: 'all 0.15s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  },
  
  // Z-index layers
  zIndex: {
    dropdown: 50,
    modal: 100,
    toast: 200,
    tooltip: 300,
  },
};

export type Theme = typeof theme;