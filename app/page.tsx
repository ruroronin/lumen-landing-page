import { Hero } from "@/components/Hero";
import Image from 'next/image';
import Link from "next/link";
import { Screenshot } from "@/components/Screenshot";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function Home() {
  return (
	<>
		<div className="mx-auto flex w-full max-w-5xl items-center px-4 py-5 sm:px-6">
			<Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
				<Image src="/logo.svg" alt="" width={20} height={20} />
				<span>Lumen</span>
			</Link>
		</div>
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
			© 2026 Cursed Alley · <a href="mailto:hello@uselumen.dev" className="hover:text-foreground">hello@uselumen.dev</a>
		</footer>
	</>
  );
}
