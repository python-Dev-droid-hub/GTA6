"use client";

import { UnifiedCinemaReel } from "@/components/animations/hero/unified-cinema-reel";
import { CinemaPosterCard } from "@/components/sections/home/cinema-poster-card";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { homeHero } from "@/data/home-hero";
import { cinemaPosters } from "@/data/cinema-posters";
import { heroScrubFrames } from "@/data/hero-scrub-frames";
import {
  sagaFramesCoast,
  sagaFramesNeon,
  sagaFramesHeat,
} from "@/data/saga-frames";
import { cn } from "@/utils/cn";

export type HomeCinemaSagaProps = {
  className?: string;
};

function NeonBrandTitle({
  title,
  accent,
}: {
  title: string;
  accent: string;
}) {
  const letters = accent.split("");
  const neonClass = [
    "text-[#ff2d6f]",
    "text-[#39ff14]",
    "text-gradient-neon-o",
    "text-[#00e5ef]",
  ];

  return (
    <h2 className="font-display text-[clamp(2.25rem,9vw,6.5rem)] uppercase leading-[0.92] tracking-[0.04em]">
      <span className="text-[#f7d6de]">{title}</span>{" "}
      <span className="inline-flex">
        {letters.map((ch, i) => (
          <span
            key={`${ch}-${i}`}
            className={cn(
              "inline-block",
              neonClass[i] ?? "text-[#00e5ef]",
              i === 0 && "drop-shadow-[0_0_18px_rgba(255,45,111,0.55)]",
              i === 1 && "drop-shadow-[0_0_18px_rgba(57,255,20,0.45)]",
              i === 3 && "drop-shadow-[0_0_18px_rgba(0,229,239,0.5)]",
            )}
          >
            {ch}
          </span>
        ))}
      </span>
    </h2>
  );
}

/**
 * Continuous reel — video scrub chapters with poster/CTA interludes.
 */
