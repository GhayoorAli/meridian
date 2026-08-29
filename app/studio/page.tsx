import { Photo } from "@/components/photo";
import { manifesto, team, values } from "@/data/studio";
import { process, stats } from "@/data/site";

export const metadata = {
  title: "Studio",
  description: manifesto.body,
};

export default function StudioPage() {
  return (
    <main className="px-5 pt-32 pb-24 md:px-8">
      <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">Practice</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl tracking-tight md:text-8xl">
        {manifesto.lead}
      </h1>
      <p className="mt-8 max-w-3xl font-serif text-2xl leading-relaxed text-paper-dim">
        {manifesto.body}
      </p>

      <div className="mt-16 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-ink p-6">
            <p className="font-display text-5xl text-signal">{stat.value}</p>
            <p className="mt-3 font-mono text-[11px] tracking-[0.2em] uppercase text-mist">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-28">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">People</p>
        <h2 className="mt-4 font-display text-5xl tracking-tight">The room</h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((person) => (
            <article key={person.name} className="group">
              <div className="img-zoom relative aspect-[3/4] overflow-hidden bg-ink-soft">
                <Photo
                  src={person.image}
                  alt={person.name}
                  width={560}
                  fill
                  className="grayscale transition duration-700 group-hover:grayscale-0"
                />
              </div>
              <p className="mt-4 font-mono text-[11px] tracking-[0.18em] uppercase text-signal">
                {person.station}
              </p>
              <h3 className="mt-1 font-display text-2xl tracking-tight">{person.name}</h3>
              <p className="mt-1 text-sm text-mist">{person.role}</p>
              <p className="mt-3 font-serif text-paper-dim">{person.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-28 grid gap-10 lg:grid-cols-2">
        {values.map((value) => (
          <article key={value.title} className="border-t border-line pt-6">
            <h3 className="font-display text-3xl tracking-tight">{value.title}</h3>
            <p className="mt-4 font-serif text-xl leading-relaxed text-paper-dim">{value.copy}</p>
          </article>
        ))}
      </section>

      <section className="mt-28">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">Method</p>
        <div className="mt-10 grid gap-8 md:grid-cols-5">
          {process.map((step) => (
            <article key={step.index}>
              <p className="font-display text-4xl text-signal">{step.index}</p>
              <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
              <p className="mt-3 font-serif text-paper-dim">{step.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
