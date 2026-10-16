"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Photo } from "@/components/photo";
import { ArrowDown, Roll } from "@/components/ui";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const featured = projects.filter((project) => project.featured);
const ease = [0.76, 0, 0.24, 1] as const;

/** Text that rolls out upward and in from below whenever its key changes. */
function Swap({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative block overflow-hidden ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={id}
          className="block"
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.9, ease }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  // Ever-increasing counter so each new slide stacks above the one leaving.
  const [tick, setTick] = useState(0);
  const project = featured[tick % featured.length];

  // As the next panel slides over the pinned hero, the photograph dims and drifts.
  const { scrollY } = useScroll();
  const brightness = useTransform(scrollY, [0, 900], [1, 0.35]);
  const filter = useTransform(brightness, (value) => `brightness(${value})`);
  const drift = useTransform(scrollY, [0, 900], ["0%", "12%"]);

  return (
    <section className="relative h-svh min-h-[560px] overflow-hidden bg-ink text-white">
      <motion.div className="absolute inset-0 isolate" style={{ filter, y: drift }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={tick}
            className="absolute inset-0 overflow-hidden"
            style={{ zIndex: tick }}
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "30%" }}
            transition={{ duration: 1.4, ease }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ y: "70%", scale: 1.15 }}
              animate={{ y: "0%", scale: 1 }}
              transition={{ duration: 1.4, ease }}
            >
              <Photo src={project.image} alt={project.title} eager fill />
            </motion.div>
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="gutter absolute inset-x-0 top-1/2 z-10 grid -translate-y-1/2 grid-cols-[auto_1fr_auto] items-center gap-4">
        <Swap id={project.slug} className="font-light text-[18px]">
          {project.year}
        </Swap>

        <Link
          href={`/work/${project.slug}`}
          className="flex items-center gap-6 justify-self-center font-serif text-[18px] md:gap-10 md:text-[21px]"
        >
          <span className="text-[28px] leading-none">(</span>
          <Swap id={project.slug} className="tracking-[0.15em]">
            {project.title}
          </Swap>
          <span className="text-[28px] leading-none">)</span>
        </Link>

        <Link href={`/work/${project.slug}`} className="roll-host hidden text-[18px] md:inline-flex">
          <Roll>View Project</Roll>
        </Link>
      </div>

      <div className="gutter absolute inset-x-0 bottom-8 z-10 flex flex-col items-start justify-between gap-6 md:bottom-10 md:flex-row md:items-end">
        <motion.p
          className="max-w-[445px] text-justify font-light text-[16px] leading-[1.4]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease }}
        >
          {site.name} is a spatial research studio that treats every project as a climate to
          build with, not just a finished object.
        </motion.p>
        <div className="flex w-full items-center justify-between gap-6 md:w-auto">
          <Link href={`/work/${project.slug}`} className="roll-host text-[18px] md:hidden">
            <Roll>View Project</Roll>
          </Link>
          <button
            type="button"
            onClick={() => setTick((value) => value + 1)}
            className="roll-host text-[18px]"
          >
            <Roll>
              Next project
              <ArrowDown />
            </Roll>
          </button>
        </div>
      </div>
    </section>
  );
}
