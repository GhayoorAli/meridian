import { Button, Eyebrow, FadeIn, SplitTitle } from "@/components/ui";
import { services } from "@/data/site";

/** What the studio designs, set on the studio's green so it reads as the core offer. */
export function Services() {
  return (
    <section className="bg-charcoal text-bone">
      <div className="gutter py-[7.5rem] lg:py-[9.375rem]">
        <Eyebrow tone="light">What we design</Eyebrow>
        <SplitTitle left="Four" right="Disciplines" className="mt-8" />
        <p className="mt-10 max-w-[38.75rem] text-[1.25rem] leading-[1.5] text-bone/85">
          One studio for the building, the rooms inside it and the ground around it, so every part
          is designed together and drawn by the same hands.
        </p>

        <ol className="mt-20 grid gap-x-10 gap-y-14 border-t border-line-light pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <FadeIn key={service.index} delay={index * 0.08}>
              <li className="flex h-full flex-col">
                <span className="font-serif text-[2.25rem] leading-none text-bronze-soft">{service.index}</span>
                <h3 className="mt-8 font-ex text-[1.625rem] leading-none uppercase">{service.title}</h3>
                <p className="mt-5 text-[1.125rem] leading-[1.55] text-bone/85">{service.copy}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.examples.map((example) => (
                    <li key={example} className="border border-line-light px-3 py-1.5 text-[1rem] text-bone/85">
                      {example}
                    </li>
                  ))}
                </ul>
              </li>
            </FadeIn>
          ))}
        </ol>

        <div className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-line-light pt-10 md:flex-row md:items-center">
          <p className="max-w-[35rem] text-[1.25rem] leading-[1.5]">
            Not sure where your project starts? Tell us about the site and what you need, and we will
            suggest a first step.
          </p>
          <Button href="/contact" tone="light">
            Start a project
          </Button>
        </div>
      </div>
    </section>
  );
}
