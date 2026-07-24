"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export type QuoteCrossfadeProps = {
  quotes: string[];
  className?: string;
};

/**
 * Quote lines crossfade in ~when section is mid-viewport, stagger out on leave.
 */
export function QuoteCrossfade({ quotes, className }: QuoteCrossfadeProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {quotes.map((quote, index) => (
        <motion.p
          key={`${index}-${quote.slice(0, 24)}`}
          className="max-w-md font-display text-xl leading-snug tracking-[0.02em] text-paper md:text-2xl lg:text-3xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          viewport={{ amount: 0.35, once: false }}
          transition={{
            duration: 0.55,
            delay: 0.12 + index * 0.14,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="text-vice-pink">“</span>
          {quote}
          <span className="text-vice-pink">”</span>
        </motion.p>
      ))}
    </div>
  );
}
