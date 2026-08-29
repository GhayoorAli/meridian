import { Photo } from "@/components/photo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle, getNextArticle } from "@/data/journal";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.dek };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const next = getNextArticle(slug);

  return (
    <main>
      <article className="px-5 pt-32 pb-16 md:px-8">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal">
          {article.date} · {article.read}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl tracking-tight md:text-7xl">
          {article.title}
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-2xl text-paper-dim">{article.dek}</p>
        <p className="mt-6 font-mono text-[11px] tracking-[0.18em] uppercase text-mist">
          {article.author} — {article.role}
        </p>
        <div className="img-zoom relative mt-12 aspect-[16/8] overflow-hidden">
          <Photo src={article.image} alt={article.title} width={1200} eager fill />
        </div>
        <div className="mx-auto mt-16 max-w-2xl space-y-7">
          {article.body.map((paragraph) => (
            <p key={paragraph} className="font-serif text-xl leading-relaxed text-paper-dim">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
      <Link
        href={`/journal/${next.slug}`}
        className="group flex items-end justify-between border-t border-line px-5 py-16 md:px-8"
        data-cursor="Next"
      >
        <div>
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-signal">Next essay</p>
          <p className="mt-3 font-display text-4xl tracking-tight group-hover:text-signal md:text-5xl">
            {next.title}
          </p>
        </div>
        <span>→</span>
      </Link>
    </main>
  );
}
