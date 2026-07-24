export type CinematicCharacter = {
  id: string;
  name: string;
  tagline: string;
  bio: string;
  quotes: string[];
  bgImage: string;
  fgImage: string;
  posterImage: string;
  videoSrc: string;
  exploreLabel: string;
  exploreHref: string;
  priority?: boolean;
};

/**
 * Cinematic showcase roster — original Palmneon copy + local plates.
 * Swap fgImage for transparent cutout PNGs when ready.
 */
export const cinematicCharacters: CinematicCharacter[] = [
  {
    id: "lucia",
    name: "Lucia",
    tagline: "Sharp instincts. Higher stakes.",
    bio: "Agency under pressure — not a passenger in someone else’s score. The coast doesn’t scare her; hesitation does. Fan dossier language only; expand with citations, not rumors.",
    quotes: [
      "Luck got me out once. Brains keep me out.",
      "I’m done waiting for the good life to show up.",
    ],
    bgImage: "/images/districts/vice-beach.jpg",
    fgImage: "/images/characters/lucia.jpg",
    posterImage: "/images/cinema/beats/beat-01.jpg",
    videoSrc: "/videos/cinema/beats/beat-01.mp4",
    exploreLabel: "Explore the Coast",
    exploreHref: "/world",
    priority: true,
  },
  {
    id: "jason",
    name: "Jason",
    tagline: "Easy life keeps getting harder.",
    bio: "Keys grit, new heat, and a partner who might rewrite the map. Spoiler-safe tone only — what the archive shows, nothing invented.",
    quotes: [
      "Paradise has a body count.",
      "Stay close. I’ll cover the exit.",
    ],
    bgImage: "/images/districts/downtown.jpg",
    fgImage: "/images/characters/jason.jpg",
    posterImage: "/images/cinema/beats/beat-03.jpg",
    videoSrc: "/videos/cinema/beats/beat-03.mp4",
    exploreLabel: "Explore Downtown",
    exploreHref: "/world",
  },
  {
    id: "cal",
    name: "Cal",
    tagline: "Signal noise. Quiet rooms.",
    bio: "Low tide of the network — tabs open, trust closed. Bigger plans wait outside the house; he prefers the glow of a safe screen.",
    quotes: [
      "If the pattern is perfect, someone is lying.",
      "I watch the water. You watch the road.",
    ],
    bgImage: "/images/districts/leonida.jpg",
    fgImage: "/images/characters/cal.jpg",
    posterImage: "/images/cinema/beats/beat-06.jpg",
    videoSrc: "/videos/cinema/beats/beat-06.mp4",
    exploreLabel: "Explore the Keys",
    exploreHref: "/world",
  },
];
