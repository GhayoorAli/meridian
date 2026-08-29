import { Photo } from "@/components/photo";
import Link from "next/link";
import { notFound } from "next/navigation";
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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);

  const facts = [
    ["Year", project.year],
    ["Location", `${project.location}, ${project.country}`],
    ["Type", project.type],
    ["Status", project.status],
    ["Area", project.area],
    ["Client", project.client],
  ];

  return (
    <main>
      <section className="relative min-h-[80vh]">
        <Photo src={project.image} alt={project.title} width={1200} eager fill />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/45 to-ink/20" />
        <div className="relative flex min-h-[80vh] flex-col justify-end px-5 pb-12 md:px-8">
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">
            {project.year} · {project.location} · {project.type}
          </p>
          <h1 className="mt-4 font-display text-5xl tracking-tight md:text-8xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl font-serif text-2xl text-paper-dim">{project.subtitle}</p>
        </div>
      </section>

      <section className="grid gap-12 border-b border-line px-5 py-16 md:px-8 lg:grid-cols-12">
        <dl className="grid grid-cols-2 gap-6 lg:col-span-4">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono text-[11px] tracking-[0.2em] uppercase text-mist">{label}</dt>
              <dd className="mt-2 font-serif text-lg">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="lg:col-span-8">
          <p className="font-serif text-2xl leading-relaxed md:text-3xl">{project.statement}</p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper-dim">{project.excerpt}</p>
        </div>
      </section>

      <section className="grid gap-12 px-5 py-20 md:px-8 lg:grid-cols-3">
        {[
          ["Challenge", project.challenge],
          ["Approach", project.approach],
          ["Outcome", project.outcome],
        ].map(([title, copy]) => (
          <article key={title} className="border-t border-signal/40 pt-6">
            <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-signal">{title}</h2>
            <p className="mt-4 font-serif text-xl leading-relaxed text-paper-dim">{copy}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 px-5 pb-20 md:grid-cols-2 md:px-8">
        {project.gallery.map((image, index) => (
          <div
            key={image}
            className={`img-zoom relative overflow-hidden ${index === 0 ? "md:col-span-2 aspect-[16/8]" : "aspect-[4/3]"}`}
          >
            <Photo src={image} alt="" width={900} fill />
          </div>
        ))}
      </section>

      <section className="border-t border-line px-5 py-16 md:px-8">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-mist">Credits</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {project.credits.map((credit) => (
            <li key={credit.role}>
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-signal">
                {credit.role}
              </p>
              <p className="mt-2 font-serif text-xl">{credit.name}</p>
            </li>
          ))}
        </ul>
      </section>

      <Link
        href={`/work/${next.slug}`}
        className="group flex items-end justify-between border-t border-line px-5 py-16 md:px-8"
        data-cursor="Next"
      >
        <div>
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-signal">Next project</p>
          <p className="mt-3 font-display text-4xl tracking-tight transition-colors group-hover:text-signal md:text-6xl">
            {next.title}
          </p>
        </div>
        <span className="font-mono text-sm tracking-[0.2em] uppercase">→</span>
      </Link>
    </main>
  );
}
