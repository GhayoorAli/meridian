import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo } from "@/components/photo";
import { FadeIn, Roll, SplitTitle, Unmask } from "@/components/ui";
import { getNextProject, getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.excerpt,
  };
}

function Corners() {
  const mark = "absolute text-[1.25rem] leading-none";
  return (
    <>
      <span className={`${mark} -top-3 -left-3`}>+</span>
      <span className={`${mark} -top-3 -right-3`}>+</span>
      <span className={`${mark} -bottom-3 -left-3`}>+</span>
      <span className={`${mark} -right-3 -bottom-3`}>+</span>
    </>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);
  const [hero, ...rest] = [project.image, ...project.gallery];

  const facts = [
    ["Overview", project.statement],
    ["Client", project.client],
    ["Area", project.area],
    ["Status", project.status],
  ];

  return (
    <main>
      {/* Photograph stays pinned while the overview scrolls up over it. */}
      <section className="relative bg-ink text-white">
        <div className="sticky top-0 -mb-[100svh] h-svh overflow-hidden">
          <Photo src={hero} alt={project.title} eager fill />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="gutter relative flex h-svh flex-col justify-end pt-[6.875rem] pb-8">
          <div>
            <h1 className="font-ex text-[clamp(2.75rem,5vw,4.5rem)] leading-none uppercase">{project.title}</h1>
            <div className="mt-6 grid grid-cols-3 text-[1rem] md:text-[1.125rem]">
              <span>
                {project.location}, {project.country}
              </span>
              <span className="text-center">{project.year}</span>
              <span className="text-right">{project.type}</span>
            </div>
          </div>
        </div>

        <div className="gutter relative pt-[30vh] pb-[20vh]">
          <dl className="ml-auto max-w-[42.5rem] space-y-14">
            {facts.map(([label, value]) => (
              <FadeIn key={label}>
                <dt className="border-b border-white/60 pb-3 text-[1.125rem]">{label}</dt>
                <dd className="mt-6 ml-auto max-w-[25rem] text-justify text-[1.125rem] leading-[1.4]">
                  {value}
                </dd>
              </FadeIn>
            ))}
          </dl>
        </div>
      </section>

      <section className="gutter grid gap-16 py-[6.25rem] md:grid-cols-2">
        <div className="space-y-6">
          <Unmask className="zoom aspect-[580/490]">
            <Photo src={rest[0]} alt="" fill />
          </Unmask>
          <div className="grid grid-cols-2 gap-6">
            {rest.slice(1, 3).map((image) => (
              <Unmask key={image} className="zoom aspect-[320/255]">
                <Photo src={image} alt="" fill />
              </Unmask>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-16">
          <FadeIn className="ml-auto max-w-[23.75rem] space-y-6 text-justify text-[1.125rem] leading-[1.4]">
            <p>{project.challenge}</p>
            <p>{project.approach}</p>
          </FadeIn>
          <div className="relative mx-3">
            <Corners />
            <Unmask className="zoom aspect-[610/480]">
              <Photo src={project.image} alt="" fill />
            </Unmask>
          </div>
        </div>
      </section>

      <section className="gutter grid gap-12 border-t border-line py-[5rem] md:grid-cols-2">
        <p className="max-w-[28.75rem] text-justify text-[1.125rem] leading-[1.4]">{project.outcome}</p>
        <ul className="grid grid-cols-2 gap-x-10 gap-y-6 text-[1.125rem]">
          {project.credits.map((credit) => (
            <li key={credit.role}>
              <p className="text-stone">{credit.role}</p>
              <p className="mt-1">{credit.name}</p>
            </li>
          ))}
        </ul>
      </section>

      <Link href={`/work/${next.slug}`} className="roll-host gutter block border-t border-line pt-10 pb-[6.25rem]">
        <span className="mb-8 inline-flex text-[1.125rem]">
          <Roll>Next project</Roll>
        </span>
        <SplitTitle left={next.title} />
      </Link>
    </main>
  );
}
