
// Theme configuration for consistent design system
export const theme = {
  colors: {
    // Primary brand colors - Rich Purple/Violet
    primary: {
      50: 'rgba(139, 92, 246, 0.05)',
      100: 'rgba(139, 92, 246, 0.1)',
      200: 'rgba(139, 92, 246, 0.2)',
      300: 'rgba(139, 92, 246, 0.3)',
      400: 'rgba(139, 92, 246, 0.4)',
      500: 'rgba(139, 92, 246, 0.5)',
      600: 'rgba(139, 92, 246, 0.6)',
      700: 'rgba(139, 92, 246, 0.7)',
      800: 'rgba(139, 92, 246, 0.8)',
      900: 'rgba(139, 92, 246, 0.9)',
      full: '#8b5cf6',
      dark: '#7c3aed',
      light: '#a78bfa',
    },
    
    // Secondary colors - Rich Gold/Amber
    secondary: {
      50: 'rgba(245, 158, 11, 0.05)',
      100: 'rgba(245, 158, 11, 0.1)',
      200: 'rgba(245, 158, 11, 0.2)',
      300: 'rgba(245, 158, 11, 0.3)',
      400: 'rgba(245, 158, 11, 0.4)',
      500: 'rgba(245, 158, 11, 0.5)',
      full: '#f59e0b',
      dark: '#d97706',
      light: '#fbbf24',
    },
    
    // Accent colors - Premium palette
    accent: {
      yellow: '#fbbf24',
      orange: '#fb923c',
      red: '#ef4444',
      green: '#10b981',
      emerald: '#34d399',
      blue: '#3b82f6',
      purple: '#8b5cf6',
      pink: '#ec4899',
      indigo: '#6366f1',
      cyan: '#06b6d4',
      violet: '#7c3aed',
      amber: '#f59e0b',
    },
    
    // Background colors - Rich dark with subtle variations
    background: {
      primary: '#0a0b0f',     // Deep dark base
      secondary: '#0f1116',   // Slightly lighter
      tertiary: '#151820',    // Card backgrounds
      card: '#1a1d29',        // Elevated cards
      hover: 'rgba(139, 92, 246, 0.08)',
      active: 'rgba(139, 92, 246, 0.12)',
      elevated: '#1e2332',    // Modals/overlays
      accent: 'rgba(139, 92, 246, 0.03)', // Subtle accent bg
      surface: '#242938',     // Surface elements
      border: 'rgba(139, 92, 246, 0.15)',
    },
    
    // Text colors - Enhanced contrast
    text: {
      primary: '#ffffff',
      secondary: '#d1d5db',
      tertiary: '#9ca3af',
      muted: '#6b7280',
      disabled: '#4b5563',
      bright: '#f9fafb',
      accent: '#8b5cf6',
    },
    
    // Border colors - Refined with purple tints
    border: {
      subtle: 'rgba(139, 92, 246, 0.08)',
      light: 'rgba(139, 92, 246, 0.12)',
      medium: 'rgba(139, 92, 246, 0.18)',
      accent: 'rgba(139, 92, 246, 0.25)',
      strong: 'rgba(139, 92, 246, 0.35)',
    },
  },
  
  // Gradients for rich visual effects
  gradients: {
    primary: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    secondary: 'linear-gradient(135deg, #f59e0b, #d97706)',
    accent: 'linear-gradient(135deg, #8b5cf6, #f59e0b)',
    dark: 'linear-gradient(180deg, #151820, #0a0b0f)',
    card: 'linear-gradient(145deg, #1e2332, #151820)',
    surface: 'linear-gradient(180deg, rgba(139, 92, 246, 0.08), rgba(139, 92, 246, 0.03))',
    button: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    hover: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(245, 158, 11, 0.15))',
    premium: 'linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b)',
    rich: 'linear-gradient(135deg, #1e1b4b, #312e81, #4c1d95)',
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
  
  // Border radius - More rounded for premium feel
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.75rem',
    full: '9999px',
  },
  
  // Shadow system - Enhanced depth
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.5)',
    md: '0 4px 16px rgba(0, 0, 0, 0.6)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.7)',
    xl: '0 16px 48px rgba(0, 0, 0, 0.8)',
    inner: 'inset 0 2px 8px rgba(0, 0, 0, 0.5)',
    premium: '0 8px 32px rgba(139, 92, 246, 0.2)',
    gold: '0 8px 32px rgba(245, 158, 11, 0.2)',
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
