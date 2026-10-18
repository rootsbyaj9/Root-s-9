import { ServiceCategory } from "@/components/sections/services/ServicesContent";

export const FALLBACK_CATEGORIES: ServiceCategory[] = [
  {
    _id: "serviceCategory-womens-hair",
    title: "Hair Masterclass",
    slug: "hair-masterclass",
    gender: "womens",
    displayOrder: 1,
    imageUrl: "https://cdn.sanity.io/images/ncrxhomy/production/7d32a0f10e17afd0340ade538e6504af84355d5c-4082x6123.webp",
    description:
      "Expert cuts, colour transformations, smoothening, and spa treatments for every hair type.",
  },
  {
    _id: "serviceCategory-womens-skin",
    title: "Skin Rituals",
    slug: "skin-rituals",
    gender: "womens",
    displayOrder: 2,
    imageUrl: "https://cdn.sanity.io/images/ncrxhomy/production/2f3e8e5cfe77ff5f58be38ba5aeb53811a7df237-4082x6123.webp",
    description:
      "Waxing, facials, peels, D-tan, manicure-pedicure — complete skin care from head to toe.",
  },
  {
    _id: "serviceCategory-womens-refinement",
    title: "Refinement",
    slug: "refinement",
    gender: "womens",
    displayOrder: 3,
    imageUrl: "https://cdn.sanity.io/images/ncrxhomy/production/cf1f0b3a9515a6c2b67c870b7fc42a44111abccc-4000x6000.webp",
    description:
      "Threading, bleaching, and finishing touches for a polished, everyday look.",
  },
  {
    _id: "serviceCategory-bridal",
    title: "Bridal Makeover",
    slug: "bridal-studio",
    gender: "bridal",
    displayTabs: ["bridal"],
    displayOrder: 1,
    imageUrl: "https://cdn.sanity.io/images/ncrxhomy/production/ec339313ae9ae0e18106f5dc0653e654b426ac97-4000x6000.webp",
    description:
      "HD & non-HD bridal makeup, party looks, saree draping, hairstyling, and nail art for your big day.",
  },
  {
    _id: "serviceCategory-kids",
    title: "Kids Haircuts & Styling",
    slug: "kids-haircuts",
    gender: "both",
    displayTabs: ["womens", "mens"],
    displayOrder: 4,
    imageUrl: "https://cdn.sanity.io/images/ncrxhomy/production/e0f261b2133314874e42c7fb2968efcb4fb5b8c6-960x1280.jpg",
    description:
      "Gentle, patient, and fun haircut experience crafted specially for children (under 12 years).",
  },
  {
    _id: "serviceCategory-mens-hair",
    title: "Men's Grooming",
    slug: "mens-grooming",
    gender: "mens",
    displayOrder: 1,
    imageUrl: "https://cdn.sanity.io/images/ncrxhomy/production/c4b35c485eef401237a3b59d5369276a3a621efe-3750x6663.webp",
    description:
      "Haircuts, beard styling, shaves, colour, and spa treatments tailored for men.",
  },
  {
    _id: "serviceCategory-mens-skin",
    title: "Men's Skin",
    slug: "mens-skin",
    gender: "mens",
    displayOrder: 2,
    imageUrl: "https://cdn.sanity.io/images/ncrxhomy/production/2a9e8339e5848dd93460f2a37fce3aabd1521d2a-612x459.jpg",
    description:
      "Facials, D-tan, pedicure, manicure, and skin care exclusively for men.",
  },
  {
    _id: "serviceCategory-tattoo",
    title: "Tattoo Artistry",
    slug: "tattoo-artistry",
    gender: "tattoo",
    displayTabs: ["tattoo"],
    displayOrder: 1,
    imageUrl: "https://cdn.sanity.io/images/ncrxhomy/production/53578ee05da298d0d17d8e5d0459954ed4ef602b-765x1020.webp",
    description:
      "Fine-line, realism, cover-ups, and custom designs — permanent art worth wearing.",
  },
  {
    _id: "serviceCategory-nails",
    title: "Nail Art & Styling",
    slug: "artistic-nails",
    gender: "nails",
    displayOrder: 1,
    imageUrl: "https://cdn.sanity.io/images/ncrxhomy/production/321b5069f462fb9c0075aca925d7a5d9b8a6e9c3-768x432.jpg",
    description:
      "Gel extensions, chrome finishes, custom nail art, Russian manicures, and indulgent spa pedicures.",
  },
  {
    _id: "serviceCategory-piercing",
    title: "Piercing",
    slug: "piercing",
    gender: "piercing",
    displayOrder: 1,
    imageUrl: "https://cdn.sanity.io/images/ncrxhomy/production/038bc7a7f174c880008b661b08b5f3afd39da79a-4640x6960.jpg",
    description:
      "Hygienic ear, nose, and body piercings performed with surgical-grade sterilized equipment and premium studs.",
  },
  {
    _id: "serviceCategory-hair-extensions",
    title: "Hair Extensions",
    slug: "hair-extensions",
    gender: "hair-extensions",
    displayOrder: 1,
    imageUrl: "https://cdn.sanity.io/images/ncrxhomy/production/514d55a0deb1773a44e340dff3ae523c666e093a-612x444.jpg",
    description:
      "100% Remy human hair clip-on, tape-in, and micro-ring extensions tailored for volume and length.",
  },
  {
    _id: "serviceCategory-hair-weaving",
    title: "Hair Weaving",
    slug: "hair-weaving",
    gender: "hair-weaving",
    displayOrder: 1,
    imageUrl: "https://cdn.sanity.io/images/ncrxhomy/production/e4b9ae67a1f576496dd5eb69d6d2cdd22f035c05-612x408.jpg",
    description:
      "Non-surgical hair systems, custom lace front patches, and undetectable weaving for natural fullness.",
  },
];
