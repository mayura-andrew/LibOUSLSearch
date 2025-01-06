// designSystem.ts
export const colors = {
  primary: {
    light: '#6366f1',
    main: '#4f46e5', 
    dark: '#4338ca',
  },
  secondary: {
    light: '#f5f5f4',
    main: '#e7e5e4',
    dark: '#d6d3d1',
  },
  text: {
    primary: '#1f2937',
    secondary: '#6b7280',
    disabled: '#9ca3af',
  },
  background: {
    default: '#ffffff',
    paper: '#f9fafb',
    accent: '#eff6ff',
  },
  error: {
    light: '#fca5a5',
    main: '#ef4444',
    dark: '#dc2626',
  },
  success: {
    main: '#10b981',
  },
  border: {
    light: '#e5e7eb',
    main: '#d1d5db',
    dark: '#9ca3af',
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

// First, create a color palette (add to designSystem.ts)
export const palette = {
  primary: {
    main: '#1a237e', // Deep Indigo
    light: '#534bae',
    dark: '#000051',
  },
  secondary: {
    main: '#0277bd', // Light Blue
    light: '#58a5f0',
    dark: '#004c8c',
  },
  accent: {
    main: '#c2185b', // Pink
    light: '#fa5788',
    dark: '#8c0032',
  },
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
    card: 'rgba(255, 255, 255, 0.95)',
  },
  text: {
    primary: '#1a237e',
    secondary: '#424242',
    hint: '#757575',
  },
};
