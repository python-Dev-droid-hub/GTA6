"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UltimateHeroPanelView } from "@/components/ultimate/ultimate-hero-panel";
import { UltimateGalleryPanelView } from "@/components/ultimate/ultimate-gallery-panel";
import { ultimateEdition } from "@/data/ultimate-edition";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

/**
 * Vertical scroll (up/down) drives the track left/right.
 * Tall runway + pinned viewport + translateX scrub.
 */
export function UltimateHorizontalExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;

    const measure = () => {
      const scrollDistance = Math.max(track.scrollWidth - window.innerWidth, 0);
      // Slightly shorter runway = snappier chapter changes
      section.style.height = `${scrollDistance * 0.72 + window.innerHeight}px`;
      return scrollDistance;
    };

    let scrollDistance = measure();

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin,
          scrub: 0.18,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            scrollDistance = measure();
          },
          onUpdate: (self) => {
            setProgress(self.progress);
          },
        },
      });
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    // Images loading can change track width
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(track);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      ctx.revert();
    };
  }, [reduced]);

  const findSrc = (id: string) => {
    for (const p of ultimateEdition.panels) {
      if (p.type !== "gallery") continue;
      const hit = p.items.find((i) => i.id === id);
      if (hit) return hit;
    }
    return null;
  };

  const panels = (
    <>
      {ultimateEdition.panels.map((panel) =>
        panel.type === "hero" ? (
          <UltimateHeroPanelView
            key={panel.id}
            panel={panel}
            onExpand={
              panel.layout === "split"
                ? () =>
                    setLightbox({
                      src: panel.imageSrc,
                      alt: panel.imageAlt,
                    })
                : undefined
            }
          />
        ) : (
          <UltimateGalleryPanelView
            key={panel.id}
            panel={panel}
            onExpand={(id) => {
              const hit = findSrc(id);
              if (hit) setLightbox({ src: hit.src, alt: hit.alt });
            }}
            centerCopy={
              panel.id === "weapons-gallery"
                ? {
                    label: "Weapons",
                    title: "Personalized Variants",
                    body: "Engraved sidearms for the pair — matched grips, shared heat.",
                  }
                : panel.id === "modkit-gallery"
                  ? {
                      label: "Modkit",
                      title: "Ganado Retro Build",
                      body: "Muscle and classic stylings for the low-riding pickup.",
                    }
                  : undefined
            }
          />
        ),
      )}
    </>
  );

  const chrome = (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-4 md:px-8">
        <Link
          href={ultimateEdition.backHref}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#2a1f3d]/90 px-4 py-2 text-sm text-paper backdrop-blur-md transition-cinema hover:bg-[#3d2d58]"
        >
          <span aria-hidden>←</span> Back
        </Link>
        <a
          href={ultimateEdition.preOrderHref}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto inline-flex rounded-full bg-[#f7b6c8] px-5 py-2.5 font-display text-sm uppercase tracking-[0.12em] text-ink-950 transition-cinema hover:brightness-110"
        >
          {ultimateEdition.preOrderLabel}
        </a>
      </div>

      <div className="pointer-events-none fixed bottom-6 left-6 z-40 md:bottom-8 md:left-8">
        <div
          className="h-1.5 w-28 overflow-hidden rounded-full bg-white/15 md:w-36"
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Chapter progress"
        >
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${Math.max(progress * 100, 4)}%` }}
          />
        </div>
      </div>
    </>
  );

  if (reduced) {
    return (
      <div className="relative bg-ink-950">
        {chrome}
        <div className="flex flex-col">{panels}</div>
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink-950"
      aria-label="Ultimate Edition — scroll down to move right"
    >
      {chrome}
      <div
        ref={pinRef}
        className="relative h-dvh w-full overflow-hidden bg-ink-950"
      >
        <div
          ref={trackRef}
          className={cn(
            "flex h-full w-max will-change-transform",
            "gap-0 [&>.ultimate-panel]:-ml-px [&>.ultimate-panel:first-child]:ml-0",
          )}
        >
          {panels}
        </div>
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/90 p-6 backdrop-blur-sm"
          role="dialog"
          aria-modal
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-6 top-6 rounded-full bg-white/10 px-4 py-2 text-sm text-paper"
            onClick={() => setLightbox(null)}
          >
            Close
          </button>
          <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl">
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              loading="lazy"
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
