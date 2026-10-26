# lumen-landing — Claude Code Operating Instructions

The **landing page** for Lumen. Next.js, deployed to Vercel, serving the apex
`uselumen.dev`. Separate repo from `lumen-platform` on purpose: copy changes
constantly, the lifecycles differ, and this repo can be public.

**This is marketing, not product.** The bar is: it loads fast, it reads
honestly, and it captures an email.

---

## 1. Session protocol (THIS is the memory mechanism — do not skip)

Claude Code has no automatic memory between sessions. Continuity comes from
files, read and written deliberately.

**Session START — when Ricardo says "start session":**
1. Capture a wall-clock timestamp via `date` (hold it for the end-of-session row).
2. Read `docs/STATE.md` before anything else. Orient from it.
3. Plan the session — invoke the **planner** subagent ONLY IF the next piece of
   work isn't already planned in STATE.md. Hard condition, not a default: a cold
   planner run costs real minutes of Ricardo's time.

**Session END — when Ricardo says "end session":**
1. Capture the end timestamp FIRST via `date`, before anything else, so the
   logged duration reflects working time and not subagent runtime.
2. Append a row to `SESSION_LOG.md` (repo ROOT, outside `docs/`, outside the
   reviewer's single-writer domain — the MAIN agent writes it): date · start ·
   end · duration · focus. No start marker → leave start/duration blank.
3. Invoke the **reviewer** to update STATE.md — **with `run_in_background: true`**.
   The session is over; Ricardo must never sit through the reviewer's runtime.

**Session PAUSE — "pause session":** capture the timestamp, append a
SESSION_LOG row, do NOT invoke the reviewer (nothing is finished).

**Resuming — "resume session":** new timestamp, new SESSION_LOG row, skip the
STATE.md re-read. Continue where the conversation left off.

**Subagent runtime is Ricardo's wait time.** Prefer `SendMessage` to a live
agent over a cold spawn; scope prompts to the delta; verify inline with
Read/Grep rather than delegating; background anything he doesn't need to wait on.

If STATE.md and the live code disagree, the code wins — flag the drift.

---

## 2. Mode — CLAUDE WRITES THE CODE

**Different from the other Lumen repos.** In `lumen-sdk` and `lumen-game`,
Ricardo writes the code and Claude guides, because the point there is building
skill in the product.

Here the point is shipping a page before DevGAMM. Marketing-page React is not
where Ricardo's learning time belongs.

**So: write the code.** Ricardo reviews, directs and owns the copy.

Copy is the exception — **Ricardo owns every word on the page.** Propose copy,
never finalise it. He approves, edits, or rejects.

---

## 3. Git — Ricardo owns it entirely

**Never run a git command that changes state.** No `commit`, `branch`,
`checkout`, `switch`, `merge`, `rebase`, `push`, `pull`, `stash`, `reset`,
`cherry-pick`, `tag`, or anything else that moves the repo.

Read-only git is fine and encouraged: `status`, `diff`, `log`, `show` — use
them to understand what changed.

Edit files in the working tree and stop there. Ricardo stages, commits,
branches, merges and pushes.

You may **propose** a commit message when a piece of work is finished. Proposing
is not committing.

If a task seems to need a branch or a commit to proceed, say so and wait. Do not
do it "to be helpful."

---

## 4. The two subagents

Real subagents in `.claude/agents/`. They don't self-run — the main agent or
Ricardo invokes them. They can't talk to each other; each reports back to the
main conversation.

| Agent | When | What it does |
|---|---|---|
| **planner** | Before a new section or a structural change | Breaks it into ordered steps, defines the component shape. Read-only. |
| **reviewer** | After a section ships, after decisions, session end, or on demand | Reviews the code, flags issues by priority, and is the SOLE writer of everything under `docs/`. |

**No tester agent in this repo.** A static marketing page with one form doesn't
earn one. If the form logic ever grows beyond a POST to Kit, revisit.

Single-writer rule: only the reviewer writes under `docs/`. `SESSION_LOG.md` at
the repo root is the main agent's.

---

## 5. Scope — v1 is deliberately tiny

There is no alpha to show yet. The page exists to capture emails, not to sell a
product nobody can use.

**v1 — build only this:**
- Headline
- Subheadline
- Email capture form → **Kit** (formerly ConvertKit), `waitlist` tag
- Confirmation state after submit
- **Optional**: one screenshot of the dashboard with seeded data

**The screenshot is explicitly optional and must not block launch.** The app's
colour scheme is still being reworked to match the landing page. Build the page
so the screenshot slot can be empty, filled later, or removed, without touching
layout logic elsewhere.

**Excluded from v1 — do not build, do not suggest:**
- Feature grids, pricing, testimonials, logos, FAQ, blog
- Docs, changelog, roadmap pages
- Animations beyond basic transitions
- Analytics beyond what Vercel provides by default
- Dark/light toggle
- Any CMS

If Ricardo drifts toward more sections, flag it against "no alpha yet, the page
captures emails."

---

## 6. Hard constraints

- **The page claims nothing the product cannot currently do.** No invented user
  counts, no fake logos, no "trusted by", no unbuilt features. Alpha-stage
  honesty is the positioning, not a limitation of it. If copy needs a claim that
  can't be backed, the copy is wrong — change the copy.
- **The problem the page states is the developer's problem**, not the player's:
  existing analytics tools are either too simple to be actionable or too heavy —
  built for studios with infrastructure and setup overhead a solo dev can't
  justify. That is the gap Lumen fills today.
- **Player-facing services** (player profiles, stats, "the WoW Armory for any
  game") are **not built**. They are not the problem statement and not a
  feature. At most one line, low on the page, about where this goes next.
- **Ship beats polish.** Live by end of October.

---

## 7. Stack

Next.js · deployed on Vercel · apex `uselumen.dev` · Kit for the waitlist form.

Everything else is a decision to be made deliberately, not picked up mid-build.

**No coupling to `lumen-platform`.** The form posts to Kit. This repo never
calls the Lumen API.

---

## 8. Exit condition

`uselumen.dev` is live, loads on mobile and desktop, and an email entered in the
form appears in Kit tagged `waitlist`.

---

## 9. Environment

Native WSL repo. Standard Next.js dev loop — no Unity, no symlinks, no Windows
path split. Git from WSL is normal here.
