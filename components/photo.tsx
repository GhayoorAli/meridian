import { photoUrl } from "@/lib/photo-url";
import { cn } from "@/lib/utils";

export function Photo({
  src,
  alt,
  className,
  width = 800,
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
    // Native img so pages paint immediately; Unsplash CDN serves the file.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photoUrl(src, width)}
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
