import { Photo } from "@/components/photo";
import { ArrowLink, FadeIn, SplitTitle, Unmask } from "@/components/ui";
import { offices, studioImages } from "@/data/site";
import { manifesto } from "@/data/studio";

export function Studio() {
  return (
    <section className="gutter grid gap-12 py-[60px] lg:min-h-svh lg:grid-cols-[735fr_545fr] lg:gap-[80px]">
      <div className="flex flex-col">
        <SplitTitle left="The" right="Studio" />
        <div className="mt-6 flex justify-end">
          <ArrowLink href="/studio">Get to know our studio</ArrowLink>
        </div>

        <FadeIn className="mt-16 max-w-[300px] space-y-12 text-justify font-light text-[16px] leading-[1.4]">
          <p>
            A spatial research studio designing architecture, landscape and light for a warming
            planet.
          </p>
          <p>{manifesto.lead} Every drawing begins with the wind, the tide and the people who stay.</p>
        </FadeIn>

        <ul className="mt-16 -ml-4 flex w-[calc(100%+1rem)] max-w-[404px] flex-col gap-2 font-light text-[16px] md:-ml-10 md:w-[404px]">
          {offices.map((office) => (
            <li key={office.city} className="border-b border-line pb-0.5 pl-[55%] md:pl-[312px]">
              {office.city}
            </li>
          ))}
        </ul>
      </div>

      <Unmask className="aspect-[545/700] w-full self-start lg:mt-[-6px]">
        <Photo src={studioImages.home} alt="A study model on the studio table" fill className="grayscale" />
      </Unmask>
    </section>
  );
}
