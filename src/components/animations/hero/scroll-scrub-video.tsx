"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

export type ScrollScrubVideoProps = {
  frames: readonly string[];
  sectionHeight?: string;
  posterSrc?: string;
  posterAlt?: string;
  id?: string;
  ariaLabel?: string;
  className?: string;
  children?: ReactNode;
  lerp?: number;
  onReady?: () => void;
  /** Progress when overlay reaches full opacity (0–1). */
  overlayEnterAt?: number;
  /** Progress when overlay starts exiting (0–1). */
  overlayExitAt?: number;
  /** Scrim side for readable type. */
  scrim?: "left" | "right" | "none";
  /** Soften pin edge so chapters feel continuous. */
  seamless?: boolean;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

/**
 * Canvas image-sequence scrub with mid-chapter copy (enter → hold → exit)
 * while frames keep scrubbing — Leonida-style linked chapters.
 */
export function ScrollScrubVideo({
  frames,
  sectionHeight = "280vh",
  posterSrc,
  posterAlt = "Cinematic sequence",
  id,
  ariaLabel = "Scroll-driven cinematic sequence",
  className,
  children,
  lerp = 0.14,
  onReady,
  overlayEnterAt = 0.06,
  overlayExitAt = 0.55,
  scrim = "left",
  seamless = false,
}: ScrollScrubVideoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(0);
  const renderFrameRef = useRef(0);
  const progressRef = useRef({ value: 0 });
  const reducedMotion = usePrefersReducedMotion();

  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const total = frames.length;
  const motionOn = !reducedMotion && !failed && total > 1;
  const enterAt = clamp(overlayEnterAt, 0, 0.4);
  const exitAt = clamp(overlayExitAt, enterAt + 0.12, 0.92);

  useEffect(() => {
    if (!motionOn) {
      setReady(true);
      onReady?.();
      return;
    }

    let cancelled = false;
    const images: HTMLImageElement[] = new Array(total);
    let loaded = 0;

    const bump = () => {
      loaded += 1;
      if (cancelled) return;
      setLoadProgress(loaded / total);
      if (loaded >= total) {
        imagesRef.current = images;
        setReady(true);
        onReady?.();
      }
    };

    frames.forEach((src, i) => {
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
  }, [frames, motionOn, total, onReady]);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img?.complete || !img.naturalWidth) return;

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

    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  };

  useEffect(() => {
    if (!motionOn || !ready) return;
    let raf = 0;
    const tick = () => {
      const target = targetFrameRef.current;
      const current = renderFrameRef.current;
      renderFrameRef.current = current + (target - current) * lerp;
      drawFrame(clamp(Math.round(renderFrameRef.current), 0, total - 1));
      raf = requestAnimationFrame(tick);
    };
    drawFrame(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [motionOn, ready, lerp, total]);

  useLayoutEffect(() => {
    if (!motionOn || !ready) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    const overlay = overlayRef.current;
    if (!section || !pin) return;

    const proxy = progressRef.current;
    proxy.value = 0;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin,
          scrub: 1.25,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        proxy,
        {
          value: 1,
          duration: 1,
          onUpdate: () => {
            targetFrameRef.current = proxy.value * (total - 1);
          },
        },
        0,
      );

      if (overlay) {
        gsap.set(overlay, { opacity: 0, y: 36, filter: "blur(8px)" });

        // Enter
        tl.to(
          overlay,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: Math.max(enterAt, 0.04),
            ease: "power2.out",
          },
          0,
        );

        // Hold through mid scrub
        const hold = Math.max(exitAt - enterAt, 0.08);
        tl.to(overlay, { opacity: 1, duration: hold, ease: "none" }, enterAt);

        // Exit while frames continue
        tl.to(
          overlay,
          {
            opacity: 0,
            y: -56,
            filter: "blur(10px)",
            duration: Math.min(1 - exitAt, 0.35),
            ease: "power2.in",
            onUpdate: function pe() {
              overlay.style.pointerEvents =
                this.progress() > 0.65 ? "none" : "auto";
            },
          },
          exitAt,
        );
      }
    }, section);

    const onResize = () => {
      ScrollTrigger.refresh();
      drawFrame(clamp(Math.round(renderFrameRef.current), 0, total - 1));
    };
    window.addEventListener("resize", onResize);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [motionOn, ready, total, enterAt, exitAt]);

  const showLoader = motionOn && !ready && !failed;
  const showPoster = !motionOn || !ready || failed;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative isolate bg-ink-950",
        seamless && "-mt-[12vh]",
        className,
      )}
      style={motionOn ? { height: sectionHeight } : undefined}
      aria-label={ariaLabel}
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

          {scrim !== "none" ? (
            <div
              className={cn(
                "pointer-events-none absolute inset-0",
                scrim === "left" && "hero-scrub-scrim",
                scrim === "right" && "hero-scrub-scrim-right",
              )}
              aria-hidden
            />
          ) : null}

          {showLoader ? (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-ink-950/80">
              <div
                className="h-10 w-10 animate-spin rounded-full border-2 border-paper/20 border-t-[#39ff14]"
                aria-hidden
              />
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-paper-muted">
                Loading {Math.round(loadProgress * 100)}%
              </p>
            </div>
          ) : null}
        </div>

        {children ? (
          <div
            ref={overlayRef}
            className="relative z-20 flex min-h-dvh w-full flex-col justify-end will-change-transform"
          >
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
