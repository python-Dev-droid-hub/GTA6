"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { siteConfig } from "@/constants/site";
import { cn } from "@/utils/cn";

const STORAGE_KEY = "vice-boot-seen";

/**
 * AAA boot ritual — once per session, hard-capped, never blocks SEO HTML underneath.
 * Skips entirely for reduced motion or repeat visits.
 */
export function BootLoader() {
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* private mode */
    }
    setVisible(true);
  }, [reducedMotion]);

  useEffect(() => {
    if (!visible) return;

    const root = document.getElementById("boot-loader");
    if (!root) return;

    const mark = root.querySelector("[data-boot-mark]");
    const bar = root.querySelector("[data-boot-bar]");
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
        setVisible(false);
      },
    });

    tl.fromTo(mark, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 })
      .fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: "power1.inOut" }, "-=0.05")
      .to(root, { opacity: 0, duration: 0.3 }, "+=0.15");

    const safety = window.setTimeout(() => {
      tl.progress(1);
    }, 1200);

    return () => {
      window.clearTimeout(safety);
      tl.kill();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      id="boot-loader"
      className={cn(
        "fixed inset-0 z-[90] flex flex-col items-center justify-center gap-8",
        "bg-ink-950 text-paper",
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading experience"
    >
      <p
        data-boot-mark
        className="font-display text-2xl uppercase tracking-[0.28em] text-gradient-vice sm:text-3xl md:text-5xl"
      >
        {siteConfig.name}
      </p>
      <div className="h-px w-40 overflow-hidden bg-border">
        <div
          data-boot-bar
          className="h-full w-full origin-left bg-gradient-neon-edge"
        />
      </div>
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-paper-faint">
        Initializing
      </p>
    </div>
  );
}
