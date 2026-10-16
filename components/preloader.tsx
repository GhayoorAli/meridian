"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const STORAGE_KEY = "meridian-ready";

/** First-visit intro: the wordmark, filled with a project photograph, before the page lifts away. */
export function Preloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      return;
    }
    const show = window.setTimeout(() => setVisible(true), 0);
    const hide = window.setTimeout(() => setVisible(false), 2200);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="relative font-ex text-[16vw] leading-none uppercase md:text-[9vw]" aria-label={site.name}>
            <p aria-hidden className="flex text-cream/20">
              {site.name.split("").map((letter, index) => (
                <span key={`${letter}-${index}`} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, delay: 0.1 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {letter}
                  </motion.span>
                </span>
              ))}
            </p>
            <motion.p
              aria-hidden
              className="absolute inset-0 bg-cover bg-clip-text text-transparent"
              style={{ backgroundImage: `url(${projects[0].image})` }}
              initial={{ opacity: 0, backgroundPosition: "50% 90%" }}
              animate={{ opacity: 0.9, backgroundPosition: "50% 30%" }}
              transition={{
                opacity: { duration: 0.8, delay: 0.9 },
                backgroundPosition: { duration: 2, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              {site.name}
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
