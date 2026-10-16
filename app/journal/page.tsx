import { JournalList } from "@/components/journal-list";
import { SplitTitle } from "@/components/ui";
import { articles } from "@/data/journal";

export const metadata = {
  title: "Journal",
  description: "Essays from the Meridian field stations on climate, shade, survey, and making.",
};

export default function JournalPage() {
  return (
    <main className="gutter pt-[7.5rem] pb-[7.5rem]">
      <SplitTitle as="h1" left="The" right="Journal" />
      <div className="mt-14 border-t border-line" />

      <div className="mt-[5.625rem]">
        <JournalList articles={articles} />
      </div>
    </main>
  );
}
