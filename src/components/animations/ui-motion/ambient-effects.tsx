"use client";

import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

/**
 * Lightweight ambient layer — CSS only (no canvas) for CWV.
 * Hidden on full-bleed cinema routes and when reduced motion.
 */
export function AmbientEffects({ className }: { className?: string }) {
  const reducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();
  const cinema =
    pathname === "/vintage" ||
    pathname?.startsWith("/vintage/") ||
    pathname === "/ultimate" ||
    pathname?.startsWith("/ultimate/");

  if (reducedMotion || cinema) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[1] overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div className="ambient-glow ambient-glow-a" />
      <div className="ambient-glow ambient-glow-b" />
      <div className="ambient-noise" />
    </div>
  );
}
