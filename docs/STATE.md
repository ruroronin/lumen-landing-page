# lumen-landing — STATE

> Written by the reviewer only. Code wins over this file when they disagree.
> Last updated: 2026-10-27.

## Status
**v1 is live, and the §8 exit condition was MET on 2026-10-27.** `uselumen.dev` serves the page from Vercel. Ricardo signed up from his phone and the signup showed up in Kit.

## Built (on `main`, origin/main 0a72076; feature commits 2a6cfbe, 86d4666)
- `app/page.tsx`: header (logo + wordmark), Hero, WaitlistForm, Screenshot, footer.
- `components/Hero.tsx`: version badge, headline, subhead.
- `components/WaitlistForm.tsx`: `useActionState` form with a confirmation state. Focus moves to the success message after submit. Has a honeypot field (`company`).
- `app/actions/subscribe.ts`: server action. Checks the honeypot (bots get a fake success), validates the email (regex, 254 characters max), then calls Kit.
- `lib/kit.ts`: Kit v4 double opt-in. See `knowledge-base/kit-integration.md`.
- `components/Screenshot.tsx`: optional. `site.screenshot = null` renders nothing.
- `app/privacy/page.tsx`: renders `content/privacy.md` with react-markdown (`skipHtml`). Uses `"use cache"` so it prerenders.
- `content/site.ts`: every word on the home page lives here. Ricardo owns it.

## Deploy
- Vercel deploys on push to `main`. Env vars: `KIT_API_KEY`, `KIT_FORM_ID`, `KIT_TAG_ID`.
- The custom domain `uselumen.dev` is live. See `knowledge-base/vercel-deploy.md`.

## Next
1. **Logo.** Build an SVG `Logo` component plus `app/icon.svg` as the favicon, then redeploy. The design direction isn't decided yet. Right now the header points at `/logo.svg`, which doesn't exist (`public/` is empty), so the Logo component should replace that `<Image>`. Delete the default `app/favicon.ico` when `icon.svg` lands.
2. Then go back to the umbrella Phase 3 list: friends build, then 10 developer conversations.

## Decisions (and why)
- **The form posts to Kit through a server action, and this repo never calls the Lumen API.** Keeping the two decoupled is the reason this is a separate repo.
- **Double opt-in.** It's a GDPR-clean consent record and keeps typo or bot addresses off the list.
- **Kit errors are logged as the HTTP status only.** Kit error bodies can echo the email back, and that would put personal data in the Vercel logs.
- **The honeypot returns a fake success.** That way bots get no signal to adapt to.
- **The screenshot is optional, and null by default.** The app's colour scheme is still in flux, so the layout must never depend on the screenshot.
- **Privacy text lives in a markdown file, not in `site.ts`.** Ricardo edits it as prose. The old `site.privacy.body` field was removed (verified 2026-10-27).
- **No analytics, no cookies.** The privacy policy says so. Adding Vercel Analytics or anything similar means updating `content/privacy.md` first.
