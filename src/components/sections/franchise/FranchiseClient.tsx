"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, GraduationCap, MapPin } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import type { SanityFranchisePageData, SanityFranchiseReason, SanityFranchiseModelPoint } from "@/types/sanity";


gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    number: "01",
    icon: <Trophy className="w-10 h-10 text-roots-orange stroke-1" />,
    title: "A Brand People Trust",
    body: "Root's has built a loyal customer base across Hyderabad over 8 years. When you open a Root's franchise, you inherit that trust immediately — not having to build it from zero.",
  },
  {
    number: "02",
    icon: <GraduationCap className="w-10 h-10 text-roots-orange stroke-1" />,
    title: "Full Training & Ongoing Support",
    body: "From recruitment and pricing to operations and client management — we train your team and stay available. Our franchise partners never feel alone.",
  },
  {
    number: "03",
    icon: <MapPin className="w-10 h-10 text-roots-orange stroke-1" />,
    title: "Exclusive Territory Rights",
    body: "Each franchise is given exclusive geographic territory. No Root's outlet will open within your zone — your market is protected.",
  },
];

const MODEL_POINTS = [
  { label: "Investment Range", value: "₹15L – ₹30L (depending on location & size)" },
  { label: "Avg. Break-even", value: "12–18 months" },
  { label: "Royalty", value: "6% of monthly revenue" },
  { label: "Training Duration", value: "4 weeks (on-site at Hyderabad HQ)" },
  { label: "Launch Support", value: "Grand Opening marketing, local social campaign" },
  { label: "Territories Open", value: "Pan-India (priority to Hyderabad expanded zones)" },
];


type FranchiseClientProps = {
  cmsData?: SanityFranchisePageData | null;
};

