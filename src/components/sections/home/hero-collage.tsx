"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonLink } from "@/components/ui/button-link";
import { homeCollage, homeCollagePanels } from "@/data/home-collage";
import { RELEASE_COLLAGE_LOCKUP } from "@/constants/release";
import { legal } from "@/constants/legal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

export type HeroCollageProps = {
  className?: string;
};

/**
 * Opening collage — sticky full-bleed, darkens while the next
 * video section scrolls up over it (no pin-spacer / black gap).
 */
export function HeroCollage({ className }: HeroCollageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const scrim = scrimRef.current;
    const brand = brandRef.current;
    const bar = barRef.current;
    if (!section || !scrim || !brand || !bar) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(scrim, { opacity: 0 }, { opacity: 0.9, duration: 0.65 }, 0);
      tl.fromTo(
        brand,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -14, duration: 0.4 },
        0.3,
      );
      tl.fromTo(
        bar,
        { opacity: 1, y: 0 },
        { opacity: 0, y: 24, duration: 0.4 },
        0.32,
      );
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="hero-collage"
      className={cn(
        "relative isolate z-10 w-full bg-ink-950",
        !reduced && "h-[200vh]",
        className,
      )}
      aria-labelledby="collage-brand"
    >
      <div
        className={cn(
          "relative flex min-h-dvh w-full overflow-hidden bg-ink-950",
          !reduced && "sticky top-0",
        )}
      >
        <div className="relative flex min-h-dvh w-full flex-col">
          <div className="relative flex min-h-0 flex-1 flex-col">
            <div className="hero-collage-grid relative min-h-[min(72dvh,820px)] flex-1 md:min-h-[min(78dvh,900px)]">
              {homeCollagePanels.map((panel) => (
                <div
                  key={panel.id}
                  className="hero-collage-cell relative overflow-hidden"
                  data-area={panel.area}
                >
                  <Image
                    src={panel.src}
                    alt={panel.alt}
                    fill
                    priority={panel.id === "pair" || panel.id === "sky"}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}

              <div
                ref={brandRef}
                className="hero-collage-brand pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-6 will-change-transform"
              >
                <div className="relative text-center">
                  <span
                    className="hero-collage-mark font-display block text-[clamp(6rem,28vw,14rem)] leading-none tracking-tight text-transparent"
                    aria-hidden
                  >
                    II
                  </span>
                  <h1
                    id="collage-brand"
                    className="font-display absolute inset-0 flex flex-col items-center justify-center text-[clamp(1.75rem,6vw,3.75rem)] uppercase leading-none tracking-[0.12em] text-paper"
                  >
                    <span className="drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                      {homeCollage.brandLine}
                    </span>
                    <span className="mt-2 font-mono text-[0.65rem] tracking-[0.42em] text-paper md:text-xs">
                      {homeCollage.brandSub}
                    </span>
                  </h1>
                </div>
              </div>
            </div>

            <div
              ref={barRef}
              className="relative z-20 flex flex-col gap-4 border-t border-ink-800 bg-ink-950 px-4 py-5 will-change-transform sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-6"
            >
              <p className="font-display text-sm uppercase tracking-[0.14em] text-paper sm:text-base md:text-lg">
                {RELEASE_COLLAGE_LOCKUP}
              </p>

              <ButtonLink
                href={homeCollage.ctaHref}
                variant="primary"
                size="lg"
                className="rounded-full bg-[#f7b6c8] px-10 text-ink-950 shadow-none hover:bg-[#ffc9d8] hover:brightness-100"
                {...(homeCollage.ctaExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {homeCollage.ctaLabel}
              </ButtonLink>

              <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-paper-muted sm:text-right">
                {homeCollage.platformsLabel}
              </p>
            </div>
          </div>
        </div>

        <div
          ref={scrimRef}
          className="pointer-events-none absolute inset-0 z-30 bg-[#07061a] opacity-0"
          aria-hidden
        />
      </div>

      <p className="sr-only">{legal.shortDisclaimer}</p>
    </section>
  );
}
