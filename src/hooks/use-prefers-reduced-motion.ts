"use client";

import { useEffect, useState } from "react";

/**
 * Always start `false` on server + first client paint, then sync in effect.
 * Reading matchMedia during useState init causes SSR/client hydration mismatches.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
