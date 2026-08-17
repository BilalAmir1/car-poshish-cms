// Same dev-only fallback reasoning as config/server.js and config/admin.js.
// JWT_SECRET is used by the users-permissions plugin to sign end-user
// auth tokens (not admin login, which uses ADMIN_JWT_SECRET instead).
module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET', 'devJwtSecret-replaceBeforeDeploy'),
    },
  },
});
