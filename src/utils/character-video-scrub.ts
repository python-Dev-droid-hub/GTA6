/**
 * Shared scrub tuning for Leonida character page videos.
 * Tuned for all-intra (every-frame keyframe) clips — snappy both directions.
 */
export const CHARACTER_VIDEO_SCRUB = {
  /** Low scrub lag = tight scroll→frame sync */
  scrollScrub: 0.18,
  seek: {
    lerp: 0.55,
    snapGap: 0.05,
    snapLerp: 0.92,
    frameDur: 1 / 30,
    busyTimeoutMs: 18,
  },
} as const;

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
