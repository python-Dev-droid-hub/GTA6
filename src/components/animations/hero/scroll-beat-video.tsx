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

export type ScrollBeatVideoProps = {
  videoSrc: string;
  posterSrc: string;
  posterAlt: string;
  sectionHeight?: string;
  className?: string;
  id?: string;
  startOffset?: number;
  priorityPoster?: boolean;
  endEyebrow?: string;
  endTitle?: string;
  endTitleFrom?: number;
  /** Punchier grade + neon glow (Leonida character clips). */
  vivid?: boolean;
};

/**
 * Full-bleed clip scrubbed by scroll (pinned).
 * Seeks only while the pin is active — keeps other clips idle for speed.
 */
export function ScrollBeatVideo({
  videoSrc,
  posterSrc,
  posterAlt,
  sectionHeight = "120vh",
  className,
  id,
  startOffset = 0,
  priorityPoster = false,
  endEyebrow,
  endTitle,
  endTitleFrom = 0.62,
  vivid = false,
}: ScrollBeatVideoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const endTitleRef = useRef<HTMLDivElement>(null);
  const seekRef = useRef(createVideoScrubSeek());
  const activeRef = useRef(false);
  const reduced = usePrefersReducedMotion();
  const showEndTitle = Boolean(endTitle);

  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const pin = pinRef.current;
    const video = videoRef.current;
    if (!section || !pin || !video) return;

    const offset = Math.max(0, startOffset);
    prepareScrubVideo(video, "auto");
    seekRef.current = createVideoScrubSeek();
    activeRef.current = false;

    const tick = () => {
      if (!activeRef.current || !seekRef.current.ready) return;
      advanceVideoScrubSeek(video, seekRef.current, CHARACTER_VIDEO_SCRUB.seek);
    };
    gsap.ticker.add(tick);

    const arm = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const start = Math.min(offset, Math.max(video.duration - 0.05, 0));
      seekRef.current.duration = video.duration;
      seekRef.current.current = start;
      seekRef.current.target = start;
      seekRef.current.ready = true;
      try {
        video.currentTime = start;
      } catch {
        /* ignore */
      }
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    if (video.readyState >= 1) arm();
    video.addEventListener("loadedmetadata", arm);
    video.addEventListener("loadeddata", arm);

    const ctx = gsap.context(() => {
      const proxy = { t: 0 };
      const titleEl = endTitleRef.current;
      if (titleEl) gsap.set(titleEl, { opacity: 0, y: 28 });

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
          onToggle: (self) => {
            activeRef.current = self.isActive;
          },
          onUpdate: () => {
            activeRef.current = true;
            const dur = seekRef.current.duration;
            if (dur <= 0) return;
            const start = Math.min(offset, Math.max(dur - 0.05, 0));
            const span = Math.max(dur - start, 0.05);
            seekRef.current.target = start + proxy.t * span;

            if (titleEl) {
              const local = Math.min(
                Math.max((proxy.t - endTitleFrom) / (1 - endTitleFrom), 0),
                1,
              );
              gsap.set(titleEl, {
                opacity: local,
                y: 28 * (1 - local),
              });
            }
          },
          onLeave: () => {
            activeRef.current = false;
          },
          onLeaveBack: () => {
            activeRef.current = false;
          },
        },
      });
    }, section);

    return () => {
      gsap.ticker.remove(tick);
      video.removeEventListener("loadedmetadata", arm);
      video.removeEventListener("loadeddata", arm);
      video.pause();
      ctx.revert();
    };
  }, [reduced, videoSrc, startOffset, endTitleFrom, showEndTitle]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("relative isolate bg-ink-950", className)}
      style={reduced ? undefined : { height: sectionHeight }}
      aria-label={posterAlt}
    >
      <div
        ref={pinRef}
        className="relative z-[1] h-dvh min-h-dvh w-full overflow-hidden bg-ink-950"
      >
        <div className="absolute inset-0">
          <Image
            src={posterSrc}
            alt={posterAlt}
            fill
            sizes="100vw"
            className={cn(
              "object-cover",
              vivid && "contrast-[1.06] saturate-[1.2]",
            )}
            priority={priorityPoster}
            loading={priorityPoster ? undefined : "lazy"}
            unoptimized
          />
          {!reduced ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full min-h-full min-w-full object-cover"
              poster={posterSrc}
              muted
              playsInline
              preload="none"
              tabIndex={-1}
              aria-hidden
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : null}
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
                ? "from-ink-950/45 via-transparent to-ink-950/10"
                : "from-ink-950/80 via-transparent to-ink-950/25",
            )}
            aria-hidden
          />
        </div>

        {endTitle ? (
          <div
            ref={endTitleRef}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-5 pb-14 sm:px-8 sm:pb-16 md:px-12 lg:px-16 lg:pb-20"
            style={reduced ? undefined : { opacity: 0 }}
          >
            {endEyebrow ? (
              <p className="font-[family-name:var(--font-family-orbitron)] text-[10px] uppercase tracking-[0.4em] text-white/55 sm:text-[11px]">
                {endEyebrow}
              </p>
            ) : null}
            <h1
              className={cn(
                "mt-3 max-w-4xl font-[family-name:var(--font-family-bebas)] uppercase",
                "text-[clamp(2.35rem,11vw,7.5rem)] leading-[0.88] tracking-[0.02em] break-words",
                "text-[#f3ead2]",
                "drop-shadow-[0_8px_28px_rgba(0,0,0,0.65)]",
              )}
            >
              {endTitle}
            </h1>
          </div>
        ) : null}
      </div>
    </section>
  );
}
