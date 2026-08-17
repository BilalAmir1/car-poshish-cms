module.exports = [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      // Add your deployed frontend's URL here once you have one, e.g.
      // 'https://www.carposhish.pk'. The Next.js dev server origin is
      // included so `npm run dev` works against this CMS out of the box.
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
