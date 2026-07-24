import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { buildMetadata } from "@/lib/seo/metadata";
import { spacing } from "@/constants/design";

export const metadata = buildMetadata({
  title: "Page not found",
  description: "This route does not exist on the Vice City fan experience.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className={spacing.sectionY}>
      <Container size="narrow" className="flex flex-col items-start gap-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-neon-cyan">
          404
        </p>
        <h1 className="font-display text-4xl uppercase tracking-[0.06em] text-paper sm:text-5xl">
          Lost in the neon
        </h1>
        <p className="text-lead">
          That page is not on the map. Head home or search the coast.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/" variant="gradient">
            Home
          </ButtonLink>
          <ButtonLink href="/search" variant="outline">
            Search
          </ButtonLink>
          <Link
            href="/tools/map"
            className="font-mono text-xs uppercase tracking-[0.2em] text-paper-muted self-center hover:text-paper"
          >
            Open map
          </Link>
        </div>
      </Container>
    </main>
  );
}
