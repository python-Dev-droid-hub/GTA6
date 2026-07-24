import { notFound } from "next/navigation";
import { LeonidaCharacterDetail } from "@/components/sections/characters/leonida-character-detail";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BackLink } from "@/components/layouts/content-hero";
import { JsonLd } from "@/components/seo/json-ld";
import Image from "next/image";
import {
  getCharacterBySlug,
  getCharacterSlugs,
} from "@/lib/mdx/characters";
import {
  getLeonidaCharacter,
  getLeonidaSlugs,
} from "@/data/leonida-characters";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/seo/json-ld";
import { spacing } from "@/constants/design";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const mdx = getCharacterSlugs();
  const leonida = getLeonidaSlugs();
  return [...new Set([...mdx, ...leonida])].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const leonida = getLeonidaCharacter(slug);
  if (leonida) {
    return buildMetadata({
      title: leonida.name,
      description: leonida.tagline,
      path: `/characters/${slug}`,
      image: leonida.heroSrc,
      imageAlt: leonida.heroAlt,
      tags: ["Characters", "Only in Leonida"],
    });
  }

  const character = await getCharacterBySlug(slug);
  if (!character) return {};
  return buildMetadata({
    title: character.meta.name,
    description: character.meta.blurb,
    path: `/characters/${slug}`,
    image: character.meta.portrait,
    imageAlt: character.meta.portraitAlt,
    tags: [character.meta.role],
  });
}

export default async function CharacterDossierPage({ params }: Props) {
  const { slug } = await params;

  const leonida = getLeonidaCharacter(slug);
  if (leonida) {
    return (
      <main className="bg-[#07060f]">
        <JsonLd
          data={personJsonLd({
            name: leonida.name,
            description: leonida.tagline,
            image: leonida.heroSrc,
            url: `/characters/${slug}`,
          })}
        />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Characters", path: "/characters" },
            { name: leonida.name, path: `/characters/${slug}` },
          ])}
        />
        <LeonidaCharacterDetail character={leonida} />
      </main>
    );
  }

  const character = await getCharacterBySlug(slug);
  if (!character) notFound();

  const { meta, body } = character;

  return (
    <main>
      <JsonLd
        data={personJsonLd({
          name: meta.name,
          description: meta.blurb,
          image: meta.portrait,
          url: `/characters/${slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Characters", path: "/characters" },
          { name: meta.name, path: `/characters/${slug}` },
        ])}
      />
      <Container size="wide" className={spacing.sectionY}>
        <BackLink href="/characters" label="Character hub" />
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border bg-ink-900">
            <Image
              src={meta.portrait}
              alt={meta.portraitAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="pink">{meta.role}</Badge>
              {meta.status ? <Badge variant="cyan">{meta.status}</Badge> : null}
            </div>
            <h1 className="font-display text-4xl uppercase tracking-[0.06em] text-paper sm:text-5xl md:text-6xl">
              {meta.name}
            </h1>
            <p className="text-lead max-w-xl">{meta.blurb}</p>
            {meta.affiliations?.length ? (
              <ul className="flex flex-wrap gap-2">
                {meta.affiliations.map((tag) => (
                  <li key={tag}>
                    <Badge variant="outline">{tag}</Badge>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="prose-vice border-t border-border pt-8">{body}</div>
          </div>
        </div>
      </Container>
    </main>
  );
}
