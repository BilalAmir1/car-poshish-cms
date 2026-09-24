// If APP_KEYS isn't set via a .env file, this dev-only fallback lets
// Strapi boot anyway — so a missing .env doesn't block getting started
// locally. Replace with real secrets (see .env.example) before deploying
// anywhere beyond your own machine.
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', [
      'devKeyA-replaceBeforeDeploy',
      'devKeyB-replaceBeforeDeploy',
      'devKeyC-replaceBeforeDeploy',
      'devKeyD-replaceBeforeDeploy',
    ]),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
