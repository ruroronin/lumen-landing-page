import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "react-markdown";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.privacy.title,
};

// Cached so the page prerenders at build time (cacheComponents is on).
async function loadPolicy(): Promise<string> {
  "use cache";
  return readFile(path.join(process.cwd(), "content/privacy.md"), "utf8");
}

export default async function Privacy() {
  const body = await loadPolicy();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-16 sm:px-6">
      <Link
        href="/"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {site.privacy.back}
      </Link>
      <h1 className="mt-8 text-3xl font-semibold tracking-tight">
        {site.privacy.title}
      </h1>
      {/* Markdown element styles live on the wrapper. skipHtml drops raw HTML,
          including the <!-- comments --> in privacy.md. */}
      <div className="mt-2 text-muted-foreground [&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-8 [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:mt-2 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-4 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
        <Markdown skipHtml>{body}</Markdown>
      </div>
    </main>
  );
}
