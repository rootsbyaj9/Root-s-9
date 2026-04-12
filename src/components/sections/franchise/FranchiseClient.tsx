"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, GraduationCap, MapPin } from "lucide-react";
import CTASection from "@/components/sections/shared/CTASection";
import SectionHeader from "@/components/ui/SectionHeader";
import { urlForImage } from "@/sanity/lib/image";

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

const FAQS = [
  {
    q: "Do I need prior experience in the beauty industry?",
    a: "No. Business acumen and a passion for customer experience are more important. We train your staff on all technical skills. You focus on running an excellent business.",
  },
  {
    q: "How long does it take to open after signing?",
    a: "Typically 60–90 days from agreement to grand opening. This includes location fit-out, staff recruitment, and training.",
  },
  {
    q: "What kind of support do I receive after launch?",
    a: "Ongoing: dedicated franchise coordinator, monthly performance reviews, access to Root's marketing materials, product sourcing at partner rates, and priority support for any operational issues.",
  },
  {
    q: "Can I open in a city outside Hyderabad?",
    a: "Yes. We are actively looking for franchise partners across Telangana and Andhra Pradesh. Pan-India expansion is in the pipeline for 2025–26.",
  },
  {
    q: "Is there a minimum salon size requirement?",
    a: "We recommend a minimum of 800 sq. ft. to accommodate hair, skin, and beauty services comfortably. Smaller formats (600 sq. ft.) are possible for express-service outlets.",
  },
];

type FranchiseClientProps = {
  cmsData?: any;
};

export default function FranchiseClient({ cmsData = {} }: FranchiseClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Hero Animation using GSAP
  useEffect(() => {
    if (!titleRef.current) return;
    
    // Animate the hero copy elements gracefully
    const ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  // CMS Value Fallbacks
  const reasons = cmsData?.reasons?.length ? cmsData.reasons : REASONS;
  const modelPoints = cmsData?.modelPoints?.length ? cmsData.modelPoints : MODEL_POINTS;
  const faqs = cmsData?.faqs?.length ? cmsData.faqs : FAQS;

  let cmsImageUrl;
  let fallbackPosition = "center";

  if (cmsData?.heroBackgroundImage) {
    try {
      cmsImageUrl = urlForImage(cmsData.heroBackgroundImage).url();
      const hotspot = cmsData.heroBackgroundImage.hotspot;
      if (hotspot && hotspot.x !== undefined && hotspot.y !== undefined) {
        fallbackPosition = `${hotspot.x * 100}% ${hotspot.y * 100}%`;
      }
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[65vh] flex items-end bg-obsidian pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#1A1008]">
          <img
            src={cmsImageUrl || "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000&auto=format&fit=crop"}
            alt="Root's Franchise"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            style={{ objectPosition: fallbackPosition }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent" />

        <div className="relative container mx-auto px-6 md:px-16 max-w-7xl">
          <span className="hero-element eyebrow text-roots-orange/80 mb-3 block">
            {cmsData?.heroEyebrow || "FRANCHISE OPPORTUNITY"}
          </span>
          <h1 ref={titleRef} className="hero-element font-serif text-6xl md:text-8xl text-parchment leading-[0.95] max-w-3xl">
            {cmsData?.heroHeadline ? (
              <span dangerouslySetInnerHTML={{ __html: cmsData.heroHeadline.replace("Root's", "<em class='italic font-normal text-roots-orange'>Root&apos;s</em>") }} />
            ) : (
              <>Own a <em className="italic font-normal text-roots-orange">Root&apos;s</em>.</>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeader
              eyebrow="WHY PARTNER WITH US"
              heading={cmsData?.reasonsHeading || "Built for successful franchise partners."}
              align="center"
            />
          </motion.div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {reasons.map((r: any, idx: number) => {
              const num = typeof r.number === 'string' ? r.number : `0${idx + 1}`.slice(-2);
              const Icon = idx === 0 ? Trophy : idx === 1 ? GraduationCap : MapPin;
              
              return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: idx * 0.1, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="bg-linen rounded-2xl p-10 border border-obsidian/[0.06] hover:shadow-lg transition-shadow duration-300 relative group overflow-hidden"
              >
                {/* Background decorative number */}
                <span className="font-serif text-8xl text-obsidian/[0.03] absolute right-0 bottom-0 translate-x-4 translate-y-4 select-none leading-none z-0">
                  {num}
                </span>

                <div className="relative z-10 flex flex-col items-start">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx * 0.1) + 0.2, duration: 0.5, ease: "backOut" }}
                    className="mb-6 p-4 rounded-full bg-[#FEFCF8] shadow-sm border border-obsidian/[0.04]"
                  >
                    {r.icon || <Icon className="w-10 h-10 text-roots-orange stroke-1" />}
                  </motion.div>
                  <h3 className="font-serif text-2xl text-obsidian mb-4">{r.title}</h3>
                  <p className="font-sans text-warm-gray text-sm leading-relaxed">{r.body}</p>
                </div>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      {/* ─── MODEL OVERVIEW ───────────────────────────── */}
      <section className="bg-obsidian py-24 overflow-hidden">
        <div className="container mx-auto px-6 md:px-16 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeader
              eyebrow="THE NUMBERS"
              heading={cmsData?.modelHeading || "A model built to win."}
              align="center"
              className="[&_.eyebrow]:text-roots-orange/70 [&_h2]:text-parchment"
            />
          </motion.div>

          <div className="mt-16 grid md:grid-cols-2 gap-px bg-parchment/[0.06] rounded-2xl overflow-hidden">
            {modelPoints.map((point: any, idx: number) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: idx * 0.08, // Staggering the rows
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="bg-obsidian px-10 py-8 flex items-start justify-between gap-6 border-b border-parchment/[0.06] group hover:bg-[#1A1008]/80 transition-colors"
              >
                <span className="font-sans text-sm text-parchment/50 uppercase tracking-widest flex-shrink-0 group-hover:text-roots-orange transition-colors duration-300">
                  {point.label}
                </span>
                <span className="font-serif text-lg text-parchment text-right">
                  {point.value}
                </span>
              </motion.div>
            ))}
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-6 font-sans text-parchment/30 text-xs text-center"
          >
            All figures indicative — final numbers depend on location, size, and market. Detailed projection shared post-enquiry.
          </motion.p>
        </div>
      </section>

      {/* ─── ENQUIRY CTA ──────────────────────────────── */}
      <section className="bg-roots-orange py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-16 max-w-4xl text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-4xl md:text-6xl text-parchment leading-[1.05] mb-5"
          >
            Ready to start the conversation?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-sans text-parchment/80 text-base md:text-lg max-w-lg mx-auto mb-10"
          >
            Reach out via WhatsApp or email. We&apos;ll share our franchise kit,
            arrange a call with the founder, and walk you through every step.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
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
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────── */}
      <section className="bg-parchment py-24">
        <div className="container mx-auto px-6 md:px-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeader
              eyebrow="COMMON QUESTIONS"
              heading={cmsData?.faqHeading || "FAQ"}
              align="left"
            />
          </motion.div>
          
          <div className="mt-12 divide-y divide-obsidian/[0.08]">
            {faqs.map((faq: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="py-8 group"
              >
                <h3 className="font-sans text-[15px] font-semibold text-obsidian mb-3 group-hover:text-roots-orange transition-colors">
                  {faq.q}
                </h3>
                <p className="font-sans text-warm-gray text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Take the first step today."
        subtext="Every Root's branch started with one conversation. Let's have ours."
        ctaLabel="Enquire via WhatsApp"
      />
    </>
  );
}
