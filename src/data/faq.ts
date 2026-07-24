import type { FaqItem } from "@/types/content";

export type FaqCategoryId =
  | "all"
  | "gameplay"
  | "story"
  | "online"
  | "pc"
  | "console"
  | "account"
  | "news";

export type FaqCategory = {
  id: FaqCategoryId;
  label: string;
  /** Matches `FaqItem.category` (except `all`). */
  match?: string;
};

export const faqCategories: FaqCategory[] = [
  { id: "all", label: "All" },
  { id: "gameplay", label: "Gameplay", match: "Gameplay" },
  { id: "story", label: "Story", match: "Story" },
  { id: "online", label: "Online", match: "Online" },
  { id: "pc", label: "PC", match: "PC" },
  { id: "console", label: "Console", match: "Console" },
  { id: "account", label: "Account", match: "Account" },
  { id: "news", label: "News", match: "News" },
];

export const faqItems: FaqItem[] = [
  // Gameplay
  {
    id: "gameplay-expect",
    category: "Gameplay",
    question: "What kind of gameplay can I expect in Grand Theft Auto VI?",
    answer:
      "Grand Theft Auto VI delivers an expansive open-world experience featuring dynamic missions, high-speed chases, realistic NPC interactions, and countless activities across the vibrant state of Leonida.",
  },
  {
    id: "gameplay-explore",
    category: "Gameplay",
    question: "Can I freely explore Vice City and beyond?",
    answer:
      "Yes. Players can explore Vice City and the surrounding regions of Leonida without restrictions, discovering hidden locations, businesses, side activities, and random encounters throughout the world.",
  },
  {
    id: "gameplay-activities",
    category: "Gameplay",
    question: "Are there activities outside of story missions?",
    answer:
      "Absolutely. Players can enjoy street races, sports, nightlife, shopping, property management, side jobs, collectibles, and many other optional activities.",
  },
  {
    id: "gameplay-weather",
    category: "Gameplay",
    question: "Does the game feature dynamic weather and realistic environments?",
    answer:
      "Yes. The world features changing weather, realistic lighting, environmental effects, wildlife, and a full day-and-night cycle that enhances immersion.",
  },
  {
    id: "gameplay-customize",
    category: "Gameplay",
    question: "Can I customize vehicles and weapons?",
    answer:
      "Yes. Players will have access to extensive customization options for vehicles, weapons, and character equipment to match their preferred playstyle.",
  },

  // Story
  {
    id: "story-protagonists",
    category: "Story",
    question: "Who are the main protagonists?",
    answer:
      "Grand Theft Auto VI follows Lucia and her partner as they navigate a dangerous criminal underworld, building alliances while surviving the challenges of Vice City's ever-changing landscape.",
  },
  {
    id: "story-setting",
    category: "Story",
    question: "Where does the story take place?",
    answer:
      "The story is set in Vice City and the fictional state of Leonida, featuring bustling urban districts, beaches, highways, swamps, and rural communities.",
  },
  {
    id: "story-previous",
    category: "Story",
    question: "Is Grand Theft Auto VI connected to previous GTA stories?",
    answer:
      "Grand Theft Auto VI introduces an original narrative with new protagonists while continuing the series' tradition of satire, crime, and open-world storytelling.",
  },
  {
    id: "story-length",
    category: "Story",
    question: "How long is the main campaign?",
    answer:
      "The main story offers dozens of hours of cinematic gameplay, with many additional hours available through side missions and world exploration.",
  },
  {
    id: "story-missions",
    category: "Story",
    question: "Are there multiple mission types?",
    answer:
      "Yes. Missions range from robberies and high-speed pursuits to stealth operations, large-scale action sequences, and narrative-driven character moments.",
  },

  // Online
  {
    id: "online-multiplayer",
    category: "Online",
    question: "Will Grand Theft Auto VI include an online multiplayer mode?",
    answer:
      "Yes. Grand Theft Auto VI will feature an online experience that expands upon previous multiplayer offerings with new activities and social gameplay.",
  },
  {
    id: "online-friends",
    category: "Online",
    question: "Can I play with friends?",
    answer:
      "Yes. Players can join friends to complete missions, participate in events, explore the world together, and build their own criminal empire.",
  },
  {
    id: "online-updates",
    category: "Online",
    question: "Will new online content be added after launch?",
    answer:
      "Yes. Rockstar plans to support the online experience with regular updates, seasonal events, new vehicles, missions, and gameplay features.",
  },
  {
    id: "online-crossplay",
    category: "Online",
    question: "Will cross-platform play be available?",
    answer:
      "Rockstar has not officially confirmed cross-platform support. Additional details will be announced closer to launch.",
  },
  {
    id: "online-internet",
    category: "Online",
    question: "Is an internet connection required for online play?",
    answer:
      "Yes. A stable internet connection and a supported platform account are required to access online multiplayer features.",
  },

  // PC
  {
    id: "pc-coming",
    category: "PC",
    question: "Is Grand Theft Auto VI coming to PC?",
    answer:
      "Rockstar has confirmed a PC version, with details regarding availability and release timing provided through official announcements.",
  },
  {
    id: "pc-ultrawide",
    category: "PC",
    question: "Will the game support ultrawide monitors?",
    answer:
      "The PC version is expected to include support for modern display resolutions, including ultrawide monitors where supported.",
  },
  {
    id: "pc-graphics",
    category: "PC",
    question: "Can I customize graphics settings?",
    answer:
      "Yes. Players will be able to adjust graphics, display, and performance settings to suit their hardware configuration.",
  },
  {
    id: "pc-upscaling",
    category: "PC",
    question: "Will DLSS, FSR, or XeSS be supported?",
    answer:
      "Support for modern upscaling technologies will be announced closer to the PC release.",
  },
  {
    id: "pc-input",
    category: "PC",
    question: "Will keyboard, mouse, and controller all be supported?",
    answer:
      "Yes. The PC version supports keyboard and mouse as well as compatible game controllers.",
  },

  // Console
  {
    id: "console-platforms",
    category: "Console",
    question: "Which consoles will Grand Theft Auto VI launch on?",
    answer:
      "Grand Theft Auto VI launches on PlayStation 5 and Xbox Series X|S.",
  },
  {
    id: "console-4k",
    category: "Console",
    question: "Will the game support 4K graphics?",
    answer:
      "Yes. Compatible consoles support enhanced resolutions, improved visual quality, and advanced rendering technologies.",
  },
  {
    id: "console-modes",
    category: "Console",
    question: "Will there be different graphics modes?",
    answer:
      "Yes. Players can choose between available performance and quality modes depending on their preferred gameplay experience.",
  },
  {
    id: "console-haptics",
    category: "Console",
    question: "Does the game support advanced controller features?",
    answer:
      "Yes. Supported controllers offer enhanced haptic feedback, adaptive triggers, and immersive vibration effects where available.",
  },
  {
    id: "console-transfer",
    category: "Console",
    question: "Can I transfer my progress between consoles?",
    answer:
      "Rockstar will provide details regarding account progression and save transfers through official announcements.",
  },

  // Account
  {
    id: "account-rockstar",
    category: "Account",
    question: "Do I need a Rockstar Games account?",
    answer:
      "A Rockstar Games account is required to access certain online services and multiplayer features.",
  },
  {
    id: "account-2fa",
    category: "Account",
    question: "Can I enable two-factor authentication?",
    answer:
      "Yes. Two-factor authentication is available and strongly recommended to help protect your Rockstar Games account.",
  },
  {
    id: "account-recover",
    category: "Account",
    question: "How do I recover my account?",
    answer:
      "You can recover your account using the password recovery tools available through the Rockstar Games account portal.",
  },
  {
    id: "account-link",
    category: "Account",
    question: "Can I link multiple gaming platforms?",
    answer:
      "Supported platform accounts can be linked to your Rockstar Games account for eligible services.",
  },
  {
    id: "account-profile",
    category: "Account",
    question: "Where can I manage my profile?",
    answer:
      "Profile settings, security options, linked accounts, and preferences can be managed through your Rockstar Games account dashboard.",
  },

  // News
  {
    id: "news-latest",
    category: "News",
    question: "Where can I find the latest Grand Theft Auto VI news?",
    answer:
      "Visit the official News section for the latest trailers, announcements, screenshots, and development updates.",
  },
  {
    id: "news-trailers",
    category: "News",
    question: "When will new trailers be released?",
    answer:
      "Rockstar announces new trailers and promotional content through its official channels. Stay tuned for upcoming reveals.",
  },
  {
    id: "news-post-launch",
    category: "News",
    question: "Will there be post-launch updates?",
    answer:
      "Yes. Grand Theft Auto VI is expected to receive ongoing updates, events, and new content following launch.",
  },
  {
    id: "news-stay-informed",
    category: "News",
    question: "How can I stay informed about future announcements?",
    answer:
      "Subscribe to the newsletter and follow Rockstar's official social media channels for the latest updates.",
  },
  {
    id: "news-media",
    category: "News",
    question: "Where can I view official screenshots and gameplay videos?",
    answer:
      "The Media section of the official website contains the latest trailers, screenshots, artwork, and promotional videos released by Rockstar.",
  },
];

export function getFaqItemsByCategory(categoryId: FaqCategoryId): FaqItem[] {
  if (categoryId === "all") return faqItems;
  const match = faqCategories.find((c) => c.id === categoryId)?.match;
  if (!match) return faqItems;
  return faqItems.filter((item) => item.category === match);
}
