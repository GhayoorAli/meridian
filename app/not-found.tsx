import { ArrowLink } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="gutter flex min-h-svh flex-col justify-between pt-[140px] pb-10">
      <span aria-hidden />
      <div>
        <h1 className="font-ex text-[clamp(40px,5vw,72px)] leading-none uppercase">
          This sheet was
          <br />
          never drawn
        </h1>
        <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <p className="max-w-[400px] text-justify text-[18px] leading-[1.4]">
            The page is missing, or the coastline moved. Return to the start.
          </p>
          <ArrowLink href="/">Back to Meridian</ArrowLink>
        </div>
      </div>
    </main>
  );
}
