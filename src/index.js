'use strict';

// Runs once every time Strapi starts. Both steps below are idempotent —
// safe to run on every restart, won't create duplicates or re-grant
// permissions that already exist.
//
// Strapi 5 note: seeding uses the Document Service API (strapi.documents)
// rather than the deprecated Entity Service (strapi.entityService) used in
// the v4 version of this project. The permission-granting logic below is
// unchanged from v4 — it uses the lower-level Query Engine API
// (strapi.query), which the Entity Service deprecation doesn't affect.

const SEED_SERVICES = [
  {
    name: 'Exterior Wash & Polish',
    description: "Hand wash, foam clean, and polish to bring back your car's outer shine.",
    price: 1500,
    icon: 'droplet',
    order: 1,
    featured: true,
  },
  {
    name: 'Interior Deep Clean',
    description: 'Vacuuming, seat & carpet shampoo, and dashboard cleaning for a fresh cabin.',
    price: 2000,
    icon: 'cloth',
    order: 2,
    featured: true,
  },
  {
    name: 'Full Detailing (In & Out)',
    description:
      'Our most popular package — complete interior and exterior detailing in one visit.',
    price: 3500,
    icon: 'sparkle',
    order: 3,
    featured: true,
  },
  {
    name: 'Engine Bay Cleaning',
    description: 'Safe, careful cleaning of your engine bay to remove dust, oil, and grime.',
    price: 1000,
    icon: 'wrench',
    order: 4,
    featured: false,
  },
  {
    name: 'Headlight Restoration',
    description: 'Restore foggy, yellowed headlights to clear, bright condition.',
    price: 800,
    icon: 'bulb',
    order: 5,
    featured: false,
  },
  {
    name: 'Ceramic Coating (Add-on)',
    description: 'A long-lasting protective shine on top of our full detailing package.',
    price: 8000,
    icon: 'shield',
    order: 6,
    featured: false,
  },
];

const SEED_PRODUCTS = [
  {
    name: 'Premium Car Shampoo',
    description: 'pH-balanced foam shampoo, safe on wax and ceramic coatings. 500ml bottle.',
    price: 950,
    category: 'Cleaning & Detailing',
    icon: 'droplet',
    order: 1,
  },
  {
    name: 'Carnauba Car Wax',
    description: 'Paste wax for a deep, glossy shine that lasts for weeks.',
    price: 1800,
    category: 'Cleaning & Detailing',
    icon: 'sparkle',
    order: 2,
  },
  {
    name: 'Ceramic Spray Sealant',
    description: 'Easy spray-on ceramic coating top-up for between full treatments.',
    price: 2200,
    category: 'Cleaning & Detailing',
    icon: 'shield',
    order: 3,
  },
  {
    name: 'Dashboard & Trim Polish',
    description: 'Matte-finish protectant spray for dashboards, door trims, and tyres.',
    price: 800,
    category: 'Cleaning & Detailing',
    icon: 'spray',
    order: 4,
  },
  {
    name: 'Tyre Shine Gel',
    description: 'Long-lasting gel that restores a deep black finish to tyres.',
    price: 650,
    category: 'Cleaning & Detailing',
    icon: 'tyre',
    order: 5,
  },
  {
    name: 'Microfiber Cloth Set',
    description: 'Pack of 5 lint-free microfiber towels for drying and polishing.',
    price: 700,
    category: 'Cleaning & Detailing',
    icon: 'cloth',
    order: 6,
  },
  {
    name: 'Car Air Freshener',
    description: 'Long-lasting vent-clip air freshener, available in 3 scents.',
    price: 350,
    category: 'Interior Accessories',
    icon: 'sparkle',
    order: 7,
  },
  {
    name: 'Universal Seat Covers',
    description: 'Breathable, water-resistant front seat cover set, fits most sedans.',
    price: 3200,
    category: 'Interior Accessories',
    icon: 'seat',
    order: 8,
  },
  {
    name: 'Steering Wheel Cover',
    description: 'Breathable leatherette cover for a better grip and a fresher look.',
    price: 1200,
    category: 'Interior Accessories',
    icon: 'steering',
    order: 9,
  },
  {
    name: 'Car Floor Mats',
    description: 'Heavy-duty rubber floor mats that trap dust and water — easy to wipe clean.',
    price: 2500,
    category: 'Interior Accessories',
    icon: 'cloth',
    order: 10,
  },
  {
    name: 'Windshield Sun Shade',
    description: "Foldable reflective sunshade that keeps your interior cooler in Lahore's summer heat.",
    price: 700,
    category: 'Exterior Accessories',
    icon: 'sun',
    order: 11,
  },
  {
    name: 'Car Body Cover',
    description: 'Dust- and sun-resistant full body cover for outdoor parking.',
    price: 4500,
    category: 'Exterior Accessories',
    icon: 'shield',
    order: 12,
  },
];

