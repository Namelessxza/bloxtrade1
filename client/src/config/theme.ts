// Theme configuration for consistent design system
export const theme = {
  colors: {
    // Primary brand colors - Cyan/Teal
    primary: {
      50: 'rgba(0, 212, 255, 0.05)',
      100: 'rgba(0, 212, 255, 0.1)',
      200: 'rgba(0, 212, 255, 0.2)',
      300: 'rgba(0, 212, 255, 0.3)',
      400: 'rgba(0, 212, 255, 0.4)',
      500: 'rgba(0, 212, 255, 0.5)',
      600: 'rgba(0, 212, 255, 0.6)',
      700: 'rgba(0, 212, 255, 0.7)',
      800: 'rgba(0, 212, 255, 0.8)',
      900: 'rgba(0, 212, 255, 0.9)',
      full: '#00d4ff',
      dark: '#0099cc',
      light: '#33ddff',
    },
    
    // Secondary colors - Purple/Violet
    secondary: {
      50: 'rgba(168, 85, 247, 0.05)',
      100: 'rgba(168, 85, 247, 0.1)',
      200: 'rgba(168, 85, 247, 0.2)',
      300: 'rgba(168, 85, 247, 0.3)',
      400: 'rgba(168, 85, 247, 0.4)',
      500: 'rgba(168, 85, 247, 0.5)',
      full: '#a855f7',
      dark: '#8b5cf6',
      light: '#c084fc',
    },
    
    // Accent colors
    accent: {
      yellow: '#fbbf24',
      orange: '#fb923c',
      red: '#ef4444',
      green: '#10b981',
      emerald: '#34d399',
      blue: '#3b82f6',
      purple: '#a855f7',
      pink: '#ec4899',
      indigo: '#6366f1',
    },
    
    // Background colors - Rich dark tones
    background: {
      primary: '#090a0d',     // Very dark base
      secondary: '#0e1015',   // Slightly lighter
      tertiary: '#13151c',    // Card backgrounds
      card: '#181a23',        // Elevated cards
      hover: 'rgba(255, 255, 255, 0.04)',
      active: 'rgba(255, 255, 255, 0.08)',
      elevated: '#1e2029',    // Modals/overlays
      accent: 'rgba(0, 212, 255, 0.02)', // Subtle accent bg
    },
    
    // Text colors
    text: {
      primary: '#ffffff',
      secondary: '#b8bcc8',
      tertiary: '#7c8291',
      muted: '#565b6e',
      disabled: '#3a3f52',
      bright: '#f9fafb',
    },
    
    // Border colors (subtle and refined)
    border: {
      subtle: 'rgba(255, 255, 255, 0.04)',
      light: 'rgba(255, 255, 255, 0.08)',
      medium: 'rgba(255, 255, 255, 0.12)',
      accent: 'rgba(0, 212, 255, 0.2)',
    },
  },
  
  // Gradients for rich visual effects
  gradients: {
    primary: 'linear-gradient(135deg, #00d4ff, #0099cc)',
    secondary: 'linear-gradient(135deg, #a855f7, #8b5cf6)',
    accent: 'linear-gradient(135deg, #00d4ff, #a855f7)',
    dark: 'linear-gradient(180deg, #13151c, #090a0d)',
    card: 'linear-gradient(145deg, #1e2029, #13151c)',
    surface: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
    button: 'linear-gradient(135deg, #00d4ff, #0099cc)',
    hover: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(168, 85, 247, 0.15))',
    glow: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.3), transparent 70%)',
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
  
  // Shadow system - Enhanced for depth
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.4)',
    md: '0 4px 12px rgba(0, 0, 0, 0.5)',
    lg: '0 10px 24px rgba(0, 0, 0, 0.6)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.7)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.4)',
    glow: {
      primary: '0 0 30px rgba(0, 212, 255, 0.4)',
      secondary: '0 0 30px rgba(168, 85, 247, 0.4)',
      soft: '0 0 20px rgba(0, 212, 255, 0.2)',
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