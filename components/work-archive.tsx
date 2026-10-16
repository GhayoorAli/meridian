"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/sections/works";
import { projectTypes, projects } from "@/data/projects";
import { cn, formatIndex } from "@/lib/utils";

export function WorkArchive() {
  const [type, setType] = useState<(typeof projectTypes)[number]>("All");
  const filtered = useMemo(
    () => (type === "All" ? projects : projects.filter((project) => project.type === type)),
    [type],
  );

  return (
    <div className="mt-12 grid gap-10 md:grid-cols-[158px_1fr] md:gap-10">
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[1.25rem] md:sticky md:top-[130px] md:flex-col md:self-start md:gap-y-3">
        {projectTypes.map((item, index) => (
          <li key={item}>
            <button
              type="button"
              onClick={() => setType(item)}
              className={cn(
                "flex items-baseline gap-1.5 transition-colors duration-300",
                type === item ? "text-ink" : "text-ink/50 hover:text-ink",
              )}
            >
              <span className="font-serif">{formatIndex(index)}</span>
              {item}
            </button>
          </li>
        ))}
      </ul>

      <div className="space-y-[100px]">
        {filtered.map((project, index) => {
          const position = index % 3;
          if (position === 0) {
            return <ProjectCard key={project.slug} project={project} aspect="aspect-[4/3] md:aspect-[1162/620]" />;
          }
          if (position === 2) return null;
          const partner = filtered[index + 1];
          return (
            <div key={project.slug} className="grid gap-[6.25rem] md:grid-cols-2 md:gap-[5.75rem]">
              <ProjectCard project={project} aspect="aspect-[535/660]" />
              {partner ? (
                <ProjectCard project={partner} aspect="aspect-[535/470]" className="md:mt-[8.125rem]" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
