import Link from "next/link";
import { Photo } from "@/components/photo";
import { ArrowLink, Eyebrow, FadeIn, SplitTitle, Unmask } from "@/components/ui";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Project card. On hover (see `.card` in globals.css) the cover darkens and blurs, a second
 * photograph opens from the centre, and the type and place slide in over it.
 */
export function ProjectCard({
  project,
  aspect,
  className,
}: {
  project: Project;
  aspect: string;
  className?: string;
}) {
  return (
    <FadeIn className={className}>
      <Link href={`/work/${project.slug}`} className="card block">
        <div className="mb-4 flex items-baseline justify-between gap-4 text-[1.125rem] md:text-[1.25rem]">
          <span className="card-meta min-w-0 truncate">{project.title}</span>
          <span className="card-meta shrink-0">{project.year}</span>
        </div>

        <Unmask className={cn("w-full bg-ink", aspect)}>
          <div className="absolute inset-0 overflow-hidden">
            <Photo src={project.image} alt={project.title} fill className="card-main" />
          </div>
          <div className="card-hover absolute inset-0">
            <Photo src={project.gallery[0]} alt="" fill />
          </div>
          <span className="card-label card-label-top absolute top-5 left-1/2 z-10 text-[1rem] whitespace-nowrap text-[#faf9f6] md:text-[1.25rem]">
            {project.type}
          </span>
          <span className="card-label card-label-bottom absolute bottom-5 left-1/2 z-10 text-[1rem] whitespace-nowrap text-[#faf9f6] md:text-[1.25rem]">
            {project.location}, {project.country}
          </span>
        </Unmask>
      </Link>
    </FadeIn>
  );
}

export function Works() {
  const featured = projects.filter((project) => project.featured);

  // Rhythm from the reference: a tall card beside a lower, shorter one, then a full-width card.
  const rows: Project[][] = [];
  for (let i = 0; i < featured.length; ) {
    const pair = featured.slice(i, i + 2);
    rows.push(pair);
    i += pair.length;
    if (i < featured.length) {
      rows.push([featured[i]]);
      i += 1;
    }
  }

  return (
    <section className="gutter pt-[7.5rem] pb-[2.5rem] lg:pt-[10rem]">
      <Eyebrow>Selected projects</Eyebrow>
      <SplitTitle left="Built" right="Work" className="mt-8" />
      <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <p className="max-w-[32.5rem] text-[1.125rem] leading-[1.6] text-stone">
          Houses, schools, halls and archives completed over the last six years.
        </p>
        <ArrowLink href="/work">View all projects</ArrowLink>
      </div>

      <div className="mt-16 space-y-[120px]">
        {rows.map((row) =>
          row.length === 2 ? (
            <div key={row[0].slug} className="grid gap-[7.5rem] md:grid-cols-2 md:gap-[5.75rem]">
              <ProjectCard project={row[0]} aspect="aspect-[634/780]" />
              <ProjectCard project={row[1]} aspect="aspect-[634/560]" className="md:mt-[8.125rem]" />
            </div>
          ) : (
            <ProjectCard key={row[0].slug} project={row[0]} aspect="aspect-[4/3] md:aspect-[1360/650]" />
          ),
        )}
      </div>
    </section>
  );
}
