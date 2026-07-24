"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

/** GSAP reveal when section enters viewport (IO — Lenis/ScrollTrigger later). */
export function ScrollReveal({
  children,
  className,
  stagger = 0.12,
}: ScrollRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const targets =
      root.querySelectorAll<HTMLElement>("[data-reveal]").length > 0
        ? Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"))
        : [root];

    gsap.set(targets, { opacity: 0, y: 36 });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger,
          overwrite: true,
        });
        io.disconnect();
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );

    io.observe(root);
    return () => io.disconnect();
  }, [reducedMotion, stagger]);

  return (
    <div ref={rootRef} className={cn(className)}>
      {children}
    </div>
  );
}
