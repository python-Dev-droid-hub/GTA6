export type CollagePanel = {
  id: string;
  src: string;
  alt: string;
  area: string;
};

/**
 * Mosaic panels for the opening collage (original/public art only).
 * Layout mirrors a trailer key-art grid — not Rockstar’s official collage.
 */
export const homeCollagePanels: CollagePanel[] = [
  {
    id: "sky",
    src: "/images/districts/downtown.jpg",
    alt: "Coastal skyline at dusk",
    area: "sky",
  },
  {
    id: "pair",
    src: "/images/news/cover-cast.jpg",
    alt: "Two figures against neon light",
    area: "pair",
  },
  {
    id: "water",
    src: "/images/districts/vice-beach.jpg",
    alt: "Tropical waterfront at sunset",
    area: "water",
  },
  {
    id: "tall-a",
    src: "/images/characters/cal.jpg",
    alt: "Portrait against night haze",
    area: "talla",
  },
  {
    id: "street",
    src: "/images/hero-poster.png",
    alt: "Rain-slick neon street",
    area: "street",
  },
  {
    id: "wild",
    src: "/images/districts/leonida.jpg",
    alt: "Wetlands and heat haze",
    area: "wild",
  },
  {
    id: "tall-b",
    src: "/images/characters/lucia.jpg",
    alt: "Portrait in daylight heat",
    area: "tallb",
  },
  {
    id: "ride",
    src: "/images/trailer-poster.jpg",
    alt: "Chrome and asphalt motion",
    area: "ride",
  },
  {
    id: "chase",
    src: "/images/news/cover-trailer.jpg",
    alt: "Night chase energy",
    area: "chase",
  },
];

export const homeCollage = {
  eyebrow: "The next chapter begins",
  /** Stacked display lines — rendered as Grand / Theft / Auto */
  titleLines: ["Grand", "Theft", "Auto"] as const,
  brandLine: "Grand Theft Auto",
  brandNumeral: "VI",
  description:
    "The next evolution of open-world gaming begins. Experience a living city built for the next generation.",
  brandSub: "FAN ARCHIVE",
  ctaLabel: "Pre-Order Now",
  /** Official storefront — fan site does not sell the game */
  ctaHref: "https://www.rockstargames.com/VI",
  ctaExternal: true,
  platformsLabel: "PC · CONSOLE",
  collageSrc: "/images/hero/banner-collage.png?v=3",
} as const;
