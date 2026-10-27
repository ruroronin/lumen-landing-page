# Vercel deploy and domain

## Setup
- The Vercel project is connected to this GitHub repo. The production branch is `main`, and a push to `main` deploys.
- Env vars `KIT_API_KEY`, `KIT_FORM_ID` and `KIT_TAG_ID` are set in the project settings. After changing an env var you have to redeploy; existing deployments don't pick up the change.
- The custom domain is the apex `uselumen.dev`, live since 2026-10-27. The `qa-app.` / `qa-api.` subdomains belong to lumen-platform, not this project.

## Gotcha: connecting after the merge
The Vercel project was connected **after** the v1 branch had already been merged to `main`. Vercel only deploys on pushes it sees after the connection, so nothing deployed. The fix was a manual deploy (Deployments → Redeploy, or "Create Deployment" from `main`). If the site looks stale after setup, check whether any deployment ever fired.

## Not used
- No Vercel Analytics or Speed Insights. The privacy policy states there's no analytics, so update `content/privacy.md` before turning either on.
- No CI beyond Vercel's push deploys (per the umbrella rule: no pipeline until there's a first external user).
