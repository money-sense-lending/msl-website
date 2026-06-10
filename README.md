# Money Sense Lending — self-hosted website

A complete static clone of mslending.au, built to replace the Broker Studio subscription.
All 26 pages, images, fonts, CSS and JS are local — nothing depends on Broker Studio's servers.

## Preview locally
```
cd msl-website
node server.js
```
Then open http://localhost:8099

## Deploy free on Cloudflare Pages
1. Sign in at https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
2. Drag the whole `msl-website` folder in (or connect a Git repo).
3. No build command needed — it's plain static files. Build output dir = `/` (root).
4. You'll get a free `your-project.pages.dev` URL to test on immediately.
5. When ready, add the custom domain `mslending.au` (see "Domain" below).

Cloudflare Pages automatically serves `/about-us/` from `about-us/index.html`, so all
clean URLs work exactly like the original.

## Domain (IMPORTANT)
The `mslending.au` domain is currently managed by Broker Studio. Before you can point it
at this new site you must **transfer the domain (or at least DNS control) out of Broker
Studio** to your own registrar / Cloudflare. Until then, test everything on the free
`.pages.dev` URL. Cancelling the subscription before moving the domain could take the
live site down.

## What works out of the box
- Entire visual site, all pages, branding, copy, lender logos, compliance footer.
- **Book Appointment** — uses a Calendly embed (`assets.calendly.com`), works as-is.
- Social links, Google rating display.

## What still points at external tools (by design)
These were never part of the static site — they're separate services. Dougal is supplying
the replacement links:
- **Calculators** (Loan Health Check, Borrowing Capacity, Fixed Rate Expiry) — currently
  `money-sense-lending.loantools.com.au`. Swap the links/embeds when you provide the new ones.
- **First Home Buyer Assessment** — ScoreApp (`firsthomebuyerassessment.scoreapp.com`).

## Known gap to fix before go-live
- **"Request a call" form** posts to `/assets/php/request_call.php` — a server-side PHP
  script that does NOT run on Cloudflare Pages (static only). Options:
  1. Replace with a Cloudflare Pages Function, or
  2. Use a free form service (Formspree / Web3Forms), or
  3. Remove the form and rely on the Calendly booking + phone number.
- **Analytics**: the page still loads a Google Tag Manager container that may belong to
  Broker Studio. Swap in your own GA4 / GTM ID if you want your own analytics.

## Folder layout
- `index.html` — homepage
- `<slug>/index.html` — each inner page (e.g. `home-loans/index.html`)
- `assets/` — css, js, img, webfonts (all local)
- `server.js` — tiny local preview server (not needed for deployment)