const SEED_TESTIMONIALS = [
  {
    customerName: 'Ahmed Raza',
    location: 'DHA, Lahore',
    quote:
      'They came to my house in Gulberg and my car looked brand new by the time they left. Very polite team.',
    rating: 5,
    order: 1,
  },
  {
    customerName: 'Sana Malik',
    location: 'Johar Town, Lahore',
    quote:
      'Easiest booking ever — I just sent a WhatsApp message and they showed up on time the next day.',
    rating: 5,
    order: 2,
  },
  {
    customerName: 'Bilal Chaudhry',
    location: 'Model Town, Lahore',
    quote: "Fair pricing and no pressure to add extra services. My car's interior smells fresh again.",
    rating: 5,
    order: 3,
  },
];

const SEED_FAQS = [
  {
    question: 'Do I need an appointment?',
    answer:
      "Walk-ins are always welcome. If you'd like to skip the wait, call or WhatsApp us ahead of time and we'll have a bay ready for you.",
    order: 1,
  },
  {
    question: 'How long does a full detailing take?',
    answer:
      "A full interior and exterior detailing usually takes 2 to 3 hours, depending on your car's condition. Our waiting area has seating if you'd like to stay.",
    order: 2,
  },
  {
    question: 'Do I need to pay in advance?',
    answer: "No. You only pay after the service is complete and you're happy with the result.",
    order: 3,
  },
  {
    question: 'Where is your shop located?',
    answer:
      "We're on Main Boulevard, Gulberg III, Lahore. Call or WhatsApp us if you need directions or help finding parking.",
    order: 4,
  },
  {
    question: "What if I'm not happy with the service?",
    answer: "Just tell our team on the spot — we'll fix any spots you're not satisfied with before you leave.",
    order: 5,
  },
];

const SEED_GALLERY = [
  { carModel: 'Suzuki Cultus', serviceLabel: 'Full exterior detailing', order: 1 },
  { carModel: 'Toyota Corolla', serviceLabel: 'Interior deep clean', order: 2 },
  { carModel: 'Honda Civic', serviceLabel: 'Full detailing package', order: 3 },
  { carModel: 'Toyota Yaris', serviceLabel: 'Ceramic coating', order: 4 },
  { carModel: 'Kia Sportage', serviceLabel: 'Engine bay cleaning', order: 5 },
  { carModel: 'Suzuki Alto', serviceLabel: 'Headlight restoration', order: 6 },
];

