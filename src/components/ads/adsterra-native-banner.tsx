import { ADSTERRA } from "@/constants/ads";
import { cn } from "@/utils/cn";

export type AdsterraNativeBannerProps = {
  className?: string;
  /** Visual placement hint for layout (guide: top / middle / bottom of content) */
  placement?: "top" | "middle" | "bottom";
};

/**
 * Adsterra Native Banner — container + script in the content body.
 * Guide: Native must sit with page content (default 4×1); wrong placement hurts performance.
 */
export function AdsterraNativeBanner({
  className,
  placement = "top",
}: AdsterraNativeBannerProps) {
  return (
    <aside
      className={cn(
        "adsterra-native w-full overflow-hidden rounded-md border border-border/60 bg-ink-900/40",
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
      <p className="border-b border-border/50 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-paper-faint">
        Sponsored
      </p>
      <div
        id={ADSTERRA.native.containerId}
        className="min-h-[90px] w-full px-2 py-3 sm:px-3"
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
