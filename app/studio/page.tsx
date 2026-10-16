import { Photo } from "@/components/photo";
import { FadeIn, Paren, SplitTitle, Unmask } from "@/components/ui";
import { manifesto, team, values } from "@/data/studio";
import { process, stats, studioImages } from "@/data/site";

export const metadata = {
  title: "Studio",
  description: manifesto.body,
};

export default function StudioPage() {
  return (
    <main className="pt-[120px]">
      <section className="gutter">
        <SplitTitle as="h1" left="The" right="Studio" />
        <div className="mt-14 grid gap-12 border-t border-line pt-14 md:grid-cols-[1fr_545px] md:gap-[80px]">
          <div className="flex flex-col justify-between gap-16">
            <FadeIn>
              <p className="max-w-[640px] font-light text-[24px] leading-[1.15]">{manifesto.lead}</p>
              <p className="mt-10 max-w-[340px] text-justify font-light text-[16px] leading-[1.4]">
                {manifesto.body}
              </p>
            </FadeIn>
            <dl className="grid grid-cols-2 gap-x-10 gap-y-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-serif text-[48px] leading-[0.87]">{stat.value}</dt>
                  <dd className="mt-3 border-t border-line pt-2 font-light text-[14px]">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Unmask className="aspect-[545/700]">
            <Photo src={studioImages.page} alt="Drafting tables in the London studio" eager fill className="grayscale" />
          </Unmask>
        </div>
      </section>

      <section className="gutter pt-[120px]">
        <SplitTitle left="Our" right="People" />
        <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((person, index) => (
            <FadeIn key={person.name} delay={(index % 4) * 0.06} className="group">
              <div className="zoom relative aspect-[3/4] bg-ink/10">
                <Photo
                  src={person.image}
                  alt={person.name}
                  fill
                  className="grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between text-[18px]">
                <span>{person.name}</span>
                <span className="font-light text-[14px] text-stone">{person.station}</span>
              </div>
              <p className="font-light text-[14px] text-stone">{person.role}</p>
              <p className="mt-3 text-justify font-light text-[14px] leading-[1.4]">{person.bio}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="gutter pt-[120px]">
        <SplitTitle left="Our" right="Values" />
        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {values.map((value, index) => (
            <FadeIn key={value.title} className="grid grid-cols-[56px_1fr] gap-4 border-t border-line pt-5">
              <span className="font-serif text-[48px] leading-[0.87]">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-[24px] leading-[0.9] uppercase">{value.title}</h3>
                <p className="mt-4 max-w-[420px] text-justify font-light text-[16px] leading-[1.4]">{value.copy}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="gutter py-[120px]">
        <SplitTitle left="Our" right="Method" />
        <ol className="mt-14 grid gap-10 border-t border-line pt-8 md:grid-cols-5 md:gap-6">
          {process.map((step) => (
            <li key={step.index}>
              <Paren className="text-[16px]">{step.index}</Paren>
              <h3 className="mt-3 text-[20px] uppercase">{step.title}</h3>
              <p className="mt-3 text-justify font-light text-[14px] leading-[1.4]">{step.copy}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
