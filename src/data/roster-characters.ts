/**
 * Characters roster for menu People panel — hover list + full-bleed portrait.
 * Assets: public/images/characters/roster/{slug}.{jpg|webp}
 */
export type RosterCharacter = {
  slug: string;
  name: string;
  /** Display name as shown in the list (all caps in UI). */
  listName: string;
  imageSrc: string;
  imageAlt: string;
};

export const rosterCharacters: RosterCharacter[] = [
  {
    slug: "jason-duval",
    name: "Jason Duval",
    listName: "Jason Duval",
    imageSrc: "/images/characters/roster/jason-duval-v2.jpg",
    imageAlt: "Jason Duval",
  },
  {
    slug: "lucia-caminos",
    name: "Lucia Caminos",
    listName: "Lucia Caminos",
    imageSrc: "/images/characters/roster/lucia-caminos-v2.jpg",
    imageAlt: "Lucia Caminos",
  },
  {
    slug: "cal-hampton",
    name: "Cal Hampton",
    listName: "Cal Hampton",
    imageSrc: "/images/characters/roster/cal-hampton-v2.jpg",
    imageAlt: "Cal Hampton",
  },
  {
    slug: "boobie-ike",
    name: "Boobie Ike",
    listName: "Boobie Ike",
    imageSrc: "/images/characters/roster/boobie-ike.jpg",
    imageAlt: "Boobie Ike",
  },
  {
    slug: "drequan-priest",
    name: "Dre'Quan Priest",
    listName: "Dre'Quan Priest",
    imageSrc: "/images/characters/roster/drequan-priest.jpg",
    imageAlt: "Dre'Quan Priest",
  },
  {
    slug: "real-dimez",
    name: "Real Dimez",
    listName: "Real Dimez",
    imageSrc: "/images/characters/roster/real-dimez.jpg",
    imageAlt: "Real Dimez",
  },
  {
    slug: "raul-bautista",
    name: "Raul Bautista",
    listName: "Raul Bautista",
    imageSrc: "/images/characters/roster/raul-bautista.jpg",
    imageAlt: "Raul Bautista",
  },
  {
    slug: "brian-heder",
    name: "Brian Heder",
    listName: "Brian Heder",
    imageSrc: "/images/characters/roster/brian-heder.jpg",
    imageAlt: "Brian Heder",
  },
];
