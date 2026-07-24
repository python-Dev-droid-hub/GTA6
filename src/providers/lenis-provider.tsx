"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis owns scroll once. Ultimate / Vintage cinema pages use snappier wheel settings.
 * Homepage uses lower lerp for butter-smooth scrub sync with ScrollTrigger.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();
  const snappyCinema =
    pathname === "/ultimate" ||
    Boolean(pathname?.startsWith("/ultimate/")) ||
    pathname === "/vintage" ||
    Boolean(pathname?.startsWith("/vintage/"));
  const characterPage = Boolean(pathname?.startsWith("/characters/"));

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis(
      snappyCinema
        ? {
            lerp: 0.14,
            smoothWheel: true,
            syncTouch: true,
            syncTouchLerp: 0.1,
            touchMultiplier: 1.55,
            wheelMultiplier: 1.3,
            autoRaf: false,
          }
        : characterPage
          ? {
              // Tighter scroll = cleaner video scrub sync
              lerp: 0.14,
              smoothWheel: true,
              syncTouch: true,
              syncTouchLerp: 0.1,
              touchMultiplier: 1.2,
              wheelMultiplier: 0.9,
              autoRaf: false,
            }
          : {
              lerp: 0.11,
              smoothWheel: true,
              syncTouch: true,
              syncTouchLerp: 0.09,
              touchMultiplier: 1.25,
              wheelMultiplier: 0.95,
              autoRaf: false,
            },
    );

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refresh, 120);
    };
    requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, [reducedMotion, snappyCinema, characterPage]);

  return children;
}
