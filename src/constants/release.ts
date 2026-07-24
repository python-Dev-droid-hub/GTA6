/**
 * Single source of truth for launch countdown.
 * Change RELEASE_DATE_ISO when Rockstar updates the window — all countdowns follow.
 * Use UTC ISO-8601 with offset (Z or ±hh:mm).
 */
export const RELEASE_DATE_ISO = "2026-11-19T17:00:00.000Z";

/** Fixed English lockup for collage bar — avoids locale hydration mismatches */
export const RELEASE_COLLAGE_LOCKUP = "COMING NOVEMBER 19, 2026";

export const RELEASE_MENU = {
  comingLabel: "COMING",
  dateLabel: "NOVEMBER 19, 2026",
} as const;

export const RELEASE_COUNTDOWN = {
  label: "Launch window",
  completeLabel: "Now live",
  /** Shown if ISO fails to parse */
  invalidLabel: "Date TBA",
} as const;

export function getReleaseDate(): Date {
  const date = new Date(RELEASE_DATE_ISO);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid RELEASE_DATE_ISO: ${RELEASE_DATE_ISO}`);
  }
  return date;
}
