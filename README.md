# Car Poshish CMS (Strapi)

The content backend for the Car Poshish website. Manages services, shop
products, testimonials, FAQs, gallery items, and global site settings
(phone, address, hours, etc.) — all editable from a web admin panel instead
of being hardcoded in the website's source.

## Setup

```bash
npm install
npm run develop
```

That's genuinely it for local development — **no `.env` file is
required**. `config/server.js`, `config/admin.js`, and `config/plugins.js`
all fall back to built-in dev-only secret values if `.env` isn't present,
specifically so a missing `.env` can't block you from getting started
(this used to throw `Error: App keys are required...` before those
fallbacks were added).

This starts Strapi at **http://localhost:1337**. The first time it runs,
it'll ask you to create an admin account at
**http://localhost:1337/admin** — that's your login for the CMS going
forward.

### Using your own secrets instead of the built-in dev defaults

The fallback secrets baked into the config files are fine for trying
things out locally, but **replace them before deploying anywhere real** —
anyone who can read this repo can read those values too. To use your own:

```bash
cp .env.example .env
```

Then open `.env` and fill in the values — here's a ready-to-use set
generated for you (each is just a random string; regenerate your own any
time with `node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"`):

```
APP_KEYS=UxcceUwjivwjO23bko8w1A==,iPSPgKd+2EITSaVT0uXjvg==,SIe3AYR3t3y++eg1ZR/JgA==,Rluaa/nXgl/Sc9enFv8B7g==
API_TOKEN_SALT=IrOchfO7f8UGd8koozTsaw==
ADMIN_JWT_SECRET=bWpHWX6vRXayQQwzbncXhA==
TRANSFER_TOKEN_SALT=i9FHMMoniilQPWEYkWjz3A==
JWT_SECRET=UmlQ5LUS0QLyvKZvzt9Xxg==
```

These are real, valid values you can paste in directly and start using
right now. The only thing that matters for security is that they're
random and not shared publicly — since they're printed here in a doc, treat
them as already-local-only-safe, and generate a fresh set (same command
above) before any real deployment.

Once `.env` exists with these (or your own) values, restart
`npm run develop` — Strapi automatically prefers `.env` values over the
config file fallbacks whenever it's present.

> This exact project (dependencies, seed script, and all) has been
> installed and boot-tested end to end on Linux — `npm install` resolves
> cleanly, Strapi starts, the bootstrap script grants permissions and
> seeds content, and the REST API returns correct data. Two real issues
> were caught and fixed this way before shipping:
> - **`ERESOLVE` peer dependency error**: Strapi v4's admin panel needs
>   `react-router-dom` ^5.x and `styled-components` ^5.x specifically
>   (not v6), which is what's pinned here now.
> - **`sharp` native module failing to load** (`Cannot find module
>   '.../sharp-<platform>-<arch>.node'`): the version Strapi pulls in by
>   default (`sharp@0.32.6`) fetches its platform binary via a postinstall
>   script that downloads from GitHub at install time — something
>   corporate networks, proxies, and antivirus commonly block, especially
>   on Windows, and it can fail silently. `package.json` now forces
>   `sharp@0.33.5` via `overrides`, which resolves its platform binary as
>   a normal scoped npm package (`@img/sharp-win32-x64`, etc.) instead —
>   no separate download step, far more reliable.
> - **`Error: App keys are required...`**: this fired when Strapi started
>   with no `.env` file present and no fallback configured, so
>   `app.keys` (and related secrets) came back empty. `config/server.js`,
>   `config/admin.js`, and `config/plugins.js` now all have dev-only
>   fallback values built in, confirmed by actually booting Strapi with
>   `.env` deleted entirely — it starts cleanly either way now.
>
> I can't test on Windows/macOS myself, only Linux — if `npm install`
> still fails on your machine, the error message will say exactly which
> package and version is the problem, and that's the fastest way to get
> it fixed.

## What happens automatically on first start

Two things run automatically (see `src/index.js`) and are safe to leave —
they only ever run once, even across restarts:

