import { Photo } from "@/components/photo";
import { ContactForm } from "@/components/contact-form";
import { FadeIn, SplitTitle } from "@/components/ui";
import { offices, site } from "@/data/site";

export const metadata = {
  title: "Contact",
  description: "Write to Meridian about commissions, research residencies, and teaching.",
};

export default function ContactPage() {
  return (
    <main className="gutter pt-[7.5rem] pb-[7.5rem]">
      <SplitTitle as="h1" left="Get in" right="Touch" />
      <div className="mt-14 grid gap-16 border-t border-line pt-14 md:grid-cols-[1fr_545px] md:gap-[5rem]">
        <div className="flex flex-col justify-between gap-16">
          <p className="max-w-[25rem] text-justify text-[1.125rem] leading-[1.4]">
            A difficult site, a public brief, or a teaching invitation. Write plainly. We answer
            from the station that is awake.
          </p>
          <div className="space-y-6 text-[1.25rem]">
            <div>
              <p className="text-[1rem] text-stone">Studio</p>
              <a href={`mailto:${site.email}`} className="mt-1 block w-fit">
                {site.email}
              </a>
              <p>{site.phone}</p>
            </div>
            <div>
              <p className="text-[1rem] text-stone">Press</p>
              <a href={`mailto:${site.press}`} className="mt-1 block w-fit">
                {site.press}
              </a>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>

      <section className="mt-[7.5rem] grid gap-x-6 gap-y-14 md:grid-cols-3">
        {offices.map((office, index) => (
          <FadeIn key={office.city} delay={index * 0.06}>
            <div className="mb-3 flex items-baseline justify-between text-[1.25rem]">
              <span>{office.city}</span>
            </div>
            <div className="zoom relative aspect-[4/3] bg-ink/10">
              <Photo src={office.image} alt={office.city} fill />
            </div>
            <div className="mt-3 text-[1rem] leading-[1.4]">
              <p className="text-stone">{office.role}</p>
              <p>{office.address}</p>
              <p>{office.phone}</p>
            </div>
          </FadeIn>
        ))}
      </section>
    </main>
  );
}
