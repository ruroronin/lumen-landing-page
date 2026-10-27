import Image from "next/image";
import { site } from "@/content/site";

// Optional by design: with site.screenshot = null this renders nothing and the
// rest of the page is unaffected.
export function Screenshot() {
  const shot = site.screenshot;
  if (!shot) return null;

  return (
    <figure className="mt-16 w-full max-w-5xl overflow-hidden rounded-xl border bg-card sm:mt-24">
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes="(min-width: 1024px) 64rem, 100vw"
        className="h-auto w-full"
      />
    </figure>
  );
}
