import Link from "next/link";
import { navLinks, offices, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div className="pointer-events-none absolute inset-0 hatch opacity-40" />
      <div className="relative px-5 pt-16 pb-8 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">
              Next conversation
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 block font-display text-4xl tracking-tight transition-colors hover:text-signal md:text-6xl"
              data-cursor="Write"
            >
              {site.email}
            </a>
            <p className="mt-6 max-w-sm font-serif text-xl text-paper-dim">
              {site.tagline} Commissions, research residencies, and teaching inquiries.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-mist">
                Pages
              </p>
              <ul className="mt-4 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="link-draw font-serif text-lg">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {offices.slice(0, 2).map((office) => (
              <div key={office.city}>
                <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-mist">
                  {office.city}
                </p>
                <p className="mt-4 font-serif text-lg leading-relaxed text-paper-dim">
                  {office.address}
                </p>
                <p className="mt-2 font-mono text-xs text-mist">{office.coordinates}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 overflow-hidden">
          <p className="stroke-title font-display text-[18vw] leading-[0.8] tracking-tight">
            MERIDIAN
          </p>
        </div>
        <div className="mt-6 flex flex-col justify-between gap-3 border-t border-line pt-6 font-mono text-[11px] tracking-[0.18em] uppercase text-mist sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legal}</p>
          <p>Designed as a field instrument</p>
          <p>51 N — 56 N — 38 S</p>
        </div>
      </div>
    </footer>
  );
}
