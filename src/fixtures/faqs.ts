import type { FaqRecord } from './types';

export const FAQS_FIXTURE: FaqRecord[] = [
  {
    _id: "faq-1",
    question: "Do I need an appointment, or do you accept walk-ins?",
    answer: "We warmly accept walk-ins across our Uppal, Tarnaka, and Brahmanpally branches. However, for specialized services like Balayage, Hair Botox, and Bridal consultations, we strongly recommend reserving a slot online or via WhatsApp to avoid wait times.",
    category: "Booking",
    sortOrder: 1,
  },
  {
    _id: "faq-2",
    question: "Are your hair colour and smoothening treatments chemical-free?",
    answer: "We prioritize hair integrity and scalp health. We use ammonia-free global colours and premium, low-chemical Keratin/Botox formulations from trusted professional brands that strengthen rather than damage the cuticle.",
    category: "Hair",
    sortOrder: 2,
  },
  {
    _id: "faq-3",
    question: "How does the Bridal trial work?",
    answer: "Our bridal trial includes an in-depth skin tone analysis, HD makeup test on half the face, hairstyle mock-up with your hair length, and jewellery placement consultation. Trial slots can be booked directly through our bridal desk.",
    category: "Bridal",
    sortOrder: 3,
  },
  {
    _id: "faq-4",
    question: "What hygiene protocols are followed for tattoos and piercings?",
    answer: "We maintain 100% clinical sterilization. Every needle is single-use, opened directly in front of you from sealed medical packaging, and disposed of in biohazard sharps bins. Artists wear medical nitrile gloves throughout the session.",
    category: "Tattoo",
    sortOrder: 4,
  },
  {
    _id: "faq-5",
    question: "Is parking available at your branches?",
    answer: "Yes, both our Uppal and Tarnaka locations provide convenient parking for two-wheelers and four-wheelers directly in front of or beside the salon premises.",
    category: "Locations",
    sortOrder: 5,
  },
];