export default function FranchiseClient({ cmsData }: FranchiseClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Hero Animation using GSAP
  useGSAP(() => {
    if (!titleRef.current) return;
    
    // Animate the hero copy elements gracefully
    gsap.from(".hero-element", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2
    });

    gsap.from(".fade-element", {
      scrollTrigger: {
        trigger: ".fade-element",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    });
  }, { scope: heroRef });

  // CMS Value Fallbacks
  const reasons = cmsData?.reasons?.length ? cmsData.reasons : REASONS;
  const modelPoints = cmsData?.modelPoints?.length ? cmsData.modelPoints : MODEL_POINTS;

  // heroBackgroundImageUrl is pre-resolved server-side via GROQ asset->url projection
  const cmsImageUrl = cmsData?.heroBackgroundImageUrl || undefined;

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────── */}
      <section ref={heroRef} data-theme="dark" className="relative min-h-[65vh] flex items-end bg-obsidian pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-obsidian">
          {cmsImageUrl && (
            <img
              src={cmsImageUrl}
              alt="Root's Franchise"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent" />

        <div className="relative container mx-auto px-6 md:px-16 max-w-7xl">
          <span className="hero-element eyebrow text-roots-orange/80 mb-3 block">
            {cmsData?.heroEyebrow || "FRANCHISE OPPORTUNITY"}
          </span>
          <h1 ref={titleRef} className="hero-element font-sans font-bold uppercase tracking-widest text-6xl md:text-8xl text-parchment leading-[0.95] max-w-3xl">
            {cmsData?.heroHeadline ? (
              <span dangerouslySetInnerHTML={{ __html: cmsData.heroHeadline.replace("Root's", "<em class='text-roots-orange'>Root&apos;s</em>") }} />
            ) : (
              <>Own a <em className="text-roots-orange">Root&apos;s</em>.</>
            )}
          </h1>
          <p className="hero-element mt-6 font-sans text-parchment/70 text-base md:text-lg max-w-lg leading-relaxed">
            {cmsData?.heroSubtext || `Bring Hyderabad's most trusted family salon to your city. We'll give you the brand, the training, and the support. You bring the ambition.`}
          </p>
          <div className="hero-element mt-10">
            <a
              href="https://wa.me/919700744357?text=Hi%20Root%27s%20Team!%20I%27m%20interested%20in%20a%20franchise%20opportunity."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Enquire via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ─── WHY ROOT'S ───────────────────────────────── */}
      <section className="bg-parchment py-24 overflow-hidden">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <div className="fade-element">
            <SectionHeader
              eyebrow="WHY PARTNER WITH US"
              heading={cmsData?.reasonsHeading || "Built for successful franchise partners."}
              align="center"
            />
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {(reasons as SanityFranchiseReason[]).map((r, idx: number) => {
              const num = typeof r.number === 'string' ? r.number : `0${idx + 1}`.slice(-2);
              const Icon = idx === 0 ? Trophy : idx === 1 ? GraduationCap : MapPin;
              
              return (
              <div
                key={idx}
                className="fade-element bg-linen rounded-2xl p-10 border border-obsidian/[0.06] hover:shadow-lg transition-shadow duration-300 relative group overflow-hidden"
              >
                {/* Background decorative number */}
                <span className="font-sans font-bold uppercase tracking-widest text-8xl text-obsidian/[0.03] absolute right-0 bottom-0 translate-x-4 translate-y-4 select-none leading-none z-0">
                  {num}
                </span>

                <div className="relative z-10 flex flex-col items-start">
                  <div 
                    className="fade-element mb-6 p-4 rounded-full bg-parchment shadow-sm border border-obsidian/[0.04]"
                  >
                    {r.icon || <Icon className="w-10 h-10 text-roots-orange stroke-1" />}
                  </div>
                  <h3 className="font-sans font-bold uppercase tracking-widest text-2xl text-obsidian mb-4">{r.title}</h3>
                  <p className="font-sans text-warm-gray text-sm leading-relaxed">{r.body}</p>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* ─── MODEL OVERVIEW ───────────────────────────── */}
      <section data-theme="dark" className="bg-obsidian py-24 overflow-hidden">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <div className="fade-element">
            <SectionHeader
              eyebrow="THE NUMBERS"
              heading={cmsData?.modelHeading || "A model built to win."}
              align="center"
              className="[&_.eyebrow]:text-roots-orange/70 [&_h2]:text-parchment"
            />
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-px bg-parchment/[0.06] rounded-2xl overflow-hidden">
            {(modelPoints as SanityFranchiseModelPoint[]).map((point, idx: number) => (
              <div 
                key={idx} 
                className="fade-element bg-obsidian px-10 py-8 flex items-start justify-between gap-6 border-b border-parchment/[0.06] group hover:bg-obsidian/80 transition-colors"
              >
                <span className="font-sans text-sm text-parchment/50 uppercase tracking-widest flex-shrink-0 group-hover:text-roots-orange transition-colors duration-300">
                  {point.label}
                </span>
                <span className="font-sans font-bold uppercase tracking-widest text-lg text-parchment text-right">
                  {point.value}
                </span>
              </div>
            ))}
          </div>
          <p 
            className="fade-element mt-6 font-sans text-parchment/30 text-xs text-center"
          >
            All figures indicative — final numbers depend on location, size, and market. Detailed projection shared post-enquiry.
          </p>
        </div>
      </section>

      {/* ─── ENQUIRY CTA ──────────────────────────────── */}
      <section className="bg-roots-orange py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-16 max-w-4xl text-center relative z-10">
          <h2 
            className="fade-element font-sans font-bold uppercase tracking-widest text-4xl md:text-6xl text-parchment leading-[1.05] mb-5"
          >
            Ready to start the conversation?
          </h2>
          <p 
            className="fade-element font-sans text-parchment/80 text-base md:text-lg max-w-lg mx-auto mb-10"
          >
            Reach out via WhatsApp or email. We&apos;ll share our franchise kit,
            arrange a call with the founder, and walk you through every step.
          </p>
          <div 
            className="fade-element flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://wa.me/919700744357?text=Hi%20Root%27s%20Team!%20I%27m%20interested%20in%20the%20franchise%20opportunity.%20Please%20share%20the%20franchise%20kit."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-parchment text-obsidian font-sans text-sm font-semibold uppercase tracking-[0.1em] px-8 py-4 rounded-full hover:bg-parchment/90 transition-colors duration-200 inline-flex items-center justify-center gap-2 group"
            >
              WhatsApp Us
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="mailto:rootsbyaj9@gmail.com?subject=Franchise%20Enquiry%20%E2%80%94%20Root%27s%20The%20Family%20Salon"
              className="border border-parchment text-parchment font-sans text-sm font-semibold uppercase tracking-[0.1em] px-8 py-4 rounded-full hover:bg-parchment/10 transition-colors duration-200 inline-flex items-center justify-center gap-2"
            >
              Email: rootsbyaj9@gmail.com
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
