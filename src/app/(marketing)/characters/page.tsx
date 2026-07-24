import { CharactersRoster } from "@/components/sections/characters/characters-roster";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Characters",
  description: "People of Leonida — Grand Theft Auto 6 roster.",
  path: "/characters",
});

export default function CharactersHubPage() {
  return (
    <main className="min-h-dvh bg-[#0c0c16]">
      <CharactersRoster />
    </main>
  );
}
