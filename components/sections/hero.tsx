"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/magnetic";
import { CityClock } from "@/components/clock";
import { offices } from "@/data/site";

const lines = [
  { d: "M-20 90 C 80 20, 180 160, 320 70 S 520 10, 720 110", delay: "0s" },
  { d: "M-40 150 C 90 80, 200 220, 360 130 S 560 60, 780 170", delay: "-4s" },
  { d: "M-10 210 C 120 140, 240 280, 400 190 S 600 120, 800 230", delay: "-8s" },
  { d: "M-30 40 C 70 -10, 190 90, 340 30 S 540 -20, 760 80", delay: "-12s" },
];

export function Hero() {
  const stage = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = stage.current;
    if (!node) return;

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      node.style.setProperty("--orb-x", `${x}%`);
      node.style.setProperty("--orb-y", `${y}%`);
    };

    node.addEventListener("mousemove", onMove);
    return () => node.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={stage} className="relative min-h-screen overflow-hidden topo">
      <div className="pointer-events-none absolute inset-0 grid-field opacity-70" />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 800 280"
        preserveAspectRatio="none"
        aria-hidden
      >
        {lines.map((line) => (
          <path
            key={line.d}
            d={line.d}
            fill="none"
            stroke="#efe8d8"
            strokeWidth="0.6"
            className="topo-line"
            style={{ animationDelay: line.delay }}
          />
        ))}
      </svg>

      <div className="relative flex min-h-screen flex-col justify-between px-5 pt-28 pb-8 md:px-8">
        <div className="flex flex-wrap items-start justify-between gap-6 font-mono text-[11px] tracking-[0.22em] uppercase text-mist">
          <p>51.5074 N · 0.1278 W</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {offices.map((office) => (
              <CityClock key={office.city} timeZone={office.timezone} label={office.city} />
            ))}
          </div>
        </div>

        <div className="relative py-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55 }}
            className="mb-6 font-mono text-[11px] tracking-[0.32em] uppercase text-signal"
          >
            Spatial research studio — est. 2014
          </motion.p>
          <h1 className="font-display text-[16vw] leading-[0.78] tracking-[-0.04em] md:text-[12.5vw]">
            {["Spatial", "Research", "Studio"].map((word, index) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  className={`block ${index === 1 ? "text-signal" : ""} ${index === 2 ? "stroke-title" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: 0.08 + index * 0.08,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.55 }}
            className="max-w-md font-serif text-2xl leading-snug text-paper-dim"
          >
            Architecture, landscape, and light systems for coasts that are already moving.
          </motion.p>
          <Magnetic>
            <Link
              href="/work"
              className="halo-btn inline-flex items-center gap-4 rounded-full border border-paper/25 bg-ink px-7 py-4 font-mono text-[11px] tracking-[0.24em] uppercase"
              data-cursor="Enter"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-signal text-ink">↗</span>
              Enter the archive
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