const SEED_SEAT_COVER_CONFIG = {
  title: 'Custom Seat Covers',
  description:
    "Design a seat cover set made for your car — pick your car type, material, main color, and stitching accent, and we'll have it ready for you.",
  turnaroundNote: 'Ready in 3–5 days after you confirm your order.',
  carTypes: [
    { label: 'Hatchback', price: 3500 },
    { label: 'Sedan', price: 4000 },
    { label: 'SUV / Crossover', price: 5500 },
    { label: 'Van / 7-Seater', price: 7000 },
  ],
  materials: [
    { label: 'Leatherette', priceAdd: 0, description: 'Durable, easy to wipe clean — our most popular choice.' },
    { label: 'Premium Leather', priceAdd: 2500, description: 'Softer feel and a richer finish.' },
    { label: 'Fabric', priceAdd: -500, description: 'Breathable and budget-friendly.' },
  ],
  colors: [
    { label: 'Black', hex: '#1a1a1a' },
    { label: 'Beige', hex: '#d8c9a8' },
    { label: 'Brown', hex: '#5c4033' },
    { label: 'Grey', hex: '#7a7a7a' },
    { label: 'Maroon', hex: '#5e1a1a' },
  ],
  stitchingOptions: [
    { label: 'Matching', hex: null },
    { label: 'Red', hex: '#c0392b' },
    { label: 'White', hex: '#f5f5f5' },
    { label: 'Gold', hex: '#d98f2b' },
  ],
};

const SEED_SITE_SETTINGS = {
  businessName: 'Car Poshish',
  tagline: 'Professional Car Detailing in Lahore',
  description:
    'Car Poshish is a car detailing shop in Lahore offering exterior, interior, and full detailing services. Walk in, or call or WhatsApp ahead to skip the wait.',
  phone: '+923001112223',
  phoneDisplay: '0300 111 2223',
  whatsapp: '923001112223',
  email: 'info@carposhish.pk',
  addressStreet: 'Main Boulevard, Gulberg III',
  addressCity: 'Lahore',
  addressRegion: 'Punjab',
  addressPostalCode: '54000',
  addressCountry: 'PK',
  geoLat: 31.5204,
  geoLng: 74.3587,
  mapQuery: 'Main Boulevard Gulberg III Lahore Pakistan',
  hoursDisplay: 'Monday – Sunday, 9:00 AM – 8:00 PM',
  hoursSpec: 'Mo-Su 09:00-20:00',
  priceRange: 'Rs. 800 – Rs. 8,000',
  facebookUrl: 'https://facebook.com/carposhish',
  instagramUrl: 'https://instagram.com/carposhish',
  // Flat fee per zone approximates distance-based delivery pricing without
  // needing a paid maps/distance API. Edit freely from Site Settings in
  // the admin panel — no code change or redeploy needed.
  deliveryZones: [
    { label: 'Gulberg / Model Town / DHA', fee: 150 },
    { label: 'Other areas within Lahore', fee: 300 },
    { label: 'Outside Lahore (call to confirm)', fee: 600 },
  ],
  freePickup: true,
};

// Opens read-only public access (find/findOne) to each API so the Next.js
// frontend can fetch content without needing an API token. Safe to re-run —
// skips any permission that's already granted. Uses the Query Engine API
// (strapi.query), which is unaffected by the Entity Service deprecation.
async function setPublicPermissions(strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    strapi.log.warn('Public role not found — skipping permission setup.');
    return;
  }

  const permissionsByUid = {
    'api::service.service': ['find', 'findOne'],
    'api::product.product': ['find', 'findOne'],
    'api::testimonial.testimonial': ['find', 'findOne'],
    'api::faq.faq': ['find', 'findOne'],
    'api::gallery-item.gallery-item': ['find', 'findOne'],
    'api::site-setting.site-setting': ['find'],
    'api::seat-cover-config.seat-cover-config': ['find'],
  };

  for (const [uid, actions] of Object.entries(permissionsByUid)) {
    for (const action of actions) {
      const actionId = `${uid}.${action}`;
      const existing = await strapi.query('plugin::users-permissions.permission').findOne({
        where: { action: actionId, role: publicRole.id },
      });

      if (!existing) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: { action: actionId, role: publicRole.id },
        });
        strapi.log.info(`Granted public access: ${actionId}`);
      }
    }
  }
}

