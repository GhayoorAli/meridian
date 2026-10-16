"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, Roll } from "@/components/ui";
import { navLinks, site } from "@/data/site";

const social = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export function Footer() {
  const [sent, setSent] = useState(false);
  const pages = [{ href: "/", label: "Home" }, ...navLinks];

  return (
    <footer className="overflow-hidden bg-ink text-cream">
      <div className="gutter pt-[50px]">
        <div className="flex items-start justify-between gap-6">
          <h2 className="max-w-[300px] font-light text-[24px] leading-[0.9]">
            Architecture that measures, listens and stays.
          </h2>
          <a href={`mailto:${site.email}`} className="roll-host hidden text-[14px] md:inline-flex">
            <Roll>{site.email}</Roll>
          </a>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-12 md:flex-row">
          <form
            className="w-full max-w-[459px]"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <label htmlFor="footer-email" className="block font-light text-[16px] leading-[1.2]">
              Get in touch
            </label>
            <div className="relative mt-3">
              <input
                id="footer-email"
                type="email"
                required
                placeholder={sent ? "Thank you — we will write back" : "Enter your email"}
                className="h-14 w-full bg-ink-soft py-4 pr-[84px] pl-3 font-light text-[16px] text-cream outline-none placeholder:text-cream/70"
              />
              <button
                type="submit"
                className="roll-host absolute top-1/2 right-3 inline-flex -translate-y-1/2 items-center gap-2 font-light text-[16px]"
              >
                <Roll>
                  Send
                  <ArrowDownRight />
                </Roll>
              </button>
            </div>
          </form>

          <div className="flex gap-16 md:gap-[100px]">
            <div>
              <h4 className="font-light text-[16px] leading-[1.2] text-cream/50">Company</h4>
              <ul className="mt-3 grid grid-flow-col grid-rows-3 gap-x-10 font-light text-[16px] leading-[1.5]">
                {pages.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="roll-host">
                      <Roll>{link.label}</Roll>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-light text-[16px] leading-[1.2] text-cream/50">Social</h4>
              <ul className="mt-3 font-light text-[16px] leading-[1.5]">
                {social.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noreferrer" className="roll-host">
                      <Roll>{link.label}</Roll>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-[70px] flex flex-col justify-between gap-2 text-[14px] sm:flex-row md:text-[16px]">
          <p className="font-light">
            © {site.legal} All rights reserved, {new Date().getFullYear()}
          </p>
          <p>London · Edinburgh · Melbourne</p>
        </div>
      </div>

      <div aria-hidden className="mt-10 flex justify-center whitespace-nowrap text-cream opacity-15">
        {site.name.toUpperCase().split("").map((letter, index) => (
          <span key={`${letter}-${index}`} className="inline-block overflow-hidden align-bottom leading-none">
            <motion.span
              className="inline-block text-[18.6vw] leading-[0.756]"
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {letter}
            </motion.span>
          </span>
        ))}
      </div>
    </footer>
  );
}
