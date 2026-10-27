# Kit waitlist integration

## Flow
1. `WaitlistForm` (client) submits to the `subscribe` server action (`app/actions/subscribe.ts`).
2. The action runs these checks in order:
   - If the honeypot field `company` is filled, it returns a fake success.
   - It validates the email (simple regex, 254 characters max).
   - It calls `addToWaitlist`.
3. `lib/kit.ts` (`server-only`) makes three POSTs to `https://api.kit.com/v4`, with the `X-Kit-Api-Key` header:
   1. `POST /subscribers` with `{ email_address, state: "inactive" }`. This creates the subscriber as unconfirmed. It's an upsert: for an existing subscriber Kit ignores `state`, so people already confirmed stay confirmed.
   2. `POST /forms/{KIT_FORM_ID}/subscribers`. The form has double opt-in enabled in Kit, and this step is what makes Kit send the confirmation email.
   3. `POST /tags/{KIT_TAG_ID}/subscribers`. Applies the `waitlist` tag.
4. On success the UI shows "Check your inbox to confirm".

## Env vars (set in Vercel and in `.env.local` for dev)
| Var | What it is |
|---|---|
| `KIT_API_KEY` | Kit v4 API key (Settings → Developer). |
| `KIT_FORM_ID` | Numeric ID of the Kit form that has double opt-in on. |
| `KIT_TAG_ID` | Numeric ID of the `waitlist` tag. |

If one is missing, `env()` throws. The action catches the error, logs it, and shows the generic error message.

## Gotchas
- **Never log Kit response bodies.** They can echo the email back. The code logs `Kit POST <path> -> <status>` only.
- **Partial failure.** If step 2 or 3 fails, the subscriber exists but may be untagged, or may not get the confirmation email. The user sees an error and retries. All three calls are idempotent, so a retry repairs it.
- **Inactive state matters.** Skip `state: "inactive"` and Kit creates the subscriber as active, which skips double opt-in.

## How to verify
Submit a real address on the live site, then check in Kit that the subscriber is there, carries the `waitlist` tag, and received the confirmation email. This check was done from a phone on 2026-10-27.
