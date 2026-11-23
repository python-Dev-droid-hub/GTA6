import { ADSTERRA } from "@/constants/ads";
import { cn } from "@/utils/cn";

export type AdsterraNativeBannerProps = {
  className?: string;
  /** Visual placement hint for layout (guide: top / middle / bottom of content) */
  placement?: "top" | "middle" | "bottom";
};

/**
 * Adsterra Native Banner — container + script in the content body.
 * Default unit is 4×1 cards with image + title; keep the mount node
 * unconstrained so creative thumbnails are not clipped.
 */
export function AdsterraNativeBanner({
  className,
  placement = "top",
}: AdsterraNativeBannerProps) {
  return (
    <aside
      className={cn(
        "adsterra-native w-full rounded-md border border-white/15 bg-[#0a0812]/85",
        placement === "top" && "my-8 sm:my-10",
        placement === "middle" && "my-10 sm:my-12",
        placement === "bottom" && "mt-12 sm:mt-14",
        className,
      )}
      aria-label="Sponsored content"
      data-ad-network="adsterra"
      data-ad-format="native-banner"
      data-ad-placement={placement}
    >
      <p className="flex items-center gap-2 border-b border-white/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-white/45">
        <span
          className="inline-block size-1.5 rounded-full bg-[#ff7ad9]"
          aria-hidden
        />
        Sponsored
      </p>
      <div
        id={ADSTERRA.native.containerId}
        className="adsterra-native__mount w-full px-2 py-3 sm:px-3 sm:py-4"
      />
      {/* Raw script required by Adsterra — must stay in <body>, not <head> */}
      <script
        async
        data-cfasync="false"
        src={ADSTERRA.native.scriptSrc}
        {...{ fetchpriority: "high" }}
      />
    </aside>
  );
}
