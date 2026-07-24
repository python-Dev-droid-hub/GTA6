export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isComplete: boolean;
  isValid: boolean;
};

export type CountdownUnitKey = "days" | "hours" | "minutes" | "seconds";

export const DEFAULT_COUNTDOWN_UNITS: CountdownUnitKey[] = [
  "days",
  "hours",
  "minutes",
  "seconds",
];

export const COUNTDOWN_UNIT_LABEL: Record<CountdownUnitKey, string> = {
  days: "Days",
  hours: "Hrs",
  minutes: "Min",
  seconds: "Sec",
};

/** Resolve ISO string or Date → epoch ms. NaN if invalid. */
export function resolveTargetMs(target: string | Date): number {
  if (target instanceof Date) return target.getTime();
  return Date.parse(target);
}

export function getCountdownParts(
  targetMs: number,
  nowMs: number = Date.now(),
): CountdownParts {
  if (Number.isNaN(targetMs)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0,
      isComplete: false,
      isValid: false,
    };
  }

  const totalMs = Math.max(0, targetMs - nowMs);
  const isComplete = totalMs === 0;

  return {
    days: Math.floor(totalMs / 86_400_000),
    hours: Math.floor((totalMs % 86_400_000) / 3_600_000),
    minutes: Math.floor((totalMs % 3_600_000) / 60_000),
    seconds: Math.floor((totalMs % 60_000) / 1000),
    totalMs,
    isComplete,
    isValid: true,
  };
}

export function formatCountdownAnnouncement(
  parts: CountdownParts,
  completeLabel: string,
): string {
  if (!parts.isValid) return "Release date to be announced";
  if (parts.isComplete) return completeLabel;
  return `${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes, ${parts.seconds} seconds remaining`;
}

/** Days grow beyond 2 digits; clock units stay 2. */
export function padCountdownValue(unit: CountdownUnitKey, value: number): string {
  if (unit === "days") {
    return value < 100 ? value.toString().padStart(2, "0") : String(value);
  }
  return value.toString().padStart(2, "0");
}
