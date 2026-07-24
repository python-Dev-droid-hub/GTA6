import Image from "next/image";
import { FaqTabs } from "@/components/sections/faq/faq-tabs";
import { JsonLd } from "@/components/seo/json-ld";
import { faqItems } from "@/data/faq";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo/json-ld";

const FAQ_BANNER_SRC = "/images/characters/lucia/05-club.png";

export const metadata = buildMetadata({
  title: "FAQ",
  description:
    "Release date, platforms, Online, PC, consoles, and account answers for Grand Theft Auto VI — fan site FAQ.",
  path: "/faq",
  image: FAQ_BANNER_SRC,
  imageAlt: "Neon nightlife in Leonida",
});

export default function FaqPage() {
  return (
    <main className="relative isolate min-h-dvh overflow-hidden bg-[#07060f]">
      <JsonLd data={faqPageJsonLd(faqItems)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />

      <div className="relative z-10 flex flex-col gap-10 pb-16 sm:gap-12 sm:pb-20">
        <section className="relative isolate min-h-[min(68vh,32rem)] overflow-hidden sm:min-h-[min(72vh,36rem)]">
          <Image
            src={FAQ_BANNER_SRC}
            alt="Neon Leonida nightlife — club crowd under pink and blue lights"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%]"
            unoptimized
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#07060f] via-transparent to-black/35"
            aria-hidden
          />

          <div className="relative z-10 flex min-h-[min(68vh,32rem)] max-w-2xl flex-col justify-end px-5 pb-12 pt-28 sm:min-h-[min(72vh,36rem)] sm:px-8 sm:pb-16 md:px-12 lg:px-16">
            <p className="font-[family-name:var(--font-family-orbitron)] text-[10px] uppercase tracking-[0.28em] text-[#ff7ad9] sm:tracking-[0.4em] sm:text-[11px]">
              Support
            </p>
            <h1
              id="faq-heading"
              className="mt-3 font-[family-name:var(--font-family-bebas)] text-[clamp(2rem,8vw,5.5rem)] uppercase leading-[0.9] tracking-[0.02em] text-white break-words"
            >
              Frequently Asked Questions
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/75 sm:text-base">
              Straight answers on release windows, platforms, Online, and this
              fan site — filtered by topic below.
            </p>
          </div>
        </section>

        <div className="px-5 sm:px-8 md:px-12 lg:px-16">
          <FaqTabs />
        </div>
      </div>
    </main>
  );
}
