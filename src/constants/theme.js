// Light Theme Colors
export const LIGHT_COLORS = {
  primary: '#6C63FF',
  primaryDark: '#5548E8',
  secondary: '#FF6584',
  secondaryDark: '#FF4D73',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  background: '#F8F9FE',
  backgroundSecondary: '#FFFFFF',
  card: '#FFFFFF',
  cardElevated: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  disabled: '#D1D5DB',
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: '#000000',
};

// Dark Theme Colors
export const DARK_COLORS = {
  primary: '#8B7FFF',
  primaryDark: '#7366FF',
  secondary: '#FF7A9A',
  secondaryDark: '#FF6584',
  success: '#5FD068',
  warning: '#FFD54F',
  error: '#FF5252',
  background: '#0F0F1E',
  backgroundSecondary: '#1A1A2E',
  card: '#1E1E30',
  cardElevated: '#252538',
  text: '#FFFFFF',
  textSecondary: '#B8B9C1',
  textLight: '#8E8E93',
  border: '#2C2C3E',
  borderLight: '#252538',
  disabled: '#3A3A4E',
  overlay: 'rgba(0, 0, 0, 0.7)',
  shadow: '#000000',
};

export const getColors = (isDark) => (isDark ? DARK_COLORS : LIGHT_COLORS);

export const SIZES = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONTS = {
  small: 12,
  regular: 14,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
};

export const CATEGORIES = [
  { id: '1', name: 'Sports', icon: 'SP', color: '#FF6B6B', gradient: ['#FF6B6B', '#FF8E53'] },
  { id: '2', name: 'History', icon: 'HI', color: '#4ECDC4', gradient: ['#4ECDC4', '#44A08D'] },
  { id: '3', name: 'Science', icon: 'SC', color: '#95E1D3', gradient: ['#95E1D3', '#38EF7D'] },
  { id: '4', name: 'Entertainment', icon: 'EN', color: '#F38181', gradient: ['#F38181', '#FCE38A'] },
  { id: '5', name: 'Geography', icon: 'GE', color: '#FEA47F', gradient: ['#FEA47F', '#F7B733'] },
  { id: '6', name: 'Technology', icon: 'TE', color: '#6C5CE7', gradient: ['#6C5CE7', '#A29BFE'] },
  { id: '7', name: 'Art', icon: 'AR', color: '#A29BFE', gradient: ['#A29BFE', '#FAD0C4'] },
  { id: '8', name: 'Random', icon: '?', color: '#FDCB6E', gradient: ['#FDCB6E', '#FD79A8'] },
];

// Shadow Styles
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Border Radius
export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};
