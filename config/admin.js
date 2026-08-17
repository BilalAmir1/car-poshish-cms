// Same reasoning as config/server.js — dev-only fallbacks so this boots
// with no .env present. Replace before deploying anywhere real.
module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'devAdminJwtSecret-replaceBeforeDeploy'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'devApiTokenSalt-replaceBeforeDeploy'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'devTransferTokenSalt-replaceBeforeDeploy'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY', 'devEncryptionKey-replaceBeforeDeploy'),
  },
  flags: {
    nps: false,
    promoteEE: false,
  },
});
