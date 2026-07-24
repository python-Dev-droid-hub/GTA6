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
    id: "the-long-night",
    number: "01",
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
    number: "02",
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
    number: "03",
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
    number: "04",
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
    number: "05",
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

export function getMissionsByCategory(category: MissionCategory): Mission[] {
  if (category === "all") return missions;
  return missions.filter((m) => m.categories.includes(category));
}
