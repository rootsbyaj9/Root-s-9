/**
 * scripts/seed-booking-services.mjs
 *
 * Pushes all booking services from the fixture to Sanity CMS.
 * Also patches the Yamjal branch location document.
 *
 * Run: node scripts/seed-booking-services.mjs
 */

import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'ncrxhomy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skDn0m93X5cgGVk9euXH8Hcmv8xBTZOzHtuum8fHFN3T7xF2wKptqxkUbw0l9v0B1oXTy8XsPIxp6ilkIEQ4fP17M2S7C20ovFr84DDrXm0GgvLAxsuB4sE3051lazbuFu4UH9oFkT06p7YVGJUl4HmfC2bQSAKmKkJY0jZ0cAEBBrbx2W80',
  useCdn: false,
});

// ── Full service catalog (mirrors src/fixtures/booking-services.ts) ──────────
const ALL = ['uppal', 'tarnaka', 'yamjal'];
const UT  = ['uppal', 'tarnaka'];
const U   = ['uppal'];

const SERVICES = [
  // HAIR SERVICES
  { serviceId: 'hs-haircut',         name: 'Haircut & Blowdry',                  category: 'Hair Services',           categorySlug: 'hair-services',         audience: 'women',  description: 'Personalized cut suited to face shape with a relaxing wash and finish blowdry.',                         durationMinutes: 45,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 1  },
  { serviceId: 'hs-haircut-styling', name: 'Haircut & Styling',                  category: 'Hair Services',           categorySlug: 'hair-services',         audience: 'women',  description: 'Precision cut with iron or roller set styling for an event-ready finish.',                               durationMinutes: 60,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 2  },
  { serviceId: 'hs-trim',           name: 'Hair Trim',                           category: 'Hair Services',           categorySlug: 'hair-services',         audience: 'women',  description: 'Quick dusting of split ends to maintain length and shape.',                                              durationMinutes: 20,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 3  },
  { serviceId: 'hs-blowdry',        name: 'Blowdry Finish',                      category: 'Hair Services',           categorySlug: 'hair-services',         audience: 'women',  description: 'Smooth, voluminous blowdry finish — no cut.',                                                            durationMinutes: 30,  isAddOn: true,  canCombine: true,  active: true, branchIds: ALL, displayOrder: 4  },
  { serviceId: 'hs-iron-tong',      name: 'Iron / Tong Set',                     category: 'Hair Services',           categorySlug: 'hair-services',         audience: 'women',  description: 'Flat iron straightening or curling tong waves for special occasions.',                                   durationMinutes: 30,  isAddOn: true,  canCombine: true,  active: true, branchIds: ALL, displayOrder: 5  },
  // HAIR COLOR
  { serviceId: 'hc-global-color',   name: 'Global Hair Color',                   category: 'Hair Color & Highlights', categorySlug: 'hair-color-highlights', audience: 'women',  description: 'Full head single-tone color using professional ammonia-free formulations.',                             durationMinutes: 90,  isAddOn: false, canCombine: false, active: true, branchIds: UT,  displayOrder: 1  },
  { serviceId: 'hc-highlights-full',name: 'Full Head Highlights',                category: 'Hair Color & Highlights', categorySlug: 'hair-color-highlights', audience: 'women',  description: 'Classic foil highlights for brightness and dimension across the full head.',                             durationMinutes: 120, isAddOn: false, canCombine: false, active: true, branchIds: UT,  displayOrder: 2  },
  { serviceId: 'hc-highlights-partial', name: 'Partial Highlights',              category: 'Hair Color & Highlights', categorySlug: 'hair-color-highlights', audience: 'women',  description: 'Face-framing or crown highlights for a sun-kissed look.',                                               durationMinutes: 75,  isAddOn: false, canCombine: false, active: true, branchIds: UT,  displayOrder: 3  },
  { serviceId: 'hc-balayage',       name: 'Balayage',                            category: 'Hair Color & Highlights', categorySlug: 'hair-color-highlights', audience: 'women',  description: 'Hand-painted seamless dimension with ammonia-free color, includes gloss toner.',                         durationMinutes: 180, isAddOn: false, canCombine: false, active: true, branchIds: UT,  displayOrder: 4  },
  { serviceId: 'hc-ombre',          name: 'Ombré & Sombré',                      category: 'Hair Color & Highlights', categorySlug: 'hair-color-highlights', audience: 'women',  description: 'Gradient color transition from roots to ends for a natural fade effect.',                               durationMinutes: 150, isAddOn: false, canCombine: false, active: true, branchIds: UT,  displayOrder: 5  },
  { serviceId: 'hc-toner',          name: 'Toner / Gloss Treatment',             category: 'Hair Color & Highlights', categorySlug: 'hair-color-highlights', audience: 'women',  description: 'Semi-permanent toner to neutralize brassiness and add glossy shine.',                                   durationMinutes: 30,  isAddOn: true,  canCombine: true,  active: true, branchIds: UT,  displayOrder: 6  },
  { serviceId: 'hc-root-touch',     name: 'Root Touch-Up',                       category: 'Hair Color & Highlights', categorySlug: 'hair-color-highlights', audience: 'women',  description: 'Re-color grown-out roots to match or refresh existing color.',                                           durationMinutes: 60,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 7  },
  // HAIR TREATMENTS
  { serviceId: 'ht-keratin',        name: 'Keratin Smoothing Treatment',          category: 'Hair Treatments & Spa',  categorySlug: 'hair-treatments-spa',   audience: 'women',  description: 'Professional keratin to eliminate frizz and add mirror shine for up to 3 months.',                       durationMinutes: 150, isAddOn: false, canCombine: false, active: true, branchIds: UT,  displayOrder: 1  },
  { serviceId: 'ht-hair-botox',     name: 'Hair Botox & Anti-Frizz Infusion',    category: 'Hair Treatments & Spa',  categorySlug: 'hair-treatments-spa',   audience: 'women',  description: 'Intense moisture and protein therapy restoring softness and manageability.',                               durationMinutes: 150, isAddOn: false, canCombine: false, active: true, branchIds: UT,  displayOrder: 2  },
  { serviceId: 'ht-smoothening',    name: 'Hair Smoothening',                    category: 'Hair Treatments & Spa',  categorySlug: 'hair-treatments-spa',   audience: 'women',  description: 'Chemical straightening for long-lasting sleek, manageable hair.',                                         durationMinutes: 180, isAddOn: false, canCombine: false, active: true, branchIds: UT,  displayOrder: 3  },
  { serviceId: 'ht-hair-spa',       name: 'Hair Spa',                            category: 'Hair Treatments & Spa',  categorySlug: 'hair-treatments-spa',   audience: 'women',  description: 'Deep conditioning mask, scalp massage, steam, and nourishing serum application.',                        durationMinutes: 60,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 4  },
  { serviceId: 'ht-scalp-treatment',name: 'Scalp Treatment',                     category: 'Hair Treatments & Spa',  categorySlug: 'hair-treatments-spa',   audience: 'women',  description: 'Targeted scalp therapy for dandruff, dryness, or oil control.',                                         durationMinutes: 45,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 5  },
  // WAXING
  { serviceId: 'wx-full-body',      name: 'Full Body Waxing',                    category: 'Waxing & Body Care',     categorySlug: 'waxing-body-care',      audience: 'women',  description: 'Complete full-body waxing using premium Rica or chocolate wax.',                                         durationMinutes: 90,  isAddOn: false, canCombine: false, active: true, branchIds: ALL, displayOrder: 1  },
  { serviceId: 'wx-half-legs',      name: 'Half Leg Waxing',                     category: 'Waxing & Body Care',     categorySlug: 'waxing-body-care',      audience: 'women',  description: 'Below-knee smooth waxing.',                                                                              durationMinutes: 30,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 2  },
  { serviceId: 'wx-full-legs',      name: 'Full Leg Waxing',                     category: 'Waxing & Body Care',     categorySlug: 'waxing-body-care',      audience: 'women',  description: 'Complete leg waxing from ankle to hip.',                                                                durationMinutes: 45,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 3  },
  { serviceId: 'wx-underarm',       name: 'Underarm Waxing',                     category: 'Waxing & Body Care',     categorySlug: 'waxing-body-care',      audience: 'women',  description: 'Quick and comfortable underarm hair removal.',                                                           durationMinutes: 15,  isAddOn: true,  canCombine: true,  active: true, branchIds: ALL, displayOrder: 4  },
  { serviceId: 'wx-arms',           name: 'Full Arm Waxing',                     category: 'Waxing & Body Care',     categorySlug: 'waxing-body-care',      audience: 'women',  description: 'Smooth arm waxing from wrist to shoulder.',                                                             durationMinutes: 30,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 5  },
  // SKIN CARE
  { serviceId: 'sk-basic-facial',   name: 'Basic Facial & Cleanup',              category: 'Skin Care & Facials',    categorySlug: 'skin-care-facials',     audience: 'women',  description: 'Deep cleanse, exfoliation, steam, extraction, and hydrating mask.',                                       durationMinutes: 60,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 1  },
  { serviceId: 'sk-hydra-facial',   name: 'HydraFacial',                         category: 'Skin Care & Facials',    categorySlug: 'skin-care-facials',     audience: 'women',  description: 'Multi-step hydration facial: cleanse, exfoliate, extract, peptide infuse, LED finish.',                  durationMinutes: 60,  isAddOn: false, canCombine: true,  active: true, branchIds: UT,  displayOrder: 2  },
  { serviceId: 'sk-dtan',           name: 'D-Tan Facial',                        category: 'Skin Care & Facials',    categorySlug: 'skin-care-facials',     audience: 'women',  description: 'Tan removal and skin brightening treatment with anti-pigmentation mask.',                                durationMinutes: 45,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 3  },
  { serviceId: 'sk-gold-facial',    name: 'Gold Facial',                         category: 'Skin Care & Facials',    categorySlug: 'skin-care-facials',     audience: 'women',  description: 'Luxury gold-infused anti-aging facial for radiance and firmness.',                                       durationMinutes: 75,  isAddOn: false, canCombine: false, active: true, branchIds: UT,  displayOrder: 4  },
  { serviceId: 'sk-detan-body',     name: 'Full Body D-Tan',                     category: 'Skin Care & Facials',    categorySlug: 'skin-care-facials',     audience: 'women',  description: 'Full-body tan removal scrub and brightening mask.',                                                      durationMinutes: 90,  isAddOn: false, canCombine: false, active: true, branchIds: UT,  displayOrder: 5  },
  // THREADING
  { serviceId: 'th-eyebrow',        name: 'Eyebrow Threading',                   category: 'Threading & Cleanup',    categorySlug: 'threading-cleanup',     audience: 'women',  description: 'Precise eyebrow shaping with thread.',                                                                  durationMinutes: 15,  isAddOn: true,  canCombine: true,  active: true, branchIds: ALL, displayOrder: 1  },
  { serviceId: 'th-upperlip',       name: 'Upper Lip Threading',                 category: 'Threading & Cleanup',    categorySlug: 'threading-cleanup',     audience: 'women',  description: 'Clean upper lip hair removal with thread.',                                                              durationMinutes: 10,  isAddOn: true,  canCombine: true,  active: true, branchIds: ALL, displayOrder: 2  },
  { serviceId: 'th-full-face',      name: 'Full Face Threading',                 category: 'Threading & Cleanup',    categorySlug: 'threading-cleanup',     audience: 'women',  description: 'Complete face threading: brows, upper lip, chin, sides, forehead.',                                      durationMinutes: 30,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 3  },
  { serviceId: 'th-cleanup',        name: 'Face Cleanup',                        category: 'Threading & Cleanup',    categorySlug: 'threading-cleanup',     audience: 'women',  description: 'Quick 30-minute express cleanup: cleanse, exfoliate, mask, and moisturize.',                             durationMinutes: 30,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 4  },
  { serviceId: 'th-bleach',         name: 'Face Bleach',                         category: 'Threading & Cleanup',    categorySlug: 'threading-cleanup',     audience: 'women',  description: 'Lightening face bleach for even skin tone and fine hair removal.',                                      durationMinutes: 20,  isAddOn: true,  canCombine: true,  active: true, branchIds: ALL, displayOrder: 5  },
  // MANICURE & PEDICURE
  { serviceId: 'mn-basic-manicure', name: 'Basic Manicure',                      category: 'Manicure & Pedicure',    categorySlug: 'manicure-pedicure',     audience: 'women',  description: 'Nail shaping, cuticle care, hand scrub, massage, and polish.',                                         durationMinutes: 30,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 1  },
  { serviceId: 'mn-luxury-manicure',name: 'Luxury Spa Manicure',                 category: 'Manicure & Pedicure',    categorySlug: 'manicure-pedicure',     audience: 'women',  description: 'Indulgent manicure with paraffin wrap, callus remover, collagen mask, and gel finish.',                durationMinutes: 60,  isAddOn: false, canCombine: true,  active: true, branchIds: UT,  displayOrder: 2  },
  { serviceId: 'mn-basic-pedicure', name: 'Basic Pedicure',                      category: 'Manicure & Pedicure',    categorySlug: 'manicure-pedicure',     audience: 'women',  description: 'Foot soak, scrub, nail trim, cuticle care, massage, and polish.',                                       durationMinutes: 45,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 3  },
  { serviceId: 'mn-luxury-pedicure',name: 'Luxury Spa Pedicure',                 category: 'Manicure & Pedicure',    categorySlug: 'manicure-pedicure',     audience: 'women',  description: 'Therapeutic pedicure with fish/salt scrub, paraffin wrap, and gel finish.',                            durationMinutes: 75,  isAddOn: false, canCombine: false, active: true, branchIds: UT,  displayOrder: 4  },
  { serviceId: 'mn-gel-nails',      name: 'Gel Nail Extensions',                 category: 'Manicure & Pedicure',    categorySlug: 'manicure-pedicure',     audience: 'women',  description: 'Builder gel extensions for length and strength with your choice of finish.',                            durationMinutes: 90,  isAddOn: false, canCombine: false, active: true, branchIds: UT,  displayOrder: 5  },
  { serviceId: 'mn-nail-art',       name: 'Nail Art (per nail)',                 category: 'Manicure & Pedicure',    categorySlug: 'manicure-pedicure',     audience: 'women',  description: 'Custom nail art designs — florals, gems, chrome, ombre, or freehand.',                                 durationMinutes: 30,  isAddOn: true,  canCombine: true,  active: true, branchIds: UT,  displayOrder: 6  },
  // BRIDAL
  { serviceId: 'br-bridal-hd',      name: 'HD Bridal Makeup',                    category: 'Bridal & Party Makeup',  categorySlug: 'bridal-party-makeup',   audience: 'bridal', description: 'Long-wear waterproof HD airbrush bridal makeup with jewelry placement and touch-up kit.',             durationMinutes: 120, isAddOn: false, canCombine: true,  active: true, branchIds: UT,  displayOrder: 1  },
  { serviceId: 'br-bridal-package', name: 'Complete Signature Bridal Package',   category: 'Bridal & Party Makeup',  categorySlug: 'bridal-party-makeup',   audience: 'bridal', description: 'HD makeup, hair setting, jewelry placement, saree draping, and touch-up kit.',                         durationMinutes: 210, isAddOn: false, canCombine: false, active: true, branchIds: UT,  displayOrder: 2  },
  { serviceId: 'br-party-makeup',   name: 'Party Makeup',                        category: 'Bridal & Party Makeup',  categorySlug: 'bridal-party-makeup',   audience: 'women',  description: 'Glam makeup for receptions, sangeet, mehendi, or any special celebration.',                             durationMinutes: 60,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 3  },
  { serviceId: 'br-engagement-makeup', name: 'Engagement / Pre-Wedding Makeup',  category: 'Bridal & Party Makeup',  categorySlug: 'bridal-party-makeup',   audience: 'bridal', description: 'Tailored makeup for engagement ceremonies and pre-wedding shoots.',                                     durationMinutes: 90,  isAddOn: false, canCombine: true,  active: true, branchIds: UT,  displayOrder: 4  },
  { serviceId: 'br-saree-draping',  name: 'Saree Draping',                       category: 'Bridal & Party Makeup',  categorySlug: 'bridal-party-makeup',   audience: 'women',  description: 'Expert saree draping in multiple regional styles for weddings and events.',                              durationMinutes: 30,  isAddOn: true,  canCombine: true,  active: true, branchIds: ALL, displayOrder: 5  },
  { serviceId: 'br-bridal-hairstyling', name: 'Bridal Hair Styling',             category: 'Bridal & Party Makeup',  categorySlug: 'bridal-party-makeup',   audience: 'bridal', description: 'Custom bridal updo, braid, or open styling with floral or accessory placement.',                        durationMinutes: 60,  isAddOn: true,  canCombine: true,  active: true, branchIds: UT,  displayOrder: 6  },
  // HAIR STYLING
  { serviceId: 'st-updo',           name: 'Updo & Party Styling',                category: 'Hair Styling & Occasion',categorySlug: 'hair-styling-occasion', audience: 'women',  description: 'Elegant updo, chignon, or French twist for parties, functions, and receptions.',                        durationMinutes: 45,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 1  },
  { serviceId: 'st-braid-styling',  name: 'Braid & Plait Styling',               category: 'Hair Styling & Occasion',categorySlug: 'hair-styling-occasion', audience: 'women',  description: 'From classic French braids to bohemian fishtail and Dutch braids.',                                      durationMinutes: 30,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 2  },
  { serviceId: 'st-curling',        name: 'Curling & Wave Set',                  category: 'Hair Styling & Occasion',categorySlug: 'hair-styling-occasion', audience: 'women',  description: 'Beachy waves, barrel curls, or soft romantic waves using heat tools.',                                   durationMinutes: 30,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 3  },
  // PIERCING
  { serviceId: 'pi-ear-lobe',       name: 'Ear Lobe Piercing',                   category: 'Piercing',               categorySlug: 'piercing',              audience: 'unisex', description: 'Hygienic ear lobe piercing with surgical-grade sterilized equipment and starter stud.',                durationMinutes: 15,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 1  },
  { serviceId: 'pi-ear-cartilage',  name: 'Ear Cartilage Piercing',              category: 'Piercing',               categorySlug: 'piercing',              audience: 'unisex', description: 'Helix, tragus, or anti-tragus cartilage piercing with titanium jewelry.',                               durationMinutes: 20,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 2  },
  { serviceId: 'pi-nose',           name: 'Nose Piercing',                       category: 'Piercing',               categorySlug: 'piercing',              audience: 'unisex', description: 'Nostril or septum piercing performed with sterilized hollow needle.',                                  durationMinutes: 15,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 3  },
  // MEN'S GROOMING
  { serviceId: 'mg-haircut',        name: "Men's Haircut",                       category: "Men's Grooming",         categorySlug: 'mens-grooming',         audience: 'men',    description: 'Precision scissor or clipper haircut with wash and finish.',                                             durationMinutes: 30,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 1  },
  { serviceId: 'mg-haircut-beard',  name: "Men's Haircut & Beard Styling",       category: "Men's Grooming",         categorySlug: 'mens-grooming',         audience: 'men',    description: 'Complete grooming session: precision cut with beard sculpt and shape.',                                 durationMinutes: 45,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 2  },
  { serviceId: 'mg-beard-trim',     name: 'Beard Trim & Shape',                  category: "Men's Grooming",         categorySlug: 'mens-grooming',         audience: 'men',    description: 'Expert beard shaping, lining, and moisturizing finish.',                                               durationMinutes: 20,  isAddOn: true,  canCombine: true,  active: true, branchIds: ALL, displayOrder: 3  },
  { serviceId: 'mg-clean-shave',    name: 'Hot Towel Clean Shave',               category: "Men's Grooming",         categorySlug: 'mens-grooming',         audience: 'men',    description: 'Relaxing hot towel and pre-shave oil preparation for a close, smooth shave.',                          durationMinutes: 30,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 4  },
  { serviceId: 'mg-kids-haircut',   name: "Kids' Haircut",                       category: "Men's Grooming",         categorySlug: 'mens-grooming',         audience: 'unisex', description: 'Gentle, fun haircut for children (below 12 years).',                                                  durationMinutes: 25,  isAddOn: false, canCombine: false, active: true, branchIds: ALL, displayOrder: 5  },
  // MEN'S COLOR
  { serviceId: 'mc-global-color',   name: "Men's Global Hair Color",             category: "Men's Hair Color",       categorySlug: 'mens-hair-color',       audience: 'men',    description: 'Full head color covering grey or for a fresh new look.',                                               durationMinutes: 60,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 1  },
  { serviceId: 'mc-beard-color',    name: 'Beard Color',                         category: "Men's Hair Color",       categorySlug: 'mens-hair-color',       audience: 'men',    description: 'Beard tinting or grey coverage with professional dye.',                                                durationMinutes: 30,  isAddOn: true,  canCombine: true,  active: true, branchIds: ALL, displayOrder: 2  },
  { serviceId: 'mc-highlights',     name: "Men's Highlights",                    category: "Men's Hair Color",       categorySlug: 'mens-hair-color',       audience: 'men',    description: 'Subtle bleached highlights for a natural sun-touched look.',                                            durationMinutes: 60,  isAddOn: false, canCombine: false, active: true, branchIds: UT,  displayOrder: 3  },
  // MEN'S SKIN
  { serviceId: 'ms-facial',         name: "Men's Facial & Cleanup",              category: "Men's Skin, Body & Spa", categorySlug: 'mens-skin-body-spa',    audience: 'men',    description: 'Deep-cleansing facial designed for male skin — charcoal detox, exfoliation, mask.',                  durationMinutes: 45,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 1  },
  { serviceId: 'ms-dtan',           name: "Men's D-Tan Treatment",               category: "Men's Skin, Body & Spa", categorySlug: 'mens-skin-body-spa',    audience: 'men',    description: 'Tan removal and brightening treatment for face and neck.',                                             durationMinutes: 30,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 2  },
  { serviceId: 'ms-hair-spa',       name: "Men's Hair Spa",                      category: "Men's Skin, Body & Spa", categorySlug: 'mens-skin-body-spa',    audience: 'men',    description: 'Scalp massage, deep conditioning mask, and steam treatment.',                                          durationMinutes: 45,  isAddOn: false, canCombine: true,  active: true, branchIds: ALL, displayOrder: 3  },
  { serviceId: 'ms-manicure',       name: "Men's Manicure",                      category: "Men's Skin, Body & Spa", categorySlug: 'mens-skin-body-spa',    audience: 'men',    description: 'Nail trim, cuticle care, hand scrub, and mattifying finish.',                                         durationMinutes: 30,  isAddOn: false, canCombine: true,  active: true, branchIds: UT,  displayOrder: 4  },
  { serviceId: 'ms-pedicure',       name: "Men's Pedicure",                      category: "Men's Skin, Body & Spa", categorySlug: 'mens-skin-body-spa',    audience: 'men',    description: 'Foot soak, scrub, nail care, callus removal, and massage.',                                            durationMinutes: 45,  isAddOn: false, canCombine: true,  active: true, branchIds: UT,  displayOrder: 5  },
];

