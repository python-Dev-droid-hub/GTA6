import { ExperienceProviders } from "@/providers/experience-providers";
import { MarketingShell } from "@/components/layouts/marketing-shell";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ExperienceProviders>
      <MarketingShell>{children}</MarketingShell>
    </ExperienceProviders>
  );
}
