import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo } from "@/components/photo";
import { FadeIn, Paren, Roll, SplitTitle, Unmask } from "@/components/ui";
import { getNextProject, getProject, projects } from "@/data/projects";
import { formatIndex } from "@/lib/utils";

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
  const mark = "absolute text-[18px] leading-none font-light";
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
  const number = formatIndex(projects.findIndex((item) => item.slug === slug) + 1);
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

        <div className="gutter relative flex h-svh flex-col justify-between pt-[110px] pb-8">
          <div className="ml-auto flex max-w-[330px] gap-3">
            <Paren className="shrink-0 text-[14px]">{number}</Paren>
            <p className="text-justify font-light text-[16px] leading-[1.4]">...{project.excerpt}</p>
          </div>
          <div>
            <h1 className="font-ex text-[clamp(44px,5vw,72px)] leading-none uppercase">{project.title}</h1>
            <div className="mt-6 grid grid-cols-3 font-light text-[14px] md:text-[16px]">
              <span>
                {project.location}, {project.country}
              </span>
              <span className="text-center">{project.year}</span>
              <span className="text-right">{project.type}</span>
            </div>
          </div>
        </div>

        <div className="gutter relative pt-[30vh] pb-[20vh]">
          <dl className="ml-auto max-w-[680px] space-y-14">
            {facts.map(([label, value]) => (
              <FadeIn key={label}>
                <dt className="border-b border-white/60 pb-3 text-[16px]">{label}</dt>
                <dd className="mt-6 ml-auto max-w-[340px] text-justify font-light text-[16px] leading-[1.4]">
                  {value}
                </dd>
              </FadeIn>
            ))}
          </dl>
        </div>
      </section>

      <section className="gutter grid gap-16 py-[100px] md:grid-cols-2">
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
          <FadeIn className="ml-auto max-w-[380px] space-y-6 text-justify font-light text-[16px] leading-[1.4]">
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

      <section className="gutter grid gap-12 border-t border-line py-[80px] md:grid-cols-2">
        <p className="max-w-[460px] text-justify font-light text-[16px] leading-[1.4]">{project.outcome}</p>
        <ul className="grid grid-cols-2 gap-x-10 gap-y-6 text-[16px]">
          {project.credits.map((credit) => (
            <li key={credit.role}>
              <p className="font-light text-stone">{credit.role}</p>
              <p className="mt-1">{credit.name}</p>
            </li>
          ))}
        </ul>
      </section>

      <Link href={`/work/${next.slug}`} className="roll-host gutter block border-t border-line pt-10 pb-[100px]">
        <span className="mb-8 inline-flex text-[16px]">
          <Roll>Next project</Roll>
        </span>
        <SplitTitle left={next.title} />
      </Link>
    </main>
  );
}
