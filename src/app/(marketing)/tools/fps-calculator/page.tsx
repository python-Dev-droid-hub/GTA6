import { ToolShell } from "@/components/tools/tool-shell";
import { FpsCalculator } from "@/components/tools/fps-calculator";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "FPS calculator",
  description: "Frame-time math from a target FPS — not a hardware benchmark.",
  path: "/tools/fps-calculator",
});

export default function FpsCalculatorPage() {
  return (
    <ToolShell
      eyebrow="PC"
      title="FPS calculator"
      description="Understand millisecond budgets at 30–240Hz targets."
    >
      <FpsCalculator />
    </ToolShell>
  );
}
