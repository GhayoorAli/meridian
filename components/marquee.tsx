import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const row = [...items, ...items];

  return (
    <div className={cn("overflow-hidden border-y border-line", className)}>
      <div className="marquee-track py-5">
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-8 pr-8 font-display text-3xl tracking-tight text-paper/80 md:text-5xl"
          >
            {item}
            <span className="text-signal">✸</span>
          </span>
        ))}
      </div>
    </div>
  );
}
