"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParallaxLayer } from "@/components/experience/parallax-layer";
import { QuoteCrossfade } from "@/components/experience/quote-crossfade";
import { CharacterClipPlayer } from "@/components/experience/character-clip-player";
import type { CinematicCharacter } from "@/data/cinematic-characters";
import { cn } from "@/utils/cn";

export type CharacterSectionProps = CinematicCharacter & {
  className?: string;
};

/**
 * Full-viewport character chapter — Leonida-style layered parallax + quotes + clip.
 */
export function CharacterSection({
  name,
  tagline,
  bio,
  quotes,
  bgImage,
  fgImage,
  posterImage,
  videoSrc,
  exploreLabel,
  exploreHref,
  priority = false,
  className,
}: CharacterSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.75, 1],
    [0.55, 1, 1, 0.35],
  );

  return (
    <section
      ref={sectionRef}
      className={cn("relative min-h-[160dvh] bg-ink-950", className)}
      aria-labelledby={`character-${name.toLowerCase()}-heading`}
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        <motion.div className="absolute inset-0" style={{ opacity: bgOpacity }}>
          <ParallaxLayer
            progress={scrollYProgress}
            yRange={[0, -10]}
            scaleRange={[1.08, 1.16]}
            className="absolute inset-[-8%]"
          >
            <Image
              src={bgImage}
              alt=""
              fill
              priority={priority}
              sizes="100vw"
              className="object-cover"
            />
          </ParallaxLayer>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/45 to-ink-950/25"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/50"
            aria-hidden
          />
        </motion.div>

        <ParallaxLayer
          progress={scrollYProgress}
          yRange={[12, -22]}
          scaleRange={[0.96, 1.1]}
          className="pointer-events-none absolute inset-y-0 right-[-4%] z-[5] w-[min(58vw,36rem)] md:right-0"
        >
          <div className="relative h-full w-full">
            <Image
              src={fgImage}
              alt=""
              fill
              priority={priority}
              sizes="(max-width: 768px) 70vw, 36rem"
              className="object-contain object-bottom drop-shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
            />
          </div>
        </ParallaxLayer>

        <div className="relative z-10 flex h-full flex-col justify-between px-5 py-24 sm:px-8 md:max-w-[52%] md:px-12 lg:px-16 lg:py-28">
          <QuoteCrossfade quotes={quotes} />

          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4, once: false }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3"
            >
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-neon-cyan">
                {tagline}
              </p>
              <h2
                id={`character-${name.toLowerCase()}-heading`}
                className="font-display text-3xl uppercase tracking-[0.06em] text-paper sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {name}
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-paper/85 md:text-base">
                {bio}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.35, once: false }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              <CharacterClipPlayer
                videoSrc={videoSrc}
                posterImage={posterImage}
                name={name}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5, once: false }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Link
                href={exploreHref}
                className={cn(
                  "inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.18em]",
                  "text-[#f7b6c8] transition-cinema hover:text-paper",
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
                )}
              >
                {exploreLabel}
                <span aria-hidden>→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
