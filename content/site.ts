/*
 * Every word on the page lives here. Ricardo owns this file.
 * [Bracketed] strings are placeholders — replace them, don't ship them.
 */
export const site = {
  name: "Lumen",

  meta: {
    title: "Lumen — Game analytics without the setup",
    description: "Two calls in your Unity project. Sessions and custom events on one dashboard. The alpha opens this winter — join the waitlist.",
  },

  badge: { version: "v0.1.0-alpha", status: "now compiling" },
  headline: "Game analytics for developers without a data team",
  subhead: "Two calls in your Unity project. Sessions and custom events on one dashboard. The alpha opens this winter.",

  form: {
    label: "Email address",
    placeholder: "you@studio.com",
    button: "Join the waitlist",
    pending: "Joining…",
    success: "Check your inbox to confirm",
    errorInvalid: "That email doesn't look right",
    errorFailed: "Something went wrong — try again",
    // Rendered as: {consent} <a href="/privacy">{privacyLink}</a>
    consent: "You'll get an invite when the alpha opens, plus a short build update every two weeks. Unsubscribe anytime.",
    privacyLink: "Privacy policy",
  },

  privacy: {
    title: "Privacy policy",
    back: "← Back",
  },

  // Rendered as: {copyright} · <a href="mailto:{email}">{email}</a>
  footer: {
    copyright: "© 2026 Cursed Alley",
    email: "hello@uselumen.dev",
  },

  // Optional dashboard screenshot. null = slot renders nothing.
  // Example: { src: "/dashboard.png", alt: "...", width: 1600, height: 1000 }
  screenshot: null as { src: string; alt: string; width: number; height: number } | null,
};
