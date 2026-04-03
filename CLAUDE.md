# CLAUDE.md â€” Root's The Family Salon

> **North Star:** "Root's website is a gallery, not a brochure. The work is displayed. The price is revealed. The visitor books."

---

## ðŸ¢ PROJECT

**Client:** Root's The Family Salon
**Location:** Hyderabad, India (multi-branch)
**Type:** Conversion-focused salon website
**Primary Goal:** Increase physical footfall to salon branches
**Secondary Goals:**

- Build trust via real transformations and reviews
- Support multi-branch expansion
- Enable franchise enquiries
- Use blog for SEO-driven traffic and proof of results

**Target Audience:**

- Students (price-sensitive, trend-driven)
- Young adults / working professionals (appearance-conscious, quality-focused)
- Gen Z + young professional appeal

**Brand Positioning:** Premium experience + affordable pricing
**Services:** Hair Â· Skin Â· Bridal Â· Tattoo (key differentiator)

---

## ðŸ› ï¸ TECH STACK

| Layer         | Technology                     | Notes                                                       |
| ------------- | ------------------------------ | ----------------------------------------------------------- |
| Framework     | **Next.js 16**                 | App Router, React 19, Turbopack                             |
| CMS           | **Sanity**                     | Headless CMS for blog, services, transformations            |
| Hosting       | **Vercel**                     | Edge functions, image optimization                          |
| Styling       | **Tailwind CSS v4**            | `@import "tailwindcss"` first, then `@theme {}` in `globals.css`. No `tailwind.config.ts`. |
| Fonts         | **next/font** (self-hosted)    | Playfair Display + DM Sans via CSS variables                |
| Smooth Scroll | **Lenis** (`lenis`)            | Global smooth scroll â€” ~~`@studio-freight/lenis`~~ removed  |
| Animations    | **GSAP + ScrollTrigger**       | Scroll reveals, text staggers, counters, parallax           |
| Micro-anim    | **CSS transitions**            | Hovers, focus states, button presses â€” zero JS overhead     |
| Lottie        | **lottie-react**               | Logo animation + branded Jitter Pro exports                 |
| Carousels     | **Swiper**                     | Review carousel, transformation galleries                   |
| Design Tool   | **Jitter Pro** (user has Pro)  | Lottie exports, CSS easing curves, branded micro-animations |
| Utilities     | **clsx + tailwind-merge**      | `cn()` utility for component class merging (from TW skill)  |

### CMS â€” Client Self-Service (Non-Negotiable)

Sanity Studio must be configured so the **client can manage content without a developer**. The interface should feel as simple as editing a Google Doc.

**Client-Editable Content:**

| Section              | What the client can change                                      |
| -------------------- | --------------------------------------------------------------- |
| Hero                 | Background image, headline text, CTA text & link                |
| Offers & Promotions  | Add/remove/edit offers, set expiry dates, toggle visibility     |
| Service Menu         | Prices, service names, descriptions, category images            |
| Transformations      | Upload before/after photos, add client stories                  |
| Reviews              | Add/feature/hide reviews, update rating summary                 |
| Locations            | Branch details, addresses, phone numbers, maps, operating hours |
| Blog                 | Full blog post creation (rich text, images, categories)         |
| About                | Team photos, founder bio, values text                           |
| Franchise            | Requirements, benefits, enquiry form fields                     |
| Footer               | Social links, contact info, operating hours                     |
| Global               | WhatsApp number, site-wide announcement bar, logo               |

**Sanity Studio Rules:**
- Group related fields into clear tabs (Content, Media, Settings)
- Use meaningful field labels in plain English (not developer jargon)
- Add helper text / descriptions on every field so the client knows what it does
- Image fields must show preview thumbnails
- Provide sensible defaults and validation (e.g., image dimensions, required fields)
- Offers must have an "active/inactive" toggle â€” no deleting to hide

---

## ðŸŽ¨ BRAND â€” COLOR PALETTE (LOCKED)

> Inspired by HermÃ¨s: the signature color commands attention because it is surrounded by neutrals.

