"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VintageBonusesPanelView } from "@/components/vintage/vintage-bonuses-panel";
import { VintageVehiclePanelView } from "@/components/vintage/vintage-vehicle-panel";
import { VintageGalleryPanelView } from "@/components/vintage/vintage-gallery-panel";
import { VintageLooksPanelView } from "@/components/vintage/vintage-looks-panel";
import { VintageLooksCardsPanelView } from "@/components/vintage/vintage-looks-cards-panel";
import { VintageWeaponsPanelView } from "@/components/vintage/vintage-weapons-panel";
import { VintagePackPanelView } from "@/components/vintage/vintage-pack-panel";
import { vintageCityPark } from "@/data/vintage-city-park";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

export function VintageHorizontalExperience() {
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

    const getDistance = () =>
      Math.max(track.scrollWidth - window.innerWidth, 0);

    // Clear any stale manual height from older builds
    section.style.height = "";

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin,
          scrub: 0.18,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
          },
        },
      });
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(track);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      section.style.height = "";
      ctx.revert();
    };
  }, [reduced]);

  const open = (src: string, alt: string) => setLightbox({ src, alt });
  const panelCount = vintageCityPark.panels.length;
  const onLastPanel =
    panelCount <= 1 || progress >= (panelCount - 1) / panelCount - 0.02;

  const panels = (
    <>
      {vintageCityPark.panels.map((panel) => {
        switch (panel.type) {
          case "bonuses":
            return (
              <VintageBonusesPanelView
                key={panel.id}
                panel={panel}
                onExpand={open}
              />
            );
          case "vehicle":
            return (
              <VintageVehiclePanelView
                key={panel.id}
                panel={panel}
                onExpand={open}
              />
            );
          case "gallery":
            return (
              <VintageGalleryPanelView
                key={panel.id}
                panel={panel}
                onExpand={open}
              />
            );
          case "looks":
            return (
              <VintageLooksPanelView
                key={panel.id}
                panel={panel}
                onExpand={open}
              />
            );
          case "looks-cards":
            return (
              <VintageLooksCardsPanelView
                key={panel.id}
                panel={panel}
                onExpand={open}
              />
            );
          case "weapons":
            return (
              <VintageWeaponsPanelView
                key={panel.id}
                panel={panel}
                onExpand={open}
              />
            );
          case "pack":
            return <VintagePackPanelView key={panel.id} panel={panel} />;
          default:
            return null;
        }
      })}
    </>
  );

  const chrome = (
    <>
      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-4 transition-opacity duration-300 md:px-8",
          onLastPanel && "pointer-events-none opacity-0",
        )}
        aria-hidden={onLastPanel}
      >
        <Link
          href={vintageCityPark.backHref}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#7eb8ff] px-4 py-2 text-sm font-medium text-ink-950 transition-cinema hover:brightness-110"
          tabIndex={onLastPanel ? -1 : undefined}
        >
          <span aria-hidden>←</span> Back
        </Link>
        <a
          href={vintageCityPark.preOrderHref}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto inline-flex rounded-full bg-[#ff4fa3] px-5 py-2.5 font-display text-sm uppercase tracking-[0.12em] text-ink-950 transition-cinema hover:brightness-110"
          tabIndex={onLastPanel ? -1 : undefined}
        >
          {vintageCityPark.preOrderLabel}
        </a>
      </div>

      <div
        className={cn(
          "pointer-events-none fixed bottom-6 left-6 z-40 transition-opacity duration-300 md:bottom-8 md:left-8",
          onLastPanel && "opacity-0",
        )}
        aria-hidden={onLastPanel}
      >
        <div
          className="h-1.5 w-28 overflow-hidden rounded-full bg-black/25 md:w-36"
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Chapter progress"
        >
          <div
            className="h-full rounded-full bg-ink-950/70"
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
      aria-label="Vintage City Park — scroll down to move right"
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
            "gap-0 [&>.vintage-panel]:-ml-px [&>.vintage-panel:first-child]:ml-0",
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
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
