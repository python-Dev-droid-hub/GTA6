import Image from "next/image";
import { Mail, MessageSquare, Shield } from "lucide-react";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { CONTACT_EMAIL } from "@/constants/contact";
import { siteConfig } from "@/constants/site";
import { buildMetadata, absoluteUrl } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";

const CONTACT_BANNER_SRC = "/images/characters/lucia/07-trailer-still.jpg";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Contact Grand Theft Auto City — send a message or email info@gtavicecity6.com for fan site questions, bookings, and partnerships.",
  path: "/contact",
  image: CONTACT_BANNER_SRC,
  imageAlt: "Vice City night scene — contact Grand Theft Auto City",
});

function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us",
    description:
      "Contact Grand Theft Auto City for fan site questions, bookings, and partnerships.",
    url: absoluteUrl("/contact"),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      email: CONTACT_EMAIL,
      url: siteConfig.url,
    },
  };
}

export default function ContactPage() {
  return (
    <main className="relative isolate min-h-dvh overflow-hidden bg-[#07060f]">
      <JsonLd data={contactPageJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <div className="relative z-10 flex flex-col gap-10 pb-16 sm:gap-12 sm:pb-20">
        <section className="relative isolate min-h-[min(68vh,32rem)] overflow-hidden sm:min-h-[min(72vh,36rem)]">
          <Image
            src={CONTACT_BANNER_SRC}
            alt="Neon Leonida night — contact Grand Theft Auto City"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%]"
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
              id="contact-heading"
              className="mt-3 font-[family-name:var(--font-family-bebas)] text-[clamp(2rem,8vw,5.5rem)] uppercase leading-[0.9] tracking-[0.02em] text-white break-words"
            >
              Contact Us
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/75 sm:text-base">
              Questions about the fan site, bookings, or partnerships — drop a
              line and we&apos;ll get back when we can.
            </p>
          </div>
        </section>

        <div className="px-5 sm:px-8 md:px-12 lg:px-16">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            <aside className="flex flex-col gap-8">
              <div>
                <p className="font-[family-name:var(--font-family-orbitron)] text-[10px] uppercase tracking-[0.28em] text-[#ff7ad9]">
                  Direct line
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-family-bebas)] text-3xl uppercase tracking-[0.04em] text-white sm:text-4xl">
                  Reach the desk
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65 sm:text-[15px]">
                  Unofficial fan site — not affiliated with Rockstar Games or
                  Take-Two Interactive. For site feedback and fan inquiries
                  only.
                </p>
              </div>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-start gap-4 border border-[#ff4fc3]/40 bg-[#0a0812]/70 p-5 transition-cinema hover:border-[#ff4fc3] hover:bg-[#0a0812] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:p-6"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#ff2d6f]/20 text-[#ff7ad9]">
                  <Mail className="size-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-[family-name:var(--font-family-orbitron)] text-[10px] uppercase tracking-[0.22em] text-white/50">
                    Email
                  </span>
                  <span className="mt-1 block break-all font-[family-name:var(--font-family-bebas)] text-xl tracking-[0.04em] text-white transition-colors group-hover:text-[#ff7ad9] sm:text-2xl">
                    {CONTACT_EMAIL}
                  </span>
                </span>
              </a>

              <ul className="space-y-4 text-sm text-white/60">
                <li className="flex gap-3">
                  <MessageSquare
                    className="mt-0.5 size-4 shrink-0 text-[#5ad7ff]"
                    aria-hidden
                  />
                  <span>
                    Use the form for general questions, booking notes, or site
                    feedback.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Shield
                    className="mt-0.5 size-4 shrink-0 text-[#5ad7ff]"
                    aria-hidden
                  />
                  <span>
                    We don&apos;t handle Rockstar account support, refunds, or
                    official store issues.
                  </span>
                </li>
              </ul>
            </aside>

            <section aria-labelledby="contact-form-heading">
              <h2
                id="contact-form-heading"
                className="mb-5 font-[family-name:var(--font-family-bebas)] text-2xl uppercase tracking-[0.06em] text-white sm:mb-6 sm:text-3xl"
              >
                Send a message
              </h2>
              <ContactForm />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
