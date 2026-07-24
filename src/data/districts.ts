export type DistrictPreview = {
  slug: string;
  name: string;
  blurb: string;
  imageSrc: string;
  imageAlt: string;
  accent: "pink" | "cyan" | "gold";
};

export const featuredDistricts: DistrictPreview[] = [
  {
    slug: "vice-beach",
    name: "Vice Beach",
    blurb: "Neon marina nights and hotel-row heat.",
    imageSrc: "/images/districts/vice-beach.jpg",
    imageAlt: "Neon waterfront marina at night",
    accent: "pink",
  },
  {
    slug: "downtown",
    name: "Downtown",
    blurb: "Art-deco towers, wet asphalt, nonstop glow.",
    imageSrc: "/images/districts/downtown.jpg",
    imageAlt: "Downtown neon skyline",
    accent: "cyan",
  },
  {
    slug: "leonida-keys",
    name: "Leonida Keys",
    blurb: "Highway dusk, billboards, and open water.",
    imageSrc: "/images/districts/leonida.jpg",
    imageAlt: "Dusk highway toward the keys",
    accent: "gold",
  },
];
