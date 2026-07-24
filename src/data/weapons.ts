import type { WeaponRecord } from "@/types/content";

/** Relative 1–10 placeholders for UI — not official balance data. */
export const weapons: WeaponRecord[] = [
  {
    id: "pistol-compact",
    name: "Compact Pistol",
    class: "Sidearm",
    damage: 4,
    range: 4,
    fireRate: 5,
    summary: "Pocket problem-solver for tight hallways.",
  },
  {
    id: "smg-rapid",
    name: "Rapid SMG",
    class: "SMG",
    damage: 5,
    range: 5,
    fireRate: 8,
    summary: "Spray control decides who walks away.",
  },
  {
    id: "shotgun-pump",
    name: "Pump Shotgun",
    class: "Shotgun",
    damage: 8,
    range: 2,
    fireRate: 3,
    summary: "Doorway diplomacy.",
  },
  {
    id: "rifle-carbine",
    name: "Carbine Rifle",
    class: "Assault",
    damage: 7,
    range: 7,
    fireRate: 6,
    summary: "Mid-range workhorse when plans go loud.",
  },
  {
    id: "sniper-heavy",
    name: "Heavy Sniper",
    class: "Sniper",
    damage: 9,
    range: 10,
    fireRate: 2,
    summary: "Patience measured in heartbeats.",
  },
  {
    id: "melee-bat",
    name: "Metal Bat",
    class: "Melee",
    damage: 3,
    range: 1,
    fireRate: 4,
    summary: "Old-school persuasion.",
  },
];

export const weaponClasses = Array.from(
  new Set(weapons.map((w) => w.class)),
).sort();
