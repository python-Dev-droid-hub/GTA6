"use client";

import { ScrollScrubVideo } from "@/components/animations/hero/scroll-scrub-video";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { homeHero } from "@/data/home-hero";
import { heroScrubFrames } from "@/data/hero-scrub-frames";
import { cn } from "@/utils/cn";

export type HeroVideoScrubProps = {
  className?: string;
};

/** Multicolor “neon” lockup tuned for dark cinematic plates */
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
 * Copy lives only on the opening scrub beat, then exits;
 * canvas sequence continues for the rest of the runway.
 */
export function HeroVideoScrub({ className }: HeroVideoScrubProps) {
  const { posterSrc, posterAlt, ctas, title, titleAccent, subtitle } = homeHero;

  if (heroScrubFrames.length < 2) return null;

  return (
    <ScrollScrubVideo
      id="hero-scrub"
      className={cn(className)}
      frames={heroScrubFrames}
      sectionHeight="360vh"
      posterSrc={posterSrc}
      posterAlt={posterAlt}
      ariaLabel="Scroll-driven cinematic sequence"
      lerp={0.11}
      overlayExitAt={0.2}
    >
      <Container
        size="wide"
        className="pointer-events-none flex flex-1 flex-col justify-end pb-20 pt-28 md:pb-24"
      >
        <div className="pointer-events-auto flex max-w-3xl flex-col gap-5 md:gap-6">
          <NeonBrandTitle title={title} accent={titleAccent} />
          <p className="max-w-xl text-base leading-relaxed text-[#f0ebe3]/90] md:text-lg">
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
    </ScrollScrubVideo>
  );
}
