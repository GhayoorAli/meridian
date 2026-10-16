import { ArrowLink, Paren } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="gutter flex min-h-svh flex-col justify-between pt-[140px] pb-10">
      <Paren className="text-[21px]">404</Paren>
      <div>
        <h1 className="font-ex text-[clamp(40px,5vw,72px)] leading-none uppercase">
          This sheet was
          <br />
          never drawn
        </h1>
        <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <p className="max-w-[340px] text-justify font-light text-[16px] leading-[1.4]">
            The page is missing, or the coastline moved. Return to the start.
          </p>
          <ArrowLink href="/">Back to Meridian</ArrowLink>
        </div>
      </div>
    </main>
  );
}
