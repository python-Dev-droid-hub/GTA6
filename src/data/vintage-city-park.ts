/**
 * Vintage City Park — horizontal cinema chapters (Palmneon fan pack).
 * Diptych art is one file — never split into two <Image>s.
 */

const img = (name: string) => `/images/vintage/${name}?v=looks-face-v2`;

export type VintageMedia = {
  id: string;
  src: string;
  alt: string;
};

/** 50/50 — opening plate | dark Pre-Order Bonuses lockup */
export type VintageBonusesPanel = {
  type: "bonuses";
  id: string;
  image: VintageMedia;
  label: string;
  titleLine: string;
  scriptTitle: string;
  body: string;
};

/** One full-bleed / 50-50 vehicle plate */
export type VintageVehiclePanel = {
  type: "vehicle";
  id: string;
  image: VintageMedia;
  label: string;
  title: string;
  body: string;
};

/** Staggered 3-tile garage gallery */
export type VintageGalleryPanel = {
  type: "gallery";
  id: string;
  label: string;
  items: [VintageMedia, VintageMedia, VintageMedia];
};

export type VintageLooksPanel = {
  type: "looks";
  id: string;
  image: VintageMedia;
  label: string;
  title: string;
  body: string;
};

export type VintageLooksCardsPanel = {
  type: "looks-cards";
  id: string;
  hero: VintageMedia;
  cards: [VintageMedia, VintageMedia];
};

export type VintageWeaponsPanel = {
  type: "weapons";
  id: string;
  left: VintageMedia;
  right: VintageMedia;
  label: string;
  title: string;
  body: string;
};

export type VintagePackPanel = {
  type: "pack";
  id: string;
  image: VintageMedia;
  lineTop: string;
  scriptTitle: string;
  lineBottom: string;
};

export type VintagePanel =
  | VintageBonusesPanel
  | VintageVehiclePanel
  | VintageGalleryPanel
  | VintageLooksPanel
  | VintageLooksCardsPanel
  | VintageWeaponsPanel
  | VintagePackPanel;

export const vintageCityPark = {
  title: "Vintage City Park",
  subtitle:
    "Pre-order bonuses, garage heat, looks, and the Vintage Pack — Grand Theft Auto 6 fan drop.",
  preOrderHref: "https://www.rockstargames.com/VI",
  preOrderLabel: "Pre-Order Now",
  backHref: "/",
  panels: [
    {
      type: "bonuses",
      id: "bonuses",
      image: {
        id: "bonuses-left",
        src: img("bonuses-left.png"),
        alt: "Coast pair at Ocean View Hotel",
      },
      label: "Pre-Order Bonuses",
      titleLine: "Welcome Back To",
      scriptTitle: "City Park",
      body: "Featuring a timeless '55 Palm Stanier sedan and garage alongside Ocean Beach, decadent outfits and hairstyles for both leads, and an iconic weapon pattern that echoes the excess of the past.",
    },
    {
      type: "vehicle",
      id: "stanier",
      image: {
        id: "stanier-hero",
        src: img("vehicle-main.png"),
        alt: "'55 Palm Stanier on a neon night street",
      },
      label: "Vehicle & Garage",
      title: "'55 Palm Stanier",
      body: "Cruise Shore Drive in this classic sedan and store it in the Shore Court personal garage that's just a stone's throw from the glistening sands of Ocean Beach. It features a weapon locker plus a secure place to deposit stolen goods to be fenced.",
    },
    {
      type: "gallery",
      id: "stanier-gallery",
      label: "Vehicle & Garage gallery",
      items: [
        {
          id: "vehicle-1",
          src: img("vehicle-1.png"),
          alt: "Stanier fender and whitewall detail",
        },
        {
          id: "vehicle-2",
          src: img("vehicle-2.png"),
          alt: "Pair in the Stanier cabin",
        },
        {
          id: "vehicle-3",
          src: img("vehicle-3.png"),
          alt: "Stanier taillight and fin",
        },
      ],
    },
    {
      type: "looks",
      id: "looks",
      image: {
        id: "looks-club",
        src: img("looks-main.png"),
        alt: "Club floor — sequin dress and linen heat",
      },
      label: "Looks",
      title: "Outfits & Hairstyles",
      body: "Dress for excess with Jason's effortlessly chic linen suit in vintage pastel, complemented by the cut and coif of the decade of decadence. Show everyone the world is yours in Lucia's red sequin mini dress and curls.",
    },
    {
      type: "looks-cards",
      id: "looks-cards",
      hero: {
        id: "looks-face",
        src: img("looks-face.png"),
        alt: "Close-up portrait under magenta neon",
      },
      cards: [
        {
          id: "looks-card-a",
          src: img("looks-2.png"),
          alt: "Martini night — sequin glam",
        },
        {
          id: "looks-card-b",
          src: img("looks-1.png"),
          alt: "Palm-pattern heat at sunset",
        },
      ],
    },
    {
      type: "weapons",
      id: "weapons",
      left: {
        id: "weapons-left",
        src: img("weapons-main.png"),
        alt: "Aviator portrait under pink neon",
      },
      right: {
        id: "weapons-right",
        src: img("weapons-1.png"),
        alt: "Palm-pattern sidearms and cash on leather",
      },
      label: "Weapon Pattern",
      title: "Channel The Original Kingpin",
      body: "Adorn most guns with a tropical pattern inspired by the iconic palm tree button-up.",
    },
    {
      type: "pack",
      id: "pack",
      image: {
        id: "pack-hero",
        src: img("pack-main.png"),
        alt: "Harbor sunset — Vintage City Park Pack",
      },
      lineTop: "Vintage",
      scriptTitle: "City Park",
      lineBottom: "Pack",
    },
  ] satisfies VintagePanel[],
} as const;
