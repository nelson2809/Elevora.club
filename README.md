# Elevora Seoul Spa — elevora.club

Marketing site for Elevora Seoul Spa, a women-only Korean bathhouse (jjimjilbang) and K-beauty house in Chennai.
A venture of Elevora AI Private Limited. Content comes from the "Women-Only Korean Spa, Chennai — Business Plan & Execution Roadmap" (Nov 2026).

Same stack as elevora.life: Next.js 15 (App Router) + React 19 + Tailwind v4 + GSAP (ScrollTrigger, SplitText) + Lenis, nodemailer for enquiry emails.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the Gmail app password
npm run dev                  # http://localhost:3000
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: arch-opening hero, pinned pool tour, signature-ritual slider, promise quote, concept chapter, promises, journey, heat rooms, packages, bridal + corporate, FAQ |
| `/rituals` | The four-hour guest journey, the heat rooms, pools, lounge and safety |
| `/menu` | Full service menu with prices (pre-GST), ★ = signature rituals at launch, café |
| `/packages` | Signature packages (day pass included) |
| `/corporate` | Corporate wellness days + enquiry form |
| `/about` | Concept, why women only, five promises, comparison, design, who it's for |
| `/faq` | Questions (modesty, health, phones, hours, GST, what's not offered) |
| `/contact` | Waitlist / enquiry form (`?interest=founding-member`, `bridal`, `package`, …) |
| `/privacy`, `/terms`, `/cancellation-refund`, `/health-safety` | Draft legal pages — have counsel review before launch |

All copy, prices and images live in `src/lib/content.ts`. Colours are the `@theme` tokens in `src/app/globals.css`
(pearl, blush, rose, celadon, jade, champagne). The logo is the shared golden Elevora "E" in `public/brand/`.

## Enquiry emails

The waitlist form emails the admin inbox and sends the guest a confirmation through Gmail SMTP (`src/lib/mail.ts`).
Set `GMAIL_USER`, `GMAIL_APP_PASSWORD` and optionally `ADMIN_EMAIL` in `.env.local` locally and in Vercel's
environment variables for production. Without them the form still works and logs a warning.

## Deploy

Vercel project + GoDaddy DNS for `elevora.club`, the same pattern as elevora.life:
add `elevora.club` and `www.elevora.club` as domains in Vercel, then set the A record and `www` CNAME that Vercel shows in GoDaddy.

Photos are from Pexels (free to use); swap them for the spa's own photography when it is ready.
