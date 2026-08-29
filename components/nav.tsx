"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, offices } from "@/data/site";
import { projects } from "@/data/projects";
import { CityClock } from "@/components/clock";
import { Magnetic } from "@/components/magnetic";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          open || scrolled
            ? "border-b border-line bg-ink/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-between px-5 transition-all duration-300 md:px-8 ${
            scrolled ? "py-4" : "py-6"
          }`}
        >
          <Link href="/" prefetch className="group flex items-baseline gap-3" data-cursor="Home">
            <span className="font-display text-xl tracking-tight md:text-2xl">
              Meridian
            </span>
            <span className="hidden font-mono text-[10px] tracking-[0.24em] uppercase text-mist sm:inline">
              Practice
            </span>
          </Link>
          <div className="hidden items-center gap-8 font-mono text-[11px] tracking-[0.22em] uppercase lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch
                className={`link-draw ${pathname.startsWith(link.href) ? "text-signal" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Magnetic>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="halo-btn grid h-12 w-12 place-items-center rounded-full border border-paper/40 bg-ink/20"
              aria-label={open ? "Close menu" : "Open menu"}
              data-cursor={open ? "Close" : "Menu"}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute top-0 left-0 h-px w-full bg-paper transition-transform duration-300 ${
                    open ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-paper transition-transform duration-300 ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </Magnetic>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 overflow-y-auto bg-ink"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="grid min-h-full grid-cols-1 gap-12 px-5 pt-28 pb-12 md:px-8 lg:grid-cols-12">
              <nav className="lg:col-span-7">
                <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">
                  Index
                </p>
                <ul className="mt-8 space-y-2">
                  {navLinks.map((link, index) => (
                    <li key={link.href} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ delay: 0.12 + index * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          href={link.href}
                          className="group flex items-baseline gap-5"
                          data-cursor="Open"
                        >
                          <span className="font-mono text-xs text-mist">{link.index}</span>
                          <span className="font-display text-6xl tracking-tight transition-colors duration-300 group-hover:text-signal md:text-8xl">
                            {link.label}
                          </span>
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex flex-col justify-between gap-10 lg:col-span-5">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">
                    Selected
                  </p>
                  <ul className="mt-6 space-y-3">
                    {projects.slice(0, 5).map((project) => (
                      <li key={project.slug}>
                        <Link
                          href={`/work/${project.slug}`}
                          className="index-row flex items-baseline justify-between gap-4 border-b border-line py-3"
                          data-cursor="View"
                        >
                          <span className="font-serif text-lg">{project.title}</span>
                          <span className="font-mono text-[10px] tracking-wider text-mist">
                            {project.year}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-1 gap-4 font-mono text-[11px] tracking-[0.18em] uppercase text-mist sm:grid-cols-3">
                  {offices.map((office) => (
                    <div key={office.city}>
                      <p className="text-paper">{office.city}</p>
                      <CityClock timeZone={office.timezone} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
