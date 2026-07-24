import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} Fan Experience`,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#03040a",
    theme_color: "#03040a",
    lang: "en",
    icons: [
      {
        src: siteConfig.ogImage,
        sizes: "any",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
    categories: ["entertainment", "games"],
  };
}
