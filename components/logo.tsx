import { cn } from "@/lib/utils";

/** Split monogram: M / over R D, drawn in hairline type. */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid grid-cols-2 gap-x-3 font-ex text-[30px] leading-[0.95] font-extralight",
        className,
      )}
      aria-label="Meridian"
    >
      <span aria-hidden>M</span>
      <span aria-hidden className="-ml-1">/</span>
      <span aria-hidden>R</span>
      <span aria-hidden>D</span>
    </span>
  );
}
