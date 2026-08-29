import { Photo } from "@/components/photo";
import Link from "next/link";
import { articles } from "@/data/journal";

export const metadata = {
  title: "Journal",
  description: "Essays from the Meridian field stations on climate, shade, survey, and making.",
};

export default function JournalPage() {
  return (
    <main className="px-5 pt-32 pb-24 md:px-8">
      <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">Essays</p>
      <h1 className="mt-4 font-display text-6xl tracking-tight md:text-8xl">Journal</h1>
      <p className="mt-6 max-w-xl font-serif text-2xl text-paper-dim">
        Notes from surveys, night audits, and arguments about comfort. Written by the people
        who still go to site.
      </p>
      <div className="mt-16 divide-y divide-line border-y border-line">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/journal/${article.slug}`}
            className="group grid items-center gap-8 py-10 lg:grid-cols-12"
            data-cursor="Read"
          >
            <div className="img-zoom relative aspect-[16/10] overflow-hidden lg:col-span-4">
              <Photo src={article.image} alt={article.title} width={800} fill />
            </div>
            <div className="lg:col-span-8">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-mist">
                {article.date} · {article.read} · {article.author}
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-tight transition-colors duration-300 group-hover:text-signal md:text-5xl">
                {article.title}
              </h2>
              <p className="mt-4 max-w-2xl font-serif text-xl text-paper-dim">{article.dek}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-[0.18em] uppercase text-mist"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
