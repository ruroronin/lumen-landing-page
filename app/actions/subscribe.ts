"use server";

import { addToWaitlist } from "@/lib/kit";

export type SubscribeState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; reason: "invalid" | "failed" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  // Honeypot: humans never see this field. Bots get a fake success.
  if (formData.get("company")) return { status: "success" };

  const email = String(formData.get("email") ?? "").trim();
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return { status: "error", reason: "invalid" };
  }

  try {
    await addToWaitlist(email);
    return { status: "success" };
  } catch (err) {
    console.error("waitlist signup failed:", err instanceof Error ? err.message : err);
    return { status: "error", reason: "failed" };
  }
}
