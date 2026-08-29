"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { capabilities } from "@/data/site";

export function Capabilities() {
  const [open, setOpen] = useState(capabilities[0].index);

  return (
    <section className="border-t border-line px-5 py-24 md:px-8 md:py-32">
      <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">
        03 — Capabilities
      </p>
      <h2 className="mt-4 max-w-3xl font-display text-5xl tracking-tight md:text-7xl">
        Six ways of holding a site
      </h2>
      <div className="mt-14 divide-y divide-line border-y border-line">
        {capabilities.map((item) => {
          const active = open === item.index;
          return (
            <button
              key={item.index}
              type="button"
              onClick={() => setOpen(item.index)}
              className="group w-full py-6 text-left"
              data-cursor={active ? "Open" : "Expand"}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-xs text-mist">{item.index}</span>
                  <span
                    className={`font-display text-3xl tracking-tight transition-colors duration-300 md:text-5xl ${
                      active ? "text-signal" : "group-hover:text-paper-dim"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                <span className="font-mono text-xl text-mist">{active ? "–" : "+"}</span>
              </div>
              <AnimatePresence initial={false}>
                {active ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col justify-between gap-6 pt-6 pl-12 md:flex-row md:items-end">
                      <p className="max-w-xl font-serif text-xl leading-relaxed text-paper-dim">
                        {item.copy}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-[0.18em] uppercase text-mist"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </section>
  );
}
