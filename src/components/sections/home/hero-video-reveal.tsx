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
    video.preload = "none";
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
    let videoLoadStarted = false;
    const ensureVideoLoad = () => {
      if (videoLoadStarted || video.readyState >= 1) return;
      videoLoadStarted = true;
      video.preload = "auto";
      video.load();
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
            if (p >= SCRUB_START * 0.15) {
              ensureVideoLoad();
            }
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
            loading="lazy"
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
              preload="none"
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
          className={cn(
            "hero-poster hero-poster--layout absolute inset-0 z-10 will-change-transform",
            /* Mobile: centered cinematic stack */
            "overflow-x-hidden overflow-y-auto",
            /* Tablet */
            "md:overflow-hidden md:p-0 md:pt-[5rem] md:pl-6 md:pr-5",
            /* Laptop+ */
            "lg:block lg:overflow-hidden lg:p-0 lg:pt-0",
          )}
        >
          <div className="hero-poster__fog" aria-hidden />
          <div className="hero-poster__rays" aria-hidden />
          <div className="hero-poster__particles" aria-hidden />
          <div className="hero-poster__grain" aria-hidden />
          <div className="hero-poster__vignette" aria-hidden />

          {/* Mobile heading — top center */}
          <p className="hero-poster__eyebrow hero-poster__heading hero-copy__eyebrow order-1 w-full text-center text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--hero-accent-pink)] sm:text-[12px] md:hidden">
            {homeCollage.eyebrow}
          </p>

          {/* Title + counter (desktop groups left column via lg:flex wrapper) */}
          <div
            className={cn(
              "contents",
              "lg:pointer-events-none lg:absolute lg:inset-y-0 lg:left-0 lg:z-20 lg:flex lg:w-[min(38%,30rem)] lg:flex-col lg:justify-center",
            )}
          >
            <div
              ref={heroCopyRef}
              className={cn(
                "hero-poster__copy hero-copy pointer-events-auto relative order-2 flex w-full min-w-0 flex-col items-center will-change-transform",
                "md:order-none md:col-start-1 md:row-start-1 md:items-start md:self-end md:overflow-hidden",
                "lg:ml-10 lg:max-w-full lg:items-start lg:self-auto",
              )}
            >
              <p className="hero-copy__eyebrow mb-2 hidden text-[11px] font-medium uppercase tracking-[0.26em] text-[var(--hero-accent-pink)] md:mb-3 md:block lg:mb-5 lg:text-[13px] lg:tracking-[0.32em]">
                {homeCollage.eyebrow}
              </p>

              <div
                ref={heroTitleRef}
                className="hero-poster__title hero-title-lockup relative flex w-full max-w-[min(100%,17.5rem)] items-stretch justify-center gap-0.5 will-change-transform sm:max-w-[19rem] sm:gap-1 md:max-w-none md:justify-start md:gap-1 lg:gap-2"
              >
                <h1
                  id="collage-brand"
                  className={cn(
                    "hero-title-lockup__words relative z-10 min-w-0 shrink",
                    "font-[family-name:var(--font-family-bebas)] uppercase text-white",
                    "text-[clamp(1.55rem,7.2vw,2.15rem)] leading-[0.82] tracking-[0.02em]",
                    "sm:text-[clamp(1.65rem,6.5vw,2.35rem)]",
                    "md:text-[clamp(1.75rem,3.8vw,2.85rem)]",
                    "lg:text-[clamp(2.05rem,5.5vw,4.75rem)]",
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
                <span className="sr-only"> VI</span>
              </div>
            </div>

            <div
              ref={heroBarRef}
              className={cn(
                "hero-poster__counter pointer-events-auto order-4 w-full min-w-0 will-change-transform",
                "mx-auto max-w-[14rem] sm:max-w-[14.5rem]",
                "md:order-none md:col-start-1 md:row-start-2 md:mx-0 md:max-w-[14rem]",
                "lg:mt-8 lg:max-w-[22rem]",
              )}
            >
              <BannerGameCounter />
            </div>
          </div>

          {/* Collage */}
          <div
            className={cn(
              "hero-poster__art relative z-[5] order-3 mx-auto w-full min-w-0 shrink-0",
              "max-w-[min(100%,19rem)] sm:max-w-[20rem]",
              "md:order-none md:col-start-2 md:row-span-2 md:row-start-1 md:mx-0 md:flex md:h-full md:max-w-none md:items-center md:justify-end",
              "lg:absolute lg:inset-y-0 lg:right-0 lg:col-auto lg:row-auto",
              "lg:flex lg:w-[min(62%,1040px)] lg:items-center lg:justify-end lg:pr-10 lg:pl-4 xl:pr-12",
            )}
          >
            <div
              ref={heroBgRef}
              className="hero-poster__art-motion relative w-full max-w-full will-change-transform"
            >
              <div className="hero-poster__art-glow" aria-hidden />
              <div className="hero-poster__art-plane w-full">
                <Image
                  src={homeCollage.collageSrc}
                  alt="Grand Theft Auto 6 key-art collage"
                  width={1024}
                  height={576}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 56vw, 62vw"
                  className="hero-poster__art-image relative z-[1] block h-auto w-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="sr-only">{legal.shortDisclaimer}</p>
    </section>
  );
}