async function main() {
  console.log(`📅 Seeding ${SERVICES.length} booking services to Sanity CMS...\n`);

  let created = 0;
  let updated = 0;

  for (const svc of SERVICES) {
    const docId = `booking-service-${svc.serviceId}`;
    const doc = {
      _type: 'bookingService',
      _id: docId,
      serviceId: { _type: 'slug', current: svc.serviceId },
      name: svc.name,
      category: svc.category,
      categorySlug: svc.categorySlug,
      audience: svc.audience,
      description: svc.description,
      durationMinutes: svc.durationMinutes,
      isAddOn: svc.isAddOn,
      canCombine: svc.canCombine,
      active: svc.active,
      branchIds: svc.branchIds,
      displayOrder: svc.displayOrder,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✅ ${svc.name}`);
      created++;
    } catch (err) {
      console.error(`  ❌ ${svc.name}: ${err.message}`);
    }
  }

  console.log(`\n📍 Patching Yamjal branch location in CMS...`);

  // Patch the Yamjal location — find by shortName Brahmanpally or Yamjal
  const locations = await client.fetch('*[_type == "location"]{ _id, shortName, name }');
  console.log('Existing locations:', locations.map(l => `${l._id}: ${l.shortName || l.name}`).join(', '));

  for (const loc of locations) {
    const lowerName = (loc.shortName || loc.name || '').toLowerCase();
    if (lowerName.includes('brahman') || lowerName.includes('yamjal') || loc._id.includes('yamjal') || loc._id.includes('brahman') || loc._id === 'new-branch') {
      await client.patch(loc._id).set({
        shortName: 'Yamjal',
        name: "Root's The Family Salon — Yamjal",
        address: 'Yamjal, Hyderabad, Telangana 501510',
        googleMapsUrl: 'https://maps.google.com/?q=Root%27s+Family+Salon+Yamjal+Hyderabad',
      }).commit();
      console.log(`  ✅ Patched location ${loc._id} → Yamjal`);
    }
  }

  console.log(`\n🎉 Done! Seeded ${created} booking services.`);
  console.log('   These are now editable in Sanity Studio → 📅 Booking Services');
  console.log('   The /book flow reads CMS first, fixture as fallback.');
}

main().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
