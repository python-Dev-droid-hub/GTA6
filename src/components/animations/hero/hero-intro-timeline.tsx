"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export type HeroIntroTimelineProps = {
  children: ReactNode;
  className?: string;
};

/**
 * GSAP enter only. CSS [.hero-intro] hides animated nodes until ready when
 * motion is allowed — prevents SSR flash then hide.
 */
export function HeroIntroTimeline({
  children,
  className,
}: HeroIntroTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.dataset.heroReady = "true";
    const items = root.querySelectorAll<HTMLElement>("[data-hero-animate]");

    if (reducedMotion) {
      gsap.set(items, { clearProps: "all", opacity: 1, y: 0, clipPath: "none" });
      return;
    }

    const ctx = gsap.context(() => {
      const title = root.querySelectorAll("[data-hero-animate='title']");
      const rest = root.querySelectorAll(
        "[data-hero-animate]:not([data-hero-animate='title'])",
      );

      gsap.set(items, { opacity: 0, y: 28 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        title,
        { opacity: 0, y: 48, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.05,
          stagger: 0.08,
        },
      ).to(
        rest,
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
        "-=0.45",
      );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "hero-intro relative z-10 flex h-full flex-col justify-end pb-24 pt-28 md:pb-28 md:pt-32",
        className,
      )}
    >      {children}
    </div>
  );
}
