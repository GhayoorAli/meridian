"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Photo } from "@/components/photo";
import { Separator, SplitTitle, Unmask } from "@/components/ui";
import { process } from "@/data/site";

function Step({ step }: { step: (typeof process)[number] }) {
  const [first, ...rest] = step.title.split(" ");
  return (
    <article className="w-full shrink-0 md:w-[700px]">
      <header className="flex items-end gap-4 pb-5">
        <span className="font-serif text-[48px] leading-[0.87]">{step.index}</span>
        <h3 className="text-[24px] leading-[0.87] uppercase">
          {first}
          {rest.length ? (
            <>
              <br />
              {rest.join(" ")}
            </>
          ) : null}
        </h3>
      </header>
      <div className="relative grid grid-cols-1 gap-6 border-t border-line pt-5 md:grid-cols-[345px_295px] md:pt-8 md:pr-9 md:pl-[18px]">
        <span aria-hidden className="absolute top-0 left-0 hidden h-3 w-px bg-line md:block" />
        <Unmask className="zoom aspect-[345/330] bg-ink/10">
          <Photo src={step.image} alt="" fill />
        </Unmask>
        <p className="text-justify font-light text-[16px] leading-[1.4]">{step.copy}</p>
      </div>
    </article>
  );
}

export function Process() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const node = track.current;
      if (!node) return;
      setDistance(Math.max(0, node.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <>
      {/* Desktop: the steps travel sideways while the section is pinned. */}
      <section
        ref={wrap}
        className="relative hidden md:block"
        style={{ height: `calc(100svh + ${distance}px)` }}
      >
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden py-[40px]">
          <div className="gutter">
            <Separator flip />
            <SplitTitle left="Our" right="Process" className="mt-2" />
          </div>
          <motion.div ref={track} style={{ x }} className="mt-16 flex w-max pl-10">
            {process.map((step) => (
              <Step key={step.index} step={step} />
            ))}
            <div className="w-10 shrink-0" />
          </motion.div>
        </div>
      </section>

      {/* Mobile: a plain stack. */}
      <section className="gutter py-[60px] md:hidden">
        <SplitTitle left="Our" right="Process" />
        <div className="mt-12 space-y-14">
          {process.map((step) => (
            <Step key={step.index} step={step} />
          ))}
        </div>
      </section>
    </>
  );
}