| Token              | Hex         | Usage                                                    |
| ------------------ | ----------- | -------------------------------------------------------- |
| **Root's Orange**  | `#E87722`   | Primary CTA, logo, links, active states â€” THE identity   |
| **Parchment**      | `#FEFCF8`   | Primary background â€” NOT pure white                      |
| **Linen**          | `#F5EDE0`   | Section alternates, cards, subtle separation              |
| **Warm Obsidian**  | `#1A1008`   | Primary text, headings â€” NOT pure black                  |
| **Blush Orange**   | `#FFF0E6`   | Badge tints, "New" / "Offer" tags, soft highlights        |
| **Warm Gray**      | `#6B5E53`   | Secondary text, captions, meta info                      |

### Color Rules

- **Orange is sacred** â€” used ONLY for CTAs, logo, and primary interactive elements
- **Never use pure white (`#FFF`)** as background â€” always Parchment
- **Never use pure black (`#000`)** for text â€” always Warm Obsidian
- Parchment makes orange look richer and warmer (vs pure white which makes it look like an e-commerce sale tag)
- The palette is **light and premium**, not dark-mode

---

## ðŸŽ¨ DESIGN DIRECTION â€” "EDITORIAL WARMTH" (LOCKED)

> A hybrid of editorial/magazine aesthetics with warm, inviting tones.

### Why This Style

- Gen Z audience â†’ Magazine layouts feel native to Instagram/Pinterest users
- "Gallery, not brochure" â†’ Large imagery sections let the work speak
- Premium but accessible â†’ Warm parchment/linen tones feel inviting, never intimidating
- Multi-branch â†’ Clean grid system scales to location pages easily
- Performance â†’ No heavy WebGL/3D, just smooth CSS transforms + GSAP

### 8 Design Principles (LOCKED)

