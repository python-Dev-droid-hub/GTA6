"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CinemaPosterCard } from "@/components/sections/home/cinema-poster-card";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  advanceVideoScrubSeek,
  createVideoScrubSeek,
} from "@/utils/video-scrub-seek";
import { cn } from "@/utils/cn";
import type { CinemaPosterCardProps } from "@/components/sections/home/cinema-poster-card";

gsap.registerPlugin(ScrollTrigger);

export type CinemaVideoPosterBeatProps = {
  id?: string;
  className?: string;
  posterClassName?: string;
  videoHeight?: string;
  videoSrc: string;
  videoPosterSrc: string;
  videoPosterAlt: string;
  videoFit?: "contain" | "cover";
  enterPop?: boolean;
  poster?: CinemaPosterCardProps;
  scrubEase?: number;
  scrubSeek?: {
    lerp?: number;
    snapGap?: number;
    snapLerp?: number;
    frameDur?: number;
    busyTimeoutMs?: number;
  };
};

/**
 * Scrub video, then CTA poster pulls up over the video end.
 */
export function CinemaVideoPosterBeat({
  id,
  className,
  posterClassName,
  videoHeight = "170vh",
  videoSrc,
  videoPosterSrc,
  videoPosterAlt,
  videoFit = "cover",
  enterPop = false,
  poster,
  scrubEase = 0.32,
  scrubSeek,
}: CinemaVideoPosterBeatProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stillRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const posterSectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const seekRef = useRef(createVideoScrubSeek());
  const activeRef = useRef(false);
  const reduced = usePrefersReducedMotion();
  const [frameReady, setFrameReady] = useState(false);
  const scrubSeekKey = scrubSeek
    ? [
        scrubSeek.lerp,
        scrubSeek.snapGap,
        scrubSeek.snapLerp,
        scrubSeek.frameDur,
        scrubSeek.busyTimeoutMs,
      ].join("|")
    : "default";

  useLayoutEffect(() => {
    if (reduced) return;
    const section = videoSectionRef.current;
    const pin = pinRef.current;
    const video = videoRef.current;
    if (!section || !pin || !video) return;

    setFrameReady(false);
    video.pause();
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    seekRef.current = createVideoScrubSeek();
    activeRef.current = false;

    const revealVideo = () => {
      setFrameReady(true);
      if (stillRef.current) {
        gsap.set(stillRef.current, { opacity: 0 });
      }
    };

    const onSeeked = () => {
      seekRef.current.busy = false;
      if (video.readyState >= 2) revealVideo();
    };
    video.addEventListener("seeked", onSeeked);

    const tick = () => {
      if (!activeRef.current || !seekRef.current.ready) return;
      advanceVideoScrubSeek(video, seekRef.current, {
        lerp: scrubSeek?.lerp ?? 0.3,
        snapGap: scrubSeek?.snapGap ?? 0.08,
        snapLerp: scrubSeek?.snapLerp ?? 0.7,
        frameDur: scrubSeek?.frameDur ?? 1 / 48,
        busyTimeoutMs: scrubSeek?.busyTimeoutMs ?? 42,
      });
    };
    gsap.ticker.add(tick);

    const arm = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      seekRef.current.duration = video.duration;
      seekRef.current.ready = true;
      try {
        if (video.currentTime < 0.01) video.currentTime = 0.001;
      } catch {
        /* ignore */
      }
      if (video.readyState >= 2) revealVideo();
    };

    const onLoadedData = () => {
      arm();
      revealVideo();
    };

    video.addEventListener("loadedmetadata", arm);
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("canplay", revealVideo, { once: true });

    // Load once — do not reload on scroll enter
    if (video.readyState < 1) {
      try {
        video.load();
      } catch {
        /* ignore */
      }
    } else {
      arm();
    }

    const ctx = gsap.context(() => {
      const proxy = { t: 0 };
      gsap.to(proxy, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin,
          scrub: scrubEase,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onToggle: (self) => {
            activeRef.current = self.isActive;
          },
          onUpdate: (self) => {
            activeRef.current = true;
            const dur = seekRef.current.duration || video.duration || 0;
            if (dur > 0) {
              seekRef.current.duration = dur;
              seekRef.current.ready = true;
              seekRef.current.target = self.progress * dur;
            }
          },
        },
      });
    }, section);

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      gsap.ticker.remove(tick);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadedmetadata", arm);
      video.removeEventListener("loadeddata", onLoadedData);
      ctx.revert();
    };
  }, [reduced, videoSrc, scrubEase, scrubSeekKey]);

  useLayoutEffect(() => {
    if (reduced || !enterPop) return;
    const root = rootRef.current;
    const frame = frameRef.current;
    if (!root || !frame) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        { scale: 1.04, opacity: 0.92 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 90%",
            end: "top top",
            scrub: 0.32,
            invalidateOnRefresh: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [reduced, enterPop, videoSrc]);

  useLayoutEffect(() => {
    if (reduced || !poster) return;
    const posterSection = posterSectionRef.current;
    const card = cardRef.current;
    if (!posterSection || !card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0.55, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: posterSection,
            start: "top 88%",
            end: "top 42%",
            scrub: 0.38,
          },
        },
      );
    }, posterSection);

    return () => ctx.revert();
  }, [reduced, !!poster ? 1 : 0]);

  return (
    <div ref={rootRef} className={cn("relative z-[12] bg-ink-950", className)}>
      <section
        ref={videoSectionRef}
        id={poster ? `${id}-video` : id}
        className="relative isolate z-10 bg-ink-950"
        style={reduced ? undefined : { height: videoHeight }}
        aria-label={videoPosterAlt}
      >
        <div
          ref={pinRef}
          className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-ink-950"
        >
          <div
            ref={frameRef}
            className="absolute inset-0 origin-center overflow-hidden will-change-transform"
          >
            <div
              ref={stillRef}
              className="absolute inset-0 z-[1]"
              aria-hidden={frameReady}
            >
              <Image
                src={videoPosterSrc}
                alt={videoPosterAlt}
                fill
                priority={id === "beat-vintage"}
                loading={id === "beat-vintage" ? undefined : "lazy"}
                quality={90}
                sizes="100vw"
                className={cn(
                  videoFit === "contain"
                    ? "object-contain object-center"
                    : "object-cover object-center",
                )}
              />
            </div>
            {!reduced ? (
              <video
                ref={videoRef}
                className={cn(
                  "absolute inset-0 z-[2] size-full",
                  videoFit === "contain"
                    ? "object-contain object-center"
                    : "object-cover object-center",
                  frameReady ? "opacity-100" : "opacity-0",
                )}
                muted
                playsInline
                preload="none"
                disablePictureInPicture
                tabIndex={-1}
                aria-hidden
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : null}
          </div>
        </div>
      </section>

      {poster ? (
        <section
          ref={posterSectionRef}
          id={id ? `${id}-poster` : undefined}
          className={cn(
            "relative z-40",
            "-mt-[32dvh] md:-mt-[34dvh]",
            "bg-transparent pb-16 pt-0 md:pb-24",
            posterClassName,
          )}
          aria-label={poster.title}
        >
          <div ref={cardRef} className="w-full will-change-transform">
            <CinemaPosterCard {...poster} prominent />
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-ink-950"
            aria-hidden
          />
        </section>
      ) : null}
    </div>
  );
}
