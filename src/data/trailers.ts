export type TrailerSource = {
  id: string;
  title: string;
  caption: string;
  durationLabel: string;
  posterSrc: string;
  posterAlt: string;
  youtubeId?: string;
  videoSrc?: string;
  hrefAllMedia: string;
};

/** Local teaser plate cut from Trailer 2 — click-to-play facade. */
export const featuredTrailer: TrailerSource = {
  id: "trailer-2",
  title: "Trailer 2 — fan plate",
  caption:
    "Local cinematic cut for the archive. Unofficial — not affiliated with Rockstar Games.",
  durationLabel: "0:12",
  posterSrc: "/images/cinema/trailer2-teaser.jpg",
  posterAlt: "Cinematic still from Trailer 2 fan plate",
  videoSrc: "/videos/cinema/trailer2-teaser.mp4",
  youtubeId: "VQRLujxTm3c",
  hrefAllMedia: "/media",
};
