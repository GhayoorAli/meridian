import { JournalList } from "@/components/journal-list";
import { ArrowLink, Eyebrow, SplitTitle } from "@/components/ui";
import { articles } from "@/data/journal";

export function JournalPreview() {
  return (
    <section className="gutter border-t border-line pt-[7.5rem] pb-[8.75rem] lg:pt-[10rem]">
      <Eyebrow>Writing from the studio</Eyebrow>
      <SplitTitle left="Journal" className="mt-8" />
      <div className="mt-6 flex justify-end">
        <ArrowLink href="/journal">Explore all essays</ArrowLink>
      </div>
      <div className="mt-16 md:mt-[8.25rem]">
        <JournalList articles={articles.slice(0, 3)} sequence />
      </div>
    </section>
  );
}
