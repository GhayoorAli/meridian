import { WorkArchive } from "@/components/work-archive";
import { SplitTitle } from "@/components/ui";

export default function WorkPage() {
  return (
    <main className="gutter pt-[7.5rem] pb-[7.5rem]">
      <SplitTitle as="h1" left="Our" right="Projects" />
      <div className="mt-14 border-t border-line" />
      <WorkArchive />
    </main>
  );
}
