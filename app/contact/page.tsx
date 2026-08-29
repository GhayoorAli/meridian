import { Photo } from "@/components/photo";
import { offices, site } from "@/data/site";
import { ContactForm } from "@/components/contact-form";
import { CityClock } from "@/components/clock";

export const metadata = {
  title: "Contact",
  description: "Write to Meridian about commissions, research residencies, and teaching.",
};

export default function ContactPage() {
  return (
    <main className="px-5 pt-32 pb-24 md:px-8">
      <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">Inquire</p>
      <h1 className="mt-4 font-display text-6xl tracking-tight md:text-8xl">Contact</h1>
      <p className="mt-6 max-w-xl font-serif text-2xl text-paper-dim">
        A difficult site, a public brief, or a teaching invitation. Write plainly. We answer
        from the station that is awake.
      </p>

      <div className="mt-16 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <ContactForm />
        </div>
        <aside className="space-y-8 lg:col-span-5 lg:col-start-8">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-mist">Studio</p>
            <a href={`mailto:${site.email}`} className="mt-2 block font-serif text-2xl link-draw w-fit">
              {site.email}
            </a>
            <p className="mt-2 font-mono text-sm text-mist">{site.phone}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-mist">Press</p>
            <a href={`mailto:${site.press}`} className="mt-2 block font-serif text-2xl link-draw w-fit">
              {site.press}
            </a>
          </div>
        </aside>
      </div>

      <section className="mt-24 grid gap-6 lg:grid-cols-3">
        {offices.map((office) => (
          <article key={office.city} className="overflow-hidden border border-line">
            <div className="img-zoom relative aspect-[16/10]">
              <Photo src={office.image} alt={office.city} width={900} fill />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.18em] uppercase text-signal">
                <span>{office.role}</span>
                <CityClock timeZone={office.timezone} />
              </div>
              <h2 className="mt-3 font-display text-3xl">{office.city}</h2>
              <p className="mt-3 font-serif text-lg text-paper-dim">{office.address}</p>
              <p className="mt-2 font-mono text-[11px] text-mist">{office.coordinates}</p>
              <p className="mt-4 font-mono text-sm">{office.phone}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
