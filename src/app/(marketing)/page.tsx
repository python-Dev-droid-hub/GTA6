import type { Metadata } from "next";
import {
  HeroVideoReveal,
  HomeCinemaBeats,
} from "@/components/sections/home";
import { cinemaPosters } from "@/data/cinema-posters";
import { homeHero } from "@/data/home-hero";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  description: homeHero.subtitle,
  path: "/",
  image: homeHero.posterSrc,
  imageAlt: homeHero.posterAlt,
});

/**
 * Hero → cinema beats (through blog scrub) → site footer via MarketingShell
 */
export default function HomePage() {
  const { trailer } = cinemaPosters;

  return (
    <main>
      <HeroVideoReveal
        poster={{
          eyebrow: trailer.eyebrow,
          title: trailer.title,
          description: trailer.description,
          ctaLabel: trailer.ctaLabel,
          ctaHref: trailer.ctaHref,
          imageSrc: trailer.imageSrc,
          imageAlt: trailer.imageAlt,
          ctaTone: trailer.ctaTone,
          palette: trailer.palette,
          align: trailer.align,
          textAlign: trailer.textAlign,
          frame: trailer.frame,
          imageClassName: trailer.imageClassName,
        }}
      />
      <HomeCinemaBeats />
    </main>
  );
}
