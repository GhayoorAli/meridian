import { cn } from "@/lib/utils";

/** Wordmark: the studio name in the wide display cut, with a quiet descriptor beside it. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-baseline gap-3", className)}>
      <span className="font-ex text-[22px] leading-none tracking-[0.04em] uppercase md:text-[24px]">Meridian</span>
      <span className="hidden text-[15px] leading-none opacity-70 xl:inline">Architecture &amp; interiors</span>
    </span>
  );
}
