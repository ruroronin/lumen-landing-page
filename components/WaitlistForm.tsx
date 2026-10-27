"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { subscribe, type SubscribeState } from "@/app/actions/subscribe";
import { site } from "@/content/site";

const initialState: SubscribeState = { status: "idle" };

// Card styling mirrors the platform's Login screen (lumen-design/Lumen - Login.png).
export function WaitlistForm() {
  const [state, action, pending] = useActionState(subscribe, initialState);
  const successRef = useRef<HTMLParagraphElement>(null);

  // Move focus to the confirmation so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  const error =
    state.status === "error"
      ? state.reason === "invalid"
        ? site.form.errorInvalid
        : site.form.errorFailed
      : null;

  return (
    <div className="mt-10 w-full max-w-md rounded-xl border bg-card p-8 sm:p-10">
      {state.status === "success" ? (
        <p
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="text-center outline-none"
        >
          {site.form.success}
        </p>
      ) : (
        <form action={action} noValidate>
          <label
            htmlFor="email"
            className="block text-xs font-medium tracking-wider text-muted-foreground uppercase"
          >
            {site.form.label}
          </label>
          <div className="relative mt-2">
            <MailIcon />
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              placeholder={site.form.placeholder}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "email-error" : undefined}
              className="h-11 w-full rounded-lg border border-input bg-background pr-3 pl-10 text-base placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none aria-invalid:border-destructive"
            />
          </div>

          <p
            id="email-error"
            role="alert"
            className="mt-2 min-h-5 text-sm text-destructive"
          >
            {error}
          </p>

          {/* Honeypot — hidden from humans and assistive tech */}
          <div aria-hidden className="absolute -left-[9999px]">
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="mt-2 h-11 w-full rounded-lg bg-primary font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none disabled:opacity-60"
          >
            {pending ? site.form.pending : site.form.button}
          </button>

          <p className="mt-5 border-t pt-5 text-center text-xs leading-relaxed text-muted-foreground">
            {site.form.consent}{" "}
            <Link
              href="/privacy"
              className="text-primary underline-offset-4 hover:underline"
            >
              {site.form.privacyLink}
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
