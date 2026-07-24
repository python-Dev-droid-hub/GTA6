"use client";

import { useEffect, useState } from "react";
import {
  getCountdownParts,
  resolveTargetMs,
  type CountdownParts,
} from "@/lib/countdown";

const PLACEHOLDER: CountdownParts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  totalMs: 0,
  isComplete: false,
  isValid: true,
};

/**
 * Live countdown. SSR + first client paint share a fixed placeholder so
 * Date.now() never causes hydration mismatches; real values start in effect.
 */
export function useCountdown(target: string | Date): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>(PLACEHOLDER);

  useEffect(() => {
    const ms = resolveTargetMs(target);
    const tick = () => setParts(getCountdownParts(ms));
    tick();

    if (Number.isNaN(ms)) {
      setParts({ ...PLACEHOLDER, isValid: false });
      return;
    }

    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return parts;
}
