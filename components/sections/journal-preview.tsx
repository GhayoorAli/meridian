import { Photo } from "@/components/photo";
import Link from "next/link";
import { articles } from "@/data/journal";
import { Reveal } from "@/components/reveal";

export function JournalPreview() {
  const [lead, ...rest] = articles;

  return (
    <section className="border-t border-line px-5 py-24 md:px-8 md:py-32">
      <div className="mb-14 flex items-end justify-between">
        <div>
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">
            06 — Journal
          </p>
          <h2 className="mt-4 font-display text-5xl tracking-tight md:text-7xl">Field notes</h2>
        </div>
        <Link href="/journal" className="link-draw font-mono text-[11px] tracking-[0.22em] uppercase">
          All essays
        </Link>
      </div>
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Link href={`/journal/${lead.slug}`} className="group block" data-cursor="Read">
            <div className="img-zoom relative aspect-[16/10] overflow-hidden">
              <Photo src={lead.image} alt={lead.title} width={1100} fill />
            </div>
            <p className="mt-6 font-mono text-[11px] tracking-[0.2em] uppercase text-mist">
              {lead.date} · {lead.read}
            </p>
            <h3 className="mt-3 font-display text-4xl tracking-tight transition-colors duration-300 group-hover:text-signal md:text-5xl">
              {lead.title}
            </h3>
            <p className="mt-4 max-w-xl font-serif text-xl text-paper-dim">{lead.dek}</p>
          </Link>
        </Reveal>
        <div className="flex flex-col justify-between lg:col-span-5">
          {rest.slice(0, 3).map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.08}>
              <Link
                href={`/journal/${article.slug}`}
                className="index-row block border-b border-line py-6 last:border-b-0"
                data-cursor="Read"
              >
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-mist">
                  {article.date}
                </p>
                <h3 className="mt-2 font-display text-2xl tracking-tight">{article.title}</h3>
                <p className="mt-2 font-serif text-paper-dim">{article.dek}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
