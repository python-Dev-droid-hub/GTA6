"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export type HeroScrollIndicatorProps = {
  targetId: string;
  label: string;
  className?: string;
};

/** Smooth-scroll to next landmark; respects reduced motion (instant jump). */
export function HeroScrollIndicator({
  targetId,
  label,
  className,
}: HeroScrollIndicatorProps) {
  const reducedMotion = usePrefersReducedMotion();

  const onActivate = () => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
    el.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      data-hero-animate="scroll"
      onClick={onActivate}
      className={cn(
        "group absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3",
        "text-paper-muted transition-cinema hover:text-neon-cyan",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        className,
      )}
      aria-label={label}
    >
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em]">
        {label}
      </span>
      <span className="relative flex h-10 w-5 items-start justify-center rounded-pill border border-border-strong pt-2">
        <span className="hero-scroll-line block h-3 w-px animate-bounce group-hover:bg-neon-cyan" />
      </span>
    </button>
  );
}
