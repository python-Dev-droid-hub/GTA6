"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CinemaPosterCard } from "@/components/sections/home/cinema-poster-card";
import { TrailerModal } from "@/components/ui/trailer-facade";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";
import type { CinemaPosterCardProps } from "@/components/sections/home/cinema-poster-card";

gsap.registerPlugin(ScrollTrigger);

export type CinemaPosterPlayClip = {
  title: string;
  youtubeId?: string;
  videoSrc?: string;
  startSeconds?: number;
  endSeconds?: number;
};

export type CinemaPosterSectionProps = CinemaPosterCardProps & {
  id?: string;
  className?: string;
  /**
   * Pull up over the previous video like CinemaVideoPosterBeat posters
   * (~1/3 of viewport overlaps the video end).
   */
  pullUpOverVideo?: boolean;
  /** @deprecated use pullUpOverVideo */
  overlapFromTop?: number;
  /** When set, CTA opens this clipped trailer instead of navigating */
  playClip?: CinemaPosterPlayClip;
};

/**
 * Dark runway + rounded poster card with scroll fade/slide.
 */
export function CinemaPosterSection({
  id,
  className,
  overlapFromTop,
  pullUpOverVideo,
  playClip,
  onCtaClick,
  ...card
}: CinemaPosterSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const pullUp = Boolean(pullUpOverVideo || (overlapFromTop ?? 0) > 0);
  const pullUpRef = useRef(pullUp);
  pullUpRef.current = pullUp;
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const openClip = useCallback(() => setOpen(true), []);

  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const cardEl = cardRef.current;
    if (!section || !cardEl) return;
    const isPullUp = pullUpRef.current;

    const ctx = gsap.context(() => {
      if (isPullUp) {
        // Match CinemaVideoPosterBeat poster scrub-in
        gsap.fromTo(
          cardEl,
          { opacity: 0.55, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              end: "top 42%",
              scrub: 0.38,
            },
          },
        );
      } else {
        gsap.fromTo(
          cardEl,
          { opacity: 0.35, y: 56, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "top 25%",
              scrub: 0.6,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        pullUp
          ? "relative z-[11] bg-transparent pb-16 pt-0 md:pb-24"
          : "relative flex min-h-[88dvh] items-center justify-center bg-ink-950 py-10 md:min-h-[92dvh] md:py-16",
        pullUp && "-mt-[32dvh] md:-mt-[34dvh]",
        className,
      )}
      aria-label={card.title}
    >
      <div
        ref={cardRef}
        className={cn(
          "relative w-full will-change-transform",
          pullUp && "z-[12]",
        )}
      >
        <CinemaPosterCard
          {...card}
          onCtaClick={playClip ? openClip : onCtaClick}
          prominent={pullUp || card.prominent}
        />
      </div>
      {pullUp ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-ink-950"
          aria-hidden
        />
      ) : null}
      {playClip ? (
        <TrailerModal
          open={open}
          onClose={close}
          title={playClip.title}
          youtubeId={playClip.youtubeId}
          videoSrc={playClip.videoSrc}
          startSeconds={playClip.startSeconds}
          endSeconds={playClip.endSeconds}
        />
      ) : null}
    </section>
  );
}
