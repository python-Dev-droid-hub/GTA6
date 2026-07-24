import { ButtonLink } from "@/components/ui/button-link";
import { HeroCountdown } from "@/components/sections/home/hero-countdown";
import { legal } from "@/constants/legal";
import type { HomeHeroContent } from "@/types/hero";

export type HeroCopyProps = {
  content: Pick<
    HomeHeroContent,
    "eyebrow" | "title" | "titleAccent" | "subtitle" | "ctas"
  >;
};

/**
 * Server-rendered hero copy — brand + one headline + support + CTA.
 * SEO-critical text stays out of client islands.
 */
export function HeroCopy({ content }: HeroCopyProps) {
  const { eyebrow, title, titleAccent, subtitle, ctas } = content;

  return (
    <div className="flex max-w-4xl flex-col gap-5 md:gap-7">
      <p
        data-hero-animate="eyebrow"
        className="font-mono text-xs uppercase tracking-[0.32em] text-neon-cyan md:text-sm"
      >
        {eyebrow}
      </p>

      <h1 id="hero-heading" className="text-display max-w-5xl text-paper">
        <span data-hero-animate="title" className="block leading-[0.92]">
          {title}
          <span className="text-gradient-vice"> {titleAccent}</span>
        </span>
      </h1>

      <p
        data-hero-animate="subtitle"
        className="text-lead max-w-xl text-paper-muted md:max-w-2xl"
      >
        {subtitle}
      </p>

      <div data-hero-animate="countdown">
        <HeroCountdown />
      </div>

      <div
        data-hero-animate="cta"
        className="flex flex-wrap items-center gap-3 pt-1"
      >
        {ctas.map((cta) => (
          <ButtonLink
            key={cta.href + cta.label}
            href={cta.href}
            variant={cta.variant}
            size="lg"
            {...(cta.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {cta.label}
          </ButtonLink>
        ))}
      </div>

      <p
        data-hero-animate="legal"
        className="max-w-md font-mono text-[0.65rem] leading-relaxed tracking-wide text-paper-faint"
      >
        {legal.shortDisclaimer}
      </p>
    </div>
  );
}
