import type { VehicleRecord } from "@/types/content";

/** Living fan database — stats are relative 1–10 placeholders, not official. */
export const vehicles: VehicleRecord[] = [
  {
    id: "infernus-spirit",
    name: "Infernus Spirit",
    class: "Super",
    speed: 9,
    handling: 7,
    seats: 2,
    summary: "Low profile, high ego — boulevard royalty.",
  },
  {
    id: "stallion-convertible",
    name: "Stallion Convertible",
    class: "Muscle",
    speed: 7,
    handling: 6,
    seats: 2,
    summary: "Sunburnt chrome for beach-front flex.",
  },
  {
    id: "burrito-custom",
    name: "Burrito Custom",
    class: "Van",
    speed: 5,
    handling: 5,
    seats: 4,
    summary: "Workhorse energy with questionable cargo.",
  },
  {
    id: "seashark-gt",
    name: "Seashark GT",
    class: "Boat",
    speed: 8,
    handling: 6,
    seats: 2,
    summary: "Coastal escapes measured in spray.",
  },
  {
    id: "maverick-tour",
    name: "Maverick Tour",
    class: "Helicopter",
    speed: 8,
    handling: 5,
    seats: 4,
    summary: "Skyline tourism with criminal side quests.",
  },
  {
    id: "sanchez-dirt",
    name: "Sanchez Dirt",
    class: "Bike",
    speed: 6,
    handling: 8,
    seats: 1,
    summary: "Alley stitches and dock jumps.",
  },
];

export const vehicleClasses = Array.from(
  new Set(vehicles.map((v) => v.class)),
).sort();
