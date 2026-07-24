import type { HomeHeroContent } from "@/types/hero";

/**
 * Homepage hero — Palmneon art direction.
 * Video: public/videos/hero.mp4 (scroll-scrubbed). Replace with original footage before public ship —
 * character-named source clips may be third-party IP.
 * WebGL: separate pass — do not import R3F here.
 */
export const homeHero: HomeHeroContent = {
  eyebrow: "Unofficial fan archive",
  title: "Palm",
  titleAccent: "neon",
  subtitle:
    "Cinematic neon-coast fiction — trailers, dossiers, and tools. Original art direction. Not affiliated with Rockstar Games or Take-Two.",
  posterSrc: "/images/cinema/hero-scrub.jpg",
  posterAlt:
    "Cinematic still from Trailer 2 hero plate — fan archive use",
  videoSrc: "/videos/cinema/hero-scrub.mp4",
  /** Canvas sequence rebuilt from Trailer 2 @ ~8s */
  scrubVh: 4,
  ctas: [
    {
      label: "Watch Trailer",
      href: "#trailer",
      variant: "gradient",
    },
    {
      label: "Explore World",
      href: "/world",
      variant: "outline",
    },
  ],
  scrollTargetId: "trailer",
  scrollLabel: "Scroll to explore",
};
