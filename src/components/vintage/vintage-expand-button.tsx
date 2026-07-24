import { cn } from "@/utils/cn";

type Tone = "dark" | "pink" | "cyan";

const tones: Record<Tone, string> = {
  dark: "bg-ink-950/75 text-paper border-white/20 hover:bg-ink-950/90",
  pink: "bg-[#f2a0b8] text-ink-950 border-transparent hover:brightness-110",
  cyan: "bg-[#7ef9ff]/90 text-ink-950 border-transparent hover:brightness-110",
};

export function VintageExpandButton({
  onClick,
  label,
  tone = "dark",
  className,
}: {
  onClick?: () => void;
  label: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "absolute bottom-3 right-3 z-10 flex size-9 items-center justify-center rounded-full border backdrop-blur-sm transition-cinema",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        tones[tone],
        className,
      )}
      aria-label={label}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <path
          d="M1 5V1h4M13 5V1H9M1 9v4h4M13 9v4H9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
