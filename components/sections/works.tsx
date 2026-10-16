import Link from "next/link";
import { Photo } from "@/components/photo";
import { ArrowLink, FadeIn, Separator, SplitTitle, Unmask } from "@/components/ui";
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
        <div className="mb-5 flex h-[18px] items-center justify-between gap-4 text-[14px] md:text-[18px]">
          <span className="card-meta min-w-0 flex-1 truncate">{project.title}</span>
          <span className="flex items-center font-serif">
            <span className="card-paren card-paren-open pr-3 text-[18px] md:text-[24px]">(</span>
            <span className="card-more px-1 whitespace-nowrap">View more</span>
            <span className="card-paren card-paren-close pl-3 text-[18px] md:text-[24px]">)</span>
          </span>
          <span className="card-meta flex-1 text-right">{project.year}</span>
        </div>

        <Unmask className={cn("w-full bg-ink", aspect)}>
          <div className="absolute inset-0 overflow-hidden">
            <Photo src={project.image} alt={project.title} fill className="card-main" />
          </div>
          <div className="card-hover absolute inset-0">
            <Photo src={project.gallery[0]} alt="" fill />
          </div>
          <span className="card-label card-label-top absolute top-5 left-1/2 z-10 text-[14px] whitespace-nowrap text-[#faf9f6] md:text-[18px]">
            {project.type}
          </span>
          <span className="card-label card-label-bottom absolute bottom-5 left-1/2 z-10 text-[14px] whitespace-nowrap text-[#faf9f6] md:text-[18px]">
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
    <section className="gutter pt-[60px]">
      <Separator />
      <SplitTitle left="Projects" right="Featured" className="mt-6" />
      <div className="mt-8 flex justify-end">
        <ArrowLink href="/work">View all projects</ArrowLink>
      </div>

      <div className="mt-6 space-y-[120px]">
        {rows.map((row) =>
          row.length === 2 ? (
            <div key={row[0].slug} className="grid gap-[120px] md:grid-cols-2 md:gap-[92px]">
              <ProjectCard project={row[0]} aspect="aspect-[634/780]" />
              <ProjectCard project={row[1]} aspect="aspect-[634/560]" className="md:mt-[130px]" />
            </div>
          ) : (
            <ProjectCard key={row[0].slug} project={row[0]} aspect="aspect-[4/3] md:aspect-[1360/650]" />
          ),
        )}
      </div>
    </section>
  );
}
