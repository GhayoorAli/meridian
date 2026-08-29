"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "meridian-ready";

export function Preloader() {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    setVisible(true);
    const started = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(100, Math.floor(((now - started) / 700) * 100));
      setCount(progress);
      if (progress < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(STORAGE_KEY, "1");
        window.setTimeout(() => setVisible(false), 160);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink px-6 py-6 text-paper md:px-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-start justify-between font-mono text-[11px] tracking-[0.28em] uppercase text-mist">
            <span>Meridian / 00</span>
            <span>London · Edinburgh · Melbourne</span>
          </div>
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">
                Calibrating
              </p>
              <p className="mt-3 max-w-sm font-serif text-2xl leading-snug text-paper/90 md:text-3xl">
                Spatial research for a warming planet.
              </p>
            </div>
            <p className="font-display text-[18vw] leading-none tracking-tight tabular-nums">
              {String(count).padStart(2, "0")}
            </p>
          </div>
          <div className="h-px w-full bg-line">
            <motion.div
              className="h-px bg-signal"
              initial={{ width: "0%" }}
              animate={{ width: `${count}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
