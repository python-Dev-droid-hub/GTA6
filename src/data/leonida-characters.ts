/**
 * Only-in-Leonida character dossiers — DATA for `LeonidaCharacterDetail` template.
 *
 * Page flow (same for every character):
 * 1. Clip 1 scrub → name at end
 * 2. Intro collage (tagline + lead + bike/car/bar/boat)
 * 3. Clip 2 scrub → quote heading at end
 * 4. Closing collage (quotes[1] + bio + night/rifle)
 * 5. Prev / next nav (auto-linked from array order)
 *
 * Still ids the template reads:
 *   bike, car, boat?, bar  → intro
 *   rifle, night           → closing
 *
 * To add a character: push one object into `leonidaCharacterEntries`
 * (or call with full assets). Prev/next wire automatically.
 *
 * Tone source: https://www.rockstargames.com/VI/only-in-leonida
 */

export type LeonidaStillId =
  | "bike"
  | "car"
  | "boat"
  | "bar"
  | "rifle"
  | "night"
  | (string & {});

export type LeonidaClip = {
  id: string;
  videoSrc: string;
  posterSrc: string;
  caption?: string;
  /** Skip black/empty intro (seconds). Default 0.5 in template. */
  startOffset?: number;
};

export type LeonidaStill = {
  id: LeonidaStillId;
  /** Still / poster path */
  src: string;
  alt: string;
  /** Optional muted loop in the collage slot (replaces the still). */
  videoSrc?: string;
};

export type LeonidaCharacterInput = {
  slug: string;
  name: string;
  tagline: string;
  /** Default: "Only in Leonida" */
  eyebrow?: string;
  lead: string;
  bio: string[];
  /** [0] = end of clip 2 heading; [1] = closing collage pink line */
  quotes: [string, string] | string[];
  closing: string;
  heroSrc: string;
  heroAlt: string;
  stills: LeonidaStill[];
  clips: [LeonidaClip, LeonidaClip] | LeonidaClip[];
};

export type LeonidaCharacter = LeonidaCharacterInput & {
  eyebrow: string;
  next?: { slug: string; name: string };
  prev?: { slug: string; name: string };
};

