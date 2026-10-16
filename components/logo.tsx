import { cn } from "@/lib/utils";

/** Wordmark: the studio name in the wide display cut, with a quiet descriptor beside it. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-baseline gap-3", className)}>
      <span className="font-ex text-[1.375rem] leading-none tracking-[0.04em] uppercase md:text-[1.5rem]">Meridian</span>
      <span className="hidden text-[0.9375rem] leading-none opacity-70 xl:inline">Architecture &amp; interiors</span>
    </span>
  );
}
