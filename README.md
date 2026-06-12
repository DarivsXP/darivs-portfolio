# darivs-portfolio

Personal portfolio built with Laravel. This repository contains the source for the public portfolio site.

## Improvements made

- Added SEO and social meta tags (`og:*`, `twitter:card`, `canonical`) and structured JSON-LD for `Person`.
- Added a visible skip-to-content link and JS focus handling for keyboard users.
- Simplified duplicated timeline bullets and tightened copy for clarity.
- Added accessible focus-visible outlines and skip-link styles in `resources/css/app.css`.
- Ensured scroll-reveal respects `prefers-reduced-motion` and added a small accessibility JS guard in `resources/js/app.js`.

## Recommended next steps

- Add a `favicon.ico` to `public/` and an optional `site.webmanifest` for PWA behavior.
- Provide social preview images and update Open Graph `image` tags for better link sharing.
- Run a Lighthouse audit and address any remaining accessibility or performance warnings.
- Consider adding a simple analytics snippet (e.g., Plausible or Google Analytics) and privacy notice.

## Local development

Standard Laravel + Vite setup:

```bash
composer install
cp .env.example .env
php artisan key:generate
npm install
npm run dev
php artisan serve
```

---
Generated automated improvements by the assistant.