/** Raw entries — add new characters here; nav is linked below. */
const leonidaCharacterEntries: LeonidaCharacterInput[] = [
  {
    slug: "jason-duval",
    name: "Jason Duval",
    eyebrow: "Only in Leonida",
    tagline: "Jason wants an easy life, but things just keep getting harder.",
    lead:
      "Jason grew up around grifters and crooks. After a stint in the Army trying to shake off his troubled teens, he found himself in the Keys doing what he knows best, working for local drug runners. It might be time to try something new.",
    bio: [
      "Meeting Lucia could be the best or worst thing to ever happen to him. Jason knows how he'd like it to turn out but right now, it's hard to tell.",
    ],
    quotes: [
      "If anything happens, I'm right behind you.",
      "Another day in paradise, right?",
    ],
    closing:
      "When the sun fades and the neon glows, everyone has something to gain — and more to lose.",
    heroSrc: "/images/characters/jason/01-bike.jpg",
    heroAlt: "Jason Duval on a green sports motorcycle",
    stills: [
      {
        id: "bike",
        src: "/images/characters/jason/01-bike.jpg",
        alt: "Jason Duval on a green sports motorcycle",
      },
      {
        id: "car",
        src: "/images/characters/jason/02-car.jpg",
        alt: "Jason Duval in a car at golden hour",
      },
      {
        id: "boat",
        src: "/images/characters/jason/03-boat.jpg",
        alt: "Jason Duval fishing on a boat with Cal",
      },
      {
        id: "rifle",
        src: "/images/characters/jason/04-rifle.jpg",
        alt: "Jason Duval aiming a rifle over the city at night",
      },
      {
        id: "bar",
        src: "/images/characters/jason/05-bar.jpg",
        alt: "Jason Duval at a dive bar with cash and beer",
      },
      {
        id: "night",
        src: "/images/characters/jason/06-night.jpg",
        alt: "Jason Duval on a neon street at night",
      },
    ],
    clips: [
      {
        id: "clip-01",
        videoSrc: "/videos/characters/jason/clip-01.mp4?v=intra-scrub-1",
        posterSrc: "/images/characters/jason/06-clip1-poster.jpg?v=intra-scrub-1",
        caption: "Another day in paradise",
        startOffset: 0,
      },
      {
        id: "clip-02",
        videoSrc: "/videos/characters/jason/clip-02.mp4?v=cover-fit-2",
        posterSrc: "/images/characters/jason/04-rifle.jpg?v=cover-fit-2",
        caption: "If anything happens",
        startOffset: 0.15,
      },
    ],
  },
  {
    slug: "lucia-caminos",
    name: "Lucia Caminos",
    eyebrow: "Only in Leonida",
    tagline: "Lucia's father taught her to fight as soon as she could walk.",
    lead:
      "Life has been coming at her swinging ever since. Fighting for her family landed her in the Leonida Penitentiary. Sheer luck got her out. Lucia's learned her lesson — only smart moves from here.",
    bio: [
      "More than anything, Lucia wants the good life her mom has dreamed of since their days in Liberty City — but instead of half-baked fantasies, Lucia is prepared to take matters into her own hands.",
    ],
    quotes: [
      "The only thing that matters is who you know and what you got.",
      "A life with Jason could be her way out.",
    ],
    closing:
      "Fresh out of prison and ready to change the odds in her favor, Lucia's committed to her plan — no matter what it takes.",
    heroSrc: "/images/characters/lucia/06-bike.png",
    heroAlt: "Lucia Caminos on a yellow sportbike outside a liquor bar",
    stills: [
      {
        id: "bike",
        src: "/images/characters/lucia/06-bike.png",
        alt: "Lucia Caminos on a yellow sportbike outside a liquor bar",
      },
      {
        id: "car",
        src: "/images/characters/lucia/02-pool.png",
        alt: "Lucia Caminos at a Vice City pool with a cocktail",
      },
      {
        id: "boat",
        src: "/images/characters/lucia/01-gym.png",
        alt: "Lucia Caminos punching a heavy bag in the gym",
      },
      {
        id: "bar",
        src: "/images/characters/lucia/05-club.png",
        alt: "Lucia Caminos in a gold sequin top at a nightclub",
      },
      {
        id: "rifle",
        src: "/images/characters/lucia/04-gun.png",
        alt: "Lucia Caminos taking cover with a pistol",
      },
      {
        id: "night",
        src: "/images/characters/lucia/03-prison.png",
        alt: "Lucia Caminos in an orange jumpsuit at Leonida Penitentiary",
      },
    ],
    clips: [
      {
        id: "clip-01",
        videoSrc: "/videos/characters/lucia/clip-01.mp4?v=cover-fit-2",
        posterSrc: "/images/characters/lucia/02-pool.png?v=cover-fit-2",
        caption: "Only smart moves from here",
        startOffset: 0.1,
      },
      {
        id: "clip-02",
        videoSrc: "/videos/characters/lucia/clip-02.mp4?v=cover-fit-2",
        posterSrc: "/images/characters/lucia/07-trailer-still.jpg?v=cover-fit-2",
        caption: "Who you know and what you got",
        startOffset: 0.1,
      },
    ],
  },
  {
    slug: "cal-hampton",
    name: "Cal Hampton",
    eyebrow: "Only in Leonida",
    tagline: "What if everything on the internet was true?",
    lead:
      "Jason's friend and a fellow associate of Brian's, Cal feels safest hanging at home, snooping on Coast Guard comms with a few beers and some private browser tabs open.",
    bio: [
      "Cal is at the low tide of America and happy there. Casual paranoia loves company, but his friend Jason has bigger plans.",
    ],
    quotes: [
      "There are way too many birds flying around in perfect formation.",
      "The psychopaths are in charge. Get used to it.",
    ],
    closing:
      "When the sun fades and the neon glows, everyone has something to gain — and more to lose.",
    heroSrc: "/images/characters/cal/04-golf.png",
    heroAlt: "Cal Hampton on a tropical mini-golf course with a putter",
    stills: [
      {
        id: "bike",
        src: "/images/characters/cal/04-golf.png",
        alt: "Cal Hampton on a tropical mini-golf course with a putter",
      },
      {
        id: "car",
        src: "/images/characters/cal/03-pool.png",
        alt: "Cal Hampton lounging on a pink float in a pool",
      },
      {
        id: "bar",
        src: "/images/characters/cal/02-bar.png",
        alt: "Cal Hampton at a dive bar pool table",
      },
      {
        id: "boat",
        src: "/images/characters/cal/01-marina.png",
        alt: "Cal Hampton and Jason walking through a marina at night",
      },
      {
        id: "rifle",
        src: "/images/characters/cal/03-pool.png",
        alt: "Cal Hampton lounging on a pink float in a pool",
      },
      {
        id: "night",
        src: "/images/characters/cal/04-golf.png",
        alt: "Cal Hampton on a tropical mini-golf course with a putter",
      },
    ],
    clips: [
      {
        id: "clip-01",
        videoSrc: "/videos/characters/cal/clip-banner.mp4?v=cover-fit-2",
        posterSrc: "/images/characters/cal/06-clip1-poster.jpg?v=cover-fit-2",
        caption: "What if everything on the internet was true?",
        startOffset: 0.1,
      },
      {
        id: "clip-02",
        videoSrc: "/videos/characters/cal/clip-scrub-24.mp4?v=cover-fit-2",
        posterSrc: "/images/characters/cal/05-clip2-still.jpg?v=cover-fit-2",
        caption: "The psychopaths are in charge",
        startOffset: 0.1,
      },
    ],
  },
  {
    slug: "boobie-ike",
    name: "Boobie Ike",
    eyebrow: "Only in Leonida",
    tagline: "It's all about heart — the Jack of Hearts.",
    lead:
      "Boobie is a local Vice City legend — and acts like it. One of the few to transform his time in the streets into a legitimate empire spanning real estate, a strip club, and a recording studio — Boobie's all smiles until it's time to talk business.",
    bio: [
      "Boobie might seem like he's just out for himself, but it's his partnership with the young aspiring music mogul Dre'Quan for Only Raw Records that he's most invested in — now they just need a hit.",
    ],
    quotes: [
      "The club money pay for the studio, and the drug money pay for it all.",
      "Top quality cuts.",
    ],
    closing:
      "When the sun fades and the neon glows, everyone has something to gain — and more to lose.",
    heroSrc: "/images/characters/boobie/07-cash-hq.png",
    heroAlt: "Boobie Ike counting cash in a neon-lit office",
    stills: [
      {
        id: "bike",
        src: "/images/characters/boobie/07-cash-hq.png",
        alt: "Boobie Ike counting cash in a neon-lit office",
      },
      {
        id: "car",
        src: "/images/characters/boobie/02-club.png",
        alt: "Boobie Ike in the Jack of Hearts VIP with money in the air",
      },
      {
        id: "bar",
        src: "/images/characters/boobie/03-cup.png",
        alt: "Boobie Ike with a foam cup in the club",
      },
      {
        id: "boat",
        src: "/images/characters/boobie/06-outside-hq.png",
        alt: "Boobie Ike outside the Jack of Hearts neon sign",
      },
      {
        id: "rifle",
        src: "/images/characters/boobie/02-club.png",
        alt: "Boobie Ike holding court at Jack of Hearts",
      },
      {
        id: "night",
        src: "/images/characters/boobie/06-outside-hq.png",
        alt: "Boobie Ike under the Jack of Hearts neon",
      },
    ],
    clips: [
      {
        id: "clip-01",
        videoSrc: "/videos/characters/boobie/clip-banner.mp4?v=cover-fit-2",
        posterSrc: "/images/characters/boobie/05-banner-poster.jpg?v=cover-fit-2",
        caption: "It's all about heart — the Jack of Hearts.",
        startOffset: 0.1,
      },
      {
        id: "clip-02",
        videoSrc: "/videos/characters/boobie/clip-scrub-05.mp4?v=cover-fit-2",
        posterSrc: "/images/characters/boobie/08-clip2-still.jpg?v=cover-fit-2",
        caption: "The club money pay for the studio, and the drug money pay for it all.",
        startOffset: 0,
      },
    ],
  },
  {
    slug: "drequan-priest",
    name: "Dre'Quan Priest",
    eyebrow: "Only in Leonida",
    tagline: "Only Raw… Records",
    lead:
      "Dre'Quan was always more of a hustler than a gangster. Even when he was dealing on the streets to make ends meet, breaking into music was the goal.",
    bio: [
      "Now that he's signed the Real Dimez, Dre'Quan's days of booking acts into Boobie's strip club might be numbered as he sets his sights on the Vice City scene.",
    ],
    quotes: [
      "Dancers are like my A&Rs. If the record's a hit, DJs gonna be spinnin' it.",
      "You're with the label now.",
    ],
    closing:
      "When the sun fades and the neon glows, everyone has something to gain — and more to lose.",
    heroSrc: "/images/characters/drequan/05-suv.png",
    heroAlt: "Dre'Quan Priest on an SUV outside Jack of Hearts",
    stills: [
      {
        id: "bike",
        src: "/images/characters/drequan/01-club-hoodie.png",
        alt: "Dre'Quan Priest in a yellow hoodie at a neon club",
      },
      {
        id: "car",
        src: "/images/characters/drequan/02-pool.png",
        alt: "Dre'Quan Priest at a neon pool party bar",
      },
      {
        id: "bar",
        src: "/images/characters/drequan/03-studio.png",
        alt: "Dre'Quan Priest in the Only Raw Records studio",
      },
      {
        id: "boat",
        src: "/images/characters/drequan/05-suv.png",
        alt: "Dre'Quan Priest on an SUV outside Jack of Hearts",
      },
      {
        id: "rifle",
        src: "/images/characters/drequan/04-party.png",
        alt: "Dre'Quan Priest with Real Dimez at a club party",
      },
      {
        id: "night",
        src: "/images/characters/drequan/05-suv.png",
        alt: "Dre'Quan Priest under Jack of Hearts neon",
      },
    ],
    clips: [
      {
        id: "clip-01",
        videoSrc: "/videos/characters/drequan/clip-banner-hq.mp4?v=cover-fit-2",
        posterSrc: "/images/characters/drequan/06-banner-poster.jpg?v=cover-fit-2",
        caption: "Only Raw… Records",
        startOffset: 0.075,
      },
      {
        id: "clip-02",
        videoSrc: "/videos/characters/drequan/clip-scrub-hq.mp4?v=face-top-1",
        posterSrc: "/images/characters/drequan/07-clip2-still.jpg?v=face-top-1",
        caption: "Dancers are like my A&Rs. If the record's a hit, DJs gonna be spinnin' it.",
        startOffset: 0.1,
      },
    ],
  },
  {
    slug: "real-dimez",
    name: "Real Dimez",
    eyebrow: "Only in Leonida",
    tagline: "Viral videos. Viral hooks.",
    lead:
      "Bae-Luxe and Roxy aka Real Dimez have been friends since high school — girls with the savvy to turn their time shaking down local dealers into cold, hard cash via spicy rap tracks and a relentless social media presence.",
    bio: [
      "An early hit single with local rapper DWNPLY took Real Dimez to new heights. Now, after five years and a whole lot of trouble, they're signed to Only Raw Records, hoping lightning can strike twice.",
    ],
    quotes: [
      "All my dimes in this club. Meet my twin, make it a dub.",
      "One hit away from fame.",
    ],
    closing:
      "When the sun fades and the neon glows, everyone has something to gain — and more to lose.",
    heroSrc: "/images/characters/real-dimez/03-booth.png",
    heroAlt: "Real Dimez recording in the booth",
    stills: [
      {
        id: "bike",
        src: "/images/characters/real-dimez/01-studio.png",
        alt: "Bae-Luxe in the studio with headphones",
      },
      {
        id: "car",
        src: "/images/characters/real-dimez/07-collage-poster.jpg",
        alt: "Real Dimez dancing on a car hood",
        videoSrc: "/videos/characters/real-dimez/clip-collage.mp4?v=cover-fit-2",
      },
      {
        id: "bar",
        src: "/images/characters/real-dimez/02-car.png",
        alt: "Roxy in a fur coat with ROXY chain",
      },
      {
        id: "boat",
        src: "/images/characters/real-dimez/04-hood.png",
        alt: "Real Dimez dancing on a sports car for the crowd",
      },
      {
        id: "rifle",
        src: "/images/characters/real-dimez/03-booth.png",
        alt: "Real Dimez in the recording booth",
      },
      {
        id: "night",
        src: "/images/characters/real-dimez/02-car.png",
        alt: "Roxy and company in a neon-lit car",
      },
    ],
    clips: [
      {
        id: "clip-01",
        videoSrc: "/videos/characters/real-dimez/clip-banner.mp4?v=cover-fit-2",
        posterSrc: "/images/characters/real-dimez/05-banner-poster.jpg?v=cover-fit-2",
        caption: "Viral videos. Viral hooks.",
        startOffset: 0.1,
      },
      {
        id: "clip-02",
        videoSrc: "/videos/characters/real-dimez/clip-scrub.mp4?v=cover-fit-2",
        posterSrc: "/images/characters/real-dimez/06-clip2-still.jpg?v=cover-fit-2",
        caption: "All my dimes in this club. Meet my twin, make it a dub.",
        startOffset: 0.1,
      },
    ],
  },
  {
    slug: "raul-bautista",
    name: "Raul Bautista",
    eyebrow: "Only in Leonida",
    tagline: "Experience counts.",
    lead:
      "Confidence, charm, and cunning — Raul's a seasoned bank robber always on the hunt for talent ready to take the risks that bring the biggest rewards.",
    bio: [
      "Raul's recklessness raises the stakes with every score. Sooner or later, his crew will have to double down or pull their chips from the table.",
    ],
    quotes: [
      "Life is full of surprises, my friend. I think we'd all be wise to remember that.",
      "A professional adapts.",
    ],
    closing:
      "When the sun fades and the neon glows, everyone has something to gain — and more to lose.",
    heroSrc: "/images/characters/raul/03-yacht.png",
    heroAlt: "Raul Bautista on a yacht at sunset",
    stills: [
      {
        id: "bike",
        src: "/images/characters/raul/01-phone.png",
        alt: "Raul Bautista on a phone call",
      },
      {
        id: "car",
        src: "/images/characters/raul/02-drive.png",
        alt: "Raul Bautista driving with a bag of cash",
      },
      {
        id: "bar",
        src: "/images/characters/raul/04-neon.png",
        alt: "Raul Bautista under neon nightlife",
      },
      {
        id: "boat",
        src: "/images/characters/raul/03-yacht.png",
        alt: "Raul Bautista on a yacht overlooking the skyline",
      },
      {
        id: "rifle",
        src: "/images/characters/raul/02-drive.png",
        alt: "Raul Bautista after a score",
      },
      {
        id: "night",
        src: "/images/characters/raul/04-neon.png",
        alt: "Raul Bautista in neon Leonida nightlife",
      },
    ],
    clips: [
      {
        id: "clip-01",
        videoSrc: "/videos/characters/raul/clip-first-fill.mp4?v=cover-fit-2",
        posterSrc: "/images/characters/raul/05-banner-poster.jpg?v=cover-fit-2",
        caption: "Experience counts.",
        startOffset: 0,
      },
      {
        id: "clip-02",
        videoSrc: "/videos/characters/raul/clip-second-fill.mp4?v=side-crop-3",
        posterSrc: "/images/characters/raul/06-clip2-still.jpg?v=side-crop-3",
        caption:
          "Life is full of surprises, my friend. I think we'd all be wise to remember that.",
        startOffset: 0.1,
      },
    ],
  },
  {
    slug: "brian-heder",
    name: "Brian Heder",
    eyebrow: "Only in Leonida",
    tagline: "Looks like a Leonida beach bum — moves like a great white shark.",
    lead:
      "Brian's a classic drug runner from the golden age of smuggling in the Keys. Still moving product through his boat yard with his third wife, Lori, Brian's been around long enough to let others do his dirty work.",
    bio: [
      "Brian's letting Jason live rent-free at one of his properties — so long as he helps with local shakedowns, and stops by for Lori's sangria once in a while.",
    ],
    quotes: [
      "I hauled so much grass in that plane, I could make the state of Leonida levitate.",
      "Nothing better than a Mudslide at sunset.",
    ],
    closing:
      "When the sun fades and the neon glows, everyone has something to gain — and more to lose.",
    heroSrc: "/images/characters/brian/02-truck.png",
    heroAlt: "Brian Heder in a pickup truck wearing sunglasses",
    stills: [
      {
        id: "bike",
        src: "/images/characters/brian/01-deal.png",
        alt: "Brian Heder pointing while holding a taped package",
      },
      {
        id: "car",
        src: "/images/characters/brian/02-truck.png",
        alt: "Brian Heder riding shotgun in a silver pickup",
      },
      {
        id: "bar",
        src: "/images/characters/brian/03-pier.png",
        alt: "Brian Heder at a waterfront bar at night",
      },
      {
        id: "boat",
        src: "/images/characters/brian/04-crew.png",
        alt: "Brian Heder with associates beside a pickup truck",
      },
      {
        id: "rifle",
        src: "/images/characters/brian/04-crew.png",
        alt: "Brian Heder holding a handgun with his crew",
      },
      {
        id: "night",
        src: "/images/characters/brian/03-pier.png",
        alt: "Brian Heder under pier lights at night",
      },
    ],
    clips: [
      {
        id: "clip-01",
        videoSrc: "/videos/characters/brian/clip-banner.mp4?v=cover-fit-2",
        posterSrc: "/images/characters/brian/05-banner-poster.jpg?v=cover-fit-2",
        caption: "Looks like a Leonida beach bum — moves like a great white shark.",
        startOffset: 0,
      },
      {
        id: "clip-02",
        videoSrc: "/videos/characters/brian/clip-scrub-fill.mp4?v=cover-fit-2",
        posterSrc: "/images/characters/brian/06-clip2-still.jpg?v=cover-fit-2",
        caption:
          "I hauled so much grass in that plane, I could make the state of Leonida levitate.",
        startOffset: 0.1,
      },
    ],
  },
];

function linkLeonidaNav(
  entries: LeonidaCharacterInput[],
): LeonidaCharacter[] {
  return entries.map((entry, i) => {
    const prev = entries[i - 1];
    const next = entries[i + 1];
    return {
      ...entry,
      eyebrow: entry.eyebrow ?? "Only in Leonida",
      prev: prev ? { slug: prev.slug, name: prev.name } : undefined,
      next: next ? { slug: next.slug, name: next.name } : undefined,
    };
  });
}

export const leonidaCharacters: LeonidaCharacter[] =
  linkLeonidaNav(leonidaCharacterEntries);

export function getLeonidaCharacter(
  slug: string,
): LeonidaCharacter | undefined {
  return leonidaCharacters.find((c) => c.slug === slug);
}

export function getLeonidaSlugs(): string[] {
  return leonidaCharacters.map((c) => c.slug);
}

export function getLeonidaStill(
  character: LeonidaCharacter,
  id: LeonidaStillId,
): LeonidaStill | undefined {
  return character.stills.find((s) => s.id === id);
}
