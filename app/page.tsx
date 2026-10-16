import { Hero } from "@/components/sections/hero";
import { Studio } from "@/components/sections/studio";
import { Works } from "@/components/sections/works";
import { Process } from "@/components/sections/process";
import { JournalPreview } from "@/components/sections/journal-preview";

export default function Home() {
  return (
    <main>
      {/* The hero stays pinned while the rest of the page slides up over it like a panel. */}
      <div className="sticky top-0 z-0">
        <Hero />
      </div>
      <div className="relative z-10 bg-bone">
        <Studio />
        <Works />
        <Process />
        <JournalPreview />
      </div>
    </main>
  );
}
