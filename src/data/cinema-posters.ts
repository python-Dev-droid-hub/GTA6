/**
 * Poster / CTA interludes between cinema scrub chapters.
 * Stills pulled from trailer plates — fan/dev use only.
 */
export const cinemaPosters = {
  trailer: {
    eyebrow: "Edition",
    title: "Ultimate Edition",
    description:
      "Exclusive looks, heat, and hardware — scroll the full Ultimate drop.",
    ctaLabel: "Explore Ultimate",
    ctaHref: "/ultimate",
    imageSrc: "/images/posters/ultimate-cta-bg.jpg?v=ue-uhd",
    imageAlt: "Ultimate Edition collage — neon coast key art",
    holdImage: "/images/posters/void.jpg",
    ctaTone: "peach" as const,
    palette: "sunset" as const,
    align: "right" as const,
    textAlign: "left" as const,
    frame: "wide" as const,
    imageClassName: "object-cover object-left",
  },
  people: {
    eyebrow: "Pre-Order Bonuses",
    title: "Vintage City Park Pack",
    description:
      "Pre-order to get unique benefits that flash back to when the neon burned brightest.",
    ctaLabel: "Learn More",
    ctaHref: "/vintage",
    imageSrc: "/images/posters/vintage-cta-bg.png?v=keyart-pair",
    imageAlt: "Lucia and Jason at sunset by a muscle car — Vintage City Park Pack",
    holdImage: "/images/posters/void.jpg",
    ctaTone: "lime" as const,
    align: "right" as const,
    textAlign: "left" as const,
    eyebrowTone: "cyan" as const,
    frame: "wide" as const,
    imageClassName: "object-cover object-[38%_center]",
  },
  trailer2: {
    eyebrow: "Videos",
    title: "Trailer 2",
    description:
      "The biggest, most immersive evolution of the Grand Theft Auto series yet.",
    ctaLabel: "Watch Now",
    ctaHref: "#",
    imageSrc: "/images/posters/trailer2-cta-bg.png",
    imageAlt: "DreQuan Priest on a black SUV outside Jack of Hearts",
    holdImage: "/images/posters/void.jpg",
    ctaTone: "peach" as const,
    align: "left" as const,
    textAlign: "left" as const,
    /** Match source art 1024×576 so BG fills the frame edge-to-edge */
    frame: "intrinsic" as const,
    imageWidth: 1024,
    imageHeight: 576,
    imageClassName: "object-cover object-center",
    /** Trailer 2 — play 0:04 → 2:35 */
    playClip: {
      title: "Trailer 2",
      youtubeId: "VQRLujxTm3c",
      startSeconds: 4,
      endSeconds: 155,
    },
  },
  blog: {
    eyebrow: "Blog",
    title: "Coast Archive",
    description:
      "Dispatches from Leonida — cast notes, world drops, and fan deep-dives.",
    ctaLabel: "Read Blog",
    ctaHref: "/news",
    imageSrc: "/images/posters/blog-cta-bg.png",
    imageAlt: "Brian Heder at a war-room table in a sunlit boat hangar",
    holdImage: "/images/posters/void.jpg",
    ctaTone: "pink" as const,
    align: "left" as const,
    textAlign: "left" as const,
    frame: "intrinsic" as const,
    imageWidth: 1024,
    imageHeight: 432,
    imageClassName: "object-cover object-center",
  },
  media: {
    eyebrow: "Downloads",
    title: "Media & Artwork",
    description:
      "Download and share official-style videos, screenshots, and more.",
    ctaLabel: "See All",
    ctaHref: "/media",
    imageSrc: "/images/posters/media-artwork.jpg",
    imageAlt: "Golden-hour character still from the trailer plate",
    holdImage: "/images/posters/void.jpg",
    ctaTone: "lime" as const,
    align: "left" as const,
  },
} as const;
