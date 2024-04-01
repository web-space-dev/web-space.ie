import { Darker_Grotesque } from "next/font/google";

export const colors = {
  white: "#F8F8F8",
  black: "#1D1D1D",
  blackLight: "#00000019",
  accent: "#39979C",
  accentLight: "#39979C33",
  bgLight: "#FFFFFF33",
} as const;
/**
 * Keys for the global color variable
 */
export type WebSpaceColorKey = keyof typeof colors;

/**
 * This type allows for color properties to be evaluated against global Color values.
 * These values can be accessed by importing "colors" from 'src/styles/variables'
 *
 * eg. `colors.brandYellow == '#FFC52B'`
 *
 *
 * There is also `WebSpaceColorKey` for evaluating the keys of the color map
 */
export type WebSpaceColorVal = (typeof colors)[WebSpaceColorKey];

export const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

/**
 * This type allows for font properties to be evaluated against global Color values.
 * These values can be accessed by importing "font" from 'src/styles/variables'
 *
 * eg. `colors.sansSerif == 'Darker Grotesque'`
 *
 *
 * There is also `WebSpaceFontKey` for evaluating the keys of the font map
 */
// export type WebSpaceFontVal = (typeof fonts)[WebSpaceFontKey];

export const breakpoints = {
  sm: 500,
  md: 900,
  lg: 1600,
} as const;

/**
 * Keys for the global breakpoints variable
 */
export type WebSpaceBreakPointKey = keyof typeof breakpoints;

/**
 * This type allows for color properties to be evaluated against global BreakPoint values.
 *
 *
 * There is also `BreakPointKey` for evaluating the keys of the breakpoint map
 */
export type WebSpaceBreakPointVal = (typeof breakpoints)[WebSpaceBreakPointKey];

export const widths = {
  sm: 500,
  md: 720,
  lg: 960,
  xl: 1140,
};

export const baseFontSize = 22;

export const dimensions = {
  headingSizes: {
    small: {
      desktop: 20,
      mobile: 20,
    },
    cta: {
      desktop: 32,
      mobile: 24,
    },
    medium: {
      desktop: 64,
      mobile: 32,
    },
    large: {
      desktop: 110,
      mobile: 40,
    },
    display2: {
      desktop: 240,
      mobile: 70,
    },
    display1: {
      desktop: 344,
      mobile: 103,
    },
  },
  textSizes: {
    small: {
      desktop: 16,
      mobile: 16,
    },
    normal: {
      desktop: 30,
      mobile: 20,
    },
    large: {
      desktop: 64,
      mobile: 30,
    },
    xLarge: {
      desktop: 80,
      mobile: 70,
    },
  },
  lineHeight: {
    regular: 1.45,
    heading: 1.2,
  },
  gridContainerPadding: 20,
  gridContainerMobileTabletPadding: 25,
};

export const heights = {
  header: 60,
};
