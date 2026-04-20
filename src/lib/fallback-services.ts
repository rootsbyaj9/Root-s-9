import { ServiceCategory } from "@/components/sections/services/ServicesContent";

export const FALLBACK_CATEGORIES: ServiceCategory[] = [
  {
    _id: "serviceCategory-womens-hair",
    title: "Hair Masterclass",
    slug: "hair-masterclass",
    gender: "womens",
    displayOrder: 1,
    description:
      "Expert cuts, colour transformations, smoothening, and spa treatments for every hair type.",
  },
  {
    _id: "serviceCategory-womens-skin",
    title: "Skin Rituals",
    slug: "skin-rituals",
    gender: "womens",
    displayOrder: 2,
    description:
      "Waxing, facials, peels, D-tan, manicure-pedicure — complete skin care from head to toe.",
  },
  {
    _id: "serviceCategory-womens-refinement",
    title: "Refinement",
    slug: "refinement",
    gender: "womens",
    displayOrder: 3,
    description:
      "Threading, bleaching, and finishing touches for a polished, everyday look.",
  },
  {
    _id: "serviceCategory-bridal",
    title: "Bridal Studio",
    slug: "bridal-studio",
    gender: "bridal",
    displayOrder: 1,
    description:
      "HD & non-HD bridal makeup, party looks, saree draping, hairstyling, and nail art for your big day.",
  },
  {
    _id: "serviceCategory-mens-hair",
    title: "Men's Grooming",
    slug: "mens-grooming",
    gender: "mens",
    displayOrder: 1,
    description:
      "Haircuts, beard styling, shaves, colour, and spa treatments tailored for men.",
  },
  {
    _id: "serviceCategory-mens-skin",
    title: "Men's Skin",
    slug: "mens-skin",
    gender: "mens",
    displayOrder: 2,
    description:
      "Facials, D-tan, pedicure, manicure, and grooming makeup exclusively for men.",
  },
  {
    _id: "serviceCategory-tattoo",
    title: "Tattoo Artistry",
    slug: "tattoo-artistry",
    gender: "tattoo",
    displayOrder: 1,
    description:
      "Fine-line, realism, cover-ups, and custom designs — permanent art worth wearing.",
  },
];
