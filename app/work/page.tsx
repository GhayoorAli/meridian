import { WorkArchive } from "@/components/work-archive";

export default function WorkPage() {
  return (
    <main className="px-5 pt-32 pb-24 md:px-8">
      <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">Archive</p>
      <h1 className="mt-4 font-display text-6xl tracking-tight md:text-8xl">Work</h1>
      <p className="mt-6 max-w-xl font-serif text-2xl text-paper-dim">
        Eight recent instruments — houses, halls, archives, and stations — drawn against a
        moving climate.
      </p>
      <WorkArchive />
    </main>
  );
}
