import { ExperienceProviders } from "@/providers/experience-providers";
import { SkipToContent } from "@/components/layouts/skip-to-content";

/**
 * Full-bleed cinema routes — no marketing footer / default header chrome.
 */
export default function CinematicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ExperienceProviders>
      <SkipToContent targetId="cinematic-root" label="Skip to experience" />
      {children}
    </ExperienceProviders>
  );
}