1. **Layout: Spacious, Rhythmic Sections** â€” Generous whitespace, alternating full-bleed â†” contained sections. No two consecutive sections look the same.
2. **Typography: Large, Confident, Editorial** â€” Playfair Display at large sizes with tight letter-spacing. Eyebrow labels above every heading (small caps, wide tracking, brand orange). No body text smaller than 15px.
3. **Color: The HermÃ¨s Rule** â€” Parchment primary BG, Linen for alternating sections. Orange ONLY for CTAs/active states/star ratings/eyebrows. Dark sections use Warm Obsidian (#1A1008), never pure black.
4. **Animation: Smooth & Purposeful** â€” Scroll-triggered reveals (fade up 24px). Staggered card entrances. Subtle parallax on hero only (15% offset). No bounce/spring on content. Performance-first: only `transform` and `opacity`.
5. **Navigation: Transparent â†’ Solid** â€” Transparent over hero with white text â†’ backdrop-blur parchment on scroll. 250ms transition. Mobile: full-screen overlay with staggered link reveals. CTA always visible.
6. **Cards: Warm, Lifted** â€” 12px radius, warm-toned shadows (never cool gray). Hover: lift 2px + shadow deepens. No hard borders â€” use shadow + background contrast. Images zoom 1.03x on hover.
7. **Imagery: Full-bleed, Authentic** â€” Full-bleed hero with gradient overlay bottom. Service cards: slightly desaturated â†’ saturate on hover. Gallery: clean masonry, 8px gaps max.
8. **CTAs: Persistent, Not Aggressive** â€” Sticky WhatsApp bottom-right. Section CTAs at end of content, not mid-flow. Aspirational copy ("Your best look is one appointment away"), never salesy.

### Reference Touchpoints

| Brand | What to take from it |
|-------|---------------------|
| Aesop | Generous spacing, photography-first, restrained color |
| Toni&Guy | Strong brand confidence, editorial photography style |
| Glossier | Warm tones, approachable premium, Gen Z appeal |
| Apple | Smooth scroll animations, section reveals, performance |
| HermÃ¨s | One signature color surrounded by neutrals |

> **Competitive reference audit completed (Phase 0).** See Â§REFERENCE AUDIT section below for the full steal list extracted from Naturals, Bodycraft, YLG, Salon64, and LakmÄ“ Salon.

### What This Style Avoids

- âŒ Busy layouts, generic templates, aggressive popups
- âŒ Dark mode, glassmorphism, heavy WebGL/3D
- âŒ Stock photography aesthetic
- âŒ Trendy effects that don't serve conversion

---

## ðŸ” REFERENCE AUDIT â€” Design Intelligence (Phase 0)

> **Canonical truth source for competitive borrowing.**
> Root's brief is the primary design document. This section captures only validated enhancements from the 5 sites studied.
> Sites: Naturals (IN) Â· Bodycraft (IN) Â· YLG (IN) Â· Salon64 (UK) Â· LakmÄ“ Salon (IN)

### What the References CONFIRM About Root's Brief

| Root's Decision | Reference Validation |
|-----------------|---------------------|
| Playfair Display + DM Sans | Salon64 uses this exact pairing â€” heavy serif headline + clean sans body |
| Parchment/Linen palette | Salon64's cream IS our parchment â€” gold standard for luxury salons |
| Orange (#E87722) as sole accent | Zero competitors use warm orange â€” Root's owns this color entirely |
| WhatsApp as sole conversion endpoint | All 5 Indian sites use floating WhatsApp â€” it converts |
| Animated counters on scroll (not load) | Bodycraft's ticker validates viewport-entry trigger |
| Editorial Warmth design direction | Salon64's entire site IS Editorial Warmth in practice |
| Gallery = real transformations only | No competitor has a before/after slider â€” Root's is genuinely unique |
| Transparent nav â†’ solid on scroll | Universal across all premium sites. Non-negotiable. |
| Tattoo as homepage differentiator | YLG built their business on one differentiator (waxing). Tattoo = Root's moment. |

### âœ… APPROVED STEAL LIST â€” Borrow These

#### 1. Mixed-weight serif headlines [from Salon64]
- **Pattern:** First word BOLD upright Playfair + second word *Italic swash* on the same line
- **Seen as:** `BESPOKE Services` Â· `STYLING Services` (confirmed in screenshots)
- **Root's version:** `TRANSFORM` *Yourself* Â· `SERVICES` *& Family* Â· `ROOT'S` *Artistry*
- **Where to use:** Every section headline on homepage and service pages
- **Cost:** Zero â€” just a className on existing Playfair Display

#### 2. Section numbering 01, 02, 03... [from Salon64]
- **Pattern:** Small superscript number before service category names
- **Root's version:** `01 HAIR` Â· `02 SKIN` Â· `03 BRIDAL` Â· `04 TATTOO`
- **Where to use:** Services section on homepage + each service inner page header
- **Effect:** Curated catalog journey, not a generic list

#### 3. Fine 0.5px horizontal rule dividers [from Salon64]
- **Pattern:** `border-bottom: 0.5px solid var(--color-border)` between sections and list items
- **Root's version:** Between service price rows, footer columns, and below eyebrow labels
- **Effect:** Typographic structure without visual weight

#### 4. "from â‚¹X" right-aligned pricing [from Salon64 + Bodycraft]
- **Pattern:** Service name flush-left Â· `from â‚¹X` flush-right Â· hairline rule between rows
- **Root's version:**
  ```
  Cut & Blowdry                from â‚¹299
  Smoothening                  from â‚¹1,499
  Hair Colour                  from â‚¹799
  ```
- **Where to use:** All service inner-page price lists
- **Effect:** Desire before price; "from" softens price anxiety

#### 5. Dismissible offer strip above navbar [from Bodycraft]
- **Pattern:** Single-line orange bar above the nav with short offer copy + dismiss âœ• button
- **Root's version:** CMS-editable via Sanity (maps to future CMS-06 requirement)
- **Effect:** High-converting first touchpoint, especially for first-time visitors

#### 6. Eyebrow small-caps labels [from Salon64]
- **Pattern:** `INTRODUCTION` Â· `OUR SALON` â€” DM Sans 500, all-caps, letter-spacing 0.1em
- **Root's version:** `SERVICES` Â· `GALLERY` Â· `ABOUT US` â€” in Root's Orange or Warm Gray
- **Where to use:** Above every section heading on the homepage
- **Effect:** Visual hierarchy without extra font sizes

#### 7. "Bridal Journey" framing [from LakmÄ“'s NOOR collection]
- **Pattern:** Bridal is a journey (Consultation â†’ Pre-Bridal â†’ The Day), not a single booking
- **Root's version:** "The Root's Bridal Radiance â€” Your 30-Day Journey to the Aisle"
- **Where to use:** Bridal inner page (Milestone 2 â€” not homepage)
- **Effect:** Higher perceived value, longer client relationship

#### 8. Trust number strip [from Naturals + Bodycraft]
- **Pattern:** `12+ Years Â· 50K+ Clients Â· 8 Branches Â· 4.9â˜…` â€” count-up on scroll
- **Root's use:** Already in REQUIREMENTS.md as TRST-01 to TRST-03 âœ… (reference validates it)

### âŒ DO NOT BORROW â€” Never Do These

| Feature | From | Why |
|---------|------|-----|
| Auto-rotating carousel hero | Naturals | Destroys cinematic first impression. Root's hero = single full-bleed photo. |
| Dual SALON / CLINIC toggle nav | Bodycraft | Root's is one brand. Extra navigation = confusion. |
| Gamified slot-machine popup | Bodycraft | Cheap. Brand-damaging. Never. |
| Mega-menu footer | LakmÄ“ | Root's scale doesn't warrant it. 3-column footer only. |
| Icon-grid service navigation | YLG | Not editorial. Root's uses expanding image columns. |
| Gold gradient CTAs | LakmÄ“ | Root's has orange. One accent, never two. |

### Root's Competitive Moat

Not one of the five sites has any of the following:

| Feature | Root's Plan |
|---------|------------|
| Lenis smooth scroll | âœ… SmoothScroll.tsx built |
| GSAP word-by-word text reveals | âœ… Planned (SplitType + GSAP) |
| Scroll-gated counter animations | âœ… REQUIREMENTS.md TRST-01 |
| Before/after drag slider | âœ… assets ready (before.jpg + after.jpg) |
| Tattoo as homepage editorial section | âœ… Planned with dark-tone treatment |
| Warm orange as brand color | âœ… #E87722 â€” zero competition |
| Mixed-weight Playfair editorial headlines | âœ… Now added via steal list above |

**Deploy these precisely â€” as storytelling, not decoration.**

---

## âœï¸ BRAND â€” TYPOGRAPHY

| Role       | Font               | Weight       | Usage                                     |
| ---------- | ------------------ | ------------ | ----------------------------------------- |
| Headlines  | **Playfair Display**| 400, 600, 700| H1â€“H3, hero text, section titles          |
| Body       | **DM Sans**        | 400, 500, 700| Paragraphs, UI, buttons, navigation       |

### Typography Rules

- Both fonts self-hosted via `next/font` (no Google Fonts CDN)
- Playfair echoes the logo's serif DNA â€” the website feels like it belongs to the same brand family
- DM Sans for everything functional â€” clean, geometric, screen-optimized
- **Alternative consideration:** Clash Display (free from Fontshare) if a more modern/editorial headline feel is desired

---

## ðŸŽ¬ BRAND â€” LOGO

- **Primary mark:** Scissors-as-a-person concept (communicates "salon" + "family" in one symbol)
- **Brand color in logo:** `#E87722`
- **Available formats:** PNG with black bg, PNG with no bg, icon-only
- **âš ï¸ NEEDED:** SVG vector file (required for animations, favicon, and large-size rendering)
- **Icon-only version** â†’ use for anything under 40px height (navbar, favicon)

### Logo Animation

- **Loading screen:** Snip reveal (scissors cutting to reveal logo) â€” built in Jitter Pro, exported as Lottie
- **Navbar:** Wipe-in on first page load
- Both use only `transform` and `opacity` (GPU-composited, no layout triggers)

---

## ðŸ—ºï¸ SITEMAP (LOCKED â€” DO NOT MODIFY)

```
â”œâ”€â”€ Home
â”œâ”€â”€ Services
â”œâ”€â”€ Transformations
â”œâ”€â”€ Locations
â”œâ”€â”€ Reviews
â”œâ”€â”€ Blog
â”‚   â””â”€â”€ Blog Post (dynamic)
â”œâ”€â”€ About
â””â”€â”€ Franchise
```

---

## ðŸ“„ PAGE STRUCTURES

### Home

1. Hero (full-width transformation image, logo animation, primary CTA)
2. Offers & Promotions
3. Our Expertise (service highlights)
4. Real Transformations (before/after preview)
5. Why Choose Us
6. What Our Clients Say (review carousel)
7. CTA
8. Footer

### Services

1. Header
2. Service Categories (Hair, Skin, Tattoo, Bridal)
3. Service Details (card hover: price slides up after photo)
4. Why Choose Us
5. Transformations Preview
6. CTA
7. Footer

### Transformations

1. Header
2. Transformation Categories
3. Before & After Transformations (full-width drag slider)
4. Client Transformation Stories
5. CTA
6. Footer

### Locations

1. Header
2. Our Locations (branch cards)
3. Branch Map
4. CTA
5. Footer

### Reviews

1. Header
2. Rating Summary
3. Customer Reviews
4. Featured Reviews (optional)
5. CTA
6. Footer

### Blog

1. Header
2. Categories
3. Featured Articles (optional)
4. All Articles
5. CTA
6. Footer

### Blog Post

1. Header
2. Article Content
3. Related Articles
4. CTA
5. Footer

### About

1. Header
2. Who We Are
3. Founder
4. Our Values
5. Our Vision
6. CTA
7. Footer

### Franchise

1. Header
2. Franchise Opportunity
3. Benefits
4. Requirements
5. How It Works
6. Enquiry Section
7. CTA
8. Footer

---

## ðŸŽ­ ANIMATION ARCHITECTURE (LOCKED)

### 3-Tool System (No Overlap)

| Tool | What it handles | Why |
|------|----------------|-----|
| **CSS** | Hovers, focus states, button presses, simple transitions | Zero dependency, GPU-native, fastest |
| **GSAP + ScrollTrigger** | Scroll-driven reveals, text staggers, counters, parallax | Precise timeline control, scrub support |
| **Lottie (Jitter Pro)** | Logo animation, branded illustrations, decorative motion | High-fidelity design-to-code, tiny file size |

### Critical Setup Rules (Non-Negotiable)

#### 1. Plugin Registration â€” Do Once at App Level
All GSAP plugins must be registered before use or they silently do nothing.
Registered in `src/lib/gsap-config.ts` â€” import this file, never register inline:
```ts
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap-config';
```
> SplitText is **free** since Webflow acquired GSAP (May 2025) â€” no Club GreenSock needed.

#### 2. Lenis + GSAP ScrollTrigger Sync â€” Mandatory
Without this sync, ScrollTrigger calculates scroll positions against the native scroll,
not Lenis's virtual scroll â€” all animations fire at wrong times.
```ts
// In SmoothScroll.tsx â€” already implemented
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);
```

#### 3. Lenis `autoRaf: false` â€” Always
Since GSAP ticker drives the RAF loop, Lenis must NOT run its own RAF.
Using `autoRaf: true` + GSAP ticker = Lenis ticks twice = visible stutter.
```ts
const lenis = new Lenis({ autoRaf: false }); // always false in this project
```

#### 4. `useGSAP` with `scope` â€” Every Component
Use `@gsap/react`'s `useGSAP` hook (not raw `useEffect`) for automatic cleanup.
Always scope to a container ref to prevent selector leaks across components:
```tsx
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';

const containerRef = useRef<HTMLDivElement>(null);

useGSAP(() => {
  gsap.fromTo('.card', { opacity: 0, y: 24 }, { opacity: 1, y: 0 });
}, { scope: containerRef }); // â† non-negotiable: prevents selector leaks
```

### Global Animations (every page)

| Animation           | Tool          | Trigger          | Notes                           |
| ------------------- | ------------- | ---------------- | ------------------------------- |
| Smooth scroll       | Lenis         | Always           | `autoRaf: false`, GSAP ticker drives RAF |
| Section fade-up     | GSAP + ST     | Scroll into view | Rise 24px + fade in, 0.6s       |
| Text word-rise      | GSAP SplitText| Scroll into view | Free since May 2025. Register in gsap-config.ts |
| Counter animation   | GSAP          | Scroll into view | Numbers count up, 2s duration   |
| Staggered cards     | GSAP + ST     | Scroll into view | Cards cascade, 100ms stagger    |
| Image clip reveal   | GSAP + ST     | Scroll into view | clipPath unveil from edge       |

### Page-Specific Animations

| Page            | Element                | Animation                              |
| --------------- | ---------------------- | -------------------------------------- |
| Home            | Hero                   | Parallax image (15% offset) + text reveal |
| Home            | Stats counter strip    | Count-up on scroll (Playfair numerals) |
| Services        | Service cards          | Hover â†’ image zoom 1.03x + shadow lift |
| Transformations | Before/After slider    | Drag thumb, full-width, orange handle  |
| Reviews         | Testimonial carousel   | Swiper with fade transition            |
| All pages       | Loading screen (first) | Logo snip reveal (Lottie from Jitter)  |

### CSS Micro-Interactions (every page)

| Element | Hover Effect |
|---------|-------------|
| CTA buttons | Lift 1px + shadow deepens. Active: press down 1px |
| Nav links | Color â†’ orange + underline grows from center |
| Service cards | Image zoom 1.03x + shadow + slight lift |
| Gallery images | Saturation increase + scale(1.02) |
| WhatsApp btn | Scale 1.1 + pulse ring animation |
| Input fields | Border â†’ brand orange on focus |

### Jitter Pro Exports (User Creates)

1. **Logo snip reveal** â†’ Lottie JSON, <2s, plays once on first visit
2. **Scissors divider** â†’ Lottie JSON, loop, optional decorative
3. **Custom easing curves** â†’ "Copy as CSS" from Jitter
4. **Any other animations user likes** â†’ Lottie JSON, drop in `public/animations/`

### Performance Budget (LOCKED)

| Metric | Target |
|--------|--------|
| FPS | 60fps on mid-range phones |
| Lottie file size | < 50KB per animation |
| GSAP bundle | ~30KB gzipped (core + ScrollTrigger) |
| LCP | < 2.5s |
| CLS | 0 |
| PageSpeed | 95+ |

### Performance Rules

- **Only animate `transform` and `opacity`** â€” never layout-triggering properties
- Use `gsap.matchMedia()` to simplify (not disable) animations on low-spec devices
- Respect `prefers-reduced-motion` â€” instant state changes, no animation
- Lazy load all below-fold images
- Use `next/image` for automatic WebP/AVIF conversion
- Preload hero image, defer all other assets
- No mobile fallbacks â€” one responsive implementation that works everywhere
- Stagger delays: 40â€“60ms between elements to avoid CPU spikes

---

## ðŸš« NON-NEGOTIABLE LAWS

### Design Laws

1. **This is a conversion system, not an informational website.** Every section must drive toward a CTA.
2. **The work speaks louder than words.** Transformations and real photos are the core conversion engine. Never use stock images.
3. **Premium look, accessible pricing.** The site must feel luxury but never intimidate with price.
4. **No generic, corporate, or cluttered layouts.** Every element must earn its place on the page.
5. **Every page ends with a CTA.** No exceptions. The booking/WhatsApp CTA is the final destination.
6. **Orange is sacred.** `#E87722` is reserved for CTAs, logo, and primary interactive elements only. Never use it as wallpaper.
7. **No pure white backgrounds.** Always Parchment (`#FEFCF8`). Pure white makes the brand orange feel cheap.
8. **No pure black text.** Always Warm Obsidian (`#1A1008`).
9. **No stock images. Ever.** If real photos aren't available, use placeholders clearly marked for replacement â€” but never ship stock.
10. **Mobile-first responsive design.** The majority of visitors will be on phones.

### Structural Laws

11. **No "Feature Section" naming** in code or UI â€” use descriptive, conversion-focused names.
12. **No timeline sections** â€” removed during strategy refinement.
13. **No newsletter sections** â€” booking via WhatsApp is the only conversion path.
14. **No duplicate logic** between sections â€” each section has one clear purpose.
15. **Sitemap is locked.** 9 pages. Do not add, remove, or rename pages without explicit approval.

### Technical Laws

16. **Animations only on `transform` and `opacity`** â€” zero layout-triggering animations.
17. **Self-host all fonts** via `next/font` â€” no external CDN calls. Always include `display: 'swap'`.
18. **All images through `next/image`** â€” automatic optimization, lazy loading, responsive sizes.
19. **WhatsApp Business is the primary conversion endpoint** â€” all CTAs route to WhatsApp click-to-chat.
20. **Target 95+ PageSpeed** with all animations running.
21. **No separate mobile fallbacks** â€” one responsive implementation, fast on all devices and networks.
22. **Use `cn()` utility** â€” requires `tailwind-merge@^3` for Tailwind v4. v2 silently breaks class merging.
23. **React 19: no forwardRef** â€” `ref` is a regular prop.
24. **Tailwind v4: CSS-first config** â€” `@import "tailwindcss"` FIRST in globals.css, tokens in `@theme {}`. No `tailwind.config.ts`.
25. **GSAP: always use `useGSAP` from `@gsap/react`** â€” never raw `useEffect`. Always include `{ scope: containerRef }`.
26. **GSAP: register plugins once** in `src/lib/gsap-config.ts` â€” never inline in components.
27. **Lenis: `autoRaf: false`** â€” GSAP ticker drives the RAF loop. Sync required: see `SmoothScroll.tsx`.
28. **`SplitType` import is capitalized** â€” `import SplitType from 'split-type'` (capital S). Wrong case fails silently.
29. **All GSAP animation components need `'use client'`** â€” GSAP is browser-only, not SSR-safe.

### Content Laws

21. **Copy creates desire, not information.** The tone is aspirational, not corporate.
22. **Tattoo is the key differentiator.** Give it distinct visual treatment, almost like a sub-brand.
23. **Reviews and transformations are social proof** â€” they must feel real, raw, and trustworthy.
24. **Blog exists for SEO** â€” local SEO articles, problem-based content, offer/event-driven posts.

---

## ðŸ“± CONVERSION FLOW

```
Transformation (desire) â†’ Reviews (trust) â†’ Offers (action trigger) â†’ CTA (conversion via WhatsApp)
```

This is the psychological flow the site follows. Every page reinforces one or more of these stages.

---

## ðŸ“¦ ASSETS NEEDED FROM CLIENT

- [ ] SVG logo file (vector â€” non-negotiable for animations)
- [ ] High-res transformation photos (before/after)
- [ ] Salon interior photos (all branches)
- [ ] Team/staff photos
- [ ] Founder photo + bio
- [ ] Service list with pricing
- [ ] Branch addresses, phone numbers, Google Maps links
- [ ] WhatsApp Business number (must be set up before launch)
- [ ] Google Reviews / testimonials
- [ ] Offers and promotions content
- [ ] Franchise requirements and benefits
- [ ] Blog topics / initial articles (optional â€” can be created)

---

## ðŸ§  WORKING STYLE

- Step-by-step execution preferred
- Manual refinement over automated generation
- High control over structure and naming
- Precision over speed
- Every decision must be intentional â€” no defaults for convenience

---

## CURRENT STATUS

### COMPLETED

- Strategy and positioning
- Sitemap (fully refined and locked)
- Color palette (locked)
- Typography decisions (Playfair Display + DM Sans)
- Animation architecture (locked - 3-tool system)
- Design direction: Editorial Warmth (locked)
- Logo analysis and animation concepts
- Performance strategy
- Asset requirements brief
- Page-by-page section breakdowns
- Design system tokens (integrated into globals.css via @theme)
- CMS client-self-service schema planning
- Phase 0: Reference Audit - Naturals, Bodycraft, YLG, Salon64, Lakme audited
- Foundation: globals.css rewritten, SmoothScroll.tsx built (Lenis + GSAP sync)

### BUILD STATUS - All Pages

| Status | Page | Notes |
|---|---------|------------------------------|
| DONE | Home | Hero, Trust Strip, Services Bento, Gallery, Before/After, Reviews, CTA, Footer |
| DONE | Services | Category grid, service details, GSAP animations |
| DONE | Transformations | Before/after slider, gallery, client stories |
| DONE | Locations | Branch cards, Google Maps embed, contact details |
| DONE | Reviews | Rating summary, Swiper carousel, real reviews |
| DONE | Blog | Hero, featured article, grid, category filter |
| DONE | About | Who we are, Founder, Values, Vision |
| DONE | Franchise | Opportunity, Benefits, Requirements, Enquiry form |

### BUILD STATUS - Global Components

| Status | Component | Notes |
|---|---------|------------------------------|
| DONE | Navbar | Transparent to solid on scroll, WhatsApp CTA, mobile hamburger |
| DONE | Footer | 3-column, branches, social, trust numbers |
| DONE | OfferStrip | Infinite marquee, star separators, dismissible X, 20% OFF new branch / 10% at current |
| DONE | WhatsApp FAB | Sticky bottom-right, pulse ring |
| DONE | ScrollToTop | Smooth scroll |
| DONE | TransitionWrapper | Hero Lottie (hero2.json) plays once ever via localStorage, curtain-raise exit |
| DONE | SmoothScroll | Lenis + GSAP ScrollTrigger sync, autoRaf: false |
| DONE | Favicon | src/app/icon.png |

### ANIMATION - Current State

| Status | Animation | Details |
|---|---------|------------------------------|
| DONE | Hero loading | hero2.json - Jitter Pro word-reveal, plays once ever via localStorage |
| DONE | Page loader | pageloading2.json - kept in /public for future use |
| DONE | Offer marquee | Framer Motion infinite scroll with star separators |
| DONE | Section reveals | GSAP + ScrollTrigger, fade-up 24px |
| DONE | Counter strip | GSAP count-up on scroll |
| DONE | Before/After slider | Drag handle, orange accent |
| DONE | Testimonial carousel | Swiper |
| DONE | Parallax | Hero only, 15% offset |

---

## REMAINING MILESTONES

### Milestone 3 - Sanity CMS Integration (NEXT)

Wire up all client-editable content via Sanity Studio:

| Priority | Schema | What it controls |
|---|---------|------------------------------|
| HIGH | offer | OfferStrip text, active/inactive toggle |
| HIGH | service | Service name, price, category, image |
| HIGH | transformation | Before/after pairs, client story |
| HIGH | review | Reviews, star rating, featured toggle |
| MED | location | Branch details, address, hours, map |
| MED | blogPost | Full rich-text blog with images |
| MED | teamMember | Staff, founder bio, photo |
| LOW | franchiseEnquiry | Form submissions stored in Sanity |
| LOW | siteSettings | WhatsApp number, announcement bar |

### Milestone 4 - Performance and Polish

- Lighthouse 95+ audit (LCP < 2.5s, CLS = 0)
- Real photos from client to replace all placeholders
- next/image optimization audit on all pages
- prefers-reduced-motion pass on all GSAP animations
- Meta tags / OG images per page (SEO)
- sitemap.xml + robots.txt

### Milestone 5 - Launch Prep

- Custom domain setup on Vercel
- Sanity project creation (paid plan for client access)
- Environment variables to Vercel
- Google Search Console submission
- WhatsApp Business number verified and wired to all CTAs

---

*Last updated: 2026-04-04 - All 8 pages built. Global animations complete. Hero Lottie (once-ever) + Infinite Offer Strip shipped. Git pushed. Sanity CMS is the next milestone.*
