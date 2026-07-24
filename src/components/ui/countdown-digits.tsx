"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export type CountdownDigitsProps = {
  value: string;
  className?: string;
};

/**
 * GSAP slot flip on value change.
 * Why no context.revert on each tick: revert was killing the in-flight tween
 * every second and fighting React text updates.
 */
export function CountdownDigits({ value, className }: CountdownDigitsProps) {
  const reducedMotion = usePrefersReducedMotion();
  const stageRef = useRef<HTMLSpanElement>(null);
  const layerRef = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(value);
  const tweenRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    tweenRef.current?.kill();
    tweenRef.current = null;

    if (reducedMotion || prevValue.current === value) {
      layer.textContent = value;
      prevValue.current = value;
      gsap.set(layer, { yPercent: 0, opacity: 1 });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        tweenRef.current = null;
      },
    });

    tl.to(layer, {
      yPercent: -110,
      opacity: 0,
      duration: 0.18,
    })
      .add(() => {
        layer.textContent = value;
      })
      .set(layer, { yPercent: 110, opacity: 0 })
      .to(layer, {
        yPercent: 0,
        opacity: 1,
        duration: 0.26,
        ease: "power3.out",
      });

    tweenRef.current = tl;
    prevValue.current = value;

    return () => {
      tl.kill();
      if (tweenRef.current === tl) tweenRef.current = null;
    };
  }, [value, reducedMotion]);

  return (
    <span
      ref={stageRef}
      className={cn(
        "relative inline-flex h-[1em] min-w-[2ch] items-center justify-center overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <span
        ref={layerRef}
        className="inline-block tabular-nums will-change-transform"
        suppressHydrationWarning
      >
        {value}
      </span>
    </span>
  );
}
