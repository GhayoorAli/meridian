import { JournalList } from "@/components/journal-list";
import { SplitTitle } from "@/components/ui";
import { articles } from "@/data/journal";

export const metadata = {
  title: "Journal",
  description: "Essays from the Meridian field stations on climate, shade, survey, and making.",
};

export default function JournalPage() {
  return (
    <main className="gutter pt-[120px] pb-[120px]">
      <SplitTitle as="h1" left="The" right="Journal" />
      <div className="mt-14 border-t border-line" />

      <div className="mt-[90px]">
        <JournalList articles={articles} />
      </div>
    </main>
  );
}
