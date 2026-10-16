"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Photo } from "@/components/photo";
import { ArrowLink } from "@/components/ui";
import { createSequence, setSequenceLenis } from "@/components/press-sequence";
import type { Article } from "@/data/journal";
import { formatIndex } from "@/lib/utils";

// Scroll-driven rows need room and a wheel: wide, tall, fine pointer, motion allowed.
const SEQUENCE_QUERY =
  "(min-width: 1025px) and (min-height: 680px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function useSequenceMode(enabled: boolean) {
  return useSyncExternalStore(
    (notify) => {
      const query = window.matchMedia(SEQUENCE_QUERY);
      query.addEventListener("change", notify);
      return () => query.removeEventListener("change", notify);
    },
    () => enabled && window.matchMedia(SEQUENCE_QUERY).matches,
    () => false,
  );
}

/** Tags stacked one word per line, the way the reference sets publication names. */
function TypeLines({ tags }: { tags: string[] }) {
  const words = tags.flatMap((tag) => tag.split(" "));
  return (
    <span className="flex flex-col text-[18px] leading-[0.87] uppercase">
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>{word}</span>
      ))}
    </span>
  );
}

/** Photograph that settles from a slight zoom as its row scrolls into view. */
function Settle({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 1.06 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.1, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <Photo src={src} alt={alt} fill />
    </motion.div>
  );
}

/**
 * Desktop row. Collapsed: type on the left (pushed against the image), a 264px square in the
 * centre, title/author/date on the right. Opened: the square grows to 520px, the type slides
 * to the far left with the excerpt under it, and the description and a strip of gallery
 * photographs slide in on the right; the strip then scrolls sideways.
 *
 * In `sequence` mode (home page, desktop) scrolling drives all of this; otherwise a click does.
 */
