// Colour theming is handled via useTheme() from @react-navigation/native.
// This file contains only layout and typography primitives.

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Radius = {
  sm: 6,
  md: 10,
  lg: 16,
  full: 9999,
} as const;

export const FontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
} as const;

// Error state colours are not part of the navigation theme palette
export const ErrorPalette = {
  text: "#EF4444",
  bg: "#FEF2F2",
  border: "#EF444433",
} as const;
