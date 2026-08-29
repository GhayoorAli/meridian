import { Photo } from "@/components/photo";
import { offices } from "@/data/site";
import { CityClock } from "@/components/clock";

export function Stations() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="px-5 md:px-8">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">
          05 — Field stations
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-5xl tracking-tight md:text-7xl">
          Three rooms, one practice
        </h2>
      </div>
      <div className="mt-12 flex min-h-[72vh] flex-col border-y border-line lg:flex-row">
        {offices.map((office) => (
          <article
            key={office.city}
            className="panel-expand group relative min-h-[420px] overflow-hidden border-b border-line last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0"
          >
            <Photo
              src={office.image}
              alt={office.city}
              width={900}
              fill
              className="opacity-40 transition duration-700 group-hover:scale-110 group-hover:opacity-70"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-transparent" />
            <div className="relative flex h-full flex-col justify-between p-7">
              <div className="flex items-start justify-between font-mono text-[11px] tracking-[0.2em] uppercase text-mist">
                <span>{office.role}</span>
                <CityClock timeZone={office.timezone} />
              </div>
              <div>
                <h3 className="font-display text-5xl tracking-tight md:text-6xl">{office.city}</h3>
                <p className="mt-4 max-w-xs font-serif text-lg text-paper-dim">{office.address}</p>
                <p className="mt-3 font-mono text-[11px] tracking-[0.16em] uppercase text-signal">
                  {office.coordinates}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
