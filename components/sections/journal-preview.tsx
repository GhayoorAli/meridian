import { JournalList } from "@/components/journal-list";
import { ArrowLink, Separator, SplitTitle } from "@/components/ui";
import { articles } from "@/data/journal";

export function JournalPreview() {
  return (
    <section className="gutter pt-[60px] pb-[90px]">
      <Separator />
      <SplitTitle left="Journal" className="mt-6" />
      <div className="mt-6 flex justify-end">
        <ArrowLink href="/journal">Explore all essays</ArrowLink>
      </div>
      <div className="mt-16 md:mt-[132px]">
        <JournalList articles={articles.slice(0, 3)} sequence />
      </div>
    </section>
  );
}
