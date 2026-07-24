export type HeroCta = {
  label: string;
  href: string;
  variant: "primary" | "outline" | "gradient";
  external?: boolean;
};

export type HomeHeroContent = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  posterSrc: string;
  posterAlt: string;
  /** Optional local MP4 under /public; omitted = poster-only until asset ships */
  videoSrc?: string;
  videoWebmSrc?: string;
  /** Scroll distance while video is pinned, in viewport heights */
  scrubVh?: number;
  ctas: HeroCta[];
  scrollTargetId: string;
  scrollLabel: string;
};
