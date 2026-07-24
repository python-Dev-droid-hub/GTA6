"use client";

import { Countdown, type CountdownProps } from "@/components/ui/countdown";
import {
  RELEASE_COUNTDOWN,
  RELEASE_DATE_ISO,
} from "@/constants/release";

export type HeroCountdownProps = Omit<
  CountdownProps,
  "targetDate" | "label" | "completeLabel"
> & {
  /** Override global release ISO when needed */
  targetIso?: string;
  label?: string;
};

/**
 * Hero-bound countdown — thin wrapper over reusable Countdown.
 * Date changes: edit src/constants/release.ts (RELEASE_DATE_ISO).
 */
export function HeroCountdown({
  targetIso = RELEASE_DATE_ISO,
  label = RELEASE_COUNTDOWN.label,
  ...props
}: HeroCountdownProps) {
  return (
    <Countdown
      targetDate={targetIso}
      label={label}
      completeLabel={RELEASE_COUNTDOWN.completeLabel}
      invalidLabel={RELEASE_COUNTDOWN.invalidLabel}
      size="lg"
      animateAttr="countdown"
      {...props}
    />
  );
}
