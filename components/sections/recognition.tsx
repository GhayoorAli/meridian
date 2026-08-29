import { awards } from "@/data/site";
import { Reveal } from "@/components/reveal";

export function Recognition() {
  return (
    <section className="border-t border-line px-5 py-24 md:px-8 md:py-32">
      <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">
        07 — Recognition
      </p>
      <h2 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">
        Work that was named
      </h2>
      <div className="mt-12">
        {awards.map((award, index) => (
          <Reveal key={`${award.title}-${award.year}`} delay={index * 0.04}>
            <article className="group grid grid-cols-12 items-baseline gap-4 border-b border-line py-6">
              <p className="col-span-3 font-mono text-xs text-signal md:col-span-2">{award.year}</p>
              <h3 className="col-span-9 font-display text-2xl tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:col-span-5 md:text-3xl">
                {award.title}
              </h3>
              <p className="col-span-7 col-start-4 font-serif text-paper-dim md:col-span-3 md:col-start-auto">
                {award.project}
              </p>
              <p className="col-span-5 font-mono text-[11px] tracking-[0.16em] uppercase text-mist md:col-span-2 md:text-right">
                {award.place}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
