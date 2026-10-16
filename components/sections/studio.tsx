import { Photo } from "@/components/photo";
import { ArrowLink, Eyebrow, FadeIn, Parallax } from "@/components/ui";
import { stats, studioImages } from "@/data/site";
import { manifesto } from "@/data/studio";

/** Who the studio is, in one statement, with the three numbers a client asks first. */
export function Studio() {
  return (
    <section className="gutter grid gap-14 py-[7.5rem] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-[6.25rem] lg:py-[10rem]">
      <div className="flex flex-col justify-between gap-16">
        <FadeIn>
          <Eyebrow>The studio</Eyebrow>
          <h2 className="mt-8 max-w-[55rem] text-[clamp(1.875rem,3.4vw,3.25rem)] leading-[1.12] tracking-[-0.02em]">
            {manifesto.lead}
          </h2>
          <p className="mt-8 max-w-[35rem] text-[1.125rem] leading-[1.6] text-stone">{manifesto.body}</p>
          <div className="mt-10">
            <ArrowLink href="/studio">About the studio</ArrowLink>
          </div>
        </FadeIn>

        <dl className="grid grid-cols-3 border-t border-line">
          {stats.map((stat, index) => (
            <FadeIn
              key={stat.label}
              delay={index * 0.08}
              className="border-line pt-6 pr-4 [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-6"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-ex text-[clamp(2.5rem,4.4vw,4.25rem)] leading-none">{stat.value}</span>
                <span className="mt-3 block text-[1rem] text-stone md:text-[1.125rem]">{stat.label}</span>
              </dd>
            </FadeIn>
          ))}
        </dl>
      </div>

      <Parallax className="aspect-[4/5] w-full self-start bg-paper" amount={8}>
        <Photo src={studioImages.page} alt="Drafting tables in the London studio" fill />
      </Parallax>
    </section>
  );
}
