"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowDown, Button, Roll } from "@/components/ui";
import { navLinks, offices, site } from "@/data/site";

const social = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

/**
 * The page's close: an open invitation to start a project, then the three studios, the
 * site map, and the studio name set across the full width.
 */
export function Footer() {
  const lenis = useLenis();
  const pages = [{ href: "/", label: "Home" }, ...navLinks];

  return (
    <footer className="overflow-hidden bg-charcoal-deep text-bone">
      <div className="gutter pt-[110px] lg:pt-[140px]">
        {/* Invitation */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-[16px] text-bone/70">
              <span aria-hidden className="h-px w-8 bg-bronze-soft" />
              Start a project
            </p>
            <h2 className="mt-8 text-[clamp(44px,6.4vw,104px)] leading-[0.98] tracking-[-0.03em]">
              Have a project
              <br />
              <em className="font-serif text-bronze-soft italic">in mind?</em>
            </h2>
          </div>
          <div className="lg:pb-3">
            <p className="max-w-[440px] text-[20px] leading-[1.5] text-bone/85">
              Tell us about the site, the brief and your timing, and we will arrange a first
              conversation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Button href="/contact" tone="light">
                Start a project
              </Button>
              <a href={`mailto:${site.email}`} className="roll-host text-[20px]">
                <Roll>{site.email}</Roll>
              </a>
            </div>
          </div>
        </div>

        {/* Studios and site map */}
        <div className="mt-[100px] grid gap-12 border-t border-line-light pt-12 sm:grid-cols-2 lg:mt-[130px] lg:grid-cols-12 lg:gap-10">
          {offices.map((office) => (
            <address key={office.city} className="not-italic lg:col-span-3">
              <h3 className="font-ex text-[20px] leading-none uppercase">{office.city}</h3>
              <p className="mt-5 max-w-[240px] text-[18px] leading-[1.5] text-bone/80">{office.address}</p>
              <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="mt-3 block w-fit text-[18px] text-bone/80 hover:text-bone">
                {office.phone}
              </a>
            </address>
          ))}
          <div className="grid grid-cols-2 gap-8 lg:col-span-3">
            <nav aria-label="Footer">
              <h3 className="text-[16px] text-bone/60">Explore</h3>
              <ul className="mt-4 space-y-2">
                {pages.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="roll-host text-[18px]">
                      <Roll>{link.label}</Roll>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h3 className="text-[16px] text-bone/60">Follow</h3>
              <ul className="mt-4 space-y-2">
                {social.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noreferrer" className="roll-host text-[18px]">
                      <Roll>{link.label}</Roll>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-line-light py-7 text-[16px] text-bone/70 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.legal}
          </p>
          <button
            type="button"
            onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}
            className="roll-host w-fit text-bone"
          >
            <Roll>
              Back to top
              <ArrowDown className="rotate-180" />
            </Roll>
          </button>
        </div>
      </div>

      {/* The name across the full width, rising letter by letter. */}
      <div
        aria-hidden
        className="flex justify-center pt-6 font-ex text-[14.2vw] leading-[0.8] whitespace-nowrap text-bone/[0.09]"
      >
        {site.name.toUpperCase().split("").map((letter, index) => (
          <span key={`${letter}-${index}`} className="block overflow-hidden pb-[0.02em]">
            <motion.span
              className="block"
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {letter}
            </motion.span>
          </span>
        ))}
      </div>
    </footer>
  );
}
