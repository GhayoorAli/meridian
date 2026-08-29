import Link from "next/link";
import { Magnetic } from "@/components/magnetic";
import { site } from "@/data/site";

export function Inquire() {
  return (
    <section className="relative overflow-hidden border-t border-line px-5 py-28 md:px-8 md:py-36">
      <div className="pointer-events-none absolute inset-0 hatch" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">
          08 — Inquire
        </p>
        <h2 className="mt-6 font-display text-5xl tracking-tight md:text-8xl">
          Bring us a difficult site
        </h2>
        <p className="mx-auto mt-8 max-w-xl font-serif text-2xl text-paper-dim">
          We take a limited number of commissions each year. If the weather is the problem,
          write to the studio.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Magnetic>
            <Link
              href="/contact"
              className="halo-btn inline-flex rounded-full bg-signal px-8 py-4 font-mono text-[11px] tracking-[0.24em] uppercase text-ink"
              data-cursor="Write"
            >
              Open a brief
            </Link>
          </Magnetic>
          <a
            href={`mailto:${site.email}`}
            className="link-draw font-mono text-[11px] tracking-[0.22em] uppercase"
          >
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
