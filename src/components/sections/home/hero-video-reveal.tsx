"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BannerGameCounter } from "@/components/sections/home/banner-game-counter";
import { homeCollage } from "@/data/home-collage";
import { cinemaBeatById } from "@/data/cinema-beats";
import { legal } from "@/constants/legal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  advanceVideoScrubSeek,
  createVideoScrubSeek,
} from "@/utils/video-scrub-seek";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

const SCRUB_START = 0.34;

export type HeroVideoRevealProps = {
  className?: string;
};

/**
 * AAA cinematic launch hero — movie-poster composition → scroll-scrub cinema.
 * Existing collage asset only; composition / type / HUD / motion redesigned.
 * Content: subtitle + title lockup + launch countdown (no description).
 */
export function HeroVideoReveal({ className }: HeroVideoRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const heroBarRef = useRef<HTMLDivElement>(null);
  const sixRef = useRef<HTMLSpanElement>(null);
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const seekRef = useRef(createVideoScrubSeek());
  const reduced = usePrefersReducedMotion();

  const clip = cinemaBeatById["beat-01"];

  useLayoutEffect(() => {
    if (reduced || !clip) return;
    const section = sectionRef.current;
    const pin = pinRef.current;
    const heroLayer = heroLayerRef.current;
    const heroBg = heroBgRef.current;
    const heroCopy = heroCopyRef.current;
    const heroTitle = heroTitleRef.current;
    const heroBar = heroBarRef.current;
    const six = sixRef.current;
    const videoLayer = videoLayerRef.current;
    const video = videoRef.current;
    if (
      !section ||
      !pin ||
      !heroLayer ||
      !heroBg ||
      !heroCopy ||
      !heroTitle ||
      !heroBar ||
      !six ||
      !videoLayer ||
      !video
    ) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    seekRef.current = createVideoScrubSeek();
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.loop = false;
    video.preload = "auto";
    video.pause();
    try {
      video.currentTime = 0;
    } catch {
      /* ignore */
    }

    const arm = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      seekRef.current.duration = video.duration;
      seekRef.current.ready = true;
      seekRef.current.current = 0;
      seekRef.current.target = 0;
      ScrollTrigger.refresh();
    };
    if (video.readyState >= 1) arm();
    video.addEventListener("loadedmetadata", arm);
    video.addEventListener("loadeddata", arm);

    const onSeeked = () => {
      seekRef.current.busy = false;
    };
    video.addEventListener("seeked", onSeeked);

    const tick = () => {
      advanceVideoScrubSeek(video, seekRef.current, {
        lerp: 0.3,
        snapGap: 0.08,
        snapLerp: 0.72,
        frameDur: 1 / 48,
        busyTimeoutMs: 42,
      });
    };
    gsap.ticker.add(tick);

    const ctx = gsap.context(() => {
      gsap.set(videoLayer, { opacity: 0, scale: isMobile ? 1.03 : 1.06 });
      gsap.set(heroLayer, { opacity: 1 });
      gsap.set(section, { zIndex: 30 });
      // Visible on first paint — never leave 6 / counter stuck at opacity 0
      gsap.set(heroCopy, { opacity: 1, y: 0 });
      gsap.set(heroTitle, { opacity: 1, y: 0 });
      gsap.set(heroBar, { opacity: 1, y: 0, scale: 1 });
      gsap.set(six, { opacity: 1, scale: 1 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(heroTitle, { y: 18, duration: 0.75 }, 0.06)
        .from(six, { scale: 0.96, duration: 0.8 }, 0.1)
        .from(heroBar, { y: 10, duration: 0.7 }, 0.2);
      gsap.set([six, heroBar], { opacity: 1 });

      // Mouse parallax (desktop) — transform only; float lives on CSS plane
      const artX = gsap.quickTo(heroBg, "x", {
        duration: 0.9,
        ease: "power2.out",
      });
      const artY = gsap.quickTo(heroBg, "y", {
        duration: 0.9,
        ease: "power2.out",
      });
      const sixX = gsap.quickTo(six, "x", {
        duration: 1.1,
        ease: "power2.out",
      });
      const sixY = gsap.quickTo(six, "y", {
        duration: 1.1,
        ease: "power2.out",
      });

      const onMove = (e: MouseEvent) => {
        if (window.matchMedia("(max-width: 767px)").matches) return;
        const rect = pin.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        artX(nx * -8);
        artY(ny * -5);
        sixX(nx * 8);
        sixY(ny * 6);
      };
      pin.addEventListener("mousemove", onMove);

      const tl = gsap.timeline({
        defaults: { ease: "none", immediateRender: false },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin,
          scrub: 0.28,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const p = self.progress;
            // Keep banner above following CTAs until cinema handoff
            gsap.set(section, {
              zIndex: p < SCRUB_START * 0.55 ? 30 : 5,
            });
            if (p < SCRUB_START) {
              seekRef.current.target = 0;
              return;
            }
            const local = (p - SCRUB_START) / (1 - SCRUB_START);
            const dur = seekRef.current.duration;
            if (dur > 0) {
              seekRef.current.target = Math.min(Math.max(local, 0), 1) * dur;
            }
          },
          onLeaveBack: () => {
            gsap.set(section, { zIndex: 30 });
            // Restore hero chrome when returning to top
            gsap.set([six, heroBar, heroCopy, heroTitle], {
              opacity: 1,
              y: 0,
              scale: 1,
            });
            seekRef.current.target = 0;
            seekRef.current.current = 0;
            try {
              video.currentTime = 0;
            } catch {
              /* ignore */
            }
          },
        },
      });

      tl.to(heroBg, { scale: isMobile ? 1.05 : 1.08, duration: SCRUB_START }, 0);
      // Fade VI / counter only once cinema handoff is well underway
      tl.to(
        six,
        { opacity: 0, scale: 1.06, duration: SCRUB_START * 0.45 },
        SCRUB_START * 0.42,
      );
      tl.to(
        heroCopy,
        { opacity: 0, y: -28, duration: SCRUB_START * 0.5 },
        SCRUB_START * 0.4,
      );
      tl.to(
        heroBar,
        { opacity: 0, y: 16, duration: SCRUB_START * 0.4 },
        SCRUB_START * 0.44,
      );
      tl.to(
        heroLayer,
        { opacity: 0, duration: SCRUB_START * 0.45 },
        SCRUB_START * 0.48,
      );
      tl.to(
        videoLayer,
        { opacity: 1, scale: 1, duration: SCRUB_START * 0.7 },
        SCRUB_START * 0.28,
      );
      tl.to({}, { duration: 1 - SCRUB_START }, SCRUB_START);

      (pin as HTMLDivElement & { __parallaxOff?: () => void }).__parallaxOff =
        () => pin.removeEventListener("mousemove", onMove);
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      const pinEl = pinRef.current as
        | (HTMLDivElement & { __parallaxOff?: () => void })
        | null;
      pinEl?.__parallaxOff?.();
      gsap.ticker.remove(tick);
      video.removeEventListener("loadedmetadata", arm);
      video.removeEventListener("loadeddata", arm);
      video.removeEventListener("seeked", onSeeked);
      video.pause();
      ctx.revert();
    };
  }, [reduced, clip]);

  if (!clip) return null;

  return (
    <section
      ref={sectionRef}
      id="hero-collage"
      className={cn(
        "relative isolate z-30 w-full bg-[#03020c]",
        !reduced && "h-[210vh]",
        className,
      )}
      aria-label="Grand Theft Auto 6 launch"
    >
      <div
        ref={pinRef}
        className="relative h-dvh w-full overflow-hidden bg-[#03020c]"
      >
        {/* Cinema underlay */}
        <div
          ref={videoLayerRef}
          className="absolute inset-0 z-0 will-change-transform"
          style={{ opacity: 0 }}
        >
          <Image
            src={clip.posterSrc}
            alt={clip.posterAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {!reduced ? (
            <video
              ref={videoRef}
              className="absolute inset-0 size-full object-cover"
              poster={clip.posterSrc}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              tabIndex={-1}
              aria-hidden
            >
              <source src={clip.videoSrc} type="video/mp4" />
            </video>
          ) : null}
        </div>

        {/* ========== MOVIE-POSTER HERO ========== */}
        <div
          ref={heroLayerRef}
          className="hero-poster absolute inset-0 z-10 flex flex-col overflow-y-auto overflow-x-hidden will-change-transform md:block md:overflow-hidden"
        >
          <div className="hero-poster__fog" aria-hidden />
          <div className="hero-poster__rays" aria-hidden />
          <div className="hero-poster__particles" aria-hidden />
          <div className="hero-poster__grain" aria-hidden />
          <div className="hero-poster__vignette" aria-hidden />

          {/* ART — outer frame stays centered; GSAP only moves inner plane */}
          <div
            className={cn(
              "hero-poster__art z-[5]",
              /* Mobile */
              "relative order-2 mx-auto mt-3 w-[min(94vw,520px)] px-4",
              /* Desktop: full-height right column, vertically centered */
              "md:absolute md:inset-y-0 md:right-0 md:order-none md:mx-0 md:mt-0",
              "md:flex md:w-[min(58%,960px)] md:items-center md:justify-end",
              "md:pr-8 md:pl-4 lg:w-[min(60%,1100px)] lg:pr-12",
            )}
          >
            <div
              ref={heroBgRef}
              className="hero-poster__art-motion relative w-full will-change-transform"
            >
              <div className="hero-poster__art-glow" aria-hidden />
              <div className="hero-poster__art-plane ml-auto w-full">
                <Image
                  src={homeCollage.collageSrc}
                  alt="Grand Theft Auto 6 key-art collage"
                  width={1024}
                  height={576}
                  priority
                  sizes="(max-width: 768px) 94vw, 60vw"
                  className={cn(
                    "relative z-[1] block h-auto w-full object-contain",
                    "max-h-[min(36dvh,280px)]",
                    "md:ml-auto md:max-h-[min(72dvh,620px)] md:w-auto md:max-w-full",
                  )}
                />
              </div>
            </div>
          </div>

          {/* COPY — locked to left dark zone only (image untouched) */}
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 z-20 flex",
              "w-full max-w-none items-start pt-[4.75rem]",
              "md:w-[min(40%,28rem)] md:items-center md:pt-0",
              "lg:w-[min(38%,30rem)]",
            )}
          >
            <div
              ref={heroCopyRef}
              className={cn(
                "hero-copy pointer-events-auto relative flex w-full flex-col items-start overflow-hidden",
                "px-5 pb-4 sm:px-6 sm:pb-6",
                "md:ml-6 md:max-w-full md:px-0 md:pb-0 lg:ml-10",
                "will-change-transform",
              )}
            >
              <p className="hero-copy__eyebrow mb-4 text-[12px] font-medium uppercase tracking-[0.32em] text-[var(--hero-accent-pink)] sm:mb-5 sm:text-[13px]">
                {homeCollage.eyebrow}
              </p>

              <div
                ref={heroTitleRef}
                className="hero-title-lockup relative flex w-full items-stretch gap-1 will-change-transform sm:gap-2"
              >
                <h1
                  id="collage-brand"
                  className={cn(
                    "hero-title-lockup__words relative z-10 min-w-0",
                    "font-[family-name:var(--font-family-bebas)] uppercase text-white",
                    "text-[clamp(2.05rem,5.5vw,4.75rem)] leading-[0.82] tracking-[0.02em]",
                  )}
                >
                  <span className="block">Grand</span>
                  <span className="block">Theft</span>
                  <span className="block">Auto</span>
                </h1>

                <span
                  ref={sixRef}
                  className={cn(
                    "hero-title-lockup__digit hero-title-lockup__vi flex shrink-0 items-center justify-center self-stretch",
                    "font-[family-name:var(--font-family-bebas)] uppercase leading-none",
                    "will-change-transform",
                  )}
                  aria-hidden
                >
                  VI
                </span>
                <span className="sr-only">
                  {" "}
                  VI
                </span>
              </div>

              <div
                ref={heroBarRef}
                className="mt-7 w-full max-w-[22rem] will-change-transform sm:mt-8 sm:max-w-[24rem]"
              >
                <BannerGameCounter />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="sr-only">{legal.shortDisclaimer}</p>
    </section>
  );
}
