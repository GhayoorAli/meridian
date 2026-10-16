"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.65, 0, 0.35, 1] as const;

/** Label that rolls on hover: three stacked copies, the column jumps two slots. */
export function Roll({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("roll", className)}>
      <span className="roll-track">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
    </span>
  );
}

export function ArrowDownRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={cn("h-[0.8em] w-[0.8em] shrink-0", className)} aria-hidden>
      <path d="M2 2 L10 10 M10 3.5 V10 H3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ArrowDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={cn("h-[0.75em] w-[0.75em] shrink-0", className)} aria-hidden>
      <path d="M6 1 V11 M2 7 L6 11 L10 7" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

/** Small text link with a rolling label and a ↘ arrow ("Get to know our studio ↘"). */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("roll-host inline-flex text-[14px]", className)}>
      <Roll>
        {children}
        <ArrowDownRight />
      </Roll>
    </Link>
  );
}

/**
 * Section title in the extended grotesk. As it scrolls into view the left word slides in
 * from the left edge and the right word from the right, tied to scroll position.
 */
export function SplitTitle({
  left,
  right,
  className,
  as: Tag = "h2",
}: {
  left: string;
  right?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.98", "start 0.4"] });
  const fromLeft = useTransform(scrollYProgress, [0, 1], ["-105%", "0%"], { ease: (t) => 1 - (1 - t) ** 3 });
  const fromRight = useTransform(scrollYProgress, [0, 1], ["105%", "0%"], { ease: (t) => 1 - (1 - t) ** 3 });
  const words = right ? [left, right] : [left];

  return (
    <Tag
      ref={ref}
      className={cn(
        "flex justify-between gap-6 font-ex text-[clamp(38px,5vw,72px)] leading-none uppercase",
        className,
      )}
    >
      {words.map((word, index) => (
        <span key={word} className="block overflow-hidden pb-[0.04em]">
          <motion.span className="block" style={{ x: index === 0 ? fromLeft : fromRight }}>
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Hairline that opens each panel: a short diagonal kicks up into a long horizontal rule,
 * drawn in as it scrolls into view. `flip` puts the diagonal on the right.
 */
export function Separator({ flip = false, className }: { flip?: boolean; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none relative h-[72px] w-full", flip && "-scale-x-100", className)}>
      <svg viewBox="0 0 41 73" className="absolute bottom-0 left-0 h-[72px] w-[41px] overflow-visible">
        <motion.path
          d="M0 72.4 L41 0.5"
          stroke="currentColor"
          strokeOpacity="0.17"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeIn" }}
        />
      </svg>
      <motion.div
        className="absolute top-0 right-10 left-[41px] h-px origin-left bg-current opacity-[0.17]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.3, ease }}
      />
    </div>
  );
}

/** The italic serif brackets that frame titles: ( Salt Line Observatory ). */
export function Paren({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-baseline gap-2 font-serif", className)}>
      <span className="text-[1.33em] leading-none">(</span>
      {children}
      <span className="text-[1.33em] leading-none">)</span>
    </span>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Image that unmasks from the bottom, with a slow settle of its scale, when it scrolls into view. */
export function Unmask({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.2, ease }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Photograph that drifts slower than the page as it passes through the viewport. */
export function Parallax({
  children,
  className,
  amount = 12,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div className="absolute -inset-y-[15%] inset-x-0" style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
