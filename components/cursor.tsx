"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = (event.target as HTMLElement | null)?.closest("[data-cursor]");
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor") || "");
      } else {
        setHovering(false);
        setLabel("");
      }
    };

    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[80] mix-blend-difference"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <div
        className={`grid place-items-center rounded-full border border-paper transition-[width,height,background-color] duration-150 ${
          hovering ? "h-20 w-20 bg-signal text-ink" : "h-3 w-3 bg-paper"
        }`}
      >
        {hovering ? (
          <span className="font-mono text-[9px] tracking-[0.22em] uppercase">
            {label || "View"}
          </span>
        ) : null}
      </div>
    </motion.div>
  );
}
