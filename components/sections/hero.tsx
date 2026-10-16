"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Photo } from "@/components/photo";
import { ArrowDown, Button, Roll } from "@/components/ui";
import { projects } from "@/data/projects";
import { formatIndex } from "@/lib/utils";

const featured = projects.filter((project) => project.featured);
const ease = [0.76, 0, 0.24, 1] as const;
const SLIDE_MS = 7000;

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
  const current = tick % featured.length;
  const project = featured[current];

  useEffect(() => {
    const id = window.setTimeout(() => setTick((value) => value + 1), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [tick]);

  // As the next panel slides over the pinned hero, the photograph dims and drifts.
  const { scrollY } = useScroll();
  const brightness = useTransform(scrollY, [0, 900], [1, 0.35]);
  const filter = useTransform(brightness, (value) => `brightness(${value})`);
  const drift = useTransform(scrollY, [0, 900], ["0%", "12%"]);

  return (
    <section className="relative h-svh min-h-[640px] overflow-hidden bg-charcoal-deep text-white">
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
          </motion.div>
        </AnimatePresence>
      </motion.div>
      {/* Legibility: a soft dark wash rising from the bottom, where the copy sits. */}
      <div className="absolute inset-0 z-[5] bg-[linear-gradient(to_top,rgba(20,16,12,0.82)_0%,rgba(20,16,12,0.45)_38%,rgba(20,16,12,0.1)_70%,rgba(20,16,12,0.25)_100%)]" />

      <div className="gutter absolute inset-x-0 bottom-0 z-10 pb-10 md:pb-14">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-[57.5rem]">
            <motion.p
              className="mb-6 flex items-center gap-3 text-[1rem] text-white/80"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
            >
              <span aria-hidden className="h-px w-8 bg-bronze-soft" />
              Architecture and interiors studio, London, Edinburgh, Melbourne
            </motion.p>
            <h1 className="text-[clamp(2.5rem,5.6vw,5.375rem)] leading-[1.02] tracking-[-0.025em]">
              {["Buildings and interiors", "designed to be"].map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.1, delay: 0.25 + index * 0.08, ease }}
                  >
                    {line}
                    {index === 1 ? <em className="font-serif italic"> lived in.</em> : null}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.div
              className="mt-8 flex flex-col gap-8 md:flex-row md:items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease }}
            >
              <p className="max-w-[28.75rem] text-[1.125rem] leading-[1.45] text-white/85">
                Homes, schools and cultural buildings, designed and seen through by the same small
                team from the first sketch to the day you move in.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Button href="/contact" tone="light">
                  Start a project
                </Button>
                <Link href="/work" className="roll-host text-[1.125rem]">
                  <Roll>View our work</Roll>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* The project behind the copy, credited like a plate caption. */}
          <div className="flex w-full items-end justify-between gap-8 border-t border-white/25 pt-5 lg:w-[340px] lg:flex-col lg:items-stretch">
            <Link href={`/work/${project.slug}`} className="roll-host block min-w-0">
              <span className="mb-1 block text-[1rem] text-white/70">
                <Swap id={project.slug}>
                  {project.location}, {project.year}
                </Swap>
              </span>
              <span className="block text-[1.25rem]">
                <Swap id={project.slug}>{project.title}</Swap>
              </span>
            </Link>
            <div className="flex shrink-0 items-center gap-5 lg:justify-between">
              <span className="text-[1rem] tabular-nums text-white/70">
                {formatIndex(current + 1)} / {formatIndex(featured.length)}
              </span>
              <span aria-hidden className="relative hidden h-px w-24 overflow-hidden bg-white/25 lg:block">
                <motion.span
                  key={tick}
                  className="absolute inset-y-0 left-0 bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                />
              </span>
              <button
                type="button"
                onClick={() => setTick((value) => value + 1)}
                className="roll-host text-[1.125rem]"
                aria-label="Show next project"
              >
                <Roll>
                  Next
                  <ArrowDown className="-rotate-90" />
                </Roll>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
