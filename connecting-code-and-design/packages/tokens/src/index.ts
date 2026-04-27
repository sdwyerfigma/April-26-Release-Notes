export type PrototypeMode = "light" | "dark";

export const museumColors = {
  ink: "#1E1E1E",
  white: "#FFFFFF",
  brand: "#EAFF4E",
  sky: "#CADFFF",
  mist: "#EFF5FF",
  fog: "#F7F6F2",
  soft: "rgba(30, 30, 30, 0.08)",
  softStrong: "rgba(30, 30, 30, 0.14)",
  softDark: "rgba(255, 255, 255, 0.08)",
  line: "rgba(30, 30, 30, 0.12)",
  lineDark: "rgba(255, 255, 255, 0.16)",
  shadow: "rgba(18, 18, 18, 0.18)",
  shadowDark: "rgba(0, 0, 0, 0.42)",
  slate: "#353231",
  slateRaised: "#454240",
  slateAlt: "#2B2827",
  smoke: "#7A7772",
  silver: "#B7B4AE",
  periwinkle: "#BFD6FF",
  rose: "#EEA7D8",
  sand: "#DFC7A5",
  clay: "#B36B53",
  mint: "#C5F2E2",
  moss: "#737E2A"
} as const;

export const museumSpacing = {
  px: 4,
  xxs: 8,
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 56,
  hero: 72
} as const;

export const museumRadii = {
  xs: 8,
  sm: 12,
  md: 20,
  lg: 24,
  xl: 32,
  full: 999
} as const;

export const museumTypography = {
  mono: 'Fragment Mono, "Avenir Next Condensed", "Trebuchet MS", sans-serif',
  display: '"Arial Black", "Avenir Next Condensed", "Trebuchet MS", sans-serif',
  body: '"Avenir Next", "Trebuchet MS", sans-serif'
} as const;

export const museumMotion = {
  fast: "160ms",
  medium: "260ms",
  slow: "420ms",
  easing: "cubic-bezier(0.22, 1, 0.36, 1)"
} as const;

export const museumShadows = {
  card: `0 18px 36px ${museumColors.shadow}`,
  float: `0 32px 72px ${museumColors.shadowDark}`
} as const;

export const museumTheme = {
  light: {
    background: museumColors.white,
    elevated: museumColors.fog,
    panel: museumColors.white,
    ink: museumColors.ink,
    muted: museumColors.smoke,
    border: museumColors.line,
    tint: museumColors.sky,
    accent: museumColors.brand
  },
  dark: {
    background: museumColors.slate,
    elevated: museumColors.slateRaised,
    panel: museumColors.slateAlt,
    ink: museumColors.white,
    muted: museumColors.silver,
    border: museumColors.lineDark,
    tint: museumColors.sky,
    accent: museumColors.brand
  }
} as const;

export type MuseumTheme = (typeof museumTheme)[PrototypeMode];

export const getMuseumTheme = (mode: PrototypeMode): MuseumTheme =>
  museumTheme[mode];

export const museumBreakpoints = {
  phone: 430,
  desktop: 1100
} as const;

export const artGradients = {
  capsule:
    "radial-gradient(circle at 30% 25%, #fff3cc 0%, #f9d48c 18%, transparent 19%), linear-gradient(160deg, #f2f6ff 0%, #f7d8ec 55%, #efe8ff 100%)",
  dome:
    "radial-gradient(circle at 50% 40%, rgba(255, 216, 109, 0.92), rgba(255, 161, 36, 0.94) 48%, rgba(196, 96, 19, 0.95) 100%), linear-gradient(180deg, #87c7ff 0%, #d4f1cf 100%)",
  suit:
    "linear-gradient(180deg, #dfe5da 0%, #a9b49c 100%)",
  desert:
    "linear-gradient(180deg, #efe8dd 0%, #d0c4b0 100%)",
  atrium:
    "radial-gradient(circle at 50% 18%, #eef1ff 0%, #d8dde5 18%, transparent 19%), linear-gradient(180deg, #f5f6f7 0%, #cad0d7 100%)",
  module:
    "linear-gradient(180deg, #f1f1f3 0%, #dbd9d4 100%)",
  terrain:
    "radial-gradient(circle at 33% 36%, #b67e2f 0, #8a4f1e 26%, transparent 27%), radial-gradient(circle at 66% 44%, #9b5f28 0, #743812 24%, transparent 25%), linear-gradient(180deg, #d49c5f 0%, #8f562c 100%)",
  spectrum:
    "linear-gradient(180deg, #160f18 0%, #74527d 56%, #e3a0cb 100%)"
} as const;
