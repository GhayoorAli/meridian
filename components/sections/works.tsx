"use client";

import { Photo } from "@/components/photo";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/projects";
import { formatIndex } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export function Works() {
  const featured = projects.filter((project) => project.featured);
  const lead = featured[0];
  const rest = featured.slice(1);
  const [active, setActive] = useState(rest[0]?.slug ?? "");
  const preview = rest.find((project) => project.slug === active) ?? rest[0];

  return (
    <section className="border-t border-line px-5 py-24 md:px-8 md:py-32">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">
            02 — Selected works
          </p>
          <h2 className="mt-4 font-display text-5xl tracking-tight md:text-7xl">
            Buildings that keep a baseline
          </h2>
        </div>
        <Link href="/work" className="link-draw font-mono text-[11px] tracking-[0.22em] uppercase">
          Full archive
        </Link>
      </div>

      {lead ? (
        <Reveal>
          <Link
            href={`/work/${lead.slug}`}
            prefetch
            className="group grid gap-6 lg:grid-cols-12"
            data-cursor="Open"
          >
            <div className="clip-reveal img-zoom relative aspect-[16/10] overflow-hidden bg-ink-soft lg:col-span-8">
              <Photo src={lead.image} alt={lead.title} width={1100} eager fill />
              <div className="absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 font-mono text-[11px] tracking-[0.22em] uppercase text-signal">
                {lead.year} · {lead.location}
              </span>
            </div>
            <div className="flex flex-col justify-end lg:col-span-4">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-mist">
                {lead.type} / {lead.status}
              </p>
              <h3 className="mt-4 font-display text-4xl tracking-tight transition-colors duration-300 group-hover:text-signal md:text-5xl">
                {lead.title}
              </h3>
              <p className="mt-5 font-serif text-xl leading-relaxed text-paper-dim">
                {lead.excerpt}
              </p>
            </div>
          </Link>
        </Reveal>
      ) : null}

      <div className="mt-20 grid gap-10 lg:grid-cols-12">
        <div className="relative hidden aspect-[4/5] overflow-hidden bg-ink-soft lg:col-span-5 lg:block">
          <AnimatePresence mode="wait">
            {preview ? (
              <motion.div
                key={preview.slug}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0 0 0 0)" }}
                exit={{ clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                <Photo src={preview.image} alt={preview.title} width={800} fill />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <ul className="lg:col-span-7">
          {rest.map((project, index) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                prefetch
                className="index-row group flex items-center justify-between gap-6 border-b border-line py-7"
                onMouseEnter={() => setActive(project.slug)}
                data-cursor="View"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-xs text-mist">{formatIndex(index + 2)}</span>
                  <div>
                    <p className="font-display text-3xl tracking-tight transition-colors duration-300 group-hover:text-signal md:text-4xl">
                      {project.title}
                    </p>
                    <p className="mt-2 font-serif text-paper-dim">{project.subtitle}</p>
                  </div>
                </div>
                <span className="hidden font-mono text-[11px] tracking-[0.18em] uppercase text-mist sm:block">
                  {project.location} · {project.year}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
