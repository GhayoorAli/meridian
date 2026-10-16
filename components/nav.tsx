"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, offices, site } from "@/data/site";
import { CityClock } from "@/components/clock";
import { Logo } from "@/components/logo";
import { Roll } from "@/components/ui";
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
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,transform] duration-300",
          light ? "bg-transparent text-white" : "bg-bone text-ink",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="gutter grid h-[84px] grid-cols-[1fr_auto] items-center md:h-[99px] md:grid-cols-[1fr_auto_1fr]">
          <Link href="/" aria-label={`${site.name} home`} className="w-fit">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-[54px] text-[14px] md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                className="roll-host"
              >
                <Roll>{link.label}</Roll>
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-6 text-[14px] tracking-[0.5px]">
            <span className="hidden opacity-70 md:inline">
              <CityClock timeZone={offices[0].timezone} label="LDN" />
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
            className="gutter fixed inset-0 z-40 flex flex-col justify-between bg-ink pt-32 pb-10 text-cream"
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
                    <Link href={link.href} className="font-ex text-[32px] leading-none uppercase">
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="space-y-1 font-light text-[16px]">
              {offices.map((office) => (
                <p key={office.city} className="flex justify-between border-t border-line-light pt-2">
                  <span>{office.city}</span>
                  <CityClock timeZone={office.timezone} />
                </p>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
