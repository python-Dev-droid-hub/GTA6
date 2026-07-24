export type ToolMeta = {
  id: string;
  title: string;
  description: string;
  href: string;
  status: "live" | "soon";
  eyebrow: string;
};

export const toolsCatalog: ToolMeta[] = [
  {
    id: "map",
    title: "Interactive map",
    description: "Explore fan-mapped districts across the neon coast.",
    href: "/tools/map",
    status: "live",
    eyebrow: "World",
  },
  {
    id: "release-converter",
    title: "Release time converter",
    description: "Convert the launch window to your local timezone.",
    href: "/tools/release-converter",
    status: "live",
    eyebrow: "Release",
  },
  {
    id: "fps-calculator",
    title: "FPS calculator",
    description: "Rough frame-time math from a target FPS — not a benchmark.",
    href: "/tools/fps-calculator",
    status: "live",
    eyebrow: "PC",
  },
  {
    id: "pc-checker",
    title: "PC compatibility checker",
    description: "Heuristic readiness check until official specs exist.",
    href: "/tools/pc-checker",
    status: "live",
    eyebrow: "PC",
  },
  {
    id: "search",
    title: "Site search",
    description: "Search news, characters, guides, and tools.",
    href: "/search",
    status: "live",
    eyebrow: "Discover",
  },
];
