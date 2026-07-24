/**
 * ~2.5s scroll beats + poster / character interludes.
 * Fan/dev plates from trailers — not affiliated with Rockstar.
 */
export type CinemaBeatClip = {
  id: string;
  videoSrc: string;
  posterSrc: string;
  posterAlt: string;
};

export const cinemaBeatClips: CinemaBeatClip[] = [
  {
    id: "beat-01",
    videoSrc: "/videos/cinema/beats/beat-01.mp4?v=scrub-1080",
    posterSrc: "/images/cinema/beats/beat-01.jpg?v=uhd-4k",
    posterAlt: "Jason and Lucia on a Seashark",
  },
  {
    id: "beat-02",
    videoSrc: "/videos/cinema/beats/beat-02.mp4?v=scrub-1080",
    posterSrc: "/images/cinema/beats/beat-02.jpg?v=clip13-1-4",
    posterAlt: "Couple embrace on a neon-lit street at night",
  },
  {
    id: "beat-03",
    videoSrc: "/videos/cinema/beats/beat-03.mp4?v=scrub-intra",
    posterSrc: "/images/cinema/beats/beat-03.jpg?v=2.5",
    posterAlt: "Night roadside beat",
  },
  {
    id: "beat-04",
    videoSrc: "/videos/cinema/beats/beat-04.mp4?v=scrub-intra",
    posterSrc: "/images/cinema/beats/beat-04.jpg?v=2.5",
    posterAlt: "Aerial coast beat",
  },
  {
    id: "beat-05",
    videoSrc: "/videos/cinema/beats/beat-05.mp4?v=scrub-intra",
    posterSrc: "/images/cinema/beats/beat-05.jpg?v=2.5",
    posterAlt: "Golden hour beat",
  },
  {
    id: "beat-06",
    videoSrc: "/videos/cinema/beats/beat-06.mp4?v=scrub-intra",
    posterSrc: "/images/cinema/beats/beat-06.jpg?v=2.5",
    posterAlt: "Chase pressure beat",
  },
  {
    id: "beat-blog-scrub",
    videoSrc: "/videos/cinema/beats/beat-blog-scrub.mp4?v=scrub-intra",
    posterSrc: "/images/cinema/beats/beat-blog-scrub.jpg?v=trim1s",
    posterAlt: "Hangar war-room scroll scrub plate",
  },
];

export const cinemaBeatById = Object.fromEntries(
  cinemaBeatClips.map((c) => [c.id, c]),
) as Record<string, CinemaBeatClip>;
