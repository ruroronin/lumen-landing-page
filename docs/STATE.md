# lumen-landing — STATE

> Written by the reviewer only. Code wins over this file when they disagree.
> Last updated: 2026-10-27.

## Status
**v1 is live, and the §8 exit condition was MET on 2026-10-27.** `uselumen.dev` serves the page from Vercel. Ricardo signed up from his phone and the signup showed up in Kit.

## Built (on `main` and `develop`, both at e28c7dd)
- `app/page.tsx`: header (logo + wordmark), Hero, WaitlistForm, Screenshot, footer. The footer text is hardcoded here, not in `site.ts`.
- `public/logo.svg` and `app/icon.svg` (identical): Phosphor `Lightning` bolt (fill), on a 40-unit tile with rx 9, fill `#0c102d` and a 2-unit `#1d2154` border. The bolt fills 65% of the tile. The header renders it with `<Image src="/logo.svg">` at 20px. The default `app/favicon.ico` has been removed.
- `components/Hero.tsx`: version badge, headline, subhead.
- `components/WaitlistForm.tsx`: `useActionState` form with a confirmation state. Focus moves to the success message after submit. Has a honeypot field (`company`).
- `app/actions/subscribe.ts`: server action. Checks the honeypot (bots get a fake success), validates the email (regex, 254 characters max), then calls Kit.
- `lib/kit.ts`: Kit v4 double opt-in. See `knowledge-base/kit-integration.md`.
- `components/Screenshot.tsx`: optional. `site.screenshot = null` renders nothing.
- `app/privacy/page.tsx`: renders `content/privacy.md` with react-markdown (`skipHtml`). Uses `"use cache"` so it prerenders.
- `content/site.ts`: holds the home-page copy, except the footer line, which is in `app/page.tsx`. Ricardo owns all of it.

## Deploy
- Vercel deploys on push to `main`. Env vars: `KIT_API_KEY`, `KIT_FORM_ID`, `KIT_TAG_ID`.
- The custom domain `uselumen.dev` is live. See `knowledge-base/vercel-deploy.md`.
- Branch flow: `develop` → PR → `main` (merge commit). Afterwards, fast-forward `develop` to `origin/main` and push, so the two stay level. Feature branches are deleted once merged.

## Next
v1 is shipped and the logo is deployed. **Nothing more is scheduled in this repo unless Ricardo directs it.** The umbrella Phase 3 work continues outside this repo: the friends build, then 10 developer conversations.

Open, and Ricardo's call:
- Contact identity: the footer says "Cursed Alley · hello@uselumen.dev", but the privacy policy says "Ricardo Ramos / ricardo@uselumen.dev".
- "The alpha opens this winter" is a date promise.

## Decisions (and why)
- **The form posts to Kit through a server action, and this repo never calls the Lumen API.** Keeping the two decoupled is the reason this is a separate repo.
- **Double opt-in.** It's a GDPR-clean consent record and keeps typo or bot addresses off the list.
- **Kit errors are logged as the HTTP status only.** Kit error bodies can echo the email back, and that would put personal data in the Vercel logs.
- **The honeypot returns a fake success.** That way bots get no signal to adapt to.
- **The screenshot is optional, and null by default.** The app's colour scheme is still in flux, so the layout must never depend on the screenshot.
- **Privacy text lives in a markdown file, not in `site.ts`.** Ricardo edits it as prose. The old `site.privacy.body` field was removed (verified 2026-10-27).
- **The logo is the dashboard's Lightning bolt.** That way the landing page matches the app's login screen (`LightningIcon weight="fill"`, `text-ring`). Abstract, chart and pixel-art marks were rejected. The bolt is generic, and Ricardo accepted that trade-off for now. The tile is opaque because the dashboard's translucent `bg-ring/10` and `border-ring/20` are composited over `#020617`, which keeps it visible on light browser tabs.
- **No analytics, no cookies.** The privacy policy says so. Adding Vercel Analytics or anything similar means updating `content/privacy.md` first.
