import { cn } from "@/lib/utils";

export function Photo({
  src,
  alt,
  className,
  eager = false,
  fill = false,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  eager?: boolean;
  fill?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cn(
        "h-full w-full object-cover",
        fill && "absolute inset-0",
        className,
      )}
    />
  );
}
