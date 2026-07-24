/**
 * Core Web Vitals / perf notes for agents.
 * Targets: Lighthouse > 90; LCP ≤ 2.5s; CLS ≤ 0.1.
 */

export const performanceBudget = {
  lighthouseMin: 90,
  lcpMs: 2500,
  clsMax: 0.1,
  homeWebgl: false, // WebGL only in-view islands
  youtubeUntilClick: true,
  maxHomeScrollPins: 1,
} as const;

/** Hint: prefer these dynamic() flags for heavy client islands */
export const heavyIslandOptions = {
  ssr: false as const,
};
