import type { SiteSettingsRecord } from './types';

export const SITE_SETTINGS_FIXTURE: SiteSettingsRecord = {
  brandName: "Root's The Family Salon",
  legalName: "Root's Family Salon Pvt Ltd",
  tagline: "Hyderabad's family salon — premium hair, skin, bridal & beauty. Crafted for every generation.",
  founderStory: {
    name: "Anikanth Jadhav",
    quote: "Every guest who walks into Root's is family. Passion brought us from banking to styling, and that care is in every cut and consultation.",
    background: "Ex-Bank Manager turned passionate salon founder, dedicated to bringing clinical hygiene and welcoming family warmth under one roof.",
    philosophy: "Modern salon excellence without intimidation — genuine consultations, zero harmful chemicals, and accessible luxury for parents, children, and brides alike.",
  },
  metrics: {
    yearsOfMastery: 15,
    yearsLabel: "15+ Years",
    googleRating: 4.8,
    reviewCount: 1600,
    reviewCountLabel: "1,600+ Reviews",
    branchCount: 3,
    happyClientsCount: 12000,
    happyClientsLabel: "12,000+ Happy Clients",
  },
  contact: {
    primaryPhone: "+919700744357",
    primaryPhoneFormatted: "+91 97007 44357",
    whatsappNumber: "919700744357",
    whatsappDisplay: "+91 97007 44357",
    email: "rootsbyaj9@gmail.com",
  },
  social: {
    instagram: "https://www.instagram.com/roots_by_aj",
    facebook: "https://www.facebook.com/anikanth.jadhav.1",
    googleMapsUppal: "https://maps.app.goo.gl/ocq8uts9jYaCp3bu8",
    googleMapsTarnaka: "https://maps.app.goo.gl/HtxnUPQ9b9a4f5Qv7",
  },
  hours: {
    general: "10:00 AM – 9:00 PM",
    days: "Monday through Sunday (Open all 7 days)",
  },
};
