# Copy decisions

All home-page copy lives in `content/site.ts`, and the privacy policy is in `content/privacy.md`. Ricardo owns every word. Agents propose copy; they never finalise it.

## Rules (from CLAUDE.md §6)
- **Claim nothing the product can't do today.** No user counts, logos, "trusted by", or unbuilt features.
- **State the developer's problem, not the player's.** Analytics tools are either too simple to act on or too heavy for a solo dev.
- **Player services aren't built.** They're never a feature or the problem statement. At most one line, low on the page.

## What shipped in v1 (2026-10-27)
- Headline: "Game analytics for developers without a data team".
- Subhead: "Two calls in your Unity project. Sessions and custom events on one dashboard. The alpha opens this winter."
- Badge: `v0.1.0-alpha` / "now compiling". This is an honest signal that the product is still in progress.
- Consent line: an alpha invite plus a build update roughly every two weeks, and you can unsubscribe anytime. The privacy policy must keep matching these promises.
- There's no player-services line at all, which is within the rule.

## Logo (2026-10-27)
- Chosen: the Phosphor `Lightning` bolt (fill weight), the same mark as on the dashboard login. It keeps the landing page and the app visually consistent.
- Rejected: abstract marks, chart marks and pixel-art marks.
- Known weakness: the bolt is generic. Ricardo accepts that for now. Revisit only if it causes confusion or a real brand mark is commissioned.
- Construction: a 40-unit tile with rx 9, `#0c102d` fill and a 2-unit `#1d2154` border. These are the dashboard's `bg-ring/10` and `border-ring/20` flattened over `#020617`, so the tile is opaque and works on light tabs. The bolt is `#6366f1` at 65% of the tile so it reads at 16px. `public/logo.svg` and `app/icon.svg` must stay identical.

## Open points
- "The alpha opens this winter" is a date promise. If the alpha slips past winter, change the copy.
- The page uses two contact identities: the footer says "© 2026 Cursed Alley · hello@uselumen.dev", while the privacy policy names Ricardo Ramos and ricardo@uselumen.dev. Decide on one data-controller identity and make sure both mailboxes receive mail.
- The "too simple vs too heavy" problem is only implied by the headline, not stated outright. That's acceptable for v1; revisit after the developer conversations.
