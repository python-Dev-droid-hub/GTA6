export type StoryBeat = {
  id: string;
  label: string;
  title: string;
  synopsis: string;
};

export const storyBeats: StoryBeat[] = [
  {
    id: "arrival",
    label: "Arrival",
    title: "Touch down on the coast",
    synopsis:
      "Humidity, neon, and a city that measures loyalty in favors — not speeches.",
  },
  {
    id: "partnership",
    label: "Partnership",
    title: "Two names, one risk pool",
    synopsis:
      "Chemistry under pressure. When one character slips, both pay the street tax.",
  },
  {
    id: "heat",
    label: "Heat",
    title: "Jobs get louder",
    synopsis:
      "Vertical chases, wet asphalt, and the moment a plan becomes improvisation.",
  },
  {
    id: "networks",
    label: "Networks",
    title: "Everyone wants a cut",
    synopsis:
      "Brokers smile too easily. Alliances expire at sunrise. Trust is inventory.",
  },
  {
    id: "horizon",
    label: "Horizon",
    title: "Keys or skyline",
    synopsis:
      "Escape routes look romantic until you realize the map folds both ways.",
  },
];
