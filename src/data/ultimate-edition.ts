/**
 * Palmneon Ultimate Edition — horizontal cinema chapters.
 * Image order matches asset section names. Fan/dev only.
 */

export type UltimateGalleryItem = {
  id: string;
  src: string;
  alt: string;
  aspect: "landscape" | "portrait" | "square" | "tall";
};

export type UltimateHeroPanel = {
  type: "hero";
  id: string;
  imageSrc: string;
  imageAlt: string;
  label: string;
  title: string;
  body: string;
  /** Optional second paragraph (split intro) */
  bodyExtra?: string;
  shadeWidth?: "20" | "25" | "30";
  /** split = image left + solid plum panel right (first section only) */
  layout?: "overlay" | "split";
};

export type UltimateGalleryPanel = {
  type: "gallery";
  id: string;
  items: UltimateGalleryItem[];
};

export type UltimatePanel = UltimateHeroPanel | UltimateGalleryPanel;

const img = (name: string) => `/images/ultimate/${name}?v=2k-g`;

export const ultimateEdition = {
  title: "Ultimate Edition",
  subtitle: "Exclusive looks, heat, and hardware across the coast.",
  preOrderHref: "https://www.rockstargames.com/VI",
  preOrderLabel: "Pre-Order Now",
  backHref: "/",
  panels: [
    // 1 — Ultimate Edition
    {
      type: "hero",
      id: "ultimate",
      layout: "split",
      imageSrc: img("ultimate-main.png"),
      imageAlt: "Ultimate Edition key art",
      label: "Edition",
      title: "Ultimate Edition",
      body: "Welcome to Grand Theft Auto 6 — the coast where anything goes. Seize everything this massive world has to offer with Ultimate Edition: premium vehicles, weapons, apparel, and action around every corner.",
      bodyExtra:
        "Ultimate Edition bonuses are threaded across the story, with new drops uncovered behind each chapter.",
      shadeWidth: "30",
    },

    // 2 — Vehicle
    {
      type: "hero",
      id: "vehicle",
      imageSrc: img("vehicle-main.png"),
      imageAlt: "Signature sports car at dusk",
      label: "Vehicle",
      title: "'95 Palm Cheetah",
      body: "Signature mid-'90s sports car and ode to Shore Drive — minimalist retro-futurist livery, ready to punctuate later-stage action.",
      shadeWidth: "25",
    },
    {
      type: "gallery",
      id: "vehicle-gallery",
      items: [
        {
          id: "vehicle-1",
          src: img("vehicle-1.png"),
          alt: "Cheetah cabin detail",
          aspect: "tall",
        },
        {
          id: "vehicle-2",
          src: img("vehicle-2.png"),
          alt: "Garage work on yellow coupe",
          aspect: "square",
        },
        {
          id: "vehicle-3",
          src: img("vehicle-3.png"),
          alt: "Cheetah rear badge",
          aspect: "landscape",
        },
      ],
    },

    // 3 — Weapons
    {
      type: "hero",
      id: "weapons",
      imageSrc: img("weapons-main.png"),
      imageAlt: "Paired revolvers with coast etchings",
      label: "Weapons",
      title: "Hawk & Little Morgan Revolvers",
      body: "His and hers versions of this powerful revolver with classic coast stylings — palm-etched grips, engraved detailing, and a high-performance scope.",
      shadeWidth: "25",
    },
    {
      type: "gallery",
      id: "weapons-gallery",
      items: [
        {
          id: "weapons-1",
          src: img("weapons-1.png"),
          alt: "Revolver pair detail",
          aspect: "tall",
        },
        {
          id: "weapons-2",
          src: img("weapons-2.png"),
          alt: "Personalized sidearms",
          aspect: "square",
        },
      ],
    },

    // 4 — Looks
    {
      type: "hero",
      id: "looks",
      imageSrc: img("looks-main.png"),
      imageAlt: "Poolside exclusive outfits",
      label: "Looks",
      title: "Vice City Style",
      body: "Whether poolside or side by side, the cast can look the part with exclusive outfits, tattoos, and more.",
      shadeWidth: "20",
    },
    {
      type: "gallery",
      id: "looks-gallery",
      items: [
        {
          id: "looks-1",
          src: img("looks-1.png"),
          alt: "Look detail — tropical shirt",
          aspect: "square",
        },
        {
          id: "looks-2",
          src: img("looks-2.png"),
          alt: "Look detail — jacket and boots",
          aspect: "tall",
        },
        {
          id: "looks-3",
          src: img("looks-3.png"),
          alt: "Look detail — full figure",
          aspect: "portrait",
        },
        {
          id: "looks-4",
          src: img("looks-4.png"),
          alt: "Look detail — plaza style",
          aspect: "tall",
        },
      ],
    },

    // 5 — Vehicles
    {
      type: "hero",
      id: "vehicles",
      imageSrc: img("vehicles-main.png"),
      imageAlt: "Safehouse vehicles under the stilts",
      label: "Vehicles",
      title: "Safehouse Vehicles",
      body: "Switch gears and soak up the sun — fatigue-tinged motorcycle or kayak ready under the stilts.",
      shadeWidth: "25",
    },
    {
      type: "gallery",
      id: "vehicles-gallery",
      items: [
        {
          id: "vehicles-1",
          src: img("vehicles-1.png"),
          alt: "Dirt bike plate",
          aspect: "tall",
        },
        {
          id: "vehicles-2",
          src: img("vehicles-2.png"),
          alt: "Kayak at golden hour",
          aspect: "square",
        },
        {
          id: "vehicles-3",
          src: img("vehicles-3.png"),
          alt: "Coast muscle coupe",
          aspect: "landscape",
        },
      ],
    },

    // 6 — Modkit
    {
      type: "hero",
      id: "modkit",
      imageSrc: img("modkit-main.png"),
      imageAlt: "Custom donk under orange halo",
      label: "Modkit",
      title: "Rideout Customs",
      body: "Transform stock metal into magnificent work — detailed interiors, exquisite rims, and high-rise stylings. Open only with Ultimate Edition.",
      shadeWidth: "25",
    },
    {
      type: "gallery",
      id: "modkit-gallery",
      items: [
        {
          id: "modkit-1",
          src: img("modkit-1.png"),
          alt: "Mod shop interior detail",
          aspect: "tall",
        },
        {
          id: "modkit-2",
          src: img("modkit-2.png"),
          alt: "Custom build plate",
          aspect: "square",
        },
      ],
    },

    // 7 — Hair salon
    {
      type: "hero",
      id: "hair",
      imageSrc: img("hair-main.png"),
      imageAlt: "Hair salon — fresh cut",
      label: "Hair Salon",
      title: "Cut & Color",
      body: "New fades, fresh color, and coastal swagger — walk in looking like trouble, walk out looking worse for whoever crosses you.",
      shadeWidth: "25",
    },
    {
      type: "gallery",
      id: "hair-gallery",
      items: [
        {
          id: "hair-1",
          src: img("hair-1.png"),
          alt: "Salon chair detail",
          aspect: "tall",
        },
        {
          id: "hair-2",
          src: img("hair-2.png"),
          alt: "Manicure and polish wall",
          aspect: "square",
        },
      ],
    },

    // 8 — Watercraft
    {
      type: "hero",
      id: "watercraft",
      imageSrc: img("watercraft-main.png"),
      imageAlt: "Aerial water chase",
      label: "Watercraft",
      title: "Coast Guard Heat",
      body: "From quiet paddles to full-throttle wakes — own the waterline when the road runs out.",
      shadeWidth: "25",
    },
    {
      type: "gallery",
      id: "watercraft-gallery",
      items: [
        {
          id: "watercraft-1",
          src: img("watercraft-1.png"),
          alt: "Watercraft plate one",
          aspect: "landscape",
        },
        {
          id: "watercraft-2",
          src: img("watercraft-2.png"),
          alt: "Watercraft plate two",
          aspect: "square",
        },
        {
          id: "watercraft-3",
          src: img("watercraft-3.png"),
          alt: "Kayak crest paddle",
          aspect: "landscape",
        },
      ],
    },

    // 9 — Clothing Store
    {
      type: "hero",
      id: "clothing",
      imageSrc: img("clothing-main.png"),
      imageAlt: "Clothing store rack and fitting",
      label: "Clothing Store",
      title: "Fit Check",
      body: "Rack to runway in one swipe — exclusive fits that only drop with Ultimate Edition.",
      shadeWidth: "25",
    },
    {
      type: "gallery",
      id: "clothing-gallery",
      items: [
        {
          id: "clothing-1",
          src: img("clothing-1.png"),
          alt: "Store look one",
          aspect: "tall",
        },
        {
          id: "clothing-2",
          src: img("clothing-2.png"),
          alt: "Store look two",
          aspect: "square",
        },
        {
          id: "clothing-3",
          src: img("clothing-3.png"),
          alt: "Store look three",
          aspect: "portrait",
        },
      ],
    },

    // 10 — VEHICLE & GARAGE
    {
      type: "hero",
      id: "garage",
      imageSrc: img("garage-main.png"),
      imageAlt: "Lifted custom outside the garage",
      label: "Vehicle & Garage",
      title: "Parts Bought & Sold",
      body: "Mud, chrome, and overtime — the garage that keeps every ride loud enough for the strip.",
      shadeWidth: "25",
    },
    {
      type: "gallery",
      id: "garage-gallery",
      items: [
        {
          id: "garage-1",
          src: img("garage-1.png"),
          alt: "Garage plate one",
          aspect: "tall",
        },
        {
          id: "garage-2",
          src: img("garage-2.png"),
          alt: "Garage plate two",
          aspect: "square",
        },
        {
          id: "garage-3",
          src: img("garage-3.png"),
          alt: "Bull bar close-up",
          aspect: "landscape",
        },
      ],
    },

    // 11 — tattoo Shop
    {
      type: "hero",
      id: "tattoo",
      imageSrc: img("tattoo-main.png"),
      imageAlt: "Neon tattoo shop stoop",
      label: "Tattoo Shop",
      title: "Ink After Dark",
      body: "Fresh needle, old stories — permanent marks for temporary alliances.",
      shadeWidth: "25",
    },
    {
      type: "gallery",
      id: "tattoo-gallery",
      items: [
        {
          id: "tattoo-1",
          src: img("tattoo-1.png"),
          alt: "Tattoo detail one",
          aspect: "tall",
        },
        {
          id: "tattoo-2",
          src: img("tattoo-2.png"),
          alt: "Tattoo detail two",
          aspect: "square",
        },
        {
          id: "tattoo-3",
          src: img("tattoo-3.png"),
          alt: "Tattoo detail three",
          aspect: "portrait",
        },
      ],
    },

    // 12 — Gang Compound
    {
      type: "hero",
      id: "gang",
      imageSrc: img("gang-main.png"),
      imageAlt: "Gang compound exterior",
      label: "Gang Compound",
      title: "Compound Rules",
      body: "Walls, watches, and whoever walks in last — the compound keeps score.",
      shadeWidth: "25",
    },

    // 13 — End
    {
      type: "hero",
      id: "end",
      imageSrc: img("end-main.png"),
      imageAlt: "Ultimate Edition closing plate",
      label: "GTA 6",
      title: "The Drop Ends Here",
      body: "You’ve seen the heat. Pre-order Ultimate Edition and keep every bonus threaded through the story.",
      shadeWidth: "30",
    },
  ] satisfies UltimatePanel[],
} as const;
