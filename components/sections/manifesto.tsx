import { stats } from "@/data/site";
import { manifesto } from "@/data/studio";
import { Reveal, TextReveal } from "@/components/reveal";

export function Manifesto() {
  return (
    <section className="relative border-t border-line px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">
              01 — {manifesto.eyebrow}
            </p>
            <p className="mt-6 font-serif text-xl text-mist">
              London headquarters. Field stations in Edinburgh and Melbourne. A practice that
              treats climate as a client.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <h2 className="font-display text-4xl leading-[0.95] tracking-tight md:text-7xl">
            <TextReveal text={manifesto.lead} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-2xl font-serif text-2xl leading-relaxed text-paper-dim">
              {manifesto.body}
            </p>
          </Reveal>
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-line md:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.06} className="bg-ink p-6">
                <p className="font-display text-5xl tracking-tight text-signal md:text-6xl">
                  {stat.value}
                </p>
                <p className="mt-3 font-mono text-[11px] tracking-[0.2em] uppercase text-mist">
                  {stat.label}
                </p>
                <p className="mt-1 text-sm text-paper-dim">{stat.unit}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