// Seeds via the Document Service API. `status: 'published'` creates and
// publishes in one call — verified against a real Strapi 5.53.0 boot
// before shipping this (see the project's migration notes in the README).
async function seedCollectionIfEmpty(strapi, uid, entries) {
  const count = await strapi.query(uid).count();
  if (count > 0) return;

  for (const entry of entries) {
    // `uid` (slug) fields only auto-generate from the admin UI's slug
    // button, not on programmatic create() calls — so we set it
    // explicitly here for any entry with a `name`, matching what the
    // admin UI would have generated.
    const withSlug = entry.name ? { ...entry, slug: slugify(entry.name) } : entry;
    await strapi.documents(uid).create({
      data: withSlug,
      status: 'published',
    });
  }
  strapi.log.info(`Seeded ${entries.length} entries into ${uid}`);
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Site Settings has draftAndPublish disabled, so there's no draft/publish
// distinction to worry about here — a plain create() is immediately live.
async function seedSiteSettingsIfEmpty(strapi) {
  const existing = await strapi.query('api::site-setting.site-setting').findOne();
  if (existing) return;

  await strapi.documents('api::site-setting.site-setting').create({
    data: SEED_SITE_SETTINGS,
  });
  strapi.log.info('Seeded site settings');
}

// Same reasoning as seedSiteSettingsIfEmpty — this is also a single type
// with draftAndPublish disabled.
async function seedSeatCoverConfigIfEmpty(strapi) {
  const existing = await strapi.query('api::seat-cover-config.seat-cover-config').findOne();
  if (existing) return;

  await strapi.documents('api::seat-cover-config.seat-cover-config').create({
    data: SEED_SEAT_COVER_CONFIG,
  });
  strapi.log.info('Seeded seat cover configurator options');
}

// Pings the Next.js site's revalidation webhook whenever content changes,
// so edits appear on the live site within seconds instead of waiting for
// the fetch cache's time-based revalidation window (up to 60s, and only
// on the next request after that). Fire-and-forget on purpose — content
// editors shouldn't wait on a network call to another service just to
// save an entry, and if the site is unreachable this only means the
// fallback time-based revalidation kicks in instead, not a hard failure.
function pingRevalidate(strapi) {
  const siteUrl = process.env.NEXT_SITE_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!siteUrl || !secret) return;

  fetch(`${siteUrl}/api/revalidate?secret=${encodeURIComponent(secret)}`, {
    method: 'POST',
  }).catch((err) => {
    strapi.log.warn(`[revalidate] Could not reach the Next.js site: ${err.message}`);
  });
}

// Fires on any create/update/delete for the content types the website
// actually reads. Note: Strapi 5's draft+published model means a single
// "publish" action can trigger these hooks twice (once for the draft row,
// once for the published row) — harmless here since revalidating twice
// in quick succession has no real cost.
function registerRevalidationHooks(strapi) {
  const watchedModels = [
    'api::service.service',
    'api::product.product',
    'api::testimonial.testimonial',
    'api::faq.faq',
    'api::gallery-item.gallery-item',
    'api::site-setting.site-setting',
    'api::seat-cover-config.seat-cover-config',
  ];

  strapi.db.lifecycles.subscribe({
    models: watchedModels,
    afterCreate() {
      pingRevalidate(strapi);
    },
    afterUpdate() {
      pingRevalidate(strapi);
    },
    afterDelete() {
      pingRevalidate(strapi);
    },
  });
}

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    await setPublicPermissions(strapi);

    await seedCollectionIfEmpty(strapi, 'api::service.service', SEED_SERVICES);
    await seedCollectionIfEmpty(strapi, 'api::product.product', SEED_PRODUCTS);
    await seedCollectionIfEmpty(strapi, 'api::testimonial.testimonial', SEED_TESTIMONIALS);
    await seedCollectionIfEmpty(strapi, 'api::faq.faq', SEED_FAQS);
    await seedCollectionIfEmpty(strapi, 'api::gallery-item.gallery-item', SEED_GALLERY);
    await seedSiteSettingsIfEmpty(strapi);
    await seedSeatCoverConfigIfEmpty(strapi);

    registerRevalidationHooks(strapi);
  },
};
