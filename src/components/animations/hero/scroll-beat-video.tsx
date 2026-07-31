"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  CHARACTER_VIDEO_SCRUB,
  clampClipStartOffset,
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
  /** `hero` = character name lockup; `quote` = multi-line quote overlay */
  endTitleVariant?: "hero" | "quote";
  vivid?: boolean;
};

/**
 * Full-bleed clip scrubbed by scroll (pinned).
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
  endTitleVariant = "hero",
  vivid = false,
}: ScrollBeatVideoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const endTitleRef = useRef<HTMLDivElement>(null);
  const seekRef = useRef(createVideoScrubSeek());
  const activeRef = useRef(false);
  const armedRef = useRef(false);
  const reduced = usePrefersReducedMotion();
  const showEndTitle = Boolean(endTitle);
  const [frameReady, setFrameReady] = useState(false);

  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const pin = pinRef.current;
    const video = videoRef.current;
    if (!section || !pin || !video) return;

    let videoLoadStarted = false;
    let progress = 0;
    let resolvedOffset = Math.max(0, startOffset);

    prepareScrubVideo(video, "none");
    seekRef.current = createVideoScrubSeek();
    activeRef.current = false;
    armedRef.current = false;
    setFrameReady(false);

    const scrubStart = (dur: number) =>
      Math.min(resolvedOffset, Math.max(dur - 0.05, 0));
    const scrubEnd = (dur: number) =>
      Math.max(dur - CHARACTER_VIDEO_SCRUB.seek.frameDur * 0.35, 0);

    const applySeekFromProgress = (p: number) => {
      const dur = seekRef.current.duration;
      if (dur <= 0) return;
      const start = scrubStart(dur);
      const end = scrubEnd(dur);
      seekRef.current.target = start + p * Math.max(end - start, 0.05);
    };

    const markReady = () => {
      if (video.readyState >= 2) setFrameReady(true);
    };

    const arm = () => {
      if (armedRef.current) return;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      armedRef.current = true;
      resolvedOffset = clampClipStartOffset(startOffset, video.duration);
      seekRef.current.duration = video.duration;
      seekRef.current.ready = true;
      seekRef.current.busy = false;
      applySeekFromProgress(progress);
      seekRef.current.current = seekRef.current.target;
      try {
        video.currentTime = seekRef.current.target;
      } catch {
        /* ignore */
      }
      markReady();
    };

    const ensureVideoLoad = () => {
      if (armedRef.current || video.readyState >= 1) {
        arm();
        return;
      }
      if (videoLoadStarted) return;
      videoLoadStarted = true;
      video.preload = "auto";
      try {
        video.load();
      } catch {
        /* ignore */
      }
    };

    const onSeeked = () => {
      seekRef.current.busy = false;
      markReady();
    };

    video.addEventListener("loadedmetadata", arm);
    video.addEventListener("loadeddata", arm);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("canplay", markReady);
    if (video.readyState >= 1) arm();

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) ensureVideoLoad();
      },
      { rootMargin: "120% 0px 120% 0px" },
    );
    io.observe(section);

    const tick = () => {
      if (!activeRef.current || !seekRef.current.ready) return;
      advanceVideoScrubSeek(video, seekRef.current, CHARACTER_VIDEO_SCRUB.seek);
    };
    gsap.ticker.add(tick);

    const ctx = gsap.context(() => {
      const titleEl = endTitleRef.current;
      if (titleEl) gsap.set(titleEl, { opacity: 0, y: 28 });

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
          onToggle: (self) => {
            activeRef.current = self.isActive;
          },
          onEnter: () => {
            ensureVideoLoad();
            activeRef.current = true;
          },
          onEnterBack: () => {
            ensureVideoLoad();
            activeRef.current = true;
          },
          onUpdate: (self) => {
            activeRef.current = true;
            progress = self.progress;
            ensureVideoLoad();
            applySeekFromProgress(progress);

            if (titleEl) {
              const local = Math.min(
                Math.max((progress - endTitleFrom) / (1 - endTitleFrom), 0),
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
            const dur = seekRef.current.duration;
            if (dur > 0) {
              const end = scrubEnd(dur);
              seekRef.current.target = end;
              seekRef.current.current = end;
              try {
                video.currentTime = end;
              } catch {
                /* ignore */
              }
            }
          },
          onLeaveBack: () => {
            activeRef.current = false;
            const dur = seekRef.current.duration;
            if (dur > 0) {
              const start = scrubStart(dur);
              seekRef.current.target = start;
              seekRef.current.current = start;
              try {
                video.currentTime = start;
              } catch {
                /* ignore */
              }
            }
          },
        },
      });
    }, section);

    return () => {
      io.disconnect();
      gsap.ticker.remove(tick);
      video.removeEventListener("loadedmetadata", arm);
      video.removeEventListener("loadeddata", arm);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("canplay", markReady);
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
              "object-cover object-top",
              vivid && "contrast-[1.06] saturate-[1.2]",
            )}
            priority={priorityPoster}
            loading={priorityPoster ? undefined : "lazy"}
            unoptimized
          />
          {!reduced ? (
            <video
              ref={videoRef}
              className={cn(
                "absolute inset-0 size-full object-cover object-top transition-opacity duration-300",
                frameReady ? "opacity-100" : "opacity-0",
              )}
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
                "mt-3 font-[family-name:var(--font-family-bebas)] uppercase",
                "break-words text-[#f3ead2]",
                "drop-shadow-[0_8px_28px_rgba(0,0,0,0.65)]",
                endTitleVariant === "quote"
                  ? "max-w-3xl text-[clamp(1.15rem,2.6vw,1.85rem)] leading-[1.12] tracking-[0.04em]"
                  : "max-w-4xl text-[clamp(2.25rem,8vw,5.5rem)] leading-[0.9] tracking-[0.02em]",
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
