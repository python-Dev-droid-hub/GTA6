"use client";

import { useEffect, useRef, useState } from "react";
import { useCountdown } from "@/hooks/use-countdown";
import {
  padCountdownValue,
  type CountdownUnitKey,
} from "@/lib/countdown";
import {
  RELEASE_COUNTDOWN,
  RELEASE_DATE_ISO,
  RELEASE_MENU,
} from "@/constants/release";
import { cn } from "@/utils/cn";

const UNITS: CountdownUnitKey[] = ["days", "hours", "minutes", "seconds"];

const UNIT_LABEL: Record<CountdownUnitKey, string> = {
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
};

const UNIT_TONE: Record<CountdownUnitKey, "pink" | "cyan" | "blue"> = {
  days: "pink",
  hours: "cyan",
  minutes: "pink",
  seconds: "blue",
};

function FlipDigit({
  value,
  tone,
}: {
  value: string;
  tone: "pink" | "cyan" | "blue";
}) {
  const prev = useRef(value);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (prev.current === value) return;
    prev.current = value;
    setFlash(true);
    const id = window.setTimeout(() => setFlash(false), 280);
    return () => window.clearTimeout(id);
  }, [value]);

  return (
    <span
      className={cn(
        "launch-panel__num font-[family-name:var(--font-family-orbitron)] font-bold leading-none tabular-nums",
        tone === "pink" && "text-[var(--hero-accent-pink)]",
        tone === "cyan" && "text-[var(--hero-accent-cyan)]",
        tone === "blue" && "text-[var(--hero-accent-blue)]",
        flash && "launch-panel__num--flash",
      )}
      suppressHydrationWarning
    >
      {value}
    </span>
  );
}

export type BannerGameCounterProps = {
  className?: string;
  targetIso?: string;
  /** Hide date header when parent already shows the release date */
  showHeader?: boolean;
};

/**
 * Premium glass launch countdown — equal tiles, clear labels, digit fade.
 */
export function BannerGameCounter({
  className,
  targetIso = RELEASE_DATE_ISO,
  showHeader = true,
}: BannerGameCounterProps) {
  const parts = useCountdown(targetIso);

  if (!parts.isValid) {
    return (
      <p className="font-[family-name:var(--font-family-orbitron)] text-xs uppercase tracking-[0.3em] text-white/70">
        {RELEASE_COUNTDOWN.invalidLabel}
      </p>
    );
  }

  if (parts.isComplete) {
    return (
      <p className="font-[family-name:var(--font-family-anton)] text-2xl uppercase tracking-[0.12em] text-[var(--hero-accent-pink)]">
        {RELEASE_COUNTDOWN.completeLabel}
      </p>
    );
  }

  return (
    <div
      className={cn("launch-panel relative w-full", className)}
      role="timer"
      aria-label={`Global launch in ${parts.days} days ${parts.hours} hours ${parts.minutes} minutes ${parts.seconds} seconds`}
      suppressHydrationWarning
    >
      <div className="launch-panel__glass">
        {showHeader ? (
          <div className="launch-panel__header mb-5 flex items-center justify-center gap-3">
            <span className="launch-panel__rule" aria-hidden />
            <span className="font-[family-name:var(--font-family-orbitron)] text-[11px] font-medium uppercase tracking-[0.35em] text-white sm:text-[12px]">
              {RELEASE_MENU.dateLabel}
            </span>
            <span className="launch-panel__rule" aria-hidden />
          </div>
        ) : null}

        <div className="launch-panel__grid">
          {UNITS.map((unit) => (
            <div key={unit} className="launch-panel__cell">
              <div
                className={cn(
                  "launch-panel__tile",
                  UNIT_TONE[unit] === "pink" && "launch-panel__tile--pink",
                  UNIT_TONE[unit] === "cyan" && "launch-panel__tile--cyan",
                  UNIT_TONE[unit] === "blue" && "launch-panel__tile--blue",
                )}
              >
                <span className="launch-panel__tile-sheen" aria-hidden />
                <FlipDigit
                  value={padCountdownValue(unit, parts[unit])}
                  tone={UNIT_TONE[unit]}
                />
              </div>
              <span className="launch-panel__label font-[family-name:var(--font-family-orbitron)]">
                {UNIT_LABEL[unit]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
