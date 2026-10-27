import "server-only";

const KIT_API = "https://api.kit.com/v4";

function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var ${name}`);
  return value;
}

async function post(path: string, body: Record<string, unknown>): Promise<void> {
  const res = await fetch(`${KIT_API}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": env("KIT_API_KEY"),
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  // Status only — Kit's error bodies can echo the email back.
  if (!res.ok) throw new Error(`Kit POST ${path} -> ${res.status}`);
}

/**
 * Double opt-in: the subscriber is created `inactive`, then added to a Kit form
 * that has double opt-in enabled — that's what makes Kit send the confirmation
 * email. Existing subscribers are untouched (create is an upsert that ignores
 * state on update).
 */
export async function addToWaitlist(email: string): Promise<void> {
  await post("/subscribers", { email_address: email, state: "inactive" });
  await post(`/forms/${env("KIT_FORM_ID")}/subscribers`, { email_address: email });
  await post(`/tags/${env("KIT_TAG_ID")}/subscribers`, { email_address: email });
}
