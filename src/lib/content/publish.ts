/**
 * Content publish scheduling.
 * - draft: true → never public
 * - publishAt (preferred) or date → must be ≤ now
 * Use ISO-8601 with offset for exact times, e.g. 2026-09-10T09:00:00+05:00
 * Date-only values (YYYY-MM-DD) publish at 00:00:00 UTC that day.
 */

export type PublishFields = {
  draft?: boolean;
  /** Display / default schedule date (ISO or YYYY-MM-DD) */
  date: string;
  /** Optional schedule override — when set, gating uses this instead of date */
  publishAt?: string;
};

export const CONTENT_REVALIDATE_SECONDS = 60;

/** Resolve the instant a post becomes public. */
export function getPublishInstant(fields: PublishFields): Date | null {
  const raw = (fields.publishAt ?? fields.date).trim();
  if (!raw) return null;

  // Date-only → UTC midnight so “2026-09-10” is deterministic across regions
  const normalized =
    /^\d{4}-\d{2}-\d{2}$/.test(raw) ? `${raw}T00:00:00.000Z` : raw;

  const instant = new Date(normalized);
  if (Number.isNaN(instant.getTime())) return null;
  return instant;
}

/** True when the post should be visible to the public right now. */
export function isContentPublished(
  fields: PublishFields,
  now: Date = new Date(),
): boolean {
  if (fields.draft) return false;
  const instant = getPublishInstant(fields);
  if (!instant) return false;
  return instant.getTime() <= now.getTime();
}