function DesktopRow({
  article,
  index,
  open,
  onToggle,
  sequence,
}: {
  article: Article;
  index: number;
  open: boolean;
  onToggle: () => void;
  sequence: boolean;
}) {
  const row = useRef<HTMLDivElement>(null);
  const before = useRef<HTMLDivElement>(null);
  const after = useRef<HTMLDivElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const type = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const description = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const toggle = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!sequence) return;
    const parts = [row, before, after, cover, type, left, description, gallery].map((ref) => ref.current);
    if (parts.some((part) => !part)) return;
    const controller = createSequence({
      row: row.current!,
      before: before.current!,
      after: after.current!,
      cover: cover.current!,
      type: type.current!,
      left: left.current!,
      right: [description.current!, gallery.current!],
      gallery: gallery.current!,
    });
    toggle.current = controller.toggle;
    return () => {
      toggle.current = null;
      controller.dispose();
    };
  }, [sequence]);

  const activate = () => (sequence ? toggle.current?.() : onToggle());

  return (
    <div
      ref={row}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      data-open={open}
      data-mode={sequence ? "sequence" : "click"}
      onClick={(event) => {
        if (!(event.target as HTMLElement).closest("a, button")) activate();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      }}
      className="journal-row hidden cursor-pointer outline-none md:block"
    >
      <div className="journal-track flex gap-10">
        <div ref={before} className="journal-before relative min-w-0 flex-1 overflow-hidden">
          <div ref={type} className="journal-type absolute top-0 flex items-start gap-2.5">
            <span className="font-serif text-[18px] leading-[0.87]">{formatIndex(index + 1)}</span>
            <TypeLines tags={article.tags} />
          </div>
          <div
            ref={left}
            className="journal-excerpt absolute inset-x-0 top-[160px] flex flex-col"
            inert={!open}
            aria-hidden={!open}
          >
            <p className="w-[288px] text-justify font-light text-[14px] leading-[1.4]">{article.body[0]}</p>
            <div className="mt-[82px] self-end">
              <ArrowLink href={`/journal/${article.slug}`}>Read the full essay</ArrowLink>
            </div>
          </div>
        </div>

        <div ref={cover} className="journal-image relative shrink-0 overflow-hidden bg-ink/10">
          <Settle src={article.image} alt={article.title} />
        </div>

        <div ref={after} className="journal-after flex min-w-0 flex-1 gap-20">
          <div className="flex w-[252px] shrink-0 flex-col">
            <div className="flex max-w-[165px] flex-col">
              <span className="text-[18px] leading-[0.87]">{article.title}</span>
              <span className="mt-1.5 text-[14px] leading-[1.4]">{article.author}</span>
              <span className="font-light text-[14px] leading-[1.4]">{article.date}</span>
            </div>
            <div ref={description} className="journal-slide mt-16" inert={!open} aria-hidden={!open}>
              <p className="w-[252px] text-justify font-light text-[14px] leading-[1.4]">...{article.dek}</p>
            </div>
          </div>
          <div
            ref={gallery}
            className="journal-slide journal-gallery flex shrink-0 gap-4"
            inert={!open}
            aria-hidden={!open}
          >
            {article.gallery.map((image) => (
              <div key={image} className="relative aspect-[4/5] h-full shrink-0 overflow-hidden">
                <Photo src={image} alt="" fill />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Phone layout: full-width image, type and details beneath, the rest folds open below. */
function MobileRow({
  article,
  index,
  open,
  onToggle,
}: {
  article: Article;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      data-open={open}
      onClick={(event) => {
        if (!(event.target as HTMLElement).closest("a, button")) onToggle();
      }}
      className="journal-row cursor-pointer outline-none md:hidden"
    >
      <div className="relative h-[241px] w-full overflow-hidden bg-ink/10">
        <Settle src={article.image} alt={article.title} />
      </div>
      <div className="mt-4 flex items-start justify-between gap-6">
        <div className="flex items-start gap-2">
          <span className="font-serif text-[18px] leading-[0.87]">{formatIndex(index + 1)}</span>
          <TypeLines tags={article.tags} />
        </div>
        <div className="flex max-w-[180px] flex-col text-right text-[14px]">
          <span>{article.title}</span>
          <span className="font-light">{article.author}</span>
          <span className="font-light">{article.date}</span>
        </div>
      </div>
      <div className="journal-fold grid" inert={!open} aria-hidden={!open}>
        <div className="overflow-hidden">
          <div className="journal-fold-item">
            <p className="mt-10 text-justify font-light text-[14px] leading-[1.4]">{article.body[0]}</p>
            <div className="mt-6 flex justify-end">
              <ArrowLink href={`/journal/${article.slug}`}>Read the full essay</ArrowLink>
            </div>
          </div>
          <div className="journal-fold-item mt-6 flex gap-3 overflow-x-auto [scrollbar-width:none]">
            {article.gallery.map((image) => (
              <div key={image} className="relative aspect-[4/5] w-[70%] shrink-0 overflow-hidden">
                <Photo src={image} alt="" fill />
              </div>
            ))}
          </div>
          <p className="journal-fold-item mt-6 mb-4 text-justify font-light text-[14px] leading-[1.4]">
            ...{article.dek}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Centred list of essays. With `sequence` (the home page) the rows open and close as the
 * reader scrolls on desktop; elsewhere one row opens at a time on click.
 */
export function JournalList({ articles, sequence = false }: { articles: Article[]; sequence?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const scrollDriven = useSequenceMode(sequence);
  const lenis = useLenis();

  useEffect(() => {
    if (scrollDriven) setSequenceLenis(lenis);
  }, [lenis, scrollDriven]);

  return (
    <ol className="flex flex-col gap-4">
      {articles.map((article, index) => {
        const isOpen = !scrollDriven && open === article.slug;
        const toggle = () => setOpen(isOpen ? null : article.slug);
        return (
          <li key={article.slug}>
            <DesktopRow
              article={article}
              index={index}
              open={isOpen}
              onToggle={toggle}
              sequence={scrollDriven}
            />
            <MobileRow article={article} index={index} open={open === article.slug} onToggle={toggle} />
          </li>
        );
      })}
    </ol>
  );
}
