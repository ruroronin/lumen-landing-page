import { site } from "@/content/site";

export function Hero() {
  return (
    <header className="flex max-w-4xl flex-col items-center text-center">
      <span className="inline-flex items-center gap-2 rounded-md border bg-card px-2.5 py-1 text-xs">
        <span aria-hidden className="size-1.5 rounded-full bg-primary" />
        <span className="font-mono text-foreground">{site.badge.version}</span>
        <span aria-hidden className="h-3 w-px bg-border" />
        <span className="text-muted-foreground">{site.badge.status}</span>
      </span>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
        {site.headline}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">
        {site.subhead}
      </p>
    </header>
  );
}
