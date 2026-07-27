"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  advanceVideoScrubSeek,
  createVideoScrubSeek,
  type VideoScrubSeek,
} from "@/utils/video-scrub-seek";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

export type HeroScrollCinemaProps = {
  id?: string;
  posterSrc: string;
  posterAlt: string;
  videoSrc: string;
  videoWebmSrc?: string;
  /**
   * Total pin runway in viewport heights.
   * First ~60% scrubs the clip; remaining ~40% is the 3D push-through.
   */
  scrubVh?: number;
  ariaLabel?: string;
  className?: string;
  /** Foreground copy / HUD layered above the scrub video */
  children?: ReactNode;
};

/**
 * One pinned cinema beat:
 * 1) Smooth scroll-scrub of the clip (lerped seeks — not every scroll event)
 * 2) 3D flow — plane scales / tilts / pushes as you leave the section
 */
export function HeroScrollCinema({
  id,
  posterSrc,
  posterAlt,
  videoSrc,
  videoWebmSrc,
  scrubVh = 4.2,
  ariaLabel,
  className,
  children,
}: HeroScrollCinemaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const seekRef = useRef<VideoScrubSeek>(createVideoScrubSeek());
  const reducedMotion = usePrefersReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const motionOn = !reducedMotion && !videoFailed;

  // Buffer video; only mark ready when we can scrub without starving
  useEffect(() => {
    if (!motionOn) return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    const arm = () => {
      if (cancelled || !video.duration || Number.isNaN(video.duration)) return;
      seekRef.current.duration = video.duration;
      seekRef.current.ready = true;
      try {
        video.currentTime = 0.001;
      } catch {
        /* ignore */
      }
      setVideoReady(true);
    };

    const onError = () => {
      if (!cancelled) setVideoFailed(true);
    };

    video.addEventListener("canplaythrough", arm, { once: true });
    video.addEventListener("loadeddata", arm, { once: true });
    video.addEventListener("error", onError);
    video.load();

    if (video.readyState >= 3 && video.duration) arm();

    return () => {
      cancelled = true;
      seekRef.current.ready = false;
      video.removeEventListener("canplaythrough", arm);
      video.removeEventListener("loadeddata", arm);
      video.removeEventListener("error", onError);
      video.pause();
    };
  }, [motionOn, videoSrc]);

  // Dedicated RAF seek loop — never stack seeks while video.seeking
  useEffect(() => {
    if (!motionOn || !videoReady) return;
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    const tick = () => {
      advanceVideoScrubSeek(video, seekRef.current, {
        lerp: 0.3,
        snapGap: 0.08,
        snapLerp: 0.7,
        frameDur: 1 / 48,
        busyTimeoutMs: 42,
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [motionOn, videoReady]);

  useLayoutEffect(() => {
    if (!motionOn || !videoReady) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!section || !pin || !stage || !video || !video.duration) return;

    video.pause();
    const duration = video.duration;

    const ctx = gsap.context(() => {
      const proxy = { t: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * scrubVh}`,
          pin,
          scrub: 1.25,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      // Phase A — scrub full clip (~60% of runway)
      tl.to(
        proxy,
        {
          t: duration,
          duration: 0.62,
          onUpdate: () => {
            seekRef.current.target = proxy.t;
          },
        },
        0,
      );

      // Phase B — 3D flow / camera push through the frame (~40%)
      tl.fromTo(
        stage,
        {
          scale: 1,
          rotateX: 0,
          yPercent: 0,
          z: 0,
          borderRadius: 0,
        },
        {
          scale: 1.55,
          rotateX: 14,
          yPercent: -18,
          z: 280,
          borderRadius: 28,
          duration: 0.38,
          ease: "power1.in",
        },
        0.62,
      );

      // Soft exit veil so the next section arrives cleanly
      tl.to(
        pin,
        {
          opacity: 0.15,
          duration: 0.18,
          ease: "power1.in",
        },
        0.82,
      );
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [motionOn, videoReady, scrubVh, videoSrc]);

  const sectionStyle = motionOn
    ? ({ height: `${(1 + scrubVh) * 100}vh` } as const)
    : undefined;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("relative isolate bg-ink-950", className)}
      style={sectionStyle}
      aria-label={ariaLabel}
    >
      <div
        ref={pinRef}
        className="hero-cinema-pin relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-ink-950"
      >
        <div className="hero-cinema-perspective absolute inset-0 flex items-center justify-center">
          <div
            ref={stageRef}
            className="hero-cinema-stage relative h-full w-full overflow-hidden will-change-transform"
          >
            <div
              className="absolute inset-0"
              role="img"
              aria-label={posterAlt}
            >
              <Image
                src={posterSrc}
                alt=""
                fill
                sizes="100vw"
                className={cn(
                  "object-cover transition-opacity duration-500",
                  motionOn && videoReady ? "opacity-0" : "opacity-100",
                )}
              />

              {motionOn ? (
                <video
                  ref={videoRef}
                  className={cn(
                    "absolute inset-0 size-full object-cover transition-opacity duration-500",
                    videoReady ? "opacity-100" : "opacity-0",
                  )}
                  poster={posterSrc}
                  muted
                  playsInline
                  preload="auto"
                  tabIndex={-1}
                  aria-hidden
                >
                  {videoWebmSrc ? (
                    <source src={videoWebmSrc} type="video/webm" />
                  ) : null}
                  <source src={videoSrc} type="video/mp4" />
                </video>
              ) : null}
            </div>
          </div>
        </div>

        {children ? (
          <div className="absolute inset-0 z-10 flex flex-col">{children}</div>
        ) : null}
      </div>
    </section>
  );
}
