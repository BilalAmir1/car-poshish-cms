// The upload allow/deny lists below are Strapi 5's own scaffolded
// security defaults (kept as generated) — restricts uploaded media types
// to sane ones and explicitly blocks executables and SVG (SVGs can carry
// embedded scripts).
const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedTypes = [
  'image/svg+xml',
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

/**
 * @param {{ env: (key: string, defaultValue?: string) => string }} strapi
 */
module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      // Dev-only fallback, same reasoning as config/admin.js — used to
      // sign end-user auth tokens (not admin login, which uses
      // ADMIN_JWT_SECRET instead). Replace before deploying anywhere real.
      jwtSecret: env('JWT_SECRET', 'devJwtSecret-replaceBeforeDeploy'),
      jwtManagement: 'refresh',
      sessions: {
        httpOnly: true,
      },
    },
  },
  upload: {
    config: {
      security: {
        allowedTypes: allowedMediaTypes,
        deniedTypes,
      },
    },
  },
});
