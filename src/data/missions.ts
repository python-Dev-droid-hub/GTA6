export type MissionCategory =
  | "all"
  | "story"
  | "heist"
  | "side"
  | "strangers"
  | "activities";

export type MissionTag = string;

export type Mission = {
  id: string;
  number: string;
  title: string;
  location: string;
  summary: string;
  tags: MissionTag[];
  categories: Exclude<MissionCategory, "all">[];
  imageSrc: string;
  imageAlt: string;
  rewards: {
    cash: string;
    rp: string;
    stars: string;
  };
  /** Optional walkthrough / blog link. */
  href?: string;
  /** Optional schedule — hidden until this time (ISO-8601). */
  publishAt?: string;
};

export const missionCategories: {
  id: MissionCategory;
  label: string;
}[] = [
  { id: "all", label: "All Missions" },
  { id: "story", label: "Main Story" },
  { id: "heist", label: "Heists" },
  { id: "side", label: "Side Missions" },
  { id: "strangers", label: "Strangers" },
  { id: "activities", label: "Activities" },
];

export const missions: Mission[] = [
  {
    id: "the-party",
    number: "01",
    title: "The Party",
    location: "Ocean Beach",
    summary:
      "Cortez invites Tommy to a yacht party that turns into a rescue when attackers hit. Change clothes, drop Mercedes at Pole Position, then escape the shootout.",
    tags: ["Story", "Walkthrough"],
    categories: ["story"],
    imageSrc: "/images/missions/the-party.jpg",
    imageAlt:
      "Tommy Vercetti at Cortez's yacht during a neon Vice City shootout — The Party mission",
    rewards: { cash: "$500", rp: "—", stars: "—" },
    href: "/news/gta-vice-city-the-party",
    publishAt: "2026-09-24T09:00:00+05:00",
  },
  {
    id: "back-alley-brawl",
    number: "02",
    title: "Back Alley Brawl",
    location: "Vice Point",
    summary:
      "Kent Paul sends Tommy after a chef in a back alley. Win the brawl, grab the phone, then follow Lance Vance.",
    tags: ["Story", "Walkthrough", "Combat"],
    categories: ["story"],
    imageSrc: "/images/missions/back-alley-brawl.jpg",
    imageAlt:
      "Tommy Vercetti facing the chef and associates in a neon Vice City alley — Back Alley Brawl mission",
    rewards: { cash: "$500", rp: "—", stars: "—" },
    href: "/news/gta-vice-city-back-alley-brawl",
    publishAt: "2026-09-25T09:00:00+05:00",
  },
  {
    id: "jury-fury",
    number: "03",
    title: "Jury Fury",
    location: "Vice Point",
    summary:
      "Ken Rosenberg wants two jurors intimidated. Damage their cars, scare them off, and do not kill the targets.",
    tags: ["Story", "Walkthrough"],
    categories: ["story"],
    imageSrc: "/images/missions/jury-fury.jpg",
    imageAlt:
      "Tommy Vercetti with a baseball bat intimidating a juror on a neon Vice City street — Jury Fury mission",
    rewards: { cash: "$500", rp: "—", stars: "—" },
    href: "/news/gta-vice-city-jury-fury",
    publishAt: "2026-09-28T09:00:00+05:00",
  },
  {
    id: "guardian-angels",
    number: "04",
    title: "Guardian Angels",
    location: "Washington Beach",
    summary:
      "Protect Ricardo Diaz during a drug deal, survive the Haitian attack, then chase down the stolen money.",
    tags: ["Story", "Walkthrough", "Combat"],
    categories: ["story"],
    imageSrc: "/images/missions/guardian-angels.jpg",
    imageAlt:
      "Ricardo Diaz behind a teal car during a Washington Beach shootout — Guardian Angels mission",
    rewards: { cash: "$1,000", rp: "—", stars: "—" },
    href: "/news/gta-vice-city-guardian-angels",
    publishAt: "2026-09-29T09:00:00+05:00",
  },
  {
    id: "the-long-night",
    number: "05",
    title: "The Long Night",
    location: "Vice City",
    summary:
      "A routine pickup turns into chaos when a deal goes wrong. Survive the night and make your escape.",
    tags: ["Story", "Action"],
    categories: ["story"],
    imageSrc: "/images/missions/01-long-night.jpg",
    imageAlt: "Speedboat cutting across open water at sunset",
    rewards: { cash: "$210,000", rp: "3,500", stars: "500" },
  },
  {
    id: "club-inferno",
    number: "06",
    title: "Club Inferno",
    location: "Vice City",
    summary:
      "Infiltrate the hottest club in VC and take down the power behind the underground trade.",
    tags: ["Story", "Stealth"],
    categories: ["story"],
    imageSrc: "/images/missions/02-club-inferno.jpg",
    imageAlt: "Neon nightlife street scene in Vice City",
    rewards: { cash: "$185,000", rp: "2,750", stars: "450" },
  },
  {
    id: "alligator-alley",
    number: "07",
    title: "Alligator Alley",
    location: "Leonida Keys",
    summary:
      "Cross the dangerous swamps and reach the drop-off point. Watch out for what's lurking beneath.",
    tags: ["Side Mission", "Vehicle"],
    categories: ["side", "activities"],
    imageSrc: "/images/missions/03-alligator-alley.jpg",
    imageAlt: "Leonida wetlands and open country",
    rewards: { cash: "$92,000", rp: "1,450", stars: "250" },
  },
  {
    id: "federal-disturbance",
    number: "08",
    title: "Federal Disturbance",
    location: "Downtown VC",
    summary:
      "Pull off the biggest heist Vice City has ever seen. Precision, firepower and timing are everything.",
    tags: ["Heist", "Hard"],
    categories: ["heist", "story"],
    imageSrc: "/images/missions/04-federal.png",
    imageAlt: "Armed standoff in a dark urban corridor",
    rewards: { cash: "$750,000", rp: "8,000", stars: "1,000" },
  },
  {
    id: "iron-legion",
    number: "09",
    title: "Iron Legion",
    location: "Port Bellhorn",
    summary:
      "Deal with the local biker gang causing trouble on our turf.",
    tags: ["Side Mission", "Combat"],
    categories: ["side", "strangers"],
    imageSrc: "/images/missions/05-iron-legion.jpg",
    imageAlt: "Motorcycle on the coast at dusk",
    rewards: { cash: "$68,000", rp: "1,000", stars: "200" },
  },
];

/** @deprecated Prefer `missions` — kept for any leftover imports. */
export const missionPreviews = missions.map((m) => ({
  id: m.id,
  title: m.title,
  summary: m.summary,
  district: m.location,
}));

function isMissionLive(mission: Mission, now: Date = new Date()): boolean {
  if (!mission.publishAt) return true;
  const at = new Date(mission.publishAt);
  if (Number.isNaN(at.getTime())) return true;
  return at.getTime() <= now.getTime();
}

export function getMissionsByCategory(
  category: MissionCategory,
  now: Date = new Date(),
): Mission[] {
  const live = missions.filter((m) => isMissionLive(m, now));
  if (category === "all") return live;
  return live.filter((m) => m.categories.includes(category));
}
