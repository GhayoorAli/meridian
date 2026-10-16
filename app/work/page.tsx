import { WorkArchive } from "@/components/work-archive";
import { SplitTitle } from "@/components/ui";

export default function WorkPage() {
  return (
    <main className="gutter pt-[120px] pb-[120px]">
      <SplitTitle as="h1" left="Our" right="Projects" />
      <div className="mt-14 border-t border-line" />
      <WorkArchive />
    </main>
  );
}
