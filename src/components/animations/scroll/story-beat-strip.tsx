"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { StoryBeat } from "@/data/story-beats";
import { cn } from "@/utils/cn";

export type StoryBeatStripProps = {
  beats: StoryBeat[];
  className?: string;
};

/**
 * Scroll storytelling — horizontal pin when motion allowed;
 * stacked list under reduced motion (a11y + perf).
 */
export function StoryBeatStrip({ beats, className }: StoryBeatStripProps) {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    // Soft horizontal drift on wheel within section (no ScrollTrigger pin yet —
    // avoids Lenis conflicts until scrollerProxy ships).
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    };

    track.addEventListener("wheel", onWheel, { passive: false });

    const ctx = gsap.context(() => {
      gsap.from(track.children, {
        opacity: 0,
        y: 24,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: undefined,
      });
    }, root);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        gsap.to(track.children, {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          overwrite: true,
        });
        io.disconnect();
      },
      { threshold: 0.2 },
    );

    gsap.set(track.children, { opacity: 0, y: 24 });
    io.observe(root);

    return () => {
      track.removeEventListener("wheel", onWheel);
      io.disconnect();
      ctx.revert();
    };
  }, [reducedMotion, beats]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <ul
        ref={trackRef}
        className={cn(
          reducedMotion
            ? "flex flex-col gap-4"
            : "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {beats.map((beat, index) => (
          <li
            key={beat.id}
            className={cn(
              "rounded-lg border border-border bg-surface p-6",
              !reducedMotion && "w-[min(85vw,22rem)] shrink-0 snap-start",
            )}
          >
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-neon-cyan">
              Beat {String(index + 1).padStart(2, "0")} · {beat.label}
            </p>
            <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.08em] text-paper">
              {beat.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-paper-muted">
              {beat.synopsis}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
