import type { Metadata } from "next";
import {
  HeroVideoReveal,
  HomeCinemaBeats,
} from "@/components/sections/home";
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
  return (
    <main>
      <HeroVideoReveal />
      <HomeCinemaBeats />
    </main>
  );
}