export function HomeCinemaSaga({ className }: HomeCinemaSagaProps) {
  const { posterSrc, posterAlt, ctas, title, titleAccent, subtitle } = homeHero;
  const { trailer, people, media } = cinemaPosters;

  if (
    heroScrubFrames.length < 2 ||
    sagaFramesCoast.length < 2 ||
    sagaFramesNeon.length < 2
  ) {
    return null;
  }

  return (
    <UnifiedCinemaReel
      id="cinema-reel"
      className={className}
      sectionHeight="1280vh"
      posterSrc={posterSrc}
      posterAlt={posterAlt}
      lerp={0.11}
      chapters={[
        {
          id: "arrival",
          kind: "video",
          frames: heroScrubFrames,
          weight: 1.1,
          scrim: "left",
          content: (
            <Container
              size="wide"
              className="pointer-events-none flex flex-1 flex-col justify-end pb-20 pt-28 md:pb-24"
            >
              <div className="pointer-events-auto flex max-w-3xl flex-col gap-5 md:gap-6">
                <p className="font-mono text-xs uppercase tracking-[0.32em] text-neon-cyan">
                  Chapter 01 — Arrival
                </p>
                <NeonBrandTitle title={title} accent={titleAccent} />
                <p className="max-w-xl text-base leading-relaxed text-[#f0ebe3]/90 md:text-lg">
                  {subtitle}
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  {ctas.map((cta) => (
                    <ButtonLink
                      key={cta.href + cta.label}
                      href={cta.href}
                      variant={cta.variant}
                      size="lg"
                      className={cn(
                        cta.variant === "gradient" &&
                          "rounded-full bg-gradient-to-r from-[#ff2d6f] to-[#00e5ef] shadow-[0_0_24px_rgba(255,45,111,0.35)]",
                        cta.variant === "outline" &&
                          "rounded-full border-paper/70 text-paper hover:border-[#00e5ef] hover:text-[#00e5ef]",
                      )}
                    >
                      {cta.label}
                    </ButtonLink>
                  ))}
                </div>
              </div>
            </Container>
          ),
        },
        {
          id: "poster-trailer",
          kind: "poster",
          holdImage: trailer.holdImage,
          weight: 0.55,
          scrim: "none",
          content: (
            <CinemaPosterCard
              eyebrow={trailer.eyebrow}
              title={trailer.title}
              description={trailer.description}
              ctaLabel={trailer.ctaLabel}
              ctaHref={trailer.ctaHref}
              imageSrc={trailer.imageSrc}
              imageAlt={trailer.imageAlt}
              ctaTone={trailer.ctaTone}
              palette={trailer.palette}
              align={trailer.align}
              textAlign={trailer.textAlign}
              frame={trailer.frame}
              imageClassName={trailer.imageClassName}
            />
          ),
        },
        {
          id: "coast",
          kind: "video",
          frames: sagaFramesCoast,
          weight: 1,
          scrim: "left",
          content: (
            <Container
              size="wide"
              className="pointer-events-none flex flex-1 flex-col justify-end pb-20 md:pb-24"
            >
              <div className="pointer-events-auto max-w-xl">
                <p className="font-mono text-xs uppercase tracking-[0.32em] text-neon-cyan">
                  Chapter 02 — Coast
                </p>
                <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.06em] text-paper sm:text-4xl md:text-5xl lg:text-6xl">
                  Neon coast
                </h2>
                <p className="mt-4 text-base leading-relaxed text-paper/90 md:text-lg">
                  When the sun drops, the city wakes up hungry. Keep scrolling —
                  the reel never hard-cuts.
                </p>
              </div>
            </Container>
          ),
        },
        {
          id: "poster-people",
          kind: "poster",
          holdImage: people.holdImage,
          weight: 0.55,
          scrim: "none",
          content: (
            <CinemaPosterCard
              eyebrow={people.eyebrow}
              title={people.title}
              description={people.description}
              ctaLabel={people.ctaLabel}
              ctaHref={people.ctaHref}
              imageSrc={people.imageSrc}
              imageAlt={people.imageAlt}
              ctaTone={people.ctaTone}
              align={people.align}
              textAlign={people.textAlign}
              eyebrowTone={people.eyebrowTone}
              frame={people.frame}
              imageClassName={people.imageClassName}
            />
          ),
        },
        {
          id: "neon",
          kind: "video",
          frames: sagaFramesNeon,
          weight: 1,
          scrim: "right",
          content: (
            <Container
              size="wide"
              className="pointer-events-none flex flex-1 flex-col items-end justify-end pb-20 md:pb-24"
            >
              <div className="pointer-events-auto max-w-xl text-right">
                <p className="font-mono text-xs uppercase tracking-[0.32em] text-vice-pink">
                  Chapter 03 — After dark
                </p>
                <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.06em] text-paper sm:text-4xl md:text-5xl lg:text-6xl">
                  After dark
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#ff8a6a] md:text-lg">
                  Everyone has something to gain — and more to lose. One
                  continuous scroll, one continuous picture.
                </p>
              </div>
            </Container>
          ),
        },
        {
          id: "poster-media",
          kind: "poster",
          holdImage: media.holdImage,
          weight: 0.55,
          scrim: "none",
          content: (
            <CinemaPosterCard
              eyebrow={media.eyebrow}
              title={media.title}
              description={media.description}
              ctaLabel={media.ctaLabel}
              ctaHref={media.ctaHref}
              imageSrc={media.imageSrc}
              imageAlt={media.imageAlt}
              ctaTone={media.ctaTone}
              align={media.align}
            />
          ),
        },
        ...(sagaFramesHeat.length > 1
          ? [
              {
                id: "heat",
                kind: "video" as const,
                frames: sagaFramesHeat,
                weight: 0.9,
                scrim: "left" as const,
                content: (
                  <Container
                    size="wide"
                    className="pointer-events-none flex flex-1 flex-col justify-end pb-20 md:pb-24"
                  >
                    <div className="pointer-events-auto max-w-xl">
                      <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#f7b6c8]">
                        Chapter 04 — Pressure
                      </p>
                      <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.06em] text-paper sm:text-4xl md:text-5xl">
                        Keep the heat
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-paper/85 md:text-lg">
                        The reel hands you the next screen. Trailer and media
                        wait just below.
                      </p>
                      <div className="pointer-events-auto mt-6">
                        <ButtonLink
                          href="#trailer"
                          variant="gradient"
                          size="md"
                          className="rounded-full"
                        >
                          Continue to trailer
                        </ButtonLink>
                      </div>
                    </div>
                  </Container>
                ),
              },
            ]
          : []),
      ]}
    />
  );
}
