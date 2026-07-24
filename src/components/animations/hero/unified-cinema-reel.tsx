"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

export type CinemaReelChapter = {
  id: string;
  /** video = scrub frames; poster = hold still + card UI */
  kind?: "video" | "poster";
  frames?: readonly string[];
  /** Single hold image for poster interludes (drawn on canvas behind card) */
  holdImage?: string;
  weight?: number;
  content: ReactNode;
  scrim?: "left" | "right" | "none";
};

export type UnifiedCinemaReelProps = {
  chapters: CinemaReelChapter[];
  sectionHeight?: string;
  posterSrc?: string;
  posterAlt?: string;
  id?: string;
  className?: string;
  lerp?: number;
};

type ChapterWindow = {
  id: string;
  kind: "video" | "poster";
  start: number;
  end: number;
  frameOffset: number;
  frameCount: number;
  scrim: "left" | "right" | "none";
  holdIndex: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

/**
 * Continuous reel: video scrub chapters + poster/CTA interludes in one pin.
 */
export function UnifiedCinemaReel({
  chapters,
  sectionHeight = "1100vh",
  posterSrc,
  posterAlt = "Cinematic reel",
  id = "cinema-reel",
  className,
  lerp = 0.16,
}: UnifiedCinemaReelProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(0);
  const renderFrameRef = useRef(0);
  const reduced = usePrefersReducedMotion();

  const [ready, setReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [failed, setFailed] = useState(false);
  const [activeScrim, setActiveScrim] = useState<"left" | "right" | "none">(
    chapters[0]?.scrim ?? "left",
  );

  const { flatFrames, windows, totalFrames } = useMemo(() => {
    const flat: string[] = [];
    const weights = chapters.map((c) => c.weight ?? 1);
    const sum = weights.reduce((a, b) => a + b, 0) || 1;
    let cursor = 0;
    const wins: ChapterWindow[] = [];

    chapters.forEach((c, i) => {
      const kind = c.kind ?? "video";
      const startFrames = flat.length;
      if (kind === "video" && c.frames?.length) {
        flat.push(...c.frames);
      } else if (c.holdImage) {
        flat.push(c.holdImage);
      } else if (c.frames?.[0]) {
        flat.push(c.frames[0]);
      }
      const count = Math.max(flat.length - startFrames, 1);
      const span = weights[i] / sum;
      wins.push({
        id: c.id,
        kind,
        start: cursor,
        end: cursor + span,
        frameOffset: startFrames,
        frameCount: count,
        scrim: c.scrim ?? (kind === "poster" ? "none" : "left"),
        holdIndex: startFrames,
      });
      cursor += span;
    });

    return { flatFrames: flat, windows: wins, totalFrames: flat.length };
  }, [chapters]);

  const motionOn = !reduced && !failed && totalFrames > 0;

  useEffect(() => {
    if (!motionOn) {
      setReady(true);
      return;
    }
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(totalFrames);
    let loaded = 0;
    const bump = () => {
      loaded += 1;
      if (cancelled) return;
      setLoadProgress(loaded / totalFrames);
      if (loaded >= totalFrames) {
        imagesRef.current = images;
        setReady(true);
      }
    };
    flatFrames.forEach((src, i) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = bump;
      img.onerror = () => {
        if (!cancelled) setFailed(true);
        bump();
      };
      img.src = src;
      images[i] = img;
    });
    return () => {
      cancelled = true;
    };
  }, [flatFrames, motionOn, totalFrames]);

  const drawCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    w: number,
    h: number,
    alpha: number,
  ) => {
    if (!img?.complete || !img.naturalWidth || alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    ctx.restore();
  };

  const frameForProgress = (p: number) => {
    const win =
      windows.find((w) => p >= w.start && p < w.end) ??
      windows[windows.length - 1];
    if (!win) return 0;
    if (win.kind === "poster" || win.frameCount <= 1) return win.holdIndex;
    const local = (p - win.start) / Math.max(win.end - win.start, 0.001);
    return win.frameOffset + local * (win.frameCount - 1);
  };

  const paint = (globalFrame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const bw = Math.max(1, Math.floor(w * dpr));
    const bh = Math.max(1, Math.floor(h * dpr));
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#03040a";
    ctx.fillRect(0, 0, w, h);
    const idx = clamp(Math.round(globalFrame), 0, Math.max(totalFrames - 1, 0));
    drawCover(ctx, imagesRef.current[idx], w, h, 1);
  };

  useEffect(() => {
    if (!motionOn || !ready) return;
    let raf = 0;
    const tick = () => {
      renderFrameRef.current +=
        (targetFrameRef.current - renderFrameRef.current) * lerp;
      paint(renderFrameRef.current);
      raf = requestAnimationFrame(tick);
    };
    paint(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [motionOn, ready, lerp, totalFrames]);

  useLayoutEffect(() => {
    if (!motionOn || !ready) return;
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      const proxy = { value: 0 };
      gsap.to(proxy, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin,
          scrub: 1.05,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            targetFrameRef.current = frameForProgress(p);

            const win =
              windows.find((w) => p >= w.start && p < w.end) ??
              windows[windows.length - 1];
            if (win) setActiveScrim(win.scrim);

            windows.forEach((w, i) => {
              const el = overlayRefs.current[i];
              if (!el) return;
              const local = (p - w.start) / Math.max(w.end - w.start, 0.001);
              let opacity = 0;
              let y = 28;
              if (w.kind === "poster") {
                // Poster cards stay visible longer in their window
                if (local > 0.05 && local < 0.92) {
                  const enter = clamp((local - 0.05) / 0.1, 0, 1);
                  const exit = clamp((0.92 - local) / 0.1, 0, 1);
                  opacity = Math.min(enter, exit);
                  y = (1 - opacity) * 36;
                }
              } else if (local > 0.08 && local < 0.78) {
                const enter = clamp((local - 0.08) / 0.12, 0, 1);
                const exit = clamp((0.78 - local) / 0.12, 0, 1);
                opacity = Math.min(enter, exit);
                y = (1 - opacity) * 28;
              }
              el.style.opacity = String(opacity);
              el.style.transform = `translate3d(0, ${y}px, 0)`;
              el.style.pointerEvents = opacity > 0.35 ? "auto" : "none";
              el.style.filter = `blur(${(1 - opacity) * 8}px)`;
            });
          },
        },
      });
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [motionOn, ready, totalFrames, windows]);

  const showLoader = motionOn && !ready && !failed;
  const showPoster = !motionOn || !ready || failed;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("relative isolate bg-ink-950", className)}
      style={motionOn ? { height: sectionHeight } : undefined}
      aria-label="Continuous cinematic reel"
    >
      <div
        ref={pinRef}
        className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-ink-950"
      >
        <div className="absolute inset-0">
          <canvas
            ref={canvasRef}
            className={cn(
              "absolute inset-0 size-full",
              showPoster ? "opacity-0" : "opacity-100",
            )}
            aria-hidden
          />
          {posterSrc && showPoster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={posterSrc}
              alt={posterAlt}
              className="absolute inset-0 size-full object-cover"
            />
          ) : null}

          {activeScrim !== "none" ? (
            <div
              className={cn(
                "pointer-events-none absolute inset-0",
                activeScrim === "left" && "hero-scrub-scrim",
                activeScrim === "right" && "hero-scrub-scrim-right",
              )}
              aria-hidden
            />
          ) : null}

          {showLoader ? (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-ink-950/85">
              <div
                className="h-10 w-10 animate-spin rounded-full border-2 border-paper/20 border-t-[#39ff14]"
                aria-hidden
              />
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-paper-muted">
                Loading reel {Math.round(loadProgress * 100)}%
              </p>
            </div>
          ) : null}
        </div>

        <div className="pointer-events-none relative z-20 flex min-h-dvh w-full flex-col justify-end">
          {chapters.map((chapter, i) => (
            <div
              key={chapter.id}
              ref={(el) => {
                overlayRefs.current[i] = el;
              }}
              className={cn(
                "pointer-events-none absolute inset-0 flex will-change-transform",
                chapter.kind === "poster"
                  ? "items-center justify-center"
                  : "flex-col justify-end",
              )}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {chapter.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
