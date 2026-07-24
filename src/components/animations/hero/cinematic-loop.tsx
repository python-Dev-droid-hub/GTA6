"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export type CinematicLoopProps = {
  videoSrc: string;
  posterSrc: string;
  posterAlt: string;
  className?: string;
  /** Optional overlay copy */
  children?: React.ReactNode;
  aspectClassName?: string;
};

/**
 * Muted in-view loop — Only-in-Leonida style atmosphere plate.
 * Pauses offscreen; never autoplays with sound.
 */
export function CinematicLoop({
  videoSrc,
  posterSrc,
  posterAlt,
  className,
  children,
  aspectClassName = "min-h-[70dvh] md:min-h-[85dvh]",
}: CinematicLoopProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView({ rootMargin: "120px", triggerOnce: false });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    if (inView) {
      video.defaultMuted = true;
      video.muted = true;
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [inView, reduced]);

  return (
    <section
      ref={ref}
      className={cn(
        "relative isolate overflow-hidden bg-ink-950",
        aspectClassName,
        className,
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={posterSrc}
          alt={posterAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        {!reduced ? (
          <video
            ref={videoRef}
            className="absolute inset-0 size-full object-cover"
            poster={posterSrc}
            muted
            playsInline
            loop
            preload="metadata"
            tabIndex={-1}
            aria-hidden
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/40"
          aria-hidden
        />
      </div>
      {children ? (
        <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end p-6 md:p-12 lg:p-16">
          {children}
        </div>
      ) : null}
    </section>
  );
}
