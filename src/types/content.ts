export type ArticleFrontmatter = {
  title: string;
  description: string;
  date: string;
  tag: string;
  cover: string;
  coverAlt: string;
  draft?: boolean;
};

export type CharacterFrontmatter = {
  name: string;
  role: string;
  blurb: string;
  portrait: string;
  portraitAlt: string;
  order?: number;
  status?: string;
  affiliations?: string[];
  draft?: boolean;
};

export type GuideFrontmatter = {
  title: string;
  description: string;
  category: string;
  date: string;
  cover?: string;
  draft?: boolean;
};

export type VehicleRecord = {
  id: string;
  name: string;
  class: string;
  speed: number;
  handling: number;
  seats: number;
  summary: string;
};

export type WeaponRecord = {
  id: string;
  name: string;
  class: string;
  damage: number;
  range: number;
  fireRate: number;
  summary: string;
};

export type WallpaperRecord = {
  id: string;
  title: string;
  src: string;
  alt: string;
  aspect: "16:9" | "9:16" | "1:1";
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};
