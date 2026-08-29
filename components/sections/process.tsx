import { process } from "@/data/site";
import { Reveal } from "@/components/reveal";

export function Process() {
  return (
    <section className="border-t border-line px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">
            04 — Method
          </p>
          <h2 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">
            From survey to aftercare
          </h2>
          <p className="mt-6 font-serif text-xl text-paper-dim">
            Five movements. We do not skip the first, and we do not leave after the fourth.
          </p>
        </div>
        <ol className="lg:col-span-8">
          {process.map((step, index) => (
            <Reveal key={step.index} delay={index * 0.05}>
              <li className="grid grid-cols-[auto_1fr] gap-6 border-b border-line py-10 first:pt-0">
                <span className="font-display text-5xl text-signal/80">{step.index}</span>
                <div>
                  <h3 className="font-display text-3xl tracking-tight">{step.title}</h3>
                  <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-paper-dim">
                    {step.copy}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
