"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Professional gaming cursor — crosshair + reticle.
 * Desktop fine-pointer only; touch / reduced-motion keep system cursor.
 */
export function CustomCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setEnabled(false);
      return;
    }
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)");
    const sync = () => setEnabled(fine.matches);
    sync();
    fine.addEventListener("change", sync);
    return () => fine.removeEventListener("change", sync);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");
    const tip = tipRef.current;
    const ring = ringRef.current;
    const root = rootRef.current;
    if (!tip || !ring || !root) return;

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let hovering = false;
    let pressing = false;

    const interactiveSelector =
      "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor='hover']";

    const syncState = () => {
      root.dataset.hover = hovering ? "true" : "false";
      root.dataset.press = pressing ? "true" : "false";
      gsap.to(ring, {
        scale: pressing ? 0.72 : hovering ? 1.45 : 1,
        opacity: pressing ? 0.55 : hovering ? 1 : 0.85,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(tip, {
        scale: pressing ? 0.85 : hovering ? 0.55 : 1,
        duration: 0.18,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      gsap.set(tip, { x: pos.x, y: pos.y });

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const next = Boolean(el?.closest(interactiveSelector));
      if (next !== hovering) {
        hovering = next;
        syncState();
      }
    };

    const onDown = () => {
      pressing = true;
      syncState();
    };
    const onUp = () => {
      pressing = false;
      syncState();
    };

    const ticker = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.22;
      ringPos.y += (pos.y - ringPos.y) * 0.22;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("blur", onUp);
    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", onUp);
      gsap.ticker.remove(ticker);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      className="gaming-cursor pointer-events-none fixed inset-0 z-[90]"
      aria-hidden
      data-hover="false"
      data-press="false"
    >
      {/* Lagging reticle */}
      <div
        ref={ringRef}
        className="gaming-cursor__ring absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        <span className="gaming-cursor__ring-core" />
        <span className="gaming-cursor__tick gaming-cursor__tick--n" />
        <span className="gaming-cursor__tick gaming-cursor__tick--e" />
        <span className="gaming-cursor__tick gaming-cursor__tick--s" />
        <span className="gaming-cursor__tick gaming-cursor__tick--w" />
      </div>

      {/* Instant tip / cross */}
      <div
        ref={tipRef}
        className="gaming-cursor__tip absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        <span className="gaming-cursor__cross gaming-cursor__cross--h" />
        <span className="gaming-cursor__cross gaming-cursor__cross--v" />
        <span className="gaming-cursor__core" />
      </div>
    </div>
  );
}
