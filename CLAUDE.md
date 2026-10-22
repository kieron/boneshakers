# Boneshakers

Nuxt 3 site for Boneshakers Tattoo Studio, deployed to Cloudflare Workers on push to `main`.

- **Design spec:** `docs/design-spec.md` is the source of truth for look, pages and motion. Read it before UI work and keep its "Implementation notes" in step with the code.
- **Content** (artists, prices, hours, FAQs) lives in `utils/studio.ts`.
- **Design tokens** live in `assets/css/studio.css`. `/password` and `/consent` are legacy pages styled by `assets/css/main.css`, outside the studio layout.
- The whole site sits behind a password gate (`server/middleware/auth.ts`) when `SITE_PASSWORD` is set.
