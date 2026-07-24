/**
 * Design tokens as JS — for Framer/GSAP duration sync with CSS.
 * CSS remains source of truth for colors/spacing; these mirror motion + layout.
 */
export const containers = {
  narrow: "max-w-3xl",
  content: "max-w-5xl",
  wide: "max-w-7xl",
  full: "max-w-[1440px]",
  bleed: "max-w-none",
} as const;

export const spacing = {
  sectionY: "py-16 md:py-24 lg:py-32",
  sectionYTight: "py-12 md:py-16",
  gutterX: "px-4 sm:px-6 lg:px-8",
  stack: "gap-6 md:gap-8",
  stackTight: "gap-3 md:gap-4",
} as const;

export const motion = {
  duration: {
    instant: 0.1,
    fast: 0.2,
    base: 0.35,
    slow: 0.55,
    cinematic: 1.1,
  },
  ease: {
    out: [0.16, 1, 0.3, 1] as const,
    inOut: [0.65, 0, 0.35, 1] as const,
    snappy: [0.22, 1, 0.36, 1] as const,
  },
} as const;

export const zIndex = {
  base: 0,
  raised: 10,
  sticky: 40,
  header: 50,
  overlay: 60,
  modal: 70,
  toast: 80,
} as const;
