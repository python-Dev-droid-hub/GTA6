/**
 * RAF seek state for scroll-scrubbed <video>.
 * One in-flight seek at a time — never stacks currentTime while seeking.
 */
export type VideoScrubSeek = {
  target: number;
  current: number;
  duration: number;
  ready: boolean;
  busy: boolean;
  busySince: number;
  lastTick: number;
};

export function createVideoScrubSeek(): VideoScrubSeek {
  return {
    target: 0,
    current: 0,
    duration: 0,
    ready: false,
    busy: false,
    busySince: 0,
    lastTick: 0,
  };
}

export type VideoScrubSeekOptions = {
  lerp?: number;
  snapGap?: number;
  snapLerp?: number;
  frameDur?: number;
  busyTimeoutMs?: number;
};

function applySeek(video: HTMLVideoElement, time: number) {
  try {
    video.currentTime = time;
  } catch {
    /* ignore */
  }
}

/**
 * Smooth catch-up toward scroll target.
 * Critical: do NOT reset busySince while video.seeking — that froze reverse scrub.
 */
export function advanceVideoScrubSeek(
  video: HTMLVideoElement,
  seek: VideoScrubSeek,
  opts?: VideoScrubSeekOptions,
) {
  const {
    lerp = 0.4,
    snapGap = 0.08,
    snapLerp = 0.82,
    frameDur = 1 / 30,
    busyTimeoutMs = 28,
  } = opts ?? {};

  if (!seek.ready || seek.duration <= 0) return;

  const now = performance.now();
  const dt =
    seek.lastTick > 0
      ? Math.min(Math.max((now - seek.lastTick) / 1000, 0), 0.05)
      : 1 / 60;
  seek.lastTick = now;

  const end = Math.max(seek.duration - frameDur * 0.35, 0);
  const clamped = Math.min(Math.max(seek.target, 0), end);
  const gap = clamped - seek.current;
  const abs = Math.abs(gap);

  // Keep internal playhead close to scroll (esp. reverse)
  if (abs > 0.35) {
    seek.current = clamped;
  } else if (abs > 0.0002) {
    const base = abs > snapGap ? snapLerp : abs > snapGap * 0.35 ? 0.55 : lerp;
    const alpha = 1 - Math.pow(1 - base, dt * 60);
    seek.current += gap * alpha;
  } else {
    seek.current = clamped;
  }

  const busyExpired =
    seek.busy && now - seek.busySince > busyTimeoutMs;

  if (seek.busy && !busyExpired) {
    // Still waiting on a seek — but allow interrupt if scroll moved far (reverse scrub)
    if (Math.abs(clamped - video.currentTime) < frameDur * 2.5) {
      return;
    }
    if (abs < 0.12) return;
    // fall through: abandon stuck seek
    seek.busy = false;
  } else if (busyExpired) {
    seek.busy = false;
  }

  if (video.seeking) {
    if (!seek.busy) {
      seek.busy = true;
      seek.busySince = now;
    }
    // Do NOT refresh busySince every frame — that blocked reverse forever
    if (now - seek.busySince <= busyTimeoutMs) return;
    seek.busy = false;
  }

  const quantized = Math.round(seek.current / frameDur) * frameDur;
  const qClamped = Math.min(Math.max(quantized, 0), end);

  if (Math.abs(video.currentTime - qClamped) < frameDur * 0.3) {
    return;
  }

  seek.busy = true;
  seek.busySince = now;

  const clearBusy = () => {
    seek.busy = false;
    // Snap internal playhead to real frame after seek completes (helps reverse)
    try {
      seek.current = video.currentTime;
    } catch {
      /* ignore */
    }
    video.removeEventListener("seeked", clearBusy);
  };
  video.addEventListener("seeked", clearBusy, { once: true });

  applySeek(video, qClamped);
}
