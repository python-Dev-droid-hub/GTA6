"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, RotateCcw } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/utils/cn";

export type CharacterClipPlayerProps = {
  videoSrc: string;
  posterImage: string;
  name: string;
  className?: string;
};

/**
 * Click-to-play character clip — not scroll-scrubbed.
 * Poster → video → Rewatch when ended.
 */
export function CharacterClipPlayer({
  videoSrc,
  posterImage,
  name,
  className,
}: CharacterClipPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play().catch(() => setPlaying(false));
  }, [playing]);

  const start = () => {
    setEnded(false);
    setPlaying(true);
  };

  const onEnded = () => {
    setPlaying(false);
    setEnded(true);
  };

  return (
    <div
      className={cn(
        "relative aspect-video w-full max-w-md overflow-hidden rounded-xl border border-white/15 bg-ink-950",
        className,
      )}
    >
      {!playing ? (
        <>
          <Image
            src={posterImage}
            alt={`${name} clip poster`}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 28rem"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink-950/35" />
          <button
            type="button"
            onClick={start}
            className={cn(
              "absolute inset-0 z-10 flex flex-col items-center justify-center gap-3",
              "font-display text-sm uppercase tracking-[0.2em] text-paper",
              "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
            )}
          >
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-[#f7b6c8] text-ink-950 shadow-[0_0_28px_rgba(247,182,200,0.35)] transition-cinema hover:scale-105">
              <Icon icon={ended ? RotateCcw : Play} size={22} />
            </span>
            <span>{ended ? "Rewatch" : "Watch Clip"}</span>
          </button>
        </>
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          src={videoSrc}
          playsInline
          controls
          onEnded={onEnded}
        />
      )}
    </div>
  );
}
