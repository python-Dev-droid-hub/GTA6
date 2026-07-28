export type MapDistrict = {
  id: string;
  name: string;
  blurb: string;
  /** SVG path for the region shape */
  path: string;
  accent: "pink" | "cyan" | "gold";
  href: string;
  tags: string[];
};

/**
 * Stylized fan map regions (not geographic accuracy).
 * Coordinates fit a 1000×620 viewBox.
 */
export const mapDistricts: MapDistrict[] = [
  {
    id: "vice-beach",
    name: "Vice Beach",
    blurb: "Marina lights, hotel strip, and late-night heat.",
    path: "M120 340 C180 280 320 250 420 270 C480 285 520 340 500 400 C470 470 340 500 220 470 C140 445 90 390 120 340 Z",
    accent: "pink",
    href: "/characters",
    tags: ["nightlife", "coast"],
  },
  {
    id: "downtown",
    name: "Downtown",
    blurb: "Art-deco towers and stacked pressure.",
    path: "M480 120 C560 90 680 100 760 150 C820 190 840 280 800 340 C740 420 600 430 520 380 C450 330 430 180 480 120 Z",
    accent: "cyan",
    href: "/characters",
    tags: ["skyline", "density"],
  },
  {
    id: "leonida-keys",
    name: "Leonida Keys",
    blurb: "Highway dusk and open water exits.",
    path: "M160 480 C280 460 420 500 560 520 C700 540 820 500 880 540 C900 580 820 600 680 590 C480 575 260 570 160 540 C120 520 120 495 160 480 Z",
    accent: "gold",
    href: "/characters",
    tags: ["highway", "water"],
  },
];
