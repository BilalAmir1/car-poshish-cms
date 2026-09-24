/**
 * @param {{
 *   env: {
 *     (key: string, defaultValue?: string): string;
 *     bool: (key: string, defaultValue?: boolean) => boolean;
 *     int: (key: string, defaultValue?: number) => number;
 *     float: (key: string, defaultValue?: number) => number;
 *     array: (key: string, defaultValue?: string[]) => string[];
 *     json: <T = unknown>(key: string, defaultValue?: T) => T;
 *     date: (key: string, defaultValue?: string) => Date;
 *   };
 * }} strapi
 */
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
    docLinks: env.bool('FLAG_DOC_LINKS', true),
  },
});
