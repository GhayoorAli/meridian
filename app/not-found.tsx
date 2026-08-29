import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col justify-end px-5 pt-32 pb-16 md:px-8">
      <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">404</p>
      <h1 className="mt-4 font-display text-6xl tracking-tight md:text-8xl">
        This sheet was never drawn
      </h1>
      <p className="mt-6 max-w-lg font-serif text-2xl text-paper-dim">
        The page is missing, or the coastline moved. Return to the archive.
      </p>
      <Link
        href="/"
        className="mt-10 w-fit rounded-full border border-paper/30 px-6 py-3 font-mono text-[11px] tracking-[0.22em] uppercase"
      >
        Back to Meridian
      </Link>
    </main>
  );
}
