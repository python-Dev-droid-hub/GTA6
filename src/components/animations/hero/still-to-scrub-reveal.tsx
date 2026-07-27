"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  CHARACTER_VIDEO_SCRUB,
  prepareScrubVideo,
} from "@/utils/character-video-scrub";
import {
  advanceVideoScrubSeek,
  createVideoScrubSeek,
} from "@/utils/video-scrub-seek";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

const HANDOFF = 0.18;

export type StillToScrubRevealProps = {
  stillSrc: string;
  stillAlt: string;
  videoSrc: string;
  posterSrc: string;
  posterAlt: string;
  sectionHeight?: string;
  startOffset?: number;
  className?: string;
  id?: string;
  endEyebrow?: string;
  endTitle?: string;
  endTitleFrom?: number;
  vivid?: boolean;
};

/**
 * Still crossfades into pinned scroll-scrub video.
 * Scrub maps both directions (down + up); pin releases cleanly on leave.
 */
export function StillToScrubReveal({
  stillSrc,
  stillAlt,
  videoSrc,
  posterSrc,
  posterAlt,
  sectionHeight = "240vh",
  startOffset = 0,
  className,
  id,
  endEyebrow,
  endTitle,
  endTitleFrom = 0.55,
  vivid = false,
}: StillToScrubRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stillLayerRef = useRef<HTMLDivElement>(null);
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const endTitleRef = useRef<HTMLDivElement>(null);
  const seekRef = useRef(createVideoScrubSeek());
  const activeRef = useRef(false);
  const armedRef = useRef(false);
  const reduced = usePrefersReducedMotion();
  const showEndTitle = Boolean(endTitle);

  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const pin = pinRef.current;
    const stillLayer = stillLayerRef.current;
    const videoLayer = videoLayerRef.current;
    const video = videoRef.current;
    if (!section || !pin || !stillLayer || !videoLayer || !video) return;

    const offset = Math.max(0, startOffset);
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const titleEl = endTitleRef.current;
    let trigger: ScrollTrigger | null = null;
    let videoLoadStarted = false;

    prepareScrubVideo(video, "none");
    seekRef.current = createVideoScrubSeek();
    activeRef.current = false;
    armedRef.current = false;
    if (titleEl) gsap.set(titleEl, { opacity: 0, y: 28 });

    const scrubStart = (dur: number) =>
      Math.min(offset, Math.max(dur - 0.05, 0));
    const scrubEnd = (dur: number) =>
      Math.max(dur - CHARACTER_VIDEO_SCRUB.seek.frameDur * 0.35, 0);

    const applyVisual = (p: number) => {
      const handoff = Math.min(Math.max(p / HANDOFF, 0), 1);
      gsap.set(stillLayer, {
        opacity: 1 - handoff,
        scale: 1 + handoff * (isMobile ? 0.03 : 0.05),
      });
      gsap.set(videoLayer, {
        opacity: handoff,
        scale: (isMobile ? 1.03 : 1.05) - handoff * (isMobile ? 0.03 : 0.05),
      });

      if (titleEl) {
        if (p <= HANDOFF) {
          gsap.set(titleEl, { opacity: 0, y: 28 });
        } else {
          const local = (p - HANDOFF) / (1 - HANDOFF);
          const titleLocal = Math.min(
            Math.max((local - endTitleFrom) / (1 - endTitleFrom), 0),
            1,
          );
          gsap.set(titleEl, {
            opacity: titleLocal,
            y: 28 * (1 - titleLocal),
          });
        }
      }
    };

    const applySeekTarget = (p: number) => {
      const dur = seekRef.current.duration;
      if (dur <= 0) return;
      const start = scrubStart(dur);
      const end = scrubEnd(dur);
      const span = Math.max(end - start, 0.05);

      if (p <= HANDOFF) {
        seekRef.current.target = start;
        return;
      }

      const local = (p - HANDOFF) / (1 - HANDOFF);
      seekRef.current.target =
        start + Math.min(Math.max(local, 0), 1) * span;
    };

    const snapTo = (time: number) => {
      const dur = seekRef.current.duration;
      if (dur <= 0) return;
      const clamped = Math.min(Math.max(time, 0), scrubEnd(dur));
      seekRef.current.target = clamped;
      seekRef.current.current = clamped;
      seekRef.current.busy = false;
      try {
        video.currentTime = clamped;
      } catch {
        /* ignore */
      }
    };

    const arm = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const start = scrubStart(video.duration);
      const wasArmed = armedRef.current;
      seekRef.current.duration = video.duration;
      seekRef.current.ready = true;
      seekRef.current.busy = false;
      armedRef.current = true;

      // Late load mid-scroll: sync to current pin progress (production CDN lag)
      const progress = trigger?.progress ?? 0;
      if (!wasArmed && progress <= 0.001) {
        seekRef.current.current = start;
        seekRef.current.target = start;
        try {
          video.currentTime = start;
        } catch {
          /* ignore */
        }
      } else {
        applySeekTarget(progress);
        applyVisual(progress);
        seekRef.current.current = seekRef.current.target;
        try {
          video.currentTime = seekRef.current.target;
        } catch {
          /* ignore */
        }
      }

      if (!wasArmed) {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    };

    const ensureVideoLoad = () => {
      if (videoLoadStarted || video.readyState >= 1) {
        if (video.readyState >= 1) arm();
        return;
      }
      videoLoadStarted = true;
      video.preload = "auto";
      try {
        video.load();
      } catch {
        /* ignore */
      }
    };

    if (video.readyState >= 1) arm();
    video.addEventListener("loadedmetadata", arm);
    video.addEventListener("loadeddata", arm);

    // Prefetch before pin so start frame is ready in production
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) ensureVideoLoad();
      },
      { rootMargin: "120% 0px 120% 0px", threshold: 0 },
    );
    io.observe(section);

    const tick = () => {
      if (!activeRef.current || !seekRef.current.ready) return;
      advanceVideoScrubSeek(video, seekRef.current, CHARACTER_VIDEO_SCRUB.seek);
    };
    gsap.ticker.add(tick);

    const ctx = gsap.context(() => {
      gsap.set(stillLayer, { opacity: 1, scale: 1 });
      gsap.set(videoLayer, { opacity: 0, scale: isMobile ? 1.03 : 1.05 });

      const proxy = { t: 0 };

      gsap.to(proxy, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin,
          pinSpacing: true,
          scrub: CHARACTER_VIDEO_SCRUB.scrollScrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          // fixed = true viewport lock (transform felt like the clip scrolled away)
          pinType: "fixed",
          onRefresh: (self) => {
            trigger = self;
          },
          onToggle: (self) => {
            trigger = self;
            activeRef.current = self.isActive;
            if (!self.isActive) {
              seekRef.current.busy = false;
            }
          },
          onUpdate: (self) => {
            trigger = self;
            activeRef.current = true;
            const p = self.progress;
            if (p >= HANDOFF * 0.25) ensureVideoLoad();
            applyVisual(p);
            applySeekTarget(p);
          },
          onEnter: () => {
            ensureVideoLoad();
            activeRef.current = true;
            seekRef.current.busy = false;
            applySeekTarget(0);
            snapTo(scrubStart(seekRef.current.duration || 0));
            applyVisual(0);
          },
          onEnterBack: () => {
            ensureVideoLoad();
            activeRef.current = true;
            seekRef.current.busy = false;
            const dur = seekRef.current.duration;
            if (dur > 0) snapTo(scrubEnd(dur));
            applyVisual(1);
          },
          onLeave: () => {
            activeRef.current = false;
            seekRef.current.busy = false;
            const dur = seekRef.current.duration;
            if (dur > 0) snapTo(scrubEnd(dur));
            applyVisual(1);
          },
          onLeaveBack: () => {
            activeRef.current = false;
            seekRef.current.busy = false;
            applyVisual(0);
            snapTo(scrubStart(seekRef.current.duration || 0));
          },
        },
      });
    }, section);

    return () => {
      io.disconnect();
      gsap.ticker.remove(tick);
      video.removeEventListener("loadedmetadata", arm);
      video.removeEventListener("loadeddata", arm);
      video.pause();
      ctx.revert();
    };
  }, [reduced, videoSrc, startOffset, stillSrc, endTitleFrom, showEndTitle]);

  if (reduced) {
    return (
      <section
        id={id}
        className={cn("relative isolate bg-[#07060f]", className)}
        aria-label={posterAlt}
      >
        <div className="relative min-h-dvh w-full overflow-hidden">
          <Image
            src={posterSrc}
            alt={posterAlt}
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover"
            unoptimized
          />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("relative isolate bg-[#07060f]", className)}
      style={{ height: sectionHeight }}
      aria-label={posterAlt}
    >
      <div
        ref={pinRef}
        className="relative z-[1] h-dvh w-full overflow-hidden bg-[#07060f]"
      >
        <div
          ref={videoLayerRef}
          className="absolute inset-0 z-[1]"
          style={{ opacity: 0 }}
        >
          <Image
            src={posterSrc}
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className={cn(
              "object-cover object-[center_22%]",
              vivid && "contrast-[1.06] saturate-[1.2]",
            )}
            unoptimized
          />
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full min-h-full min-w-full object-cover object-[center_22%]"
            poster={posterSrc}
            muted
            playsInline
            preload="none"
            tabIndex={-1}
            aria-hidden
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {vivid ? (
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,100,180,0.18)_0%,transparent_62%)] mix-blend-screen"
              aria-hidden
            />
          ) : null}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-t",
              vivid
                ? "from-[#07060f]/40 via-transparent to-[#07060f]/10"
                : "from-[#07060f]/70 via-transparent to-[#07060f]/15",
            )}
            aria-hidden
          />
        </div>

        <div ref={stillLayerRef} className="absolute inset-0 z-[2]">
          <Image
            src={stillSrc}
            alt={stillAlt}
            fill
            loading="lazy"
            sizes="100vw"
            className={cn(
              "object-cover",
              vivid && "contrast-[1.06] saturate-[1.15]",
            )}
            unoptimized
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-t",
              vivid
                ? "from-[#07060f]/35 via-transparent to-[#07060f]/12"
                : "from-[#07060f]/50 via-transparent to-[#07060f]/20",
            )}
            aria-hidden
          />
        </div>

        {endTitle ? (
          <div
            ref={endTitleRef}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-5 pb-14 sm:px-8 sm:pb-16 md:px-12 lg:px-16 lg:pb-20"
            style={{ opacity: 0 }}
          >
            {endEyebrow ? (
              <p className="font-[family-name:var(--font-family-orbitron)] text-[10px] uppercase tracking-[0.4em] text-white/55 sm:text-[11px]">
                {endEyebrow}
              </p>
            ) : null}
            <h2
              className={cn(
                "mt-3 max-w-4xl font-[family-name:var(--font-family-bebas)] uppercase",
                "text-[clamp(1.55rem,6.5vw,4.25rem)] leading-[0.95] tracking-[0.03em] break-words max-md:tracking-[0.02em]",
                "text-[#f3ead2]",
                "drop-shadow-[0_8px_28px_rgba(0,0,0,0.65)]",
              )}
            >
              {endTitle}
            </h2>
          </div>
        ) : null}
      </div>
    </section>
  );
}
