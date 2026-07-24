"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";
import {
  COUNTDOWN_UNIT_LABEL,
  DEFAULT_COUNTDOWN_UNITS,
  formatCountdownAnnouncement,
  padCountdownValue,
  type CountdownUnitKey,
} from "@/lib/countdown";
import { useCountdown } from "@/hooks/use-countdown";
import { CountdownDigits } from "@/components/ui/countdown-digits";
import { cn } from "@/utils/cn";

const shellVariants = cva("flex flex-col", {
  variants: {
    size: {
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-3",
    },
  },
  defaultVariants: { size: "md" },
});

const valueVariants = cva(
  "font-display leading-none tracking-[0.08em] text-paper",
  {
    variants: {
      size: {
        sm: "text-2xl",
        md: "text-3xl sm:text-4xl",
        lg: "text-3xl sm:text-4xl md:text-5xl",
      },
    },
    defaultVariants: { size: "md" },
  },
);

const unitMinWidth = {
  sm: "min-w-[3.25rem]",
  md: "min-w-[4.25rem] sm:min-w-[5rem]",
  lg: "min-w-[4.25rem] sm:min-w-[5rem]",
} as const;

export type CountdownProps = VariantProps<typeof shellVariants> & {
  targetDate: string | Date;
  label?: string;
  completeLabel?: string;
  invalidLabel?: string;
  units?: CountdownUnitKey[];
  className?: string;
  /** Maps to data-hero-animate for parent GSAP timelines */
  animateAttr?: string;
};

function UnitBlock({
  unit,
  value,
  size,
  showSeparator,
}: {
  unit: CountdownUnitKey;
  value: number;
  size: NonNullable<CountdownProps["size"]>;
  showSeparator: boolean;
}) {
  const display = padCountdownValue(unit, value);

  return (
    <>
      <div
        className={cn(
          "flex flex-col items-center gap-1",
          unitMinWidth[size ?? "md"],
        )}
      >
        <span className={valueVariants({ size })}>
          <CountdownDigits value={display} />
        </span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-paper-faint">
          {COUNTDOWN_UNIT_LABEL[unit]}
        </span>
      </div>
      {showSeparator ? (
        <span
          className={cn(
            "font-display self-start pt-1 text-paper-faint",
            size === "sm" ? "text-xl" : "text-2xl sm:text-3xl",
          )}
          aria-hidden="true"
        >
          :
        </span>
      ) : null}
    </>
  );
}

function usePoliteAnnouncement(
  parts: ReturnType<typeof useCountdown>,
  completeLabel: string,
) {
  const [live, setLive] = useState(() =>
    formatCountdownAnnouncement(parts, completeLabel),
  );
  const lastMinuteKey = useRef(`${parts.days}-${parts.hours}-${parts.minutes}`);

  useEffect(() => {
    if (!parts.isValid) {
      setLive(formatCountdownAnnouncement(parts, completeLabel));
      return;
    }
    if (parts.isComplete) {
      setLive(completeLabel);
      return;
    }
    const key = `${parts.days}-${parts.hours}-${parts.minutes}`;
    if (key !== lastMinuteKey.current) {
      lastMinuteKey.current = key;
      setLive(formatCountdownAnnouncement(parts, completeLabel));
    }
  }, [parts, completeLabel]);

  return live;
}

/**
 * Reusable launch countdown — GSAP digit flips, retarget via targetDate.
 * aria-live updates on minute boundaries (not every second) to avoid SR spam.
 */
export function Countdown({
  targetDate,
  label,
  completeLabel = "Now live",
  invalidLabel = "Date TBA",
  units = DEFAULT_COUNTDOWN_UNITS,
  size = "md",
  className,
  animateAttr,
}: CountdownProps) {
  const parts = useCountdown(targetDate);
  const announcement = formatCountdownAnnouncement(parts, completeLabel);
  const liveAnnouncement = usePoliteAnnouncement(parts, completeLabel);
  const targetIso =
    typeof targetDate === "string" ? targetDate : targetDate.toISOString();

  return (
    <div
      className={cn(shellVariants({ size }), className)}
      {...(animateAttr ? { "data-hero-animate": animateAttr } : {})}
    >
      {label ? (
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-neon-cyan">
          {label}
        </p>
      ) : null}

      {!parts.isValid ? (
        <p className="font-display text-xl uppercase tracking-[0.14em] text-paper-muted">
          {invalidLabel}
        </p>
      ) : parts.isComplete ? (
        <p className="font-display text-2xl uppercase tracking-[0.14em] text-vice-pink">
          {completeLabel}
        </p>
      ) : (
        <div
          className="flex items-stretch gap-2 sm:gap-3"
          role="timer"
          aria-label={announcement}
          suppressHydrationWarning
        >
          {units.map((unit, index) => (
            <UnitBlock
              key={unit}
              unit={unit}
              value={parts[unit]}
              size={size ?? "md"}
              showSeparator={index < units.length - 1}
            />
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </p>

      <time dateTime={targetIso} className="sr-only">
        Target {targetIso}
      </time>
    </div>
  );
}