1. **Sample content is seeded** — the same services, products,
   testimonials, FAQs, and gallery items the Next.js site originally
   shipped with, so you have real content to look at immediately instead
   of an empty CMS. Edit or delete it freely from Content Manager.
2. **Public read access is opened** for `find`/`findOne` on every content
   type (and just `find` on the Site Settings single type), so the Next.js
   frontend can fetch content without needing an API token. If you ever
   want to lock this down, go to **Settings → Users & Permissions Plugin →
   Roles → Public** and uncheck the actions there.

## Content types

| Type | Kind | Fields |
|---|---|---|
| **Service** | Collection | name, slug, description, price, icon, order, featured |
| **Product** | Collection | name, slug, description, price, category, icon, image, inStock, order |
| **Testimonial** | Collection | customerName, location, quote, rating, order |
| **FAQ** | Collection | question, answer, order |
| **Gallery Item** | Collection | carModel, serviceLabel, beforeImage, afterImage, order |
| **Site Settings** | Single | businessName, tagline, description, phone, phoneDisplay, whatsapp, email, address fields, geoLat/geoLng, mapQuery, hoursDisplay, hoursSpec, priceRange, facebookUrl, instagramUrl |

The `icon` fields use the same icon names as the website's icon set
(`droplet`, `cloth`, `sparkle`, `wrench`, `bulb`, `shield`, `tyre`,
`spray`, `seat`) so picking one in the CMS maps directly to a real icon on
the site — no code changes needed when you add a new service or product
with an existing icon.

## API endpoints

Once running, the frontend reads from:

```
GET http://localhost:1337/api/services
GET http://localhost:1337/api/products
GET http://localhost:1337/api/testimonials
GET http://localhost:1337/api/faqs
GET http://localhost:1337/api/gallery-items
GET http://localhost:1337/api/site-setting   (singular — it's a single type)
```

Try one in your browser once Strapi is running, e.g.
http://localhost:1337/api/services — you should get back JSON with the
seeded services.

## Connecting the Next.js site

See the Next.js project's README for the frontend side — in short, set
`STRAPI_URL=http://localhost:1337` in the website's `.env.local` and it'll
start pulling content from here automatically. If this CMS isn't running
or that variable isn't set, the website falls back to its own built-in
default content, so the two projects can be developed independently.

## Using an API token instead of public access (optional)

If you'd rather not leave the API publicly readable, go to **Settings →
API Tokens → Create new API Token**, give it "Read-only" access, and copy
the generated token into the website's `.env.local` as
`STRAPI_API_TOKEN`. Then in **Settings → Roles → Public**, uncheck the
permissions this project's bootstrap script granted, so only requests
carrying that token can read the content.

## Troubleshooting native module install errors

Occasionally `npm install` will fail on a package that needs to compile
or download a native binary (like `sharp`, used for image processing).
If you hit something like `Cannot find module '.../<package>.node'` or a
postinstall script error:

1. Delete `node_modules` and `package-lock.json`, then run `npm install`
   again fresh — a surprising number of these resolve themselves on a
   clean install.
2. If it's specifically `sharp`: `npm rebuild sharp` or
   `npm install --include=optional sharp` often fixes it without a full
   reinstall.
3. If you're behind a corporate proxy or VPN, that's the most common
   cause — native module installs sometimes need to reach GitHub or the
   npm registry directly. Temporarily disabling the VPN for `npm install`
   is worth trying.

## Deploying

For production you'll want a real database instead of SQLite (Strapi
supports Postgres and MySQL — `config/database.js` in this project
already has a Postgres config ready to go, just set `DATABASE_CLIENT=postgres`
and the matching `DATABASE_*` variables in your environment) and a host
that keeps the process running — Strapi's own hosting
([strapi.io/cloud](https://strapi.io/cloud)), Railway, Render, and a VPS
with PM2 are all common choices. Whichever you pick, remember to add its
public URL to `config/middlewares.js`'s CORS `origin` list and to the
Next.js site's `STRAPI_URL`.
