"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "@/data/site";
import { Logo } from "@/components/logo";
import { Button, Roll } from "@/components/ui";
import { cn } from "@/lib/utils";

// Pages that open on a full-bleed photograph; the bar sits transparent over it until scrolled past.
const overlaid = (pathname: string) => pathname === "/" || /^\/work\/[^/]+$/.test(pathname);

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(overlaid(pathname));
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  // Close the menu whenever the route changes.
  const [shownPath, setShownPath] = useState(pathname);
  if (shownPath !== pathname) {
    setShownPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setOverHero(overlaid(pathname) && y < window.innerHeight - 100);
      setHidden(y > 120 && y > last.current);
      last.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const light = overHero || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,color,transform,border-color] duration-300",
          light ? "border-transparent bg-transparent text-white" : "border-line bg-bone/95 text-ink backdrop-blur-md",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="gutter grid h-[76px] grid-cols-[1fr_auto] items-center md:h-[88px] md:grid-cols-[1fr_auto_1fr]">
          <Link href="/" aria-label={`${site.name} home`} className="w-fit">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-12 text-[1.0625rem] md:flex">
            {navLinks.map((link) => {
              const current = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className="roll-host relative"
                >
                  <Roll>{link.label}</Roll>
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-2 left-0 h-px bg-current transition-[width] duration-500",
                      current ? "w-full" : "w-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-6 text-[1.0625rem]">
            <span className="hidden md:block">
              <Button href="/contact" size="sm" tone={light ? "light" : "ink"}>
                Start a project
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="roll-host md:hidden"
              aria-expanded={open}
            >
              <Roll>{open ? "Close" : "Menu"}</Roll>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="gutter fixed inset-0 z-40 flex flex-col justify-between bg-charcoal-deep pt-32 pb-10 text-cream"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <ul className="space-y-5">
              {[{ href: "/", label: "Home" }, ...navLinks].map((link, index) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                  >
                    <Link href={link.href} className="font-ex text-[2rem] leading-none uppercase">
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="space-y-6">
              <Button href="/contact" tone="light" className="w-full">
                Start a project
              </Button>
              <a href={`mailto:${site.email}`} className="block text-[1.125rem] text-cream/85">
                {site.email}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
