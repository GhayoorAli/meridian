"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Photo } from "@/components/photo";
import { projectTypes, projects } from "@/data/projects";
import { formatIndex } from "@/lib/utils";

export function WorkArchive() {
  const [type, setType] = useState<(typeof projectTypes)[number]>("All");
  const filtered = useMemo(
    () => (type === "All" ? projects : projects.filter((project) => project.type === type)),
    [type],
  );

  return (
    <>
      <div className="mt-12 flex flex-wrap gap-2">
        {projectTypes.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setType(item)}
            className={`rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors ${
              type === item
                ? "border-signal bg-signal text-ink"
                : "border-line text-mist hover:border-paper hover:text-paper"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {filtered.map((project, index) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            prefetch
            className={`group ${index % 3 === 0 ? "md:mt-16" : ""}`}
            data-cursor="Open"
          >
            <div className="clip-reveal img-zoom relative aspect-[5/4] overflow-hidden bg-ink-soft">
              <Photo src={project.image} alt={project.title} width={800} fill />
              <div className="absolute inset-x-0 bottom-0 flex justify-between p-5 font-mono text-[11px] tracking-[0.18em] uppercase text-paper">
                <span>{formatIndex(index + 1)}</span>
                <span>{project.year}</span>
              </div>
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl tracking-tight transition-colors duration-300 group-hover:text-signal">
                  {project.title}
                </h2>
                <p className="mt-2 font-serif text-paper-dim">{project.subtitle}</p>
              </div>
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-mist">
                {project.type}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
