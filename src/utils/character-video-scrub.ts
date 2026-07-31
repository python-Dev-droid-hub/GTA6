/**
 * Shared scrub tuning for Leonida character page videos.
 * Tuned for all-intra (every-frame keyframe) clips — snappy both directions.
 */
export const CHARACTER_VIDEO_SCRUB = {
  /** Low scrub lag = tight scroll→frame sync */
  scrollScrub: 0.14,
  seek: {
    lerp: 0.62,
    snapGap: 0.04,
    snapLerp: 0.94,
    frameDur: 1 / 30,
    busyTimeoutMs: 22,
  },
} as const;

/** Cap startOffset so short banners keep a usable scrub span. */
export function clampClipStartOffset(
  offset: number | undefined,
  duration: number,
  fallback = 0.08,
) {
  const raw = Number.isFinite(offset) ? Number(offset) : fallback;
  if (!(duration > 0)) return Math.max(0, raw);
  const maxOffset = Math.max(duration * 0.2, 0);
  const leave = Math.min(0.35, duration * 0.55);
  return Math.min(Math.max(0, raw), Math.max(duration - leave, 0), maxOffset);
}

/** Safe defaults on scrubbed <video> elements */
export function prepareScrubVideo(
  video: HTMLVideoElement,
  preload: "none" | "metadata" | "auto" = "auto",
) {
  video.defaultMuted = true;
  video.muted = true;
  video.playsInline = true;
  video.loop = false;
  video.preload = preload;
  video.disableRemotePlayback = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  try {
    video.pause();
  } catch {
    /* ignore */
  }
}
