"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/utils/cn";

export type TrailerModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  youtubeId?: string;
  videoSrc?: string;
  /** Inclusive start (seconds) for clipped playback */
  startSeconds?: number;
  /** Exclusive end (seconds) — stops / YouTube end= */
  endSeconds?: number;
};

/**
 * Why portal + mount-on-open: keep YouTube/iframe out of the initial bundle/DOM
 * until the user explicitly plays.
 */
export function TrailerModal({
  open,
  onClose,
  title,
  youtubeId,
  videoSrc,
  startSeconds,
  endSeconds,
}: TrailerModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const start = Math.max(0, startSeconds ?? 0);
  const end = endSeconds;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !videoSrc) return;
    const video = videoElRef.current;
    if (!video) return;

    const clampStart = () => {
      try {
        if (video.currentTime < start) video.currentTime = start;
      } catch {
        /* ignore */
      }
    };

    const onTimeUpdate = () => {
      if (end != null && video.currentTime >= end) {
        video.pause();
        try {
          video.currentTime = end;
        } catch {
          /* ignore */
        }
      }
    };

    const onLoaded = () => {
      clampStart();
      void video.play().catch(() => undefined);
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTimeUpdate);
    if (video.readyState >= 1) onLoaded();

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [open, videoSrc, start, end]);

  if (!mounted || !open) return null;

  const ytParams = new URLSearchParams({
    autoplay: "1",
    rel: "0",
  });
  if (start > 0) ytParams.set("start", String(Math.floor(start)));
  if (end != null) ytParams.set("end", String(Math.floor(end)));

  const embed: ReactNode = videoSrc ? (
    <video
      ref={videoElRef}
      className="size-full object-contain"
      src={videoSrc}
      controls
      autoPlay
      playsInline
    />
  ) : youtubeId ? (
    <iframe
      className="size-full"
      src={`https://www.youtube-nocookie.com/embed/${youtubeId}?${ytParams}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ) : (
    <p className="p-8 text-center text-paper-muted">Trailer unavailable.</p>
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink-950/85 backdrop-blur-sm"
        aria-label="Close trailer"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl flex-col gap-2.5 sm:gap-3">
        <div className="flex shrink-0 items-center justify-between gap-4">
          <h2
            id={titleId}
            className="font-display text-base uppercase tracking-[0.14em] text-paper sm:text-lg md:text-xl"
          >
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded-md border border-border-strong bg-ink-800 p-2 text-paper transition-cinema hover:border-vice-pink hover:text-vice-pink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label="Close"
          >
            <Icon icon={X} size={18} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center">
          <div
            className="aspect-video max-h-full w-full overflow-hidden rounded-lg border border-border bg-ink-900 shadow-lg"
            style={{
              width: "min(100%, calc((100dvh - 5.5rem) * 16 / 9))",
              maxHeight: "calc(100dvh - 5.5rem)",
            }}
          >
            {embed}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export type TrailerFacadeProps = {
  title: string;
  posterSrc: string;
  posterAlt: string;
  durationLabel: string;
  youtubeId?: string;
  videoSrc?: string;
  className?: string;
};

/** Click-to-load facade — poster is the only media until play. */
export function TrailerFacade({
  title,
  posterSrc,
  posterAlt,
  durationLabel,
  youtubeId,
  videoSrc,
  className,
}: TrailerFacadeProps) {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group relative block w-full overflow-hidden rounded-lg border border-border-strong",
          "text-left transition-cinema hover:border-vice-pink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
          className,
        )}
        aria-label={`Play ${title}`}
      >
        <span className="relative block aspect-video w-full bg-ink-900">
          <Image
            src={posterSrc}
            alt={posterAlt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover transition-cinema group-hover:scale-[1.03]"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-ink" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-16 items-center justify-center rounded-full border border-paper/30 bg-ink-950/50 text-paper shadow-glow-pink backdrop-blur-sm transition-cinema group-hover:scale-110 group-hover:border-vice-pink sm:size-20">
              <span
                className="ml-1 size-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-paper"
                aria-hidden="true"
              />
            </span>
          </span>
          <span className="absolute bottom-3 right-3 rounded-sm bg-ink-950/80 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper">
            {durationLabel}
          </span>
        </span>
      </button>

      <TrailerModal
        open={open}
        onClose={onClose}
        title={title}
        youtubeId={youtubeId}
        videoSrc={videoSrc}
      />
    </>
  );
}
