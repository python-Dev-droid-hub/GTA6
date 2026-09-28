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
    id: "sir-yes-sir",
    number: "05",
    title: "Sir, Yes Sir!",
    location: "Little Haiti",
    summary:
      "Phil Cassidy wants a Rhino. Stop the army convoy, steal the tank, then deliver it before the military closes in.",
    tags: ["Story", "Walkthrough", "Vehicle"],
    categories: ["story"],
    imageSrc: "/images/missions/sir-yes-sir.jpg",
    imageAlt:
      "Rhino tank leading a military convoy through neon Vice City — Sir, Yes Sir! mission",
    rewards: { cash: "$1,000", rp: "—", stars: "—" },
    href: "/news/gta-vice-city-sir-yes-sir",
    publishAt: "2026-09-30T09:00:00+05:00",
  },
  {
    id: "shakedown",
    number: "06",
    title: "Shakedown",
    location: "Vice City",
    summary:
      "From the Vercetti Estate, smash store windows across town before the timer runs out. Speed and route matter more than fights.",
    tags: ["Story", "Walkthrough", "Driving"],
    categories: ["story"],
    imageSrc: "/images/missions/shakedown.jpg",
    imageAlt:
      "Tommy Vercetti speeding past a shattered beauty supply storefront in neon Vice City — Shakedown mission",
    rewards: { cash: "$1,000", rp: "—", stars: "—" },
    href: "/news/gta-vice-city-shakedown",
    publishAt: "2026-10-01T09:00:00+05:00",
  },
  {
    id: "the-job",
    number: "07",
    title: "The Job",
    location: "Little Havana",
    summary:
      "Rob El Banco Corrupto Grande with the crew, survive the police ambush, protect Hilary, then lose the heat on the getaway.",
    tags: ["Story", "Walkthrough", "Heist"],
    categories: ["story", "heist"],
    imageSrc: "/images/missions/the-job.jpg",
    imageAlt:
      "Tommy Vercetti and crew during a bank heist shootout at El Banco Corrupto Grande — The Job mission",
    rewards: { cash: "$50,000", rp: "—", stars: "—" },
    href: "/news/gta-vice-city-the-job",
    publishAt: "2026-10-02T09:00:00+05:00",
  },
  {
    id: "keep-your-friends-close",
    number: "08",
    title: "Keep Your Friends Close...",
    location: "Vercetti Estate",
    summary:
      "Defend the mansion from Sonny Forelli’s gang, deal with Lance’s betrayal, then finish the final confrontation.",
    tags: ["Story", "Walkthrough", "Final"],
    categories: ["story"],
    imageSrc: "/images/missions/keep-your-friends-close.jpg",
    imageAlt:
      "Tommy Vercetti defending the Vercetti Estate during the final shootout — Keep Your Friends Close... mission",
    rewards: { cash: "Finale", rp: "—", stars: "—" },
    href: "/news/gta-vice-city-keep-your-friends-close",
    publishAt: "2026-10-05T09:00:00+05:00",
  },
  {
    id: "an-old-friend",
    number: "09",
    title: "An Old Friend",
    location: "Escobar International Airport",
    summary:
      "Tommy arrives in Vice City. Leave the airport, drive to Ken Rosenberg’s office, and finish the opening mission.",
    tags: ["Story", "Walkthrough", "Intro"],
    categories: ["story"],
    imageSrc: "/images/missions/an-old-friend.jpg",
    imageAlt:
      "Tommy Vercetti at Escobar International Airport at sunset — An Old Friend opening mission",
    rewards: { cash: "—", rp: "—", stars: "—" },
    href: "/news/gta-vice-city-an-old-friend",
    publishAt: "2026-10-06T09:00:00+05:00",
  },
  {
    id: "riot",
    number: "10",
    title: "Riot",
    location: "Washington Beach",
    summary:
      "Avery Carrington wants chaos at a workers’ protest. Change clothes, start the fight, hit the targets, then get out before the cops close in.",
    tags: ["Story", "Walkthrough"],
    categories: ["story"],
    imageSrc: "/images/missions/riot.jpg",
    imageAlt:
      "Riot at a Vice City Construction site with workers fighting at sunset — Riot mission",
    rewards: { cash: "$500", rp: "—", stars: "—" },
    href: "/news/gta-vice-city-riot",
    publishAt: "2026-10-07T09:00:00+05:00",
  },
  {
    id: "all-hands-on-deck",
    number: "11",
    title: "All Hands-on Deck!",
    location: "Viceport",
    summary:
      "Protect Colonel Cortez’s yacht from boats and helicopters until he escapes Vice City.",
    tags: ["Story", "Walkthrough", "Combat"],
    categories: ["story"],
    imageSrc: "/images/missions/all-hands-on-deck.jpg",
    imageAlt:
      "GTA Vice City All Hands-on Deck mission with Tommy protecting Colonel Cortez's yacht from attacking boats and helicopters",
    rewards: { cash: "$2,000", rp: "—", stars: "—" },
    href: "/news/gta-vice-city-all-hands-on-deck-mission-guide",
    publishAt: "2026-10-08T09:00:00+05:00",
  },
  {
    id: "mall-shootout",
    number: "12",
    title: "Mall Shootout",
    location: "Washington Beach",
    summary:
      "Meet a contact at Washington Beach Mall, survive the shootout, then chase down the escaping target.",
    tags: ["Story", "Walkthrough", "Combat"],
    categories: ["story"],
    imageSrc: "/images/missions/mall-shootout.jpg",
    imageAlt: "GTA Vice City Mall Shootout mission at Washington Beach Mall",
    rewards: { cash: "$500", rp: "—", stars: "—" },
    href: "/news/gta-vice-city-mall-shootout-mission-guide",
    publishAt: "2026-10-09T09:00:00+05:00",
  },
  {
    id: "the-long-night",
    number: "13",
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
    number: "14",
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
    number: "15",
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
    number: "16",
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
    number: "17",
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
