import { Hero } from "@/components/Hero";
import Image from 'next/image';
import Link from "next/link";
import { Screenshot } from "@/components/Screenshot";
import { WaitlistForm } from "@/components/WaitlistForm";
import { site } from "@/content/site";

export default function Home() {
  return (
	<>
		<header className="mx-auto flex w-full max-w-5xl items-center px-4 py-5 sm:px-6">
			<Link href="/" className="flex items-center gap-2.5 text-xl font-semibold tracking-tight">
				<Image src="/logo.svg" alt="" width={32} height={32} />
				<span>{site.name}</span>
			</Link>
		</header>
		<main className="relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
		{/* Soft primary glow behind the content */}
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,var(--accent),transparent_60%)]"
		/>
		<Hero />
		<WaitlistForm />
		<Screenshot />
		</main>
		<footer className="py-6 text-center text-xs text-muted-foreground">
			{site.footer.copyright} · <a href={`mailto:${site.footer.email}`} className="hover:text-foreground">{site.footer.email}</a>
		</footer>
	</>
  );
}
