import { defineField, defineType } from 'sanity';

/**
 * bookingService — individual bookable service for the multi-step /book flow.
 *
 * Separate from serviceCategory (which drives the /services menu page).
 * This document drives the /book step 2 service picker.
 * NO price field — prices are never shown in the booking UI.
 */
export const bookingService = defineType({
  name: 'bookingService',
  title: '📅 Booking Services',
  type: 'document',
  groups: [
    { name: 'basics',       title: '📋 Basic Info',      default: true },
    { name: 'booking',      title: '📅 Booking Settings'               },
    { name: 'availability', title: '📍 Branch Availability'            },
  ],
  fields: [
    // ── BASICS ───────────────────────────────────────────────────────────────
    defineField({
      name: 'serviceId',
      title: 'Service ID (unique key)',
      type: 'slug',
      group: 'basics',
      options: { source: 'name' },
      description: 'Click Generate. Used as a stable key — never change after first booking.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      group: 'basics',
      description: 'Displayed in the booking flow and on the confirmation. No prices.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category (display label)',
      type: 'string',
      group: 'basics',
      description: 'e.g. "Hair Services", "Bridal & Party Makeup". Shown as a filter heading.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'categorySlug',
      title: 'Category Slug (filter key)',
      type: 'string',
      group: 'basics',
      description: 'Slug for the category filter, e.g. "hair-services". Must match the category label.',
      options: {
        list: [
          { title: 'Hair Services',              value: 'hair-services'          },
          { title: 'Hair Color & Highlights',    value: 'hair-color-highlights'  },
          { title: 'Hair Treatments & Spa',      value: 'hair-treatments-spa'    },
          { title: 'Waxing & Body Care',         value: 'waxing-body-care'       },
          { title: 'Skin Care & Facials',        value: 'skin-care-facials'      },
          { title: 'Threading & Cleanup',        value: 'threading-cleanup'      },
          { title: 'Manicure & Pedicure',        value: 'manicure-pedicure'      },
          { title: 'Bridal & Party Makeup',      value: 'bridal-party-makeup'    },
          { title: 'Hair Styling & Occasion',    value: 'hair-styling-occasion'  },
          { title: 'Piercing',                   value: 'piercing'               },
          { title: "Men's Grooming",             value: 'mens-grooming'          },
          { title: "Men's Hair Color",           value: 'mens-hair-color'        },
          { title: "Men's Skin, Body & Spa",     value: 'mens-skin-body-spa'     },
        ],
        layout: 'dropdown',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      group: 'basics',
      description: 'One-line description shown on the service card in the booking flow.',
    }),

    // ── BOOKING SETTINGS ─────────────────────────────────────────────────────
    defineField({
      name: 'audience',
      title: 'For whom?',
      type: 'string',
      group: 'booking',
      options: {
        list: [
          { title: '💆 Women',   value: 'women'  },
          { title: '💈 Men',     value: 'men'    },
          { title: '👫 Unisex',  value: 'unisex' },
          { title: '👰 Bridal',  value: 'bridal' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'durationMinutes',
      title: 'Duration (minutes)',
      type: 'number',
      group: 'booking',
      description: 'Appointment slot length. Used to calculate combined duration and filter time slots.',
      validation: Rule => Rule.required().min(5).max(480),
    }),
    defineField({
      name: 'isAddOn',
      title: '➕ Add-on service?',
      type: 'boolean',
      group: 'booking',
      description: 'Enable if this service is typically added to another (e.g. Toner, Nail Art).',
      initialValue: false,
    }),
    defineField({
      name: 'canCombine',
      title: '🔗 Can be combined?',
      type: 'boolean',
      group: 'booking',
      description: 'Enable to allow this service to be booked alongside other services.',
      initialValue: true,
    }),
    defineField({
      name: 'active',
      title: '✅ Active (visible in booking)',
      type: 'boolean',
      group: 'booking',
      description: 'Disable to hide from the booking flow without deleting.',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Sort Order',
      type: 'number',
      group: 'booking',
      description: 'Lower = appears first within its category.',
      initialValue: 10,
    }),

    // ── BRANCH AVAILABILITY ──────────────────────────────────────────────────
    defineField({
      name: 'branchIds',
      title: 'Available at',
      type: 'array',
      group: 'availability',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '📍 Uppal',   value: 'uppal'   },
          { title: '📍 Tarnaka', value: 'tarnaka' },
          { title: '📍 Yamjal',  value: 'yamjal'  },
        ],
        layout: 'grid',
      },
      description: 'Tick every branch where this service is available.',
      validation: Rule => Rule.required().min(1),
    }),
  ],
  orderings: [
    { title: 'Category → Name', name: 'categoryName', by: [{ field: 'categorySlug', direction: 'asc' }, { field: 'name', direction: 'asc' }] },
    { title: 'Sort Order', name: 'displayOrderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', active: 'active' },
    prepare({ title, subtitle, active }) {
      return {
        title: `${active === false ? '⛔ ' : ''}${title || 'Unnamed'}`,
        subtitle: subtitle || '',
      };
    },
  },
});
