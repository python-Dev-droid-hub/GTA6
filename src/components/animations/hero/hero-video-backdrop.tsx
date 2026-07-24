"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export type HeroVideoBackdropProps = {
  posterSrc: string;
  posterAlt: string;
  videoSrc?: string;
  videoWebmSrc?: string;
};

/**
 * Poster is LCP. Video plays only when allowed; Ken Burns runs on poster only
 * (not while video is visible) to cut GPU cost.
 */
export function HeroVideoBackdrop({
  posterSrc,
  posterAlt,
  videoSrc,
  videoWebmSrc,
}: HeroVideoBackdropProps) {
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterStageRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const showVideo =
    Boolean(videoSrc) && !reducedMotion && !videoFailed && videoReady;

  useEffect(() => {
    if (reducedMotion || !videoSrc || videoFailed) return;

    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const tryPlay = async () => {
      try {
        video.defaultMuted = true;
        video.muted = true;
        await video.play();
        if (!cancelled) setVideoReady(true);
      } catch {
        if (!cancelled) setVideoFailed(true);
      }
    };

    if (video.readyState >= 2) {
      void tryPlay();
    } else {
      const onCanPlay = () => void tryPlay();
      video.addEventListener("canplay", onCanPlay, { once: true });
      video.load();
      return () => {
        cancelled = true;
        video.removeEventListener("canplay", onCanPlay);
        video.pause();
      };
    }

    return () => {
      cancelled = true;
      video.pause();
    };
  }, [reducedMotion, videoSrc, videoFailed]);

  useEffect(() => {
    const stage = posterStageRef.current;
    if (!stage || reducedMotion || showVideo) {
      if (stage) gsap.set(stage, { clearProps: "transform" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stage,
        { scale: 1.06 },
        {
          scale: 1,
          duration: 14,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        },
      );
    }, stage);

    return () => ctx.revert();
  }, [reducedMotion, showVideo]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      role="img"
      aria-label={posterAlt}
    >
      <div
        ref={posterStageRef}
        className="hero-media-kenburns absolute inset-0"
      >
        <Image
          src={posterSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className={cn(
            "object-cover transition-opacity duration-700",
            showVideo ? "opacity-0" : "opacity-100",
          )}
        />
      </div>

      {videoSrc && !reducedMotion && !videoFailed ? (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-700",
            showVideo ? "opacity-100" : "opacity-0",
          )}
          poster={posterSrc}
          muted
          playsInline
          loop
          preload="none"
          tabIndex={-1}
          onError={() => setVideoFailed(true)}
        >
          {videoWebmSrc ? (
            <source src={videoWebmSrc} type="video/webm" />
          ) : null}
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
