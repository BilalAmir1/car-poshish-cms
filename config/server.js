// If APP_KEYS (and friends, in config/admin.js) aren't set via a .env
// file, these dev-only fallback values let Strapi boot anyway — so a
// missing .env doesn't block getting started locally. Replace all of
// these with real secrets (see .env.example) before deploying anywhere
// beyond your own machine.
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
});
